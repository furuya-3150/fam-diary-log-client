'use client';

import { useRouter } from 'next/navigation';
import { LoginScreen } from '../components/LoginScreen';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = () => {
    // 仮の認証処理
    sessionStorage.setItem('isAuthenticated', 'true');
    
    // 家族グループの有無をチェック（仮実装）
    const hasFamily = sessionStorage.getItem('hasFamily') === 'true';
    
    if (!hasFamily) {
      router.push('/create-family');
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <LoginScreen 
      onLogin={handleLogin}
    />
  );
}
