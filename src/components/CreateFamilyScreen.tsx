'use client';

import { Users, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

interface CreateFamilyScreenProps {
  onBack: () => void;
  onCreateFamily: (familyName: string) => void;
}

export function CreateFamilyScreen({ onBack, onCreateFamily }: CreateFamilyScreenProps) {
  const [familyName, setFamilyName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!familyName.trim()) {
      alert('家族グループ名を入力してください');
      return;
    }
    
    setIsSubmitting(true);
    
    // モック処理（実際はバックエンドAPIを呼び出す）
    setTimeout(() => {
      onCreateFamily(familyName);
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

          <h2 className="text-gray-900">家族グループを作成</h2>

          <div className="w-20"></div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
          {/* アイコンとタイトル */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-gray-900 mb-2">新しい家族グループを作成</h3>
            <p className="text-gray-600">
              家族との思い出を共有するためのグループを作成しましょう
            </p>
          </div>

          {/* フォーム */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="familyName" className="block text-gray-900 mb-2">
                家族グループ名 <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="familyName"
                value={familyName}
                onChange={(e) => setFamilyName(e.target.value)}
                placeholder="例：山田家、田中ファミリー"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                maxLength={50}
                required
                disabled={isSubmitting}
              />
              <p className="mt-2 text-sm text-gray-500">
                {familyName.length}/50文字
              </p>
            </div>

            {/* 情報ボックス */}
            <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
              <h4 className="text-indigo-900 mb-2">グループ作成後にできること</h4>
              <ul className="space-y-1 text-sm text-indigo-800">
                <li>• 家族メンバーを招待できます</li>
                <li>• 日記を投稿して家族と共有できます</li>
                <li>• 認知機能トレーニングを始められます</li>
                <li>• 進捗を分析・可視化できます</li>
              </ul>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-indigo-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? '作成中...' : '家族グループを作成'}
            </button>
          </form>

          {/* 注意事項 */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              グループ名は後から変更できます
            </p>
          </div>
        </div>

        {/* 追加情報 */}
        <div className="mt-6 bg-amber-50 rounded-xl border border-amber-200 p-6">
          <h4 className="text-amber-900 mb-3">💡 ヒント</h4>
          <ul className="space-y-2 text-sm text-amber-800">
            <li>• 家族全員が分かりやすい名前を付けましょう</li>
            <li>• グループ作成後、すぐに家族を招待できます</li>
            <li>• 複数の家族グループを作成することも可能です</li>
          </ul>
        </div>
      </div>
    </div>
  );
}