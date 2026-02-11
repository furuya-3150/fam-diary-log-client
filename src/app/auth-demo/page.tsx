"use client";

import { useAuth } from "@/contexts/AuthContext";
import { AuthGuard } from "@/components/AuthGuard";

/**
 * 認証機能のデモコンポーネント
 *
 * このファイルは実装例として作成されています。
 * 実際の使用時は削除またはカスタマイズしてください。
 */
export default function AuthDemoPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">認証機能デモ</h1>

        {/* 例1: 基本的な認証状態表示 */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">
            例1: 基本的な認証状態表示
          </h2>
          <BasicAuthDemo />
        </section>

        {/* 例2: 認証ガード - ログインユーザーのみ表示 */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">
            例2: 認証ガード - ログインユーザーのみ
          </h2>
          <AuthGuard
            fallback={<p className="text-gray-500">ログインが必要です</p>}
          >
            <div className="p-4 bg-green-50 border border-green-200 rounded">
              <p className="text-green-800">
                ✓ 認証済みユーザーのみに表示されるコンテンツ
              </p>
            </div>
          </AuthGuard>
        </section>

        {/* 例3: 権限ベースの表示制御 */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">
            例3: 権限ベースの表示制御
          </h2>
          <PermissionDemo />
        </section>

        {/* 例4: 管理者専用コンテンツ */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">
            例4: 管理者専用コンテンツ
          </h2>
          <AuthGuard
            adminOnly
            fallback={<p className="text-gray-500">管理者権限が必要です</p>}
          >
            <div className="p-4 bg-purple-50 border border-purple-200 rounded">
              <p className="text-purple-800">
                ✓ 管理者のみに表示されるコンテンツ
              </p>
            </div>
          </AuthGuard>
        </section>
      </div>
    </div>
  );
}

// 例1: 基本的な認証状態表示
function BasicAuthDemo() {
  const { user, isAuthenticated, loading, logout } = useAuth();

  if (loading) {
    return <p className="text-gray-500">読み込み中...</p>;
  }

  if (!isAuthenticated) {
    console.log("User is not authenticated");
    return (
      <div className="text-gray-700">
        <p>現在ログアウト状態です</p>
        <p className="text-sm text-gray-500 mt-2">
          ログインするには /api/auth/login エンドポイントを実装してください
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-200 rounded p-4">
        <h3 className="font-semibold text-blue-900 mb-2">ユーザー情報</h3>
        <dl className="space-y-1 text-sm">
          <div className="flex gap-2">
            <dt className="font-medium text-blue-800">ID:</dt>
            <dd className="text-blue-600">{user?.id}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="font-medium text-blue-800">メール:</dt>
            <dd className="text-blue-600">{user?.email}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="font-medium text-blue-800">名前:</dt>
            <dd className="text-blue-600">{user?.name || "未設定"}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="font-medium text-blue-800">ロール:</dt>
            <dd className="text-blue-600">{user?.role}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="font-medium text-blue-800">権限:</dt>
            <dd className="text-blue-600">
              {user?.permissions.join(", ") || "なし"}
            </dd>
          </div>
        </dl>
      </div>
      <button
        onClick={logout}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        ログアウト
      </button>
    </div>
  );
}

// 例3: 権限ベースの表示制御
function PermissionDemo() {
  const { hasPermission, user } = useAuth();

  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-600">
        現在の権限: {user?.permissions.join(", ") || "なし"}
      </p>

      <div className="space-y-2">
        {hasPermission("read") ? (
          <div className="p-3 bg-green-50 border border-green-200 rounded">
            <p className="text-green-800">✓ 読み取り権限あり</p>
          </div>
        ) : (
          <div className="p-3 bg-gray-100 border border-gray-200 rounded">
            <p className="text-gray-600">✗ 読み取り権限なし</p>
          </div>
        )}

        {hasPermission("write") ? (
          <div className="p-3 bg-green-50 border border-green-200 rounded">
            <p className="text-green-800">✓ 書き込み権限あり</p>
          </div>
        ) : (
          <div className="p-3 bg-gray-100 border border-gray-200 rounded">
            <p className="text-gray-600">✗ 書き込み権限なし</p>
          </div>
        )}

        {hasPermission("delete") ? (
          <div className="p-3 bg-green-50 border border-green-200 rounded">
            <p className="text-green-800">✓ 削除権限あり</p>
          </div>
        ) : (
          <div className="p-3 bg-gray-100 border border-gray-200 rounded">
            <p className="text-gray-600">✗ 削除権限なし</p>
          </div>
        )}
      </div>
    </div>
  );
}
