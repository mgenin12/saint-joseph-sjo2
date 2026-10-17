export type ArticleStatut = "publie" | "brouillon";

export type Article = {
  /** Identifiant d'URL (/articles/[slug]) */
  slug: string;
  titre: string;
  /** Catégories (plusieurs possibles, séparées par des virgules dans le Sheet) */
  categories: string[];
  /** « Contenu en quelques mots » du Sheet (résumé de travail) */
  brief: string;
  /** Chapô affiché dans les listes et utilisé comme description Open Graph */
  resume: string;
  /** Corps de l'article en Markdown */
  contenu: string;
  /** Provenance du corps : colonne Contenu du Sheet, fichier du dépôt, ou brief seul */
  contenuSource: "sheet" | "repo" | "brief";
  /** « Cible principale » (information interne, non affichée) */
  cible?: string;
  auteur?: string;
  /** Date ISO (AAAA-MM-JJ) si connue */
  date?: string;
  image?: string;
  motsCles: string[];
  statut: ArticleStatut;
  /** Provenance de la ligne : Sheet ou article défini uniquement dans le dépôt */
  source: "sheet" | "repo";
  /** Ordre d'apparition dans le Sheet (pour le tri des articles sans date) */
  ordre: number;
};

export type EventPhoto = string | { url: string; legende?: string };
export type EventVideo = string | { url: string; titre?: string };

export type Evenement = {
  slug: string;
  titre: string;
  /** Date ISO (AAAA-MM-JJ) */
  date: string;
  dateFin?: string;
  heureDebut?: string;
  heureFin?: string;
  lieu?: string;
  categorie: string;
  /** Description en Markdown */
  description: string;
  lienInscription?: string;
  places?: number;
  inscrits?: number;
  image?: string;
  publie: boolean;
  /** Lien d'information (article du site ou lien externe) */
  lienInfo?: string;
  /** Photos affichées sur la page dédiée de l'événement (/calendrier/[slug]) */
  photos?: EventPhoto[];
  /** Vidéos (liens YouTube ou fichiers .mp4) affichées sur la page de l'événement */
  videos?: EventVideo[];
};

export type SiteConfig = {
  montantCollecte: number;
  objectif: number;
  urlDon: string;
  urlNewsletter?: string;
  urlFormulaireContact?: string;
  emailContact?: string;
  telephoneContact?: string;
  reseaux: Record<string, string>;
};

export type Categorie = {
  nom: string;
  slug: string;
  /** Nombre d'articles publiés */
  count: number;
};
