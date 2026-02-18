import { Bell } from "lucide-react";
import { useState } from "react";
import { type NotificationSettings } from "@/lib/actions/settings";

interface NotificationSettingsSectionProps {
  show: boolean;
  /**
   * 初期通知設定
   */
  initialSettings?: NotificationSettings;
  /**
   * 設定変更時のハンドラー
   */
  onChange?: (settings: NotificationSettings) => void;
}

/**
 * 通知設定セクション
 *
 * 全ユーザーが利用可能
 */
export function NotificationSettingsSection({
  show = true,
  initialSettings = {
    postCreatedEnabled: false,
  },
  onChange,
}: Readonly<NotificationSettingsSectionProps>) {
  const [settings, setSettings] =
    useState<NotificationSettings>(initialSettings);

  const handleToggle = (key: keyof NotificationSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    onChange?.(newSettings);
  };

  if (!show) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <div className="flex items-center gap-3 mb-6">
        <Bell className="w-5 h-5 text-gray-700" />
        <h3 className="text-gray-900 font-semibold">通知設定</h3>
      </div>

      <div className="space-y-4">
        <label className="flex items-center justify-between p-4 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
          <div>
            <p className="text-gray-900 font-medium">新しい投稿の通知</p>
            <p className="text-sm text-gray-600">家族が投稿したときに通知</p>
          </div>
          <input
            type="checkbox"
            checked={settings.postCreatedEnabled}
            onChange={(e) =>
              handleToggle("postCreatedEnabled", e.target.checked)
            }
            className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
            aria-label="新しい投稿の通知を有効にする"
          />
        </label>
      </div>
    </div>
  );
}
