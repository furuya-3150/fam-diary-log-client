"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Loading } from "@/components/ui/loading";
import { ErrorDisplay } from "@/components/ui/error-display";
import { getApiUrl } from "@/lib/env";
import {
  saveJoinToken,
  clearJoinToken,
  submitFamilyJoinRequest,
} from "@/lib/family";
import { toast } from "sonner";

/**
 * 家族招待リンクからの参加ページ
 *
 * URLパラメータとして token を受け取り、家族参加フローを開始する
 * 例: /join-family?token=abc123
 */
export default function JoinFamilyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [status, setStatus] = useState<"checking" | "joining" | "error">(
    "checking",
  );
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const handleJoinFlow = async () => {
      // トークンを取得
      const token = searchParams.get("token");

      if (!token) {
        setStatus("error");
        setErrorMessage(
          "招待トークンが見つかりません。URLを確認してください。",
        );
        return;
      }

      // sessionStorageにトークンを保存
      saveJoinToken(token);

      if (authLoading) {
        return;
      }

      if (isAuthenticated) {
        // 家族参加リクエストを送信
        await submitJoinRequest(token);
      } else {
        // OAuth認証へリダイレクト
        globalThis.location.href = getApiUrl("/auth/google");
      }
    };

    handleJoinFlow();
  }, [searchParams, isAuthenticated, authLoading]);

  /**
   * 家族参加リクエストを送信
   */
  const submitJoinRequest = async (token: string) => {
    setStatus("joining");

    try {
      await submitFamilyJoinRequest(token);

      //トークンを削除してダッシュボードへ
      clearJoinToken();
      toast.success("家族に参加しました", {
        description: "ようこそ！家族の一員になりました。",
      });
      router.push("/dashboard");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "家族への参加に失敗しました。もう一度お試しください。",
      );
      // エラー時もトークンを削除
      clearJoinToken();
    }
  };

  // エラー表示
  if (status === "error") {
    return (
      <ErrorDisplay
        message={errorMessage}
        buttonText="ホームに戻る"
        onButtonClick="/"
      />
    );
  }

  // ローディング表示
  return (
    <Loading
      message={
        status === "joining" ? "家族に参加しています..." : "招待情報を確認中..."
      }
      fullScreen
      gradient
    />
  );
}
