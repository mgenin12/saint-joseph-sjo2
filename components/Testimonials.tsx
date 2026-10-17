import Link from "next/link";
import { SITE } from "@/content/site";

export default function Testimonials() {
  const t = SITE.temoignages;
  if (!t || !t.items?.length) return null;

  return (
    <div className="block">
      <div className="section-head reveal">
        <span className="eyebrow">{t.surtitre}</span>
        <h2>{t.titre}</h2>
        <p className="lead">{t.intro}</p>
      </div>

      <div className="grid grid-2" style={{ gap: 20 }}>
        {t.items.map((item, i) => (
          <blockquote
            key={i}
            className="card reveal"
            style={{
              margin: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              borderLeft: "4px solid var(--gold)",
            }}
          >
            <p style={{ fontStyle: "italic", fontSize: "1.03rem", lineHeight: 1.6, marginBottom: 16 }}>
              « {item.citation} »
            </p>
            <footer>
              <strong style={{ display: "block", color: "var(--navy)" }}>{item.auteur}</strong>
              <span className="small muted">
                {item.role}
                {item.commune ? ` · ${item.commune}` : ""}
              </span>
            </footer>
          </blockquote>
        ))}
      </div>

      <div className="row mt-4">
        <Link className="btn btn--outline btn--sm" href="/contact?sujet=temoignage">
          ✍️ Laisser un témoignage ou une intention de bâtisseur
        </Link>
      </div>
    </div>
  );
}
