import { getApiUrl } from "./env";

/**
 * 家族招待トークンのsessionStorageキー
 */
export const JOIN_TOKEN_STORAGE_KEY = "family_join_token";

/**
 * 家族参加リクエストを送信
 *
 * @param token 招待トークン
 * @returns 成功した場合は true、失敗した場合はエラーをスロー
 */
export async function submitFamilyJoinRequest(token: string): Promise<void> {
  const response = await fetch(getApiUrl("/families/join-requests"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ token }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "家族への参加に失敗しました");
  }
}

/**
 * sessionStorageに招待トークンを保存
 *
 * @param token 招待トークン
 */
export function saveJoinToken(token: string): void {
  sessionStorage.setItem(JOIN_TOKEN_STORAGE_KEY, token);
}

/**
 * sessionStorageから招待トークンを取得
 *
 * @returns 招待トークン、存在しない場合は null
 */
export function getJoinToken(): string | null {
  return sessionStorage.getItem(JOIN_TOKEN_STORAGE_KEY);
}

/**
 * sessionStorageから招待トークンを削除
 */
export function clearJoinToken(): void {
  sessionStorage.removeItem(JOIN_TOKEN_STORAGE_KEY);
}

/**
 * 招待トークンが存在するかチェック
 *
 * @returns 招待トークンが存在する場合は true
 */
export function hasJoinToken(): boolean {
  return !!getJoinToken();
}
