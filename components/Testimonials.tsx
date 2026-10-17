import { SITE } from "@/content/site";

export default function Testimonials() {
  const t = SITE.temoignages;
  if (!t || !t.items || t.items.length === 0) return null;

  return (
    <section id="temoignages" className="section section--white" aria-labelledby="temoignages-title">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">{t.surtitre}</span>
          <h2 id="temoignages-title">{t.titre}</h2>
          <p className="lead">{t.intro}</p>
        </div>
        <div className="testimonials-grid">
          {t.items.map((item) => (
            <blockquote key={item.auteur} className="testimonial-card reveal">
              <p className="testimonial-card__quote">« {item.citation} »</p>
              <footer className="testimonial-card__footer">
                <strong>{item.auteur}</strong>
                <span>
                  {item.role}
                  {item.commune ? ` · ${item.commune}` : ""}
                </span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
