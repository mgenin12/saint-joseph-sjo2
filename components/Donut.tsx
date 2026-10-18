"use client";

import { useState } from "react";

export type DonutPart = { label: string; montant: string; pct: number; couleur: string };

function arcPath(cx: number, cy: number, r: number, start: number, end: number) {
  const s = polar(cx, cy, r, end);
  const e = polar(cx, cy, r, start);
  const large = end - start > 180 ? 1 : 0;
  return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 0 ${e.x} ${e.y}`;
}

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

/** Répartition du budget en anneau interactif (survol / clic sur une part ou sa légende). */
export default function Donut({ parts, total = "6 M€" }: { parts: readonly DonutPart[]; total?: string }) {
  const [active, setActive] = useState<number | null>(null);
  const sum = parts.reduce((a, p) => a + p.pct, 0) || 100;
  let angle = 0;
  const arcs = parts.map((p, i) => {
    const start = angle;
    const end = angle + (p.pct / sum) * 360;
    angle = end;
    return { ...p, i, start, end: Math.min(end, 359.999) };
  });
  const current = active === null ? null : parts[active];

  return (
    <div className="donut">
      <svg className="donut__svg" viewBox="0 0 200 200" role="img" aria-label="Répartition indicative du budget">
        {arcs.map((a) => (
          <path
            key={a.label}
            d={arcPath(100, 100, 78, a.start, a.end)}
            fill="none"
            stroke={a.couleur}
            strokeWidth={active === a.i ? 34 : 28}
            className={active === null ? undefined : active === a.i ? "pop" : "dim"}
            onMouseEnter={() => setActive(a.i)}
            onMouseLeave={() => setActive(null)}
            onClick={() => setActive(active === a.i ? null : a.i)}
          >
            <title>
              {a.label} : {a.montant} ({a.pct} %)
            </title>
          </path>
        ))}
        <text className="donut__center" x="100" y="94" textAnchor="middle" fontSize="22" fontWeight="600">
          {current ? `${current.pct} %` : total}
        </text>
        <text x="100" y="116" textAnchor="middle" fontSize="10" fill="#4a463c">
          {current ? current.montant : "coût global TTC"}
        </text>
      </svg>
      <ul className="donut__legend">
        {parts.map((p, i) => (
          <li key={p.label}>
            <button
              type="button"
              className={`legend-item${active === i ? " active" : ""}`}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              onClick={() => setActive(active === i ? null : i)}
            >
              <i style={{ background: p.couleur }} aria-hidden="true" />
              <span>{p.label}</span>
              <b>
                {p.montant} · {p.pct} %
              </b>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
