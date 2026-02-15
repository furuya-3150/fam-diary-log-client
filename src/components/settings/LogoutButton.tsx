import { LogOut } from "lucide-react";

interface LogoutButtonProps {
  /**
   * ログアウトクリック時のハンドラー
   */
  onLogout: () => void;
}

/**
 * ログアウトボタン
 *
 * 全ユーザーが利用可能
 */
export function LogoutButton({ onLogout }: Readonly<LogoutButtonProps>) {
  return (
    <button
      onClick={onLogout}
      className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors border border-red-200"
    >
      <LogOut className="w-5 h-5" />
      <span className="font-medium">ログアウト</span>
    </button>
  );
}
