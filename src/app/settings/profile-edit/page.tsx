'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ProfileEditScreen } from '../../../components/ProfileEditScreen';
import { useAuth } from '@/contexts/AuthContext';
import { Loading } from '@/components/ui/loading';

export default function ProfileEditPage() {
  const router = useRouter();
  const { loading, isBelongsToFamily } = useAuth();
  useEffect(() => {
  }, [router]);

  const handleBack = () => {
    router.push('/settings');
  };

  if (loading) {
    return <Loading message="認証状態を確認中..." fullScreen gradient />;
  }

  return isBelongsToFamily ? <ProfileEditScreen onBack={handleBack} /> : router.push("/settings");
}
