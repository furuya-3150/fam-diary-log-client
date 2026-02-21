import { env } from "@/lib/env";

/**
 * APIリクエストの招待型（スネークケース）
 */
export interface SendInvitationsRequest {
  emails: string[];
}

/**
 * 家族への招待メールを送信
 * @param emails - 送信先メールアドレスの配列
 */
export async function sendInvitations(emails: string[]): Promise<void> {
  try {
    // 空のメールアドレスを除外
    const validEmails = emails.filter((email) => email.trim() !== "");

    if (validEmails.length === 0) {
      throw new Error("送信するメールアドレスがありません");
    }

    const baseUrl = env.apiUrl.replace(/\/$/, "");
    const url = `${baseUrl}/families/me/invitations`;

    const requestBody: SendInvitationsRequest = {
      emails: validEmails,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Cookieを送信
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("認証エラー: ログインしてください");
      }
      const errorData = await response.json();
      throw new Error(
        `招待メールの送信に失敗しました: ${errorData.message || "不明なエラー"}`,
      );
    }

    console.log("招待メールの送信に成功:", validEmails);
  } catch (error) {
    console.error("招待メール送信エラー:", error);
    throw error;
  }
}
