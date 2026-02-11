'use client';

import { ArrowLeft, UserPlus, Check, X, Clock } from 'lucide-react';
import { useState } from 'react';

interface FamilyRequest {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: Date;
  status: 'pending' | 'approved' | 'rejected';
}

interface NotificationScreenProps {
  onBack: () => void;
}

const mockRequests: FamilyRequest[] = [
  {
    id: '1',
    name: '山田花子',
    email: 'hanako@example.com',
    message: 'おばあちゃんの娘です。よろしくお願いします。',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30分前
    status: 'pending',
  },
  {
    id: '2',
    name: '田中一郎',
    email: 'ichiro@example.com',
    message: '家族の一員として参加させてください。',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2時間前
    status: 'pending',
  },
  {
    id: '3',
    name: '佐藤美咲',
    email: 'misaki@example.com',
    message: '',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1日前
    status: 'approved',
  },
];

export function NotificationScreen({ onBack }: NotificationScreenProps) {
  const [requests, setRequests] = useState<FamilyRequest[]>(mockRequests);

  const handleApprove = (id: string) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: 'approved' as const } : req
    ));
  };

  const handleReject = (id: string) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: 'rejected' as const } : req
    ));
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 1000 / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) {
      return `${diffMins}分前`;
    } else if (diffHours < 24) {
      return `${diffHours}時間前`;
    } else {
      return `${diffDays}日前`;
    }
  };

  const pendingRequests = requests.filter(r => r.status === 'pending');
  const processedRequests = requests.filter(r => r.status !== 'pending');

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

          <h2 className="text-gray-900">参加申請通知</h2>

          <div className="w-20"></div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* 承認待ちの申請 */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-amber-600" />
                <h3 className="text-gray-900">承認待ち</h3>
              </div>
              {pendingRequests.length > 0 && (
                <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm">
                  {pendingRequests.length}件
                </span>
              )}
            </div>
          </div>

          {pendingRequests.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-500">承認待ちの申請はありません</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {pendingRequests.map((request) => (
                <div key={request.id} className="p-6 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                          <UserPlus className="w-6 h-6 text-indigo-600" />
                        </div>
                        <div>
                          <p className="text-gray-900">{request.name}</p>
                          <p className="text-sm text-gray-600">{request.email}</p>
                        </div>
                      </div>
                      
                      {request.message && (
                        <div className="ml-15 bg-gray-50 rounded-lg p-3 border border-gray-200">
                          <p className="text-sm text-gray-700">{request.message}</p>
                        </div>
                      )}
                      
                      <p className="text-sm text-gray-500 mt-2 ml-15">
                        {formatTimeAgo(request.timestamp)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 ml-15">
                    <button
                      onClick={() => handleApprove(request.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Check className="w-4 h-4" />
                      <span>承認</span>
                    </button>
                    <button
                      onClick={() => handleReject(request.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      <span>却下</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 処理済みの申請 */}
        {processedRequests.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-gray-900">処理済み</h3>
            </div>

            <div className="divide-y divide-gray-200">
              {processedRequests.map((request) => (
                <div key={request.id} className="p-6 opacity-60">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          request.status === 'approved' 
                            ? 'bg-green-100' 
                            : 'bg-red-100'
                        }`}>
                          {request.status === 'approved' ? (
                            <Check className="w-6 h-6 text-green-600" />
                          ) : (
                            <X className="w-6 h-6 text-red-600" />
                          )}
                        </div>
                        <div>
                          <p className="text-gray-900">{request.name}</p>
                          <p className="text-sm text-gray-600">{request.email}</p>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-500 ml-15">
                        {formatTimeAgo(request.timestamp)} • {
                          request.status === 'approved' ? '承認済み' : '却下済み'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 説明 */}
        <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
          <h4 className="text-blue-900 mb-3">💡 ヒント</h4>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• 承認すると、申請者にログイン情報がメールで送信されます</li>
            <li>• 却下した申請者には、申請が承認されなかったことが通知されます</li>
            <li>• 処理済みの申請は30日後に自動的に削除されます</li>
          </ul>
        </div>
      </div>
    </div>
  );
}