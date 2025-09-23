import Link from "next/link";
import { MENU } from "../lib/constants";

interface MenuCategoryProps {
  title: string;
  items: readonly { name: string; price: string }[];
  className?: string;
}

function MenuCategory({ title, items, className = "" }: MenuCategoryProps) {
  return (
    <div className={`form-section ${className}`}>
      <h3 className="text-xl font-bold mb-4 text-center">{title}</h3>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="font-medium">{item.name}</span>
            <span className="text-primary font-bold">{item.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MenuGrid() {
  return (
    <section id="menu" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Menu</h2>
          <p className="text-lg leading-relaxed max-w-2xl mx-auto text-muted-foreground">
            お客様のご要望に合わせた豊富なメニューをご用意しております
          </p>
        </div>

        {/* メインサービス（エクステ以外）- 大きめのカード */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <MenuCategory
            title="カット"
            items={MENU.cut}
            className="lg:col-span-1 lg:row-span-1"
          />
          <MenuCategory
            title="カラー"
            items={MENU.color}
            className="lg:col-span-1 lg:row-span-1"
          />
          <MenuCategory
            title="パーマ"
            items={MENU.perm}
            className="lg:col-span-1 lg:row-span-1"
          />
          <MenuCategory
            title="ヘッドスパ"
            items={MENU.spa}
            className="md:col-span-1"
          />
          <MenuCategory
            title="トリートメント"
            items={MENU.treatment}
            className="md:col-span-1"
          />
        </div>

        {/* エクステメニュー - 特別セクション */}
        <div className="bg-primary/5 p-6 rounded-lg mb-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-primary mb-2">増毛エクステ</h3>
            <p className="text-muted-foreground">
              自然なボリュームアップで、髪の悩みを解決します
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <MenuCategory
              title="ボリュームアップエクステ"
              items={MENU.extension}
              className="border-2 border-primary/20"
            />
            
            <div className="space-y-4">
              <div className="bg-background p-4 rounded-lg border border-primary/20">
                <h4 className="font-bold text-primary mb-2">こんなお悩みに</h4>
                <ul className="text-sm space-y-1">
                  <li>• 髪のボリュームが気になる</li>
                  <li>• 分け目や頭頂部の薄毛が気になる</li>
                  <li>• ふんわりとした髪型にしたい</li>
                </ul>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-3">
                  専門スタイリストによる丁寧なカウンセリング
                </p>
                <a
                  href={`tel:03-3978-4800`}
                  className="inline-flex items-center justify-center rounded-lg px-4 py-2 font-medium transition-colors min-h-[44px] bg-primary text-primary-foreground hover:bg-primary/90 text-sm"
                >
                  エクステ相談
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* フッター情報 */}
        <div className="text-center">
          <p className="mb-4 leading-relaxed">
            詳しい情報は、
            <Link href="/menu" className="text-primary hover:underline font-medium">
              メニュー詳細
            </Link>
            をご覧ください。ご不明な点がございましたら、
            <a href={`tel:03-3978-4800`} className="text-primary hover:underline font-medium">
              ご連絡
            </a>
            くださいませ。
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking"
              className="inline-flex items-center justify-center rounded-lg px-8 py-3 font-medium transition-colors min-h-[44px] bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Web予約
            </Link>
            <a
              href={`tel:03-3978-4800`}
              className="inline-flex items-center justify-center rounded-lg px-8 py-3 font-medium transition-colors min-h-[44px] border border-border bg-background hover:bg-accent hover:text-accent-foreground"
            >
              お電話でのご予約
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}