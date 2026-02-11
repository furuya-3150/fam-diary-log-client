'use client';

import { useRouter } from 'next/navigation';
import { GoogleAuthScreen } from '../../../components/GoogleAuthScreen';

export default function GoogleAuthPage() {
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
    <GoogleAuthScreen 
      onSuccess={handleSuccess}
      onCancel={handleCancel}
    />
  );
}
