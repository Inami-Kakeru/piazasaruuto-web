"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Instagram, ExternalLink } from "lucide-react";
import { SITE } from "../../../lib/marketing/constants";

// Swiperをクライアントサイドでのみ読み込み
const SwiperComponent = dynamic(
  () => import("./SwiperWrapper"),
  { ssr: false, loading: () => <div className="mk-instagram-loading"></div> }
);

// Instagram投稿データ
const instagramPosts = [
  {
    id: 1,
    image: "/images/insta/カットモデル_似合う.JPG",
    alt: "カットモデル",
    caption: "お客様に似合うカットスタイル✨"
  },
  {
    id: 2,
    image: "/images/insta/モデルの女性.JPG",
    alt: "モデルの女性",
    caption: "自然な仕上がりで毎日がラクに💫"
  },
  {
    id: 3,
    image: "/images/insta/おしゃれな美容グッズ.JPG",
    alt: "おしゃれな美容グッズ",
    caption: "こだわりの美容グッズでお手入れをサポート🌿"
  },
  {
    id: 4,
    image: "/images/insta/クーポン情報.png",
    alt: "クーポン情報",
    caption: "お得なクーポン情報をチェック✨"
  },
  {
    id: 5,
    image: "/images/insta/インスタのQR.JPG",
    alt: "Instagram QRコード",
    caption: "Instagramで最新情報をチェック💇‍♀️"
  }
];

export function InstagramSlider() {
  const [mounted, setMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // アクセシビリティ: prefers-reduced-motionの確認
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  if (!mounted) {
    return (
      <div className="mk-instagram-skeleton">
        {[1, 2, 3].map((i) => (
          <div key={i} className="mk-instagram-skeleton-item"></div>
        ))}
      </div>
    );
  }

  return (
    <section id="instagram" className="mk-instagram">
      <div className="mk-container">
        <div className="mk-instagram-header">
          <div className="mk-instagram-title-container">
            <Instagram className="mk-instagram-icon" />
            <h2 className="mk-instagram-title">Instagram</h2>
          </div>
          <p className="mk-instagram-subtitle">
            最新のスタイリングやサロンの様子をチェック！
          </p>
        </div>

        <div className="mk-instagram-slider">
          <SwiperComponent 
            posts={instagramPosts} 
            autoplay={!prefersReducedMotion}
          />
        </div>

        <div className="mk-instagram-footer">
          <a
            href={SITE.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mk-btn mk-btn-primary"
          >
            <Instagram className="mk-icon" />
            <span>Instagramでフォロー</span>
            <ExternalLink className="mk-icon" />
          </a>
        </div>
      </div>
    </section>
  );
}

