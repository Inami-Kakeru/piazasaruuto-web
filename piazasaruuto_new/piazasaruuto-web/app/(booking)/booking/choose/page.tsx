'use client';

import '../booking.css';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { SITE } from '@/lib/marketing/constants';

export default function ChoosePage() {
  const router = useRouter();

  const goWeb = () => {
    router.push('/booking/choose/web');
  };

  return (
    <section className="form-section" aria-labelledby="choose-title">
      <h2 id="choose-title" className="section-title">ご予約方法をお選びください</h2>

      <div className="menu-grid" style={{ marginBottom: 24 }}>
        <Link href={`tel:${SITE.tel}`} className="btn btn-secondary" aria-label="電話で予約する">
          電話で予約する（{SITE.tel}）
        </Link>
        <button className="btn btn-primary" onClick={goWeb} aria-label="Webで予約する">
          Webで予約する
        </button>
      </div>

      <p style={{ color: 'var(--gray)', textAlign: 'center' }}>
        Web予約を選ぶと、増毛エクステの有無を選択できます。
      </p>
    </section>
  );
}


