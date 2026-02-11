'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { TwoFactorAuthScreen } from '../../../components/TwoFactorAuthScreen';

export default function TwoFactorAuthPage() {
  const router = useRouter();

  useEffect(() => {
    // 認証チェック
  }, [router]);

  const handleBack = () => {
    router.push('/settings');
  };

  return <TwoFactorAuthScreen onBack={handleBack} />;
}
