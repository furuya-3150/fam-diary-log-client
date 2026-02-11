'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ProfileEditScreen } from '../../../components/ProfileEditScreen';

export default function ProfileEditPage() {
  const router = useRouter();

  useEffect(() => {
  }, [router]);

  const handleBack = () => {
    router.push('/settings');
  };

  return <ProfileEditScreen onBack={handleBack} />;
}
