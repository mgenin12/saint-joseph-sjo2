import type { Evenement } from "@/lib/types";
import { EVENEMENTS } from "../js/content.js";

/* ============================================================
   ÉVÉNEMENTS DU CALENDRIER
   Pilotés directement depuis `js/content.js` (section EVENEMENTS).
   ============================================================ */

export const EVENEMENTS_DEMARRAGE: Evenement[] = EVENEMENTS.map((e) => ({
  ...e,
  publie: e.visible !== false,
}));
