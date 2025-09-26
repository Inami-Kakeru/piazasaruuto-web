import { SITE } from "../../../lib/marketing/constants";

export function ExtensionShowcase() {
  return (
    <section aria-labelledby="ext-title">
      <div className="mx-auto max-w-[88rem] px-4 md:px-6 py-16 md:py-20">
        {/* サブヘッダー（ServiceShowcaseの続きとして控えめに） */}
        <header className="text-center max-w-4xl mx-auto">
          <h3 id="ext-title" className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight text-gray-900">
            増毛エクステもあります。
          </h3>
          {/* リード */}
          <p className="mt-3 text-[19px] md:text-[20px] text-gray-600">
            少量から自然に。気づかれにくいボリュームアップ。
          </p>
        </header>

        {/* シンプルレイアウト：左に画像、右にテキスト */}
        <div className="mt-6 grid gap-4 md:gap-6 md:grid-cols-[1.5fr_1fr] items-start">
          {/* 画像（Instagram相当） */}
          <div className="flex justify-center">
            <img
              src="/images/増毛エクステ１.png"
              alt="分け目・つむじが自然にふんわり仕上がった様子"
              className="w-full max-w-[520px] md:max-w-[560px] h-auto object-contain rounded-2xl shadow-sm"
              loading="lazy"
            />
          </div>

          {/* テキスト */}
          <div className="max-w-[40em]">
            {/* 箇条書き */}
            <ul className="space-y-2 text-[20px] md:text-[21px] leading-8 text-gray-800">
              <li className="flex gap-3"><Check /><span><b className="font-semibold text-gray-900">地毛1本</b>に極細ファイバーを結ぶ</span></li>
              <li className="flex gap-3"><Check /><span><b className="font-semibold text-gray-900">横から見ても自然</b>に馴染む設計</span></li>
              <li className="flex gap-3"><Check /><span><b className="font-semibold text-gray-900">少量から</b>無理なく始められます</span></li>
            </ul>

            {/* 本文 */}
            <p className="mt-3 text-[18px] md:text-[20px] leading-8 text-gray-700">
              分け目・つむじの“ぺたん”が気になる方へ。地毛を傷めない方法で、必要な分だけ自然にボリュームを補います。はじめての方にも丁寧にご説明します。
            </p>

            {/* 予約CTA */}
            <div className="mt-6 text-center">
              <a
                href={SITE.bookingUrl}
                className="mk-btn mk-btn-primary mk-extension-cta-btn"
              >
                ご予約はこちら
              </a>
            </div>
          </div>
        </div>

        {/* 担当者（ServiceShowcaseと同サイズ） */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <div className="text-center mb-8">
            <h4 className="text-lg font-semibold text-gray-900">担当者</h4>
            <p className="mt-2 text-sm text-gray-600">専門技術で自然な仕上がりを実現します</p>
          </div>
          <div className="flex items-center justify-center gap-6">
            <img
              src="/images/ナカヤママミ_正方形.png"
              alt="スタッフの写真"
              className="w-48 h-48 rounded-full object-cover flex-shrink-0"
            />
            <div className="text-base leading-7 text-gray-700">
              <b className="text-gray-900 text-lg">中山 真美</b>
              <div className="text-gray-500 text-sm mt-1">（増毛エクステ担当）</div>
              <div className="mt-2 text-sm text-gray-600">「気づかれない自然さ」にこだわります。</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Check() {
  return (
    <svg
      aria-hidden="true"
      className="mt-1.5 h-6 w-6 flex-none text-emerald-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
