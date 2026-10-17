import { cache } from "react";
import type { Article, ArticleStatut, Categorie } from "./types";
import type { SheetRow, SheetSource } from "./sheets";
import { slugify, splitList, normalize, truncate, stripMarkdown, driveImageUrl } from "./text";
import { toIsoDate, todayIso } from "./dates";
import { ARTICLES as CONTENT_ARTICLES } from "@/content/site";

/** Catégories officielles (copie de l'onglet « Catégories d'articles (mots clés) »). */
export const DEFAULT_CATEGORIES = [
  "Présentation",
  "Architecture",
  "Avancement",
  "Équipe",
  "Budget",
  "Déduction fiscales",
  "Foire aux questions",
  "Projet",
  "Mécènes",
  "Agenda",
  "Construction",
];

type Seed = {
  slug: string;
  titre: string;
  categories: string[];
  resume?: string;
  auteur?: string;
  date?: string;
  image?: string;
  motsCles: string[];
  aliases: string[];
  /** true : article défini uniquement dans le dépôt (sans ligne dans le Sheet) */
  publie: boolean;
  contenu: string;
};

/** Les brouillons sont visibles en développement, en prévisualisation Vercel ou sur demande. */
export function includeDrafts(): boolean {
  return (
    process.env.AFFICHER_BROUILLONS === "true" ||
    process.env.VERCEL_ENV === "preview" ||
    process.env.NODE_ENV === "development"
  );
}

/** Règle de publication (voir README) : publié par défaut, sauf statut explicite ou date future. */
export function computeStatut(statut: string | undefined, date: string | undefined, today = todayIso()): ArticleStatut {
  const s = normalize(statut ?? "");
  if (s) return s.startsWith("publi") || s === "en ligne" ? "publie" : "brouillon";
  if (date && date > today) return "brouillon";
  return "publie";
}

/** Ordre d'affichage : articles datés (plus récents d'abord), puis articles sans date dans l'ordre de js/content.js. */
export function sortArticles(articles: Article[]): Article[] {
  return [...articles].sort((a, b) => {
    if (a.date && b.date) return a.date < b.date ? 1 : a.date > b.date ? -1 : a.ordre - b.ordre;
    if (a.date) return -1;
    if (b.date) return 1;
    return a.ordre - b.ordre;
  });
}

function pick(row: SheetRow, ...keys: string[]): string | undefined {
  for (const k of keys) {
    const v = row[k];
    if (v && v.trim()) return v.trim();
  }
  return undefined;
}

/** Construit la liste des articles à partir de lignes tabulaires et de contenus de démarrage (conservé pour les tests). */
export function buildArticles(rows: SheetRow[], seeds: Seed[], officialCategories: string[]): Article[] {
  const bySlug = new Map(seeds.map((s) => [s.slug, s]));
  const byAlias = new Map<string, Seed>();
  for (const s of seeds) {
    for (const a of s.aliases) byAlias.set(a, s);
    byAlias.set(slugify(s.titre), s);
  }
  const canon = canonicalizer(officialCategories);
  const used = new Set<string>();
  const matched = new Set<Seed>();
  const out: Article[] = [];

  rows.forEach((row, i) => {
    const titre = pick(row, "article", "titre", "title");
    if (!titre) return;
    const explicitSlug = pick(row, "slug");
    const titleSlug = slugify(titre);
    let seed = explicitSlug ? bySlug.get(slugify(explicitSlug)) ?? byAlias.get(slugify(explicitSlug)) : undefined;
    if (!seed) seed = bySlug.get(titleSlug) ?? byAlias.get(titleSlug);
    let slug = explicitSlug ? slugify(explicitSlug) : seed?.slug ?? titleSlug;
    if (!slug) slug = `article-${i + 1}`;
    let unique = slug;
    let n = 2;
    while (used.has(unique)) unique = `${slug}-${n++}`;
    used.add(unique);
    if (seed) matched.add(seed);

    const sheetContenu = pick(row, "contenu", "contenu_markdown", "texte");
    const contenu = sheetContenu ?? seed?.contenu ?? "";
    const contenuSource: Article["contenuSource"] = sheetContenu ? "sheet" : seed?.contenu ? "repo" : "brief";
    const brief = pick(row, "contenu_en_quelques_mots", "brief", "description") ?? "";
    const date = toIsoDate(pick(row, "date_de_publication", "date"));
    const categories = splitList(pick(row, "categorie", "categories", "category")).map(canon);
    const resume =
      pick(row, "resume", "chapo") ?? seed?.resume ?? brief ?? (contenu ? truncate(stripMarkdown(contenu), 180) : "");

    out.push({
      slug: unique,
      titre,
      categories: categories.length ? categories : seed?.categories.map(canon) ?? [],
      brief,
      resume,
      contenu,
      contenuSource,
      cible: pick(row, "cible_principale", "cible"),
      auteur: pick(row, "redacteur", "auteur", "author") ?? seed?.auteur,
      date: date ?? seed?.date,
      image: driveImageUrl(pick(row, "image", "image_url", "visuel")) ?? seed?.image,
      motsCles: splitList(pick(row, "mots_cles", "motscles", "tags")).length
        ? splitList(pick(row, "mots_cles", "motscles", "tags"))
        : seed?.motsCles ?? [],
      statut: computeStatut(pick(row, "statut", "status"), date),
      source: "sheet",
      ordre: i,
    });
  });

  seeds
    .filter((s) => s.publie && !matched.has(s) && !used.has(s.slug))
    .forEach((s, i) => {
      used.add(s.slug);
      out.push({
        slug: s.slug,
        titre: s.titre,
        categories: s.categories.map(canon),
        brief: "",
        resume: s.resume ?? truncate(stripMarkdown(s.contenu), 180),
        contenu: s.contenu,
        contenuSource: "repo",
        auteur: s.auteur,
        date: s.date,
        image: s.image,
        motsCles: s.motsCles,
        statut: computeStatut(undefined, s.date),
        source: "repo",
        ordre: 1000 + i,
      });
    });

  return sortArticles(out);
}

/** Ramène « equipe » / « Equipe » à l'orthographe officielle « Équipe ». */
function canonicalizer(official: string[]): (name: string) => string {
  const map = new Map(official.map((c) => [normalize(c), c]));
  return (name: string) => map.get(normalize(name)) ?? name.trim();
}

/**
 * Charge les articles directement depuis `js/content.js` (section ARTICLES).
 * Aucun lien avec Google Sheets n'est nécessaire.
 */
const loadAll = cache(async (): Promise<{ articles: Article[]; categories: string[]; source: SheetSource }> => {
  const canon = canonicalizer(DEFAULT_CATEGORIES);
  const used = new Set<string>();
  const list: Article[] = CONTENT_ARTICLES.map((item, i) => {
    const baseSlug = slugify(item.slug || item.titre || `article-${i + 1}`);
    let slug = baseSlug;
    let n = 2;
    while (used.has(slug)) slug = `${baseSlug}-${n++}`;
    used.add(slug);
    const date = toIsoDate(item.date);
    const categories = (Array.isArray(item.categories) ? item.categories : splitList(String(item.categories ?? ""))).map(canon);
    const contenu = (item.contenu ?? "").trim();
    const resume = item.resume || truncate(stripMarkdown(contenu), 180);
    return {
      slug,
      aliases: (item.aliases ?? []).map(slugify),
      titre: item.titre,
      categories,
      brief: resume,
      resume,
      contenu,
      contenuSource: "repo" as const,
      auteur: item.auteur,
      date,
      image: driveImageUrl(item.image) ?? item.image,
      photos: item.photos,
      videos: item.videos,
      motsCles: Array.isArray(item.motsCles) ? item.motsCles : splitList(String(item.motsCles ?? "")),
      statut: computeStatut(item.statut, date),
      source: "repo" as const,
      ordre: i,
    };
  });
  return { articles: sortArticles(list), categories: DEFAULT_CATEGORIES, source: "none" };
});

/** Tous les articles visibles (publiés, + brouillons selon l'environnement). */
export async function getArticles(options: { drafts?: boolean } = {}): Promise<Article[]> {
  const { articles } = await loadAll();
  const drafts = options.drafts ?? includeDrafts();
  return drafts ? articles : articles.filter((a) => a.statut === "publie");
}

export async function getArticle(slug: string, options: { drafts?: boolean } = {}): Promise<Article | undefined> {
  const all = await getArticles(options);
  const s = slugify(slug);
  return all.find((a) => a.slug === s || a.aliases?.includes(s));
}

/** Catégories officielles avec le nombre d'articles visibles ; catégories inconnues ajoutées en fin de liste. */
export async function getCategories(options: { drafts?: boolean } = {}): Promise<Categorie[]> {
  const { categories } = await loadAll();
  const articles = await getArticles(options);
  const counts = new Map<string, number>();
  for (const a of articles) for (const c of a.categories) counts.set(c, (counts.get(c) ?? 0) + 1);
  const known = new Set(categories.map(normalize));
  const extra = [...counts.keys()].filter((c) => !known.has(normalize(c)));
  if (extra.length) console.warn(`[articles] Catégories absentes de l'onglet des catégories : ${extra.join(", ")}`);
  return [...categories, ...extra].map((nom) => ({ nom, slug: slugify(nom), count: counts.get(nom) ?? 0 }));
}

export function findCategory(categories: Categorie[], value: string | undefined): Categorie | undefined {
  if (!value) return undefined;
  const v = normalize(value);
  return categories.find((c) => normalize(c.nom) === v || c.slug === slugify(value));
}

export async function getRelatedArticles(article: Article, n = 3): Promise<Article[]> {
  const all = (await getArticles()).filter((a) => a.slug !== article.slug);
  const same = all.filter((a) => a.categories.some((c) => article.categories.includes(c)));
  const rest = all.filter((a) => !same.includes(a));
  return [...same, ...rest].slice(0, n);
}

export async function getAdjacentArticles(article: Article): Promise<{ prev?: Article; next?: Article }> {
  const all = await getArticles();
  const i = all.findIndex((a) => a.slug === article.slug);
  if (i === -1) return {};
  return { prev: all[i + 1], next: all[i - 1] };
}

export async function getArticlesSource(): Promise<SheetSource> {
  return (await loadAll()).source;
}
