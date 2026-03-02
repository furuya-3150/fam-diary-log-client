import { COOKIE_AUTH_TOKEN, COOKIE_REFRESH_TOKEN } from "@/lib/auth";
import { NextResponse } from "next/server";

/**
 * POST /api/auth/logout
 * ログアウト処理（アクセストークンとリフレッシュトークンの両 Cookie を削除）
 */
export async function POST() {
  const response = NextResponse.json({ success: true });

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    maxAge: 0, // 即座に削除
    path: "/",
  };

  response.cookies.set(COOKIE_AUTH_TOKEN, "", cookieOptions);

  // refresh_token Cookie を削除
  cookieOptions.path = "/auth/refresh"; // リフレッシュトークンはこのパスで設定されている想定
  response.cookies.set(COOKIE_REFRESH_TOKEN, "", cookieOptions);

  return response;
}
