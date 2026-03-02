"use client";

import { useState, useEffect } from "react";
import {
  ArrowLeft,
  TrendingUp,
  Award,
  Clock,
  BookOpen,
  Target,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Tooltip as UITooltip,
  TooltipTrigger,
  TooltipContent,
} from "./ui/tooltip";
import { useAuth } from "@/contexts/AuthContext";
import { Loading } from "./ui/loading";
import {
  getWeeklyAccuracyScore,
  getWeeklyWordCount,
  getWeeklyWritingTime,
  getDiaryStreak,
  calculateWeeklyAverage,
  convertWeeklyDataToChartData,
} from "@/lib/actions/diaries";

interface AnalysisDashboardProps {
  onBack: () => void;
}

export function AnalysisDashboard({
  onBack,
}: Readonly<AnalysisDashboardProps>) {
  const { loading: authLoading, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);

  // 統計データ
  const [averageScore, setAverageScore] = useState<number>(0);
  const [averageWordCount, setAverageWordCount] = useState<number>(0);
  const [averageWritingTime, setAverageWritingTime] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);

  // グラフデータ
  const [vocabularyData, setVocabularyData] = useState<
    Array<{ date: string; [key: string]: string | number }>
  >([]);
  const [writingSpeedData, setWritingSpeedData] = useState<
    Array<{ date: string; [key: string]: string | number }>
  >([]);
  const [writingTimeData, setWritingTimeData] = useState<
    Array<{ date: string; [key: string]: string | number }>
  >([]);

  // データ取得
  useEffect(() => {
    if (authLoading || !isAuthenticated) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        // 並列で全データを取得
        const [scoreData, wordCountData, writingTimeData, streakDays] =
          await Promise.all([
            getWeeklyAccuracyScore(),
            getWeeklyWordCount(),
            getWeeklyWritingTime(),
            getDiaryStreak(),
          ]);

        // 平均値を計算
        setAverageScore(calculateWeeklyAverage(scoreData));
        setAverageWordCount(Math.round(calculateWeeklyAverage(wordCountData)));
        setAverageWritingTime(calculateWeeklyAverage(writingTimeData));
        setStreak(streakDays);

        // グラフデータに変換
        setVocabularyData(convertWeeklyDataToChartData(scoreData, "score"));
        setWritingSpeedData(
          convertWeeklyDataToChartData(wordCountData, "words"),
        );
        setWritingTimeData(
          convertWeeklyDataToChartData(writingTimeData, "minutes"),
        );
      } catch (error) {
        console.error("分析データの取得エラー:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [authLoading, isAuthenticated]);

  // グラフ統計情報を計算
  const getChartStats = (
    data: Array<{ [key: string]: string | number }>,
    valueKey: string,
  ) => {
    if (data.length === 0) return { avg: 0, max: 0, min: 0 };

    const values = data.map((d) => d[valueKey] as number);
    const avg =
      Math.round((values.reduce((sum, v) => sum + v, 0) / values.length) * 10) /
      10;
    const max = Math.max(...values);
    const min = Math.min(...values);

    return { avg, max, min };
  };

  if (authLoading || loading) {
    return <Loading message="読み込み中..." fullScreen gradient />;
  }

  // 各グラフの統計情報
  const scoreStats = getChartStats(vocabularyData, "score");
  const wordStats = getChartStats(writingSpeedData, "words");
  const timeStats = getChartStats(writingTimeData, "minutes");
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>戻る</span>
          </button>

          <h2 className="text-gray-900">執筆レポート</h2>

          <div className="w-20"></div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">平均スコア</p>
                <p className="text-gray-900">{averageScore}点</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">平均文字数</p>
                <p className="text-gray-900">{averageWordCount}文字</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">平均執筆時間</p>
                <p className="text-gray-900">{averageWritingTime}分</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">連続日数</p>
                <p className="text-gray-900">{streak}日</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Vocabulary Score Chart */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-gray-900 mb-4">語彙レベルの推移</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={vocabularyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#4f46e5"
                  strokeWidth={3}
                  dot={{ fill: "#4f46e5", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-sm text-gray-600 mt-4">
              平均: {scoreStats.avg}点 • 最高: {scoreStats.max}点 • 最低:{" "}
              {scoreStats.min}点
            </p>
          </div>

          {/* Writing Speed Chart */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-gray-900 mb-4">文章量の推移</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={writingSpeedData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="words" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-sm text-gray-600 mt-4">
              平均: {wordStats.avg}文字 • 最高: {wordStats.max}文字 • 最低:{" "}
              {wordStats.min}文字
            </p>
          </div>

          {/* Writing Time Chart */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-gray-900 mb-4">執筆時間の推移</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={writingTimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="minutes"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  dot={{ fill: "#8b5cf6", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-sm text-gray-600 mt-4">
              平均: {timeStats.avg}分 • 最高: {timeStats.max}分 • 最低:{" "}
              {timeStats.min}分
            </p>
          </div>

          {/* Badges */}
          <UITooltip>
            <TooltipTrigger asChild>
              <div className="bg-gray-400 hover:bg-gray-500 rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-900 flex items-center gap-2">
                    <Award className="w-5 h-5 text-yellow-500" />
                    達成バッジ
                  </h3>
                  {/* <TooltipTrigger asChild>
                  <div className="text-sm text-gray-700"></div>
                </TooltipTrigger> */}
                </div>

                {/* <div className="space-y-3 cursor-help" aria-hidden>
                  {badges.map((badge) => (
                    <div
                      key={badge.id}
                      className="flex items-center gap-3 p-3 rounded-lg border transition-all bg-gray-400 border-gray-200 opacity-90"
                    >
                      <div className="text-3xl">{badge.icon}</div>
                      <div className="flex-1">
                        <p className="text-gray-900">{badge.name}</p>
                        <p className="text-sm text-gray-600">
                          {badge.description}
                        </p>
                      </div>
                      {badge.unlocked && (
                        <Award className="w-5 h-5 text-yellow-500" />
                      )}
                    </div>
                  ))}
                </div> */}
              </div>
            </TooltipTrigger>
            <TooltipContent sideOffset={8}>
              <span>近日公開</span>
            </TooltipContent>
          </UITooltip>
        </div>
      </div>
    </div>
  );
}
