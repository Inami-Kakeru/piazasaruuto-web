"use client";
import { MapPin, Phone, Mail, Car, Clock, Copy, ExternalLink, Navigation } from "lucide-react";
import { useState } from "react";
import { SITE } from "../../../lib/marketing/constants";

type AccessBlockProps = {
  reserveHref?: string | null;
  mapEmbedSrc?: string;
  mapExternalHref?: string;
  photoSrc?: string;
};

export function AccessBlock({
  reserveHref = SITE.bookingUrl,
  mapEmbedSrc = SITE.mapEmbedSrc,
  mapExternalHref = `https://www.google.com/maps/search/${encodeURIComponent(SITE.address)}`,
  photoSrc,
}: AccessBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SITE.address);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {}
  };

  return (
    <section id="access" className="mk-access" aria-labelledby="access-title">
      <div className="mk-container">
        <div className="mk-access-header text-center">
          <h2 id="access-title" className="mk-access-title">アクセス</h2>
          <p className="mk-access-subtitle">
            保谷駅から<b className="font-semibold text-gray-900"> 徒歩1分</b>の便利な立地です
          </p>
        </div>

        {/* レイアウト：モバイル1カラム → デスクトップ2カラム */}
        <div className="mk-access-content grid gap-6 lg:gap-10 lg:grid-cols-2 items-start">
          {/* 左カラム：写真 + 地図 */}
          <div className="space-y-6">
            {photoSrc && (
              <figure>
                <img
                  src={photoSrc}
                  alt="店舗外観（青い看板が目印）"
                  className="w-full rounded-lg object-cover shadow-sm"
                  loading="lazy"
                />
                <figcaption className="sr-only">店舗外観写真</figcaption>
              </figure>
            )}

            <div className="mk-access-map-section">
              <h3 className="mk-access-section-title">
                <MapPin className="mk-access-icon" aria-hidden="true" />
                地図
              </h3>
              <div className="mk-access-map-container">
                <iframe
                  src={mapEmbedSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Googleマップ：店舗所在地"
                ></iframe>
              </div>
              <div className="mk-access-map-link mt-3">
                <a
                  href={mapExternalHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mk-btn mk-btn-secondary"
                >
                  <Navigation className="mk-icon" aria-hidden="true" />
                  <span>地図アプリで開く</span>
                  <ExternalLink className="mk-icon" aria-hidden="true" />
                </a>
              </div>

              {/* 外観写真（地図の下） */}
              <figure className="mt-4">
                <img
                  src="/images/お店の外観.png"
                  alt="店舗外観（入口の様子が分かる写真）"
                  className="w-full rounded-lg object-cover shadow-sm"
                  loading="lazy"
                />
                <figcaption className="mt-2 text-center text-sm text-gray-600">店舗外観（初めての方はこの入口が目印）</figcaption>
              </figure>
            </div>
          </div>

          {/* 右カラム：情報カード群 */}
          <div className="mk-access-info">
            {/* 住所・アクセス */}
            <div className="mk-access-info-section">
              <h3 className="mk-access-section-title">
                <MapPin className="mk-access-icon" aria-hidden="true" />
                住所・アクセス
              </h3>
              <div className="mk-access-info-content text-[17px] md:text-lg leading-[1.7]">
                <div className="flex items-start justify-between gap-3">
                  <p className="mk-access-address select-text">{SITE.address}</p>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-md border text-sm hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-400"
                    aria-live="polite"
                  >
                    <Copy aria-hidden="true" className="w-4 h-4" />
                    コピー
                  </button>
                </div>
                <ul className="mt-3 list-disc pl-5 space-y-1">
                  <li>西武池袋線「保谷駅」<b className="font-semibold text-gray-900"> 北口より徒歩約1分</b></li>
                  <li>北口を出て駅前通りを直進し、1本目の角を右折</li>
                  <li>右手の「ほうやデンタルクリニック」の隣です</li>
                </ul>
                {copied && (
                  <p className="mt-2 text-sm text-emerald-700" role="status">住所をコピーしました</p>
                )}
              </div>
            </div>

            {/* 営業時間（表） */}
            <div className="mk-access-info-section">
              <h3 className="mk-access-section-title">
                <Clock className="mk-access-icon" aria-hidden="true" />
                営業時間
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-[16px] md:text-[18px] leading-7">
                  <caption className="sr-only">営業時間のご案内</caption>
                  <tbody>
                    <tr className="border-b">
                      <th scope="row" className="py-3 pr-4 text-left font-semibold text-gray-900">営業日</th>
                      <td className="py-3">月・火・水・金・土</td>
                    </tr>
                    <tr className="border-b">
                      <th scope="row" className="py-3 pr-4 text-left font-semibold text-gray-900">営業時間</th>
                      <td className="py-3">10:00〜17:30（カット最終受付 16:30）</td>
                    </tr>
                    <tr>
                      <th scope="row" className="py-3 pr-4 text-left font-semibold text-gray-900">定休日</th>
                      <td className="py-3"><b className="font-semibold text-gray-900">日・木</b></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 駐車場 */}
            <div className="mk-access-info-section">
              <h3 className="mk-access-section-title">
                <Car className="mk-access-icon" aria-hidden="true" />
                駐車場
              </h3>
              <div className="text-[16px] md:text-[18px] leading-[1.7]">
                <p><b className="font-semibold text-gray-900">🚗 駐車場あります（1台／要予約）</b></p>
                <p className="mk-access-parking mt-1">台数に限りがあります。ご来店前にお電話でご確認ください。</p>
              </div>
            </div>

            {/* 予約方法（説明ゾーン） */}
            <div className="mk-access-footer mt-2">
              <div className="mk-access-info-section">
                <h3 className="mk-access-section-title">予約方法</h3>
                <div className="space-y-2 text-[17px] md:text-[18px] leading-[1.8]">
                  <p>
                    <b className="font-semibold text-gray-900">お電話予約：</b>
                    <a href={`tel:${SITE.tel}`} className="underline ml-1">{SITE.tel}</a>
                  </p>
                  <p>
                    <b className="font-semibold text-gray-900">Web予約：</b>
                    {reserveHref ? (
                      <a href={reserveHref} target="_blank" rel="noopener noreferrer" className="underline ml-1">ホットペッパービューティーから予約</a>
                    ) : (
                      <span className="ml-1">準備中</span>
                    )}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    ※増毛エクステのご予約はお電話にて承っております
                  </p>
                  <p>
                    <b className="font-semibold text-gray-900">LINE・店頭：</b>
                    <span className="ml-1">どちらでも承っております。</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
