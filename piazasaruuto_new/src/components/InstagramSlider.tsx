"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Instagram, ExternalLink } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { SITE } from "../lib/constants";

// Swiperをクライアントサイドでのみ読み込み
const SwiperComponent = dynamic(
  () => import("./SwiperWrapper"),
  { ssr: false, loading: () => <div className="h-64 bg-muted animate-pulse rounded-lg"></div> }
);

// ダミーのInstagram投稿データ
const instagramPosts = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1722935408489-2bf93349c8cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwc2Fsb24lMjBpbnN0YWdyYW0lMjBiZWF1dHl8ZW58MXx8fHwxNzU3MDAyMDI1fDA&ixlib=rb-4.1.0&q=80&w=1080",
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="aspect-square bg-muted animate-pulse rounded-lg"></div>
        ))}
      </div>
    );
  }

  return (
    <section id="instagram" className="py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Instagram className="w-8 h-8 text-primary" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Instagram</h2>
          </div>
          <p className="text-lg leading-relaxed max-w-2xl mx-auto text-muted-foreground">
            最新のスタイリングやサロンの様子をチェック！
          </p>
        </div>

        <div className="mb-8">
          <SwiperComponent 
            posts={instagramPosts} 
            autoplay={!prefersReducedMotion}
          />
        </div>

        <div className="text-center">
          <a
            href={SITE.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg px-8 py-3 font-medium transition-colors min-h-[44px] bg-primary text-primary-foreground hover:bg-primary/90 space-x-2"
          >
            <Instagram className="w-5 h-5" />
            <span>Instagramでフォロー</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}