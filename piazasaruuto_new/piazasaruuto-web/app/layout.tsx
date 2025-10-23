import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "ぴあざさるうと | 保谷駅徒歩1分の美容室",
  description: "保谷駅北口より徒歩1分の美容室ぴあざさるうと。カット・カラー・パーマ・増毛エクステまで、お客様一人ひとりに寄り添ったサービスを提供いたします。",
  keywords: ["美容室", "保谷", "練馬区", "カット", "カラー", "パーマ", "増毛エクステ", "ぴあざさるうと"],
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
    title: "ぴあざさるうと | 保谷駅徒歩1分の美容室",
    description: "保谷駅北口より徒歩1分の美容室ぴあざさるうと。カット・カラー・パーマ・増毛エクステまで、お客様一人ひとりに寄り添ったサービスを提供いたします。",
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
    title: "ぴあざさるうと | 保谷駅徒歩1分の美容室",
    description: "保谷駅北口より徒歩1分の美容室ぴあざさるうと。カット・カラー・パーマ・増毛エクステまで、お客様一人ひとりに寄り添ったサービスを提供いたします。",
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
  verification: {
    google: "your-google-verification-code", // 実際のコードに置き換え
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
