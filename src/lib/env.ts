/**
 * 環境変数の型定義と取得ヘルパー
 */

// クライアント側で使用可能な環境変数（NEXT_PUBLIC_プレフィックス必須）
export const env = {
  /**
   * バックエンドAPIのベースURL
   */
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8082",

  /**
   * 現在の環境
   */
  nodeEnv: process.env.NODE_ENV || "development",

  /**
   * 本番環境かどうか
   */
  isProduction: process.env.NODE_ENV === "production",

  /**
   * 開発環境かどうか
   */
  isDevelopment: process.env.NODE_ENV === "development",
} as const;

/**
 * サーバー側専用の環境変数
 * クライアントコンポーネントでは使用不可
 */
export const serverEnv = {
  /**
   * JWT秘密鍵
   */
  jwtSecret:
    process.env.JWT_SECRET || "your-secret-key-change-this-in-production",
} as const;

/**
 * APIエンドポイントを生成するヘルパー
 */
export function getApiUrl(path: string): string {
  const baseUrl = env.apiUrl.replace(/\/$/, ""); // 末尾のスラッシュを削除
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
}
