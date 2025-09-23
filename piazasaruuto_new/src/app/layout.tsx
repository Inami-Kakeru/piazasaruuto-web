import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "ぴあざさるうと | 練馬区保谷駅の美容室",
  description: "60代の方にも読みやすく、落ち着いた空間でお迎えします。世代を問わず多くの支持を集めるプライベート空間で、もっと輝く私に。西武池袋線保谷駅北口より徒歩1分。",
  keywords: "美容室,練馬区,保谷駅,60代,白髪染め,カット,カラー,パーマ,エクステ,増毛",
  authors: [{ name: "ぴあざさるうと" }],
  creator: "ぴあざさるうと",
  publisher: "ぴあざさるうと",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://piazzasalute.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "ぴあざさるうと | 練馬区保谷駅の美容室",
    description: "60代の方にも読みやすく、落ち着いた空間でお迎えします。世代を問わず多くの支持を集めるプライベート空間で、もっと輝く私に。",
    url: "https://piazzasalute.com",
    siteName: "ぴあざさるうと",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ぴあざさるうと | 練馬区保谷駅の美容室",
    description: "60代の方にも読みやすく、落ち着いた空間でお迎えします。",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://piazzasalute.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#030213" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}