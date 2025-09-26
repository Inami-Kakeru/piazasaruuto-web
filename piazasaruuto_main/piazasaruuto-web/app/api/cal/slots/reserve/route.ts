// app/api/cal/slots/reserve/route.ts
// 方針：Cal.com v2 には一般公開の「予約枠の事前ホールド」エンドポイントが安定していません（/v2/event-types/:id/slots/reserve は 404）。
//そのため、このreserveは “ソフト仮押さえ（クライアント用nonce発行）” として実装し、本予約（/api/cal/bookings）時に409で競合検知する設計にします。
import { NextRequest, NextResponse } from "next/server";

const TZ_DEFAULT = process.env.CAL_DEFAULT_TZ || "Asia/Tokyo";
const EVT_DEFAULT = Number(process.env.CAL_EVENT_TYPE_ID || 0);

// menu から eventTypeId を解決（/slots と同じロジック）
function resolveEventTypeId(menu?: string | null): number {
  try {
    if (process.env.CAL_MENU_MAP) {
      const map = JSON.parse(process.env.CAL_MENU_MAP) as Record<string, number | string>;
      const found = menu ? Number(map[menu]) : NaN;
      if (Number.isFinite(found) && found > 0) return found;
    }
  } catch {}
  const legacyMap: Record<string, number> = {
    "cut": Number(process.env.CAL_EVT_CUT || 0),
    "cut-color": Number(process.env.CAL_EVT_CUT_COLOR || 0),
    "cut-perm": Number(process.env.CAL_EVT_CUT_PERM || 0),
    "treatment": Number(process.env.CAL_EVT_TREATMENT || 0),
  };
  if (menu && legacyMap[menu]) return legacyMap[menu];
  if (EVT_DEFAULT) return EVT_DEFAULT;
  throw new Error("eventTypeId が解決できません。CAL_MENU_MAP か CAL_EVENT_TYPE_ID を設定してください。");
}

function json(status: number, body: any) {
  return new NextResponse(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({} as any));
    const menu: string | null = typeof body.menu === "string" ? body.menu : null;
    const start: string = typeof body.start === "string" ? body.start : "";
    const end: string = typeof body.end === "string" ? body.end : "";
    const timeZone = typeof body.timeZone === "string" ? body.timeZone : TZ_DEFAULT;

    if (!start || !end) {
      return json(400, {
        routeId: "slots/reserve",
        error: "start,end are required",
        received: { start, end, timeZone, menu },
      });
    }

    // eventTypeId を解決（同一 menu で /bookings に渡すことが大事）
    const eventTypeId = resolveEventTypeId(menu);

    // ここでは Cal.com に実リクは投げず、予約用nonceを発行（Node18+のcrypto.randomUUID想定）
    const uid = (globalThis.crypto?.randomUUID?.() || Math.random().toString(36).slice(2)) as string;

    // 必要であれば、この uid→start/end を KV/DB に TTL で保存する実装に差し替え可能（省略）
    // 本予約時（/api/cal/bookings）で reservationUid をそのまま渡し、Cal 側で競合時は 409 が返る想定。

    return json(200, {
      status: "success",
      data: { reservationUid: uid, eventTypeId, timeZone, start, end },
    });
  } catch (e: any) {
    return json(500, { routeId: "slots/reserve", error: e?.message || "unexpected error" });
  }
}
