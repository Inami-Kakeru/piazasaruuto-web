import { Phone, ArrowLeft, Clock, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { SITE } from "../../lib/constants";

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* ヘッダー */}
      <header className="border-b border-border pt-16">
        <div className="container mx-auto px-4 py-4">
          <Link 
            href="/"
            className="inline-flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>ホームに戻る</span>
          </Link>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container mx-auto px-4 py-16 max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Web予約</h1>
          <p className="text-lg text-muted-foreground">
            ご予約・お問い合わせについて
          </p>
        </div>

        <div className="space-y-8">
          {/* 現在の状況 */}
          <div className="form-section text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-bold mb-4">Web予約は現在準備中です</h2>
            <p className="leading-relaxed text-muted-foreground mb-6">
              オンライン予約システムの準備を進めております。<br />
              現在はお電話でのご予約を承っておりますので、お気軽にお電話ください。
            </p>
            
            <a
              href={`tel:${SITE.tel}`}
              className="inline-flex items-center justify-center rounded-lg px-8 py-4 font-medium transition-colors min-h-[44px] bg-primary text-primary-foreground hover:bg-primary/90 text-lg space-x-3"
            >
              <Phone className="w-5 h-5" />
              <span>{SITE.tel}</span>
            </a>
          </div>

          {/* 営業時間 */}
          <div className="form-section">
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-primary" />
              営業時間
            </h3>
            <div className="space-y-2">
              <p><strong>月・火・水・金・土:</strong> 10:00〜17:30</p>
              <p className="text-sm text-muted-foreground">（カット最終受付 16:30）</p>
              <p><strong>定休日:</strong> 日・木</p>
            </div>
          </div>

          {/* お電話でのご予約の流れ */}
          <div className="form-section">
            <h3 className="text-lg font-bold mb-4">お電話でのご予約の流れ</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mt-0.5">1</div>
                <div>
                  <p className="font-medium">お電話をおかけください</p>
                  <p className="text-sm text-muted-foreground">{SITE.tel}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mt-0.5">2</div>
                <div>
                  <p className="font-medium">ご希望をお聞かせください</p>
                  <p className="text-sm text-muted-foreground">施術内容、ご希望日時、スタイリストの指名など</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mt-0.5">3</div>
                <div>
                  <p className="font-medium">予約完了</p>
                  <p className="text-sm text-muted-foreground">確認のため、お名前とお電話番号をお聞きします</p>
                </div>
              </div>
            </div>
          </div>

          {/* お願い */}
          <div className="form-section border-l-4 border-l-primary">
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-primary" />
              ご予約の際のお願い
            </h3>
            <ul className="space-y-2 text-sm">
              <li>・ 初回のお客様は、カウンセリングのお時間をいただくため、お時間に余裕を持ってお越しください</li>
              <li>・ キャンセルの場合は、できるだけ早めにご連絡をお願いいたします</li>
              <li>・ 駐車場には限りがございますので、お車でお越しの際は事前にお知らせください</li>
            </ul>
          </div>
        </div>

        {/* フッターCTA */}
        <div className="text-center mt-12 pt-8 border-t border-border">
          <p className="mb-6 text-muted-foreground">
            その他ご質問がございましたら、お気軽にお問い合わせください
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${SITE.tel}`}
              className="inline-flex items-center justify-center rounded-lg px-8 py-3 font-medium transition-colors min-h-[44px] bg-primary text-primary-foreground hover:bg-primary/90 space-x-2"
            >
              <Phone className="w-4 h-4" />
              <span>電話をかける</span>
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="inline-flex items-center justify-center rounded-lg px-8 py-3 font-medium transition-colors min-h-[44px] border border-border bg-background hover:bg-accent hover:text-accent-foreground"
            >
              メールで問い合わせ
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}