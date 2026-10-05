import Papa from "papaparse";
import fs from "node:fs/promises";
import path from "node:path";
import { normalizeHeader } from "./text";

/**
 * Accès au Google Sheet qui sert de CMS léger.
 *
 * Lecture « live » via l'export CSV public du classeur (nécessite le partage
 * « Tous les utilisateurs disposant du lien : Lecteur »), avec revalidation
 * toutes les REVALIDATE_SECONDS. Si le classeur n'est pas accessible, on
 * retombe sur la copie embarquée dans content/sheet-snapshot/ afin que le site
 * ne soit jamais vide ni cassé.
 */

export type SheetRow = Record<string, string>;
export type SheetSource = "live" | "snapshot" | "none";
export type SheetKind = "articles" | "categories" | "evenements" | "config";

export const REVALIDATE_SECONDS = 600;

const SHEET_ID = process.env.SHEET_ID || "1JXFBY3ZQwOT66k0cUUZUgv79xVxbC0oDMZ44NDMM_gQ";

const GIDS: Record<SheetKind, string | undefined> = {
  articles: process.env.SHEET_GID_ARTICLES ?? "0",
  categories: process.env.SHEET_GID_CATEGORIES ?? "659450165",
  evenements: process.env.SHEET_GID_EVENEMENTS || undefined,
  config: process.env.SHEET_GID_CONFIG || undefined,
};

const SNAPSHOTS: Partial<Record<SheetKind, string>> = {
  articles: "articles.csv",
  categories: "categories.csv",
};

export function csvExportUrl(gid: string): string {
  return `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${gid}`;
}

/** Parse un CSV (guillemets, retours à la ligne dans les cellules, BOM). */
export function parseCsv(text: string): string[][] {
  const result = Papa.parse<string[]>(text.replace(/^\uFEFF/, ""), {
    skipEmptyLines: "greedy",
  });
  return result.data.map((row) => row.map((cell) => (cell ?? "").toString()));
}

/**
 * Transforme des lignes brutes en objets dont les clés sont les en-têtes
 * normalisés (voir normalizeHeader). Les lignes entièrement vides sont ignorées.
 */
export function rowsToObjects(rows: string[][]): SheetRow[] {
  if (rows.length === 0) return [];
  const headers = rows[0].map((h) => normalizeHeader(h));
  const out: SheetRow[] = [];
  for (const row of rows.slice(1)) {
    const obj: SheetRow = {};
    let hasValue = false;
    headers.forEach((h, i) => {
      if (!h) return;
      const v = (row[i] ?? "").trim();
      if (v) hasValue = true;
      // Première colonne gagnante en cas d'en-têtes dupliqués.
      if (!(h in obj)) obj[h] = v;
    });
    if (hasValue) out.push(obj);
  }
  return out;
}

/** Première colonne non vide d'un onglet sans en-tête (liste simple). */
export function firstColumn(rows: string[][]): string[] {
  return rows.map((r) => (r[0] ?? "").trim()).filter(Boolean);
}

async function fetchLive(gid: string): Promise<string[][] | null> {
  try {
    const res = await fetch(csvExportUrl(gid), {
      next: { revalidate: REVALIDATE_SECONDS },
      redirect: "follow",
      headers: { Accept: "text/csv,*/*;q=0.8" },
    });
    if (!res.ok) return null;
    const contentType = res.headers.get("content-type") || "";
    // Un classeur privé renvoie une page HTML de connexion (ou une 401/403).
    if (contentType.includes("text/html")) return null;
    const text = await res.text();
    if (!text.trim() || text.trimStart().startsWith("<")) return null;
    return parseCsv(text);
  } catch {
    return null;
  }
}

async function readSnapshot(kind: SheetKind): Promise<string[][] | null> {
  const file = SNAPSHOTS[kind];
  if (!file) return null;
  try {
    const text = await fs.readFile(path.join(process.cwd(), "content", "sheet-snapshot", file), "utf8");
    return parseCsv(text);
  } catch {
    return null;
  }
}

const warned = new Set<string>();
function warnOnce(key: string, message: string) {
  if (warned.has(key)) return;
  warned.add(key);
  console.warn(`[sheets] ${message}`);
}

/** Charge un onglet : live si possible, sinon copie locale, sinon vide. */
export async function loadSheet(kind: SheetKind): Promise<{ rows: string[][]; source: SheetSource }> {
  const gid = GIDS[kind];
  if (gid) {
    const live = await fetchLive(gid);
    if (live && live.length > 0) return { rows: live, source: "live" };
    warnOnce(
      `live-${kind}`,
      `Onglet « ${kind} » (gid ${gid}) inaccessible : vérifiez que le classeur est partagé en lecture « Tous les utilisateurs disposant du lien ». Utilisation de la copie locale si elle existe.`,
    );
  }
  const snapshot = await readSnapshot(kind);
  if (snapshot && snapshot.length > 0) return { rows: snapshot, source: "snapshot" };
  return { rows: [], source: "none" };
}

/** Indique si un onglet optionnel est configuré (Evenements, Config). */
export function isSheetConfigured(kind: SheetKind): boolean {
  return Boolean(GIDS[kind]);
}
