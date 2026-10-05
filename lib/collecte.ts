/**
 * Règles métier de la collecte (module sans dépendance serveur : utilisable
 * dans les composants client comme le simulateur).
 * 1 pierre = 10 €, 1 mur = 100 pierres, clocher de 22 m = objectif global.
 */
export const PIERRE_EUROS = 10;
export const PIERRES_PAR_MUR = 100;
export const MUR_EUROS = PIERRE_EUROS * PIERRES_PAR_MUR;
export const CLOCHER_METRES = 22;

export type Clocher = {
  montant: number;
  objectif: number;
  /** Progression 0..1 */
  ratio: number;
  /** Pourcentage arrondi */
  pct: number;
  pierres: number;
  murs: number;
  pierresObjectif: number;
  mursObjectif: number;
  /** Hauteur atteinte en mètres (2 décimales) */
  hauteurM: number;
  hauteurCm: number;
  resteM: number;
  /** Valeur d'un mètre / d'un centimètre de clocher en euros */
  eurosParMetre: number;
  eurosParCm: number;
  reste: number;
};

export function computeClocher(montant: number, objectif: number): Clocher {
  const safeObjectif = objectif > 0 ? objectif : 1;
  const ratio = Math.min(1, Math.max(0, montant / safeObjectif));
  const hauteurM = Math.round(ratio * CLOCHER_METRES * 100) / 100;
  return {
    montant,
    objectif,
    ratio,
    pct: Math.round(ratio * 100),
    pierres: Math.floor(montant / PIERRE_EUROS),
    murs: Math.floor(montant / MUR_EUROS),
    pierresObjectif: Math.round(objectif / PIERRE_EUROS),
    mursObjectif: Math.round(objectif / MUR_EUROS),
    hauteurM,
    hauteurCm: Math.round(ratio * CLOCHER_METRES * 100),
    resteM: Math.round((CLOCHER_METRES - hauteurM) * 100) / 100,
    eurosParMetre: Math.round(safeObjectif / CLOCHER_METRES),
    eurosParCm: Math.round(safeObjectif / (CLOCHER_METRES * 100)),
    reste: Math.max(0, objectif - montant),
  };
}

/** Coût réel d'un don après réduction d'impôt (66 % particulier, 60 % entreprise). */
export function coutReel(montant: number, type: "particulier" | "entreprise"): number {
  const taux = type === "particulier" ? 0.66 : 0.6;
  return Math.round(montant * (1 - taux));
}
