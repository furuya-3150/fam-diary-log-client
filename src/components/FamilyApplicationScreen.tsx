import { Users, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';

type ApplicationStatus = 'idle' | 'pending' | 'approved' | 'rejected';

interface FamilyApplicationScreenProps {
  inviteCode?: string;
}

export function FamilyApplicationScreen({ inviteCode = 'abc123xyz789' }: FamilyApplicationScreenProps) {
  const [status, setStatus] = useState<ApplicationStatus>('idle');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email) {
      alert('名前とメールアドレスを入力してください');
      return;
    }
    
    // 申請送信のモック
    setStatus('pending');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* ロゴ・タイトル */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl mb-4">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-gray-900 mb-2">FamBrain</h1>
          <p className="text-gray-600">家族グループへの参加申請</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
          {status === 'idle' && (
            <>
              <div className="mb-6">
                <h2 className="text-gray-900 mb-2">家族グループに参加</h2>
                <p className="text-gray-600">
                  以下の情報を入力して、家族グループへの参加を申請してください
                </p>
              </div>

              <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200 mb-6">
                <p className="text-sm text-indigo-900">
                  招待コード: <span className="font-mono">{inviteCode}</span>
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-gray-900 mb-2">
                    お名前 <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="山田太郎"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-gray-900 mb-2">
                    メールアドレス <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@email.com"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-gray-900 mb-2">
                    メッセージ（任意）
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="自己紹介や参加の理由など"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  参加申請を送信
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 text-center">
                  申請後、管理者の承認をお待ちください
                </p>
              </div>
            </>
          )}

          {status === 'pending' && (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
                <Clock className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-gray-900 mb-2">申請を送信しました</h3>
              <p className="text-gray-600 mb-6">
                管理者が承認するまでお待ちください。承認されるとメールで通知が届きます。
              </p>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 space-y-3">
                <div className="flex items-start gap-3 text-left">
                  <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-indigo-600">1</span>
                  </div>
                  <div>
                    <p className="text-gray-900">申請送信完了</p>
                    <p className="text-sm text-gray-600">あなたの申請が管理者に送信されました</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-left">
                  <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-gray-600">2</span>
                  </div>
                  <div>
                    <p className="text-gray-900">管理者の承認待ち</p>
                    <p className="text-sm text-gray-600">通常1-2日以内に承認されます</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-left">
                  <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-gray-600">3</span>
                  </div>
                  <div>
                    <p className="text-gray-900">アカウント作成</p>
                    <p className="text-sm text-gray-600">承認後、メールでログイン情報が届きます</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => window.close()}
                className="mt-6 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                閉じる
              </button>
            </div>
          )}

          {status === 'approved' && (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-gray-900 mb-2">承認されました！</h3>
              <p className="text-gray-600 mb-6">
                家族グループへの参加が承認されました。ログイン情報をメールで送信しました。
              </p>
              <button
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                ログインページへ
              </button>
            </div>
          )}

          {status === 'rejected' && (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-gray-900 mb-2">申請が却下されました</h3>
              <p className="text-gray-600 mb-6">
                申請が管理者によって却下されました。詳細については招待した家族にお問い合わせください。
              </p>
              <button
                onClick={() => window.close()}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                閉じる
              </button>
            </div>
          )}
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          FamBrain v1.0.0 © 2025
        </p>
      </div>
    </div>
  );
}
