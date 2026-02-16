"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import type { User, AuthContextType } from "@/types/auth";

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // ユーザー情報を取得
  const fetchUser = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/me", {
        credentials: "include", // Cookieを送信
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
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
      // ログアウトAPIを呼び出してCookieを削除
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
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
