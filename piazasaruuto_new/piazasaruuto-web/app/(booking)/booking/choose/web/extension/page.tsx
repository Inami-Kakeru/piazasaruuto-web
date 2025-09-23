'use client';

import '../../../booking.css';
import { useRouter } from 'next/navigation';

export default function WebExtensionPage() {
  const router = useRouter();

  const goOnly = () => router.push('/booking/menu?extension=yes&only=true');
  const goPlus = () => router.push('/booking/menu?extension=yes&only=false');

  return (
    <section className="form-section" aria-labelledby="ext-type-title">
      <h2 id="ext-type-title" className="section-title">増毛エクステの予約内容をお選びください</h2>
      <div className="menu-grid">
        <button className="menu-item" onClick={goOnly} aria-label="増毛エクステのみを予約">
          <div className="menu-name">増毛エクステのみ</div>
          <div className="menu-duration">次へ：メニュー選択に進む</div>
        </button>
        <button className="menu-item" onClick={goPlus} aria-label="増毛エクステ＋他メニューを予約">
          <div className="menu-name">増毛エクステ＋他メニュー</div>
          <div className="menu-duration">次へ：メニュー選択に進む</div>
        </button>
      </div>
    </section>
  );
}
