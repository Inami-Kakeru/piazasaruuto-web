"use client";

import { useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { SITE, NAV_ITEMS } from "../../../lib/marketing/constants";
import { usePathname, useRouter } from "next/navigation";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const scrollToSection = (href: string) => {
    const element = typeof window !== "undefined" ? document.querySelector(href) : null;
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
      return;
    }

    if (pathname !== "/" && href.startsWith("#")) {
      router.push(`/${href}`);
      setIsMenuOpen(false);
      return;
    }
  };

  const handleNavClick = (href: string) => {
    if (href.startsWith("#")) {
      scrollToSection(href);
    } else {
      router.push(href);
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="mk-header">
      <div className="mk-header-topbar">
        <div className="mk-container">
          <p className="mk-header-topbar-text">
            Celebrating 30 years in Hoya. A neighborhood salon that cares for your hair and mind.
          </p>
        </div>
      </div>
      <div className="mk-container">
        <div className="mk-header-content">
          <button onClick={() => scrollToSection("#hero")} className="mk-header-brand">
            <div>
              <h1 className="mk-header-title">{SITE.name}</h1>
              <p className="mk-header-subtitle">{SITE.subtitle}</p>
            </div>
          </button>

          <nav className="mk-header-nav" role="navigation" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="mk-header-nav-link"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="mk-header-cta">
            <a
              href={`tel:${SITE.tel}`}
              className="mk-btn mk-btn-secondary"
              aria-label={`Call ${SITE.tel}`}
            >
              <Phone className="mk-icon" />
              <span>Call Us</span>
            </a>
            <span className="mk-btn mk-btn-disabled" role="status" aria-live="polite">
              Online Booking (Coming Soon)
            </span>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="mk-header-menu-btn"
            aria-label="Open menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="mk-icon" /> : <Menu className="mk-icon" />}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="mk-header-mobile-nav" role="navigation" aria-label="Mobile navigation">
            <div className="mk-header-mobile-content">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="mk-header-mobile-link"
                >
                  {item.label}
                </button>
              ))}
              <div className="mk-header-mobile-cta">
                <a
                  href={`tel:${SITE.tel}`}
                  className="mk-btn mk-btn-secondary"
                  aria-label={`Call ${SITE.tel}`}
                >
                  <Phone className="mk-icon" />
                  <span>Call Us</span>
                </a>
                <span className="mk-btn mk-btn-disabled" role="status" aria-live="polite">
                  Online Booking (Coming Soon)
                </span>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
