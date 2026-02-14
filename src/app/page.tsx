"use client";

import { useRouter } from "next/navigation";
import { LoginScreen } from "../components/LoginScreen";
import { useAuth } from "@/contexts/AuthContext";
import { getApiUrl } from "@/lib/env";
import { useEffect } from "react";
import { Loading } from "@/components/ui/loading";

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  // 認証済みユーザーはダッシュボードへリダイレクト
  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push("/dashboard");
    }
  }, [loading, isAuthenticated, router]);

  // ローディング中は認証状態確認中の表示
  if (loading) {
    return <Loading message="認証状態を確認中..." fullScreen gradient />;
  }

  const handleLogin = () => {
    // Google OAuth認証へリダイレクト（外部URL）
    globalThis.location.href = getApiUrl("/auth/google");
  };

  return isAuthenticated ? null : <LoginScreen onLogin={handleLogin} />;
}
