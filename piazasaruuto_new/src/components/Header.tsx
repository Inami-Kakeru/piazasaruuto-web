"use client";

import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import Link from "next/link";
import { SITE, NAV_ITEMS } from "../lib/constants";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const handleNavClick = (item: { label: string; href: string }) => {
    if (item.label === "Menu") {
      // Menuの場合はページ遷移
      return;
    } else {
      // その他はスクロール
      scrollToSection(item.href);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <button
            onClick={() => scrollToSection("#hero")}
            className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-ring rounded"
          >
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">P</span>
            </div>
            <div>
              <h1 className="font-medium text-lg">{SITE.name}</h1>
              <p className="text-xs text-muted-foreground">{SITE.subtitle}</p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" role="navigation" aria-label="メインナビゲーション">
            {NAV_ITEMS.map((item) => {
              if (item.label === "Menu") {
                return (
                  <Link
                    key={item.href}
                    href="/menu"
                    className="text-foreground hover:text-primary transition-colors py-2 focus:outline-none focus:ring-2 focus:ring-ring rounded"
                  >
                    {item.label}
                  </Link>
                );
              }
              return (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item)}
                  className="text-foreground hover:text-primary transition-colors py-2 focus:outline-none focus:ring-2 focus:ring-ring rounded"
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-3">
            <a
              href={`tel:${SITE.tel}`}
              className="inline-flex items-center justify-center rounded-lg px-6 py-3 font-medium transition-colors min-h-[44px] border border-border bg-background hover:bg-accent hover:text-accent-foreground space-x-2"
              aria-label={`電話番号 ${SITE.tel} に発信`}
            >
              <Phone className="w-4 h-4" />
              <span>お電話</span>
            </a>
            <a
              href={SITE.bookingUrl}
              id="headerReservationBtn"
              className="inline-flex items-center justify-center rounded-lg px-6 py-3 font-medium transition-colors min-h-[44px] bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Web予約
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 focus:outline-none focus:ring-2 focus:ring-ring rounded"
            aria-label="メニューを開く"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden border-t border-border py-4" role="navigation" aria-label="モバイルナビゲーション">
            <div className="flex flex-col space-y-4">
              {NAV_ITEMS.map((item) => {
                if (item.label === "Menu") {
                  return (
                    <Link
                      key={item.href}
                      href="/menu"
                      className="text-left py-2 text-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  );
                }
                return (
                  <button
                    key={item.href}
                    onClick={() => handleNavClick(item)}
                    className="text-left py-2 text-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded"
                  >
                    {item.label}
                  </button>
                );
              })}
              <div className="flex flex-col space-y-3 pt-4 border-t border-border">
                <a
                  href={`tel:${SITE.tel}`}
                  className="inline-flex items-center justify-center rounded-lg px-6 py-3 font-medium transition-colors min-h-[44px] border border-border bg-background hover:bg-accent hover:text-accent-foreground space-x-2"
                  aria-label={`電話番号 ${SITE.tel} に発信`}
                >
                  <Phone className="w-4 h-4" />
                  <span>お電話</span>
                </a>
                <a
                  href={SITE.bookingUrl}
                  className="inline-flex items-center justify-center rounded-lg px-6 py-3 font-medium transition-colors min-h-[44px] bg-primary text-primary-foreground hover:bg-primary/90 text-center"
                >
                  Web予約
                </a>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}