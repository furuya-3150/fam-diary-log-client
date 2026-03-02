import { jwtVerify } from "jose";
import { serverEnv } from "./env";

const JWT_SECRET = new TextEncoder().encode(serverEnv.jwtSecret);
export const COOKIE_AUTH_TOKEN = "access_token";
export const COOKIE_REFRESH_TOKEN = "refresh_token";

// JWTのペイロード型定義
export interface JWTPayload {
  sub: string;
  role?: "admin" | "member";
  familyId?: string;
  iat?: number;
  exp?: number;
}

/**
 * JWTトークンのペイロードをデコード（署名検証なし・クライアント用）
 */
export function decodeToken(token: string): JWTPayload {
  try {
    const base64Payload = token.split(".")[1];
    const decoded = JSON.parse(atob(base64Payload));

    return {
      sub: decoded.sub as string,
      role: decoded.role as "admin" | "member" | undefined,
      familyId: decoded.family_id as string | undefined,
      iat: decoded.iat,
      exp: decoded.exp,
    };
  } catch {
    throw new Error("Invalid token format");
  }
}

/**
 * JWTトークンを検証してペイロードを取得（署名検証あり・サーバー用）
 */
export async function verifyToken(token: string): Promise<JWTPayload> {
  const { payload } = await jwtVerify(token, JWT_SECRET, {
    algorithms: ["HS256"],
  });

  return {
    sub: payload.sub as string,
    role: payload.role as "admin" | "member" | undefined,
    familyId: payload.family_id as string | undefined,
    iat: payload.iat,
    exp: payload.exp,
  };
}
