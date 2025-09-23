import { ImageWithFallback } from "./figma/ImageWithFallback";
import { STYLISTS } from "../lib/constants";

export function StylistGrid() {
  return (
    <section id="stylist" className="py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Stylist</h2>
          <p className="text-lg leading-relaxed max-w-2xl mx-auto text-muted-foreground">
            経験豊富なスタイリストがお客様の美しさを引き出します
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {STYLISTS.map((stylist, index) => (
            <div key={index} className="form-section text-center">
              <div className="mb-6">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1737063935340-f9af0940c4c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGhhaXJzdHlsaXN0JTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU3MDAyMDIyfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt={`${stylist.name}のプロフィール写真`}
                  width={200}
                  height={200}
                  className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-primary/10"
                />
              </div>
              
              <h3 className="text-xl font-bold mb-2">{stylist.name}</h3>
              <div className="text-sm text-muted-foreground mb-1">
                {stylist.title}
              </div>
              <div className="text-sm text-muted-foreground mb-4">
                {stylist.years}
              </div>
              
              <blockquote className="text-primary font-medium mb-4 italic">
                "{stylist.catch}"
              </blockquote>
              
              <p className="text-sm leading-relaxed mb-4">
                {stylist.profile}
              </p>
              
              <div className="pt-4 border-t border-border">
                <h4 className="text-sm font-bold mb-2">得意分野</h4>
                <p className="text-sm text-muted-foreground">
                  {stylist.specialties}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="mb-6 text-muted-foreground">
            お気軽にご指名ください。スタイリストによる詳しい相談も承ります。
          </p>
          <a
            href={`tel:03-3978-4800`}
            className="inline-flex items-center justify-center rounded-lg px-8 py-3 font-medium transition-colors min-h-[44px] bg-primary text-primary-foreground hover:bg-primary/90"
          >
            スタイリスト相談
          </a>
        </div>
      </div>
    </section>
  );
}