"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SITE } from "@/content/site";

type Props = {
  urlDon: string;
  categories: { nom: string; slug: string }[];
};

/**
 * En-tête fixe : transparent sur le hero de l'accueil, opaque ailleurs ou
 * après défilement. Quatre entrées : Découvrir · Le projet · Soutenir · Faire un don.
 */
export default function Header({ urlDon, categories }: Props) {
  const pathname = usePathname() ?? "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Ferme le menu mobile à chaque changement de page.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = pathname !== "/";
  const isHome = pathname === "/";
  const isProjet = pathname.startsWith("/articles");
  const isSoutenir = pathname.startsWith("/soutenir");

  return (
    <header className={`header${scrolled ? " scrolled" : ""}${solid ? " solid" : ""}`}>
      <div className="container header__inner">
        <Link href="/" className="brand" aria-label="Accueil — Église Saint Joseph">
          <Image
            className="brand__logo"
            src="/assets/img/eglise-saint-joseph-batisseurs-du-seigneur.png"
            alt=""
            width={46}
            height={46}
            priority
          />
          <span className="brand__text">
            <strong>{SITE.nom}</strong>
            <span>{SITE.sousTitre}</span>
          </span>
        </Link>

        <div className="header__right">
          <a className="btn btn--gold nav__cta nav__cta--mobile" href={urlDon} target="_blank" rel="noopener">
            Faire un don
          </a>
          <button
            type="button"
            className="burger"
            aria-expanded={open}
            aria-controls="navigation"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
          </button>

          <nav id="navigation" className={`nav${open ? " open" : ""}`} aria-label="Navigation principale">
            <div className="nav__item">
              <Link className={`nav__link${isHome ? " active" : ""}`} href="/#decouvrir" onClick={() => setOpen(false)}>
                Découvrir
              </Link>
            </div>

            <div className="nav__item">
              <Link className={`nav__link${isProjet ? " active" : ""}`} href="/articles" aria-haspopup="true">
                Le projet
                <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
                  <path d="M1 3l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </Link>
              <div className="nav__sub">
                {categories.map((c) => (
                  <Link key={c.slug} href={`/articles?categorie=${encodeURIComponent(c.slug)}`}>
                    {c.nom}
                  </Link>
                ))}
                <Link href="/calendrier">Calendrier des événements</Link>
                <Link className="all" href="/articles">
                  Tous les articles
                </Link>
              </div>
            </div>

            <div className="nav__item">
              <Link className={`nav__link${isSoutenir ? " active" : ""}`} href="/soutenir">
                Soutenir
              </Link>
            </div>

            <a className="btn btn--gold nav__cta nav__cta--desktop" href={urlDon} target="_blank" rel="noopener">
              Faire un don
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
