// app/api/cal/bookings/[uid]/route.ts
import { NextRequest, NextResponse } from "next/server";
const BASE = process.env.CAL_BASE_URL!;
const KEY = process.env.CAL_API_KEY!;

const respond = (d: unknown, status=200) =>
  new NextResponse(JSON.stringify(d), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });

export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ uid: string }> } // ★ Promise を受ける
) {
  const { uid } = await ctx.params;        // ★ await が必要！
  if (!uid) return respond({ error: "uid missing" }, 400);

  const r = await fetch(`${BASE}/bookings/${encodeURIComponent(uid)}`, {
    headers: {
      Authorization: `Bearer ${KEY}`,
      "cal-api-version": "2024-08-13",
    },
    cache: "no-store",
  });

  const data = await r.json().catch(() => ({}));
  return respond(data, r.status);
}
