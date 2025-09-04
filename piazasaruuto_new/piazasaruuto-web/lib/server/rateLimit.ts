// 超簡易レートリミット（プロセス内メモリ）
// 注意: サーバレスやマルチインスタンスでは本番利用非推奨。Redis 等に置き換え想定。

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

const WINDOW_MS = 10_000; // 10秒
const LIMIT = 5;          // 10秒で5回まで

export function rateLimit(key: string): boolean {
  const now = Date.now();
  const b = buckets.get(key);
  if (!b || b.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (b.count >= LIMIT) return false;
  b.count += 1;
  return true;
}
