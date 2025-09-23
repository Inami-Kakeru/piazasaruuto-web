export function About() {
  return (
    <section id="about" className="mk-about">
      <div className="mk-container">
        <div className="mk-about-header">
          <h2 className="mk-about-title">About</h2>
          <p className="mk-about-subtitle">
            世代を問わず多くの支持を集めるプライベート空間で、"もっと輝く私"に。髪の悩みに寄り添い、あなたの「なりたい」を叶えるサロン
          </p>
        </div>

        <div className="mk-about-grid">
          <div className="mk-about-item">
            <h3 className="mk-about-item-title">こだわり</h3>
            <p className="mk-about-item-text">
              髪質・骨格・ライフスタイルに合わせた丁寧なカウンセリングを行い、お客様一人ひとりに最適なスタイルをご提案いたします。毎朝のヘアセットが楽しくなるような髪型を心掛けています。
            </p>
          </div>

          <div className="mk-about-item">
            <h3 className="mk-about-item-title">技術</h3>
            <p className="mk-about-item-text">
              TOKIOインカラミトリートメントをはじめ、最新の技術を取り入れています。さりげないインナーカラーや白髪ぼかし、オーダーメイドヘアケアまで幅広く対応いたします。
            </p>
          </div>

          <div className="mk-about-item">
            <h3 className="mk-about-item-title">空間</h3>
            <p className="mk-about-item-text">
              完全バリアフリー設計で、ベビーカーや車椅子でもスムーズにご利用いただけます。すべての水に軟水を使用し、髪と肌にやさしい環境を整えています。
            </p>
          </div>

          <div className="mk-about-item">
            <h3 className="mk-about-item-title">営業時間</h3>
            <p className="mk-about-item-text">
              月・火・水・金・土 10:00〜17:30（カット最終 16:30）<br />
              日・木 定休日<br />
              <span className="mk-about-note">
                ※営業時間外のご相談も承っております
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
