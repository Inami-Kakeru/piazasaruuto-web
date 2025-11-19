'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState, Suspense } from 'react';

function formatJp(iso?: string) {
  if (!iso) return '-';
  const d = new Date(iso);
  const ds = new Intl.DateTimeFormat('ja-JP', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'Asia/Tokyo',
  }).format(d);
  return ds;
}

export default function InfoPage() {
  return (
    <Suspense fallback={<div>読み込み中...</div>}>
      <InfoPageContent />
    </Suspense>
  );
}

function InfoPageContent() {
  const sp = useSearchParams();
  const router = useRouter();

  // 直前ステップから受け取る
  const menu = sp.get('menu') ?? '';
  const menuName = sp.get('menuName') ?? '';
  const date = sp.get('date') ?? '';          // YYYY-MM-DD
  const startISO = sp.get('start') ?? '';     // ISO（例: 2025-09-01T10:20:00.000+09:00）
  const endISO = sp.get('end') ?? '';         // ISO（例: 2025-09-01T10:40:00.000+09:00）

  // 入力状態
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  // 仕様書に従い、name, email が必須（phone は任意に変更可能）
  const canNext = name.trim() !== '' && email.trim() !== '';

  const whenLabel = useMemo(() => formatJp(startISO), [startISO]);

  const goNext = () => {
    if (!canNext) return;
    // 簡便のため URL に積む（本番は sessionStorage か POST 遷移が推奨）
    const q = new URLSearchParams({
      menu, menuName, date, start: startISO, end: endISO,
      name, phone, email,
    });
    router.push(`/booking/confirm?${q.toString()}`);
  };

  return (
    <>
      <div className="page-title">
        <h1>お客様情報</h1>
        <div className="title-divider" />
      </div>

      {/* 選択内容の確認 */}
      <section className="selected-datetime">
        <h3>選択中の内容</h3>
        <div className="datetime-info" style={{ marginTop: 12 }}>
          <div className="datetime-item">
            <span className="label">メニュー</span>
            <span className="value">{menuName || '-'}</span>
          </div>
          <div className="datetime-item">
            <span className="label">予約日時</span>
            <span className="value">{whenLabel}</span>
          </div>
        </div>
      </section>

      <section className="form-section">
        <h2 className="section-title">必須項目をご入力ください</h2>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">お名前 *</label>
            <input
              id="name" type="text" value={name}
              onChange={e => setName(e.target.value)}
              placeholder="例）山田 太郎"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">メールアドレス *</label>
            <input
              id="email" type="email" value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="例）you@example.com"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group full-width">
            <label htmlFor="phone">電話番号（任意）</label>
            <input
              id="phone" type="tel" value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="例）090-1234-5678"
            />
          </div>
        </div>

        <div className="form-navigation">
          <button className="btn btn-secondary nav-btn" onClick={() => router.back()}>
            戻る
          </button>
          <button className="btn btn-primary nav-btn" onClick={goNext} disabled={!canNext}>
            次へ
          </button>
        </div>
      </section>
    </>
  );
}
