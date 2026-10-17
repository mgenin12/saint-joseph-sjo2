/* ============================================================================
   Ré-export depuis js/content.js (fichier unique d'édition du site).
   Pour modifier les textes, les chiffres, les articles ou le calendrier,
   éditez directement le fichier : js/content.js
   ============================================================================ */

import { SITE as RAW_SITE, MENU_PROJET as RAW_MENU_PROJET, FOOTER_LINKS as RAW_FOOTER_LINKS } from "@/js/content.js";

export const SITE = RAW_SITE;
export const MENU_PROJET = RAW_MENU_PROJET;
export const FOOTER_LINKS = RAW_FOOTER_LINKS;

export type Membre = {
  nom: string;
  photo: string;
  role: string;
  bio: string;
};

export type Mission = {
  id: string;
  titre: string;
  resume: string;
  mission: string;
  profil: string;
  engagement: string;
};
