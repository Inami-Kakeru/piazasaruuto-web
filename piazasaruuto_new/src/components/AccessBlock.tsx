import { MapPin, Phone, Mail, Car, Clock } from "lucide-react";
import { SITE } from "../lib/constants";

export function AccessBlock() {
  return (
    <section id="access" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Access</h2>
          <p className="text-lg leading-relaxed max-w-2xl mx-auto text-muted-foreground">
            保谷駅から徒歩1分の便利な立地です
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* 地図エリア */}
          <div className="form-section">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-primary" />
              地図
            </h3>
            <div className="aspect-video rounded-lg overflow-hidden border border-border">
              <iframe
                src={SITE.mapEmbedSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="美容室ぴあざさるうとの地図"
              ></iframe>
            </div>
            <div className="mt-4 text-center">
              <a
                href={`https://www.google.com/maps/search/${encodeURIComponent(SITE.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg px-6 py-3 font-medium transition-colors min-h-[44px] border border-border bg-background hover:bg-accent hover:text-accent-foreground space-x-2"
              >
                <MapPin className="w-4 h-4" />
                <span>Googleマップで開く</span>
              </a>
            </div>
          </div>

          {/* アクセス情報 */}
          <div className="space-y-6">
            <div className="form-section">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-primary" />
                住所・アクセス
              </h3>
              <div className="space-y-3">
                <p className="font-medium">{SITE.address}</p>
                <p className="leading-relaxed text-muted-foreground">
                  {SITE.access}
                </p>
              </div>
            </div>

            <div className="form-section">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Phone className="w-5 h-5 mr-2 text-primary" />
                お問い合わせ
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <a
                    href={`tel:${SITE.tel}`}
                    className="font-medium hover:text-primary transition-colors"
                  >
                    {SITE.tel}
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <a
                    href={`mailto:${SITE.email}`}
                    className="font-medium hover:text-primary transition-colors"
                  >
                    {SITE.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-primary" />
                営業時間
              </h3>
              <p className="leading-relaxed">{SITE.hours_note}</p>
            </div>

            <div className="form-section">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Car className="w-5 h-5 mr-2 text-primary" />
                駐車場
              </h3>
              <p className="leading-relaxed text-muted-foreground">
                {SITE.parking}
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={SITE.bookingUrl}
              className="inline-flex items-center justify-center rounded-lg px-8 py-3 font-medium transition-colors min-h-[44px] bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Web予約
            </a>
            <a
              href={`tel:${SITE.tel}`}
              className="inline-flex items-center justify-center rounded-lg px-8 py-3 font-medium transition-colors min-h-[44px] border border-border bg-background hover:bg-accent hover:text-accent-foreground space-x-2"
            >
              <Phone className="w-4 h-4" />
              <span>お電話でのご予約</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}