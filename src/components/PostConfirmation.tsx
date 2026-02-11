'use client';

import { useState } from 'react';
import { ArrowLeft, Users, Edit2, Trash2, Check } from 'lucide-react';
import { DiaryPost } from '../types';

interface PostConfirmationProps {
  post: Partial<DiaryPost>;
  onConfirm: () => void;
  onBack: () => void;
}

const mockFamilyMembers = [
  { id: '1', name: 'お母さん', avatar: '👩' },
  { id: '2', name: 'お父さん', avatar: '👨' },
  { id: '3', name: '太郎', avatar: '👦' },
  { id: '4', name: '花子', avatar: '👧' },
];

export function PostConfirmation({ post, onConfirm, onBack }: PostConfirmationProps) {
  const [selectedMembers, setSelectedMembers] = useState<string[]>(
    mockFamilyMembers.map(m => m.id)
  );

  const toggleMember = (memberId: string) => {
    setSelectedMembers(prev =>
      prev.includes(memberId)
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
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

          <h2 className="text-gray-900">投稿確認</h2>

          <div className="w-20"></div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Post Preview */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900">投稿プレビュー</h3>
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700"
            >
              <Edit2 className="w-4 h-4" />
              <span className="text-sm">編集</span>
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <h2 className="text-gray-900 mb-2">{post.title}</h2>
              <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
            </div>

            {post.image && (
              <img
                src={post.image}
                alt=""
                className="w-full max-w-md rounded-lg"
              />
            )}

            <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                  👤
                </div>
                <span className="text-gray-700">あなた</span>
              </div>

              {post.vocabularyScore && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-600">語彙スコア:</span>
                  <span className={`px-2 py-1 rounded ${
                    post.vocabularyScore >= 80 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {post.vocabularyScore}点
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sharing Settings */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-gray-700" />
            <h3 className="text-gray-900">共有範囲設定</h3>
          </div>

          <p className="text-gray-600 text-sm mb-4">
            この投稿を見ることができる家族メンバーを選択してください
          </p>

          <div className="space-y-3">
            {mockFamilyMembers.map((member) => (
              <label
                key={member.id}
                className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={selectedMembers.includes(member.id)}
                  onChange={() => toggleMember(member.id)}
                  className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
                />
                <div className="flex items-center gap-2 flex-1">
                  <span className="text-2xl">{member.avatar}</span>
                  <span className="text-gray-900">{member.name}</span>
                </div>
                {selectedMembers.includes(member.id) && (
                  <Check className="w-5 h-5 text-indigo-600" />
                )}
              </label>
            ))}
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              選択したメンバー: {selectedMembers.length}人
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={onConfirm}
            disabled={selectedMembers.length === 0}
            className="w-full bg-indigo-600 text-white py-4 rounded-xl hover:bg-indigo-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Check className="w-5 h-5" />
            <span>投稿する</span>
          </button>

          <button
            onClick={onBack}
            className="w-full border border-gray-300 text-gray-700 py-3 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            <Edit2 className="w-5 h-5" />
            <span>内容を修正する</span>
          </button>

          <button className="w-full text-red-600 py-3 rounded-xl hover:bg-red-50 transition-colors flex items-center justify-center gap-2">
            <Trash2 className="w-5 h-5" />
            <span>破棄する</span>
          </button>
        </div>

        {/* Privacy Notice */}
        <div className="bg-green-50 rounded-xl p-4 border border-green-200">
          <h4 className="text-green-900 mb-2">🔒 プライバシー保護</h4>
          <p className="text-sm text-green-800">
            投稿は選択した家族メンバーのみが閲覧できます。家族以外の第三者には表示されません。
          </p>
        </div>
      </div>
    </div>
  );
}