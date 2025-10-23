"use client";

import { Phone } from "lucide-react";
import { SITE } from "../../../lib/marketing/constants";
import { useState, useEffect } from "react";

const heroImages = [
  {
    src: "/images/店内イメージ.jpg",
    alt: "美容室ぴあざさるうと店内"
  },
  {
    src: "/images/美容室_きれいなイメージ.jpg", 
    alt: "美容室ぴあざさるうと店内イメージ"
  },
  {
    src: "/images/お店の外観.png",
    alt: "美容室ぴあざさるうと外観"
  }
];

export function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % heroImages.length
      );
    }, 5000); // 5秒ごとに切り替え

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="mk-hero">
      <div className="mk-hero-bg">
        {heroImages.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.alt}
            className={`mk-hero-image ${index === currentImageIndex ? 'active' : ''}`}
          />
        ))}
        <div className="mk-hero-overlay"></div>
      </div>
      
      <div className="mk-hero-content">
        <h1 className="mk-hero-title">
          髪と心に、やさしい時間。
        </h1>
        <p className="mk-hero-subtitle">
        あなたに寄り添う、大人のヘアケア。
        </p>
        
        <div className="mk-hero-buttons">
          <button
            disabled
            className="mk-btn mk-btn-primary opacity-50 cursor-not-allowed"
            aria-disabled="true"
            title="Web予約は準備中です"
          >
            Web予約（準備中）
          </button>
          <a
            href={`tel:${SITE.tel}`}
            className="mk-btn mk-btn-secondary"
            aria-label={`電話番号 ${SITE.tel} に発信`}
          >
            <Phone className="mk-icon" />
            <span>お電話</span>
          </a>
        </div>
        
        <div className="mk-hero-info">
          <p>{SITE.tel}</p>
          <p>{SITE.hours_note}</p>
        </div>
      </div>
    </section>
  );
}
