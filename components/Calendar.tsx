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

function nextDayIso(iso: string): string {
  const d = new Date(`${iso}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10);
}

function addOneHour(time: string): string {
  const m = time.match(/^(\d{1,2})[:h](\d{2})?/);
  if (!m) return time;
  const h = (parseInt(m[1], 10) + 1) % 24;
  return `${String(h).padStart(2, "0")}:${m[2] ?? "00"}`;
}

function formatGcalDate(iso: string, time?: string): string {
  const [y, m, d] = iso.split("-");
  if (time) {
    const mt = time.match(/^(\d{1,2})[:h](\d{2})?/);
    if (mt) return `${y}${m}${d}T${mt[1].padStart(2, "0")}${(mt[2] ?? "00").padStart(2, "0")}00`;
  }
  return `${y}${m}${d}`;
}

function formatOutlookDate(iso: string, time?: string): string {
  if (!time) return iso;
  const mt = time.match(/^(\d{1,2})[:h](\d{2})?/);
  if (!mt) return iso;
  return `${iso}T${mt[1].padStart(2, "0")}:${(mt[2] ?? "00").padStart(2, "0")}:00`;
}

function buildGoogleCalUrl(e: Evenement): string {
  const timed = Boolean(e.heureDebut);
  const start = formatGcalDate(e.date, e.heureDebut);
  const end = timed
    ? formatGcalDate(e.dateFin ?? e.date, e.heureFin ?? addOneHour(e.heureDebut!))
    : formatGcalDate(nextDayIso(e.dateFin ?? e.date));
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: e.titre,
    dates: `${start}/${end}`,
    details: `${e.description || ""}${e.lienInscription ? `\n\nInscription : ${e.lienInscription}` : ""}`,
    location: e.lieu ?? "",
    ctz: "Europe/Paris",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function buildOutlookCalUrl(e: Evenement, host: "outlook.live.com" | "outlook.office.com"): string {
  const timed = Boolean(e.heureDebut);
  const startdt = timed ? formatOutlookDate(e.date, e.heureDebut) : e.date;
  const enddt = timed
    ? formatOutlookDate(e.dateFin ?? e.date, e.heureFin ?? addOneHour(e.heureDebut!))
    : nextDayIso(e.dateFin ?? e.date);
  const params = new URLSearchParams({
    path: "/calendar/action/compose",
    rru: "addevent",
    subject: e.titre,
    startdt,
    enddt,
    allday: timed ? "false" : "true",
    body: `${e.description || ""}${e.lienInscription ? `\n\nInscription : ${e.lienInscription}` : ""}`,
    location: e.lieu ?? "",
  });
  return `https://${host}/calendar/0/deeplink/compose?${params.toString()}`;
}

function AddToCalendarMenu({ e }: { e: Evenement }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (ev: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(ev.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", onDocClick);
    return () => document.removeEventListener("pointerdown", onDocClick);
  }, [open]);

  return (
    <div ref={wrapRef} className="cal-add-wrap">
      <button
        type="button"
        className="btn btn--gold btn--sm cal-add-btn"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        📅 Ajouter à mon agenda ▾
      </button>
      {open && (
        <div className="cal-add-menu">
          <a
            href={buildGoogleCalUrl(e)}
            target="_blank"
            rel="noopener"
            onClick={() => setOpen(false)}
          >
            📅 Google Calendar
          </a>
          <a
            href={buildOutlookCalUrl(e, "outlook.live.com")}
            target="_blank"
            rel="noopener"
            onClick={() => setOpen(false)}
          >
            🟦 Microsoft Calendar (Outlook.com)
          </a>
          <a
            href={buildOutlookCalUrl(e, "outlook.office.com")}
            target="_blank"
            rel="noopener"
            onClick={() => setOpen(false)}
          >
            🏢 Microsoft 365 (Professionnel)
          </a>
          <a
            href={`/calendrier/${e.slug}/ics`}
            className="cal-add-menu__ics"
            onClick={() => setOpen(false)}
          >
            🍎 Apple Calendar / Autre (.ics)
          </a>
        </div>
      )}
    </div>
  );
}

export function EventCard({ e, today, detailed = false }: { e: Evenement; today: string; detailed?: boolean }) {
  const past = (e.dateFin ?? e.date) < today;
  const heure = [formatHeure(e.heureDebut), formatHeure(e.heureFin)].filter(Boolean).join(" – ");
  const complet = isComplet(e);
  const photoCount = e.photos?.length ?? 0;
  const videoCount = e.videos?.length ?? 0;
  const hasMedia = photoCount > 0 || videoCount > 0;
  return (
    <div className="event-detail">
      <span className="badges">
        <span className="badge badge--gold">{e.categorie}</span>
        {past && <span className="badge">Passé</span>}
        {complet && <span className="badge badge--draft">Complet</span>}
        {photoCount > 0 && <span className="badge">{photoCount} photo{photoCount > 1 ? "s" : ""}</span>}
        {videoCount > 0 && <span className="badge">{videoCount} vidéo{videoCount > 1 ? "s" : ""}</span>}
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
      <div className="actions">
        {e.lienInscription && !past && (
          <a
            className="btn btn--gold"
            href={e.lienInscription}
            target={e.lienInscription.startsWith("http") ? "_blank" : undefined}
            rel={e.lienInscription.startsWith("http") ? "noopener" : undefined}
            aria-disabled={complet || undefined}
          >
            {complet ? "Complet" : "S'inscrire"}
          </a>
        )}
        {e.lienInfo && (
          <a className="btn btn--outline" href={e.lienInfo} target="_blank" rel="noopener">
            En savoir plus
          </a>
        )}
        {!past && <AddToCalendarMenu e={e} />}
        {!detailed && (
          <Link className="btn btn--navy btn--sm" href={`/calendrier/${e.slug}`}>
            {hasMedia ? "Page de l'événement (photos & vidéos) →" : "Page de l'événement →"}
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
            {(e.photos?.length || e.videos?.length) ? "Page & photos" : "Page"}
          </Link>
          {e.lienInscription && !past && (
            <a
              className="btn btn--gold btn--sm"
              href={e.lienInscription}
              target={e.lienInscription.startsWith("http") ? "_blank" : undefined}
              rel={e.lienInscription.startsWith("http") ? "noopener" : undefined}
            >
              S&apos;inscrire
            </a>
          )}
        </div>
      </div>
    </li>
  );
}
