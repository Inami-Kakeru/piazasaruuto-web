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

// ダミーのInstagram投稿データ
const instagramPosts = [
  {
    id: 1,
    image: "/photos/extension_hero.jpg",
    alt: "最新のカットスタイル",
    caption: "お客様のライフスタイルに合わせたカットスタイル✨"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1722935408489-2bf93349c8cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwc2Fsb24lMjBpbnN0YWdyYW0lMjBiZWF1dHl8ZW58MXx8fHwxNzU3MDAyMDI1fDA&ixlib=rb-4.1.0&q=80&w=1080", 
    alt: "カラーリング作品",
    caption: "自然な白髪ぼかしで若々しい印象に💫"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1651713325384-dd0f1e381534?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBoYWlyJTIwc2Fsb24lMjBleHRlcmlvciUyMGJ1aWxkaW5nfGVufDF8fHx8MTc1NzAwMjAxOHww&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "サロンの様子",
    caption: "リラックスできる空間でお待ちしております🌿"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1722935408489-2bf93349c8cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwc2Fsb24lMjBpbnN0YWdyYW0lMjBiZWF1dHl8ZW58MXx8fHwxNzU3MDAyMDI1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "トリートメント効果",
    caption: "TOKIOトリートメントでツヤ髪に✨"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1737063935340-f9af0940c4c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGhhaXJzdHlsaXN0JTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU3MDAyMDIyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "エクステスタイル",
    caption: "ボリュームアップエクステで理想のスタイルに💇‍♀️"
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

