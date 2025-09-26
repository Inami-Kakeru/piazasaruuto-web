import { SITE } from "../../../lib/marketing/constants";
import { ArrowUpRight, Calendar, Phone } from "lucide-react";

export const metadata = {
  title: "Web予約 | ぴあざさるーと",
  description: "オンライン予約は現在準備中です。お電話またはHot Pepper Beautyよりお問い合わせください。",
};

export default function BookingComingSoon() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-neutral-50 px-6 py-24">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-1 text-sm font-medium text-neutral-600">
          <Calendar className="h-4 w-4" aria-hidden />
          Web予約 Coming Soon
        </span>
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
          オンライン予約はただいま準備中です
        </h1>
        <p className="text-base leading-relaxed text-neutral-600">
          サイト公開版では、お電話またはHot Pepper Beauty経由でご予約を承ります。準備が整い次第、こちらのページでオンライン予約を再開いたします。
        </p>
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
          <a
            href={`tel:${SITE.tel}`}
            className="mk-btn mk-btn-secondary inline-flex items-center justify-center gap-2"
          >
            <Phone className="mk-icon" aria-hidden />
            <span>{SITE.tel}</span>
          </a>
          <a
            href={SITE.hotpepperUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mk-btn mk-btn-primary inline-flex items-center justify-center gap-2"
          >
            <ArrowUpRight className="mk-icon" aria-hidden />
            <span>Hot Pepper Beauty</span>
          </a>
        </div>
        <p className="text-sm text-neutral-500">受付時間: {SITE.hours_note}</p>
      </div>
    </main>
  );
}
