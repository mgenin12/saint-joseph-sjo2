/** Utilitaires de texte : normalisation, slugs, découpage de listes. */

/** Minuscules, sans accents, espaces normalisés. */
export function normalize(input: string): string {
  return (input || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[’']/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Identifiant d'URL : « Le processus de sélection » → « le-processus-de-selection ». */
export function slugify(input: string): string {
  return normalize(input)
    .replace(/\([^)]*\)/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

/**
 * Normalise un en-tête de colonne du Sheet pour un mapping robuste :
 * « Cible principale (mécènes, référencement général, paroissiens) » → « cible_principale ».
 */
export function normalizeHeader(header: string): string {
  return normalize(header)
    .replace(/\([^)]*\)/g, " ")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

/** Découpe une liste séparée par des virgules, points-virgules ou retours à la ligne. */
export function splitList(value: string | undefined): string[] {
  if (!value) return [];
  return value
    .split(/[,;\n]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/** Booléens tolérants : TRUE / VRAI / oui / 1 / x. */
export function parseBool(value: string | undefined, defaultValue = false): boolean {
  if (value === undefined || value === null) return defaultValue;
  const v = normalize(String(value));
  if (v === "") return defaultValue;
  return ["true", "vrai", "oui", "yes", "1", "x", "publie", "publié"].includes(v);
}

/** Tronque proprement un texte à n caractères (pour les descriptions Open Graph). */
export function truncate(text: string, max = 160): string {
  const t = (text || "").replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  return cut.slice(0, Math.max(cut.lastIndexOf(" "), 40)).trim() + "…";
}

/** Retire la syntaxe Markdown la plus courante pour obtenir un texte brut. */
export function stripMarkdown(md: string): string {
  return (md || "")
    .replace(/^\[\[[a-z-]+\]\]$/gim, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/^\s{0,3}#{1,6}\s+/gm, "")
    .replace(/^\s*>\s?/gm, "")
    .replace(/[`*_~]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Formate un nombre en français (espace insécable fine comme séparateur de milliers). */
export function formatNumber(n: number, digits = 0): string {
  return new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(n);
}

export function formatEuros(n: number, digits = 0): string {
  return `${formatNumber(n, digits)}\u00a0€`;
}

/** Transforme un lien de partage Google Drive en lien d'image direct. */
export function driveImageUrl(url: string | undefined): string | undefined {
  if (!url) return undefined;
  const m = url.match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:export=\w+&)?id=)([\w-]+)/);
  if (m) return `https://drive.google.com/uc?export=view&id=${m[1]}`;
  return url;
}
