import type { Evenement } from "@/lib/types";

/* ============================================================
   ÉVÉNEMENTS DE DÉMARRAGE
   Utilisés tant que l'onglet « Evenements » du Google Sheet
   n'est pas créé et renseigné dans SHEET_GID_EVENEMENTS.
   Dates : AAAA-MM-JJ. Description en Markdown.
   ============================================================ */

export const EVENEMENTS_DEMARRAGE: Evenement[] = [
  {
    slug: "2026-05-07-comite-d-investissement-diocesain",
    titre: "Comité d'Investissement Diocésain (CID)",
    date: "2026-05-07",
    categorie: "Étape du projet",
    lieu: "Diocèse de Nice",
    description:
      "Validation de la faisabilité et du plan de financement du projet par le Diocèse de Nice. Une étape officielle franchie : le projet SJO2 est reconnu solide et finançable.",
    publie: true,
  },
  {
    slug: "2026-05-19-commission-diocesaine-d-art-sacre",
    titre: "Commission Diocésaine d'Art Sacré (CDAE)",
    date: "2026-05-19",
    categorie: "Étape du projet",
    lieu: "Diocèse de Nice",
    description:
      "Avis favorable de la Commission Diocésaine d'Art Sacré sur le projet architectural et liturgique de l'église Saint Joseph et de son centre paroissial.",
    publie: true,
  },
  {
    slug: "2026-06-21-fete-de-fin-d-annee-les-batisseurs",
    titre: "Fête de fin d'année — Les Bâtisseurs",
    date: "2026-06-21",
    categorie: "Événement",
    lieu: "Paroisse Saint-Arnoux",
    description:
      "Fête de fin d'année de la Paroisse Saint-Arnoux, sur le thème des Bâtisseurs : un temps festif et fraternel pour toute la communauté, autour du projet Saint Joseph.",
    lienInfo: "https://www.facebook.com/saint.arnoux",
    publie: true,
  },
  {
    slug: "2026-08-15-messe-de-l-assomption",
    titre: "Messe de l'Assomption de la Vierge Marie",
    date: "2026-08-15",
    categorie: "Célébration",
    lieu: "Paroisse Saint-Arnoux",
    description: "Solennité de l'Assomption, célébrée avec la communauté paroissiale.",
    publie: true,
  },
  {
    slug: "2026-09-lancement-public-de-la-campagne-de-dons",
    titre: "Lancement public de la campagne de dons",
    date: "2026-09-01",
    dateFin: "2026-09-30",
    categorie: "Étape du projet",
    description:
      "Ouverture officielle de l'appel aux dons et présentation du « Clocher des Bâtisseurs » à la communauté : chaque don de 10 € pose une pierre, et le clocher de 22 mètres s'élève au rythme de la générosité.",
    publie: true,
  },
  {
    slug: "2026-09-20-premiere-messe-de-rentree-sur-le-nouveau-terrain",
    titre: "1ʳᵉ messe de rentrée sur le nouveau terrain",
    date: "2026-09-20",
    categorie: "Célébration",
    lieu: "Terrain du futur ensemble paroissial, Le Rouret",
    description:
      "Première messe célébrée sur le terrain du futur ensemble paroissial, en présence de Monseigneur Jean-Philippe Nault, évêque de Nice. Un moment fondateur pour la communauté et pour le projet Saint Joseph.",
    publie: true,
  },
];
