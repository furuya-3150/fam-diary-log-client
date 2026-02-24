import { getApiUrl } from "@/lib/env";
import { authFetch } from "@/lib/authFetch";
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

    const response = await authFetch(url, {
      credentials: "include", // Cookieを送信
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("認証エラー: ログインしてください");
      }
      const errorData = await response.json();
      throw new Error(`通知設定の取得に失敗しました: ${errorData.message}`);
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

/**
 * 通知設定を更新
 * @param settings 更新する通知設定
 * @returns 更新後の通知設定
 */
export async function updateNotificationSettings(
  settings: NotificationSettings,
): Promise<void> {
  try {
    const url = getApiUrl("/families/me/settings/notifications");

    // キャメルケースをスネークケースに変換
    const requestBody: NotificationSettingsApiResponse = {
      post_created_enabled: settings.postCreatedEnabled,
    };

    const response = await authFetch(url, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("認証エラー: ログインしてください");
      }
      const errorData = await response.json();
      throw new Error(`通知設定の更新に失敗しました: ${errorData.message}`);
    }

    console.log("通知設定の更新に成功");
  } catch (error) {
    console.error("通知設定の更新エラー:", error);
    throw error;
  }
}
