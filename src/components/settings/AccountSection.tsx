import { ChevronRight } from "lucide-react";

interface AccountSectionProps {
  isShow: boolean;
  /**
   * プロフィール編集クリック時のハンドラー
   */
  onEditProfile: () => void;
}

/**
 * アカウント設定セクション
 *
 * 全ユーザーが利用可能
 */
export function AccountSection({
  isShow = true,
  onEditProfile,
}: Readonly<AccountSectionProps>) {
  if (!isShow) {
    return null;
  }
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <h3 className="text-gray-900 font-semibold mb-4">アカウント</h3>

      <div className="space-y-3">
        <button
          onClick={onEditProfile}
          className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          <div className="text-left">
            <p className="text-gray-900 font-medium">プロフィール編集</p>
            <p className="text-sm text-gray-600">名前やアイコンを変更</p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
      </div>
    </div>
  );
}
