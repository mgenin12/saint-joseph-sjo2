import { SITE } from "@/content/site";

type Jalon = { periode: string; etat: "done" | "now" | "todo"; titre: string; texte: string };

const BADGES: Record<Jalon["etat"], string> = { done: "Réalisé", now: "En cours", todo: "À venir" };

/** Frise des jalons du projet (contenu : content/site.ts → avancement.jalons). */
export default function Timeline({ jalons = SITE.avancement.jalons as readonly Jalon[] }: { jalons?: readonly Jalon[] }) {
  return (
    <ol className="tl">
      {jalons.map((j, i) => (
        <li key={`${j.periode}-${i}`} className={`tl__item tl__item--${j.etat} reveal`}>
          <span className="tl__dot" aria-hidden="true" />
          <div className="tl__period">
            {j.periode} <span className="tl__badge">{BADGES[j.etat]}</span>
          </div>
          <h3 className="tl__title">{j.titre}</h3>
          <p className="tl__text">{j.texte}</p>
        </li>
      ))}
    </ol>
  );
}
