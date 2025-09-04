'use client';

import { useRouter } from 'next/navigation';

const MENUS = [
  { key: 'cut', name: 'カット', price: '¥3,500', duration: '約60分' },
  { key: 'cut-color', name: 'カット + カラー', price: '¥8,500', duration: '約90分' },
  { key: 'cut-perm', name: 'カット + パーマ', price: '¥10,500', duration: '約150分' },
  { key: 'treatment', name: 'トリートメント', price: '¥3,500', duration: '約45分' },
];

export default function MenuPage() {
  const router = useRouter();

  const onPick = (m: typeof MENUS[number]) => {
    const q = new URLSearchParams({ menu: m.key, menuName: m.name });
    router.push(`/booking/date?${q.toString()}`);
  };

  return (
    <section className="form-section">
      <h2 className="section-title">メニューを選択してください</h2>

      <div className="menu-grid">
        {MENUS.map(m => (
          <button
            key={m.key}
            className="menu-item"
            onClick={() => onPick(m)}
            aria-label={`${m.name} を選択`}
          >
            <div className="menu-name">{m.name}</div>
            <div className="menu-price">{m.price}</div>
            <div className="menu-duration">{m.duration}</div>
          </button>
        ))}
      </div>

      <div className="form-navigation">
        <div />
        <button className="btn btn-primary nav-btn" onClick={() => { /* 無選択時は無効 */ }}>
          次へ
        </button>
      </div>
    </section>
  );
}
