import Link from "next/link";
import { SITE } from "@/content/site";

type Props = {
  compact?: boolean;
};

export default function ConcoursArchitectes({ compact = false }: Props) {
  const c = SITE.concours;
  if (!c) return null;

  return (
    <div className="block">
      {!compact && (
        <div className="section-head reveal">
          <span className="eyebrow">{c.surtitre}</span>
          <h2>{c.titre}</h2>
          <p className="lead">{c.intro}</p>
        </div>
      )}

      {/* Les 4 étapes de sélection */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 16,
          marginBottom: 28,
        }}
      >
        {c.etapes.map((e, idx) => (
          <div
            key={e.label}
            className="card reveal"
            style={{
              borderTop: idx === 2 ? "4px solid var(--gold)" : "4px solid var(--navy)",
              padding: "20px 18px",
            }}
          >
            <div
              style={{
                fontSize: "2rem",
                fontWeight: 800,
                color: idx === 2 ? "var(--gold)" : "var(--navy)",
                lineHeight: 1.1,
                marginBottom: 6,
              }}
            >
              {e.chiffre}
            </div>
            <strong style={{ display: "block", marginBottom: 4 }}>{e.label}</strong>
            <span className="small muted">{e.detail}</span>
          </div>
        ))}
      </div>

      {/* Cahier des charges & critères */}
      <div
        className="card reveal"
        style={{
          background: "rgba(0, 32, 78, 0.03)",
          borderLeft: "4px solid var(--gold)",
          marginBottom: 28,
        }}
      >
        <h3 style={{ marginTop: 0, marginBottom: 10, fontSize: "1.1rem" }}>
          Les grands engagements du cahier des charges architectural
        </h3>
        <ul style={{ margin: 0, paddingLeft: 20, display: "grid", gap: 6 }}>
          {c.criteres.map((crit) => (
            <li key={crit}>{crit}</li>
          ))}
        </ul>
      </div>

      {/* Les 5 maquettes finalistes */}
      <h3 style={{ marginBottom: 14 }}>Les 5 maquettes finalistes soumises à la consultation</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 16,
        }}
      >
        {c.maquettes.map((m) => (
          <div
            key={m.code}
            className="card reveal"
            style={{
              padding: 0,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {m.image && (
              <div style={{ height: 135, overflow: "hidden", background: "#00204E" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={m.image}
                  alt={m.titre}
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.9 }}
                />
              </div>
            )}
            <div style={{ padding: "14px 16px", flex: 1, display: "flex", flexDirection: "column" }}>
              <span className="badge badge--gold" style={{ alignSelf: "flex-start", marginBottom: 6 }}>
                {m.code}
              </span>
              <strong style={{ fontSize: "1.02rem", marginBottom: 4 }}>{m.titre}</strong>
              <span className="small" style={{ color: "var(--gold)", fontWeight: 600, marginBottom: 6 }}>
                {m.statut}
              </span>
              <p className="small muted" style={{ margin: 0 }}>
                {m.resume}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="row mt-4">
        <Link
          className="btn btn--gold"
          href="/calendrier/2026-11-28-kermesse-et-consultation-des-maquettes-d-architectes"
        >
          Venir voir les maquettes les 28–29 nov. →
        </Link>
        <Link className="btn btn--outline" href="/contact?sujet=concours-architectes">
          Partager un avis avec l&apos;équipe projet
        </Link>
      </div>
    </div>
  );
}
