'use client';

import { ArrowLeft, TrendingUp, Award, Clock, BookOpen, Target } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AnalysisDashboardProps {
  onBack: () => void;
}

const vocabularyData = [
  { date: '12/1', score: 75 },
  { date: '12/2', score: 78 },
  { date: '12/3', score: 82 },
  { date: '12/4', score: 80 },
  { date: '12/5', score: 85 },
  { date: '12/6', score: 83 },
  { date: '12/7', score: 88 },
];

const writingSpeedData = [
  { date: '12/1', words: 120 },
  { date: '12/2', words: 135 },
  { date: '12/3', words: 142 },
  { date: '12/4', words: 138 },
  { date: '12/5', words: 155 },
  { date: '12/6', words: 148 },
  { date: '12/7', words: 160 },
];

const writingTimeData = [
  { date: '12/1', minutes: 8.5 },
  { date: '12/2', minutes: 7.8 },
  { date: '12/3', minutes: 7.2 },
  { date: '12/4', minutes: 7.5 },
  { date: '12/5', minutes: 6.8 },
  { date: '12/6', minutes: 7.0 },
  { date: '12/7', minutes: 6.5 },
];

const badges = [
  { id: '1', name: '7日連続', icon: '🔥', description: '7日間連続で投稿', unlocked: true },
  { id: '2', name: '語彙マスター', icon: '📚', description: '高スコアを5回達成', unlocked: true },
  { id: '3', name: '早書き達人', icon: '⚡', description: '5分以内に投稿を3回達成', unlocked: false },
  { id: '4', name: '月間チャンピオン', icon: '🏆', description: '月間30回投稿', unlocked: false },
];

export function AnalysisDashboard({ onBack }: AnalysisDashboardProps) {
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

          <h2 className="text-gray-900">認知機能ダッシュボード</h2>

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
                <p className="text-gray-900">82点</p>
              </div>
            </div>
            <div className="text-xs text-green-600 flex items-center gap-1">
              <span>↑ 5%</span>
              <span className="text-gray-500">先週比</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">平均文字数</p>
                <p className="text-gray-900">145文字</p>
              </div>
            </div>
            <div className="text-xs text-green-600 flex items-center gap-1">
              <span>↑ 8%</span>
              <span className="text-gray-500">先週比</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">平均執筆時間</p>
                <p className="text-gray-900">7.3分</p>
              </div>
            </div>
            <div className="text-xs text-green-600 flex items-center gap-1">
              <span>↓ 12%</span>
              <span className="text-gray-500">短縮</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">連続日数</p>
                <p className="text-gray-900">7日</p>
              </div>
            </div>
            <div className="text-xs text-green-600 flex items-center gap-1">
              <span>🔥</span>
              <span className="text-gray-500">継続中</span>
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
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px' 
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#4f46e5" 
                  strokeWidth={3}
                  dot={{ fill: '#4f46e5', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-sm text-gray-600 mt-4">
              平均: 82点 • 最高: 88点 • 最低: 75点
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
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px' 
                  }}
                />
                <Bar 
                  dataKey="words" 
                  fill="#10b981" 
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-sm text-gray-600 mt-4">
              平均: 145文字 • 最高: 160文字 • 最低: 120文字
            </p>
          </div>

          {/* Writing Time Chart */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-gray-900 mb-4">執筆時間の推移</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={writingTimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px' 
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="minutes" 
                  stroke="#8b5cf6" 
                  strokeWidth={3}
                  dot={{ fill: '#8b5cf6', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-sm text-gray-600 mt-4">
              集中して短時間で書けるようになっています
            </p>
          </div>

          {/* Badges */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-gray-900 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-500" />
              達成バッジ
            </h3>
            <div className="space-y-3">
              {badges.map((badge) => (
                <div
                  key={badge.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                    badge.unlocked
                      ? 'bg-yellow-50 border-yellow-200'
                      : 'bg-gray-50 border-gray-200 opacity-60'
                  }`}
                >
                  <div className="text-3xl">{badge.icon}</div>
                  <div className="flex-1">
                    <p className="text-gray-900">{badge.name}</p>
                    <p className="text-sm text-gray-600">{badge.description}</p>
                  </div>
                  {badge.unlocked && (
                    <Award className="w-5 h-5 text-yellow-500" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Insights */}
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6 border border-indigo-200">
          <h3 className="text-indigo-900 mb-4">📊 今週の分析結果</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4">
              <p className="text-green-600 mb-1">👍 良い傾向</p>
              <p className="text-sm text-gray-700">
                語彙レベルが安定して向上しています。日常的な言葉を使いながらも、表現力が豊かになっています。
              </p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="text-blue-600 mb-1">💪 継続中</p>
              <p className="text-sm text-gray-700">
                7日間連続で投稿を続けています。この調子で習慣化していきましょう。
              </p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="text-purple-600 mb-1">🎯 次の目標</p>
              <p className="text-sm text-gray-700">
                月間30回投稿を目指しましょう。あと18回です。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}