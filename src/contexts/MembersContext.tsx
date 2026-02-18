"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import {
  getFamilyMembers,
  convertMembersToMap,
  type MemberMap,
} from "@/lib/actions/members";
import { useAuth } from "./AuthContext";

/**
 * メンバーコンテキストの型
 */
interface MembersContextType {
  /**
   * メンバーマップ { userId: userName }
   */
  members: MemberMap;

  /**
   * ローディング状態
   */
  loading: boolean;

  /**
   * メンバー情報を再取得
   */
  refetch: () => Promise<void>;

  /**
   * ユーザーIDから名前を取得
   */
  getMemberName: (userId: string) => string | undefined;
}

const MembersContext = createContext<MembersContextType | null>(null);

export function MembersProvider({ children }: { children: React.ReactNode }) {
  const [members, setMembers] = useState<MemberMap>({});
  const [loading, setLoading] = useState(true);
  const {
    isAuthenticated,
    isBelongsToFamily,
    loading: authLoading,
  } = useAuth();

  // メンバー情報を取得
  const fetchMembers = useCallback(async () => {
    // 認証されていない、または家族に所属していない場合はスキップ
    if (!isAuthenticated || !isBelongsToFamily) {
      setMembers({});
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const memberArray = await getFamilyMembers("id,name");
      const memberData = convertMembersToMap(memberArray);
      setMembers(memberData);
    } catch (error) {
      console.error("メンバー取得エラー:", error);
      setMembers({});
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, isBelongsToFamily]);

  // 認証状態が変わったらメンバー情報を取得
  useEffect(() => {
    if (authLoading) return; // 認証チェック中は待つ

    fetchMembers();
  }, [fetchMembers, authLoading]);

  // ユーザーIDから名前を取得するヘルパー関数
  const getMemberName = useCallback(
    (userId: string): string | undefined => {
      return members[userId];
    },
    [members],
  );

  const value: MembersContextType = {
    members,
    loading,
    refetch: fetchMembers,
    getMemberName,
  };

  return (
    <MembersContext.Provider value={value}>{children}</MembersContext.Provider>
  );
}

/**
 * メンバーコンテキストを使用するカスタムフック
 */
export function useMembers(): MembersContextType {
  const context = useContext(MembersContext);

  if (!context) {
    throw new Error("useMembers must be used within a MembersProvider");
  }

  return context;
}
