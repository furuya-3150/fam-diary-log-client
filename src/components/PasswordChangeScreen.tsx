'use client';

import { ArrowLeft, Lock, Eye, EyeOff, Check, X } from 'lucide-react';
import { useState } from 'react';

interface PasswordChangeScreenProps {
  onBack: () => void;
}

interface PasswordRequirement {
  text: string;
  met: boolean;
}

export function PasswordChangeScreen({ onBack }: PasswordChangeScreenProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // パスワード要件のチェック
  const requirements: PasswordRequirement[] = [
    {
      text: '8文字以上',
      met: newPassword.length >= 8,
    },
    {
      text: '大文字を含む',
      met: /[A-Z]/.test(newPassword),
    },
    {
      text: '小文字を含む',
      met: /[a-z]/.test(newPassword),
    },
    {
      text: '数字を含む',
      met: /[0-9]/.test(newPassword),
    },
  ];

  const allRequirementsMet = requirements.every(req => req.met);
  const passwordsMatch = newPassword === confirmPassword && confirmPassword !== '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentPassword) {
      alert('現在のパスワードを入力してください');
      return;
    }

    if (!allRequirementsMet) {
      alert('パスワードがすべての要件を満たしていません');
      return;
    }

    if (!passwordsMatch) {
      alert('新しいパスワードが一致しません');
      return;
    }

    setIsSubmitting(true);

    // モック送信
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }, 1000);
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

          <h2 className="text-gray-900">パスワード変更</h2>

          <div className="w-20"></div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {success && (
          <div className="bg-green-50 rounded-xl border border-green-200 p-6">
            <div className="flex items-center gap-3">
              <Check className="w-6 h-6 text-green-600" />
              <p className="text-green-900">パスワードを変更しました</p>
            </div>
          </div>
        )}

        {/* セキュリティ説明 */}
        <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
          <div className="flex items-center gap-3 mb-3">
            <Lock className="w-5 h-5 text-blue-600" />
            <h3 className="text-blue-900">パスワードのセキュリティ</h3>
          </div>
          <p className="text-sm text-blue-800">
            安全なパスワードを設定することで、アカウントを不正アクセスから保護できます。
            定期的なパスワード変更をお勧めします。
          </p>
        </div>

        {/* パスワード変更フォーム */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
          {/* 現在のパスワード */}
          <div>
            <label htmlFor="current" className="block text-gray-900 mb-2">
              現在のパスワード <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <input
                type={showCurrent ? 'text' : 'password'}
                id="current"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="現在のパスワードを入力"
                className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showCurrent ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-5">
            {/* 新しいパスワード */}
            <div className="mb-5">
              <label htmlFor="new" className="block text-gray-900 mb-2">
                新しいパスワード <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <input
                  type={showNew ? 'text' : 'password'}
                  id="new"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="新しいパスワードを入力"
                  className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showNew ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* パスワード要件 */}
            {newPassword && (
              <div className="mb-5 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-700 mb-3">パスワードの要件：</p>
                <div className="space-y-2">
                  {requirements.map((req, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      {req.met ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <X className="w-4 h-4 text-gray-400" />
                      )}
                      <span className={req.met ? 'text-green-700' : 'text-gray-600'}>
                        {req.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* パスワード確認 */}
            <div>
              <label htmlFor="confirm" className="block text-gray-900 mb-2">
                新しいパスワード（確認） <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  id="confirm"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="もう一度入力"
                  className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirm ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {confirmPassword && (
                <div className="mt-2 flex items-center gap-2 text-sm">
                  {passwordsMatch ? (
                    <>
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-green-700">パスワードが一致しています</span>
                    </>
                  ) : (
                    <>
                      <X className="w-4 h-4 text-red-600" />
                      <span className="text-red-700">パスワードが一致しません</span>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !allRequirementsMet || !passwordsMatch || !currentPassword}
            className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isSubmitting ? '変更中...' : 'パスワードを変更'}
          </button>
        </form>

        {/* セキュリティのヒント */}
        <div className="bg-amber-50 rounded-xl border border-amber-200 p-6">
          <h4 className="text-amber-900 mb-3">💡 パスワードのベストプラクティス</h4>
          <ul className="space-y-2 text-sm text-amber-800">
            <li>• 他のサービスで使用しているパスワードは避けてください</li>
            <li>• 推測されやすい個人情報（誕生日、名前など）は使わないでください</li>
            <li>• パスワードマネージャーの使用をお勧めします</li>
            <li>• 定期的にパスワードを変更してください</li>
            <li>• 2段階認証と併用することでセキュリティがさらに向上します</li>
          </ul>
        </div>

        {/* パスワードを忘れた場合 */}
        <div className="text-center">
          <button className="text-indigo-600 hover:text-indigo-700">
            現在のパスワードを忘れた場合
          </button>
        </div>
      </div>
    </div>
  );
}