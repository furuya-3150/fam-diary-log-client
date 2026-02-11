'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Dashboard } from '../../components/Dashboard';
import type { Screen } from '../../types';

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
  }, [router]);

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

  return <Dashboard onNavigate={handleNavigate} />;
}
