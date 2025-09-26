// app/api/health/route.ts
import { NextResponse } from "next/server";
export const runtime = "nodejs";
export async function GET() {
  const ok = !!(process.env.CAL_BASE_URL && process.env.CAL_API_KEY && process.env.CAL_EVENT_TYPE_ID);
  return new NextResponse(JSON.stringify({ ok, where: "/api/health" }), {
    status: ok ? 200 : 500,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
