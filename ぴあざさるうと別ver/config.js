// Cal.com API Configuration
// このファイルは環境変数を管理します
window.CAL_CONFIG = {
  // Cal.com API設定
  CAL_API_BASE: 'https://api.cal.com',
  CAL_API_KEY: 'cal_live_3612d68cd60686f0545892baf99e1e56', // 実際のAPIキーに置き換えてください
  CAL_API_VERSION: 'v2',
  
  // Webhook設定
  CAL_WEBHOOK_SECRET: 'whsec_fffhhahijigsighioabn',
  WEBHOOK_PUBLIC_URL: 'https://your-domain.com/api/webhook/cal',
  
  // イベントタイプID
  EVENT_TYPE_ID: '稲見駆-7zb7cf/15min',
  
  // 営業時間設定
  BUSINESS_HOURS: {
    start: '10:00',
    end: '17:30',
    daysOff: [0, 4], // 日曜日(0)と木曜日(4)は定休日
    lunchBreak: {
      start: '12:00',
      end: '13:00'
    }
  }
};

// 環境変数の読み込み（開発環境用）
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  console.log('Development mode: Using local configuration');
  // 開発環境でのデフォルト設定
  window.CAL_CONFIG.CAL_API_BASE = 'https://api.cal.com';
  window.CAL_CONFIG.CAL_API_KEY = 'cal_live_3612d68cd60686f0545892baf99e1e56';
}
