'use client';

import '../../booking.css';
import { useRouter } from 'next/navigation';

export default function WebChoosePage() {
  const router = useRouter();

  const goToExtensionType = () => {
    router.push('/booking/choose/web/extension');
  };

  const goToNoExtension = () => {
    router.push('/booking/choose/web/no-extension/hotpepper');
  };

  return (
    <section className="form-section" aria-labelledby="web-title">
      <h2 id="web-title" className="section-title">増毛エクステの有無をお選びください</h2>

      <div className="menu-grid">
        <button className="menu-item" onClick={goToExtensionType} aria-label="増毛エクステありを選択">
          <div className="menu-name">増毛エクステあり</div>
          <div className="menu-duration">次へ：予約内容の選択</div>
        </button>

        <button className="menu-item" onClick={goToNoExtension} aria-label="増毛エクステなしを選択">
          <div className="menu-name">増毛エクステなし</div>
          <div className="menu-duration">次へ：ホットペッパーで予約</div>
        </button>
      </div>
    </section>
  );
}
