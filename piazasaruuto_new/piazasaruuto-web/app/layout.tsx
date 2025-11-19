import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "ぴあざさるうと | 保谷駅徒歩1分の髪質改善・増毛エクステ美容室",
  description: "保谷駅北口より徒歩1分の美容室ぴあざさるうと。練馬区・西東京・大泉学園エリアで髪質改善と増毛エクステに特化したサロンです。カット・カラー・パーマはもちろん、年齢とともに変化する髪のお悩みに寄り添い、艶やかな髪へ導きます。",
  keywords: [
    "美容室", "保谷駅", "練馬", "西東京", "大泉学園", 
    "髪質改善", "増毛エクステ", "ボリュームアップ", 
    "カット", "カラー", "パーマ", "ぴあざさるうと", "Piazza Salute"
  ],
  authors: [{ name: "ぴあざさるうと" }],
  creator: "ぴあざさるうと",
  publisher: "ぴあざさるうと",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://piazza-salute.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ぴあざさるうと | 保谷駅徒歩1分の髪質改善・増毛エクステ美容室",
    description: "保谷駅北口より徒歩1分の美容室ぴあざさるうと。練馬区・西東京・大泉学園エリアで髪質改善と増毛エクステに特化したサロンです。丁寧なカウンセリングと技術で、あなたの理想のスタイルを叶えます。",
    url: "https://piazza-salute.com",
    siteName: "ぴあざさるうと",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: "/images/お店の外観.png",
        width: 1200,
        height: 630,
        alt: "美容室ぴあざさるうと外観",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ぴあざさるうと | 保谷駅徒歩1分の髪質改善・増毛エクステ美容室",
    description: "保谷駅北口より徒歩1分の美容室ぴあざさるうと。練馬区・西東京・大泉学園エリアで髪質改善と増毛エクステに特化したサロンです。",
    images: ["/images/お店の外観.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${notoSansJP.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
