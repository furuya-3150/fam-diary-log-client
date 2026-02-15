interface AppInfoProps {
  /**
   * アプリバージョン
   */
  version?: string;
  /**
   * コピーライト年
   */
  copyrightYear?: number;
  /**
   * アプリ名
   */
  appName?: string;
}

/**
 * アプリ情報セクション
 */
export function AppInfo({
  version = "1.0.0",
  copyrightYear = new Date().getFullYear(),
  appName = "FamBrain",
}: Readonly<AppInfoProps>) {
  return (
    <div className="text-center text-gray-500 text-sm space-y-1 py-4">
      <p>
        {appName} v{version}
      </p>
      <p>
        © {copyrightYear} {appName}. All rights reserved.
      </p>
    </div>
  );
}
