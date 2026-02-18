"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Screen } from "@/types";
import { ArrowLeft } from "lucide-react";
import { Loading } from "./ui/loading";
import { FamilyManagementSection } from "./settings/FamilyManagementSection";
import { NotificationSettingsSection } from "./settings/NotificationSettingsSection";
import { AccountSection } from "./settings/AccountSection";
import { LogoutButton } from "./settings/LogoutButton";
import { AppInfo } from "./settings/AppInfo";
import { getFamilyMembers } from "@/lib/actions/members";

interface SettingsScreenProps {
  onBack: () => void;
  onLogout: () => void;
  onNavigate?: (screen: Screen) => void;
}

export function SettingsScreen({
  onBack,
  onLogout,
  onNavigate,
}: Readonly<SettingsScreenProps>) {
  const { loading, isBelongsToFamily, isAdmin } = useAuth();
  const [familyMembers, setFamilyMembers] = useState<
    Array<{
      id: string;
      name: string;
      email: string;
      role: string;
      avatar: string;
    }>
  >([]);
  const [loadingMembers, setLoadingMembers] = useState(true);

  // メンバー情報を取得
  useEffect(() => {
    if (!isBelongsToFamily || loading) return;

    const fetchMembers = async () => {
      try {
        setLoadingMembers(true);
        const members = await getFamilyMembers("id,name,role");

        // APIレスポンスをFamilyMember型に変換
        const formattedMembers = members.map((member) => ({
          id: member.id,
          name: member.name,
          email: member.email || "",
          role: member.role || "メンバー",
          avatar: "👤", // デフォルトアバター
        }));

        setFamilyMembers(formattedMembers);
      } catch (error) {
        console.error("メンバー取得エラー:", error);
      } finally {
        setLoadingMembers(false);
      }
    };

    fetchMembers();
  }, [isBelongsToFamily, loading]);

  if (loading || loadingMembers) {
    return <Loading message="読み込み中..." fullScreen gradient />;
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
          members={familyMembers}
          onInvite={() => onNavigate?.("invite")}
          show={isBelongsToFamily}
          isAdmin={isAdmin()}
        />

        <NotificationSettingsSection
          show={isBelongsToFamily}
          onChange={(settings) => {}}
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
