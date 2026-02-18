import { getApiUrl } from "@/lib/env";

/**
 * APIレスポンスの通知設定型（スネークケース）
 */
export interface NotificationSettingsApiResponse {
  post_created_enabled: boolean;
}

/**
 * アプリケーション内部の通知設定型（キャメルケース）
 */
export interface NotificationSettings {
  postCreatedEnabled: boolean;
}

/**
 * APIレスポンスをアプリケーション内部の型に変換
 */
export function convertNotificationSettings(
  apiResponse: NotificationSettingsApiResponse,
): NotificationSettings {
  return {
    postCreatedEnabled: apiResponse.post_created_enabled,
  };
}

/**
 * 通知設定を取得
 * @returns 通知設定（キャメルケース）
 */
export async function getNotificationSettings(): Promise<NotificationSettings> {
  try {
    const url = getApiUrl("/families/me/settings/notifications");

    const response = await fetch(url, {
      credentials: "include", // Cookieを送信
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("認証エラー: ログインしてください");
      }
      throw new Error(`通知設定の取得に失敗しました: ${response.status}`);
    }

    const { data }: { data: NotificationSettingsApiResponse } =
      await response.json();
    console.log("通知設定の取得に成功:", data);

    // APIレスポンスをキャメルケースに変換して返す
    return convertNotificationSettings(data);
  } catch (error) {
    console.error("通知設定の取得エラー:", error);
    throw error;
  }
}
