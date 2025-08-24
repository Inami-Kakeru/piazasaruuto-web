# Cal.com ローカル環境セットアップ

## 前提条件
- Docker と Docker Compose がインストールされていること
- Supabase アカウントとプロジェクトが作成されていること

## セットアップ手順

### 1. 環境変数ファイルの作成

プロジェクトルートに `.env` ファイルを作成し、以下の内容を設定してください：

```env
# Cal.com Environment Variables
# Supabase PostgreSQL接続情報
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"

# 認証設定
NEXTAUTH_SECRET="your-nextauth-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Cal.com設定
CALCOM_TELEMETER_DISABLED="1"
NEXT_PUBLIC_WEBAPP_URL="http://localhost:3000"
NEXT_PUBLIC_WEBSITE_URL="http://localhost:3000"

# メール設定（開発環境用）
EMAIL_SERVER_HOST="localhost"
EMAIL_SERVER_PORT="1025"
EMAIL_SERVER_USER=""
EMAIL_SERVER_PASSWORD=""
EMAIL_FROM="noreply@localhost"

# 暗号化キー
ENCRYPTION_KEY="your-encryption-key-here"

# その他の設定
NODE_ENV="development"
```

### 2. Supabase接続情報の取得

1. Supabaseダッシュボードにログイン
2. プロジェクトを選択
3. Settings > Database に移動
4. Connection string セクションから以下を取得：
   - Host: `db.[YOUR-PROJECT-REF].supabase.co`
   - Database name: `postgres`
   - Port: `5432`
   - User: `postgres`
   - Password: プロジェクト作成時に設定したパスワード

### 3. 環境変数の設定

`.env` ファイル内の以下の値を実際の値に置き換えてください：

- `[YOUR-PASSWORD]`: Supabaseのデータベースパスワード
- `[YOUR-PROJECT-REF]`: Supabaseプロジェクトの参照ID
- `your-nextauth-secret-key-here`: 32文字以上のランダムな文字列
- `your-encryption-key-here`: 32文字以上のランダムな文字列

### 4. Docker Composeで起動

```bash
docker-compose up -d
```

### 5. データベースマイグレーション

初回起動時は、データベースのマイグレーションが必要です：

```bash
docker-compose exec calcom npx prisma db push
```

### 6. アプリケーションにアクセス

ブラウザで `http://localhost:3000` にアクセスしてCal.comを使用できます。

## トラブルシューティング

### データベース接続エラー
- Supabaseの接続情報が正しいか確認
- ファイアウォールでポート5432がブロックされていないか確認
- Supabaseプロジェクトが一時停止していないか確認

### アプリケーションが起動しない
- ログを確認：`docker-compose logs calcom`
- 環境変数が正しく設定されているか確認
- ポート3000が他のアプリケーションで使用されていないか確認

## 停止方法

```bash
docker-compose down
```

データも削除する場合：

```bash
docker-compose down -v
``` 