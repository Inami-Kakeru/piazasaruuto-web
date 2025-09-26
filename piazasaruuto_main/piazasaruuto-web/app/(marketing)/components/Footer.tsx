import { Phone, Mail, Clock, MapPin } from "lucide-react";
import { SITE } from "../../../lib/marketing/constants";

export function Footer() {
  return (
    <footer className="mk-footer">
      <div className="mk-container">
        <div className="mk-footer-grid">
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
              We are a community salon that delivers thoughtful service across generations.
            </p>
          </div>

          <div className="mk-footer-section">
            <h4 className="mk-footer-section-title">
              <MapPin className="mk-footer-icon" />
              Access
            </h4>
            <div className="mk-footer-content">
              <p>{SITE.address}</p>
              <p className="mk-footer-note">{SITE.access}</p>
            </div>
          </div>

          <div className="mk-footer-section">
            <h4 className="mk-footer-section-title">
              <Clock className="mk-footer-icon" />
              Business Hours
            </h4>
            <div className="mk-footer-content">
              <p>{SITE.hours_note}</p>
              <p className="mk-footer-note">Holiday hours are available on request.</p>
            </div>
          </div>

          <div className="mk-footer-section">
            <h4 className="mk-footer-section-title">Contact</h4>
            <div className="mk-footer-contact">
              <a href={`tel:${SITE.tel}`} className="mk-footer-contact-link">
                <Phone className="mk-footer-contact-icon" />
                <span>{SITE.tel}</span>
              </a>
              <a href={`mailto:${SITE.email}`} className="mk-footer-contact-link">
                <Mail className="mk-footer-contact-icon" />
                <span>{SITE.email}</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mk-footer-cta">
          <p className="mk-footer-cta-text">Need assistance? We are just a call away.</p>
          <div className="mk-footer-cta-buttons">
            <span id="footerReservationBtn" className="mk-btn mk-btn-disabled" role="status" aria-live="polite">
              Online Booking (Coming Soon)
            </span>
            <a href={`tel:${SITE.tel}`} className="mk-btn mk-btn-secondary">
              <Phone className="mk-icon" />
              <span>Call Us</span>
            </a>
          </div>
        </div>

        <div className="mk-footer-copyright">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
