'use client';

import { useRouter } from 'next/navigation';
import { CreateFamilyScreen } from '../../components/CreateFamilyScreen';
import { useAuth } from '@/contexts/AuthContext';
import { Loading } from '@/components/ui/loading';

export default function CreateFamilyPage() {
  const router = useRouter();
  const { loading, isBelongsToFamily, isAuthenticated, user } = useAuth();
  console.log('CreateFamilyPage user:', user);
  if (loading) {
    return <Loading message="認証状態を確認中..." fullScreen gradient />;
  }
  if (!isAuthenticated) {
    router.push('/');
    return
  }

  const handleBack = () => {
    router.push('/dashboard');
  };

  const handleCreateFamily = (familyName: string) => {
    window.location.href = "/dashboard"
  };

  return !isBelongsToFamily ? (
    <CreateFamilyScreen 
      onBack={handleBack}
      onCreateFamily={handleCreateFamily}
    />
    
  ) : router.push('/dashboard');
}
