// app/api/cal/bookings/route.ts
import { NextRequest, NextResponse } from "next/server";
export const runtime = "nodejs";

const BASE_DEFAULT = "https://api.cal.com/v2";

const json = (status: number, body: any) =>
  new NextResponse(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });

// /v2 を必ず付ける
function ensureV2(base: string | undefined) {
  const b = (base || BASE_DEFAULT).replace(/\/+$/, "");
  return b.endsWith("/v2") ? b : b + "/v2";
}

// menu → eventTypeId 解決（/api/cal/slots と同ロジック）
function resolveEventTypeId(menu: string | null, env: NodeJS.ProcessEnv) {
  if (env.CAL_MENU_MAP) {
    try {
      const map = JSON.parse(env.CAL_MENU_MAP) as Record<string, number | string>;
      const v = menu ? Number(map[menu]) : NaN;
      if (Number.isFinite(v) && v > 0) return v;
    } catch { /* ignore */ }
  }
  const legacy = {
    "cut":        Number(env.CAL_EVT_CUT || 0),
    "cut-color":  Number(env.CAL_EVT_CUT_COLOR || 0),
    "cut-perm":   Number(env.CAL_EVT_CUT_PERM || 0),
    "treatment":  Number(env.CAL_EVT_TREATMENT || 0),
  } as const;
  if (menu && legacy[menu as keyof typeof legacy]) return legacy[menu as keyof typeof legacy];
  const def = Number(env.CAL_EVENT_TYPE_ID || 0);
  return def || 0;
}

export async function GET() {
  // 生存確認
  return json(200, { ok: true, where: "/api/cal/bookings" });
}

export async function POST(req: NextRequest) {
  try {
    const env  = process.env;
    const BASE = ensureV2(env.CAL_BASE_URL);
    const KEY  = env.CAL_API_KEY || "";
    const TZ   = env.CAL_DEFAULT_TZ || "Asia/Tokyo";

    if (!KEY) {
      return json(500, {
        routeId: "bookings/create",
        error: "CAL_API_KEY is missing on server runtime",
      });
    }

    const inBody = await req.json().catch(() => ({} as any));
    const menu  = (inBody.menu ?? null) as string | null;
    const name  = String(inBody.name || "");
    const email = String(inBody.email || "");
    const phone = inBody.phone ? String(inBody.phone) : undefined;
    const reservationUid = inBody.reservationUid ? String(inBody.reservationUid) : undefined;

    const eventTypeId = resolveEventTypeId(menu, env);
    if (!eventTypeId) {
      return json(400, {
        routeId: "bookings/create",
        error: "eventTypeId is not configured (set CAL_MENU_MAP or CAL_EVENT_TYPE_ID)",
        details: { menu },
      });
    }
    if (!name || !email || !inBody.start) {
      return json(400, {
        routeId: "bookings/create",
        error: "name, email, start are required",
        details: { received: { name, email, start: inBody.start } },
      });
    }

    // +09:00 → UTC(Z)
    const startUtc = new Date(String(inBody.start)).toISOString();

    const calBody: any = {
      start: startUtc,
      eventTypeId,
      attendee: {
        name,
        email,
        timeZone: TZ,
        language: "ja",
        ...(phone ? { phoneNumber: phone } : {}),
      },
      metadata: { menu: menu ?? undefined, phone: phone ?? undefined },
      ...(reservationUid ? { reservationUid } : {}),
    };

    const r = await fetch(`${BASE}/bookings`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "cal-api-version": "2024-08-13",
        Authorization: `Bearer ${KEY}`,
      },
      body: JSON.stringify(calBody),
      cache: "no-store",
    });

    const data = await r.json().catch(() => ({}));
    if (!r.ok) {
      return json(r.status, {
        routeId: "bookings/create",
        error: data?.error || data || "booking create failed",
        details: {
          url: `${BASE}/bookings`,
          sent: { eventTypeId, start: startUtc, timeZone: TZ, hasReservationUid: Boolean(reservationUid) },
          status: r.status,
        },
      });
    }
    return json(201, data);
  } catch (e: any) {
    return json(500, { routeId: "bookings/create", error: e?.message || "unexpected error" });
  }
}
