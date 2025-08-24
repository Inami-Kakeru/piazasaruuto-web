# ぴあざさるうと 洗練スタイルガイド

---

## 1. カラーパレット

| 用途         | 色名      | コード      | CSSクラス例         |
|--------------|-----------|-------------|--------------------------|
| メイン       | primary   | #d4c5b9     | bg-primary, text-primary |
| アクセント   | secondary | #a8c9a8     | bg-secondary             |
| テキスト     | dark      | #5c4b3e     | text-dark                |
| 白           | white     | #fff        | bg-white, text-white     |
| 黒           | black     | #000        | text-black               |
| グレー       | gray      | #666        | text-gray                |

- 色数は最小限。背景・ボタン・テキストで迷わない配色。
- アクセントカラーは1ページ1箇所まで。
- コントラスト比4.5:1以上を推奨。

---

## 2. タイポグラフィ

| 用途         | フォント           | サイズ         | クラス例                      |
|--------------|--------------------|----------------|-------------------------------|
| 見出し1      | Noto Serif JP      | 2.25rem/3rem   | font-serif text-4xl md:text-5xl font-bold |
| 見出し2      | Noto Serif JP      | 1.875rem/2.25rem| font-serif text-3xl md:text-4xl font-bold |
| 見出し3      | Noto Sans JP       | 1.5rem/2rem    | font-sans text-2xl font-bold  |
| 本文         | Noto Sans JP       | 1rem/1.5rem    | font-sans text-base           |
| キャプション | Noto Sans JP       | 0.875rem/1.25rem| font-sans text-sm text-gray |

- 行間は1.5倍以上。
- 英字は大文字禁止。
- セクションタイトルは中央寄せ・余白大きめ。

---

## 3. 余白・レイアウト

- セクション間余白: `py-16`（スマホは`py-10`）
- コンテナ幅: `max-w-4xl mx-auto px-4`
- カード内余白: `p-6`
- グリッド間隔: `gap-8`（スマホは`gap-4`）
- レスポンシブ: 1カラム→2〜3カラム、`xs: 480px`, `sm: 640px`, `md: 768px`, `lg: 1024px`

---

## 4. ボタン・リンク

| 用途         | クラス例                                                                 |
|--------------|--------------------------------------------------------------------------|
| プライマリ   | `btn-primary` - `bg-primary text-dark rounded-full px-8 py-3 font-bold hover:bg-secondary transition` |
| セカンダリ   | `btn-secondary` - `border-2 border-primary text-primary rounded-full px-8 py-3 font-bold hover:bg-primary hover:text-dark transition` |
| テキストリンク| `text-link` - `text-primary underline hover:text-secondary transition`                |

- 角丸は`rounded-full`推奨。
- 影やアニメーションは最小限。
- ボタンは1画面1つまでが理想。

---

## 5. アイコン・画像

- SVGアイコンのみ。色は`currentColor`で統一。
- 画像は`rounded-2xl`で角丸、`object-cover`でトリミング。
- ギャラリーは最大3列グリッド。
- alt属性必須。

---

## 6. カード・セクション

- カード: `bg-white rounded-3xl shadow-lg p-6`
- セクションタイトル: `text-3xl md:text-4xl font-bold text-center my-8 text-dark font-serif`
- CTAセクション: `bg-secondary text-dark rounded-3xl p-8 text-center`

---

## 7. ナビゲーション・フッター

- ナビ: テキストリンクのみ、アイコン不要。`flex gap-8 justify-center py-4`
- フッター: `text-sm text-gray-500 text-center py-6`

---

## 8. アクセシビリティ

- alt属性必須
- コントラスト比4.5:1以上
- aria-label, role属性を適切に

---

## 9. 禁止事項

- グラデーション多用
- 影の多重付与
- 余計なアニメーション
- 画像の枠線・ドロップシャドウ
- 1画面に複数CTA
- 情報の詰め込み・小さい文字

---

## 10. サンプル実装例

```html
<main class="max-w-4xl mx-auto px-4 py-16">
  <h2 class="font-serif text-3xl md:text-4xl font-bold text-center my-8 text-dark">
    コンセプト
  </h2>
  <p class="font-sans text-base md:text-lg text-dark leading-relaxed mb-8">
    ここに本文が入ります。余白と行間を意識して、シンプルに。
  </p>
  <button class="btn-primary">
    ご予約はこちら
  </button>
</main>
```

---

## 11. CSSクラス一覧

### 色クラス
```css
.text-primary { color: #d4c5b9; }
.text-secondary { color: #a8c9a8; }
.text-dark { color: #5c4b3e; }
.text-white { color: #fff; }
.text-gray { color: #666; }

.bg-primary { background-color: #d4c5b9; }
.bg-secondary { background-color: #a8c9a8; }
.bg-dark { background-color: #5c4b3e; }
.bg-white { background-color: #fff; }
```

### フォントクラス
```css
.font-serif { font-family: 'Noto Serif JP', serif; }
.font-sans { font-family: 'Noto Sans JP', sans-serif; }
```

### 角丸クラス
```css
.rounded-full { border-radius: 50px; }
.rounded-lg { border-radius: 12px; }
.rounded-xl { border-radius: 16px; }
.rounded-2xl { border-radius: 24px; }
.rounded-3xl { border-radius: 32px; }
```

### 影クラス
```css
.shadow-sm { box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
.shadow-md { box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
.shadow-lg { box-shadow: 0 10px 15px rgba(0,0,0,0.1); }
```

### ボタンクラス
```css
.btn-primary {
    background-color: #d4c5b9;
    color: #5c4b3e;
    border: none;
    border-radius: 50px;
    padding: 12px 32px;
    font-weight: bold;
    font-size: 14px;
    text-decoration: none;
    display: inline-block;
    transition: background-color 0.3s ease;
    cursor: pointer;
}

.btn-primary:hover {
    background-color: #a8c9a8;
}

.btn-secondary {
    background-color: transparent;
    color: #d4c5b9;
    border: 2px solid #d4c5b9;
    border-radius: 50px;
    padding: 10px 30px;
    font-weight: bold;
    font-size: 14px;
    text-decoration: none;
    display: inline-block;
    transition: all 0.3s ease;
    cursor: pointer;
}

.btn-secondary:hover {
    background-color: #d4c5b9;
    color: #5c4b3e;
}

.text-link {
    color: #d4c5b9;
    text-decoration: underline;
    transition: color 0.3s ease;
}

.text-link:hover {
    color: #a8c9a8;
}
```

---

## 12. レスポンシブ対応

### ブレークポイント
- xs: 480px
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px

### 例
```css
/* デスクトップ */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* タブレット */
@media (max-width: 768px) {
    .container {
        padding: 0 15px;
    }
}

/* スマートフォン */
@media (max-width: 480px) {
    .container {
        padding: 0 10px;
    }
}
```

---

このガイドは全ページ・全コンポーネントで徹底し、常に「余白・整理・最小限」を意識してください。 