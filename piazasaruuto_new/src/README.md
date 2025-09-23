# 美容室ぴあざさるうと - ホームページ

60代女性を主ペルソナとした美容室のランディングページです。アクセシビリティと読みやすさを重視した設計となっています。

## 技術スタック

- **フレームワーク**: Next.js 14 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS v4 + カスタムCSS変数
- **UIコンポーネント**: shadcn/ui
- **アイコン**: Lucide React
- **スライダー**: Swiper.js
- **フォント**: Google Fonts (Noto Sans JP, Noto Serif JP)

## 主要機能

### ページ構成
- **ランディングページ** (`/`): ヒーロー、About、メニュー、スタイリスト、アクセス、Instagram
- **予約ページ** (`/booking`): 現在は案内文+電話CTA（将来的にCal.com連携予定）

### デザイン特徴
- **露出比制御**: エクステ : その他サービス = 1 : 2 の比率でメニュー表示
- **アクセシビリティ**: WCAG AA準拠、キーボードナビゲーション、スクリーンリーダー対応
- **レスポンシブ**: モバイルファーストデザイン
- **パフォーマンス**: 画像遅延読み込み、CLS最適化

## セットアップ

### 1. 依存関係のインストール
```bash
npm install
```

### 2. 開発サーバーの起動
```bash
npm run dev
```

### 3. 本番ビルド
```bash
npm run build
npm start
```

## カスタマイズ方法

### サイト情報の変更
`lib/constants.ts` でサロン情報を編集できます：

```typescript
export const SITE = {
  name: "ぴあざさるうと",
  tel: "03-3978-4800",
  address: "〒178-0064 東京都練馬区南大泉5-35-8",
  // ...その他設定
}
```

### 画像の差し替え
- ヒーロー画像: `components/Hero.tsx` の ImageWithFallback src 属性
- スタイリスト写真: `components/StylistGrid.tsx` の ImageWithFallback src 属性  
- Instagram画像: `components/InstagramSlider.tsx` の instagramPosts 配列

### メニュー・価格の変更
`lib/constants.ts` の MENU オブジェクトを編集：

```typescript
export const MENU = {
  cut: [
    { name: "カット（シャンプー・ブロー込）", price: "¥5,040" },
    // ...
  ],
  // ...
}
```

### スタイリスト情報の変更
`lib/constants.ts` の STYLISTS 配列を編集：

```typescript
export const STYLISTS = [
  {
    name: "松本 貴子",
    title: "トップスタイリスト",
    // ...
  },
  // ...
]
```

## 予約システム連携

### Cal.com連携（準備済み）
`lib/constants.ts` で `SITE.bookingUrl` をCal.comのURLに変更することで、Web予約機能を有効化できます。

```typescript
export const SITE = {
  // ...
  bookingUrl: "https://cal.com/your-calendar-link", // "/booking" から変更
  // ...
}
```

### Supabase連携
将来的にSupabaseを使用する場合の予約データベース設計例：

```sql
-- 予約テーブル
CREATE TABLE reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  stylist_id TEXT,
  service_type TEXT NOT NULL,
  appointment_date TIMESTAMP NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## デザインシステム

### 色とタイポグラフィ
- 見出し: Noto Serif JP (和文セリフ)
- 本文: Noto Sans JP (和文サンセリフ)
- プライマリカラー: `--primary` (#030213)
- セカンダリカラー: `--secondary` (ライトグレー系)

### アクセシビリティ配慮
- 最小フォントサイズ: 16px (推奨18px)
- タップターゲット: 最小44px × 44px
- コントラスト比: WCAG AA基準準拠
- フォーカスリング: キーボードナビゲーション対応

## SEO最適化

### 構造化データ
- HairSalon スキーマ実装済み
- 営業時間、住所、電話番号を検索エンジンに提供

### メタデータ
- OGP設定済み
- 適切なtitle/description設定

## パフォーマンス最適化

### 画像
- Next.js Image コンポーネント使用
- 適切なsizes属性設定
- 遅延読み込み実装

### JavaScript
- Swiper: クライアントサイドでのみ読み込み
- 動的インポートでコード分割

## トラブルシューティング

### よくある問題

**Q: Swiperが表示されない**
A: SSRの問題の可能性があります。`SwiperWrapper.tsx`が`dynamic`インポートされているか確認してください。

**Q: 画像が表示されない**
A: Unsplashの画像URLが変更されている可能性があります。新しい画像URLに差し替えてください。

**Q: フォントが読み込まれない**
A: `styles/globals.css`のGoogle Fontsインポートが正しく設定されているか確認してください。

## ライセンス

このプロジェクトは美容室ぴあざさるうと専用のWebサイトです。