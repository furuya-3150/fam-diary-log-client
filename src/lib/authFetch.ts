/**
 * authFetch — 認証トークンの有効期限を考慮した fetch ラッパー
 */

import { getApiUrl } from "./env";

/** リフレッシュを先行実行するバッファ（秒）: 有効期限の何秒前から更新するか */
const REFRESH_BUFFER_SEC = 60;

/** 現在のアクセストークンの有効期限 (Unix 秒、null = 未ログイン) */
let tokenExpiresAt: number | null = null;

/** 進行中のリフレッシュPromise（並列リクエストの重複リフレッシュを防ぐ） */
let refreshingPromise: Promise<void> | null = null;

/**
 * AuthContext から呼び出す。tokenExpiresAt を登録/更新する。
 */
export function setTokenExpiresAt(exp: number | null): void {
  console.log("トークンの有効期限を更新", { exp }, __filename);
  tokenExpiresAt = exp;
}

/**
 * POST /api/auth/refresh を呼んでクッキーを更新し、新しい expiresAt でストアを同期する。
 * 失敗時は tokenExpiresAt を null にする。
 */
async function doRefresh(): Promise<void> {
  try {
    console.log("アクセストークンのリフレッシュを開始", __filename);
    const url = getApiUrl("/auth/refresh");
    const res = await fetch(url, {
      method: "POST",
      credentials: "include",
    });
    if (res.ok) {
      const {data}: { data: {expiresAt: number | null} } = await res.json();
      tokenExpiresAt = data.expiresAt;
      console.log(
        "アクセストークンのリフレッシュに成功",
        { expiresAt: tokenExpiresAt },
        __filename,
      );
    } else {
      console.warn("アクセストークンのリフレッシュに失敗: HTTP", res.status);
      tokenExpiresAt = null;
    }
  } catch (e) {
    console.warn('doRefresh error', e)
    tokenExpiresAt = null;
  }
}

/**
 * 複数の呼び出しが同時に走っても、リフレッシュは 1 回だけ行われる。
 */
async function ensureFreshToken(): Promise<void> {
  console.log("トークンの有効期限を確認", { tokenExpiresAt });
  tokenExpiresAt ??= 0; // null を 0 に置き換える（未ログインは常に期限切れとみなす）

  const nowSec = Date.now() / 1000;
  console.log(
    "現在の時刻 (秒)",
    nowSec,
    "リフレッシュまでの残り秒数",
    tokenExpiresAt - nowSec,
  );
  if (nowSec < tokenExpiresAt - REFRESH_BUFFER_SEC) return; // まだ有効
  console.log("トークンの有効期限が近いか切れているため、リフレッシュが必要");

  refreshingPromise ??= doRefresh().finally(() => {
    console.log("リフレッシュ処理が完了");
    refreshingPromise = null;
  });
  await refreshingPromise;
}

/**
 * fetch のドロップイン代替。呼び出し前にトークンの有効期限を確認し、
 * 必要に応じて自動リフレッシュを行う。
 *
 * @example
 * const response = await authFetch(getApiUrl("/families/me/diaries"), {
 *   credentials: "include",
 * });
 */
export async function authFetch(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response> {
  await ensureFreshToken();
  return fetch(input, init);
}
