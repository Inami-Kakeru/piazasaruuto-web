// app/lib/logger.ts
// 共通ロガー（API ルート用）

import { NextRequest } from 'next/server';

export interface LogContext {
  requestId: string;
  method: string;
  path: string;
  duration?: number;
  statusCode?: number;
  error?: string;
  details?: any;
  [key: string]: any; // 追加のプロパティを許可
}

export class Logger {
  private requestId: string;
  private startTime: number;

  constructor(req: NextRequest) {
    this.requestId = req.headers.get('x-request-id') || this.generateRequestId();
    this.startTime = Date.now();
  }

  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private formatLog(level: string, message: string, context?: Partial<LogContext>): string {
    const duration = this.startTime ? Date.now() - this.startTime : undefined;
    
    const logData = {
      timestamp: new Date().toISOString(),
      level,
      message,
      requestId: this.requestId,
      duration,
      ...context,
    };

    return JSON.stringify(logData);
  }

  info(message: string, context?: Partial<LogContext>): void {
    console.log(this.formatLog('INFO', message, context));
  }

  error(message: string, context?: Partial<LogContext>): void {
    console.error(this.formatLog('ERROR', message, context));
  }

  warn(message: string, context?: Partial<LogContext>): void {
    console.warn(this.formatLog('WARN', message, context));
  }

  // API レスポンス用のログ
  logResponse(statusCode: number, context?: Partial<LogContext>): void {
    const level = statusCode >= 400 ? 'ERROR' : 'INFO';
    const message = `API Response: ${statusCode}`;
    
    if (level === 'ERROR') {
      this.error(message, {
        statusCode,
        duration: Date.now() - this.startTime,
        ...context,
      });
    } else {
      this.info(message, {
        statusCode,
        duration: Date.now() - this.startTime,
        ...context,
      });
    }
  }

  // エラーログ用
  logError(error: Error, context?: Partial<LogContext>): void {
    this.error(error.message, {
      error: error.message,
      details: error.stack,
      ...context,
    });
  }
}

// 日本語エラーメッセージの変換
export function getErrorMessage(statusCode: number, originalError?: string): string {
  switch (statusCode) {
    case 400:
      return '入力内容に不備があります。必須項目を確認してください。';
    case 404:
      return '指定されたリソースが見つかりません。';
    case 409:
      return '選択された時間は既に予約されています。別の時間をお選びください。';
    case 422:
      return '入力内容が正しくありません。日時形式を確認してください。';
    case 429:
      return 'リクエストが多すぎます。しばらく待ってから再試行してください。';
    case 500:
    case 502:
    case 503:
      return 'サーバーエラーが発生しました。しばらく待ってから再試行してください。';
    default:
      return originalError || '予期しないエラーが発生しました。';
  }
}
