'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { LoginHistoryScreen } from '../../../components/LoginHistoryScreen';

export default function LoginHistoryPage() {
  const router = useRouter();

  useEffect(() =>{
  }, [router]);

  const handleBack = () => {
    router.push('/settings');
  };

  return <LoginHistoryScreen onBack={handleBack} />;
}
