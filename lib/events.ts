import { cache } from "react";
import type { Evenement } from "./types";
import { loadSheet, rowsToObjects, isSheetConfigured, type SheetRow } from "./sheets";
import { slugify, splitList, parseBool, driveImageUrl } from "./text";
import { toIsoDate, todayIso } from "./dates";
import { EVENEMENTS_DEMARRAGE } from "@/content/evenements";

function pick(row: SheetRow, ...keys: string[]): string | undefined {
  for (const k of keys) {
    const v = row[k];
    if (v && v.trim()) return v.trim();
  }
  return undefined;
}

function toInt(v: string | undefined): number | undefined {
  if (!v) return undefined;
  const n = parseInt(v.replace(/\s/g, ""), 10);
  return Number.isFinite(n) ? n : undefined;
}

/** Convertit les lignes de l'onglet « Evenements » en événements. */
export function buildEvents(rows: SheetRow[]): Evenement[] {
  const used = new Set<string>();
  const out: Evenement[] = [];
  rows.forEach((row) => {
    const titre = pick(row, "titre", "title", "evenement", "nom");
    const date = toIsoDate(pick(row, "date", "date_debut"));
    if (!titre || !date) return;
    const base = pick(row, "slug") ? slugify(pick(row, "slug")!) : slugify(`${date}-${titre}`);
    let slug = base;
    let n = 2;
    while (used.has(slug)) slug = `${base}-${n++}`;
    used.add(slug);
    out.push({
      slug,
      titre,
      date,
      dateFin: toIsoDate(pick(row, "date_fin")),
      heureDebut: pick(row, "heure_debut", "heure"),
      heureFin: pick(row, "heure_fin"),
      lieu: pick(row, "lieu"),
      categorie: pick(row, "categorie", "type") ?? "Événement",
      description: pick(row, "description", "contenu") ?? "",
      lienInscription: pick(row, "lien_inscription", "inscription", "lien_d_inscription"),
      places: toInt(pick(row, "places")),
      inscrits: toInt(pick(row, "inscrits")),
      image: driveImageUrl(pick(row, "image")),
      publie: parseBool(pick(row, "publie", "publié", "statut"), true),
      lienInfo: pick(row, "lien_info", "lien"),
    });
  });
  return out;
}

const loadEvents = cache(async (): Promise<{ events: Evenement[]; source: "sheet" | "repo" }> => {
  if (isSheetConfigured("evenements")) {
    const sheet = await loadSheet("evenements");
    if (sheet.source === "live" && sheet.rows.length > 1) {
      return { events: buildEvents(rowsToObjects(sheet.rows)).filter((e) => e.publie), source: "sheet" };
    }
  }
  return { events: EVENEMENTS_DEMARRAGE.filter((e) => e.publie), source: "repo" };
});

export function sortEvents(events: Evenement[]): Evenement[] {
  return [...events].sort((a, b) =>
    a.date === b.date ? (a.heureDebut ?? "").localeCompare(b.heureDebut ?? "") : a.date < b.date ? -1 : 1,
  );
}

export async function getEvents(): Promise<Evenement[]> {
  return sortEvents((await loadEvents()).events);
}

export async function getEvent(slug: string): Promise<Evenement | undefined> {
  return (await getEvents()).find((e) => e.slug === slug);
}

export async function getUpcomingEvents(n = 3, today = todayIso()): Promise<Evenement[]> {
  return (await getEvents()).filter((e) => (e.dateFin ?? e.date) >= today).slice(0, n);
}

export async function getPastEvents(today = todayIso()): Promise<Evenement[]> {
  return (await getEvents()).filter((e) => (e.dateFin ?? e.date) < today).reverse();
}

export function isComplet(e: Evenement): boolean {
  return e.places !== undefined && e.inscrits !== undefined && e.inscrits >= e.places;
}

/** Catégories d'événements présentes (pour les filtres du calendrier). */
export function eventCategories(events: Evenement[]): string[] {
  return [...new Set(events.map((e) => e.categorie))];
}

export { splitList };
