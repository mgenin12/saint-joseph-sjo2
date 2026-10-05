import type { Clocher as ClocherData } from "@/lib/collecte";
import { CLOCHER_METRES } from "@/lib/collecte";
import { formatEuros, formatNumber } from "@/lib/text";

const W = 200;
const H = 340;
const BASE_Y = 320; // sol
const TOP_Y = 20; // sommet de la croix
const TOWER_H = BASE_Y - TOP_Y;

function formatMetres(m: number) {
  return `${m.toLocaleString("fr-FR", { maximumFractionDigits: 2 })} m`;
}

/** Silhouette du clocher (contour + partie « bâtie » dorée proportionnelle aux dons). */
function TowerShape({ className, fill, stroke }: { className?: string; fill: string; stroke?: string }) {
  return (
    <g className={className} fill={fill} stroke={stroke} strokeWidth={stroke ? 1.5 : 0} strokeLinejoin="round">
      {/* fût */}
      <rect x="62" y="92" width="76" height={BASE_Y - 92} />
      {/* soubassement */}
      <rect x="52" y={BASE_Y - 14} width="96" height="14" />
      {/* chambre des cloches */}
      <rect x="56" y="70" width="88" height="26" />
      {/* flèche */}
      <polygon points="100,22 50,72 150,72" />
      {/* croix */}
      <rect x="98" y="4" width="4" height="22" />
      <rect x="91" y="10" width="18" height="4" />
    </g>
  );
}

type Props = { data: ClocherData; compact?: boolean };

/**
 * Visualisation « Faites monter le clocher » : 22 m = objectif global.
 * La partie dorée s'élève proportionnellement au montant collecté.
 */
export default function Clocher({ data, compact = false }: Props) {
  const builtH = Math.max(0, Math.round(TOWER_H * data.ratio));
  const clipY = BASE_Y - builtH;
  const marks = [0, 5.5, 11, 16.5, 22];
  const nearest = marks.reduce((best, m) => (Math.abs(m - data.hauteurM) < Math.abs(best - data.hauteurM) ? m : best), 0);

  return (
    <div>
      <div className="clocher">
        <svg
          className="clocher__svg"
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label={`Clocher : ${formatMetres(data.hauteurM)} atteints sur ${CLOCHER_METRES} m, soit ${data.pct} % de l'objectif.`}
        >
          <defs>
            <clipPath id="clocher-built">
              <rect x="0" y={clipY} width={W} height={builtH} />
            </clipPath>
            <linearGradient id="clocher-gold" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e2c97f" />
              <stop offset="100%" stopColor="#c5a24b" />
            </linearGradient>
          </defs>
          {/* sol */}
          <line x1="10" y1={BASE_Y} x2={W - 10} y2={BASE_Y} stroke="rgba(226,201,127,0.5)" strokeWidth="1.5" />
          {/* repères de hauteur */}
          {marks.map((m) => {
            const y = BASE_Y - (m / CLOCHER_METRES) * TOWER_H;
            return <line key={m} x1="20" y1={y} x2="44" y2={y} stroke="rgba(226,201,127,0.35)" strokeDasharray="2 3" />;
          })}
          {/* contour */}
          <TowerShape fill="rgba(255,255,255,0.06)" stroke="rgba(226,201,127,0.7)" />
          {/* partie bâtie */}
          <g clipPath="url(#clocher-built)" style={{ transformBox: "fill-box", transformOrigin: "bottom" }} className="built">
            <TowerShape fill="url(#clocher-gold)" />
          </g>
          {/* niveau atteint */}
          <line x1="44" y1={clipY} x2="156" y2={clipY} stroke="#fff" strokeWidth="1" strokeDasharray="3 3" />
          <text x="160" y={clipY + 4} fill="#fff" fontSize="11" fontWeight="700">
            {formatMetres(data.hauteurM)}
          </text>
        </svg>

        <ol className="scale" aria-label="Échelle du clocher">
          {marks.map((m) => (
            <li key={m} className={m === nearest ? "current" : undefined}>
              <b>{m === 0 ? "0 m" : formatMetres(m)}</b>
              {m === 0 ? "Départ" : m === CLOCHER_METRES ? `Objectif · ${formatEuros(data.objectif)}` : formatEuros(Math.round((m / CLOCHER_METRES) * data.objectif))}
            </li>
          ))}
        </ol>
      </div>

      <div className="progress" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={data.pct}>
        <span style={{ width: `${Math.max(1, data.pct)}%` }} />
      </div>
      <div className="progress-label">
        <span>
          {formatEuros(data.montant)} réunis · {data.pct} %
        </span>
        <span>Objectif {formatEuros(data.objectif)}</span>
      </div>

      {!compact && (
        <div className="kpis">
          <div className="kpi">
            <b>{formatMetres(data.hauteurM)}</b>
            <span>de clocher déjà financés</span>
          </div>
          <div className="kpi">
            <b>{formatNumber(data.pierres)}</b>
            <span>pierres posées (10 € = 1 pierre)</span>
          </div>
          <div className="kpi">
            <b>{formatNumber(data.murs)}</b>
            <span>murs élevés (100 pierres = 1 mur)</span>
          </div>
        </div>
      )}
    </div>
  );
}
