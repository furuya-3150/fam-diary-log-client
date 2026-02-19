import { getApiUrl } from "@/lib/env";

/**
 * APIレスポンスのユーザー情報型（スネークケース）
 */
export interface UserApiResponse {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

/**
 * アプリケーション内部のユーザー情報型（キャメルケース）
 */
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

/**
 * APIレスポンスをアプリケーション内部の型に変換
 */
export function convertUser(apiResponse: UserApiResponse): User {
  return {
    id: apiResponse.id,
    name: apiResponse.name,
    email: apiResponse.email,
    createdAt: apiResponse.created_at,
  };
}

/**
 * ユーザー情報を取得
 * @returns ユーザー情報（キャメルケース）
 */
export async function getUser(): Promise<User> {
  try {
    const url = getApiUrl("/users/me");

    const response = await fetch(url, {
      credentials: "include", // Cookieを送信
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("認証エラー: ログインしてください");
      }
      throw new Error(`ユーザー情報の取得に失敗しました: ${response.status}`);
    }

    const { data }: { data: UserApiResponse } = await response.json();
    console.log("ユーザー情報の取得に成功:", data);

    // APIレスポンスをキャメルケースに変換して返す
    return convertUser(data);
  } catch (error) {
    console.error("ユーザー情報の取得エラー:", error);
    throw error;
  }
}
