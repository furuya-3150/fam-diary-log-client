'use client';

import { ArrowLeft, Monitor, Smartphone, MapPin, CheckCircle, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

interface LoginRecord {
  id: string;
  timestamp: Date;
  device: string;
  browser: string;
  os: string;
  location: string;
  ip: string;
  status: 'success' | 'failed';
}

interface LoginHistoryScreenProps {
  onBack: () => void;
}

const mockLoginHistory: LoginRecord[] = [
  {
    id: '1',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    device: 'デスクトップ',
    browser: 'Chrome 120',
    os: 'Windows 11',
    location: '東京都, 日本',
    ip: '192.168.1.100',
    status: 'success',
  },
  {
    id: '2',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    device: 'スマートフォン',
    browser: 'Safari 17',
    os: 'iOS 17',
    location: '東京都, 日本',
    ip: '192.168.1.101',
    status: 'success',
  },
  {
    id: '3',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    device: 'デスクトップ',
    browser: 'Chrome 120',
    os: 'Windows 11',
    location: '東京都, 日本',
    ip: '192.168.1.100',
    status: 'success',
  },
  {
    id: '4',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    device: 'スマートフォン',
    browser: 'Chrome 120',
    os: 'Android 14',
    location: '神奈川県, 日本',
    ip: '192.168.2.50',
    status: 'failed',
  },
  {
    id: '5',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    device: 'タブレット',
    browser: 'Safari 17',
    os: 'iPadOS 17',
    location: '東京都, 日本',
    ip: '192.168.1.102',
    status: 'success',
  },
  {
    id: '6',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    device: 'デスクトップ',
    browser: 'Firefox 121',
    os: 'macOS 14',
    location: '東京都, 日本',
    ip: '192.168.1.103',
    status: 'success',
  },
  {
    id: '7',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    device: 'スマートフォン',
    browser: 'Safari 17',
    os: 'iOS 17',
    location: '東京都, 日本',
    ip: '192.168.1.101',
    status: 'success',
  },
];

export function LoginHistoryScreen({ onBack }: LoginHistoryScreenProps) {
  const [selectedRecord, setSelectedRecord] = useState<LoginRecord | null>(null);

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 1000 / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) {
      return `${diffMins}分前`;
    } else if (diffHours < 24) {
      return `${diffHours}時間前`;
    } else if (diffDays < 7) {
      return `${diffDays}日前`;
    } else {
      return date.toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }
  };

  const formatFullDate = (date: Date) => {
    return date.toLocaleString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getDeviceIcon = (device: string) => {
    if (device.includes('スマートフォン') || device.includes('タブレット')) {
      return <Smartphone className="w-5 h-5" />;
    }
    return <Monitor className="w-5 h-5" />;
  };

  const successfulLogins = mockLoginHistory.filter(r => r.status === 'success').length;
  const failedLogins = mockLoginHistory.filter(r => r.status === 'failed').length;

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

          <h2 className="text-gray-900">ログイン履歴</h2>

          <div className="w-20"></div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* 統計サマリー */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">成功したログイン</p>
                <p className="text-gray-900">{successfulLogins}回</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">失敗したログイン</p>
                <p className="text-gray-900">{failedLogins}回</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </div>
        </div>

        {/* セキュリティアラート */}
        {failedLogins > 0 && (
          <div className="bg-amber-50 rounded-xl border border-amber-200 p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-amber-900 mb-1">ログイン失敗を検出</p>
                <p className="text-sm text-amber-800">
                  最近{failedLogins}回のログイン失敗が記録されています。
                  心当たりがない場合は、すぐにパスワードを変更してください。
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ログイン履歴リスト */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-gray-900">最近のアクティビティ</h3>
            <p className="text-sm text-gray-600 mt-1">
              過去30日間のログイン履歴を表示しています
            </p>
          </div>

          <div className="divide-y divide-gray-200">
            {mockLoginHistory.map((record) => (
              <button
                key={record.id}
                onClick={() => setSelectedRecord(record)}
                className="w-full p-6 hover:bg-gray-50 transition-colors text-left"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg flex-shrink-0 ${
                    record.status === 'success' 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-red-100 text-red-600'
                  }`}>
                    {getDeviceIcon(record.device)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <p className="text-gray-900">
                          {record.device} • {record.browser}
                        </p>
                        <p className="text-sm text-gray-600">{record.os}</p>
                      </div>
                      <span className={`text-sm px-3 py-1 rounded-full flex-shrink-0 ${
                        record.status === 'success'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {record.status === 'success' ? '成功' : '失敗'}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{record.location}</span>
                      </div>
                      <span>•</span>
                      <span>{formatDate(record.timestamp)}</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 詳細情報モーダル */}
        {selectedRecord && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedRecord(null)}
          >
            <div
              className="bg-white rounded-xl max-w-lg w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-gray-900">ログイン詳細</h3>
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <span className="sr-only">閉じる</span>
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">ステータス</p>
                  <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${
                    selectedRecord.status === 'success'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {selectedRecord.status === 'success' ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <AlertTriangle className="w-4 h-4" />
                    )}
                    <span>{selectedRecord.status === 'success' ? 'ログイン成功' : 'ログイン失敗'}</span>
                  </span>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">日時</p>
                  <p className="text-gray-900">{formatFullDate(selectedRecord.timestamp)}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">デバイス</p>
                  <p className="text-gray-900">{selectedRecord.device}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">ブラウザ</p>
                  <p className="text-gray-900">{selectedRecord.browser}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">OS</p>
                  <p className="text-gray-900">{selectedRecord.os}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">場所</p>
                  <p className="text-gray-900">{selectedRecord.location}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">IPアドレス</p>
                  <p className="text-gray-900 font-mono">{selectedRecord.ip}</p>
                </div>
              </div>

              {selectedRecord.status === 'failed' && (
                <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
                  <p className="text-sm text-red-900">
                    このログイン試行に心当たりがない場合は、すぐにパスワードを変更してください。
                  </p>
                </div>
              )}

              <button
                onClick={() => setSelectedRecord(null)}
                className="w-full mt-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                閉じる
              </button>
            </div>
          </div>
        )}

        {/* セキュリティのヒント */}
        <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
          <h4 className="text-blue-900 mb-3">💡 セキュリティのヒント</h4>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• 定期的にログイン履歴を確認して、不審なアクセスがないか確認しましょう</li>
            <li>• 心当たりのないログインを発見した場合は、すぐにパスワードを変更してください</li>
            <li>• 2段階認証を有効にすることで、不正アクセスのリスクを大幅に減らせます</li>
            <li>• 公共のWi-Fiでログインする際は特に注意が必要です</li>
          </ul>
        </div>
      </div>
    </div>
  );
}