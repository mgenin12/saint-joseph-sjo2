import Image from "next/image";
import Link from "next/link";
import Markdown from "./Markdown";
import Timeline from "./Timeline";
import Clocher from "./Clocher";
import Wall from "./Wall";
import Donut from "./Donut";
import TeamGrid from "./TeamGrid";
import Missions from "./Missions";
import Faq from "./Faq";
import Calendar from "./Calendar";
import ConcoursArchitectes from "./ConcoursArchitectes";
import Testimonials from "./Testimonials";
import { splitBlocks, type BlockName } from "@/lib/blocks";
import { computeClocher, getSiteConfig } from "@/lib/config";
import { getEvents } from "@/lib/events";
import { monthOrCurrent, todayIso } from "@/lib/dates";
import { SITE } from "@/content/site";

/* ---------- Blocs individuels (réutilisés par les pages) ---------- */

export function BudgetBlock() {
  const b = SITE.budget;
  return (
    <div className="block">
      <div className="budget-cards">
        {b.cartes.map((c) => (
          <div key={c.label} className="budget-card">
            <span>{c.label}</span>
            <b>{c.valeur}</b>
          </div>
        ))}
      </div>
      <Donut parts={b.repartition} />
      <p className="small muted mt-2">{b.note}</p>
      <div className="steps">
        {b.calendrier.map((s) => (
          <div key={s.periode + s.label} className="step">
            <b>{s.periode}</b>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
      <p className="quote">{b.citation}</p>
    </div>
  );
}

export function EquipeBlock() {
  const e = SITE.equipe;
  return (
    <div className="block">
      <div className="moa reveal">
        <Image src={e.cure.photo} alt={e.cure.nom} width={320} height={320} />
        <div>
          <span className="eyebrow">Maîtrise d&apos;ouvrage</span>
          <h3>{e.cure.nom}</h3>
          <p className="small" style={{ color: "var(--gold)", fontWeight: 700 }}>
            {e.cure.role}
          </p>
          <blockquote>« {e.cure.citation} »</blockquote>
          <p>{e.cure.bio}</p>
        </div>
      </div>
      <p className="lead">{e.intro}</p>
      <div className="skills">
        {e.competences.map((c) => (
          <div key={c} className="skill">
            {c}
          </div>
        ))}
      </div>
      <div className="benevoles">
        <b>100+</b>
        <p style={{ margin: 0 }}>{e.benevoles}</p>
      </div>
      <TeamGrid membres={e.membres} />
      <p className="quote">{e.citation}</p>
    </div>
  );
}

export async function ClocherBlock() {
  const config = await getSiteConfig();
  const data = computeClocher(config.montantCollecte, config.objectif);
  return (
    <div className="block">
      <div className="collecte-layout">
        <div className="panel">
          <h3>Le clocher s&apos;élève</h3>
          <p className="panel__sub">22 mètres à financer · 1 m ≈ {data.eurosParMetre.toLocaleString("fr-FR")} €</p>
          <Clocher data={data} />
        </div>
        <div className="panel">
          <h3>Le mur des bâtisseurs</h3>
          <p className="panel__sub">1 pierre = 10 € · 1 mur = 100 pierres = 1 000 €</p>
          <Wall data={data} />
          <div className="row mt-4">
            <a className="btn btn--gold" href={config.urlDon} target="_blank" rel="noopener">
              Poser ma pierre
            </a>
            <Link className="btn btn--ghost" href="/soutenir">
              Toutes les façons de soutenir
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function CalendrierBlock() {
  const events = await getEvents();
  const today = todayIso();
  return (
    <div className="block">
      <Calendar events={events} today={today} initialMonth={monthOrCurrent(undefined)} />
    </div>
  );
}

export function FaqBlock() {
  return (
    <div className="block">
      <Faq items={SITE.faq} />
    </div>
  );
}

export function MissionsBlock() {
  return (
    <div className="block">
      <p className="lead">{SITE.missions.intro}</p>
      <Missions groupes={SITE.missions.groupes} />
      <p className="mt-2">
        Une autre compétence à proposer ?{" "}
        <Link href="/contact?sujet=benevolat" className="btn btn--navy btn--sm">
          Nous écrire
        </Link>
      </p>
    </div>
  );
}

export function AvancementBlock() {
  return (
    <div className="block">
      <Timeline />
    </div>
  );
}

function renderBlock(name: BlockName) {
  switch (name) {
    case "budget":
      return <BudgetBlock />;
    case "equipe":
      return <EquipeBlock />;
    case "avancement":
      return <AvancementBlock />;
    case "calendrier":
      return <CalendrierBlock />;
    case "clocher":
      return <ClocherBlock />;
    case "faq":
      return <FaqBlock />;
    case "missions":
      return <MissionsBlock />;
    case "concours":
      return <ConcoursArchitectes compact />;
    case "temoignages":
      return <Testimonials />;
  }
}

/** Corps d'article : Markdown + blocs dynamiques `[[nom]]`. */
export default async function Blocks({ markdown }: { markdown: string }) {
  const segments = splitBlocks(markdown);
  return (
    <>
      {segments.map((s, i) =>
        s.type === "markdown" ? (
          <Markdown key={i}>{s.value}</Markdown>
        ) : (
          <div key={i} data-block={s.name}>
            {renderBlock(s.name)}
          </div>
        ),
      )}
    </>
  );
}
