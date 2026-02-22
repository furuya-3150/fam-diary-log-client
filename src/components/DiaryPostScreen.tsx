"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Clock } from "lucide-react";
import { useDiaryFormStore } from "@/store/diaryFormStore";
import { createDiary } from "@/lib/actions/diaries";
import { toast } from "sonner";

interface DiaryPostScreenProps {
  onBack: () => void;
  onSuccess?: () => void;
}

const TIME_LIMIT = 300; // 5 minutes in seconds

export function DiaryPostScreen({
  onBack,
  onSuccess,
}: Readonly<DiaryPostScreenProps>) {
  const [timeRemaining, setTimeRemaining] = useState(TIME_LIMIT);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);

  const {
    title,
    content,
    errors,
    isSubmitting,
    setTitle,
    setContent,
    validateAll,
    setSubmitting,
    reset,
  } = useDiaryFormStore();

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

  const handleSubmit = async () => {
    if (!validateAll()) {
      toast.error("入力内容を確認してください");
      return;
    }

    setSubmitting(true);

    try {
      // 執筆時間を計算（秒単位）
      const writingTime = startTime
        ? Math.floor((Date.now() - startTime.getTime()) / 1000)
        : 0;

      await createDiary({
        title: title.trim(),
        content: content.trim(),
        writing_time_seconds: writingTime,
      });

      toast.success("日記を投稿しました！");
      reset();
      onSuccess?.();
    } catch (error) {
      console.error("日記投稿エラー:", error);
      toast.error(
        error instanceof Error ? error.message : "日記の投稿に失敗しました",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

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

          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              timeRemaining < 60
                ? "bg-red-100 text-red-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
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
            <label htmlFor="diary-title" className="block text-gray-700 mb-2">
              タイトル <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="diary-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() => useDiaryFormStore.getState().validateTitle()}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="今日の出来事を一言で"
              maxLength={255}
            />
            <div className="flex justify-between items-center mt-1">
              <p
                className={`text-sm ${
                  errors.title ? "text-red-600" : "text-gray-500"
                }`}
              >
                {errors.title || `${title.length}/255`}
              </p>
            </div>
          </div>

          {/* Content Input */}
          <div className="mb-6">
            <label htmlFor="diary-content" className="block text-gray-700 mb-2">
              本文 <span className="text-red-600">*</span>
            </label>
            <textarea
              id="diary-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onBlur={() => useDiaryFormStore.getState().validateContent()}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[200px] resize-none ${
                errors.content ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="今日あったことを詳しく書いてみましょう。&#10;シンプルな言葉で書くことで、認知機能のトレーニングになります。"
              maxLength={1000}
            />
            <div className="flex justify-between items-center mt-1">
              <p
                className={`text-sm ${
                  errors.content ? "text-red-600" : "text-gray-500"
                }`}
              >
                {errors.content || `${content.length}/1500文字`}
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={
              !title.trim() ||
              !content.trim() ||
              content.trim().length < 10 ||
              isSubmitting
            }
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "投稿中..." : "日記を投稿する"}
          </button>
        </div>
      </div>
    </div>
  );
}
