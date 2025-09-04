'use client';

import './booking.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const steps = [
  { href: '/booking/menu', label: 'メニュー選択' },
  { href: '/booking/date', label: '日時選択' },
  { href: '/booking/info', label: 'お客様情報' },
  { href: '/booking/confirm', label: '確認' },
  { href: '/booking/complete', label: '完了' },
];

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const activeIndex = Math.max(0, steps.findIndex(s => pathname.startsWith(s.href)));

  return (
    <>
      <header>
        <nav className="nav booking-container">
          <Link href="/" className="brand" aria-label="ホームへ">
            <div className="brand-logo" />
            <div className="brand-name">ぴあざさるうと</div>
          </Link>
          <ul className="nav-links">
            <li><Link href="/">ホーム</Link></li>
            <li><Link href="/booking/menu">予約</Link></li>
          </ul>
        </nav>
      </header>

      <main className="booking-container">
        <div className="progress-steps" style={{ marginBottom: 24 }}>
          {steps.map((s, i) => {
            const cls =
              i < activeIndex ? 'step completed' :
              i === activeIndex ? 'step active' : 'step';
            return (
              <div key={s.href} className={cls}>
                <div className="step-circle">{i + 1}</div>
                <div className="step-label">{s.label}</div>
              </div>
            );
          })}
        </div>

        {children}
      </main>
    </>
  );
}
