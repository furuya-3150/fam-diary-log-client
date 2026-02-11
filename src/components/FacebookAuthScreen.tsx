'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, Shield, Loader2, AlertCircle, ChevronRight } from 'lucide-react';

interface FacebookAuthScreenProps {
  onSuccess: () => void;
  onCancel: () => void;
}

type AuthStep = 'account-select' | 'consent' | 'authenticating' | 'permissions' | 'success' | 'error';

interface FacebookAccount {
  id: string;
  name: string;
  profilePic: string;
}

const mockAccounts: FacebookAccount[] = [
  {
    id: '1',
    name: '田中 太郎',
    profilePic: '👤'
  },
  {
    id: '2',
    name: '山田 花子',
    profilePic: '👩'
  }
];

export function FacebookAuthScreen({ onSuccess, onCancel }: FacebookAuthScreenProps) {
  const [authStep, setAuthStep] = useState<AuthStep>('account-select');
  const [selectedAccount, setSelectedAccount] = useState<FacebookAccount | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (authStep === 'authenticating') {
      // Facebook認証をシミュレート
      const timer = setTimeout(() => {
        setAuthStep('permissions');
      }, 2000);
      return () => clearTimeout(timer);
    } else if (authStep === 'permissions') {
      // 権限確認をシミュレート
      const timer = setTimeout(() => {
        setAuthStep('success');
      }, 1500);
      return () => clearTimeout(timer);
    } else if (authStep === 'success') {
      // 成功後、自動的にログイン
      const timer = setTimeout(() => {
        onSuccess();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [authStep, onSuccess]);

  const handleAccountSelect = (account: FacebookAccount) => {
    setSelectedAccount(account);
    setAuthStep('consent');
  };

  const handleConsent = () => {
    setAuthStep('authenticating');
  };

  const handleCancel = () => {
    onCancel();
  };

  const handleBackToAccountSelect = () => {
    setAuthStep('account-select');
    setSelectedAccount(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        {/* Facebookロゴとヘッダー */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-md mb-4">
            <svg className="w-10 h-10" fill="#1877F2" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </div>
          <h2 className="text-gray-800">Facebookでログイン</h2>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* アカウント選択画面 */}
          {authStep === 'account-select' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-gray-900 mb-2">アカウントを選択</h3>
                <p className="text-gray-600">
                  FamBrainで使用するFacebookアカウントを選択してください
                </p>
              </div>

              <div className="space-y-3">
                {mockAccounts.map((account) => (
                  <button
                    key={account.id}
                    onClick={() => handleAccountSelect(account)}
                    className="w-full flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-400 rounded-full flex items-center justify-center text-white text-2xl flex-shrink-0">
                      {account.profilePic}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-gray-900">{account.name}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  </button>
                ))}

                <button
                  onClick={() => {
                    // 新しいアカウントでログインの処理
                    setAuthStep('consent');
                  }}
                  className="w-full flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors"
                >
                  <div className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-gray-900">別のアカウントを使用</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                </button>
              </div>

              <button
                onClick={handleCancel}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                キャンセル
              </button>
            </div>
          )}

          {/* 同意画面 */}
          {authStep === 'consent' && (
            <div className="space-y-6">
              {selectedAccount && (
                <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-400 rounded-full flex items-center justify-center text-white text-xl flex-shrink-0">
                    {selectedAccount.profilePic}
                  </div>
                  <div>
                    <p className="text-gray-900">{selectedAccount.name}</p>
                    <p className="text-sm text-gray-600">Facebook</p>
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-gray-900 mb-2">FamBrainにログイン</h3>
                <p className="text-gray-600">
                  Facebookアカウントを使用してFamBrainにログインします
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <p className="text-gray-700">次の情報へのアクセスを許可します：</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">公開プロフィール情報</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">メールアドレス</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">名前とプロフィール写真</span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-blue-900 mb-1">プライバシー保護</p>
                  <p className="text-sm text-blue-800">
                    FamBrainはあなたのFacebookに投稿することはありません
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={selectedAccount ? handleBackToAccountSelect : handleCancel}
                  className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  戻る
                </button>
                <button
                  onClick={handleConsent}
                  className="flex-1 py-3 px-4 bg-[#1877F2] text-white rounded-lg hover:bg-[#166FE5] transition-colors"
                >
                  続ける
                </button>
              </div>
            </div>
          )}

          {/* 認証中 */}
          {authStep === 'authenticating' && (
            <div className="text-center py-8">
              <Loader2 className="w-12 h-12 text-[#1877F2] animate-spin mx-auto mb-4" />
              <h3 className="text-gray-900 mb-2">認証中...</h3>
              <p className="text-gray-600">
                Facebookアカウントで認証しています
              </p>
            </div>
          )}

          {/* 権限確認中 */}
          {authStep === 'permissions' && (
            <div className="text-center py-8">
              <div className="relative inline-flex items-center justify-center w-16 h-16 mb-4">
                <Loader2 className="w-16 h-16 text-[#1877F2] animate-spin" />
                <Shield className="absolute w-8 h-8 text-[#1877F2]" />
              </div>
              <h3 className="text-gray-900 mb-2">アクセス権限を確認中</h3>
              <p className="text-gray-600">
                安全な接続を確立しています
              </p>
            </div>
          )}

          {/* 成功 */}
          {authStep === 'success' && (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-gray-900 mb-2">認証に成功しました</h3>
              <p className="text-gray-600">
                FamBrainにログインしています...
              </p>
            </div>
          )}

          {/* エラー */}
          {authStep === 'error' && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                  <AlertCircle className="w-10 h-10 text-red-600" />
                </div>
                <h3 className="text-gray-900 mb-2">認証に失敗しました</h3>
                <p className="text-gray-600">{errorMessage}</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleCancel}
                  className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  戻る
                </button>
                <button
                  onClick={() => setAuthStep('consent')}
                  className="flex-1 py-3 px-4 bg-[#1877F2] text-white rounded-lg hover:bg-[#166FE5] transition-colors"
                >
                  再試行
                </button>
              </div>
            </div>
          )}
        </div>

        <p className="text-center text-gray-600 mt-4 text-sm">
          Facebookのデータポリシーと利用規約に同意します
        </p>
      </div>
    </div>
  );
}