"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import type { User, AuthContextType } from "@/types/auth";
import {
  setTokenExpiresAt as syncTokenExpiry,
  authFetch,
} from "@/lib/authFetch";
import { getApiUrl } from "@/lib/env";

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [tokenExpiresAt, setTokenExpiresAt] = useState<number | null>(null);

  /**
   * tokenExpiresAt が変わったら authFetch モジュールのストアを同期する。
   */
  useEffect(() => {
    syncTokenExpiry(tokenExpiresAt);
  }, [tokenExpiresAt]);

  /**
   * ユーザー情報を取得する。authFetch 経由なので、期限切れ直前なら先にリフレッシュされる。
   */
  const fetchUser = useCallback(async () => {
    try {
      console.log("ユーザー情報の取得を開始", __filename);
      const response = await authFetch("/api/auth/me", {
        credentials: "include",
      });

      if (response.ok) {
        const data: { user: User; expiresAt: number | null } =
          await response.json();
        setUser(data.user);
        setTokenExpiresAt(data.expiresAt);
      } else {
        setUser(null);
        setTokenExpiresAt(null);
      }
    } catch {
      setUser(null);
      setTokenExpiresAt(null);
    } finally {
      console.log("finished loading", __filename);
      setLoading(false);
    }
  }, []);

  // 初回マウント時にユーザー情報を取得
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // ログアウト処理
  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      setTokenExpiresAt(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // 権限チェック
  const hasPermission = (permission: string): boolean => {
    return user?.permissions?.includes(permission) ?? false;
  };

  // 管理者チェック
  const isAdmin = (): boolean => {
    return user?.role === "admin";
  };

  const value: AuthContextType = {
    user,
    loading,
    tokenExpiresAt,
    isAuthenticated: !!user,
    isBelongsToFamily: !!user?.familyId,
    logout,
    refetch: fetchUser,
    hasPermission,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * 認証コンテキストを使用するカスタムフック
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
