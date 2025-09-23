import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { MenuGrid } from "./components/MenuGrid";
import { StylistGrid } from "./components/StylistGrid";
import { AccessBlock } from "./components/AccessBlock";
import { InstagramSlider } from "./components/InstagramSlider";
import { Footer } from "./components/Footer";
import { SITE } from "./lib/constants";

export default function App() {
  return (
    <div className="min-h-screen">
      {/* スキップリンク */}
      <a
        href="#main-content"
        className="skip-link"
      >
        メインコンテンツにスキップ
      </a>

      <Header />

      <main id="main-content">
        <Hero />
        <About />
        <MenuGrid />
        <StylistGrid />
        <AccessBlock />
        <InstagramSlider />
      </main>

      <Footer />

      {/* JSON-LD 構造化データ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HairSalon",
            "name": SITE.name,
            "alternateName": SITE.subtitle,
            "description": "60代の方にも読みやすく、落ち着いた空間でお迎えします。世代を問わず多くの支持を集めるプライベート空間で、もっと輝く私に。",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "南大泉5-35-8",
              "addressLocality": "練馬区",
              "addressRegion": "東京都",
              "postalCode": "178-0064",
              "addressCountry": "JP"
            },
            "telephone": SITE.tel,
            "email": SITE.email,
            "url": typeof window !== "undefined" ? window.location.origin : "",
            "openingHours": [
              "Mo 10:00-17:30",
              "Tu 10:00-17:30", 
              "We 10:00-17:30",
              "Fr 10:00-17:30",
              "Sa 10:00-17:30"
            ],
            "serviceArea": {
              "@type": "GeoCircle",
              "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": 35.74879907256545,
                "longitude": 139.56598757700579
              },
              "geoRadius": "10000"
            },
            "priceRange": "¥¥",
            "paymentAccepted": "cash, credit card",
            "amenityFeature": [
              {
                "@type": "LocationFeatureSpecification",
                "name": "バリアフリー",
                "value": true
              },
              {
                "@type": "LocationFeatureSpecification", 
                "name": "駐車場",
                "value": true
              }
            ]
          })
        }}
      />
    </div>
  );
}