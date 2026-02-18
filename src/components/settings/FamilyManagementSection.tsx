import { Users, UserPlus, Mail, Bell, ChevronRight } from "lucide-react";

interface FamilyMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

interface FamilyManagementSectionProps {
  /**
   * 家族メンバー一覧
   */
  members: FamilyMember[];
  /**
   * 招待ボタンクリック時のハンドラー
   */
  onInvite: () => void;
  /**
   * 表示するかどうか（家族に所属している場合のみ表示）
   */
  show?: boolean;
  /**
   * 管理者権限があるかどうか
   */
  isAdmin?: boolean;
}

/**
 * 家族メンバー管理セクション
 *
 * 家族に所属しているユーザーのみ表示される
 */
export function FamilyManagementSection({
  members,
  onInvite,
  show = true,
  isAdmin = false,
}: Readonly<FamilyManagementSectionProps>) {
  // 家族に所属していない場合は表示しない
  if (!show) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-gray-700" />
            <h3 className="text-gray-900 font-semibold">家族メンバー管理</h3>
          </div>

          {/* 管理者のみ招待ボタンを表示 */}
          {isAdmin && (
            <button
              onClick={onInvite}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <UserPlus className="w-4 h-4" />
              <span className="text-sm">招待</span>
            </button>
          )}
        </div>
      </div>

      {/* メンバー一覧 */}
      <div className="divide-y divide-gray-200">
        {members.map((member) => (
          <div
            key={member.id}
            className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl">
                {member.avatar}
              </div>
              <div>
                <p className="text-gray-900 font-medium">{member.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                {member.role}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
