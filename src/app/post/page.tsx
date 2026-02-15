"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { DiaryPostScreen } from "../../components/DiaryPostScreen";
import type { DiaryPost } from "../../types";
import { useAuth } from "@/contexts/AuthContext";
import { Loading } from "@/components/ui/loading";
import { NoFamilyMessage } from "@/components/NoFamilyMessage";

export default function PostPage() {
  const router = useRouter();
  const { loading, isBelongsToFamily } = useAuth();

  useEffect(() => {}, [router]);

  if (loading) {
    return <Loading message="認証状態を確認中..." fullScreen gradient />;
  }

  const handleBack = () => {
    router.push("/dashboard");
  };

  const handleSubmit = (post: Partial<DiaryPost>) => {
    // 投稿データをsessionStorageに保存して確認画面へ
    sessionStorage.setItem("currentPost", JSON.stringify(post));
    router.push("/confirm");
  };

  return isBelongsToFamily ? (
    <DiaryPostScreen onBack={handleBack} onSubmit={handleSubmit} />
  ) : (
    router.push("/dashboard")
  );
}
