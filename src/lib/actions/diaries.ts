import { getDiaryAnalysisApiUrl, getDiaryApiUrl } from "@/lib/env";

/**
 * サーバーAPIから取得する日記のレスポンス型
 */
interface DiaryApiResponse {
  id: string;
  title: string;
  content: string;
  user_id: string;
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
  userId: string;
  timestamp: Date;
  image?: string;
}

/**
 * 週間スコアデータの型
 * キー: YYYY-MM-DD形式の日付
 * 値: スコア（数値）またはnull（データなし）
 */
export type WeeklyScoreData = Record<string, number | null>;

/**
 * 週間データの汎用型
 * キー: YYYY-MM-DD形式の日付
 * 値: 数値またはnull（データなし）
 */
export type WeeklyData = Record<string, number | null>;

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
    console.log("日記の取得に成功:", data);

    // APIレスポンスをクライアント用の型に変換
    return data.map((diary) => ({
      id: diary.id,
      title: diary.title,
      content: diary.content,
      userId: diary.user_id,
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

/**
 * 連続投稿日数を取得
 */
export async function getDiaryStreak(): Promise<number> {
  try {
    const url = getDiaryApiUrl(`/families/me/diaries/streak`);

    const response = await fetch(url, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`連続日数の取得に失敗しました: ${response.status}`);
    }

    const { data }: { data: { current_streak: number } } =
      await response.json();
    console.log("連続日数の取得に成功:", data);
    return data.current_streak;
  } catch (error) {
    console.error("連続日数の取得エラー:", error);
    throw error;
  }
}

/**
 * 今月の投稿数を取得
 * @param year 年（YYYY）
 * @param month 月（MM）
 */
export async function getMonthlyDiariesCount(
  year?: number,
  month?: number,
): Promise<number> {
  try {
    const now = new Date();
    const targetYear = year ?? now.getFullYear();
    const targetMonth = month ?? String(now.getMonth() + 1).padStart(2, "0");

    const url = getDiaryApiUrl(
      `/families/me/diaries/count?year=${targetYear}&month=${targetMonth}`,
    );

    const response = await fetch(url, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`投稿数の取得に失敗しました: ${response.status}`);
    }

    const { data }: { data: { count: number } } = await response.json();
    console.log("投稿数の取得に成功:", data);
    return data.count;
  } catch (error) {
    console.error("投稿数の取得エラー:", error);
    throw error;
  }
}

/**
 * 週間スコアデータを取得
 */
export async function getWeeklyAccuracyScore(): Promise<WeeklyScoreData> {
  try {
    const url = getDiaryAnalysisApiUrl(
      `/families/me/analyzed-diaries/weekly-accuracy-score?date=${new Date().toISOString().split("T")[0]}`,
    );

    const response = await fetch(url, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`週間スコアの取得に失敗しました: ${response.status}`);
    }

    const { data }: { data: WeeklyScoreData } = await response.json();
    console.log("週間スコアの取得に成功:", data);

    return data;
  } catch (error) {
    console.error("週間スコアの取得エラー:", error);
    throw error;
  }
}

/**
 * 週間文字数データを取得
 */
export async function getWeeklyWordCount(): Promise<WeeklyData> {
  try {
    const url = getDiaryAnalysisApiUrl(
      `/families/me/analyzed-diaries/weekly-char-count?date=${new Date().toISOString().split("T")[0]}`,
    );

    const response = await fetch(url, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`週間文字数の取得に失敗しました: ${response.status}`);
    }

    const { data }: { data: WeeklyData } = await response.json();
    console.log("週間文字数の取得に成功:", data);

    return data;
  } catch (error) {
    console.error("週間文字数の取得エラー:", error);
    throw error;
  }
}

/**
 * 週間執筆時間データを取得
 */
export async function getWeeklyWritingTime(): Promise<WeeklyData> {
  try {
    const url = getDiaryAnalysisApiUrl(
      `/families/me/analyzed-diaries/weekly-writing-time?date=${new Date().toISOString().split("T")[0]}`,
    );

    const response = await fetch(url, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`週間執筆時間の取得に失敗しました: ${response.status}`);
    }

    const { data }: { data: WeeklyData } = await response.json();
    console.log("週間執筆時間の取得に成功:", data);

    return data;
  } catch (error) {
    console.error("週間執筆時間の取得エラー:", error);
    throw error;
  }
}

// ヘルパー関数を再エクスポート
export {
  calculateWeeklyAverage,
  convertWeeklyDataToChartData,
} from "@/lib/helpers/diaryHelpers";
