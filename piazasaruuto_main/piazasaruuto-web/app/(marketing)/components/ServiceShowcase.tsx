export function ServiceShowcase() {
  const menus = [
    {
      title: "似合わせカット",
      desc: "乾かすだけでまとまる、毎日がラクに。",
      img: "/images/似合わせカット_gemini.png",
      href: "/menu#cut",
    },
    {
      title: "イノアカラー（オイルカラー）",
      desc: "においが少なく、艶やかに。肌映えする色へ。",
      img: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&h=800&fit=crop&crop=face",
      href: "/menu#inoa",
    },
    {
      title: "ヘッドスパ＆シャンプー",
      desc: "やさしい圧でリフレッシュ。土台から整える。",
      img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=800&fit=crop&crop=face",
      href: "/menu#spa",
    },
    {
      title: "TOKIOトリートメント",
      desc: "ダメージ・パサつき・うねりを内側から補修",
      img: "/images/髪質改善.png",
      href: "/menu#extension",
    },
  ];

  const staff = [
    { img: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=48&h=48&fit=crop&crop=face", name: "角田 良美", role: "スタイリスト", note: "手ぐしで決まる仕上げを。" },
    { img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=48&h=48&fit=crop&crop=face", name: "松本 貴子", role: "スタイリスト", note: "やさしい色で表情まで明るく。" },
  ];

  return (
    <section id="menu-intro" className="mx-auto max-w-[88rem] px-4 md:px-6 py-20 md:py-24" aria-labelledby="std-title">
      <header className="text-center max-w-4xl mx-auto">
        <h2 id="std-title" className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-gray-900">
          メニュー紹介
        </h2>
        <div className="mx-auto mt-3 h-[2px] w-16 rounded-full bg-gray-200" />
      </header>

      {/* 横1列（PC）: 4カラム */}
      <div className="mt-8 grid gap-8 md:grid-cols-4">
        {menus.map((m) => (
          <article key={m.title} className="rounded-2xl border bg-white shadow-sm overflow-hidden">
            <a href={m.href} className="group block h-full">
              <div className="rounded-b-none overflow-hidden">
                <img src={m.img} alt={`${m.title}のイメージ`} className="w-full aspect-square object-cover" />
              </div>
              <div className="p-5">
                <h3 className="text-lg md:text-xl font-semibold text-gray-900">{m.title}</h3>
                <p className="mt-1 text-[15px] leading-7 text-gray-700">{m.desc}</p>
                <span className="mt-2 inline-block text-sm text-gray-500 underline">詳しく見る</span>
              </div>
            </a>
          </article>
        ))}
      </div>

      {/* 担当者（端的に） */}
      <div className="mt-12 border-t border-gray-200 pt-8">
        <div className="text-center mb-8">
          <h4 className="text-lg font-semibold text-gray-900">担当者</h4>
          <p className="mt-2 text-sm text-gray-600">お客様一人ひとりに合わせた丁寧な施術を心がけています</p>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-5xl mx-auto">
          {staff.map((s, index) => (
            <div key={s.name} className="flex items-center gap-6">
              <img src={s.img} alt="" className="w-48 h-48 rounded-full object-cover flex-shrink-0" />
              <div className="text-base leading-7 text-gray-700">
                <b className="text-gray-900 text-lg">{s.name}</b>
                <div className="text-gray-500 text-sm mt-1">（{s.role}）</div>
                <div className="mt-2 text-sm text-gray-600">{s.note}</div>
              </div>
              {index === 0 && (
                <div className="hidden md:block w-px h-32 bg-gray-300 mx-4"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      
    </section>
  );
}
