// app/api/cal/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
// import crypto from "node:crypto"; // 署名検証を実装する場合に使用

const WEBHOOK_SECRET = process.env.CAL_WEBHOOK_SECRET || "";

function respond(data: unknown, status = 200) {
  return new NextResponse(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const raw = await req.text(); // 署名検証する場合は“生ボディ”が必要
    const payload = JSON.parse(raw);

    // （任意）署名検証の雛形：実際のヘッダ名・アルゴリズムはCalの仕様に合わせて実装
    // const sig = req.headers.get("cal-signature") || "";
    // if (WEBHOOK_SECRET) {
    //   const h = crypto.createHmac("sha256", WEBHOOK_SECRET).update(raw).digest("hex");
    //   if (sig !== h) return respond({ error: "invalid signature" }, 401);
    // }

    // 開発中はログで中身を確認
    console.log("Cal.com webhook event:", {
      event: payload?.event,
      dataKeys: payload?.data ? Object.keys(payload.data) : [],
    });

    // TODO: payload.event に応じてDB更新・通知等の処理
    return respond({ ok: true });
  } catch (e: any) {
    return respond({ error: e?.message ?? "invalid json" }, 400);
  }
}
