import type { Evenement } from "./types";
import { absoluteUrl } from "./config";
import { stripMarkdown } from "./text";

function icsDate(iso: string, time?: string): string {
  const [y, m, d] = iso.split("-");
  if (time) {
    const mt = time.match(/^(\d{1,2})[:h](\d{2})?/);
    if (mt) return `${y}${m}${d}T${mt[1].padStart(2, "0")}${(mt[2] ?? "00").padStart(2, "0")}00`;
  }
  return `${y}${m}${d}`;
}

function nextDay(iso: string): string {
  const d = new Date(`${iso}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10);
}

function escapeIcs(text: string): string {
  return (text || "").replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
}

/** Fichier .ics (RFC 5545) pour « Ajouter à mon agenda ». */
export function eventToIcs(e: Evenement): string {
  const timed = Boolean(e.heureDebut);
  const start = icsDate(e.date, e.heureDebut);
  const end = timed
    ? icsDate(e.dateFin ?? e.date, e.heureFin ?? addHour(e.heureDebut!))
    : icsDate(nextDay(e.dateFin ?? e.date));
  const dt = timed ? `;TZID=Europe/Paris:` : `;VALUE=DATE:`;
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Projet SJO2//Calendrier//FR",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${e.slug}@saint-joseph-sjo2`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z")}`,
    `DTSTART${dt}${start}`,
    `DTEND${dt}${end}`,
    `SUMMARY:${escapeIcs(e.titre)}`,
    `DESCRIPTION:${escapeIcs(stripMarkdown(e.description))}${e.lienInscription ? `\\n\\nInscription : ${e.lienInscription}` : ""}`,
    e.lieu ? `LOCATION:${escapeIcs(e.lieu)}` : "",
    `URL:${absoluteUrl(`/calendrier/${e.slug}`)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].filter(Boolean);
  return lines.join("\r\n") + "\r\n";
}

function addHour(time: string): string {
  const m = time.match(/^(\d{1,2})[:h](\d{2})?/);
  if (!m) return time;
  const h = (parseInt(m[1], 10) + 1) % 24;
  return `${String(h).padStart(2, "0")}:${m[2] ?? "00"}`;
}

/** Lien « Ajouter à Google Agenda ». */
export function googleCalendarUrl(e: Evenement): string {
  const timed = Boolean(e.heureDebut);
  const start = icsDate(e.date, e.heureDebut);
  const end = timed ? icsDate(e.dateFin ?? e.date, e.heureFin ?? addHour(e.heureDebut!)) : icsDate(nextDay(e.dateFin ?? e.date));
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: e.titre,
    dates: `${start}/${end}`,
    details: `${stripMarkdown(e.description)}${e.lienInscription ? `\n\nInscription : ${e.lienInscription}` : ""}`,
    location: e.lieu ?? "",
    ctz: "Europe/Paris",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
