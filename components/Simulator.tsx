"use client";

import { useState } from "react";
import { PIERRE_EUROS, PIERRES_PAR_MUR, coutReel } from "@/lib/collecte";

type Props = { urlDon: string; eurosParCm: number; eurosParMetre: number };

const MIN = 10;
const MAX = 10000;
const STEP = 10;

function euros(n: number) {
  return n.toLocaleString("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
}

/** Simulateur « Mon don en pierres » : pierres, murs, centimètres de clocher et coût réel après réduction d'impôt. */
export default function Simulator({ urlDon, eurosParCm, eurosParMetre }: Props) {
  const [montant, setMontant] = useState(200);
  const [type, setType] = useState<"particulier" | "entreprise">("particulier");

  const pierres = Math.floor(montant / PIERRE_EUROS);
  const murs = Math.floor(pierres / PIERRES_PAR_MUR);
  const reste = pierres % PIERRES_PAR_MUR;
  const cm = montant / eurosParCm;
  const hauteur = cm >= 100 ? `${(cm / 100).toLocaleString("fr-FR", { maximumFractionDigits: 2 })} m` : `${cm.toLocaleString("fr-FR", { maximumFractionDigits: 1 })} cm`;
  const reel = coutReel(montant, type);
  const taux = type === "particulier" ? 66 : 60;
  const litBricks = Math.min(PIERRES_PAR_MUR, murs > 0 ? PIERRES_PAR_MUR : reste);

  return (
    <div className="sim">
      <div>
        <span className="eyebrow">Simulateur</span>
        <label htmlFor="sim-montant" className="small muted">
          Je donne
        </label>
        <div className="sim__amount" aria-live="polite">
          {euros(montant)}
        </div>
        <input
          id="sim-montant"
          className="sim__range"
          type="range"
          min={MIN}
          max={MAX}
          step={STEP}
          value={montant}
          onChange={(e) => setMontant(Number(e.target.value))}
        />
        <div className="sim__bounds">
          <span>{euros(MIN)} · 1 pierre</span>
          <span>{euros(MAX)} · 10 murs</span>
        </div>
        <div className="row mt-2">
          {[50, 100, 200, 500, 1000, 5000].map((v) => (
            <button key={v} type="button" className={`chip${montant === v ? " active" : ""}`} onClick={() => setMontant(v)}>
              {euros(v)}
            </button>
          ))}
        </div>

        <div className="sim__stats">
          <div>
            <b>{pierres.toLocaleString("fr-FR")}</b>
            <span>pierre{pierres > 1 ? "s" : ""}</span>
          </div>
          <div>
            <b>{murs > 0 ? murs : reste}</b>
            <span>{murs > 0 ? `mur${murs > 1 ? "s" : ""}${reste ? ` + ${reste} pierres` : ""}` : "pierres vers le 1er mur"}</span>
          </div>
          <div>
            <b>{hauteur}</b>
            <span>de clocher ({euros(eurosParMetre)} / m)</span>
          </div>
        </div>

        <a className="btn btn--gold btn--lg" href={urlDon} target="_blank" rel="noopener">
          Donner {euros(montant)}
        </a>
        <p className="small muted mt-2">Le montant se saisit sur la plateforme sécurisée du Diocèse de Nice.</p>
      </div>

      <div>
        <div className="toggle" role="group" aria-label="Type de donateur">
          <button type="button" className={`toggle__btn${type === "particulier" ? " active" : ""}`} onClick={() => setType("particulier")}>
            Particulier
          </button>
          <button type="button" className={`toggle__btn${type === "entreprise" ? " active" : ""}`} onClick={() => setType("entreprise")}>
            Entreprise
          </button>
        </div>
        <div className="sim__real">
          <span className="small">Coût réel après réduction d&apos;impôt ({taux} %)</span>
          <br />
          <b>{euros(reel)}</b>
          <p>
            {type === "particulier"
              ? "Réduction d'impôt sur le revenu de 66 % dans la limite de 20 % du revenu imposable. Reçu fiscal envoyé pour chaque don."
              : "Réduction d'impôt sur les sociétés de 60 % dans la limite de 20 000 € ou 5 ‰ du chiffre d'affaires HT. Reçu fiscal envoyé pour chaque don."}
          </p>
        </div>
        <p className="small muted mt-2" id="sim-mur-label">
          {murs > 0 ? `Un mur complet (100 pierres) — et ${murs - 1 > 0 ? `${murs - 1} autre${murs - 1 > 1 ? "s" : ""}` : "aucun autre"} déjà fini${murs - 1 > 1 ? "s" : ""}.` : "Votre part du premier mur (100 pierres) :"}
        </p>
        <div className="sim__bricks" aria-labelledby="sim-mur-label">
          {Array.from({ length: PIERRES_PAR_MUR }, (_, i) => (
            <span key={i} className={`sb${i < litBricks ? " lit" : ""}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
