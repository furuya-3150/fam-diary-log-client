import type { WeeklyData } from "@/lib/actions/diaries";

/**
 * 週間データから平均を計算（汎用版）
 * @param weeklyData 週間データ
 * @returns 平均値（小数点第1位まで）、データがない場合は0
 */
export function calculateWeeklyAverage(weeklyData: WeeklyData): number {
  // null以外の値を抽出
  const validValues = Object.values(weeklyData).filter(
    (value): value is number => value !== null,
  );

  // データがない場合は0
  if (validValues.length === 0) {
    return 0;
  }

  const average =
    validValues.reduce((sum, value) => sum + value, 0) / validValues.length;

  return Math.round(average * 10) / 10;
}

/**
 * 週間データをチャート用データに変換
 * @param weeklyData 週間データ（キー: YYYY-MM-DD、値: 数値またはnull）
 * @param valueKey グラフで使用するキー名（例: "score", "words", "minutes"）
 * @returns チャート用データ配列
 */
export function convertWeeklyDataToChartData(
  weeklyData: WeeklyData,
  valueKey: string = "value",
): Array<{ date: string; [key: string]: string | number }> {
  return Object.entries(weeklyData)
    .filter(([, value]) => value !== null)
    .map(([dateStr, value]) => {
      // YYYY-MM-DD → M/D 形式に変換
      const date = new Date(dateStr);
      const formattedDate = `${date.getMonth() + 1}/${date.getDate()}`;

      return {
        date: formattedDate,
        [valueKey]: value as number,
      };
    });
}
