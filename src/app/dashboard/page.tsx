"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Dashboard } from "../../components/Dashboard";
import type { Screen } from "../../types";
import { useAuth } from "@/contexts/AuthContext";
import { Loading } from "@/components/ui/loading";
import { NoFamilyMessage } from "@/components/NoFamilyMessage";

export default function DashboardPage() {
  const router = useRouter();
  const { loading, isAuthenticated, isBelongsToFamily } = useAuth();

  if (loading) {
    return <Loading message="認証状態を確認中..." fullScreen gradient />;
  }

  if (!isAuthenticated) {
    window.location.href = "/"; // ログアウト後にトップページへリダイレクト
    return null;
  }

  if (!isBelongsToFamily) {
    return (
      <NoFamilyMessage
        title="家族に参加していません"
        description="家族日記を始めるには、家族を作成するか、招待リンクから参加してください。"
      />
    );
  }

  const handleNavigate = (screen: Screen) => {
    const screenRoutes: Record<Screen, string> = {
      login: "/",
      "create-family": "/create-family",
      dashboard: "/dashboard",
      post: "/post",
      analysis: "/analysis",
      settings: "/settings",
      invite: "/settings/invite",
      "profile-edit": "/settings/profile-edit",
    };

    const route = screenRoutes[screen];
    if (route) {
      router.push(route);
    }
  };

  return <Dashboard onNavigate={handleNavigate} />;
}
