import { STYLISTS } from "../../../lib/marketing/constants";

export function StylistGrid() {
  return (
    <section id="stylist" className="mk-stylist">
      <div className="mk-container">
        <div className="mk-stylist-header">
          <h2 className="mk-stylist-title">Stylist</h2>
          <p className="mk-stylist-subtitle">
            経験豊富なスタイリストがお客様の美しさを引き出します
          </p>
        </div>

        <div className="mk-stylist-grid">
          {STYLISTS.map((stylist, index) => (
            <div key={index} className="mk-stylist-card">
              <div className="mk-stylist-image-container">
                <img
                  src="https://images.unsplash.com/photo-1737063935340-f9af0940c4c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGhhaXJzdHlsaXN0JTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU3MDAyMDIyfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt={`${stylist.name}のプロフィール写真`}
                  className="mk-stylist-image"
                />
              </div>
              
              <h3 className="mk-stylist-name">{stylist.name}</h3>
              <div className="mk-stylist-title-text">
                {stylist.title}
              </div>
              <div className="mk-stylist-years">
                {stylist.years}
              </div>
              
              <blockquote className="mk-stylist-catch">
                &ldquo;{stylist.catch}&rdquo;
              </blockquote>
              
              <p className="mk-stylist-profile">
                {stylist.profile}
              </p>
              
              <div className="mk-stylist-specialties">
                <h4 className="mk-stylist-specialties-title">得意分野</h4>
                <p className="mk-stylist-specialties-text">
                  {stylist.specialties}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mk-stylist-footer">
          <p className="mk-stylist-footer-text">
            お気軽にご指名ください。スタイリストによる詳しい相談も承ります。
          </p>
          <a
            href={`tel:03-3978-4800`}
            className="mk-btn mk-btn-primary"
          >
            スタイリスト相談
          </a>
        </div>
      </div>
    </section>
  );
}
