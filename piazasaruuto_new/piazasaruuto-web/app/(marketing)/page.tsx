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
            name: SITE.name,
          }),
        }}
      />

      {/* 固定予約ボタン（右下） */}
      <button
        disabled
        className="mk-fab fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[60] opacity-50 cursor-not-allowed"
        aria-label="Web予約は準備中です"
        aria-disabled="true"
        title="Web予約は準備中です"
        id="floatingReservationBtn"
      >
        <Calendar className="mk-fab-icon" />
        <span className="mk-fab-label">準備中</span>
      </button>
    </>
  );
}
