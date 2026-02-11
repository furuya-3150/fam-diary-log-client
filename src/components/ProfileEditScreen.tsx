'use client';

import { ArrowLeft, Camera, User, Mail, Calendar, Phone, MapPin, Check } from 'lucide-react';
import { useState } from 'react';

interface ProfileEditScreenProps {
  onBack: () => void;
}

const avatarOptions = ['👨', '👩', '👴', '👵', '👦', '👧', '🧑', '👨‍🦳', '👩‍🦳', '🙂', '😊', '🌸', '🌟', '🐶', '🐱', '🐻'];

export function ProfileEditScreen({ onBack }: ProfileEditScreenProps) {
  const [profile, setProfile] = useState({
    name: '山田太郎',
    email: 'taro@example.com',
    phone: '090-1234-5678',
    birthday: '1965-05-15',
    location: '東京都',
    bio: '家族との時間を大切にしています。毎日日記を書いて、思い出を残すことが楽しみです。',
    avatar: '👨',
  });

  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // モック保存
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1000);
  };

  const handleAvatarSelect = (avatar: string) => {
    setProfile({ ...profile, avatar });
    setShowAvatarPicker(false);
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

          <h2 className="text-gray-900">プロフィール編集</h2>

          <div className="w-20"></div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {success && (
          <div className="bg-green-50 rounded-xl border border-green-200 p-6">
            <div className="flex items-center gap-3">
              <Check className="w-6 h-6 text-green-600" />
              <p className="text-green-900">プロフィールを更新しました</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* アバター */}
          {/* <div className="bg-white rounded-xl border border-gray-200 p-6"> */}
            {/* <div className="flex items-center gap-6">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowAvatarPicker(!showAvatarPicker)}
                  className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center text-4xl hover:bg-indigo-200 transition-colors relative group"
                >
                  {profile.avatar}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-full flex items-center justify-center transition-all">
                    <Camera className="w-6 h-6 text-white opacity-0 group-hover:opacity-100" />
                  </div>
                </button>
              </div>

              <div>
                <h3 className="text-gray-900 mb-1">プロフィール画像</h3>
                <p className="text-sm text-gray-600 mb-3">
                  アイコンをクリックして変更
                </p>
                <button
                  type="button"
                  onClick={() => setShowAvatarPicker(!showAvatarPicker)}
                  className="text-sm text-indigo-600 hover:text-indigo-700"
                >
                  アイコンを変更
                </button>
              </div>
            </div> */}

            {/* アバター選択 */}
            {/* {showAvatarPicker && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-700 mb-3">アイコンを選択：</p>
                <div className="grid grid-cols-8 gap-2">
                  {avatarOptions.map((avatar, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleAvatarSelect(avatar)}
                      className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl transition-colors ${
                        profile.avatar === avatar
                          ? 'bg-indigo-100 ring-2 ring-indigo-600'
                          : 'bg-white hover:bg-gray-100'
                      }`}
                    >
                      {avatar}
                    </button>
                  ))}
                </div>
              </div>
            )} */}
          {/* </div> */}

          {/* 基本情報 */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
            <h3 className="text-gray-900">基本情報</h3>

            <div>
              <label htmlFor="name" className="flex items-center gap-2 text-gray-900 mb-2">
                <User className="w-4 h-4" />
                <span>お名前 <span className="text-red-600">*</span></span>
              </label>
              <input
                type="text"
                id="name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="flex items-center gap-2 text-gray-900 mb-2">
                <Mail className="w-4 h-4" />
                <span>メールアドレス <span className="text-red-600">*</span></span>
              </label>
              <input
                type="email"
                id="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
              <p className="text-sm text-gray-600 mt-1">
                アプリからの通知はこのメールアドレスに送信されます
              </p>
            </div>
          </div>

          {/* アカウント情報 */}
          <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
            <h4 className="text-blue-900 mb-3">📌 アカウント情報</h4>
            <div className="space-y-2 text-sm text-blue-800">
              <p>• 登録日: 2024年1月15日</p>
              <p>• アカウントID: fambrain_yamada_taro</p>
              <p>• 家族グループ: 山田家</p>
            </div>
          </div>

          {/* 保存ボタン */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onBack}
              className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              キャンセル
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isSubmitting ? '保存中...' : '変更を保存'}
            </button>
          </div>
        </form>

        {/* プライバシー情報 */}
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
          <h4 className="text-gray-900 mb-3">🔒 プライバシー</h4>
          <p className="text-sm text-gray-600">
            あなたのプロフィール情報は家族グループ内のメンバーにのみ表示されます。
          </p>
        </div>
      </div>
    </div>
  );
}