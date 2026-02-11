'use client';

import { Screen } from '@/types';
import { ArrowLeft, Users, Bell, Shield, LogOut, Copy, UserPlus, Trash2, Mail, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface SettingsScreenProps {
  onBack: () => void;
  onLogout: () => void;
  onNavigate?: (screen: Screen) => void;
}

const mockFamilyMembers = [
  { id: '1', name: 'お母さん', email: 'mother@example.com', role: '管理者', avatar: '👩' },
  { id: '2', name: 'お父さん', email: 'father@example.com', role: 'メンバー', avatar: '👨' },
  { id: '3', name: '太郎', email: 'taro@example.com', role: 'メンバー', avatar: '👦' },
  { id: '4', name: '花子', email: 'hanako@example.com', role: 'メンバー', avatar: '👧' },
];

export function SettingsScreen({ onBack, onLogout, onNavigate }: SettingsScreenProps) {
  // const [showInviteCode, setShowInviteCode] = useState(false);
  const [notifications, setNotifications] = useState({
    newPost: true,
    weeklyReport: true,
    achievements: true,
  });

  const inviteCode = 'FAM-2025-BRAIN-XYZ123';

  const copyInviteCode = () => {
    navigator.clipboard.writeText(inviteCode);
    alert('招待コードをコピーしました');
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

          <h2 className="text-gray-900">設定</h2>

          <div className="w-20"></div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Family Management */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-gray-700" />
                <h3 className="text-gray-900">家族メンバー管理</h3>
              </div>
              <button
                onClick={() => onNavigate?.('invite')}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <UserPlus className="w-4 h-4" />
                <span className="text-sm">招待</span>
              </button>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {mockFamilyMembers.map((member) => (
              <div key={member.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl">
                    {member.avatar}
                  </div>
                  <div>
                    <p className="text-gray-900">{member.name}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="w-3 h-3" />
                      <span>{member.email}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                    {member.role}
                  </span>
                  {member.role !== '管理者' && (
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* 参加申請通知ボタン */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={() => onNavigate?.('notifications')}
              className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-indigo-600" />
                <div className="text-left">
                  <p className="text-gray-900">参加申請通知</p>
                  <p className="text-sm text-gray-600">新しい申請を確認・承認</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-sm">2</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-5 h-5 text-gray-700" />
            <h3 className="text-gray-900">通知設定</h3>
          </div>

          <div className="space-y-4">
            <label className="flex items-center justify-between p-4 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50">
              <div>
                <p className="text-gray-900">新しい投稿の通知</p>
                <p className="text-sm text-gray-600">家族が投稿したときに通知</p>
              </div>
              <input
                type="checkbox"
                checked={notifications.newPost}
                onChange={(e) =>
                  setNotifications({ ...notifications, newPost: e.target.checked })
                }
                className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
              />
            </label>

            <label className="flex items-center justify-between p-4 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50">
              <div>
                <p className="text-gray-900">週次レポート</p>
                <p className="text-sm text-gray-600">毎週の進捗レポートを受け取る</p>
              </div>
              <input
                type="checkbox"
                checked={notifications.weeklyReport}
                onChange={(e) =>
                  setNotifications({ ...notifications, weeklyReport: e.target.checked })
                }
                className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
              />
            </label>

            <label className="flex items-center justify-between p-4 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50">
              <div>
                <p className="text-gray-900">達成バッジ通知</p>
                <p className="text-sm text-gray-600">バッジを獲得したときに通知</p>
              </div>
              <input
                type="checkbox"
                checked={notifications.achievements}
                onChange={(e) =>
                  setNotifications({ ...notifications, achievements: e.target.checked })
                }
                className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
              />
            </label>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-5 h-5 text-gray-700" />
            <h3 className="text-gray-900">セキュリティ</h3>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => onNavigate?.('password-change')}
              className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <div className="text-left">
                <p className="text-gray-900">パスワードの変更</p>
                <p className="text-sm text-gray-600">アカウントのパスワードを更新</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button
              onClick={() => onNavigate?.('two-factor-auth')}
              className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <div className="text-left">
                <p className="text-gray-900">2段階認証</p>
                <p className="text-sm text-gray-600">セキュリティを強化する</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button
              onClick={() => onNavigate?.('login-history')}
              className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <div className="text-left">
                <p className="text-gray-900">ログイン履歴</p>
                <p className="text-sm text-gray-600">最近のログイン履歴を確認</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Account */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-gray-900 mb-4">アカウント</h3>

          <div className="space-y-3">
            <button
              onClick={() => onNavigate?.('profile-edit')}
              className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <div className="text-left">
                <p className="text-gray-900">プロフィール編集</p>
                <p className="text-sm text-gray-600">名前やアイコンを変更</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

          </div>
        </div>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors border border-red-200"
        >
          <LogOut className="w-5 h-5" />
          <span>ログアウト</span>
        </button>

        {/* App Info */}
        <div className="text-center text-gray-500 text-sm space-y-1 py-4">
          <p>FamBrain v1.0.0</p>
          <p>© 2025 FamBrain. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}