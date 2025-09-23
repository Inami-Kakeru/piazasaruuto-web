export const SITE = {
  name: "ぴあざさるうと",
  subtitle: "Piazza Salute",
  tel: "03-3978-4800",
  email: "test@example.com",
  address: "〒178-0064 東京都練馬区南大泉5-35-8",
  access: "西武池袋線「保谷駅」北口より徒歩1分。北口を出て線路沿いに直進し、1本目の角を左折。右手の『ほうやデンタルクリニック』の隣。",
  parking: "あり（台数に限りがあるため、事前にお電話でのご予約をお願いいたします）",
  hours_note: "月・火・水・金・土 10:00〜17:30（カット最終 16:30）／日・木 定休日",
  bookingUrl: "/booking",
  mapEmbedSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3238.081599976219!2d139.56598757700579!3d35.74879907256545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6018ee1b8f0e4e4f%3A0x1234567890abcdef!2z5Lqs6YO95LyJ6aas5Yy65Y2X5aSn5rOJ77yV77yN77yT77yV77yN77yY!5e0!3m2!1sja!2sjp!4v1234567890123!5m2!1sja!2sjp",
  instagramUrl: "#"
} as const;

export const MENU = {
  cut: [
    { name: "カット（シャンプー・ブロー込）", price: "¥5,040" },
    { name: "前髪カット", price: "¥1,500～" },
  ],
  color: [
    { name: "イノアオイルカラー（白髪対応）", price: "¥9,880～" },
    { name: "ヘナカラー（低刺激）", price: "¥8,070～" },
  ],
  perm: [
    { name: "パーマ＋カット", price: "¥13,000～" },
    { name: "前髪ストレートパーマ", price: "要問い合わせ" },
  ],
  spa: [
    { name: "カット＋ヘッドスパ", price: "¥6,250" },
  ],
  treatment: [
    { name: "TOKIOインカラミトリートメント", price: "¥8,100～" },
  ],
  extension: [
    { name: "ボリュームアップエクステ", price: "要問い合わせ" },
  ],
} as const;

export const STYLISTS = [
  {
    name: "松本 貴子",
    title: "トップスタイリスト",
    years: "スタイリスト歴15年",
    catch: "お手入れが楽で再現しやすいスタイルを心掛けています",
    profile:
      "その人の似合うシルエットを見つけ、家でも簡単にスタイリングできるデザインを提案しています。骨格に合わせたカットが得意です。特にくせ毛の方お悩み解決致します！眉毛もケア可能です◎",
    specialties: "オフィス・コンサバ",
    image: "/images/マツモトタカコ.png",
  },
  {
    name: "角田 良美",
    title: "トップスタイリスト",
    years: "スタイリスト歴15年",
    catch: "丁寧な接客、施術で『美』のお手伝いをさせて頂きます!",
    profile:
      "保谷生まれの保谷育ち、息子3人の母。家でも簡単にスタイリングできるデザインを提案しています。若見えデザインの提案も得意です。お気軽に相談してください。",
    specialties: "オフィス・コンサバ",
    image: "/images/カクタヨシミ.png",
  },
  {
    name: "中山 真美",
    title: "オーナー / エアリーエクステ担当",
    years: "スタイリスト歴3年",
    catch: "美容室併設サロン",
    profile: "丁寧なカウンセリングを心掛けております。エクステ美容師エアリーエクステ。",
    specialties: "ナチュラル／ボリュームUP、髪の割れ改善、頭皮透け改善、ふんわりヘアーをサポート",
    image: "/images/ナカヤママミ.png",
  },
] as const;

export const NAV_ITEMS = [
  { label: "ホーム", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Menu", href: "#menu" },
  { label: "Stylist", href: "#stylist" },
  { label: "Access", href: "#access" },
  { label: "Instagram", href: "#instagram" },
] as const;