// env.mjs
// 環境変数バリデーション（起動時にチェック）

import { z } from 'zod';

const envSchema = z.object({
  CAL_BASE_URL: z.string().url('CAL_BASE_URL must be a valid URL'),
  CAL_API_KEY: z.string().min(1, 'CAL_API_KEY is required'),
  CAL_EVENT_TYPE_ID: z.string().min(1, 'CAL_EVENT_TYPE_ID is required').transform(Number),
  CAL_DEFAULT_TZ: z.string().default('Asia/Tokyo'),
});

function validateEnv() {
  try {
    const env = envSchema.parse(process.env);
    console.log('✅ Environment variables validated successfully');
    return env;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Environment validation failed:');
      error.errors.forEach((err) => {
        console.error(`  - ${err.path.join('.')}: ${err.message}`);
      });
    }
    process.exit(1);
  }
}

// 起動時に実行
export const env = validateEnv();
