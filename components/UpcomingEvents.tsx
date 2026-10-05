import Link from "next/link";
import type { Evenement } from "@/lib/types";
import { formatDateLong, formatHeure } from "@/lib/dates";

/** Liste compacte des prochains rendez-vous (accueil, bloc [[calendrier]] en mode résumé). */
export default function UpcomingEvents({ events, emptyPastCount = 0 }: { events: Evenement[]; emptyPastCount?: number }) {
  if (events.length === 0) {
    return (
      <div className="empty">
        <p>
          Aucun événement à venir n&apos;est encore annoncé.
          {emptyPastCount > 0 && ` Retrouvez les ${emptyPastCount} étapes et rendez-vous passés dans le calendrier.`}
        </p>
        <div className="row" style={{ justifyContent: "center" }}>
          <Link className="btn btn--navy btn--sm" href="/calendrier">
            Voir le calendrier
          </Link>
          <Link className="btn btn--outline btn--sm" href="/newsletter">
            Être prévenu par la newsletter
          </Link>
        </div>
      </div>
    );
  }
  return (
    <ul className="event-list">
      {events.map((e) => {
        const d = new Date(`${e.date}T12:00:00Z`);
        const mois = d.toLocaleDateString("fr-FR", { month: "short", timeZone: "UTC" }).replace(".", "");
        const heure = formatHeure(e.heureDebut);
        return (
          <li key={e.slug} className="event-item reveal">
            <div className="event-date" aria-hidden="true">
              <b>{d.getUTCDate()}</b>
              <small>{mois}</small>
            </div>
            <div>
              <h3>
                <Link href={`/calendrier/${e.slug}`}>{e.titre}</Link>
              </h3>
              <div className="meta">
                {formatDateLong(e.date)}
                {heure && ` · ${heure}`}
                {e.lieu && ` · ${e.lieu}`}
              </div>
              <div className="row mt-2" style={{ gap: 8 }}>
                <Link className="btn btn--outline btn--sm" href={`/calendrier?date=${e.date}`}>
                  Détails
                </Link>
                {e.lienInscription && (
                  <a className="btn btn--gold btn--sm" href={e.lienInscription} target="_blank" rel="noopener">
                    S&apos;inscrire
                  </a>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
