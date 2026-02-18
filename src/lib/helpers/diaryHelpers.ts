import type { WeeklyScoreData } from "@/lib/actions/diaries";

/**
 * 週間スコアデータから平均を計算
 * @param weeklyData 週間スコアデータ
 * @returns 平均スコア（四捨五入）、データがない場合は0
 */
export function calculateWeeklyAverage(weeklyData: WeeklyScoreData): number {
  // null以外の値を抽出
  const validScores = Object.values(weeklyData).filter(
    (score): score is number => score !== null,
  );

  // データがない場合は0
  if (validScores.length === 0) {
    return 0;
  }

  const average =
    validScores.reduce((sum, score) => sum + score, 0) / validScores.length;

  return Math.round(average);
}
