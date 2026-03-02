"use client";

import { ArrowLeft, Mail, Check, X } from "lucide-react";
import { useState } from "react";
import { useInviteStore } from "@/store/inviteStore";
import { sendInvitations } from "@/lib/actions/invitations";
import { toast } from "sonner";

interface InviteScreenProps {
  onBack: () => void;
}

export function InviteScreen({ onBack }: Readonly<InviteScreenProps>) {
  const [emailSent, setEmailSent] = useState(false);
  const [sentEmails, setSentEmails] = useState<string[]>([]);

  const {
    emailFields,
    errors,
    isSubmitting,
    addEmail,
    removeEmail,
    updateEmail,
    validateAll,
    setSubmitting,
    reset,
    getEmails,
  } = useInviteStore();

  const sendEmail = async () => {
    // バリデーション
    if (!validateAll()) {
      toast.error("入力内容を確認してください");
      return;
    }

    const validEmails = getEmails();

    setSubmitting(true);

    try {
      await sendInvitations(validEmails);

      // 成功時の処理
      setSentEmails(validEmails);
      setEmailSent(true);
      toast.success("招待メールを送信しました");

      // 5秒後にリセット
      setTimeout(() => {
        setEmailSent(false);
        setSentEmails([]);
        reset();
      }, 5000);
    } catch (error) {
      console.error("招待メール送信エラー:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "招待メールの送信に失敗しました",
      );
    } finally {
      setSubmitting(false);
    }
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
            {emailFields.map((field) => (
              <div key={field.id} className="space-y-1">
                <div className="flex items-center gap-2">
                  <input
                    type="email"
                    value={field.value}
                    onChange={(e) => updateEmail(field.id, e.target.value)}
                    placeholder="example@email.com"
                    className={`flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                      errors[field.id] ? "border-red-500" : "border-gray-200"
                    }`}
                  />
                  {emailFields.length > 1 && (
                    <button
                      onClick={() => removeEmail(field.id)}
                      className="p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      aria-label="削除"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
                {errors[field.id] && (
                  <p className="text-sm text-red-600 px-1">
                    {errors[field.id]}
                  </p>
                )}
              </div>
            ))}

            <button
              onClick={addEmail}
              className="w-full py-3 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-indigo-500 hover:text-indigo-600 transition-colors"
            >
              + メールアドレスを追加
            </button>

            <button
              onClick={sendEmail}
              disabled={emailSent || isSubmitting}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-green-600 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {(() => {
                if (emailSent) {
                  return (
                    <>
                      <Check className="w-5 h-5" />
                      <span>送信しました</span>
                    </>
                  );
                }
                if (isSubmitting) {
                  return <span>送信中...</span>;
                }
                return (
                  <>
                    <Mail className="w-5 h-5" />
                    <span>メールを送信</span>
                  </>
                );
              })()}
            </button>
          </div>

          {emailSent && sentEmails.length > 0 && (
            <div className="mt-4 bg-green-50 rounded-lg p-4 border border-green-200">
              <p className="text-sm text-green-900 mb-2">
                ✅ 以下のアドレスに招待メールを送信しました:
              </p>
              <ul className="text-sm text-green-800 space-y-1">
                {sentEmails.map((email) => (
                  <li key={email}>• {email}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* 注意事項 */}
        <div className="bg-amber-50 rounded-xl border border-amber-200 p-6">
          <h4 className="text-amber-900 mb-3">⚠️ 注意事項</h4>
          <ul className="space-y-2 text-sm text-amber-800">
            <li>• 招待URLの有効期限は発行から7日間です</li>
            <li>• 複数回メールを送信した場合、最新のURLのみ有効です</li>
            <li>
              • 送信したメールアドレスでログインすることで家族への参加が可能です
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
