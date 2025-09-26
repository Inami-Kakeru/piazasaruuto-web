// app/lib/calClient.ts
// Cal.com API クライアント（統一インターフェース）

export type Slot = {
  start: string;
  end: string;
};

export type ReserveResponse = {
  reservationUid: string;
  [key: string]: any;
};

export type BookingResponse = {
  bookingId: string;
  data: any;
};

export type CalError = Error & {
  code?: number;
  details?: any;
};

class CalClient {
  private baseUrl: string;
  private apiKey: string;
  private eventTypeId: number;
  private timeZone: string;

  constructor() {
    this.baseUrl = process.env.CAL_BASE_URL!;
    this.apiKey = process.env.CAL_API_KEY!;
    this.eventTypeId = Number(process.env.CAL_EVENT_TYPE_ID!);
    this.timeZone = process.env.CAL_DEFAULT_TZ || 'Asia/Tokyo';
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl.replace(/\/$/, '')}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept-Language': 'ja',
        Authorization: `Bearer ${this.apiKey}`,
        ...options.headers,
      },
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const error = new Error(data?.error || 'API request failed') as CalError;
      error.code = response.status;
      error.details = data;
      throw error;
    }

    return data;
  }

  // スロット取得
  async fetchSlots(date: string, timeZone?: string): Promise<{ [date: string]: Slot[] }> {
    const tz = timeZone || this.timeZone;
    
    // その日の 00:00〜24:00 を UTC に変換して range 指定
    const startLocal = `${date}T00:00:00+09:00`; // Asia/Tokyo（DSTなし）
    const startISO = new Date(startLocal).toISOString();
    const endISO = new Date(new Date(startLocal).getTime() + 24 * 60 * 60 * 1000).toISOString();

    const endpoint = `/event-types/${this.eventTypeId}/slots?start=${encodeURIComponent(startISO)}&end=${encodeURIComponent(endISO)}&timeZone=${encodeURIComponent(tz)}&format=range`;

    const data = await this.request<any>(endpoint);
    const slots = (data?.data?.[date] ?? []) as Slot[];
    
    return { [date]: slots };
  }

  // スロット仮押さえ
  async reserveSlot(start: string, end: string): Promise<string> {
    const startUtc = new Date(start).toISOString();
    const endUtc = new Date(end).toISOString();

    const data = await this.request<ReserveResponse>('/slots/reserve', {
      method: 'POST',
      body: JSON.stringify({
        start: startUtc,
        end: endUtc,
        eventTypeId: this.eventTypeId,
      }),
    });

    return data.reservationUid;
  }

  // 予約作成
  async createBooking(params: {
    start: string;
    end: string;
    name: string;
    email: string;
    phone?: string;
    reservationUid?: string;
  }): Promise<string> {
    const startUtc = new Date(params.start).toISOString();
    const endUtc = new Date(params.end).toISOString();

    const payload = {
      eventTypeId: this.eventTypeId,
      start: startUtc,
      end: endUtc,
      timeZone: this.timeZone,
      attendees: [
        {
          name: params.name,
          email: params.email,
          timeZone: this.timeZone,
          ...(params.phone ? { phoneNumber: params.phone } : {}),
        },
      ],
      metadata: {
        attendeeNameJP: params.name,
        ...(params.phone ? { attendeePhone: params.phone } : {}),
      },
      ...(params.reservationUid ? { reservationUid: params.reservationUid } : {}),
    };

    const data = await this.request<any>('/bookings', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    const booking = (data?.data ?? data) as any;
    return booking?.id ?? booking?.uid ?? null;
  }

  // 予約取得
  async getBooking(uid: string): Promise<any> {
    return this.request<any>(`/bookings/${encodeURIComponent(uid)}`);
  }

  // 予約キャンセル
  async cancelBooking(params: {
    uid: string;
    reason?: string;
    cancelSubsequent?: boolean;
  }): Promise<any> {
    const payload: Record<string, any> = {};
    if (params.reason) payload.cancellationReason = params.reason;
    if (typeof params.cancelSubsequent === 'boolean') {
      payload.cancelSubsequentBookings = params.cancelSubsequent;
    }

    return this.request<any>(`/bookings/${encodeURIComponent(params.uid)}/cancel`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }
}

// シングルトンインスタンス
export const calClient = new CalClient();
