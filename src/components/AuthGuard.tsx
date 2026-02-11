"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

interface AuthGuardProps {
  children: React.ReactNode;
  /**
   * 必要な権限（オプション）
   */
  requiredPermission?: string;
  /**
   * 管理者のみアクセス可能にするか（オプション）
   */
  adminOnly?: boolean;
  /**
   * 認証されていない場合のリダイレクト先（デフォルト: '/'）
   */
  redirectTo?: string;
  /**
   * ローディング中に表示するコンポーネント
   */
  fallback?: React.ReactNode;
}

/**
 * 認証ガードコンポーネント
 *
 * 使用例:
 * ```tsx
 * <AuthGuard>
 *   <ProtectedContent />
 * </AuthGuard>
 *
 * <AuthGuard adminOnly>
 *   <AdminPanel />
 * </AuthGuard>
 *
 * <AuthGuard requiredPermission="delete">
 *   <DeleteButton />
 * </AuthGuard>
 * ```
 */
export function AuthGuard({
  children,
  requiredPermission,
  adminOnly = false,
  redirectTo = "/",
  fallback = <AuthGuardFallback />,
}: AuthGuardProps) {
  const { isAuthenticated, loading, hasPermission, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // ローディング中は何もしない
    if (loading) return;

    // 認証されていない場合
    if (!isAuthenticated) {
      router.push(redirectTo);
      return;
    }

    // 管理者権限が必要な場合
    if (adminOnly && !isAdmin()) {
      router.push("/unauthorized");
      return;
    }

    // 特定の権限が必要な場合
    if (requiredPermission && !hasPermission(requiredPermission)) {
      router.push("/unauthorized");
      return;
    }
  }, [
    isAuthenticated,
    loading,
    adminOnly,
    requiredPermission,
    hasPermission,
    isAdmin,
    router,
    redirectTo,
  ]);

  // ローディング中
  if (loading) {
    return <>{fallback}</>;
  }

  // 認証されていない、または権限がない場合
  if (!isAuthenticated) {
    return null;
  }

  if (adminOnly && !isAdmin()) {
    return null;
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return null;
  }

  // 認証済みかつ権限あり
  return <>{children}</>;
}

/**
 * デフォルトのローディング表示
 */
function AuthGuardFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
        <p className="text-gray-600">認証状態を確認中...</p>
      </div>
    </div>
  );
}
