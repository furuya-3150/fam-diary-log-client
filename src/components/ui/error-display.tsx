import { useRouter } from "next/navigation";
import { cn } from "./utils";

export interface ErrorDisplayProps {
  /**
   * エラーメッセージ
   */
  message: string;
  /**
   * エラータイトル
   * @default "エラーが発生しました"
   */
  title?: string;
  /**
   * ボタンのテキスト
   * @default "戻る"
   */
  buttonText?: string;
  /**
   * ボタンクリック時の動作
   * - string: 指定されたパスにルーティング
   * - function: カスタムハンドラーを実行
   * @default "/"
   */
  onButtonClick?: string | (() => void);
  /**
   * アイコンの種類
   * @default "error"
   */
  iconType?: "error" | "warning" | "info";
  /**
   * 全画面表示するかどうか
   * @default true
   */
  fullScreen?: boolean;
  /**
   * 背景のグラデーション表示
   * @default true
   */
  gradient?: boolean;
  /**
   * 追加のクラス名
   */
  className?: string;
}

const iconConfig = {
  error: {
    bgColor: "bg-red-100",
    iconColor: "text-red-600",
    path: "M6 18L18 6M6 6l12 12",
  },
  warning: {
    bgColor: "bg-yellow-100",
    iconColor: "text-yellow-600",
    path: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
  },
  info: {
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
    path: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
};

/**
 * エラー表示コンポーネント
 *
 * 使用例:
 * ```tsx
 * <ErrorDisplay
 *   message="データの読み込みに失敗しました"
 *   onButtonClick="/dashboard"
 * />
 *
 * <ErrorDisplay
 *   title="警告"
 *   message="この操作は取り消せません"
 *   iconType="warning"
 *   buttonText="キャンセル"
 *   onButtonClick={() => handleCancel()}
 * />
 * ```
 */
export function ErrorDisplay({
  message,
  title = "エラーが発生しました",
  buttonText = "戻る",
  onButtonClick = "/",
  iconType = "error",
  fullScreen = true,
  gradient = true,
  className,
}: Readonly<ErrorDisplayProps>) {
  const router = useRouter();

  const handleClick = () => {
    if (typeof onButtonClick === "string") {
      router.push(onButtonClick);
    } else {
      onButtonClick();
    }
  };

  const icon = iconConfig[iconType];

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
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            <div
              className={cn(
                "mx-auto flex items-center justify-center h-12 w-12 rounded-full mb-4",
                icon.bgColor,
              )}
            >
              <svg
                className={cn("h-6 w-6", icon.iconColor)}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={icon.path}
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <button
              onClick={handleClick}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
