import { jwtVerify, SignJWT } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key-change-this-in-production",
);

// JWTのペイロード型定義
export interface JWTPayload {
  userId: string;
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

    // joseのJWTPayloadから独自のJWTPayloadに変換
    return {
      userId: payload.userId as string,
      role: payload.role as "admin" | "member" | undefined,
      familyId: payload.familyId as string | undefined,
      iat: payload.iat,
      exp: payload.exp,
    };
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
}
