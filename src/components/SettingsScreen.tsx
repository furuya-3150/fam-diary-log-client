"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Screen } from "@/types";
import { ArrowLeft } from "lucide-react";
import { Loading } from "./ui/loading";
import { FamilyManagementSection } from "./settings/FamilyManagementSection";
import { NotificationSettingsSection } from "./settings/NotificationSettingsSection";
import { AccountSection } from "./settings/AccountSection";
import { LogoutButton } from "./settings/LogoutButton";
import { AppInfo } from "./settings/AppInfo";

interface SettingsScreenProps {
  onBack: () => void;
  onLogout: () => void;
  onNavigate?: (screen: Screen) => void;
}

const mockFamilyMembers = [
  {
    id: "1",
    name: "お母さん",
    email: "mother@example.com",
    role: "管理者",
    avatar: "👩",
  },
  {
    id: "2",
    name: "お父さん",
    email: "father@example.com",
    role: "メンバー",
    avatar: "👨",
  },
  {
    id: "3",
    name: "太郎",
    email: "taro@example.com",
    role: "メンバー",
    avatar: "👦",
  },
  {
    id: "4",
    name: "花子",
    email: "hanako@example.com",
    role: "メンバー",
    avatar: "👧",
  },
];

export function SettingsScreen({
  onBack,
  onLogout,
  onNavigate,
}: Readonly<SettingsScreenProps>) {
  const { loading, isBelongsToFamily, isAdmin } = useAuth();

  if (loading) {
    return <Loading message="認証状態を確認中..." fullScreen gradient />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>戻る</span>
          </button>

          <h2 className="text-gray-900 font-semibold">設定</h2>

          <div className="w-20"></div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        <FamilyManagementSection
          members={mockFamilyMembers}
          onInvite={() => onNavigate?.("invite")}
          show={isBelongsToFamily}
          isAdmin={isAdmin()}
        />

        <NotificationSettingsSection
          show={isBelongsToFamily}
          onChange={(settings) => {
            console.log("Notification settings changed:", settings);
          }}
        />

        <AccountSection
          isShow={isBelongsToFamily}
          onEditProfile={() => onNavigate?.("profile-edit")}
        />

        <LogoutButton onLogout={onLogout} />

        {/* アプリ情報 */}
        <AppInfo version="1.0.0" copyrightYear={2025} appName="FamBrain" />
      </div>
    </div>
  );
}
