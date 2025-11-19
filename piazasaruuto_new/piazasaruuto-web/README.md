This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

### デプロイ手順

#### 方法1: Vercel CLIを使用

1. Vercel CLIをインストール（未インストールの場合）
   ```bash
   npm i -g vercel
   ```

2. プロジェクトルート（`piazasaruuto_new`）でログイン
   ```bash
   vercel login
   ```

3. デプロイ実行
   ```bash
   vercel
   ```
   
   初回デプロイ時は設定を確認します：
   - **Set up and deploy?** → `Y`
   - **Which scope?** → アカウントを選択
   - **Link to existing project?** → `N`（新規プロジェクトの場合）
   - **Project name?** → プロジェクト名を入力（例: `piazasaruuto-web`）
   - **Directory?** → `piazasaruuto-web` を指定
   - **Override settings?** → `N`

4. 本番環境にデプロイ
   ```bash
   vercel --prod
   ```

#### 方法2: Vercel Web UIを使用

1. [Vercel Dashboard](https://vercel.com/dashboard)にアクセス
2. 「Add New Project」をクリック
3. GitHubリポジトリを選択（またはGitリポジトリをインポート）
4. プロジェクト設定：
   - **Framework Preset**: Next.js
   - **Root Directory**: `piazasaruuto-web` に設定
   - **Build Command**: `npm run build`（自動検出されるはず）
   - **Output Directory**: `.next`（自動検出されるはず）
   - **Install Command**: `npm install`（自動検出されるはず）
5. 「Deploy」をクリック

### 注意事項

- プロジェクトは `piazasaruuto-web` サブディレクトリにあります
- ルートディレクトリを `piazasaruuto-web` に設定してください
- 環境変数は現在不要です（予約APIは使用していません）
- ビルドコマンドは `next build` を使用します（Turbopackは開発環境のみ）

### デプロイ後の確認

デプロイが完了したら、以下のURLでサイトにアクセスできます：
- プレビューURL: Vercelダッシュボードに表示されます
- 本番URL: カスタムドメインまたは `your-project.vercel.app`

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
