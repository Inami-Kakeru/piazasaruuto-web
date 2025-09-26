export function About() {
  return (
    <section id="about" className="mk-about">
      <div className="mk-container">
        <div className="mk-about-header">
          <h2 className="mk-about-title">About</h2>
          <p className="mk-about-subtitle">
            Piazza Salute is a neighborhood salon that blends classic craft with modern care. Our promise is simple: we want every guest to leave confident, relaxed, and excited for their next visit.
          </p>
        </div>

        <div className="mk-about-grid">
          <div className="mk-about-item">
            <h3 className="mk-about-item-title">Thoughtful Consultations</h3>
            <p className="mk-about-item-text">
              From first-time visitors to long-time regulars, we listen carefully to priorities and routines. Together we agree on a plan before the first snip or color brush.
            </p>
          </div>

          <div className="mk-about-item">
            <h3 className="mk-about-item-title">Hair Care Partners</h3>
            <p className="mk-about-item-text">
              We pair high-performing Japanese products with gentle techniques so hair stays resilient. Ask us about scalp treatments, heat-care styling, and home routines that really work.
            </p>
          </div>

          <div className="mk-about-item">
            <h3 className="mk-about-item-title">Relaxed Space</h3>
            <p className="mk-about-item-text">
              Natural light, curated music, and a calm rhythm set the tone. Enjoy your appointment with complimentary drinks and seasonal playlists.
            </p>
          </div>

          <div className="mk-about-item">
            <h3 className="mk-about-item-title">Hours</h3>
            <p className="mk-about-item-text">
              Tue-Fri 10:00-19:30 (last cut 18:30)<br />
              Sat-Sun & holidays 9:00-18:30<br />
              <span className="mk-about-note">Closed on Mondays</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
