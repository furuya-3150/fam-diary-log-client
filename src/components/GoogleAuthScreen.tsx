'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, Shield, Loader2, AlertCircle, ChevronRight } from 'lucide-react';

interface GoogleAuthScreenProps {
  onSuccess: () => void;
  onCancel: () => void;
}

type AuthStep = 'account-select' | 'consent' | 'authenticating' | 'permissions' | 'success' | 'error';

interface GoogleAccount {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

const mockAccounts: GoogleAccount[] = [
  {
    id: '1',
    name: '田中 太郎',
    email: 'tanaka.taro@gmail.com',
    avatar: '👤'
  },
  {
    id: '2',
    name: '山田 花子',
    email: 'yamada.hanako@gmail.com',
    avatar: '👩'
  }
];

export function GoogleAuthScreen({ onSuccess, onCancel }: GoogleAuthScreenProps) {
  const [authStep, setAuthStep] = useState<AuthStep>('account-select');
  const [selectedAccount, setSelectedAccount] = useState<GoogleAccount | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (authStep === 'authenticating') {
      // Google認証をシミュレート
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

  const handleAccountSelect = (account: GoogleAccount) => {
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
        {/* Googleロゴとヘッダー */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-md mb-4">
            <svg className="w-10 h-10" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          </div>
          <h2 className="text-gray-800">Googleでログイン</h2>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* アカウント選択画面 */}
          {authStep === 'account-select' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-gray-900 mb-2">アカウントを選択</h3>
                <p className="text-gray-600">
                  FamBrainで使用するGoogleアカウントを選択してください
                </p>
              </div>

              <div className="space-y-3">
                {mockAccounts.map((account) => (
                  <button
                    key={account.id}
                    onClick={() => handleAccountSelect(account)}
                    className="w-full flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-2xl flex-shrink-0">
                      {account.avatar}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-gray-900">{account.name}</p>
                      <p className="text-gray-600 text-sm">{account.email}</p>
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
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-xl flex-shrink-0">
                    {selectedAccount.avatar}
                  </div>
                  <div>
                    <p className="text-gray-900">{selectedAccount.name}</p>
                    <p className="text-sm text-gray-600">{selectedAccount.email}</p>
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-gray-900 mb-2">FamBrainにログイン</h3>
                <p className="text-gray-600">
                  Googleアカウントを使用してFamBrainにログインします
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <p className="text-gray-700">次の情報へのアクセスを許可します：</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">基本的なプロフィール情報</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">メールアドレス</span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-blue-900 mb-1">安全な認証</p>
                  <p className="text-sm text-blue-800">
                    パスワードはGoogleによって安全に管理されます
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
                  className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  続ける
                </button>
              </div>
            </div>
          )}

          {/* 認証中 */}
          {authStep === 'authenticating' && (
            <div className="text-center py-8">
              <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
              <h3 className="text-gray-900 mb-2">認証中...</h3>
              <p className="text-gray-600">
                Googleアカウントで認証しています
              </p>
            </div>
          )}

          {/* 権限確認中 */}
          {authStep === 'permissions' && (
            <div className="text-center py-8">
              <div className="relative inline-flex items-center justify-center w-16 h-16 mb-4">
                <Loader2 className="w-16 h-16 text-blue-600 animate-spin" />
                <Shield className="absolute w-8 h-8 text-blue-600" />
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
                  className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  再試行
                </button>
              </div>
            </div>
          )}
        </div>

        <p className="text-center text-gray-600 mt-4 text-sm">
          Googleのプライバシーポリシーと利用規約に同意します
        </p>
      </div>
    </div>
  );
}