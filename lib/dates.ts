import { format, parseISO, isValid } from "date-fns";
import { fr } from "date-fns/locale";

/**
 * Convertit une date du Sheet en ISO (AAAA-MM-JJ).
 * Formats acceptés : JJ/MM/AAAA, JJ-MM-AAAA, AAAA-MM-JJ, AAAA/MM/JJ, et dates complètes ISO.
 * Retourne undefined si la date est vide ou invalide.
 */
export function toIsoDate(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const v = value.trim();
  if (!v) return undefined;
  let m = v.match(/^(\d{1,2})[/.-](\d{1,2})[/.-](\d{4})/);
  if (m) {
    const [, d, mo, y] = m;
    return checkIso(`${y}-${mo.padStart(2, "0")}-${d.padStart(2, "0")}`);
  }
  m = v.match(/^(\d{4})[/-](\d{1,2})[/-](\d{1,2})/);
  if (m) {
    const [, y, mo, d] = m;
    return checkIso(`${y}-${mo.padStart(2, "0")}-${d.padStart(2, "0")}`);
  }
  return undefined;
}

function checkIso(iso: string): string | undefined {
  const d = parseISO(iso);
  if (!isValid(d)) return undefined;
  // parseISO accepte 2026-02-31 → 3 mars ; on vérifie l'aller-retour.
  return format(d, "yyyy-MM-dd") === iso ? iso : undefined;
}

/** Date du jour en ISO (fuseau du serveur, suffisant pour la publication). */
export function todayIso(): string {
  return format(new Date(), "yyyy-MM-dd");
}

/** « 20 septembre 2026 » */
export function formatDateLong(iso: string): string {
  const d = parseISO(iso);
  return isValid(d) ? format(d, "d MMMM yyyy", { locale: fr }) : iso;
}

/** « dimanche 20 septembre 2026 » */
export function formatDateFull(iso: string): string {
  const d = parseISO(iso);
  return isValid(d) ? format(d, "EEEE d MMMM yyyy", { locale: fr }) : iso;
}

/** « 20 sept. 2026 » */
export function formatDateShort(iso: string): string {
  const d = parseISO(iso);
  return isValid(d) ? format(d, "d MMM yyyy", { locale: fr }) : iso;
}

/** « septembre 2026 » à partir de « 2026-09 » */
export function formatMonth(yyyyMm: string): string {
  const d = parseISO(`${yyyyMm}-01`);
  return isValid(d) ? format(d, "MMMM yyyy", { locale: fr }) : yyyyMm;
}

/** Valide « AAAA-MM » et retourne la valeur ou le mois courant. */
export function monthOrCurrent(value: string | undefined): string {
  if (value && /^\d{4}-(0[1-9]|1[0-2])$/.test(value)) return value;
  return format(new Date(), "yyyy-MM");
}

/** Horaire « 10:30 » → « 10h30 ». */
export function formatHeure(h: string | undefined): string | undefined {
  if (!h) return undefined;
  const m = h.trim().match(/^(\d{1,2})[:h](\d{2})?/);
  if (!m) return h;
  return `${m[1]}h${m[2] ?? ""}`.replace(/h00$/, "h");
}
