"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import Modal from "./Modal";
import type { Membre } from "@/content/site";

function photoSrc(photo: string) {
  return photo.startsWith("/") ? photo : `/assets/img/${photo}.jpeg`;
}

/** Trombinoscope de l'équipe projet : clic sur une carte → fiche détaillée. */
export default function TeamGrid({ membres }: { membres: readonly Membre[] }) {
  const [current, setCurrent] = useState<Membre | null>(null);
  const close = useCallback(() => setCurrent(null), []);

  return (
    <>
      <div className="team-grid">
        {membres.map((m) => (
          <button key={m.nom} type="button" className="member reveal" onClick={() => setCurrent(m)} aria-haspopup="dialog">
            <Image src={photoSrc(m.photo)} alt={m.nom} width={300} height={300} sizes="(max-width: 600px) 45vw, 180px" />
            <b>{m.nom}</b>
            <small>{m.role}</small>
          </button>
        ))}
      </div>

      {current && (
        <Modal title={current.nom} onClose={close} labelledBy="member-title">
          <div className="modal__member">
            <Image src={photoSrc(current.photo)} alt={current.nom} width={320} height={320} />
            <div>
              <h3 id="member-title">{current.nom}</h3>
              <h5>Rôle</h5>
              <p>{current.role}</p>
              <h5>Parcours</h5>
              <p>{current.bio}</p>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
