const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3002;

// JSON解析を有効化
app.use(express.json());

// CORS設定
app.use(cors({
  origin: 'http://127.0.0.1:3000',
  credentials: true
}));

// Cal.com API設定を読み込み
const loadConfig = () => {
  return {
    CAL_API_BASE: 'https://api.cal.com',
    CAL_API_KEY: 'cal_live_3612d68cd60686f0545892baf99e1e56',
    CAL_API_VERSION_BOOKINGS: '2024-08-13',
    CAL_API_VERSION_SLOTS: '2024-09-04',
    DEFAULT_TIMEZONE: 'Asia/Tokyo',
    EVENT_TYPE_ID: '稲見駆-7zb7cf'
  };
};

const config = loadConfig();

// タイムゾーン変換ユーティリティ
const convertJSTToUTC = (jstDateString) => {
  const jstDate = new Date(jstDateString);
  // JSTは UTC+9 なので、9時間引く
  const utcDate = new Date(jstDate.getTime() - (9 * 60 * 60 * 1000));
  return utcDate.toISOString();
};

const convertUTCToJST = (utcDateString) => {
  const utcDate = new Date(utcDateString);
  // JSTは UTC+9 なので、9時間加える
  const jstDate = new Date(utcDate.getTime() + (9 * 60 * 60 * 1000));
  return jstDate.toISOString();
};

// Cal.com APIへのリクエストヘルパー
const calFetch = async (path, method = 'GET', body = null, version = config.CAL_API_VERSION_BOOKINGS) => {
  const url = `${config.CAL_API_BASE}${path}`;
  console.log(`🔍 Cal.com API request: ${method} ${url}`);
  
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${config.CAL_API_KEY}`,
    'cal-api-version': version
  };

  try {
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined
    });

    console.log(`📡 Cal.com API response: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Cal.com API error: ${errorText}`);
      throw new Error(`Cal API error ${response.status}: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`❌ Cal.com API request failed:`, error);
    throw error;
  }
};

// 予約データをローカルファイルに保存
const saveBookingData = async (bookingData) => {
  try {
    const bookingsFile = path.join(__dirname, 'bookings.json');
    let bookings = [];
    
    try {
      const data = await fs.readFile(bookingsFile, 'utf8');
      bookings = JSON.parse(data);
    } catch (error) {
      // ファイルが存在しない場合は新規作成
      console.log('📁 Creating new bookings file');
    }
    
    const newBooking = {
      id: `booking_${Date.now()}`,
      timestamp: new Date().toISOString(),
      ...bookingData
    };
    
    bookings.push(newBooking);
    await fs.writeFile(bookingsFile, JSON.stringify(bookings, null, 2));
    
    console.log('💾 Booking data saved locally:', newBooking.id);
    return newBooking;
  } catch (error) {
    console.error('❌ Failed to save booking data:', error);
    throw error;
  }
};

// API エンドポイント: 利用可能スロット取得
app.get('/api/slots', async (req, res) => {
  try {
    const { eventTypeId, start, end, timeZone } = req.query;
    
    console.log('🔍 Fetching slots:', { eventTypeId, start, end, timeZone });
    
    // JST → UTC 変換
    const startUTC = convertJSTToUTC(start);
    const endUTC = convertJSTToUTC(end);
    
    const params = new URLSearchParams({
      eventTypeId: eventTypeId || config.EVENT_TYPE_ID,
      startTime: startUTC,
      endTime: endUTC,
      timeZone: timeZone || config.DEFAULT_TIMEZONE
    });
    
    const data = await calFetch(`/v2/slots?${params.toString()}`, 'GET', null, config.CAL_API_VERSION_SLOTS);
    
    // UTC → JST 変換（レスポンス）
    if (data.slots) {
      data.slots = data.slots.map(slot => ({
        ...slot,
        startTime: convertUTCToJST(slot.startTime),
        endTime: convertUTCToJST(slot.endTime)
      }));
    }
    
    res.json(data);
  } catch (error) {
    console.error('❌ Slots API error:', error);
    
    // フォールバック: シミュレーション用のスロット生成
    const startDate = new Date(req.query.start);
    const slots = generateFallbackSlots(startDate);
    
    res.json({ 
      slots,
      fallback: true,
      message: 'Cal.com APIに接続できませんでした。シミュレーションデータを表示しています。'
    });
  }
});

// フォールバック用スロット生成
const generateFallbackSlots = (date) => {
  const slots = [];
  const dayOfWeek = date.getDay();
  
  // 営業日チェック（日曜日=0, 木曜日=4は定休日）
  if (dayOfWeek === 0 || dayOfWeek === 4) {
    return slots;
  }
  
  // 営業時間内のスロット生成（10:00-17:30、12:00-13:00除く）
  for (let hour = 10; hour <= 17; hour++) {
    if (hour === 12) continue; // ランチタイム除外
    
    const slot = {
      startTime: `${date.toISOString().split('T')[0]}T${hour.toString().padStart(2, '0')}:00:00`,
      endTime: `${date.toISOString().split('T')[0]}T${hour.toString().padStart(2, '0')}:30:00`,
      available: Math.random() > 0.3 // 70%の確率で利用可能
    };
    
    if (slot.available) {
      slots.push(slot);
    }
    
    // 30分スロットも追加
    if (hour < 17) {
      const halfSlot = {
        startTime: `${date.toISOString().split('T')[0]}T${hour.toString().padStart(2, '0')}:30:00`,
        endTime: `${date.toISOString().split('T')[0]}T${(hour + 1).toString().padStart(2, '0')}:00:00`,
        available: Math.random() > 0.3
      };
      
      if (halfSlot.available) {
        slots.push(halfSlot);
      }
    }
  }
  
  return slots;
};

// API エンドポイント: スロット予約
app.post('/api/slots/reserve', async (req, res) => {
  try {
    const { eventTypeId, start, end, timeZone } = req.body;
    
    console.log('🔒 Reserving slot:', { eventTypeId, start, end, timeZone });
    
    const reserveData = {
      eventTypeId: eventTypeId || config.EVENT_TYPE_ID,
      start: convertJSTToUTC(start),
      end: convertJSTToUTC(end),
      timeZone: timeZone || config.DEFAULT_TIMEZONE
    };
    
    const data = await calFetch('/v2/slots/reserve', 'POST', reserveData, config.CAL_API_VERSION_SLOTS);
    
    res.json(data);
  } catch (error) {
    console.error('❌ Slot reserve error:', error);
    // スロット予約失敗でも続行可能にする
    res.json({ 
      success: true,
      reservedSlot: { 
        id: `fallback_${Date.now()}`,
        start: req.body.start,
        end: req.body.end
      },
      fallback: true,
      message: 'スロット予約をスキップして続行します。'
    });
  }
});

// API エンドポイント: ブッキング作成
app.post('/api/bookings', async (req, res) => {
  try {
    const { eventTypeId, start, attendee, notes, metadata } = req.body;
    
    console.log('📅 Creating booking:', { eventTypeId, start, attendee: attendee.name });
    
    const bookingData = {
      eventTypeId: eventTypeId || config.EVENT_TYPE_ID,
      start: convertJSTToUTC(start),
      attendee: {
        ...attendee,
        timeZone: attendee.timeZone || config.DEFAULT_TIMEZONE
      },
      metadata: {
        source: 'booking.html',
        ...metadata
      }
    };
    
    if (notes) {
      bookingData.bookingFieldsResponses = { notes };
    }
    
    try {
      // Cal.com APIで実際の予約作成を試行
      const calBooking = await calFetch('/v2/bookings', 'POST', bookingData, config.CAL_API_VERSION_BOOKINGS);
      
      // ローカルにも保存
      const localBooking = await saveBookingData({
        calBookingId: calBooking.id || calBooking.uid,
        ...req.body,
        status: 'confirmed'
      });
      
      res.json({
        success: true,
        booking: calBooking,
        localId: localBooking.id,
        source: 'Cal.com API'
      });
      
    } catch (calError) {
      console.log('⚠️ Cal.com API failed, using fallback booking');
      
      // Cal.com APIが失敗してもローカル予約として保存
      const localBooking = await saveBookingData({
        ...req.body,
        status: 'pending_confirmation',
        error: calError.message
      });
      
      res.json({
        success: true,
        booking: {
          id: localBooking.id,
          start: req.body.start,
          attendee: req.body.attendee,
          status: 'pending_confirmation'
        },
        localId: localBooking.id,
        source: 'Local fallback',
        note: 'Cal.com APIエラーのため、ローカル予約として保存されました。担当者が確認いたします。'
      });
    }
    
  } catch (error) {
    console.error('❌ Booking creation error:', error);
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
});

// API エンドポイント: カレンダー追加リンク取得
app.get('/api/bookings/:id/add-to-calendar', async (req, res) => {
  try {
    const { id } = req.params;
    
    console.log('📅 Getting calendar links for booking:', id);
    
    const data = await calFetch(`/v2/bookings/${id}/add-to-calendar`, 'GET', null, config.CAL_API_VERSION_BOOKINGS);
    
    res.json(data);
  } catch (error) {
    console.error('❌ Calendar links error:', error);
    // フォールバック: 基本的なカレンダーリンクを生成
    const now = new Date();
    const dateStr = now.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    
    res.json({
      google: `https://calendar.google.com/calendar/render?action=TEMPLATE&text=ぴあざさるうと 予約&dates=${dateStr}/${dateStr}`,
      outlook: '#',
      apple: '#',
      ics: '#',
      fallback: true
    });
  }
});

// API エンドポイント: 予約一覧取得（管理用）
app.get('/api/bookings', async (req, res) => {
  try {
    const bookingsFile = path.join(__dirname, 'bookings.json');
    const data = await fs.readFile(bookingsFile, 'utf8');
    const bookings = JSON.parse(data);
    
    res.json({ bookings });
  } catch (error) {
    res.json({ bookings: [] });
  }
});

// ヘルスチェック
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Cal.com API Server is running',
    config: {
      eventTypeId: config.EVENT_TYPE_ID,
      timezone: config.DEFAULT_TIMEZONE,
      apiBase: config.CAL_API_BASE
    }
  });
});

// サーバー起動
app.listen(PORT, () => {
  console.log(`🚀 Cal.com API Server running on http://localhost:${PORT}`);
  console.log(`📡 Cal.com API Base: ${config.CAL_API_BASE}`);
  console.log(`📅 Event Type ID: ${config.EVENT_TYPE_ID}`);
  console.log(`🌐 Default Timezone: ${config.DEFAULT_TIMEZONE}`);
  console.log(`🔑 API Key: ${config.CAL_API_KEY.substring(0, 10)}...`);
});
