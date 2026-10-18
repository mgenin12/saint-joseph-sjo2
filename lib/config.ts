import { cache } from "react";
import type { SiteConfig } from "./types";
import { loadSheet, rowsToObjects, isSheetConfigured } from "./sheets";
import { normalizeHeader } from "./text";
import { SITE } from "@/content/site";

// Règles métier de la collecte : voir lib/collecte.ts (module sans dépendance serveur).
export { PIERRE_EUROS, PIERRES_PAR_MUR, MUR_EUROS, CLOCHER_METRES, computeClocher, coutReel } from "./collecte";
export type { Clocher } from "./collecte";

function toNumber(v: string | undefined): number | undefined {
  if (!v) return undefined;
  const n = Number(v.replace(/[^\d.,-]/g, "").replace(/\s/g, "").replace(",", "."));
  return Number.isFinite(n) ? n : undefined;
}

/** Configuration du site : valeurs du dépôt, surchargées par l'onglet « Config » (clé / valeur) s'il existe. */
export const getSiteConfig = cache(async (): Promise<SiteConfig> => {
  const base: SiteConfig = {
    montantCollecte: SITE.collecte.montantCollecte,
    objectif: SITE.collecte.objectif,
    urlDon: process.env.NEXT_PUBLIC_URL_DON || SITE.liens.don,
    urlNewsletter: SITE.liens.newsletter || undefined,
    urlFormulaireContact: SITE.liens.formulaireContact || undefined,
    emailContact: SITE.contact.email || undefined,
    telephoneContact: SITE.contact.telephone || undefined,
    reseaux: { ...SITE.reseaux },
  };
  if (!isSheetConfigured("config")) return base;
  const sheet = await loadSheet("config");
  if (sheet.source !== "live") return base;
  const kv = new Map<string, string>();
  for (const row of rowsToObjects(sheet.rows)) {
    const key = normalizeHeader(row.cle ?? row.key ?? row.parametre ?? "");
    const value = (row.valeur ?? row.value ?? "").trim();
    if (key && value) kv.set(key, value);
  }
  const num = (k: string) => toNumber(kv.get(k));
  const str = (k: string) => kv.get(k) || undefined;
  const reseaux = { ...base.reseaux };
  for (const [k, v] of kv) if (k.startsWith("reseaux_")) reseaux[k.replace("reseaux_", "")] = v;
  return {
    montantCollecte: num("montant_collecte") ?? base.montantCollecte,
    objectif: num("objectif") ?? base.objectif,
    urlDon: str("url_don") ?? base.urlDon,
    urlNewsletter: str("url_newsletter") ?? base.urlNewsletter,
    urlFormulaireContact: str("url_formulaire_contact") ?? base.urlFormulaireContact,
    emailContact: str("email_contact") ?? base.emailContact,
    telephoneContact: str("telephone_contact") ?? base.telephoneContact,
    reseaux,
  };
});

export function siteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
  return raw.replace(/\/$/, "");
}

export function absoluteUrl(pathname: string): string {
  return `${siteUrl()}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}
