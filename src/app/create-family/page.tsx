'use client';

import { useRouter } from 'next/navigation';
import { CreateFamilyScreen } from '../../components/CreateFamilyScreen';
import { useAuth } from '@/contexts/AuthContext';
import { Loading } from '@/components/ui/loading';

export default function CreateFamilyPage() {
  const router = useRouter();
  const { loading, isBelongsToFamily } = useAuth();

  if (loading) {
    return <Loading message="認証状態を確認中..." fullScreen gradient />;
  }

  const handleBack = () => {
    router.push('/dashboard');
  };

  const handleCreateFamily = (familyName: string) => {
    console.log('Creating family:', familyName);
    router.push('/dashboard');
  };

  return isBelongsToFamily ? (
    <CreateFamilyScreen 
      onBack={handleBack}
      onCreateFamily={handleCreateFamily}
    />
  ) : null;
}
