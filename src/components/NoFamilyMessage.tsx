import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export interface NoFamilyMessageProps {
  /**
   * メッセージのタイトル
   * @default "家族に参加していません"
   */
  title?: string;
  /**
   * メッセージの説明
   * @default "家族日記を利用するには、家族に参加する必要があります。"
   */
  description?: string;
  /**
   * 主要ボタンのテキスト
   * @default "家族を作成する"
   */
  primaryButtonText?: string;
  /**
   * 主要ボタンのリンク先
   * @default "/create-family"
   */
  primaryButtonLink?: string;
  /**
   * 二次ボタンのテキスト（オプション）
   */
  secondaryButtonText?: string;
  /**
   * 二次ボタンのリンク先
   */
  secondaryButtonLink?: string;
  /**
   * アイコンを表示するかどうか
   * @default true
   */
  showIcon?: boolean;
  /**
   * 全画面表示するかどうか
   * @default true
   */
  fullScreen?: boolean;
}

/**
 * 家族に参加していない場合に表示するメッセージコンポーネント
 *
 * 使用例:
 * ```tsx
 * const { isBelongsToFamily } = useAuth();
 *
 * if (!isBelongsToFamily) {
 *   return <NoFamilyMessage />;
 * }
 * ```
 */
export function NoFamilyMessage({
  title = "家族に参加していません",
  description = "家族日記を利用するには、家族に参加する必要があります。",
  primaryButtonText = "家族を作成する",
  primaryButtonLink = "/create-family",
  secondaryButtonText,
  secondaryButtonLink,
  showIcon = true,
  fullScreen = true,
}: Readonly<NoFamilyMessageProps>) {
  const router = useRouter();

  return (
    <div
      className={`flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 ${
        fullScreen ? "min-h-screen" : "min-h-96"
      }`}
    >
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            {showIcon && (
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 mb-4">
                <svg
                  className="h-8 w-8 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
            )}
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
            <p className="text-gray-600 mb-6">{description}</p>

            <div className="space-y-3">
              <Button
                onClick={() => router.push(primaryButtonLink)}
                className="w-full bg-indigo-600 hover:bg-indigo-700"
              >
                {primaryButtonText}
              </Button>

              {secondaryButtonText && secondaryButtonLink && (
                <Button
                  onClick={() => router.push(secondaryButtonLink)}
                  variant="outline"
                  className="w-full"
                >
                  {secondaryButtonText}
                </Button>
              )}

              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500 mb-3">
                  または招待リンクをお持ちの方は
                </p>
                <p className="text-xs text-gray-400">
                  招待リンクをクリックして家族に参加できます
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
