"use client";

import { useEffect } from "react";

type Props = { title: string; onClose: () => void; children: React.ReactNode; labelledBy?: string };

/** Boîte de dialogue accessible (Échap / clic sur le fond pour fermer). */
export default function Modal({ title, onClose, children, labelledBy }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div className="modal" onClick={onClose} role="presentation">
      <div
        className="modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-label={labelledBy ? undefined : title}
        aria-labelledby={labelledBy}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="modal__close" onClick={onClose} aria-label="Fermer">
          ×
        </button>
        {children}
      </div>
    </div>
  );
}
