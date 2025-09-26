// TODO: 型定義だけ書いておく（実装は後）
export type Menu = { id: string; label: string; eventTypeId: number; durationMin: number };

export type BookingDraft = {
  menuId?: string;              // メニュー選択
  date?: string;                // YYYY-MM-DD
  start?: string;               // ISO8601（例 2025-09-01T03:00:00Z）
  timeZone?: string;            // 例: "Asia/Tokyo"
  name?: string;                // 個人情報
  email?: string;
  phone?: string;
  // ほか必要があれば追加
};


