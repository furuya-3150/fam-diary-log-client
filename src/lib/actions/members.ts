import { getApiUrl } from "@/lib/env";

/**
 * APIから取得するメンバーのレスポンス型
 */
export interface MemberApiResponse {
  id: string;
  name: string;
}

/**
 * メンバーマップの型
 * { userId: userName } の形式
 */
export type MemberMap = Record<string, string>;

/**
 * 家族メンバー一覧を取得
 * @param fields 取得するフィールド（カンマ区切り）例: "id,name"
 * @returns メンバーの配列
 */
export async function getFamilyMembers(
  fields: string = "id,name",
): Promise<MemberApiResponse[]> {
  try {
    const url = getApiUrl(`/families/me/members?fields=${fields}`);

    const response = await fetch(url, {
      credentials: "include", // Cookieを送信
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("認証エラー: ログインしてください");
      }
      throw new Error(`メンバーの取得に失敗しました: ${response.status}`);
    }

    const { data }: { data: MemberApiResponse[] } = await response.json();
    console.log("メンバーの取得に成功:", data);

    return data;
  } catch (error) {
    console.error("メンバーの取得エラー:", error);
    throw error;
  }
}

// ヘルパー関数を再エクスポート
export { convertMembersToMap } from "@/lib/helpers/memberHelpers";
