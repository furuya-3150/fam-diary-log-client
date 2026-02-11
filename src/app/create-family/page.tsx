'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { CreateFamilyScreen } from '../../components/CreateFamilyScreen';

export default function CreateFamilyPage() {
  const router = useRouter();

  useEffect(() => {
    // 認証チェック
  }, [router]);

  const handleBack = () => {
    sessionStorage.removeItem('isAuthenticated');
    router.push('/');
  };

  const handleCreateFamily = (familyName: string) => {
    console.log('Creating family:', familyName);
    sessionStorage.setItem('hasFamily', 'true');
    sessionStorage.setItem('familyName', familyName);
    router.push('/dashboard');
  };

  return (
    <CreateFamilyScreen 
      onBack={handleBack}
      onCreateFamily={handleCreateFamily}
    />
  );
}
