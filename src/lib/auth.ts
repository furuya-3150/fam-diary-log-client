import { jwtVerify, SignJWT } from "jose";
import { serverEnv } from "./env";

// const JWT_SECRET = new TextEncoder().encode("your-secret-key-change-this-in-production"); // ここは環境変数から取得するべきですが、デバッグのために直接定義しています
const JWT_SECRET = new TextEncoder().encode(serverEnv.jwtSecret);

// JWTのペイロード型定義
export interface JWTPayload {
  sub: string;
  role?: "admin" | "member";
  familyId?: string;
  iat?: number;
  exp?: number;
}

/**
 * JWTトークンを検証してペイロードを取得
 */
export async function verifyToken(token: string): Promise<JWTPayload> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET, {
      algorithms: ["HS256"],
    });

  console.log("Token payload:", payload); // デバッグ用ログ

    // joseのJWTPayloadから独自のJWTPayloadに変換
    return {
      sub: payload.sub as string,
      role: payload.role as "admin" | "member" | undefined,
      familyId: payload.family_id as string | undefined,
      iat: payload.iat,
      exp: payload.exp,
    };
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
}
