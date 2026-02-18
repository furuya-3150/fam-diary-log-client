"use client";

import { useState, useEffect } from "react";
import { PenSquare, TrendingUp, Settings, Award, Clock } from "lucide-react";
import { Screen } from "../types";
import { useAuth } from "@/contexts/AuthContext";
import { Loading } from "./ui/loading";
import { useRouter } from "next/navigation";
import {
  getTodayDiaries,
  getMonthlyDiariesCount,
  getDiaryStreak,
  getWeeklyAccuracyScore,
  type DiaryPost,
  calculateWeeklyAverage,
} from "@/lib/actions/diaries";
import { ErrorDisplay } from "./ui/error-display";
import { useMembers } from "@/contexts/MembersContext";

interface DashboardProps {
  onNavigate: (screen: Screen) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const router = useRouter();
  const { loading, isAuthenticated } = useAuth();
  const { members: memberNameById, loading: membersLoading } = useMembers();
  const [posts, setPosts] = useState<DiaryPost[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 統計データ
  const [monthlyCount, setMonthlyCount] = useState<number>(0);
  const [averageScore, setAverageScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);

  // 日記データと統計データの取得
  useEffect(() => {
    console.log(
      "Dashboard: loading=",
      loading,
      "isAuthenticated=",
      isAuthenticated,
    );
    if (loading || !isAuthenticated) return;

    const fetchData = async () => {
      try {
        setLoadingPosts(true);
        setError(null);

        // 並列で全データを取得
        const [diaries, count, score, streakDays] = await Promise.all([
          getTodayDiaries(),
          getMonthlyDiariesCount(),
          getWeeklyAccuracyScore(),
          getDiaryStreak(),
        ]);

        setPosts(diaries);
        setMonthlyCount(count);
        setAverageScore(calculateWeeklyAverage(score));
        setStreak(streakDays);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "データの取得に失敗しました";
        setError(errorMessage);
      } finally {
        setLoadingPosts(false);
      }
    };

    fetchData();
  }, [loading]);
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
              <p className="text-gray-900">{monthlyCount}回</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-green-600">
                <TrendingUp className="w-5 h-5" />
                <span>平均スコア</span>
              </div>
              <p className="text-gray-900">{averageScore}点</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-purple-600">
                <Award className="w-5 h-5" />
                <span>連続日数</span>
              </div>
              <p className="text-gray-900">{streak}日</p>
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
              {posts.map((diary) => (
                <div
                  key={diary.id}
                  className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    {diary.image && (
                      <img
                        src={diary.image}
                        alt=""
                        className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                      />
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {/* TODO: ユーザーのアイコン */}
                        <h3 className="text-gray-900">{diary.title}</h3>
                        <div className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                          <Award className="w-3 h-3" />
                          {/* <span>{diary.vocabularyScore}</span> */}
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                        {diary.content}
                      </p>

                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span>{memberNameById[diary.userId]}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <TimeAgo timestamp={diary.timestamp} />
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
