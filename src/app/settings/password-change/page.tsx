'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { PasswordChangeScreen } from '../../../components/PasswordChangeScreen';

export default function PasswordChangePage() {
  const router = useRouter();

  useEffect(() => {
    // 認証チェック
  }, [router]);

  const handleBack = () => {
    router.push('/settings');
  };

  return <PasswordChangeScreen onBack={handleBack} />;
}
