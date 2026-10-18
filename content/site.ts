/* ============================================================
   Pont vers `js/content.js` (fichier unique éditable par l'équipe).
   Toute modification de contenu doit se faire dans `js/content.js`.
   ============================================================ */

import { SITE as RAW_SITE, MENU_PROJET, FOOTER_LINKS, ARTICLES, EVENEMENTS, CALENDRIER_GOOGLE } from "../js/content.js";

export const SITE = {
  ...RAW_SITE,
  avancement: {
    ...RAW_SITE.avancement,
    jalons: RAW_SITE.avancement.jalons as {
      periode: string;
      etat: "done" | "now" | "todo";
      titre: string;
      texte: string;
    }[],
  },
};

export type Membre = (typeof SITE.equipe.membres)[number];
export type Mission = (typeof SITE.missions.groupes)[number]["missions"][number];

export { MENU_PROJET, FOOTER_LINKS, ARTICLES, EVENEMENTS, CALENDRIER_GOOGLE };
