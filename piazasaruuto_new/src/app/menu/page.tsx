"use client";

import { ArrowLeft, Phone, Clock, Star } from "lucide-react";
import Link from "next/link";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { SITE, MENU } from "../../lib/constants";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";

interface DetailedMenuItemProps {
  name: string;
  price: string;
  description?: string;
  duration?: string;
  features?: string[];
}

function DetailedMenuItem({ name, price, description, duration, features }: DetailedMenuItemProps) {
  return (
    <div className="form-section hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-bold text-lg">{name}</h3>
        <span className="text-primary font-bold text-lg">{price}</span>
      </div>
      
      {description && (
        <p className="text-muted-foreground mb-3 leading-relaxed">{description}</p>
      )}
      
      {duration && (
        <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>施術時間: {duration}</span>
        </div>
      )}
      
      {features && features.length > 0 && (
        <div className="space-y-1">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <Star className="w-3 h-3 text-primary fill-primary" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface MenuCategoryProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  highlight?: boolean;
}

function MenuCategory({ title, subtitle, children, highlight = false }: MenuCategoryProps) {
  return (
    <section className={`mb-12 ${highlight ? 'bg-primary/5 p-8 rounded-lg' : ''}`}>
      <div className="text-center mb-8">
        <h2 className={`text-2xl md:text-3xl font-bold mb-2 ${highlight ? 'text-primary' : ''}`}>
          {title}
        </h2>
        {subtitle && (
          <p className="text-muted-foreground leading-relaxed">{subtitle}</p>
        )}
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {children}
      </div>
    </section>
  );
}

export default function MenuPage() {
  return (
    <div className="min-h-screen">
      <Header />
      {/* ヘッダー */}
      <div className="bg-primary/5 py-8 md:py-12 pt-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center gap-4 mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              ホームに戻る
            </Link>
          </div>
          
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Menu</h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              お客様一人ひとりの髪質やライフスタイルに合わせた、こだわりのメニューをご提案いたします
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl py-12">
        {/* カットメニュー */}
        <MenuCategory 
          title="カット"
          subtitle="お客様の骨格と髪質に合わせた、お手入れが楽なスタイルをご提案"
        >
          <DetailedMenuItem
            name="カット（シャンプー・ブロー込）"
            price="¥5,040"
            description="骨格診断に基づいたカットで、お顔立ちを美しく見せるシルエットを作ります。お手入れしやすく、スタイリングが簡単なデザインをご提案。"
            duration="約60分"
            features={[
              "骨格に合わせたカット技術",
              "お手入れが楽なスタイル提案",
              "眉毛カットも対応可能"
            ]}
          />
          <DetailedMenuItem
            name="前髪カット"
            price="¥1,500～"
            description="印象を大きく左右する前髪を丁寧にカット。お顔の形に合わせて最適なバランスに調整いたします。"
            duration="約15分"
            features={[
              "顔型に合わせた前髪デザイン",
              "自然な仕上がり",
              "スタイリングしやすい長さ"
            ]}
          />
        </MenuCategory>

        {/* カラーメニュー */}
        <MenuCategory 
          title="カラー"
          subtitle="髪と頭皮に優しい薬剤を使用し、美しい発色と持続性を実現"
        >
          <DetailedMenuItem
            name="イノアオイルカラー（白髪対応）"
            price="¥9,880～"
            description="アンモニア不使用のオイルベースカラーで、髪のダメージを最小限に抑えながら美しい発色を実現。白髪もしっかりカバーします。"
            duration="約90分"
            features={[
              "アンモニア不使用で低刺激",
              "白髪100%カバー",
              "ツヤと潤いをキープ",
              "色持ちが良い"
            ]}
          />
          <DetailedMenuItem
            name="ヘナカラー（低刺激）"
            price="¥8,070～"
            description="植物由来100%のヘナを使用した、とても優しいカラーリング。敏感肌の方も安心してご利用いただけます。"
            duration="約120分"
            features={[
              "100%天然植物成分",
              "頭皮と髪に優しい",
              "トリートメント効果",
              "アレルギーの方も相談可"
            ]}
          />
        </MenuCategory>

        {/* パーマメニュー */}
        <MenuCategory 
          title="パーマ"
          subtitle="自然なカールでボリュームアップ、朝のスタイリングが楽になります"
        >
          <DetailedMenuItem
            name="パーマ＋カット"
            price="¥13,000～"
            description="髪質に合わせた薬剤選択で、自然で美しいカールを作ります。ボリュームが気になる方にもおすすめです。"
            duration="約150分"
            features={[
              "髪質に合わせた薬剤選択",
              "自然なボリューム感",
              "スタイリングが簡単",
              "持続性の良い仕上がり"
            ]}
          />
          <DetailedMenuItem
            name="前髪ストレートパーマ"
            price="要問い合わせ"
            description="クセが気になる前髪部分のみをナチュラルにストレートに。自然な仕上がりで扱いやすくなります。"
            duration="約60分"
            features={[
              "部分的な施術で髪への負担軽減",
              "自然なストレート感",
              "朝のセットが楽に"
            ]}
          />
        </MenuCategory>

        {/* ヘッドスパ・トリートメント */}
        <MenuCategory 
          title="ヘッドスパ・トリートメント"
          subtitle="頭皮ケアと髪の補修で、健やかで美しい髪へ"
        >
          <DetailedMenuItem
            name="カット＋ヘッドスパ"
            price="¥6,250"
            description="頭皮の血行を促進し、リラクゼーション効果の高いヘッドスパ。髪と頭皮の健康をサポートします。"
            duration="約90分"
            features={[
              "頭皮の血行促進",
              "リラクゼーション効果",
              "髪と頭皮の健康ケア",
              "育毛効果も期待"
            ]}
          />
          <DetailedMenuItem
            name="TOKIOインカラミトリートメント"
            price="¥8,100～"
            description="最新技術のインカラミトリートメントで、髪の内部から補修。驚くほどの手触りとツヤを実感いただけます。"
            duration="約45分"
            features={[
              "髪の内部補修技術",
              "持続性が高い",
              "手触りとツヤが向上",
              "カラーやパーマの持ちも良くなる"
            ]}
          />
        </MenuCategory>

        {/* 増毛エクステメニュー（特別セクション） */}
        <MenuCategory 
          title="増毛エクステ"
          subtitle="自然なボリュームアップで、理想のヘアスタイルを実現"
          highlight={true}
        >
          <div className="md:col-span-2">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <DetailedMenuItem
                  name="ボリュームアップエクステ"
                  price="要問い合わせ"
                  description="髪のボリュームが気になる部分に、自然な仕上がりのエクステを装着。年齢と共に気になる髪の悩みを解決します。"
                  duration="約120分～"
                  features={[
                    "自然な仕上がり",
                    "部分的なボリュームアップ可能",
                    "髪の分け目や頭頂部の薄毛カバー",
                    "軽い付け心地",
                    "丁寧なカウンセリング"
                  ]}
                />
                
                <div className="mt-6 p-4 bg-background rounded-lg border border-primary/20">
                  <h4 className="font-bold text-primary mb-2">エクステ専門スタイリスト</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    中山真美（オーナー）がエアリーエクステの技術で、お客様の髪の悩みを丁寧に解決いたします。
                  </p>
                  <p className="text-sm font-medium">
                    対応：ボリュームUP、髪の割れ改善、頭皮透け改善、ふんわりヘアーをサポート
                  </p>
                </div>
              </div>
              
              <div className="text-center">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1562940215-4314619607a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwZXh0ZW5zaW9uJTIwdm9sdW1lJTIwc2Fsb258ZW58MXx8fHwxNzU3MDAzNTg4fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="エクステ施術例"
                  className="w-full max-w-sm mx-auto rounded-lg shadow-lg"
                  width={400}
                  height={300}
                />
                <p className="text-sm text-muted-foreground mt-3">
                  ※イメージ画像です
                </p>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <div className="bg-background p-6 rounded-lg border border-primary/20">
                <h4 className="font-bold mb-3">エクステ無料カウンセリング実施中</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  お客様の髪質や悩みに合わせて、最適な施術方法をご提案いたします。<br />
                  料金や施術内容について、お気軽にご相談ください。
                </p>
                <a
                  href={`tel:${SITE.tel}`}
                  className="inline-flex items-center gap-2 btn-primary"
                >
                  <Phone className="w-4 h-4" />
                  エクステ相談のお電話
                </a>
              </div>
            </div>
          </div>
        </MenuCategory>

        {/* 予約・お問い合わせ */}
        <div className="text-center bg-muted/30 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">ご予約・お問い合わせ</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            ご不明な点やご相談がございましたら、お気軽にお問い合わせください。<br />
            お客様に最適なメニューをご提案させていただきます。
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking"
              className="btn-primary"
            >
              Web予約
            </Link>
            <a
              href={`tel:${SITE.tel}`}
              className="btn-outline inline-flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              お電話 {SITE.tel}
            </a>
          </div>
          
          <div className="mt-6 text-sm text-muted-foreground">
            <p className="mb-2">営業時間: {SITE.hours_note}</p>
            <p>※料金は全て税込価格です</p>
          </div>
        </div>
      </div>

      {/* JSON-LD 構造化データ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "美容室ぴあざさるうとのメニュー",
            "description": "60代女性をメインターゲットとした美容室の詳細メニュー。カット、カラー、パーマ、ヘッドスパ、トリートメント、増毛エクステなど豊富なメニューをご用意。",
            "provider": {
              "@type": "HairSalon",
              "name": SITE.name,
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "南大泉5-35-8",
                "addressLocality": "練馬区",
                "addressRegion": "東京都",
                "postalCode": "178-0064",
                "addressCountry": "JP"
              },
              "telephone": SITE.tel
            },
            "serviceType": ["ヘアカット", "ヘアカラー", "パーマ", "ヘッドスパ", "トリートメント", "増毛エクステ"],
            "areaServed": "東京都練馬区",
            "url": typeof window !== "undefined" ? `${window.location.origin}/menu` : ""
          })
        }}
      />

      <Footer />
    </div>
  );
}