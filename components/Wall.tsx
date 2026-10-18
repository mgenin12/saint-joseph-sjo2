import type { Clocher } from "@/lib/collecte";
import { formatEuros, formatNumber } from "@/lib/text";

const COLS = 10;
const ROWS = 24;
const TOTAL = COLS * ROWS; // 240 briques

/**
 * Le mur des bâtisseurs : 240 briques représentent l'objectif global ;
 * chaque brique = 1/240 de l'objectif (25 000 € pour 6 M€, soit 25 murs de 100 pierres).
 */
export default function Wall({ data }: { data: Clocher }) {
  const lit = Math.round(data.ratio * TOTAL);
  const brickEuros = Math.round(data.objectif / TOTAL);
  const rows = Array.from({ length: ROWS }, (_, r) => r);
  const cols = Array.from({ length: COLS }, (_, c) => c);
  return (
    <div>
      <div className="wall" role="img" aria-label={`${lit} briques allumées sur ${TOTAL}, soit ${data.pct} % de l'objectif.`}>
        {rows.map((r) => {
          const offset = r % 2 === 1;
          return (
            <div key={r} className={`wall__row${offset ? " wall__row--offset" : ""}`}>
              {offset && <span className={`brick brick--half${r * COLS < lit ? " lit" : ""}`} />}
              {cols.map((c) => {
                const i = r * COLS + c;
                return <span key={c} className={`brick${i < lit ? " lit" : ""}`} />;
              })}
              {offset && <span className={`brick brick--half${(r + 1) * COLS - 1 < lit ? " lit" : ""}`} />}
            </div>
          );
        })}
      </div>
      <p className="small mt-2" style={{ color: "var(--cream-dim)" }}>
        Chaque brique représente {formatEuros(brickEuros)} ({formatNumber(brickEuros / 10)} pierres). {formatNumber(lit)} briques sur{" "}
        {TOTAL} sont déjà posées.
      </p>
    </div>
  );
}
