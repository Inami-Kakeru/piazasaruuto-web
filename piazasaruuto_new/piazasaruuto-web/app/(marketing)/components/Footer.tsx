import { Phone, Clock, MapPin, Instagram as InstagramIcon } from "lucide-react";
import { SITE } from "../../../lib/marketing/constants";

export function Footer() {
  return (
    <footer className="mk-footer">
      <div className="mk-container">
        <div className="mk-footer-grid">
          {/* サロン情報 */}
          <div className="mk-footer-section">
            <div className="mk-footer-brand">
              <div className="mk-footer-logo">
                <span className="mk-footer-logo-text">P</span>
              </div>
              <div>
                <h3 className="mk-footer-title">{SITE.name}</h3>
                <p className="mk-footer-subtitle">{SITE.subtitle}</p>
              </div>
            </div>
            <p className="mk-footer-description">
              世代を問わず愛される美容室として、お客様一人ひとりに寄り添ったサービスを提供いたします。
            </p>
            {/* クイックナビ */}
            <nav aria-label="フッターナビゲーション" className="mt-3">
              <div className="mk-footer-content">
                <a href="#hero" className="mk-footer-contact-link">ホーム</a>
                <a href="#menu-intro" className="mk-footer-contact-link">メニュー紹介</a>
                <a href="/menu" className="mk-footer-contact-link">メニュー詳細</a>
                <a href="#access" className="mk-footer-contact-link">アクセス</a>
                <a href="#instagram" className="mk-footer-contact-link">Instagram</a>
              </div>
            </nav>
          </div>

          {/* アクセス情報 */}
          <div className="mk-footer-section">
            <h4 className="mk-footer-section-title">
              <MapPin className="mk-footer-icon" />
              アクセス
            </h4>
            <div className="mk-footer-content">
              <p>{SITE.address}</p>
              <p className="mk-footer-note">
                西武池袋線「保谷駅」北口より徒歩1分
              </p>
            </div>
          </div>

          {/* 営業時間 */}
          <div className="mk-footer-section">
            <h4 className="mk-footer-section-title">
              <Clock className="mk-footer-icon" />
              営業時間
            </h4>
            <div className="mk-footer-content">
              <p>月・火・水・金・土</p>
              <p>10:00〜17:30</p>
              <p className="mk-footer-note">(カット最終 16:30)</p>
              <p className="mk-footer-note">日・木 定休日</p>
            </div>
          </div>

          {/* お問い合わせ */}
          <div className="mk-footer-section">
            <h4 className="mk-footer-section-title">お問い合わせ</h4>
            <div className="mk-footer-contact">
              <a
                href={`tel:${SITE.tel}`}
                className="mk-footer-contact-link"
              >
                <Phone className="mk-footer-contact-icon" />
                <span>{SITE.tel}</span>
              </a>
              <a
                href={SITE.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mk-footer-contact-link"
                aria-label="Instagramを開く"
              >
                <InstagramIcon className="mk-footer-contact-icon" />
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>

        {/* CTAボタン */}
        <div className="mk-footer-cta">
          <p className="mk-footer-cta-text">ご予約・お問い合わせはこちら</p>
          <div className="mk-footer-cta-buttons">
            <a
              href={SITE.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="footerReservationBtn"
              className="mk-btn mk-btn-primary"
              aria-label="ホットペッパービューティーでWeb予約"
            >
              Web予約
            </a>
            <a
              href={`tel:${SITE.tel}`}
              className="mk-btn mk-btn-secondary"
            >
              <Phone className="mk-icon" />
              <span>お電話</span>
            </a>
          </div>
        </div>

        {/* 著作権 */}
        <div className="mk-footer-copyright">
          <p>© 2024 {SITE.name} ({SITE.subtitle}). All rights reserved.</p>
          <p className="mt-2 text-sm">
            <a href="#hero" className="underline">トップに戻る</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

