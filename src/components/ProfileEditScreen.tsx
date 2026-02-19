"use client";

import { ArrowLeft, User, Mail, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { getUser } from "@/lib/actions/users";
import { useProfileStore } from "@/store/profileStore";
import { useAuth } from "@/contexts/AuthContext";
import { Loading } from "./ui/loading";

interface ProfileEditScreenProps {
  onBack: () => void;
}

export function ProfileEditScreen({
  onBack,
}: Readonly<ProfileEditScreenProps>) {
  const { loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [userId, setUserId] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  const {
    name,
    email,
    errors,
    isSubmitting,
    isDirty,
    setName,
    setEmail,
    setOriginalData,
    validateAll,
    setSubmitting,
    resetToOriginal,
  } = useProfileStore();

  // ユーザー情報を取得
  useEffect(() => {
    if (authLoading) return;

    const fetchUser = async () => {
      try {
        setLoading(true);
        const userData = await getUser();
        setOriginalData(userData);
        setUserId(userData.id);
        setCreatedAt(userData.createdAt);
      } catch (error) {
        console.error("ユーザー情報の取得エラー:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [authLoading, setOriginalData]);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateAll()) {
      return;
    }

    setSubmitting(true);

    // モック保存（実際の更新APIは別途実装予定）
    Promise.resolve()
      .then(() => new Promise((resolve) => setTimeout(resolve, 1000)))
      .then(() => {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      })
      .catch((error) => {
        console.error("プロフィール更新エラー:", error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const handleCancel = () => {
    resetToOriginal();
    onBack();
  };

  if (authLoading || loading) {
    return <Loading message="読み込み中..." fullScreen gradient />;
  }

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

          <h2 className="text-gray-900">プロフィール編集</h2>

          <div className="w-20"></div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {success && (
          <div className="bg-green-50 rounded-xl border border-green-200 p-6">
            <div className="flex items-center gap-3">
              <Check className="w-6 h-6 text-green-600" />
              <p className="text-green-900">プロフィールを更新しました</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 基本情報 */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
            <h3 className="text-gray-900">基本情報</h3>

            <div>
              <label
                htmlFor="name"
                className="flex items-center gap-2 text-gray-900 mb-2"
              >
                <User className="w-4 h-4" />
                <span>
                  お名前 <span className="text-red-600">*</span>
                </span>
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => useProfileStore.getState().validateName()}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                  errors.name ? "border-red-500" : "border-gray-200"
                }`}
                required
              />
              {errors.name && (
                <p className="text-sm text-red-600 mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="flex items-center gap-2 text-gray-900 mb-2"
              >
                <Mail className="w-4 h-4" />
                <span>
                  メールアドレス <span className="text-red-600">*</span>
                </span>
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => useProfileStore.getState().validateEmail()}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                  errors.email ? "border-red-500" : "border-gray-200"
                }`}
                required
              />
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">{errors.email}</p>
              )}
              <p className="text-sm text-gray-600 mt-1">
                アプリからの通知はこのメールアドレスに送信されます
              </p>
            </div>
          </div>

          {/* アカウント情報 */}
          <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
            <h4 className="text-blue-900 mb-3">📌 アカウント情報</h4>
            <div className="space-y-2 text-sm text-blue-800">
              <p>
                • 登録日:{" "}
                {createdAt
                  ? new Date(createdAt).toLocaleDateString("ja-JP")
                  : "-"}
              </p>
              <p>• アカウントID: {userId || "-"}</p>
            </div>
          </div>

          {/* 保存ボタン */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              キャンセル
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !isDirty}
              className="flex-1 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "保存中..." : "変更を保存"}
            </button>
          </div>
        </form>

        {/* プライバシー情報 */}
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
          <h4 className="text-gray-900 mb-3">🔒 プライバシー</h4>
          <p className="text-sm text-gray-600">
            あなたのプロフィール情報は家族グループ内のメンバーにのみ表示されます。
          </p>
        </div>
      </div>
    </div>
  );
}
