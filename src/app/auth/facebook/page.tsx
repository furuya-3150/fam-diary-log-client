'use client';

import { useRouter } from 'next/navigation';
import { FacebookAuthScreen } from '../../../components/FacebookAuthScreen';

export default function FacebookAuthPage() {
  const router = useRouter();

  const handleSuccess = () => {
    sessionStorage.setItem('isAuthenticated', 'true');
    
    const hasFamily = sessionStorage.getItem('hasFamily') === 'true';
    
    if (!hasFamily) {
      router.push('/create-family');
    } else {
      router.push('/dashboard');
    }
  };

  const handleCancel = () => {
    router.push('/');
  };

  return (
    <FacebookAuthScreen 
      onSuccess={handleSuccess}
      onCancel={handleCancel}
    />
  );
}
