import Link from "next/link";
import type { ReactNode } from "react";
import { SITE } from "../../../lib/marketing/constants";

export default function BookingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-lg font-semibold tracking-tight text-neutral-900">
            {SITE.name}
          </Link>
          <nav className="flex items-center gap-4 text-sm text-neutral-600">
            <Link href="/">ホーム</Link>
            <span className="inline-flex items-center gap-1 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium text-neutral-500">
              Web予約 Coming Soon
            </span>
          </nav>
        </div>
      </header>
      {children}
    </div>
  );
}
