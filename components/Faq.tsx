"use client";

import { useState } from "react";

type Item = { q: string; a: string };

/** Accordéon de questions fréquentes. */
export default function Faq({ items }: { items: readonly Item[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="faq">
      {items.map((it, i) => {
        const expanded = open === i;
        return (
          <div key={it.q} className="faq__item">
            <h3 style={{ margin: 0, fontSize: "inherit" }}>
              <button
                type="button"
                className="faq__q"
                aria-expanded={expanded}
                aria-controls={`faq-${i}`}
                id={`faq-q-${i}`}
                onClick={() => setOpen(expanded ? null : i)}
              >
                {it.q}
              </button>
            </h3>
            <div id={`faq-${i}`} role="region" aria-labelledby={`faq-q-${i}`} className="faq__a" hidden={!expanded}>
              <p style={{ margin: 0 }}>{it.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
