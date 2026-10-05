"use client";

import { useEffect, useState } from "react";

type Props = { url: string; title: string; text?: string };

/** Boutons de partage (réseaux, e-mail, copie du lien, partage natif). */
export default function ShareBar({ url, title, text = "" }: Props) {
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);
  useEffect(() => {
    setCanShare(typeof navigator !== "undefined" && "share" in navigator);
  }, []);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const body = encodeURIComponent(`${text ? `${text}\n\n` : ""}${url}`);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copiez le lien :", url);
    }
  };

  const nativeShare = async () => {
    try {
      await navigator.share({ title, text, url });
    } catch {
      /* annulé par l'utilisateur */
    }
  };

  const links = [
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
    { label: "WhatsApp", href: `https://wa.me/?text=${t}%20${u}` },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
    { label: "X", href: `https://twitter.com/intent/tweet?url=${u}&text=${t}` },
    { label: "E-mail", href: `mailto:?subject=${t}&body=${body}` },
  ];

  return (
    <div className="share" aria-label="Partager">
      <span className="share__label">Partager</span>
      {links.map((l) => (
        <a key={l.label} className="share__btn" href={l.href} target="_blank" rel="noopener">
          {l.label}
        </a>
      ))}
      <button type="button" className="share__btn" onClick={copy}>
        {copied ? "Lien copié ✓" : "Copier le lien"}
      </button>
      {canShare && (
        <button type="button" className="share__btn" onClick={nativeShare}>
          Partager…
        </button>
      )}
    </div>
  );
}
