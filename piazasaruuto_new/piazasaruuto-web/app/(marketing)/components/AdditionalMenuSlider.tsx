"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Swiperをクライアントサイドでのみ読み込み
const SwiperComponent = dynamic(
  () => import("./MenuSwiperWrapper"),
  { ssr: false, loading: () => <div className="mk-menu-loading"></div> }
);

// 追加メニューデータ
const additionalMenus = [
  {
    id: 1,
    title: "TOKIOシャンプー",
    description: "艶やかな髪を実現する特別なシャンプー",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=400&fit=crop&crop=face",
    alt: "TOKIOシャンプーの施術風景",
    price: "¥3,500",
    href: "/menu#tokio-shampoo"
  },
  {
    id: 2,
    title: "イノアカラー",
    description: "白髪も自然に染まる低刺激カラー",
    image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=400&fit=crop&crop=face",
    alt: "イノアカラーの仕上がり",
    price: "¥9,880～",
    href: "/menu#inoa-color"
  },
  {
    id: 3,
    title: "ヘッドスパ",
    description: "やさしい圧で血行促進。リラックス効果も",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=400&fit=crop&crop=face",
    alt: "ヘッドスパのリラックス",
    price: "¥4,200",
    href: "/menu#head-spa"
  },
  {
    id: 4,
    title: "トリートメント",
    description: "TOKIOインカラミで髪質改善",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=400&fit=crop&crop=face",
    alt: "トリートメントの効果",
    price: "¥8,100～",
    href: "/menu#treatment"
  }
];

export function AdditionalMenuSlider() {
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
      <div className="mk-menu-skeleton">
        {[1, 2, 3].map((i) => (
          <div key={i} className="mk-menu-skeleton-item"></div>
        ))}
      </div>
    );
  }

  return (
    <section className="mk-additional-menu">
      <div className="mk-container">
        <div className="mk-additional-menu-header">
          <h2 className="mk-additional-menu-title">艶やかな髪</h2>
          <p className="mk-additional-menu-subtitle">
            特別なケアで美しい髪質を実現します
          </p>
        </div>

        <div className="mk-additional-menu-slider">
          <SwiperComponent 
            menus={additionalMenus} 
            autoplay={!prefersReducedMotion}
          />
        </div>
      </div>
    </section>
  );
}
