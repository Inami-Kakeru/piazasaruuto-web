'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';

const TIME_ZONE = 'Asia/Tokyo';

function formatJp(iso?: string) {
  if (!iso) return '-';
  const d = new Date(iso);
  return new Intl.DateTimeFormat('ja-JP', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: TIME_ZONE,
  }).format(d);
}

function pickErrorMessage(x: any): string {
  if (!x) return '不明なエラー';
  if (typeof x === 'string') return x;
  return (
    x.error?.message ||
    x.error ||
    x.details?.message ||
    x.message ||
    JSON.stringify(x)
  );
}

async function fetchJson(input: RequestInfo, init?: RequestInit) {
  const res = await fetch(input, init);
  const text = await res.text();
  let data: any;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { raw: text };
  }
  return { res, data };
}

export default function ConfirmPage() {
  const sp = useSearchParams();
  const router = useRouter();

  const menu      = sp.get('menu') ?? '';
  const menuName  = sp.get('menuName') ?? '';
  const startISO  = sp.get('start') ?? '';
  const endISO    = sp.get('end') ?? '';
  const name      = sp.get('name') ?? '';
  const phone     = sp.get('phone') ?? '';
  const email     = sp.get('email') ?? '';

  const whenLabel = useMemo(() => formatJp(startISO), [startISO]);

  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const handleConfirm = async () => {
    setSubmitting(true);
    setErr(null);

    try {
      if (!menu || !startISO || !name || !email) {
        throw new Error('必須項目が不足しています（menu / start / name / email）。');
      }

      // ★ サーバが「仮押さえ→本予約」を内製するので 1 回だけ POST（reservationUid は送らない）
      const { res, data } = await fetchJson('/api/cal/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8', Accept: 'application/json' },
        body: JSON.stringify({
          menu,
          start: startISO,
          end: endISO || undefined,
          timeZone: TIME_ZONE,
          name,
          email,
          phone: phone || undefined,
        }),
      });

      if (!res.ok) {
        throw new Error(pickErrorMessage(data) || '予約の作成に失敗しました。');
      }

      // 返却は {status:'success', data:{uid,...}} or {bookingId,...} 想定
      const bookingUid: string =
        data?.data?.uid || data?.uid || data?.bookingId || '';

      if (!bookingUid) throw new Error('予約IDの取得に失敗しました。');

      const q = new URLSearchParams({
        uid: bookingUid,
        menu,
        menuName,
        start: startISO,
        end: endISO || '',
        name,
        phone,
        email,
      });
      router.replace(`/booking/complete?${q.toString()}`);
    } catch (e: any) {
      setErr(e?.message ?? 'エラーが発生しました。もう一度お試しください。');
      console.error('[confirm.error]', e);
    } finally {
      setSubmitting(false);
    }
  };

  const handleRetry = () => {
    const q = new URLSearchParams({ menu, menuName });
    router.push(`/booking/date?${q.toString()}`);
  };

  return (
    <>
      <div className="page-title">
        <h1>予約内容の確認</h1>
        <div className="title-divider" />
      </div>

      <section className="form-section">
        <div className="confirmation-item">
          <span className="confirmation-label">メニュー</span>
          <span className="confirmation-value">{menuName || '-'}</span>
        </div>
        <div className="confirmation-item">
          <span className="confirmation-label">日時</span>
          <span className="confirmation-value">{whenLabel}</span>
        </div>
        <div className="confirmation-item">
          <span className="confirmation-label">お名前</span>
          <span className="confirmation-value">{name || '-'}</span>
        </div>
        <div className="confirmation-item">
          <span className="confirmation-label">電話番号</span>
          <span className="confirmation-value">{phone || '-'}</span>
        </div>
        <div className="confirmation-item">
          <span className="confirmation-label">メール</span>
          <span className="confirmation-value">{email || '-'}</span>
        </div>

        {err && (
          <div
            style={{
              color: '#ef4444',
              marginTop: 16,
              padding: 16,
              backgroundColor: '#fef2f2',
              borderRadius: 8,
              wordBreak: 'break-all',
              whiteSpace: 'pre-wrap',
            }}
            role="alert"
          >
            {err}
            <div style={{ marginTop: 12 }}>
              <button className="btn btn-secondary" onClick={handleRetry}>
                日時を選び直す
              </button>
            </div>
          </div>
        )}

        <div className="form-navigation">
          <button className="btn btn-secondary nav-btn" onClick={() => router.back()} disabled={submitting}>
            戻る
          </button>
          <button className="btn btn-success nav-btn" onClick={handleConfirm} disabled={submitting}>
            {submitting ? '送信中…' : '予約を確定する'}
          </button>
        </div>
      </section>
    </>
  );
}
