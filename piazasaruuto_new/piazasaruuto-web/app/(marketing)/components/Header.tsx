"use client";

import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { SITE } from "../../../lib/marketing/constants";
import { usePathname, useRouter } from "next/navigation";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // ヘッダーナビ（ホーム内スクロール）
  const NAV_ITEMS = [
    { label: "ホーム", href: "#hero" },
    { label: "メニュー紹介", href: "#menu-intro" },
    { label: "メニュー詳細", href: "/menu" },
    { label: "Instagram", href: "#instagram" },
    { label: "アクセス", href: "#access" },
  ];

  const scrollToSection = (href: string) => {
    // 同一ページの場合はスムーズスクロール
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
      return;
    }

    // 他ページにいる場合はトップに遷移してからハッシュ付きで移動
    if (pathname !== "/") {
      router.push(`/${href}`);
      setIsMenuOpen(false);
      return;
    }

    // 念のため（要素取得できない場合）
    if (href.startsWith("#")) {
      window.location.hash = href.substring(1);
      setIsMenuOpen(false);
    }
  };

  const handleNavClick = (item: { label: string; href: string }) => {
    if (item.href.startsWith("#")) {
      scrollToSection(item.href);
      return;
    }
    router.push(item.href);
    setIsMenuOpen(false);
  };

  return (
    <header className="mk-header">
      {/* Top message bar */}
      <div className="mk-header-topbar">
        <div className="mk-container">
          <p className="mk-header-topbar-text">保谷に根付いた美容室＆増毛エクステもできます。</p>
        </div>
      </div>
      <div className="mk-container">
        <div className="mk-header-content">
          {/* Logo/Brand */}
          <button
            onClick={() => scrollToSection("#hero")}
            className="mk-header-brand"
          >
            <div>
              <h1 className="mk-header-title">{SITE.name}</h1>
              <p className="mk-header-subtitle">{SITE.subtitle}</p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="mk-header-nav" role="navigation" aria-label="メインナビゲーション">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item)}
                className="mk-header-nav-link"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="mk-header-cta">
            <a
              href={`tel:${SITE.tel}`}
              className="mk-btn mk-btn-secondary"
              aria-label={`電話番号 ${SITE.tel} に発信`}
            >
              <Phone className="mk-icon" />
              <span>お電話</span>
            </a>
            <a
              href={SITE.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mk-btn mk-btn-primary"
              aria-label="ホットペッパービューティーでWeb予約"
            >
              Web予約
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="mk-header-menu-btn"
            aria-label="メニューを開く"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="mk-icon" /> : <Menu className="mk-icon" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="mk-header-mobile-nav" role="navigation" aria-label="モバイルナビゲーション">
            <div className="mk-container">
              <div className="mk-header-mobile-content">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => handleNavClick(item)}
                    className="mk-header-mobile-link"
                  >
                    {item.label}
                  </button>
                ))}
                <div className="mk-header-mobile-cta">
                  <a
                    href={`tel:${SITE.tel}`}
                    className="mk-btn mk-btn-secondary"
                    aria-label={`電話番号 ${SITE.tel} に発信`}
                  >
                    <Phone className="mk-icon" />
                    <span>お電話</span>
                  </a>
                <a
                  href={SITE.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mk-btn mk-btn-primary"
                  aria-label="ホットペッパービューティーでWeb予約"
                >
                  Web予約
                </a>
                </div>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

