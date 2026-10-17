import type { Metadata } from "next";
import Link from "next/link";
import Counter from "@/components/Counter";
import Timeline from "@/components/Timeline";
import Clocher from "@/components/Clocher";
import ArticleCard from "@/components/ArticleCard";
import UpcomingEvents from "@/components/UpcomingEvents";
import ConcoursArchitectes from "@/components/ConcoursArchitectes";
import Testimonials from "@/components/Testimonials";
import LegacyHashRedirect from "@/components/LegacyHashRedirect";
import { SITE } from "@/content/site";
import { getArticles } from "@/lib/articles";
import { getUpcomingEvents, getPastEvents } from "@/lib/events";
import { computeClocher, getSiteConfig } from "@/lib/config";
import { pageMetadata, SITE_TITLE, SITE_DESCRIPTION } from "@/lib/seo";
import { formatEuros } from "@/lib/text";

export const revalidate = 600;

export const metadata: Metadata = {
  ...pageMetadata({ title: SITE_TITLE, description: SITE_DESCRIPTION, path: "/" }),
  title: { absolute: SITE_TITLE },
};

export default async function HomePage() {
  const [config, articles, upcoming, past] = await Promise.all([getSiteConfig(), getArticles(), getUpcomingEvents(3), getPastEvents()]);
  const clocher = computeClocher(config.montantCollecte, config.objectif);
  const derniers = articles.slice(0, 3);

  return (
    <>
      <LegacyHashRedirect />

      {/* ---------- Hero ---------- */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__bg" aria-hidden="true" />
        <div className="hero__glow" aria-hidden="true" />
        <div className="container hero__content stag">
          <span className="eyebrow">Projet SJO2 · Église Saint Joseph · Le Rouret</span>
          <h1 id="hero-title">
            {SITE.hero.titre.map((part, i) => (i % 2 === 1 ? <em key={i}>{part}</em> : <span key={i}>{part}</span>))}
          </h1>
          <ul className="hero__meta">
            {SITE.hero.meta.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
          <div className="hero__actions row" style={{ justifyContent: "center" }}>
            <a className="btn btn--outline btn--lg" href="#decouvrir">
              Découvrir le projet
            </a>
            <a className="btn btn--gold btn--lg" href={config.urlDon} target="_blank" rel="noopener">
              Faire un don
            </a>
          </div>
        </div>
        <a className="hero__scroll" href="#decouvrir" aria-label="Défiler vers le projet" />
      </section>

      {/* ---------- Découvrir ---------- */}
      <section id="decouvrir" className="section" aria-labelledby="decouvrir-title">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Découvrir</span>
            <h2 id="decouvrir-title">{SITE.projet.titre}</h2>
            <p className="lead">{SITE.projet.intro}</p>
          </div>
          <div className="counters">
            {SITE.projet.compteurs.map((c) => (
              <Counter key={c.label} value={c.valeur} suffix={c.suffixe} label={c.label} />
            ))}
          </div>
          <div className="grid grid-3 mt-6">
            {SITE.projet.phases.map((p) => (
              <div key={p.titre} className="card phase-card reveal">
                <h3>{p.titre}</h3>
                <div className="phase-card__cap">{p.capacite}</div>
                <ul>
                  {p.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="row mt-6" style={{ justifyContent: "center" }}>
            <Link className="btn btn--navy btn--lg" href="/articles">
              En savoir plus
            </Link>
            <a className="btn btn--outline" href="#avancement">
              Voir l&apos;avancement
            </a>
          </div>
        </div>
      </section>

      {/* ---------- Avancement ---------- */}
      <section id="avancement" className="section section--white" aria-labelledby="avancement-title">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">{SITE.avancement.surtitre}</span>
            <h2 id="avancement-title">{SITE.avancement.titre}</h2>
            <p className="lead">{SITE.avancement.intro}</p>
          </div>
          <Timeline />
          <p className="mt-4">
            <Link href="/articles/messe-de-rentree-et-vie-du-projet">Lire le point d&apos;étape complet →</Link>
          </p>
        </div>
      </section>

      {/* ---------- Soutenir (résumé de la collecte) ---------- */}
      <section id="clocher" className="section section--navy" aria-labelledby="clocher-title">
        <div className="container">
          <div className="collecte-layout">
            <div className="panel reveal">
              <h3>Faites monter le clocher</h3>
              <p className="panel__sub">22 mètres à financer · déjà {formatEuros(config.montantCollecte)} réunis, terrain inclus</p>
              <Clocher data={clocher} compact />
            </div>
            <div className="reveal">
              <span className="eyebrow">Soutenir</span>
              <h2 id="clocher-title">Chaque pierre compte.</h2>
              <p className="lead">
                1 pierre = 10 €, 1 mur = 100 pierres. Au rythme des dons, le clocher de l&apos;église Saint Joseph s&apos;élève vers ses 22 mètres :
                aujourd&apos;hui {clocher.hauteurM.toLocaleString("fr-FR")} m sont financés.
              </p>
              <p>
                Votre don est déductible à 66 % de l&apos;impôt sur le revenu (60 % pour les entreprises) : un don de 100 € ne vous coûte réellement
                que 34 €.
              </p>
              <div className="row mt-2">
                <a className="btn btn--gold btn--lg" href={config.urlDon} target="_blank" rel="noopener">
                  Donner
                </a>
                <Link className="btn btn--ghost" href="/soutenir">
                  Toutes les façons de soutenir
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Valeurs ---------- */}
      {SITE.afficherValeurs && (
        <section id="valeurs" className="section section--alt" aria-labelledby="valeurs-title">
          <div className="container">
            <div className="section-head section-head--center reveal">
              <span className="eyebrow">Nos valeurs</span>
              <h2 id="valeurs-title">{SITE.valeurs.titre}</h2>
              <p className="lead">{SITE.valeurs.intro}</p>
            </div>
            <div className="values">
              {SITE.valeurs.items.map((v) => (
                <div key={v.nom} className="value reveal">
                  <h3>{v.nom}</h3>
                  <p>{v.texte}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------- Derniers articles ---------- */}
      <section className="section" aria-labelledby="articles-title">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Le projet</span>
            <h2 id="articles-title">Les derniers articles</h2>
            <p className="lead">Terrain, architectes, budget, équipe : tout ce qu&apos;il faut savoir, article après article.</p>
          </div>
          <div className="cards">
            {derniers.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
          <div className="row mt-4">
            <Link className="btn btn--navy" href="/articles">
              Tous les articles
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- Prochains rendez-vous ---------- */}
      <section className="section section--white section--tight" aria-labelledby="rdv-title">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Calendrier</span>
            <h2 id="rdv-title">Prochains rendez-vous</h2>
          </div>
          <UpcomingEvents events={upcoming} emptyPastCount={past.length} />
          {upcoming.length > 0 && (
            <p className="mt-4">
              <Link href="/calendrier">Voir tout le calendrier →</Link>
            </p>
          )}
        </div>
      </section>

      {/* ---------- Concours d'architectes ---------- */}
      <section id="concours" className="section section--alt" aria-labelledby="concours-title">
        <div className="container">
          <ConcoursArchitectes />
        </div>
      </section>

      {/* ---------- Livre d'Or des Bâtisseurs ---------- */}
      <section id="temoignages" className="section section--white" aria-labelledby="temoignages-title">
        <div className="container">
          <Testimonials />
        </div>
      </section>
    </>
  );
}
