import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

/**
 * GET /api/auth/me
 * 現在ログイン中のユーザー情報を取得
 */
export async function GET() {
  try {
    // HttpOnly Cookieからトークンを取得
    const cookieStore = await cookies();
    const token = cookieStore.get("family_token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // JWTを検証してペイロードを取得
    const payload = await verifyToken(token);

    // ユーザー情報を返す
    return NextResponse.json({
      authenticated: true,
      user: {
        id: payload.userId,
        role: payload.role || "user",
        familyId: payload.familyId,
      },
    });
  } catch (error) {
    // トークンが無効または期限切れ
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 },
    );
  }
}
