'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { SettingsScreen } from '../../components/SettingsScreen';
import type { Screen } from '../../types';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

export default function SettingsPage() {
  const router = useRouter();
  const { loading, isAuthenticated, isBelongsToFamily } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/");
    }
  }, [loading, isAuthenticated, router]);

  const handleBack = () => {
    router.push('/dashboard');
  };

  const handleLogout = async () => {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include", // Cookieを送信
    });
    if (response.ok) {
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
