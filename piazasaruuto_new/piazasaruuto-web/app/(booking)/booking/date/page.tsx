'use client';

import { useMemo, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

type Slot = { start: string; end: string };

const TIME_ZONE = 'Asia/Tokyo'; // サーバ側(API)でもこのTZでUTCに変換してCalへ渡す想定

function fmtYmd(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${dd}`;
}

/**
 * 指定日の「その日の全範囲」を ISO(+09:00) 文字列で作成
 * API側で new Date(...).toISOString() でUTCへ揃える想定
 */
function toDayRangeIsoJst(ymd: string) {
  const start = `${ymd}T00:00:00.000+09:00`;
  const end = `${ymd}T23:59:59.999+09:00`;
  return { start, end };
}

export default function DatePage() {
  return (
    <Suspense fallback={<div>読み込み中...</div>}>
      <DatePageContent />
    </Suspense>
  );
}

function DatePageContent() {
  const router = useRouter();
  const sp = useSearchParams();

  const menu = sp.get('menu') ?? '';
  const menuName = sp.get('menuName') ?? '';

  const [cursorMonth, setCursorMonth] = useState(() => {
    const d = new Date();
    d.setDate(1);
    return d;
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const days = useMemo(() => {
    const first = new Date(cursorMonth);
    const start = new Date(first);
    start.setDate(1 - first.getDay()); // 日曜始まりのグリッド
    return Array.from({ length: 42 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
  }, [cursorMonth]);

  async function fetchSlots(d: Date) {
    setLoading(true);
    setErr(null);
    try {
      const ymd = fmtYmd(d);
      const { start, end } = toDayRangeIsoJst(ymd);

      // 仕様：/api/cal/slots?start=...&end=...&timeZone=...&format=range
      const url = new URL('/api/cal/slots', window.location.origin);
      url.searchParams.set('start', start);
      url.searchParams.set('end', end);
      url.searchParams.set('timeZone', TIME_ZONE);
      url.searchParams.set('format', 'range');

      if (menu) url.searchParams.set('menu', menu);

      const r = await fetch(url.toString(), { method: 'GET' });
      const body = await r.json().catch(() => ({} as any));
      if (!r.ok) {
        const msg =
          body?.error?.message ||
          body?.error ||
          body?.message ||
          '空き枠の取得に失敗しました';
        throw new Error(msg);
      }

      // data が配列 or { [ymd]: Slot[] } or slots のどれでも拾えるよう冗長に対応
      let list: Slot[] = [];
      if (Array.isArray(body?.data)) {
        list = body.data as Slot[];
      } else if (body?.data && body.data[ymd]) {
        list = body.data[ymd] as Slot[];
      } else if (Array.isArray(body?.slots)) {
        list = body.slots as Slot[];
      }

      setSlots(Array.isArray(list) ? list : []);
    } catch (e: any) {
      setErr(e?.message ?? 'エラーが発生しました');
      setSlots([]);
    } finally {
      setLoading(false);
    }
  }

  const onPickDate = (d: Date) => {
    const today0 = new Date();
    today0.setHours(0, 0, 0, 0);
    const isPast = d < today0;
    const dayOfWeek = d.getDay();
    const closed = dayOfWeek === 0 || dayOfWeek === 4; // 日/木は休み
    if (isPast || closed) return;

    setSelectedDate(d);
    fetchSlots(d);
  };

  const onPickTime = (slot: Slot) => {
    if (!selectedDate) return;
    const ymd = fmtYmd(selectedDate);

    // ★ URLSearchParams が自動エンコードするので encodeURIComponent は不要（ダブルエンコード防止）
    const q = new URLSearchParams({
      menu,
      menuName,
      date: ymd,
      start: slot.start,
      end: slot.end,
    });

    router.push(`/booking/info?${q.toString()}`);
  };

  const label = `${cursorMonth.getFullYear()}年${cursorMonth.getMonth() + 1}月`;

  return (
    <>
      <div className="page-title" style={{ marginBottom: 24 }}>
        <h1>日時を選択</h1>
        <div className="title-divider" />
        {menuName && (
          <p style={{ marginTop: 12, color: '#666' }}>
            選択メニュー：{menuName}
          </p>
        )}
      </div>

      <section className="form-section">
        <div className="calendar-container">
          <div className="calendar-header">
            <button
              className="calendar-nav-btn"
              onClick={() => {
                const d = new Date(cursorMonth);
                d.setMonth(d.getMonth() - 1);
                setCursorMonth(d);
              }}
              aria-label="前の月へ"
            >
              ‹
            </button>
            <h3 id="currentMonthYear">{label}</h3>
            <button
              className="calendar-nav-btn"
              onClick={() => {
                const d = new Date(cursorMonth);
                d.setMonth(d.getMonth() + 1);
                setCursorMonth(d);
              }}
              aria-label="次の月へ"
            >
              ›
            </button>
          </div>

          <div className="calendar-weekdays">
            {['日', '月', '火', '水', '木', '金', '土'].map((w) => (
              <div key={w} className="weekday">
                {w}
              </div>
            ))}
          </div>

          <div className="calendar-grid" id="calendarGrid">
            {days.map((d, i) => {
              const inMonth = d.getMonth() === cursorMonth.getMonth();
              const today0 = new Date();
              today0.setHours(0, 0, 0, 0);
              const isPast = d < today0;
              const dayOfWeek = d.getDay();
              const closed = dayOfWeek === 0 || dayOfWeek === 4;
              const selected =
                selectedDate &&
                d.toDateString() === selectedDate.toDateString();

              const cls = [
                'calendar-day',
                inMonth ? '' : 'other-month',
                isPast ? 'unavailable' : '',
                closed ? 'unavailable' : '',
                selected ? 'selected' : '',
              ]
                .filter(Boolean)
                .join(' ');

              return (
                <div
                  key={i}
                  className={cls}
                  onClick={() => onPickDate(d)}
                  role="button"
                  aria-label={`${fmtYmd(d)} を選択`}
                >
                  {d.getDate()}
                </div>
              );
            })}
          </div>

          <div
            className="time-slots"
            id="timeSlots"
            style={{ display: selectedDate ? 'block' : 'none' }}
          >
            <h4>利用可能な時間</h4>
            {loading && (
              <p style={{ textAlign: 'center', padding: 16 }}>読み込み中…</p>
            )}
            {err && (
              <p
                style={{ textAlign: 'center', padding: 16, color: '#ef4444' }}
              >
                {err}
              </p>
            )}
            {!loading && !err && (
              <div className="time-grid" id="timeGrid">
                {slots.length === 0 && (
                  <div style={{ textAlign: 'center', color: '#666', padding: 16 }}>
                    この日は空きがありません
                  </div>
                )}
                {slots.map((s) => {
                  const t = new Date(s.start);
                  const hh = String(t.getHours()).padStart(2, '0');
                  const mm = String(t.getMinutes()).padStart(2, '0');
                  const label = `${hh}:${mm}`;
                  return (
                    <button
                      key={`${s.start}-${s.end}`}
                      className="time-slot"
                      onClick={() => onPickTime(s)}
                      aria-label={`${label} を選択`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="form-navigation">
          <button
            className="btn btn-secondary nav-btn"
            onClick={() => router.back()}
          >
            戻る
          </button>
          <button className="btn btn-primary nav-btn" disabled>
            次へ
          </button>
        </div>
      </section>
    </>
  );
}
