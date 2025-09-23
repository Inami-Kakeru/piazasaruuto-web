import { NextResponse } from 'next/server';
import { SITE } from '@/lib/marketing/constants';

export async function GET() {
  const to = SITE.hotpepperUrl || 'https://beauty.hotpepper.jp/';
  return NextResponse.redirect(to);
}
