export function About() {
  return (
    <section id="about" className="py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">About</h2>
          <p className="text-lg md:text-xl leading-relaxed max-w-4xl mx-auto text-muted-foreground">
            世代を問わず多くの支持を集めるプライベート空間で、"もっと輝く私"に。髪の悩みに寄り添い、あなたの「なりたい」を叶えるサロン
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div className="form-section">
            <h3 className="text-xl font-bold mb-4">こだわり</h3>
            <p className="leading-relaxed">
              髪質・骨格・ライフスタイルに合わせた丁寧なカウンセリングを行い、お客様一人ひとりに最適なスタイルをご提案いたします。毎朝のヘアセットが楽しくなるような髪型を心掛けています。
            </p>
          </div>

          <div className="form-section">
            <h3 className="text-xl font-bold mb-4">技術</h3>
            <p className="leading-relaxed">
              TOKIOインカラミトリートメントをはじめ、最新の技術を取り入れています。さりげないインナーカラーや白髪ぼかし、オーダーメイドヘアケアまで幅広く対応いたします。
            </p>
          </div>

          <div className="form-section">
            <h3 className="text-xl font-bold mb-4">空間</h3>
            <p className="leading-relaxed">
              完全バリアフリー設計で、ベビーカーや車椅子でもスムーズにご利用いただけます。すべての水に軟水を使用し、髪と肌にやさしい環境を整えています。
            </p>
          </div>

          <div className="form-section">
            <h3 className="text-xl font-bold mb-4">営業時間</h3>
            <p className="leading-relaxed">
              月・火・水・金・土 10:00〜17:30（カット最終 16:30）<br />
              日・木 定休日<br />
              <span className="text-sm text-muted-foreground">
                ※営業時間外のご相談も承っております
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}