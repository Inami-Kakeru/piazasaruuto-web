import { AccessBlock } from './components/AccessBlock';
import { InstagramSlider } from './components/InstagramSlider';
import { ServiceShowcase } from './components/ServiceShowcase';
import { ExtensionShowcase } from './components/ExtensionShowcase';
import { AdditionalMenuSlider } from './components/AdditionalMenuSlider';
import { SimpleWorries } from './components/SimpleWorries';
import { ConceptBlock } from './components/ConceptBlock';
import { Hero } from './components/Hero';
import { PriceTable } from './components/PriceTable';
import { SITE } from '../../lib/marketing/constants';
import { Calendar } from 'lucide-react';

export default function MarketingHome() {
  return (
    <>
      {/* スキップリンク */}
      <a href="#main" className="sr-only focus:not-sr-only">
        コンテンツへスキップ
      </a>
      <main id="main">
        {/* ヒーロー（最上部） */}
        <Hero />
        {/* 表示順指定 */}
        <SimpleWorries />
        <ConceptBlock />
        <ServiceShowcase />
        <ExtensionShowcase />
        <PriceTable />
        <InstagramSlider />
        <AccessBlock />
      </main>

      {/* JSON-LD 構造化データ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HairSalon',
            '@id': 'https://piazza-salute.com',
            name: SITE.name,
            alternateName: SITE.subtitle,
            description: '保谷駅北口より徒歩1分の美容室ぴあざさるうと。カット・カラー・パーマ・増毛エクステまで、お客様一人ひとりに寄り添ったサービスを提供いたします。',
            url: 'https://piazza-salute.com',
            telephone: SITE.tel,
            email: SITE.email,
            areaServed: [
              {
                '@type': 'City',
                name: '練馬区'
              },
              {
                '@type': 'City',
                name: '西東京市'
              },
              {
                '@type': 'City',
                name: '保谷'
              },
              {
                '@type': 'City',
                name: '大泉学園'
              }
            ],
            makesOffer: [
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: '髪質改善',
                  description: 'TOKIOトリートメントなどを使用した髪質改善メニュー'
                }
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: '増毛エクステ',
                  description: '自然な仕上がりのボリュームアップエクステ'
                }
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: '似合わせカット',
                  description: '骨格や髪質に合わせた似合わせカット'
                }
              }
            ],
            address: {
              '@type': 'PostalAddress',
              streetAddress: '南大泉5-35-8',
              addressLocality: '練馬区',
              addressRegion: '東京都',
              postalCode: '178-0064',
              addressCountry: 'JP',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 35.74879907256545,
              longitude: 139.56598757700579,
            },
            openingHoursSpecification: [
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Friday', 'Saturday'],
                opens: '10:00',
                closes: '17:30',
              },
            ],
            priceRange: '¥',
            image: 'https://piazza-salute.com/images/お店の外観.png',
            logo: 'https://piazza-salute.com/images/お店の外観.png',
            sameAs: [
              SITE.instagramUrl,
            ],
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '5',
              reviewCount: '1',
            },
          }),
        }}
      />

      {/* 固定予約ボタン（右下） */}
      <a
        href={SITE.bookingUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mk-fab fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[60]"
        aria-label="ホットペッパービューティーでWeb予約"
        title="Web予約"
        id="floatingReservationBtn"
      >
        <Calendar className="mk-fab-icon" />
        <span className="mk-fab-label">Web予約</span>
      </a>
    </>
  );
}
