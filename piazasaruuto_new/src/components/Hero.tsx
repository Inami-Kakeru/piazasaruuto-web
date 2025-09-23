import { Phone } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { SITE } from "../lib/constants";

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center">
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1651713325384-dd0f1e381534?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBoYWlyJTIwc2Fsb24lMjBleHRlcmlvciUyMGJ1aWxkaW5nfGVufDF8fHx8MTc1NzAwMjAxOHww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="美容室ぴあざさるうと外観"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
          priority
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
          髪と心に、やさしい時間。
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed">
          60代の方にも読みやすく、落ち着いた空間でお迎えします。
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href={SITE.bookingUrl}
            className="inline-flex items-center justify-center rounded-lg px-8 py-4 font-medium transition-colors min-h-[44px] bg-primary text-primary-foreground hover:bg-primary/90 text-lg w-full sm:w-auto"
          >
            Web予約
          </a>
          <a
            href={`tel:${SITE.tel}`}
            className="inline-flex items-center justify-center rounded-lg px-8 py-4 font-medium transition-colors min-h-[44px] border border-border bg-white/90 text-foreground hover:bg-white text-lg w-full sm:w-auto space-x-2"
            aria-label={`電話番号 ${SITE.tel} に発信`}
          >
            <Phone className="w-5 h-5" />
            <span>お電話</span>
          </a>
        </div>
        
        <div className="mt-8 text-sm opacity-90">
          <p>{SITE.tel}</p>
          <p>{SITE.hours_note}</p>
        </div>
      </div>
    </section>
  );
}