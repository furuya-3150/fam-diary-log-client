import { cn } from "./utils";

export interface LoadingProps {
  /**
   * ローディング中に表示するメッセージ
   */
  message?: string;
  /**
   * スピナーのサイズ
   * @default "md"
   */
  size?: "sm" | "md" | "lg";
  /**
   * 全画面表示するかどうか
   * @default false
   */
  fullScreen?: boolean;
  /**
   * 背景のグラデーション表示
   * @default false
   */
  gradient?: boolean;
  /**
   * 追加のクラス名
   */
  className?: string;
}

const sizeClasses = {
  sm: "h-6 w-6 border",
  md: "h-12 w-12 border-b-2",
  lg: "h-16 w-16 border-b-4",
};

/**
 * ローディングスピナーコンポーネント
 *
 * 使用例:
 * ```tsx
 * <Loading message="読み込み中..." />
 * <Loading size="lg" fullScreen />
 * <Loading message="データを取得中..." gradient fullScreen />
 * ```
 */
export function Loading({
  message,
  size = "md",
  fullScreen = false,
  gradient = false,
  className,
}: Readonly<LoadingProps>) {
  const containerClasses = cn(
    "flex items-center justify-center",
    fullScreen && "min-h-screen",
    gradient &&
      fullScreen &&
      "bg-gradient-to-br from-indigo-50 via-white to-purple-50",
    className,
  );

  return (
    <div className={containerClasses}>
      <div className="text-center">
        <div
          className={cn(
            "animate-spin rounded-full border-indigo-600 mx-auto",
            sizeClasses[size],
            message && "mb-4",
          )}
        ></div>
        {message && <p className="text-gray-600">{message}</p>}
      </div>
    </div>
  );
}
