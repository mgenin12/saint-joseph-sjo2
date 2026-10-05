"use client";

import { useEffect, useRef, useState } from "react";

type Props = { value: number; suffix?: string; label: string; duration?: number };

/** Compteur animé (0 → valeur) déclenché quand l'élément devient visible. */
export default function Counter({ value, suffix = "", label, duration = 1400 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [n, setN] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const run = () => {
      if (started.current) return;
      started.current = true;
      if (reduce) {
        setN(value);
        return;
      }
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setN(Math.round(value * eased));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    if (typeof IntersectionObserver === "undefined") {
      run();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, duration]);

  return (
    <div className="counter" ref={ref}>
      <div className="counter__value">
        {n.toLocaleString("fr-FR")}
        {suffix}
      </div>
      <div className="counter__label">{label}</div>
    </div>
  );
}
