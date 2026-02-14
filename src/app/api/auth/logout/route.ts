import { NextResponse } from "next/server";

/**
 * POST /api/auth/logout
 * ログアウト処理（Cookieを削除）
 */
export async function POST() {
  const response = NextResponse.json({ success: true });

  // auth_token Cookieを削除
  response.cookies.set("auth_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0, // 即座に削除
    path: "/",
  });

  return response;
}
