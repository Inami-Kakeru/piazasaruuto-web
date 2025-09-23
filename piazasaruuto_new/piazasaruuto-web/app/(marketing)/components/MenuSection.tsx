"use client";
import { BadgePercent, Scissors, Palette, Waves, Sparkles, Package, Tag, Phone } from "lucide-react";
import { SITE } from "../../../lib/marketing/constants";

type PriceItem = { label: string; price?: string; badge?: "range" | "ask" | "contact" };
type Category = { key: string; title: string; note?: string; icon: JSX.Element; items: PriceItem[]; footerNote?: string };

const yen = (v: number) => `￥${v.toLocaleString()}`;

const DATA: Category[] = [
  {
    key: "cut",
    title: "カット",
    icon: <Scissors aria-hidden className="w-5 h-5" />, 
    items: [
      { label: "一般", price: yen(4840) },
      { label: "高校生", price: yen(4240) },
      { label: "中学生", price: yen(4000) },
      { label: "小学生以下（シャンプー有り）", price: yen(3780) },
      { label: "小学生以下（シャンプー無し）", price: yen(3300) },
      { label: "前髪カット", price: yen(1650) },
    ],
  },
  {
    key: "color",
    title: "カラー",
    note: "ロング・多毛は＋料金があります",
    icon: <Palette aria-hidden className="w-5 h-5" />,
    footerNote: "※ セット割もございます",
    items: [
      { label: "ヘアカラー", price: `${yen(7260)}〜${yen(9680)}`, badge: "range" },
      { label: "オイルカラー", price: `${yen(9680)}〜${yen(12100)}`, badge: "range" },
      { label: "ハイライト", price: `${yen(7870)}〜${yen(10290)}`, badge: "range" },
      { label: "マニキュア", price: `${yen(7260)}〜${yen(9680)}`, badge: "range" },
      { label: "白髪ぼかし", price: `${yen(5450)}〜${yen(7260)}`, badge: "range" },
      { label: "ブリーチ", badge: "ask" },
    ],
  },
  {
    key: "perm",
    title: "パーマ",
    icon: <Waves aria-hidden className="w-5 h-5" />,
    footerNote: "※ 金額未記載の箇所があります",
    items: [
      { label: "コスメパーマ", price: yen(12710) },
      { label: "ストレートパーマ", price: yen(15730) },
      { label: "前髪ストレートパーマ", price: yen(10470) },
      { label: "デジタルパーマ", price: yen(18150) },
      { label: "部分パーマ", badge: "ask" },
    ],
  },
  {
    key: "treatment",
    title: "トリートメント",
    icon: <Sparkles aria-hidden className="w-5 h-5" />,
    items: [
      { label: "良質前処理トリートメント", price: yen(2420) },
      { label: "リファージュシステムトリートメント", price: yen(3630) },
      { label: "カラートリートメント", price: yen(3030) },
      { label: "TOKIOクイックトリートメント", price: yen(2420) },
      { label: "TOKIOシステムトリートメント", price: yen(4840) },
    ],
  },
  {
    key: "other",
    title: "OTHER",
    icon: <Package aria-hidden className="w-5 h-5" />,
    items: [
      { label: "ブルーシャンプー＆トリートメント", price: yen(610) },
      { label: "炭酸シャンプー", price: yen(610) },
      { label: "シャンプー", price: yen(1820) },
      { label: "シャンプーブロー", price: yen(3030) },
      { label: "ヘアセット", price: `${yen(2420)}〜`, badge: "range" },
      { label: "眉毛カット", price: yen(1500) },
    ],
  },
];

const COURSES = [
  { label: "ナチュラルコース", units: "300本", now: 12000, nowTax: 13200, normal: 18000, normalTax: 19800, off: 6600 },
  { label: "ボリュームアップコース", units: "1,000本", now: 40000, nowTax: 44000, normal: 62000, normalTax: 68200, off: 22000 },
  { label: "トライアルコース", units: "100本", now: 4000, nowTax: 4400, normal: 6000, normalTax: 6600, off: 2200 },
  { label: "スタンダードコース", units: "500本", now: 20000, nowTax: 22000, normal: 30000, normalTax: 33000, off: 11000 },
];

function Badge({ type }: { type: PriceItem["badge"] }) {
  if (!type || type === "range") return null; // 価格右の波線バッジは非表示
  const map: Record<string, string> = {
    ask: "要相談",
    contact: "お問い合わせください",
  } as const;
  const text = map[type];
  if (!text) return null;
  return (
    <span className="ml-2 inline-flex items-center rounded-full border px-2 py-0.5 text-xs text-gray-700 bg-white">
      {text}
    </span>
  );
}

export default function MenuSection() {
  return (
    <section aria-labelledby="menu-title" className="bg-white">
      <div className="mx-auto max-w-[88rem] px-4 md:px-6 py-16 md:py-20">
        <header className="text-center max-w-3xl mx-auto">
          <h1 id="menu-title" className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">MENU（メニュー）</h1>
          <p className="mt-3 text-[15px] md:text-base text-gray-600">料金は税込表示です。髪の長さ・量により追加料金を頂く場合がございます。</p>
          <div className="mx-auto mt-3 h-[2px] w-16 rounded-full bg-gray-200" />
        </header>

        {/* カテゴリカード */}
        <div className="mt-10 grid gap-6 md:gap-8 md:grid-cols-2">
          {DATA.map((cat) => (
            <article key={cat.key} className="rounded-2xl border bg-white shadow-sm p-5 md:p-6">
              <header className="flex items-center gap-2">
                <span className="text-gray-900">{cat.icon}</span>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900">{cat.title}</h2>
              </header>
              {cat.note && <p className="mt-1 text-sm text-gray-600">{cat.note}</p>}

              <div className="mt-4 overflow-hidden">
                <table className="w-full text-[17px] md:text-[18px] leading-relaxed">
                  <caption className="sr-only">{cat.title}の料金一覧</caption>
                  <tbody>
                    {cat.items.map((it) => (
                      <tr key={it.label} className="border-b last:border-0">
                        <th scope="row" className="py-3 pr-4 text-left font-medium text-gray-900">{it.label}</th>
                        <td className="py-3 text-right tabular-nums text-gray-800">
                          {it.price ?? ""}
                          <Badge type={it.badge} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {cat.footerNote && <p className="mt-2 text-xs text-gray-500"><b className="text-gray-800">※</b> {cat.footerNote}</p>}
            </article>
          ))}

          {/* ご予約カード（OTHERの右隣に並ぶよう末尾に配置） */}
          <article className="rounded-2xl border bg-white shadow-sm p-5 md:p-6">
            <header>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900">ご予約</h2>
              <p className="mt-1 text-sm text-gray-600">Webとお電話のどちらからでも承ります。</p>
            </header>
            <div className="mt-4 flex flex-col gap-3">
              <a href={SITE.bookingUrl} className="mk-btn mk-btn-primary h-12 text-base" aria-label="Web予約へ進む">予約はこちら</a>
              <a href={`tel:${SITE.tel}`} className="mk-btn h-12 text-base" style={{border:'1px solid #d1d5db', background:'#fff'}} aria-label="電話で予約する">
                <Phone className="mk-icon" aria-hidden />
                <span>お電話で予約する</span>
              </a>
            </div>
            <p className="mt-2 text-xs text-gray-500">受付時間 10:00〜17:30</p>
          </article>
        </div>

        {/* Course Plan */}
        <section aria-labelledby="course-title" className="mt-12 md:mt-16">
          <header className="text-center max-w-3xl mx-auto">
            <h2 id="course-title" className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900 flex items-center justify-center gap-2">
              <BadgePercent className="w-6 h-6" aria-hidden />増毛エクステ
            </h2>
          </header>

          {/* シンプルなリスト表示 */}
          <div className="mt-6 rounded-2xl border bg-white shadow-sm p-5 md:p-6">
            <ul className="divide-y divide-gray-200">
              {COURSES.map((c) => (
                <li key={c.label} className="py-4 flex items-start justify-between gap-4 tabular-nums">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-gray-900">{c.label}</h3>
                      <span className="text-xs text-gray-600">{c.units}</span>
                    </div>
                    <div className="mt-1 text-sm text-gray-500">通常 {yen(c.normal)}（税込 {yen(c.normalTax)}）</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[18px] md:text-[20px] font-semibold text-gray-900">{yen(c.now)}（税込 {yen(c.nowTax)}）</div>
                    <div className="text-xs text-emerald-700">-{c.off.toLocaleString()}円お得</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* 予約ボタン */}
          <div className="mt-6 text-center">
            <a href={SITE.bookingUrl} className="mk-btn mk-btn-primary inline-flex h-12 text-base" aria-label="増毛エクステの予約はこちら">
              増毛エクステの予約はこちら
            </a>
          </div>
        </section>
      </div>
    </section>
  );
}


