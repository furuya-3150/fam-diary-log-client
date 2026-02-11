'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { NotificationScreen } from '../../../components/NotificationScreen';

export default function NotificationsPage() {
  const router = useRouter();

  useEffect(() => {
    // 認証チェック
  }, [router]);

  const handleBack = () => {
    router.push('/settings');
  };

  return <NotificationScreen onBack={handleBack} />;
}
