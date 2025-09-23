import Link from "next/link";
import { MENU } from "../../../lib/marketing/constants";

interface MenuCategoryProps {
  title: string;
  items: readonly { name: string; price: string }[];
  className?: string;
}

function MenuCategory({ title, items, className = "" }: MenuCategoryProps) {
  return (
    <div className={`mk-menu-category ${className}`}>
      <h3 className="mk-menu-category-title">{title}</h3>
      <div className="mk-menu-items">
        {items.map((item, index) => (
          <div key={index} className="mk-menu-item">
            <span className="mk-menu-item-name">{item.name}</span>
            <span className="mk-menu-item-price">{item.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MenuGrid() {
  return (
    <section id="menu" className="mk-menu">
      <div className="mk-container">
        <div className="mk-menu-header">
          <h2 className="mk-menu-title">Menu</h2>
          <p className="mk-menu-subtitle">
            お客様のご要望に合わせた豊富なメニューをご用意しております
          </p>
        </div>

        {/* メインサービス（エクステ以外）- 大きめのカード */}
        <div className="mk-menu-grid">
          <MenuCategory
            title="カット"
            items={MENU.cut}
            className="mk-menu-category-main"
          />
          <MenuCategory
            title="カラー"
            items={MENU.color}
            className="mk-menu-category-main"
          />
          <MenuCategory
            title="パーマ"
            items={MENU.perm}
            className="mk-menu-category-main"
          />
          <MenuCategory
            title="ヘッドスパ"
            items={MENU.spa}
            className="mk-menu-category-main"
          />
          <MenuCategory
            title="トリートメント"
            items={MENU.treatment}
            className="mk-menu-category-main"
          />
        </div>

        {/* エクステメニュー - 特別セクション */}
        <div className="mk-extension-section">
          <div className="mk-extension-header">
            <h2 className="mk-extension-title">増毛エクステ</h2>
            <p className="mk-extension-subtitle">
              自然なボリュームアップで、髪の悩みを解決します
            </p>
          </div>
          
          <div className="mk-extension-grid">
            {/* 左カード: メニュー */}
            <div className="mk-extension-card">
              <h3 className="mk-extension-card-title">メニュー</h3>
              <ul className="mk-extension-menu-list">
                <li>ボリュームアップエクステ</li>
                <li>ナチュラルエクステ</li>
                <li>ヘアライン補正</li>
                <li>頭頂部ボリュームアップ</li>
              </ul>
              <div className="mk-extension-card-footer">
                <a
                  href={`tel:03-3978-4800`}
                  className="mk-extension-link"
                >
                  メニュー詳細・お問い合わせ
                </a>
              </div>
            </div>
            
            {/* 右カード: こんなお悩み */}
            <div className="mk-extension-card">
              <h3 className="mk-extension-card-title">こんなお悩みに</h3>
              <ul className="mk-extension-problems-list">
                <li>髪のボリュームが気になる</li>
                <li>分け目や頭頂部の薄毛が気になる</li>
                <li>ふんわりとした髪型にしたい</li>
                <li>髪の毛が細くてボリュームが出ない</li>
              </ul>
            </div>
          </div>
          
          {/* 下段CTA */}
          <div className="mk-extension-cta">
            <a
              href={`tel:03-3978-4800`}
              className="mk-btn mk-btn-primary mk-extension-cta-btn"
              aria-label="エクステ相談を予約する"
            >
              エクステ相談
            </a>
            <p className="mk-extension-cta-caption">
              専門スタイリストによる丁寧なカウンセリング
            </p>
          </div>
        </div>

        {/* フッター情報 */}
        <div className="mk-menu-footer">
          <p className="mk-menu-footer-text">
            詳しい情報は、
            <Link href="/menu" className="mk-menu-footer-link">
              メニュー詳細
            </Link>
            をご覧ください。ご不明な点がございましたら、
            <a href={`tel:03-3978-4800`} className="mk-menu-footer-link">
              ご連絡
            </a>
            くださいませ。
          </p>
          
          <div className="mk-menu-footer-buttons">
            <Link
              href="/booking/menu"
              className="mk-btn mk-btn-primary"
            >
              Web予約
            </Link>
            <a
              href={`tel:03-3978-4800`}
              className="mk-btn mk-btn-secondary"
            >
              お電話でのご予約
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
