// app/api/cal/bookings/cancel/route.ts
import { NextRequest, NextResponse } from "next/server";

const BASE = process.env.CAL_BASE_URL!;
const KEY = process.env.CAL_API_KEY!;

function respond(data: unknown, status = 200) {
  return new NextResponse(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    if (!BASE || !KEY) return respond({ error: "env missing" }, 500);

    // 受け付けるボディ：
    // { uid: string; reason?: string; cancelSubsequent?: boolean; seatUid?: string }
    const { uid, reason, cancelSubsequent, seatUid } = await req.json();

    if (!uid || typeof uid !== "string") {
      return respond({ error: "uid is required (booking uid)" }, 400);
    }

    const body: Record<string, any> = {};
    if (typeof reason === "string" && reason.trim()) {
      body.cancellationReason = reason.trim();
    }
    if (typeof cancelSubsequent === "boolean") {
      body.cancelSubsequentBookings = cancelSubsequent;
    }
    // 座席制イベントで参加者だけを取り消す場合（任意）
    if (typeof seatUid === "string" && seatUid.trim()) {
      body.seatUid = seatUid.trim();
    }

    const r = await fetch(`${BASE}/bookings/${encodeURIComponent(uid)}/cancel`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${KEY}`,
        "Content-Type": "application/json",
        "cal-api-version": "2024-08-13",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const data = await r.json().catch(() => ({}));
    return respond(data, r.status);
  } catch (e: any) {
    return respond({ error: e?.message ?? "unknown error" }, 500);
  }
}
