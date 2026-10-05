import type { Article } from "./types";
import { normalize, stripMarkdown } from "./text";

/** Index léger d'un article, envoyé au composant de recherche côté client. */
export type ArticleIndexEntry = {
  slug: string;
  titre: string;
  resume: string;
  categories: string[];
  motsCles: string[];
  auteur?: string;
  date?: string;
  image?: string;
  statut: Article["statut"];
  /** Texte normalisé (sans accents, minuscules) sur lequel porte la recherche */
  texte: string;
};

export function buildSearchText(a: Pick<Article, "titre" | "brief" | "resume" | "contenu" | "categories" | "motsCles" | "auteur" | "cible">): string {
  return normalize(
    [a.titre, a.brief, a.resume, stripMarkdown(a.contenu), a.categories.join(" "), a.motsCles.join(" "), a.auteur ?? "", a.cible ?? ""].join(" \n "),
  );
}

export function toIndexEntry(a: Article): ArticleIndexEntry {
  return {
    slug: a.slug,
    titre: a.titre,
    resume: a.resume,
    categories: a.categories,
    motsCles: a.motsCles,
    auteur: a.auteur,
    date: a.date,
    image: a.image,
    statut: a.statut,
    texte: buildSearchText(a),
  };
}

/** Découpe la requête en mots (ET logique). */
export function tokenize(query: string): string[] {
  return normalize(query)
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length > 0);
}

/**
 * Filtre les articles : tous les mots de la requête doivent apparaître (titre,
 * résumé, contenu, catégories, mots-clés, auteur) et, si une catégorie est
 * choisie, l'article doit lui appartenir.
 */
export function searchArticles<T extends { texte: string; categories: string[] }>(
  entries: T[],
  query: string,
  categorie?: string,
): T[] {
  const tokens = tokenize(query);
  const cat = categorie ? normalize(categorie) : "";
  return entries.filter((e) => {
    if (cat && !e.categories.some((c) => normalize(c) === cat)) return false;
    return tokens.every((t) => e.texte.includes(t));
  });
}
