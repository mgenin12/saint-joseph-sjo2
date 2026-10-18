"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import Modal from "./Modal";
import type { Mission } from "@/content/site";

type Groupe = { nom: string; missions: readonly Mission[] };

/** Missions bénévoles ouvertes, groupées par commission ; clic → fiche + bouton de candidature. */
export default function Missions({ groupes }: { groupes: readonly Groupe[] }) {
  const [current, setCurrent] = useState<Mission | null>(null);
  const close = useCallback(() => setCurrent(null), []);

  return (
    <>
      {groupes.map((g) => (
        <div key={g.nom} className="jobs-group">
          <h3>{g.nom}</h3>
          <div className="jobs">
            {g.missions.map((m) => (
              <button key={m.id} type="button" className="job reveal" onClick={() => setCurrent(m)} aria-haspopup="dialog">
                <b>{m.titre}</b>
                <p>{m.resume}</p>
                <span>Voir la fiche →</span>
              </button>
            ))}
          </div>
        </div>
      ))}

      {current && (
        <Modal title={current.titre} onClose={close} labelledBy="mission-title">
          <h3 id="mission-title">{current.titre}</h3>
          <h5>Mission</h5>
          <p>{current.mission}</p>
          <h5>Profil recherché</h5>
          <p>{current.profil}</p>
          <h5>Engagement</h5>
          <p>{current.engagement}</p>
          <div className="row mt-2">
            <Link
              className="btn btn--gold"
              href={`/contact?sujet=benevolat&mission=${encodeURIComponent(current.titre)}`}
              onClick={close}
            >
              Proposer mon aide
            </Link>
            <button type="button" className="btn btn--outline" onClick={close}>
              Fermer
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
