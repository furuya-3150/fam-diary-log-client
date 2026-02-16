"use client";

import { useState, useEffect } from "react";
import { PenSquare, TrendingUp, Settings, Award, Clock } from "lucide-react";
import { Screen } from "../types";
import { useAuth } from "@/contexts/AuthContext";
import { Loading } from "./ui/loading";
import { useRouter } from "next/navigation";
import { getTodayDiaries, type DiaryPost } from "@/lib/actions/diaries";
import { ErrorDisplay } from "./ui/error-display";

interface DashboardProps {
  onNavigate: (screen: Screen) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const router = useRouter();
  const { loading, isAuthenticated } = useAuth();
  const [posts, setPosts] = useState<DiaryPost[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 日記データの取得
  useEffect(() => {
    if (!isAuthenticated || loading) return;

    const fetchDiaries = async () => {
      try {
        setLoadingPosts(true);
        setError(null);
        const diaries = await getTodayDiaries(); // 今日の日記
        setPosts(diaries);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "日記の取得に失敗しました";
        setError(errorMessage);
      } finally {
        setLoadingPosts(false);
      }
    };

    fetchDiaries();
  }, [isAuthenticated, loading]);

  if (loading) {
    return <Loading message="認証状態を確認中..." fullScreen gradient />;
  }

  if (!isAuthenticated) {
    router.push("/");
    return null;
  }

  // データ読み込み中
  if (loadingPosts) {
    return <Loading message="日記を読み込み中..." fullScreen gradient />;
  }

  // エラー時は全画面でエラー表示
  if (error) {
    return (
      <ErrorDisplay
        message={error}
        title="日記の取得に失敗しました"
        iconType="error"
        onButtonClick={() => globalThis.location.reload()}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-indigo-600">FamDiaryLog</h1>
          <button
            onClick={() => onNavigate("settings")}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Settings className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-blue-600">
                <PenSquare className="w-5 h-5" />
                <span>今月の投稿</span>
              </div>
              <p className="text-gray-900">12回</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-green-600">
                <TrendingUp className="w-5 h-5" />
                <span>平均スコア</span>
              </div>
              <p className="text-gray-900">82点</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-purple-600">
                <Award className="w-5 h-5" />
                <span>連続日数</span>
              </div>
              <p className="text-gray-900">7日</p>
            </div>
          </div>
        </div>

        {/* Post Button */}
        <button
          onClick={() => onNavigate("post")}
          className="w-full bg-indigo-600 text-white py-4 rounded-xl hover:bg-indigo-700 transition-colors flex items-center justify-center gap-3 shadow-lg shadow-indigo-200"
        >
          <PenSquare className="w-6 h-6" />
          <span>今日の日記を書く</span>
        </button>

        {/* Analysis Link */}
        <button
          onClick={() => onNavigate("analysis")}
          className="w-full bg-white border-2 border-indigo-200 text-indigo-600 py-3 rounded-xl hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2"
        >
          <TrendingUp className="w-5 h-5" />
          <span>執筆レポート</span>
        </button>

        {/* Recent Posts */}
        <div>
          <h2 className="text-gray-900 mb-4">家族の今日の投稿</h2>

          {posts.length === 0 ? (
            <div className="bg-white rounded-xl p-8 border border-gray-200 text-center">
              <p className="text-gray-500 mb-4">まだ日記がありません</p>
              <button
                onClick={() => onNavigate("post")}
                className="text-indigo-600 hover:text-indigo-700 font-medium"
              >
                最初の日記を書く
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    {post.image && (
                      <img
                        src={post.image}
                        alt=""
                        className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                      />
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-gray-900">{post.title}</h3>
                        <div className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                          <Award className="w-3 h-3" />
                          {/* <span>{post.vocabularyScore}</span> */}
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                        {post.content}
                      </p>

                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span>{post.author}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <TimeAgo timestamp={post.timestamp} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffInHours = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60),
  );

  if (diffInHours < 24) {
    return `${diffInHours}時間前`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}日前`;
}

function TimeAgo({ timestamp }: { timestamp: Date }) {
  const [timeAgo, setTimeAgo] = useState<string>("");

  useEffect(() => {
    setTimeAgo(formatTimeAgo(timestamp));
  }, [timestamp]);

  if (!timeAgo) {
    return <span>...</span>;
  }

  return <span>{timeAgo}</span>;
}
