import type { Metadata } from "next";
import MenuSection from "../components/MenuSection";
import { SITE } from "../../../lib/marketing/constants";

export const metadata: Metadata = {
  title: "メニュー・料金 | ぴあざさるうと",
  description: "ぴあざさるうとのメニューと料金をご紹介。カット・カラー・パーマ・トリートメント・増毛エクステまで、豊富なメニューをご用意しております。料金は税込表示です。",
  keywords: ["メニュー", "料金", "カット", "カラー", "パーマ", "トリートメント", "増毛エクステ", "ぴあざさるうと", "保谷"],
  alternates: {
    canonical: "/menu",
  },
  openGraph: {
    title: "メニュー・料金 | ぴあざさるうと",
    description: "ぴあざさるうとのメニューと料金をご紹介。カット・カラー・パーマ・トリートメント・増毛エクステまで、豊富なメニューをご用意しております。",
    url: "https://piazza-salute.com/menu",
    type: "website",
  },
};

export default function MenuPage() {
  return (
    <div className="mt-[calc(var(--header-height)+1.5rem)]">
      <MenuSection />
    </div>
  );
}


