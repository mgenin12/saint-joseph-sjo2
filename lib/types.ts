export type ArticleStatut = "publie" | "brouillon";

export type MediaPhoto = {
  url: string;
  legende?: string;
};

export type MediaVideo = {
  /** URL YouTube (watch?v=... ou youtu.be/...), Vimeo, ou fichier .mp4 */
  url: string;
  titre?: string;
};

export type Article = {
  /** Identifiant d'URL (/articles/[slug]) */
  slug: string;
  /** Anciens slugs redirigés vers cet article */
  aliases?: string[];
  titre: string;
  /** Catégories (plusieurs possibles) */
  categories: string[];
  /** Résumé court */
  brief: string;
  /** Chapô affiché dans les listes et utilisé comme description Open Graph */
  resume: string;
  /** Corps de l'article en Markdown */
  contenu: string;
  /** Provenance du corps */
  contenuSource: "sheet" | "repo" | "brief";
  cible?: string;
  auteur?: string;
  /** Date ISO (AAAA-MM-JJ) si connue */
  date?: string;
  image?: string;
  /** Galerie photos affichée en bas de l'article */
  photos?: (string | MediaPhoto)[];
  /** Vidéos (YouTube, Vimeo ou .mp4) intégrées dans la page de l'article */
  videos?: (string | MediaVideo)[];
  motsCles: string[];
  statut: ArticleStatut;
  source: "sheet" | "repo";
  ordre: number;
};

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
  /** Galerie photos affichée sur la page dédiée de l'événement (/calendrier/[slug]) */
  photos?: (string | MediaPhoto)[];
  /** Vidéos (YouTube, Vimeo ou .mp4) affichées sur la page dédiée de l'événement */
  videos?: (string | MediaVideo)[];
  /** true = visible sur le site, false = masqué aux visiteurs */
  publie: boolean;
  /** Alias de publie dans js/content.js (visible: true / false) */
  visible?: boolean;
  /** Lien externe d'information (ex. événement Facebook ou article de presse) */
  lienInfo?: string;
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
