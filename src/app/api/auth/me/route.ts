"use server";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { COOKIE_AUTH_TOKEN, verifyToken } from "@/lib/auth";

const DEFAULT_ROLE = "member";

/**
 * GET /api/auth/me
 * 現在ログイン中のユーザー情報を取得。
 * トークンの期限確認・リフレッシュは authFetch 層で行われるため、此ルートは検証のみを担当する。
 */
export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_AUTH_TOKEN)?.value;

  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const payload = await verifyToken(token);

    return NextResponse.json({
      user: {
        id: payload.sub,
        role: payload.role || DEFAULT_ROLE,
        familyId: payload.familyId || null,
      },
      expiresAt: payload.exp ?? null,
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 },
    );
  }
}
