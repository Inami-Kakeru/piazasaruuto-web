import { Phone, Mail, Clock, MapPin } from "lucide-react";
import { SITE } from "../lib/constants";

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* サロン情報 */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">P</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">{SITE.name}</h3>
                <p className="text-sm text-muted-foreground">{SITE.subtitle}</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed">
              世代を問わず愛される美容室として、お客様一人ひとりに寄り添ったサービスを提供いたします。
            </p>
          </div>

          {/* アクセス情報 */}
          <div>
            <h4 className="font-bold mb-4 flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              アクセス
            </h4>
            <div className="space-y-2 text-sm">
              <p>{SITE.address}</p>
              <p className="text-muted-foreground">
                西武池袋線「保谷駅」北口より徒歩1分
              </p>
            </div>
          </div>

          {/* 営業時間 */}
          <div>
            <h4 className="font-bold mb-4 flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              営業時間
            </h4>
            <div className="space-y-1 text-sm">
              <p>月・火・水・金・土</p>
              <p>10:00〜17:30</p>
              <p className="text-muted-foreground">(カット最終 16:30)</p>
              <p className="text-muted-foreground">日・木 定休日</p>
            </div>
          </div>

          {/* お問い合わせ */}
          <div>
            <h4 className="font-bold mb-4">お問い合わせ</h4>
            <div className="space-y-3 text-sm">
              <a
                href={`tel:${SITE.tel}`}
                className="flex items-center space-x-2 hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>{SITE.tel}</span>
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-center space-x-2 hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>{SITE.email}</span>
              </a>
            </div>
          </div>
        </div>

        {/* CTAボタン */}
        <div className="text-center mb-12 py-8 border-t border-border">
          <p className="mb-6 text-lg">ご予約・お問い合わせはこちら</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={SITE.bookingUrl}
              id="footerReservationBtn"
              className="inline-flex items-center justify-center rounded-lg px-8 py-3 font-medium transition-colors min-h-[44px] bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Web予約
            </a>
            <a
              href={`tel:${SITE.tel}`}
              className="inline-flex items-center justify-center rounded-lg px-8 py-3 font-medium transition-colors min-h-[44px] border border-border bg-background hover:bg-accent hover:text-accent-foreground space-x-2"
            >
              <Phone className="w-4 h-4" />
              <span>お電話</span>
            </a>
          </div>
        </div>

        {/* 著作権 */}
        <div className="text-center text-sm text-muted-foreground border-t border-border pt-8">
          <p>© 2024 {SITE.name} ({SITE.subtitle}). All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}