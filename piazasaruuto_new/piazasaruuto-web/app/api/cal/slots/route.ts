// app/api/cal/slots/route.ts
import { NextRequest, NextResponse } from "next/server";

/**
 * Cal.com v2 Slots API wrapper (with graceful fallbacks)
 * - Primary:   GET /v2/slots?eventTypeId=&start=&end=&timeZone=
 * - Fallbacks: GET /v2/event-types/:id/slots?start=&end=&timeZone=&format=range
 *              GET /v1/slots?eventTypeId=&startTime=&endTime=&timeZone=
 *
 * Notes
 * - Some Cal.com tenants return slots in { data: { "YYYY-MM-DD": [{ start }] } }.
 *   We normalize to [{ start, end }] by deriving `end` from service length.
 * - Service length is resolved via CAL_LENGTH_MAP (JSON) or sane defaults per menu,
 *   otherwise fallback to 20 minutes.
 */

export const runtime = "nodejs";

// ------------ Config / helpers ------------
const BASE_DEFAULT = "https://api.cal.com";
const API_V = {
  v1: "v1",
  v2: "v2",
} as const;

function json(status: number, body: any) {
  return new NextResponse(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

// "YYYY-MM-DD" → JST(+09:00) の日区間
function dayRangeIso(ymd: string, tz: string) {
  const offset = tz === "Asia/Tokyo" ? "+09:00" : "+00:00";
  return {
    start: `${ymd}T00:00:00.000${offset}`,
    end: `${ymd}T23:59:59.999${offset}`,
  };
}

// menu → eventTypeId
function resolveEventTypeId(menu: string | null, env: NodeJS.ProcessEnv): number {
  // 1) JSON マップ優先: CAL_MENU_MAP='{"cut":3120867,"cut-color":3120869,...}'
  try {
    if (env.CAL_MENU_MAP) {
      const map = JSON.parse(env.CAL_MENU_MAP) as Record<string, number | string>;
      const v = menu ? Number(map[menu]) : NaN;
      if (Number.isFinite(v) && v > 0) return v;
    }
  } catch {
    /* ignore */
  }
  // 2) レガシー個別ENV
  const legacy = {
    "cut": Number(env.CAL_EVT_CUT || 0),
    "cut-color": Number(env.CAL_EVT_CUT_COLOR || 0),
    "cut-perm": Number(env.CAL_EVT_CUT_PERM || 0),
    "treatment": Number(env.CAL_EVT_TREATMENT || 0),
  } as const;
  if (menu && legacy[menu as keyof typeof legacy]) {
    return legacy[menu as keyof typeof legacy];
  }
  // 3) 既定
  const def = Number(env.CAL_EVENT_TYPE_ID || 0);
  return def || 0;
}

// menu → length(min)
function resolveLengthMinutes(menu: string | null, env: NodeJS.ProcessEnv): number {
  // 1) JSON マップ優先: CAL_LENGTH_MAP='{"cut":60,"cut-color":90,...}'
  try {
    if (env.CAL_LENGTH_MAP) {
      const map = JSON.parse(env.CAL_LENGTH_MAP) as Record<string, number | string>;
      const v = menu ? Number(map[menu]) : NaN;
      if (Number.isFinite(v) && v > 0) return v;
    }
  } catch {
    /* ignore */
  }
  // 2) 簡易デフォルト
  const defaults: Record<string, number> = {
    "cut": 60,
    "cut-color": 90,
    "cut-perm": 150,
    "treatment": 45,
  };
  if (menu && defaults[menu]) return defaults[menu];
  // 3) フォールバック
  return Number(env.CAL_LENGTH_DEFAULT_MIN || 20);
}

// オフセット(+09:00 等)を保ったまま minutes 加算
function addMinutesKeepOffset(iso: string, minutes: number) {
  const offsetMatch = iso.match(/([+-]\d{2}:\d{2}|Z)$/);
  const offset = offsetMatch ? offsetMatch[1] : "Z";
  const base = new Date(iso);
  const t = new Date(base.getTime() + minutes * 60_000);

  const pad2 = (n: number) => String(n).padStart(2, "0");
  const pad3 = (n: number) => String(n).padStart(3, "0");
  const yyyy = t.getFullYear();
  const mm = pad2(t.getMonth() + 1);
  const dd = pad2(t.getDate());
  const HH = pad2(t.getHours());
  const MM = pad2(t.getMinutes());
  const SS = pad2(t.getSeconds());
  const MS = pad3(t.getMilliseconds());
  return `${yyyy}-${mm}-${dd}T${HH}:${MM}:${SS}.${MS}${offset}`;
}

// ------------ Fetchers ------------
async function tryFetch(url: string, headers: Record<string, string>) {
  const r = await fetch(url, { method: "GET", headers, cache: "no-store" });
  let data: any = null;
  try {
    data = await r.json();
  } catch {
    /* ignore */
  }
  return { ok: r.ok, status: r.status, data };
}

function buildHeaders(env: NodeJS.ProcessEnv) {
  const KEY = env.CAL_API_KEY || "";
  const headers: Record<string, string> = {
    Accept: "application/json",
    // スロットの v2 デフォ API バージョン（存在しない場合でも無害）
    "cal-api-version": env.CAL_API_VERSION || "2024-09-04",
  };
  if (KEY) headers.Authorization = `Bearer ${KEY}`;
  return headers;
}

// ------------ Normalizer ------------
type SlotOut = { start: string; end: string };

function normalizeSlots(raw: any, ymdHint: string | null, lengthMin: number): {
  slots: SlotOut[];
  dateMap: Record<string, SlotOut[]>;
} {
  const dateMap: Record<string, SlotOut[]> = {};
  const pushArr = (ymd: string, arr: any[]) => {
    const list = (arr || []).map((s: any) => ({
      start: String(s?.start),
      end: s?.end ? String(s.end) : addMinutesKeepOffset(String(s?.start), lengthMin),
    })).filter((s) => s.start && s.end);
    dateMap[ymd] = list;
  };

  // ケースA: { status, data: [{start, [end]}] }
  if (Array.isArray(raw?.data)) {
    const ymd = ymdHint || (raw?.data[0]?.start ? String(raw.data[0].start).slice(0, 10) : "");
    if (ymd) pushArr(ymd, raw.data);
  }
  // ケースB: { status, data: { "YYYY-MM-DD": [{start}] } }
  else if (raw?.data && typeof raw.data === "object") {
    for (const [k, v] of Object.entries(raw.data)) {
      if (Array.isArray(v)) pushArr(k, v);
    }
  }
  // ケースC: 素の配列
  else if (Array.isArray(raw)) {
    const ymd = ymdHint || (raw[0]?.start ? String(raw[0].start).slice(0, 10) : "");
    if (ymd) pushArr(ymd, raw);
  }

  // フラット配列
  const slots: SlotOut[] = Object.values(dateMap).flat();
  return { slots, dateMap };
}

// ------------ Handler ------------
export async function GET(req: NextRequest) {
  try {
    const env = process.env;
    const BASE = (env.CAL_BASE_URL || BASE_DEFAULT).replace(/\/+$/, "");
    const TZ_DEFAULT = env.CAL_DEFAULT_TZ || "Asia/Tokyo";

    const sp = req.nextUrl.searchParams;
    const menu = sp.get("menu");
    const eventTypeId = resolveEventTypeId(menu, env);

    if (!eventTypeId) {
      return json(400, {
        routeId: "slots/list",
        error: "eventTypeId is not configured. Set CAL_MENU_MAP or CAL_EVENT_TYPE_ID.",
        details: { menu },
      });
    }

    const timeZone = sp.get("timeZone") || TZ_DEFAULT;
    const date = sp.get("date") || "";
    const qStart = sp.get("start");
    const qEnd = sp.get("end");

    const { start, end } =
      date && (!qStart || !qEnd)
        ? dayRangeIso(date, timeZone)
        : { start: qStart || "", end: qEnd || "" };

    if (!start || !end) {
      return json(400, {
        routeId: "slots/list",
        error: "start and end are required (or provide date).",
        details: { received: { date, start: qStart, end: qEnd, timeZone } },
      });
    }

    const headers = buildHeaders(env);
    const tried: { url: string; status: number }[] = [];

    // 1) v2 /slots?eventTypeId=&start=&end=&timeZone=
    const urlV2 = new URL(`${BASE}/${API_V.v2}/slots`);
    urlV2.searchParams.set("eventTypeId", String(eventTypeId));
    urlV2.searchParams.set("start", start);
    urlV2.searchParams.set("end", end);
    urlV2.searchParams.set("timeZone", timeZone);

    let { ok, status, data } = await tryFetch(urlV2.toString(), headers);
    tried.push({ url: urlV2.toString(), status });

    // 2) Fallback: v2 /event-types/:id/slots?start=&end=&timeZone=&format=range
    if (!ok && status === 404) {
      const urlV2b = new URL(`${BASE}/${API_V.v2}/event-types/${eventTypeId}/slots`);
      urlV2b.searchParams.set("start", start);
      urlV2b.searchParams.set("end", end);
      urlV2b.searchParams.set("timeZone", timeZone);
      urlV2b.searchParams.set("format", "range");
      const r2 = await tryFetch(urlV2b.toString(), headers);
      ok = r2.ok; status = r2.status; data = r2.data;
      tried.push({ url: urlV2b.toString(), status });
    }

    // 3) Fallback: v1 /slots?eventTypeId=&startTime=&endTime=&timeZone=
    if (!ok && (status === 404 || status === 401)) {
      const urlV1 = new URL(`${BASE}/${API_V.v1}/slots`);
      urlV1.searchParams.set("eventTypeId", String(eventTypeId));
      urlV1.searchParams.set("startTime", start);
      urlV1.searchParams.set("endTime", end);
      urlV1.searchParams.set("timeZone", timeZone);
      const r3 = await tryFetch(urlV1.toString(), headers);
      ok = r3.ok; status = r3.status; data = r3.data;
      tried.push({ url: urlV1.toString(), status });
    }

    if (!ok) {
      return json(status || 500, {
        routeId: "slots/list",
        error: data?.error || data || { message: "slots fetch failed" },
        details: { eventTypeId, sent: { start, end, timeZone }, triedEndpoints: tried },
      });
    }

    // 正規化（start-only → endを付与）
    const lengthMin = resolveLengthMinutes(menu, env);
    const { slots, dateMap } = normalizeSlots(data, date || start.slice(0, 10), lengthMin);

    return json(200, {
      status: "success",
      eventTypeId,
      timeZone,
      range: { start, end },
      slots,
      data: dateMap,
      raw: data, // デバッグ用
    });
  } catch (e: any) {
    return json(500, {
      routeId: "slots/list",
      error: e?.message || "unexpected error",
    });
  }
}
