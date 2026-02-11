'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { SettingsScreen } from '../../components/SettingsScreen';
import type { Screen } from '../../types';

export default function SettingsPage() {
  const router = useRouter();

  useEffect(() => {
    // 認証チェック
  }, [router]);

  const handleBack = () => {
    router.push('/dashboard');
  };

  const handleLogout = () => {
    sessionStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('hasFamily');
    sessionStorage.removeItem('familyName');
    sessionStorage.removeItem('currentPost');
    router.push('/');
  };

  const handleNavigate = (screen: Screen) => {
    const screenRoutes: Record<Screen, string> = {
      'login': '/',
      'google-auth': '/auth/google',
      'facebook-auth': '/auth/facebook',
      'create-family': '/create-family',
      'dashboard': '/dashboard',
      'post': '/post',
      'confirm': '/confirm',
      'analysis': '/analysis',
      'settings': '/settings',
      'invite': '/settings/invite',
      'notifications': '/settings/notifications',
      'two-factor-auth': '/settings/two-factor-auth',
      'password-change': '/settings/password-change',
      'login-history': '/settings/login-history',
      'profile-edit': '/settings/profile-edit',
    };

    const route = screenRoutes[screen];
    if (route) {
      router.push(route);
    }
  };

  return (
    <SettingsScreen 
      onBack={handleBack}
      onLogout={handleLogout}
      onNavigate={handleNavigate}
    />
  );
}
