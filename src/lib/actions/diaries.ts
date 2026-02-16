import { getDiaryApiUrl } from "@/lib/env";

/**
 * サーバーAPIから取得する日記のレスポンス型
 */
interface DiaryApiResponse {
  id: string;
  title: string;
  content: string;
  author: string;
  author_id: string;
  created_at: string; // ISO 8601形式の文字列
  image_url?: string;
}

/**
 * クライアントで使用する日記の型
 */
export interface DiaryPost {
  id: string;
  title: string;
  content: string;
  author: string;
  authorId: string;
  timestamp: Date;
  image?: string;
}

/**
 * 指定日の日記一覧を取得
 * @param targetDate YYYY-MM-DD形式の日付
 */
export async function getDiaries(targetDate: string): Promise<DiaryPost[]> {
  try {
    const url = getDiaryApiUrl(
      `/families/me/diaries?target_date=${targetDate}`,
    );

    const response = await fetch(url, {
      credentials: "include", // Cookieを送信
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("認証エラー: ログインしてください");
      }
      throw new Error(`日記の取得に失敗しました: ${response.status}`);
    }

    const { data }: { data: DiaryApiResponse[] } = await response.json();

    // APIレスポンスをクライアント用の型に変換
    return data.map((diary) => ({
      id: diary.id,
      title: diary.title,
      content: diary.content,
      author: diary.author,
      authorId: diary.author_id,
      timestamp: new Date(diary.created_at),
      image: diary.image_url,
    }));
  } catch (error) {
    console.error("日記の取得エラー:", error);
    throw error;
  }
}

/**
 * 今日の日記一覧を取得
 */
export async function getTodayDiaries(): Promise<DiaryPost[]> {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD形式
  return getDiaries(today);
}