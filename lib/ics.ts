import type { Evenement } from "./types";
import { absoluteUrl } from "./config";
import { slugify, stripMarkdown, driveImageUrl } from "./text";

export const DEFAULT_GOOGLE_CALENDAR_ID =
  "9f2cb93155d97884909c3bcb4fb4c887a2659636e5c6059d68c6e43ad0b842e5@group.calendar.google.com";

export function getGoogleCalendarId(): string {
  return (process.env.GOOGLE_CALENDAR_ID || DEFAULT_GOOGLE_CALENDAR_ID).trim();
}

/** URL publique du flux iCal (.ics) d'un agenda Google public. */
export function googleCalendarIcsUrl(calendarId = getGoogleCalendarId()): string {
  if (process.env.GOOGLE_CALENDAR_ICS_URL?.trim()) {
    return process.env.GOOGLE_CALENDAR_ICS_URL.trim();
  }
  return `https://calendar.google.com/calendar/ical/${encodeURIComponent(calendarId)}/public/basic.ics`;
}

/** Lien « S'abonner à ce Google Agenda » (ouverture dans Google Calendar). */
export function googleCalendarSubscribeUrl(calendarId = getGoogleCalendarId()): string {
  const cid = Buffer.from(calendarId, "utf8").toString("base64").replace(/=+$/, "");
  return `https://calendar.google.com/calendar/r?cid=${cid}`;
}

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

function prevDay(iso: string): string {
  const d = new Date(`${iso}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() - 1);
  return d.toISOString().slice(0, 10);
}

function escapeIcs(text: string): string {
  return (text || "").replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
}

function unescapeIcs(text: string): string {
  return (text || "")
    .replace(/\\[nN]/g, "\n")
    .replace(/\\,/g, ",")
    .replace(/\\;/g, ";")
    .replace(/\\\\/g, "\\");
}

function eventToVeventLines(e: Evenement): string[] {
  const timed = Boolean(e.heureDebut);
  const start = icsDate(e.date, e.heureDebut);
  const end = timed
    ? icsDate(e.dateFin ?? e.date, e.heureFin ?? addHour(e.heureDebut!))
    : icsDate(nextDay(e.dateFin ?? e.date));
  const dt = timed ? `;TZID=Europe/Paris:` : `;VALUE=DATE:`;
  return [
    "BEGIN:VEVENT",
    `UID:${e.slug}@saint-joseph-sjo2`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z")}`,
    `DTSTART${dt}${start}`,
    `DTEND${dt}${end}`,
    `SUMMARY:${escapeIcs(e.titre)}`,
    `CATEGORIES:${escapeIcs(e.categorie)}`,
    `DESCRIPTION:${escapeIcs(stripMarkdown(e.description))}${e.lienInscription ? `\\n\\nInscription : ${e.lienInscription}` : ""}${e.lienInfo ? `\\nInfo : ${e.lienInfo}` : ""}`,
    e.lieu ? `LOCATION:${escapeIcs(e.lieu)}` : "",
    `URL:${absoluteUrl(`/calendrier/${e.slug}`)}`,
    "END:VEVENT",
  ].filter(Boolean);
}

/** Fichier .ics (RFC 5545) pour « Ajouter à mon agenda ». */
export function eventToIcs(e: Evenement): string {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Projet SJO2//Calendrier//FR",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    ...eventToVeventLines(e),
    "END:VCALENDAR",
  ];
  return lines.join("\r\n") + "\r\n";
}

/** Fichier .ics regroupant plusieurs événements (ex. export vers Google Agenda). */
export function eventsToIcsCalendar(events: Evenement[]): string {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Projet SJO2//Calendrier//FR",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    ...events.flatMap((e) => eventToVeventLines(e)),
    "END:VCALENDAR",
  ];
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

type ParsedIcsDateTime = {
  date: string;
  time?: string;
  allDay: boolean;
};

const parisFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Europe/Paris",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

function parseIcsDateTime(rawVal: string, params: string): ParsedIcsDateTime | undefined {
  const val = rawVal.trim();
  if (/^\d{8}$/.test(val) || /VALUE=DATE\b/i.test(params)) {
    const v = val.slice(0, 8);
    if (!/^\d{8}$/.test(v)) return undefined;
    return {
      date: `${v.slice(0, 4)}-${v.slice(4, 6)}-${v.slice(6, 8)}`,
      allDay: true,
    };
  }
  const m = val.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})(Z)?$/i);
  if (!m) return undefined;
  const [, y, mo, d, hh, mm, ss, isUtc] = m;
  if (isUtc) {
    const utc = new Date(Date.UTC(Number(y), Number(mo) - 1, Number(d), Number(hh), Number(mm), Number(ss)));
    const parts = Object.fromEntries(parisFormatter.formatToParts(utc).map((p) => [p.type, p.value]));
    return {
      date: `${parts.year}-${parts.month}-${parts.day}`,
      time: `${parts.hour}:${parts.minute}`,
      allDay: false,
    };
  }
  return {
    date: `${y}-${mo}-${d}`,
    time: `${hh}:${mm}`,
    allDay: false,
  };
}

function cleanIcsHtml(raw: string): string {
  return raw
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p\s*>/gi, "\n\n")
    .replace(/<li\s*>/gi, "- ")
    .replace(/<\/li\s*>/gi, "\n")
    .replace(/<a\s+[^>]*href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gi, (_all, href: string, label: string) => {
      const cleanLabel = label.replace(/<[^>]+>/g, "").trim();
      if (!cleanLabel || cleanLabel === href) return href;
      return `[${cleanLabel}](${href})`;
    })
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/**
 * Convertit un flux iCal (.ics) Google Agenda en liste d'événements du site.
 *
 * Conventions facultatives dans la description de l'événement Google Agenda :
 * - « Catégorie : Messe » (ou préfixe « [Messe] Titre » dans le titre)
 * - « Inscription : https://... » (ou n'importe quel lien http(s) dans la description → bouton « S'inscrire »)
 * - « Info : https://... »
 * - « Places : 150 » / « Inscrits : 45 »
 * - « Image : https://... »
 */
export function parseIcsEvents(icsText: string): Evenement[] {
  if (!icsText || !icsText.includes("BEGIN:VCALENDAR")) return [];
  const unfolded = icsText.replace(/\r?\n[ \t]/g, "");
  const lines = unfolded.split(/\r?\n/);

  const usedSlugs = new Set<string>();
  const events: Evenement[] = [];
  let inEvent = false;
  let props: { name: string; params: string; value: string }[] = [];

  for (const line of lines) {
    if (line === "BEGIN:VEVENT") {
      inEvent = true;
      props = [];
      continue;
    }
    if (line === "END:VEVENT") {
      if (inEvent) {
        const ev = buildEventFromVevent(props, usedSlugs);
        if (ev) events.push(ev);
      }
      inEvent = false;
      props = [];
      continue;
    }
    if (!inEvent) continue;

    // Sépare NOM;PARAMS:VALEUR en tenant compte des guillemets dans les paramètres.
    let colonIdx = -1;
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') inQuotes = !inQuotes;
      else if (ch === ":" && !inQuotes) {
        colonIdx = i;
        break;
      }
    }
    if (colonIdx === -1) continue;
    const left = line.slice(0, colonIdx);
    const value = line.slice(colonIdx + 1);
    const semiIdx = left.indexOf(";");
    const name = (semiIdx === -1 ? left : left.slice(0, semiIdx)).toUpperCase();
    const params = semiIdx === -1 ? "" : left.slice(semiIdx + 1);
    props.push({ name, params, value });
  }

  return events;
}

function buildEventFromVevent(
  props: { name: string; params: string; value: string }[],
  usedSlugs: Set<string>,
): Evenement | undefined {
  const getProp = (name: string) => props.find((p) => p.name === name);
  const status = getProp("STATUS")?.value.trim().toUpperCase();
  if (status === "CANCELLED") return undefined;

  // Les événements marqués « Privé » ou « Confidentiel » dans Google Agenda sont ignorés.
  const visibility = getProp("CLASS")?.value.trim().toUpperCase();
  if (visibility === "PRIVATE" || visibility === "CONFIDENTIAL") return undefined;

  const dtStartProp = getProp("DTSTART");
  if (!dtStartProp) return undefined;
  const start = parseIcsDateTime(dtStartProp.value, dtStartProp.params);
  if (!start) return undefined;

  let rawTitle = unescapeIcs(getProp("SUMMARY")?.value ?? "").replace(/\s+/g, " ").trim();
  if (!rawTitle) return undefined;

  const rawDesc = cleanIcsHtml(unescapeIcs(getProp("DESCRIPTION")?.value ?? ""));

  // Filtre optionnel : si GOOGLE_CALENDAR_FILTER_TAG est défini (ex. "#site"),
  // seuls les événements contenant ce mot-clé dans le titre ou la description sont affichés.
  const filterTag = process.env.GOOGLE_CALENDAR_FILTER_TAG?.trim();
  if (filterTag) {
    const lowerTag = filterTag.toLowerCase();
    if (!rawTitle.toLowerCase().includes(lowerTag) && !rawDesc.toLowerCase().includes(lowerTag)) {
      return undefined;
    }
    rawTitle = rawTitle.replace(new RegExp(filterTag.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "ig"), "").trim();
  }

  let categorie = unescapeIcs(getProp("CATEGORIES")?.value ?? "").split(",")[0]?.trim() || "";
  const bracketMatch = rawTitle.match(/^\[([^\]]+)\]\s*(.+)$/);
  if (bracketMatch) {
    if (!categorie) categorie = bracketMatch[1].trim();
    rawTitle = bracketMatch[2].trim();
  }

  const dtEndProp = getProp("DTEND");
  const end = dtEndProp ? parseIcsDateTime(dtEndProp.value, dtEndProp.params) : undefined;
  let dateFin: string | undefined;
  let heureFin: string | undefined;
  if (end) {
    if (start.allDay && end.allDay) {
      const inclusiveEnd = prevDay(end.date);
      if (inclusiveEnd > start.date) dateFin = inclusiveEnd;
    } else {
      if (end.date > start.date) dateFin = end.date;
      if (end.time && end.time !== start.time) heureFin = end.time;
    }
  }

  const lieu = unescapeIcs(getProp("LOCATION")?.value ?? "").replace(/\s+/g, " ").trim() || undefined;

  let lienInscription: string | undefined;
  let lienInfo: string | undefined;
  let places: number | undefined;
  let inscrits: number | undefined;
  let image: string | undefined;
  const photos: string[] = [];
  const videos: string[] = [];

  const bodyLines: string[] = [];
  for (const line of rawDesc.split("\n")) {
    const trimmed = line.trim();
    const catMatch = trimmed.match(/^(?:cat[ée]gorie|type)\s*[:=-]\s*(.+)$/i);
    if (catMatch) {
      if (!categorie) categorie = catMatch[1].trim();
      continue;
    }
    const inscMatch = trimmed.match(/^(?:(?:lien\s+d['’]?)?inscription|s['’]inscrire|billetterie)\s*[:=-]\s*(https?:\/\/\S+)$/i);
    if (inscMatch) {
      lienInscription = inscMatch[1].trim();
      continue;
    }
    const infoMatch = trimmed.match(/^(?:lien\s+info|info|en\s+savoir\s+plus|lien)\s*[:=-]\s*(https?:\/\/\S+|\/\S+)$/i);
    if (infoMatch) {
      lienInfo = infoMatch[1].trim();
      continue;
    }
    const photoMatch = trimmed.match(/^photos?\s*[:=-]\s*(https?:\/\/\S+|\/\S+)$/i);
    if (photoMatch) {
      const u = driveImageUrl(photoMatch[1].trim()) ?? photoMatch[1].trim();
      photos.push(u);
      continue;
    }
    const videoMatch = trimmed.match(/^vid[ée]os?\s*[:=-]\s*(https?:\/\/\S+)$/i);
    if (videoMatch) {
      videos.push(videoMatch[1].trim());
      continue;
    }
    const placesMatch = trimmed.match(/^places\s*[:=-]\s*(\d+)$/i);
    if (placesMatch) {
      places = parseInt(placesMatch[1], 10);
      continue;
    }
    const inscritsMatch = trimmed.match(/^inscrits\s*[:=-]\s*(\d+)$/i);
    if (inscritsMatch) {
      inscrits = parseInt(inscritsMatch[1], 10);
      continue;
    }
    const imgMatch = trimmed.match(/^image\s*[:=-]\s*(https?:\/\/\S+)$/i);
    if (imgMatch) {
      image = driveImageUrl(imgMatch[1].trim());
      continue;
    }
    bodyLines.push(line);
  }

  const description = bodyLines.join("\n").trim();

  // Si aucun « Inscription : https://... » explicite n'a été trouvé mais que la
  // description contient un lien http(s), on l'utilise pour le bouton « S'inscrire ».
  if (!lienInscription) {
    const urlMatch = description.match(/https?:\/\/[^\s)>\]]+/i);
    if (urlMatch) {
      lienInscription = urlMatch[0].replace(/[.,;!?]+$/, "");
    }
  }

  const baseSlug = slugify(`${start.date}-${rawTitle}`);
  let slug = baseSlug;
  let n = 2;
  while (usedSlugs.has(slug)) slug = `${baseSlug}-${n++}`;
  usedSlugs.add(slug);

  return {
    slug,
    titre: rawTitle,
    date: start.date,
    dateFin,
    heureDebut: start.time,
    heureFin,
    lieu,
    categorie: categorie || "Événement",
    description,
    lienInscription,
    lienInfo,
    places,
    inscrits,
    image,
    photos: photos.length ? photos : undefined,
    videos: videos.length ? videos : undefined,
    publie: true,
  };
}

