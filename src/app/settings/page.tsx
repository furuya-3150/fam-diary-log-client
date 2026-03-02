'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { SettingsScreen } from '../../components/SettingsScreen';
import type { Screen } from '../../types';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { Loading } from '@/components/ui/loading';

export default function SettingsPage() {
  const router = useRouter();
  const { loading, isAuthenticated, isBelongsToFamily } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return <Loading message="認証状態を確認中..." fullScreen gradient />;
  }

  const handleBack = () => {
    router.push('/dashboard');
  };

  const handleLogout = async () => {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include", // Cookieを送信
    });
    console.log("ログアウトリクエストのレスポンス", response, __filename);
    if (response.ok) {
      console.log("ログアウト成功: サーバーからの応答", await response.json(), __filename);
      window.location.href = "/"; // ログアウト後にトップページへリダイレクト
    } else {
      console.error("Logout failed");
      toast.error("ログアウトに失敗しました。もう一度お試しください。");
    }
  };

  const handleNavigate = (screen: Screen) => {
    const screenRoutes: Record<Screen, string> = {
      'login': '/',
      'create-family': '/create-family',
      'dashboard': '/dashboard',
      'post': '/post',
      'analysis': '/analysis',
      'settings': '/settings',
      'invite': '/settings/invite',
      'profile-edit': '/settings/profile-edit',
    };

    const route = screenRoutes[screen];
    if (route) {
      router.push(route);
    }
  };

  return (
    isBelongsToFamily ? 
    <SettingsScreen 
      onBack={handleBack}
      onLogout={handleLogout}
      onNavigate={handleNavigate}
    /> : router.push('/dashboard')
  );
}
