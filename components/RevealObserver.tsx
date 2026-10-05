"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Révèle progressivement les éléments portant la classe `.reveal` lorsqu'ils
 * entrent dans la fenêtre (ajout de `.in`). Observe aussi les éléments ajoutés
 * dynamiquement (résultats de recherche, calendrier…).
 */
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      document.querySelectorAll<HTMLElement>(".reveal").forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    const observeAll = (root: ParentNode) => {
      root.querySelectorAll<HTMLElement>(".reveal:not(.in)").forEach((el) => io.observe(el));
    };
    observeAll(document);
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((n) => {
          if (n instanceof HTMLElement) {
            if (n.classList.contains("reveal")) io.observe(n);
            observeAll(n);
          }
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });
    // Filet de sécurité : tout ce qui est encore masqué après 2,5 s devient visible.
    const timer = window.setTimeout(() => {
      document.querySelectorAll<HTMLElement>(".reveal:not(.in)").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) el.classList.add("in");
      });
    }, 2500);
    return () => {
      io.disconnect();
      mo.disconnect();
      window.clearTimeout(timer);
    };
  }, [pathname]);

  return null;
}
