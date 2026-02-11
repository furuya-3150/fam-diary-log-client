'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { DiaryPostScreen } from '../../components/DiaryPostScreen';
import type { DiaryPost } from '../../types';

export default function PostPage() {
  const router = useRouter();

  useEffect(() => {
  }, [router]);

  const handleBack = () => {
    router.push('/dashboard');
  };

  const handleSubmit = (post: Partial<DiaryPost>) => {
    // 投稿データをsessionStorageに保存して確認画面へ
    sessionStorage.setItem('currentPost', JSON.stringify(post));
    router.push('/confirm');
  };

  return (
    <DiaryPostScreen 
      onBack={handleBack}
      onSubmit={handleSubmit}
    />
  );
}
