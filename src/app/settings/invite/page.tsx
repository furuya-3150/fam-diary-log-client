'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { InviteScreen } from '../../../components/InviteScreen';

export default function InvitePage() {
  const router = useRouter();

  useEffect(() => {
  }, [router]);

  const handleBack = () => {
    router.push('/settings');
  };

  return <InviteScreen onBack={handleBack} />;
}
