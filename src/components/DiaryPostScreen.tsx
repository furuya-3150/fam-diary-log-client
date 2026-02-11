'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Clock, CheckCircle, AlertCircle, Image as ImageIcon } from 'lucide-react';
import { DiaryPost } from '../types';

interface DiaryPostScreenProps {
  onBack: () => void;
  onSubmit: (post: Partial<DiaryPost>) => void;
}

const TIME_LIMIT = 300; // 5 minutes in seconds

export function DiaryPostScreen({ onBack, onSubmit }: DiaryPostScreenProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(TIME_LIMIT);
  const [isTimerActive, setIsTimerActive] = useState(false);
  // const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);

  useEffect(() => {
    if (isTimerActive && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isTimerActive, timeRemaining]);

  useEffect(() => {
    if (content.length > 0 && !isTimerActive) {
      setIsTimerActive(true);
      setStartTime(new Date());
    }
  }, [content, isTimerActive]);

  useEffect(() => {
  }, [content]);

  const handleSubmit = () => {
    const writingTime = startTime ? Math.floor((new Date().getTime() - startTime.getTime()) / 1000) : 0;

    onSubmit({
      title,
      content,
      // vocabularyScore,
      writingTime,
      // image: selectedImage || undefined,
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  {/* TODO: 画像アップロード機能実装 */}
  // const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setSelectedImage(reader.result as string);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>戻る</span>
          </button>

          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            timeRemaining < 60 ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
          }`}>
            <Clock className="w-5 h-5" />
            <span>{formatTime(timeRemaining)}</span>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-gray-900 mb-6">今日の日記</h2>

          {/* Title Input */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">タイトル</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="今日の出来事を一言で"
              maxLength={50}
            />
            <p className="text-sm text-gray-500 mt-1">{title.length}/50</p>
          </div>

          {/* Content Input */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">本文</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[200px] resize-none"
              placeholder="今日あったことを詳しく書いてみましょう。&#10;シンプルな言葉で書くことで、認知機能のトレーニングになります。"
            />
            <p className="text-sm text-gray-500 mt-1">{content.length}文字</p>
          </div>

          {/* TODO: 画像アップロード機能実装 */}
          {/* Image Upload */}
          {/* <div className="mb-6">
            <label className="block text-gray-700 mb-2">写真を追加</label>
            <div className="flex items-center gap-4">
              {selectedImage ? (
                <div className="relative">
                  <img
                    src={selectedImage}
                    alt="Selected"
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <label className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-colors">
                  <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">写真を選択</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div> */}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!title || !content || content.length < 1}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            確認画面へ進む
          </button>
        </div>
      </div>
    </div>
  );
}