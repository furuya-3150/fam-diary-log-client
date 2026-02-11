'use client';

import { ArrowLeft, Shield, Smartphone, Key, Check, Copy } from 'lucide-react';
import { useState } from 'react';

interface TwoFactorAuthScreenProps {
  onBack: () => void;
}

export function TwoFactorAuthScreen({ onBack }: TwoFactorAuthScreenProps) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [step, setStep] = useState<'initial' | 'setup' | 'verify' | 'complete'>('initial');
  const [verificationCode, setVerificationCode] = useState('');
  const [backupCodes, setBackupCodes] = useState<string[]>([]);

  const qrCodeSecret = 'JBSWY3DPEHPK3PXP';
  const mockBackupCodes = [
    '1234-5678-90AB',
    'CDEF-1234-5678',
    '90AB-CDEF-1234',
    '5678-90AB-CDEF',
    '1234-CDEF-5678',
  ];

  const handleEnable = () => {
    setStep('setup');
  };

  const handleVerify = () => {
    if (verificationCode.length === 6) {
      setIsEnabled(true);
      setBackupCodes(mockBackupCodes);
      setStep('complete');
    } else {
      alert('6桁の認証コードを入力してください');
    }
  };

  const handleDisable = () => {
    if (confirm('2段階認証を無効にしますか？セキュリティが低下します。')) {
      setIsEnabled(false);
      setStep('initial');
      setVerificationCode('');
      setBackupCodes([]);
    }
  };

  const copyBackupCodes = () => {
    navigator.clipboard.writeText(backupCodes.join('\n'));
    alert('バックアップコードをコピーしました');
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

          <h2 className="text-gray-900">2段階認証</h2>

          <div className="w-20"></div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* ステータス */}
        <div className={`rounded-xl border p-6 ${
          isEnabled 
            ? 'bg-green-50 border-green-200' 
            : 'bg-gray-50 border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className={`w-6 h-6 ${
                isEnabled ? 'text-green-600' : 'text-gray-400'
              }`} />
              <div>
                <p className={isEnabled ? 'text-green-900' : 'text-gray-900'}>
                  2段階認証（認証アプリ）
                </p>
                <p className={`text-sm ${
                  isEnabled ? 'text-green-700' : 'text-gray-600'
                }`}>
                  {isEnabled ? '有効' : '無効'}
                </p>
              </div>
            </div>
            {isEnabled && (
              <Check className="w-6 h-6 text-green-600" />
            )}
          </div>
        </div>

        {/* 説明 */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-3">2段階認証とは？</h3>
          <p className="text-gray-600 mb-4">
            2段階認証を有効にすると、ログイン時にパスワードに加えて認証アプリで生成される6桁のコードの入力が必要になります。
            これにより、第三者による不正アクセスを防ぎ、アカウントのセキュリティを大幅に向上させることができます。
          </p>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• パスワードが漏洩しても、認証コードがなければログインできません</li>
            <li>• Google AuthenticatorやMicrosoft Authenticatorなどの認証アプリを使用します</li>
            <li>• バックアップコードを安全に保管してください</li>
          </ul>
        </div>

        {step === 'initial' && !isEnabled && (
          <>
            {/* 認証アプリの説明 */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-start gap-3 mb-4">
                <Smartphone className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-gray-900 mb-2">認証アプリが必要です</h3>
                  <p className="text-gray-600 mb-4">
                    2段階認証を有効にするには、スマートフォンに認証アプリをインストールする必要があります。
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 mb-4">
                <p className="text-sm text-blue-900 mb-2">推奨アプリ：</p>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Google Authenticator</li>
                  <li>• Microsoft Authenticator</li>
                  <li>• Authy</li>
                </ul>
              </div>

              <button
                onClick={handleEnable}
                className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                2段階認証を有効にする
              </button>
            </div>
          </>
        )}

        {step === 'setup' && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-4">認証アプリの設定</h3>
            
            <div className="space-y-6">
              <div>
                <p className="text-gray-600 mb-4">
                  1. 認証アプリで以下のQRコードをスキャンしてください
                </p>
                <div className="bg-white p-6 border-2 border-gray-200 rounded-lg inline-block">
                  <div className="w-48 h-48 bg-gray-100 flex items-center justify-center">
                    <p className="text-gray-400 text-center text-sm">
                      QRコード<br />（モック）
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-gray-600 mb-2">
                  またはこのコードを手動で入力：
                </p>
                <div className="flex items-center gap-3">
                  <code className="flex-1 px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-900 font-mono">
                    {qrCodeSecret}
                  </code>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(qrCodeSecret);
                      alert('コードをコピーしました');
                    }}
                    className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Copy className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              <button
                onClick={() => setStep('verify')}
                className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                次へ
              </button>
            </div>
          </div>
        )}

        {step === 'verify' && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-4">認証コードの確認</h3>
            
            <div className="space-y-4">
              <p className="text-gray-600">
                認証アプリに表示された6桁のコードを入力してください
              </p>

              <div>
                <label htmlFor="code" className="block text-gray-900 mb-2">
                  認証コード
                </label>
                <input
                  type="text"
                  id="code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="123456"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-center tracking-widest"
                  maxLength={6}
                />
              </div>

              <button
                onClick={handleVerify}
                disabled={verificationCode.length !== 6}
                className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                確認
              </button>

              <button
                onClick={() => setStep('setup')}
                className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                戻る
              </button>
            </div>
          </div>
        )}

        {step === 'complete' && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-gray-900 mb-2">2段階認証を有効にしました</h3>
              <p className="text-gray-600">
                以下のバックアップコードを安全な場所に保管してください
              </p>
            </div>

            <div className="bg-amber-50 rounded-lg p-6 border border-amber-200 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Key className="w-5 h-5 text-amber-700" />
                <p className="text-amber-900">バックアップコード</p>
              </div>
              <div className="space-y-2 mb-4">
                {backupCodes.map((code, index) => (
                  <code key={index} className="block px-4 py-2 bg-white rounded border border-amber-200 text-amber-900 font-mono text-center">
                    {code}
                  </code>
                ))}
              </div>
              <button
                onClick={copyBackupCodes}
                className="w-full flex items-center justify-center gap-2 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
              >
                <Copy className="w-4 h-4" />
                <span>コピー</span>
              </button>
              <p className="text-sm text-amber-800 mt-3">
                ⚠️ これらのコードは認証アプリが使えない場合のログインに必要です。
                各コードは1回のみ使用できます。
              </p>
            </div>

            <button
              onClick={() => setStep('initial')}
              className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              完了
            </button>
          </div>
        )}

        {isEnabled && step === 'initial' && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-4">2段階認証の管理</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-gray-900">認証方法</p>
                  <p className="text-sm text-gray-600">
                    認証アプリ
                  </p>
                </div>
              </div>

              <button
                className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                バックアップコードを表示
              </button>

              <button
                onClick={handleDisable}
                className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                2段階認証を無効にする
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}