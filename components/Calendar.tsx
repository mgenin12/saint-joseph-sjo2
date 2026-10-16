"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Evenement } from "@/lib/types";
import { formatDateFull, formatDateLong, formatHeure, formatMonth } from "@/lib/dates";
import Markdown from "./Markdown";

type Props = {
  events: Evenement[];
  today: string;
  initialMonth: string; // AAAA-MM
  initialDate?: string; // AAAA-MM-JJ
};

const DOW = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

function shiftMonth(yyyyMm: string, delta: number): string {
  const [y, m] = yyyyMm.split("-").map(Number);
  const d = new Date(Date.UTC(y, m - 1 + delta, 1));
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
}

function daysOfMonth(yyyyMm: string): { iso: string; inMonth: boolean }[] {
  const [y, m] = yyyyMm.split("-").map(Number);
  const first = new Date(Date.UTC(y, m - 1, 1));
  const offset = (first.getUTCDay() + 6) % 7; // lundi = 0
  const start = new Date(first);
  start.setUTCDate(1 - offset);
  const cells: { iso: string; inMonth: boolean }[] = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(start);
    d.setUTCDate(start.getUTCDate() + i);
    cells.push({ iso: d.toISOString().slice(0, 10), inMonth: d.getUTCMonth() === m - 1 });
  }
  // 5 semaines suffisent souvent : on retire la dernière ligne si elle est hors mois.
  if (cells.slice(35).every((c) => !c.inMonth)) cells.length = 35;
  return cells;
}

/** Un événement occupe toutes les dates entre date et dateFin. */
function occursOn(e: Evenement, iso: string): boolean {
  return iso >= e.date && iso <= (e.dateFin ?? e.date);
}

function isComplet(e: Evenement) {
  return e.places !== undefined && e.inscrits !== undefined && e.inscrits >= e.places;
}

function youtubeEmbedUrl(rawUrl: string): string | null {
  try {
    const u = new URL(rawUrl);
    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.replace(/^\//, "").split("/")[0];
      return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
    }
    if (u.hostname.includes("youtube.com") || u.hostname.includes("youtube-nocookie.com")) {
      if (u.pathname.startsWith("/embed/")) return rawUrl;
      if (u.pathname.startsWith("/shorts/")) {
        const id = u.pathname.replace(/^\/shorts\//, "").split("/")[0];
        return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
      }
      const v = u.searchParams.get("v");
      return v ? `https://www.youtube-nocookie.com/embed/${v}` : null;
    }
  } catch {
    return null;
  }
  return null;
}

function SmartActionLink({
  href,
  className,
  children,
  disabled,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
  disabled?: boolean;
}) {
  if (href.startsWith("/")) {
    return (
      <Link className={className} href={href} aria-disabled={disabled || undefined}>
        {children}
      </Link>
    );
  }
  return (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer" aria-disabled={disabled || undefined}>
      {children}
    </a>
  );
}

export function EventCard({ e, today, detailed = false }: { e: Evenement; today: string; detailed?: boolean }) {
  const past = (e.dateFin ?? e.date) < today;
  const heure = [formatHeure(e.heureDebut), formatHeure(e.heureFin)].filter(Boolean).join(" – ");
  const complet = isComplet(e);
  const photos = (e.photos ?? []).map((p) => (typeof p === "string" ? { url: p } : p));
  const videos = (e.videos ?? []).map((v) => (typeof v === "string" ? { url: v } : v));
  const hasMedia = photos.length > 0 || videos.length > 0;

  return (
    <div className="event-detail">
      <span className="badges">
        <span className="badge badge--gold">{e.categorie}</span>
        {past && <span className="badge">Passé</span>}
        {complet && <span className="badge badge--draft">Complet</span>}
        {hasMedia && <span className="badge">Photos / Vidéos</span>}
      </span>
      <h3>{e.titre}</h3>
      <p className="meta">
        <time dateTime={e.date}>{formatDateFull(e.date)}</time>
        {e.dateFin && e.dateFin !== e.date && <> → {formatDateLong(e.dateFin)}</>}
        {heure && <> · {heure}</>}
        {e.lieu && <> · {e.lieu}</>}
      </p>
      <div className="prose">
        <Markdown>{e.description || "*Description à venir.*"}</Markdown>
      </div>
      {e.places !== undefined && (
        <p className="small muted">
          {e.inscrits ?? 0} inscrit{(e.inscrits ?? 0) > 1 ? "s" : ""} / {e.places} places
        </p>
      )}
      {detailed && photos.length > 0 && (
        <div className="mt-4">
          <h4>Photos de l&apos;événement</h4>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: 16,
              marginTop: 12,
            }}
          >
            {photos.map((p, idx) => (
              <figure key={idx} style={{ margin: 0 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.url}
                  alt={p.legende || `${e.titre} — photo ${idx + 1}`}
                  style={{ width: "100%", borderRadius: 12, objectFit: "cover", maxHeight: 280 }}
                />
                {p.legende && (
                  <figcaption className="small muted" style={{ marginTop: 6 }}>
                    {p.legende}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </div>
      )}
      {detailed && videos.length > 0 && (
        <div className="mt-4">
          <h4>Vidéos de l&apos;événement</h4>
          <div style={{ display: "grid", gap: 16, marginTop: 12 }}>
            {videos.map((v, idx) => {
              const yt = youtubeEmbedUrl(v.url);
              return (
                <div key={idx}>
                  {yt ? (
                    <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", borderRadius: 12 }}>
                      <iframe
                        src={yt}
                        title={v.titre || `${e.titre} — vidéo ${idx + 1}`}
                        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <video src={v.url} controls style={{ width: "100%", borderRadius: 12 }} />
                  )}
                  {v.titre && (
                    <p className="small muted" style={{ marginTop: 6 }}>
                      {v.titre}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
      <div className="actions">
        {e.lienInscription && !past && (
          <SmartActionLink className="btn btn--gold" href={e.lienInscription} disabled={complet}>
            {complet ? "Complet" : "S'inscrire"}
          </SmartActionLink>
        )}
        {e.lienInfo && (
          <SmartActionLink className="btn btn--outline" href={e.lienInfo}>
            En savoir plus
          </SmartActionLink>
        )}
        {!past && (
          <a className="btn btn--outline btn--sm" href={`/calendrier/${e.slug}/ics`}>
            Ajouter à mon agenda
          </a>
        )}
        {!detailed && (
          <Link className="btn btn--navy btn--sm" href={`/calendrier/${e.slug}`}>
            {hasMedia ? "Page de l'événement (photos & vidéos)" : "Page de l'événement"}
          </Link>
        )}
      </div>
    </div>
  );
}

/**
 * Calendrier mensuel + listes « à venir » / « passés ». Un clic sur une date
 * ouvre un panneau avec la description de chaque événement et son lien d'inscription.
 * L'état (mois, date) est reflété dans l'URL : /calendrier?mois=AAAA-MM&date=AAAA-MM-JJ
 */
export default function Calendar({ events, today, initialMonth, initialDate }: Props) {
  const [month, setMonth] = useState(initialMonth);
  const [selected, setSelected] = useState<string | undefined>(initialDate);
  const first = useRef(true);

  const cells = useMemo(() => daysOfMonth(month), [month]);
  const byDate = useMemo(() => {
    const map = new Map<string, Evenement[]>();
    for (const c of cells) {
      const list = events.filter((e) => occursOn(e, c.iso));
      if (list.length) map.set(c.iso, list);
    }
    return map;
  }, [cells, events]);

  const upcoming = useMemo(() => events.filter((e) => (e.dateFin ?? e.date) >= today), [events, today]);
  const past = useMemo(() => events.filter((e) => (e.dateFin ?? e.date) < today).slice().reverse(), [events, today]);
  const selectedEvents = selected ? events.filter((e) => occursOn(e, selected)) : [];

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const p = new URLSearchParams();
    p.set("mois", month);
    if (selected) p.set("date", selected);
    window.history.replaceState(window.history.state, "", `${window.location.pathname}?${p.toString()}`);
  }, [month, selected]);

  const close = useCallback(() => setSelected(undefined), []);
  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [selected, close]);

  const pick = (iso: string) => {
    setMonth(iso.slice(0, 7));
    setSelected(iso);
  };

  return (
    <>
      <div className="cal-layout">
        <div className="cal">
          <div className="cal__head">
            <h2 className="cal__title" aria-live="polite">
              {formatMonth(month)}
            </h2>
            <div className="cal__nav">
              <button type="button" onClick={() => setMonth(shiftMonth(month, -1))} aria-label="Mois précédent">
                ‹
              </button>
              <button type="button" className="today" onClick={() => setMonth(today.slice(0, 7))}>
                Aujourd&apos;hui
              </button>
              <button type="button" onClick={() => setMonth(shiftMonth(month, 1))} aria-label="Mois suivant">
                ›
              </button>
            </div>
          </div>
          <div className="cal__grid" role="grid" aria-label={`Calendrier de ${formatMonth(month)}`}>
            {DOW.map((d) => (
              <div key={d} className="cal__dow" role="columnheader">
                {d}
              </div>
            ))}
            {cells.map((c) => {
              const list = byDate.get(c.iso);
              const has = Boolean(list?.length);
              const cls = [
                "cal__day",
                !c.inMonth && "cal__day--muted",
                c.iso < today && "cal__day--past",
                c.iso === today && "cal__day--today",
                has && "cal__day--has",
                selected === c.iso && "cal__day--selected",
              ]
                .filter(Boolean)
                .join(" ");
              const label = `${formatDateFull(c.iso)}${has ? ` : ${list!.map((e) => e.titre).join(", ")}` : ""}`;
              return has ? (
                <button key={c.iso} type="button" className={cls} onClick={() => pick(c.iso)} aria-label={label} role="gridcell">
                  <span>{Number(c.iso.slice(8))}</span>
                  <span className="cal__dot" aria-hidden="true" />
                  {list!.length > 1 && <span className="cal__count">{list!.length}</span>}
                </button>
              ) : (
                <div key={c.iso} className={cls} role="gridcell" aria-label={label}>
                  <span>{Number(c.iso.slice(8))}</span>
                </div>
              );
            })}
          </div>
          <div className="cal__legend">
            <span>Date avec événement — cliquez pour le détail et l&apos;inscription</span>
          </div>
        </div>

        <aside>
          <h2 style={{ fontSize: "1.4rem" }}>À venir</h2>
          {upcoming.length === 0 ? (
            <p className="muted">
              Aucun événement à venir n&apos;est encore annoncé. Inscrivez-vous à la <Link href="/newsletter">newsletter</Link>{" "}
              pour être prévenu.
            </p>
          ) : (
            <ul className="event-list">
              {upcoming.map((e) => (
                <EventItem key={e.slug} e={e} onPick={pick} />
              ))}
            </ul>
          )}
          {past.length > 0 && (
            <>
              <h2 style={{ fontSize: "1.4rem", marginTop: 32 }}>Événements passés</h2>
              <ul className="event-list">
                {past.map((e) => (
                  <EventItem key={e.slug} e={e} onPick={pick} past />
                ))}
              </ul>
            </>
          )}
        </aside>
      </div>

      {selected && (
        <div className="event-panel" onClick={close} role="presentation">
          <div className="event-panel__inner" role="dialog" aria-modal="true" aria-label={formatDateFull(selected)} onClick={(e) => e.stopPropagation()}>
            <button type="button" className="event-panel__close" onClick={close} aria-label="Fermer">
              ×
            </button>
            <span className="eyebrow">{formatDateFull(selected)}</span>
            {selectedEvents.length === 0 ? (
              <p className="muted">Aucun événement ce jour-là.</p>
            ) : (
              selectedEvents.map((e) => <EventCard key={e.slug} e={e} today={today} />)
            )}
          </div>
        </div>
      )}
    </>
  );
}

function EventItem({ e, onPick, past = false }: { e: Evenement; onPick: (iso: string) => void; past?: boolean }) {
  const d = new Date(`${e.date}T12:00:00Z`);
  const mois = d.toLocaleDateString("fr-FR", { month: "short", timeZone: "UTC" }).replace(".", "");
  const heure = formatHeure(e.heureDebut);
  return (
    <li className={`event-item${past ? " event-item--past" : ""}`}>
      <div className="event-date" aria-hidden="true">
        <b>{d.getUTCDate()}</b>
        <small>{mois}</small>
      </div>
      <div>
        <h3>
          <button type="button" className="linklike" onClick={() => onPick(e.date)} style={{ background: "none", border: 0, padding: 0, font: "inherit", color: "inherit", textAlign: "left" }}>
            {e.titre}
          </button>
        </h3>
        <div className="meta">
          {formatDateLong(e.date)}
          {heure && ` · ${heure}`}
          {e.lieu && ` · ${e.lieu}`}
        </div>
        <div className="row mt-2" style={{ gap: 8 }}>
          <button type="button" className="btn btn--outline btn--sm" onClick={() => onPick(e.date)}>
            Détails
          </button>
          <Link className="btn btn--outline btn--sm" href={`/calendrier/${e.slug}`}>
            {(e.photos?.length || e.videos?.length) ? "Photos & vidéos" : "Page"}
          </Link>
          {e.lienInscription && !past && (
            <SmartActionLink className="btn btn--gold btn--sm" href={e.lienInscription}>
              S&apos;inscrire
            </SmartActionLink>
          )}
        </div>
      </div>
    </li>
  );
}
