import { NextResponse } from "next/server";
import { COOKIE_AUTH_TOKEN } from "../me/route";

/**
 * POST /api/auth/logout
 * ログアウト処理（Cookieを削除）
 */
export async function POST() {
  const response = NextResponse.json({ success: true });

  // auth_token Cookieを削除
  response.cookies.set(COOKIE_AUTH_TOKEN, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0, // 即座に削除
    path: "/",
  });

  return response;
}
