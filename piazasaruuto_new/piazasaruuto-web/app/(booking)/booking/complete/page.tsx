'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

export default function CompletePage() {
  const sp = useSearchParams();

  const p = useMemo(() => {
    const qs = new URLSearchParams(sp.toString());
    const get = (k: string) => qs.get(k) ?? '';
    return {
      uid: get('uid'),
      menu: get('menu'),
      menuName: get('menuName'),
      start: get('start'),
      name: get('name'),
      email: get('email'),
      phone: get('phone') || '',
    };
  }, [sp]);

  const startDisp = p.start
    ? new Date(p.start).toLocaleString('ja-JP', {
        timeZone: 'Asia/Tokyo',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '-';

  return (
    <main className="container">
      <h1 className="page-title">予約完了</h1>
      <section className="card">
        <p>ご予約ありがとうございました。</p>
        <dl className="deflist" style={{ marginTop: 12 }}>
          <div className="row">
            <dt>お名前</dt>
            <dd>{p.name || '-'}</dd>
          </div>
          <div className="row">
            <dt>日時</dt>
            <dd>{startDisp}</dd>
          </div>
          <div className="row">
            <dt>予約ID</dt>
            <dd>{p.uid || '—'}</dd>
          </div>
          <div className="row">
            <dt>メール</dt>
            <dd>{p.email || '—'}</dd>
          </div>
          {p.phone && (
            <div className="row">
              <dt>電話番号</dt>
              <dd>{p.phone}</dd>
            </div>
          )}
        </dl>

        <div className="actions" style={{ marginTop: 16 }}>
          <a className="btn btn-primary" href="/">トップに戻る</a>
        </div>
      </section>
    </main>
  );
}
