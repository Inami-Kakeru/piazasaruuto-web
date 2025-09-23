// components/SimpleWorries.tsx （マーケ版コピー差し替え）
export function SimpleWorries() {
    return (
      <section aria-labelledby="worry-title" className="bg-white">
        <div className="mx-auto max-w-[88rem] px-4 md:px-6 py-20 md:py-24">
          {/* 見出し（大）＋サブリード */}
          <header className="text-center max-w-5xl mx-auto">
            <h2
              id="worry-title"
              className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-gray-900 tracking-tight"
            >
              このようなお悩み、ありませんか？
            </h2>
            <p className="mt-3 text-[15px] md:text-base text-gray-600">
              年齢とともに変わる髪。まずは“気になること”からお聞かせください。
            </p>
          </header>

          {/* 本文：二段組（左：テキスト、右：写真） */}
          <div className="mt-12 grid md:grid-cols-[8fr_5fr] gap-8 items-start">
            {/* Left: text */}
            <div>
              <ul className="space-y-4 text-[22px] md:text-[26px] leading-[1.9] text-gray-600">
                <li className="flex gap-3">
                  <Check />
                  <span>
                    前髪・分け目が <b className="font-bold text-gray-900">ぺたん</b> としてしまう
                  </span>
                </li>
                <li className="flex gap-3">
                  <Check />
                  <span>
                    つむじが <b className="font-bold text-gray-900">割れて</b> 目立つ
                  </span>
                </li>
                <li className="flex gap-3">
                  <Check />
                  <span>
                    <b className="font-bold text-gray-900">くせ</b> で髪が <b className="font-bold text-gray-900">まとまらない</b>
                  </span>
                </li>
                <li className="flex gap-3">
                  <Check />
                  <span>
                    <b className="font-bold text-gray-900">ツヤ</b> がなくて <b className="font-bold text-gray-900">疲れて見える</b>
                  </span>
                </li>
              </ul>

              {/* 安心文（約束） */}
              <p className="mt-6 text-[18px] md:text-[19px] leading-[1.9] text-gray-700">
                無理をせず、できることから。私たちがやさしくご提案します。
              </p>

              {/* ブリッジ（選択肢の提示） */}
              <p className="mt-4 text-[18px] md:text-[19px] leading-[1.9] text-gray-700">
                「ふんわり」にしたい方には、<br />
                増毛エクステという方法もご用意しています。<br />
                地肌への負担が少なく、少量から自然に始められます。<br />
                施術に使う水は、肌にやさしい軟水を使用しています。<br />
                安心できる環境で、髪と心に寄り添うご提案をいたします。
              </p>
            </div>

            {/* Right: photo（必要ならローカルパスに変更） */}
            <figure className="md:order-none order-first">
              <img
                src="/images/店員とお客さん.png"
                alt="落ち着いた店内で、やさしく声をかけながら施術するスタイリスト"
                className="w-full rounded-2xl object-cover shadow-sm"
                loading="lazy"
              />
              <figcaption className="mt-2 text-center text-sm text-gray-500">
                <a href="/staff#hoshino" className="underline underline-offset-2 hover:text-gray-700">
                  美容師　星野 晶代
                </a>
                （増毛エクステのご相談も安心してお任せください）
              </figcaption>
            </figure>
          </div>
        </div>
      </section>
    );
  }
  
  /* やさしいグリーンのチェックアイコン（SVG） */
  function Check() {
    return (
      <svg
        aria-hidden="true"
        className="mt-2 h-7 w-7 flex-none text-emerald-500"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }