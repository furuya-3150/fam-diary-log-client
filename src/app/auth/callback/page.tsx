"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Loading } from "@/components/ui/loading";
import { ErrorDisplay } from "@/components/ui/error-display";
import {
  getJoinToken,
  clearJoinToken,
  submitFamilyJoinRequest,
} from "@/lib/family";
import { toast } from "sonner";

/**
 * 認証後のコールバックページ
 *
 * 認証が完了した後、このページにリダイレクトされる
 * sessionStorageに招待トークンがある場合は自動的に家族参加リクエストを送信
 */
export default function AuthCallbackPage() {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading, refetch } = useAuth();
  const [status, setStatus] = useState<"processing" | "error">("processing");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const handleCallback = async () => {
      if (authLoading) {
        return;
      }

      // 認証情報を再取得（最新の状態を取得）
      await refetch();

      if (!isAuthenticated) {
        setStatus("error");
        setErrorMessage("認証に失敗しました。もう一度お試しください。");
        return;
      }

      // sessionStorageに招待トークンがあるかチェック
      const joinToken = getJoinToken();

      if (joinToken) {
        // 家族参加リクエストを送信
        await submitJoinRequest(joinToken);
      } else {
        // 通常のログイン後の処理
        router.push("/dashboard");
      }
    };

    handleCallback();
  }, [authLoading, isAuthenticated, router, refetch]);

  /**
   * 家族参加リクエストを送信
   */
  const submitJoinRequest = async (token: string) => {
    try {
      await submitFamilyJoinRequest(token);

      // トークンを削除してダッシュボードへ
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
        buttonText="ダッシュボードに戻る"
        onButtonClick="/dashboard"
      />
    );
  }

  // ローディング表示
  return <Loading message="認証処理中..." fullScreen gradient />;
}
