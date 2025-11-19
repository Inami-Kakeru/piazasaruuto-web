export function ConceptBlock() {
  return (
    <section aria-labelledby="concept-title" className="bg-white">
      <div className="mx-auto max-w-[88rem] px-4 md:px-6 py-20 md:py-24">
        <header className="text-center">
          <h2
            id="concept-title"
            className="text-3xl md:text-5xl font-semibold tracking-tight text-gray-900"
          >
            保谷で叶える、理想の髪質改善
          </h2>
          <div className="mx-auto mt-3 h-[2px] w-16 rounded-full bg-gray-200" />
        </header>

        <div className="mt-12 grid md:grid-cols-2 gap-12 items-start">
          {/* Left: description */}
          <div className="text-[17px] md:text-[18px] leading-[2] text-gray-700">
            {/* セクション1 */}
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900">毎日がラクに、気持ちよく。</h3>
            <p className="mt-2">
              西東京・練馬エリアで、安心して髪を任せられる美容室を目指しています。
            </p>

            {/* セクション2 */}
            <h3 className="mt-6 text-xl md:text-2xl font-semibold text-gray-900">静かに過ごせる、やさしい空間</h3>
            <p className="mt-2">
              完全予約のマンツーマン対応。保谷駅から徒歩1分の立地にありながら、静かにリラックスできるプライベート空間です。
            </p>

            {/* セクション3 */}
            <h3 className="mt-6 text-xl md:text-2xl font-semibold text-gray-900">髪と肌をいたわるこだわり</h3>
            <p className="mt-2">
              店内の水はすべて<b className="font-semibold text-gray-900"> 肌にやさしい軟水</b>を使用。髪質改善メニューや増毛エクステなど、年齢や髪質に合わせた丁寧なご提案をいたします。
            </p>

            {/* セクション4 */}
            <h3 className="mt-6 text-xl md:text-2xl font-semibold text-gray-900">安心して通えるために</h3>
            <p className="mt-2">
            駐車スペースは、事前予約により確保が可能です。お車でお越しの方は、ご予約時にお気軽にお申し付けください。
            </p>
          </div>

          {/* Right: photo */}
          <figure>
            <img
              src="/images/美容室_きれいなイメージ.jpg"
              alt="落ち着いた店内で、スタイリストがやさしく声をかけながら施術している様子"
              className="w-full rounded-2xl object-cover shadow-sm"
              loading="lazy"
            />
            <figcaption className="mt-2 text-center text-sm text-gray-500">
              リラックスできる、やさしい空間づくりを心がけています。
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
