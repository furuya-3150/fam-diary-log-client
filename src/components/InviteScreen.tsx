'use client';

import { ArrowLeft, Copy, Mail, MessageCircle, Link as LinkIcon, Check, X } from 'lucide-react';
import { useState } from 'react';

interface InviteScreenProps {
  onBack: () => void;
}

export function InviteScreen({ onBack }: InviteScreenProps) {
  const [copied, setCopied] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [lineSent, setLineSent] = useState(false);
  const [emails, setEmails] = useState<string[]>(['']);
  const [sentEmails, setSentEmails] = useState<string[]>([]);
  
  // モック招待URL
  const inviteUrl = 'https://fambrain.app/invite/abc123xyz789';
  
  const copyUrl = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const addEmailField = () => {
    setEmails([...emails, '']);
  };
  
  const removeEmailField = (index: number) => {
    if (emails.length > 1) {
      setEmails(emails.filter((_, i) => i !== index));
    }
  };
  
  const updateEmail = (index: number, value: string) => {
    const newEmails = [...emails];
    newEmails[index] = value;
    setEmails(newEmails);
  };
  
  const sendEmail = () => {
    // 空でないメールアドレスのみをフィルタリング
    const validEmails = emails.filter(email => email.trim() !== '');
    
    if (validEmails.length === 0) {
      alert('メールアドレスを入力してください');
      return;
    }
    
    // メールアドレスの形式をチェック
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const invalidEmails = validEmails.filter(email => !emailRegex.test(email));
    
    if (invalidEmails.length > 0) {
      alert('無効なメールアドレスが含まれています');
      return;
    }
    
    // 実際のメール送信はバックエンドで処理
    setSentEmails(validEmails);
    setEmailSent(true);
    setTimeout(() => {
      setEmailSent(false);
      setSentEmails([]);
      setEmails(['']);
    }, 5000);
  };
  
  const sendLine = () => {
    // LINE送信のモック（実際はLINE APIを使用）
    setLineSent(true);
    setTimeout(() => setLineSent(false), 2000);
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

          <h2 className="text-gray-900">家族を招待</h2>

          <div className="w-20"></div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* メールで送信 */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Mail className="w-5 h-5 text-blue-600" />
            <h3 className="text-gray-900">メールで招待</h3>
          </div>
          
          <p className="text-gray-600 mb-4">
            招待したい家族のメールアドレスを入力してください（複数入力可能）
          </p>
          
          <div className="space-y-3">
            {emails.map((email, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => updateEmail(index, e.target.value)}
                  placeholder="example@email.com"
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                {emails.length > 1 && (
                  <button
                    onClick={() => removeEmailField(index)}
                    className="p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    aria-label="削除"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
            
            <button
              onClick={addEmailField}
              className="w-full py-3 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-indigo-500 hover:text-indigo-600 transition-colors"
            >
              + メールアドレスを追加
            </button>
            
            <button
              onClick={sendEmail}
              disabled={emailSent}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-green-600 flex items-center justify-center gap-2"
            >
              {emailSent ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>送信しました</span>
                </>
              ) : (
                <>
                  <Mail className="w-5 h-5" />
                  <span>メールを送信</span>
                </>
              )}
            </button>
          </div>
          
          {emailSent && sentEmails.length > 0 && (
            <div className="mt-4 bg-green-50 rounded-lg p-4 border border-green-200">
              <p className="text-sm text-green-900 mb-2">
                ✅ 以下のアドレスに招待メールを送信しました:
              </p>
              <ul className="text-sm text-green-800 space-y-1">
                {sentEmails.map((email, index) => (
                  <li key={index}>• {email}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* LINEで送信 */}
        {/* <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <MessageCircle className="w-5 h-5 text-green-600" />
            <h3 className="text-gray-900">LINEで招待</h3>
          </div>
          
          <p className="text-gray-600 mb-4">
            LINEアプリを開いて、招待URLを送信します
          </p>
          
          <button
            onClick={sendLine}
            disabled={lineSent}
            className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-green-700 flex items-center justify-center gap-2"
          >
            {lineSent ? (
              <>
                <Check className="w-5 h-5" />
                <span>LINEを開きました</span>
              </>
            ) : (
              <>
                <MessageCircle className="w-5 h-5" />
                <span>LINEで送信</span>
              </>
            )}
          </button>
          
          <div className="mt-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-600">
              ℹ️ LINEアプリがインストールされている必要があります
            </p>
          </div>
        </div> */}

        {/* 注意事項 */}
        <div className="bg-amber-50 rounded-xl border border-amber-200 p-6">
          <h4 className="text-amber-900 mb-3">⚠️ 注意事項</h4>
          <ul className="space-y-2 text-sm text-amber-800">
            <li>• 招待URLの有効期限は発行から7日間です</li>
            <li>• 複数回メールを送信した場合、最新のURLのみ有効です</li>
          </ul>
        </div>
      </div>
    </div>
  );
}