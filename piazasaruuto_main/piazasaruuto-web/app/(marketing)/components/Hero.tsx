"use client";

import { Phone } from "lucide-react";
import { SITE } from "../../../lib/marketing/constants";
import { useState, useEffect } from "react";

const heroImages = [
  {
    src: "/images/蠎怜・繧､繝｡繝ｼ繧ｸ.jpg",
    alt: "鄒主ｮｹ螳､縺ｴ縺ゅ＊縺輔ｋ縺・→蠎怜・"
  },
  {
    src: "/images/鄒主ｮｹ螳､_縺阪ｌ縺・↑繧､繝｡繝ｼ繧ｸ.jpg", 
    alt: "鄒主ｮｹ螳､縺ｴ縺ゅ＊縺輔ｋ縺・→蠎怜・繧､繝｡繝ｼ繧ｸ"
  },
  {
    src: "/images/縺雁ｺ励・螟冶ｦｳ.png",
    alt: "鄒主ｮｹ螳､縺ｴ縺ゅ＊縺輔ｋ縺・→螟冶ｦｳ"
  }
];

export function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % heroImages.length
      );
    }, 5000); // 5遘偵＃縺ｨ縺ｫ蛻・ｊ譖ｿ縺・
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
          鬮ｪ縺ｨ蠢・↓縲√ｄ縺輔＠縺・凾髢薙・        </h1>
        <p className="mk-hero-subtitle">
        縺ゅ↑縺溘↓蟇・ｊ豺ｻ縺・∝､ｧ莠ｺ縺ｮ繝倥い繧ｱ繧｢縲・        </p>
        
        <div className="mk-hero-buttons">
          <span
            className="mk-btn mk-btn-disabled"
            role="status"
            aria-live="polite"
          >
            Web予約（Coming Soon）
          </span>
          <a
            href={`tel:${SITE.tel}`}
            className="mk-btn mk-btn-secondary"
            aria-label={`髮ｻ隧ｱ逡ｪ蜿ｷ ${SITE.tel} 縺ｫ逋ｺ菫｡`}
          >
            <Phone className="mk-icon" />
            <span>縺企崕隧ｱ</span>
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

