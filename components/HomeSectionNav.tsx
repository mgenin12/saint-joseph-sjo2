"use client";

import { useEffect, useRef, useState } from "react";

const SECTIONS = [
  { id: "decouvrir", label: "Découvrir" },
  { id: "avancement", label: "L'avancement" },
  { id: "clocher", label: "Soutenir" },
  { id: "projet", label: "Le projet" },
  { id: "calendrier", label: "Calendrier" },
  { id: "concours", label: "Concours d'architecture" },
  { id: "valeurs", label: "Nos valeurs" },
  { id: "temoignages", label: "Livre d'Or" },
];

export default function HomeSectionNav() {
  const [activeId, setActiveId] = useState<string>("decouvrir");
  const navInnerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const offset = 180;
      let current = SECTIONS[0].id;
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= offset) {
          current = s.id;
        }
      }
      setActiveId(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const container = navInnerRef.current;
    if (!container) return;
    const activeLink = container.querySelector<HTMLElement>(".subnav__link.active");
    if (!activeLink) return;
    const targetLeft =
      activeLink.offsetLeft - container.clientWidth / 2 + activeLink.offsetWidth / 2;
    container.scrollTo({ left: Math.max(0, targetLeft), behavior: "smooth" });
  }, [activeId]);

  return (
    <nav className="subnav no-print" aria-label="Sommaire de la page d'accueil">
      <div ref={navInnerRef} className="container subnav__inner">
        {SECTIONS.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={`subnav__link${activeId === s.id ? " active" : ""}`}
            onClick={() => setActiveId(s.id)}
          >
            {s.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
