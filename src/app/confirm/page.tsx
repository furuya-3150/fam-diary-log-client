'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PostConfirmation } from '../../components/PostConfirmation';
import type { DiaryPost } from '../../types';

export default function ConfirmPage() {
  const router = useRouter();
  const [currentPost, setCurrentPost] = useState<Partial<DiaryPost> | null>(null);

  useEffect(() => {
    // 投稿データを取得
    const postData = sessionStorage.getItem('currentPost');
    if (postData) {
      setCurrentPost(JSON.parse(postData));
    } else {
      // 投稿データがない場合はダッシュボードへ
      router.push('/dashboard');
    }
  }, [router]);

  const handleConfirm = () => {
    // 投稿を確定（実際はバックエンドへ送信）
    sessionStorage.removeItem('currentPost');
    router.push('/dashboard');
  };

  const handleBack = () => {
    router.push('/post');
  };

  if (!currentPost) {
    return null;
  }

  return (
    <PostConfirmation 
      post={currentPost}
      onConfirm={handleConfirm}
      onBack={handleBack}
    />
  );
}
