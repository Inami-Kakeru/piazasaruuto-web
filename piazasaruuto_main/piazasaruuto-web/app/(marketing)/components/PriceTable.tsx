export function PriceTable() {
  const items = [
    { name: "ヘアカット", price: "¥2,900", note: undefined },
    { name: "カラー", price: "¥6,500〜", note: undefined },
    { name: "増毛エクステ", price: "¥4,400〜", note: "分け目・つむじが気になる方に" },
    { name: "ドライヘッドマッサージ", price: "¥3,300〜", note: "リラックスしたい方へ" },
  ];

  return (
    <section id="menu-detail" aria-labelledby="price-title" className="bg-white">
      <div className="mx-auto max-w-[88rem] px-4 md:px-6 py-20 md:py-24">
        {/* 見出し（日本語） */}
        <header className="text-center max-w-4xl mx-auto">
          <h2 id="price-title" className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900">
            主なメニューと料金
          </h2>
          <div className="mx-auto mt-3 h-[2px] w-16 rounded-full bg-gray-200" />
        </header>

        {/* 2カラムレイアウト（左カラムをより広く、右は固定感を維持） */}
        <div className="mt-10 grid md:grid-cols-[5fr_2fr] gap-8 md:gap-10 items-start">
          {/* 左：簡易料金表（行間leading-8、外枠なし、行区切りのみ） */}
          <div className="overflow-hidden w-full max-w-none mx-0 md:pr-6">
            <ul className="divide-y divide-gray-200">
              {items.map((it) => (
                <li key={it.name} className="grid grid-cols-[1fr_auto] items-center px-4 md:px-6 py-4 md:py-5">
                  <div className="leading-8">
                    <span className="block text-[17px] md:text-[18px] font-semibold text-gray-900">{it.name}</span>
                    {it.note && (
                      <span className="block text-sm text-gray-500">{it.note}</span>
                    )}
                  </div>
                  <span className="text-[17px] md:text-[18px] text-gray-600">{it.price}</span>
                </li>
              ))}
            </ul>
            {/* 詳細リンク（右下配置・やや目立たせる） */}
            <a
              href="/menu"
              className="text-sm text-emerald-600 hover:underline block mt-4 text-right"
            >
              詳しいメニューはこちら →
            </a>
            <p className="mt-1 text-xs text-gray-400 text-right">※価格は税込みです</p>
          </div>

          {/* 右：予約案内（外枠なし） */}
          <aside className="p-0 md:p-1 w-full md:max-w-[560px] md:justify-self-end">
            <h3 className="text-lg font-semibold text-gray-900">Web予約はこちら</h3>
            <p className="mt-2 text-sm text-gray-600 leading-7">
              Web予約・お電話予約のどちらもご利用いただけます。ご希望の日時とメニューを選んで、安心してご予約ください。
            </p>

            <div className="mt-6 flex flex-col items-stretch gap-3">
              <a
                href="/reserve"
                aria-label="予約へ進む"
                className="inline-flex items-center justify-center rounded-lg py-3 px-6 bg-emerald-600 text-white font-medium hover:bg-emerald-700"
              >
                予約はこちら
              </a>
              <div className="text-center text-xs text-gray-500">or</div>
              <div className="rounded-lg px-4 py-3 bg-gray-50">
                <div className="text-sm font-medium text-gray-800">お電話でも予約できます</div>
                <div className="mt-1 text-base text-gray-900">
                  📞 <a href="tel:03-3978-4800" className="underline">03-3978-4800</a>
                </div>
                <div className="text-xs text-gray-500">（受付時間 10:00〜17:30）</div>
                <div className="mt-3">
                  <a href="tel:03-3978-4800" className="inline-flex items-center justify-center rounded-lg py-2.5 px-4 bg-white text-gray-900 border hover:bg-gray-50 w-full" aria-label="電話をかける">
                    電話をかける
                  </a>
                </div>
              </div>
              <p className="text-xs text-gray-500">※ 店舗、LINEでもご予約を承っております。</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
