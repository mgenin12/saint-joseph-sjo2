import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PrintButton from "@/components/PrintButton";
import { SITE } from "@/content/site";
import { computeClocher, getSiteConfig, CLOCHER_METRES } from "@/lib/config";
import { formatEuros } from "@/lib/text";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 600;

export const metadata: Metadata = pageMetadata({
  title: "Bulletin de don & Fiche projet (PDF à imprimer)",
  description:
    "Bulletin de soutien papier à imprimer ou enregistrer en PDF pour accompagner votre don par chèque ou par virement au profit du projet Église Saint-Joseph (SJO2) au Rouret.",
  path: "/soutenir/bulletin-de-don",
});

type SearchParams = Promise<{ montant?: string }>;

export default async function BulletinDeDonPage({ searchParams }: { searchParams: SearchParams }) {
  const { montant } = await searchParams;
  const config = await getSiteConfig();
  const data = computeClocher(config.montantCollecte, config.objectif);
  const v = SITE.don.virement;
  const montantPreRempli = montant ? Number(montant) : undefined;

  return (
    <>
      <style>{`
        @media print {
          header, footer, .cta-band, .no-print { display: none !important; }
          body { background: #fff !important; color: #000 !important; }
          .print-sheet { box-shadow: none !important; border: 1px solid #ccc !important; margin: 0 !important; padding: 18px !important; max-width: 100% !important; }
        }
      `}</style>

      <section className="page-head no-print">
        <div className="container narrow">
          <ol className="breadcrumb" aria-label="Fil d'Ariane">
            <li>
              <Link href="/">Accueil</Link>
            </li>
            <li>
              <Link href="/soutenir">Soutenir</Link>
            </li>
            <li>Bulletin de don papier</li>
          </ol>
          <span className="eyebrow">Soutenir · Par chèque ou virement</span>
          <h1>Bulletin de don &amp; fiche récapitulative</h1>
          <p className="lead">
            Imprimez cette page (ou enregistrez-la en PDF) pour accompagner votre don par chèque ou conserver toutes les coordonnées du projet.
          </p>
          <div className="row">
            <PrintButton />
            <a className="btn btn--navy btn--lg" href={config.urlDon} target="_blank" rel="noopener">
              Donner directement en ligne
            </a>
            <Link className="btn btn--outline" href="/soutenir">
              ← Retour à la page Soutenir
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container narrow">
          <div
            className="card print-sheet"
            style={{
              padding: "32px 36px",
              borderTop: "6px solid var(--gold)",
            }}
          >
            {/* En-tête du bulletin */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap", borderBottom: "2px solid #e6e0d4", paddingBottom: 16, marginBottom: 20 }}>
              <div>
                <span className="eyebrow">Paroisse Saint-Arnoux · Association Diocésaine de Nice</span>
                <h2 style={{ margin: "4px 0" }}>Bulletin de soutien — Projet Église Saint-Joseph (SJO2)</h2>
                <p className="small muted" style={{ margin: 0 }}>
                  Construction de l&apos;église Saint-Joseph (300 places, clocher de {CLOCHER_METRES} m) et du centre paroissial au Rouret
                </p>
              </div>
              <Image
                src="/assets/img/eglise-saint-joseph-batisseurs-du-seigneur.png"
                alt="Logo Église Saint-Joseph"
                width={64}
                height={64}
              />
            </div>

            {/* Rappel du projet en 4 chiffres */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 20, textAlign: "center", background: "#f8f6f1", padding: 12, borderRadius: 8 }}>
              <div>
                <strong style={{ display: "block", fontSize: "1.1rem", color: "var(--navy)" }}>6 M€ TTC</strong>
                <span className="small muted">Budget global</span>
              </div>
              <div>
                <strong style={{ display: "block", fontSize: "1.1rem", color: "var(--navy)" }}>{formatEuros(data.montant)}</strong>
                <span className="small muted">Déjà réunis</span>
              </div>
              <div>
                <strong style={{ display: "block", fontSize: "1.1rem", color: "var(--navy)" }}>{CLOCHER_METRES} m</strong>
                <span className="small muted">Clocher des Bâtisseurs</span>
              </div>
              <div>
                <strong style={{ display: "block", fontSize: "1.1rem", color: "var(--navy)" }}>66 % / 60 %</strong>
                <span className="small muted">Réduction d&apos;impôt</span>
              </div>
            </div>

            {/* 1. Montant du don */}
            <h3 style={{ marginTop: 0, marginBottom: 10, fontSize: "1.05rem" }}>1. Mon engagement de bâtisseur</h3>
            <p className="small" style={{ marginTop: 0 }}>
              Je souhaite soutenir la construction de l&apos;église Saint-Joseph et du centre paroissial au Rouret par un don de :
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 8, marginBottom: 14 }}>
              {[
                { m: 50, label: "50 € (coût réel 17 €)" },
                { m: 100, label: "100 € · 10 pierres (coût réel 34 €)" },
                { m: 200, label: "200 € · 20 pierres (coût réel 68 €)" },
                { m: 500, label: "500 € · ½ mur (coût réel 170 €)" },
                { m: 1000, label: "1 000 € · 1 mur / 1 m (coût réel 340 €)" },
              ].map((opt) => (
                <div
                  key={opt.m}
                  style={{
                    border: montantPreRempli === opt.m ? "2px solid var(--gold)" : "1px solid #d5cfc2",
                    borderRadius: 6,
                    padding: "8px 10px",
                    fontSize: "0.86rem",
                    fontWeight: montantPreRempli === opt.m ? 700 : 500,
                  }}
                >
                  {montantPreRempli === opt.m ? "☑" : "☐"} {opt.label}
                </div>
              ))}
              <div style={{ border: "1px solid #d5cfc2", borderRadius: 6, padding: "8px 10px", fontSize: "0.86rem" }}>
                {montantPreRempli && ![50, 100, 200, 500, 1000].includes(montantPreRempli)
                  ? `☑ Autre montant : ${formatEuros(montantPreRempli)}`
                  : "☐ Autre montant : …………………… €"}
              </div>
            </div>

            {/* 2. Coordonnées du donateur (pour le reçu fiscal) */}
            <h3 style={{ marginBottom: 10, fontSize: "1.05rem" }}>2. Mes coordonnées (indispensables pour l&apos;envoi du reçu fiscal)</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 18, fontSize: "0.9rem" }}>
              <div style={{ borderBottom: "1px dotted #999", paddingBottom: 6 }}>Nom : ………………………………………………………………</div>
              <div style={{ borderBottom: "1px dotted #999", paddingBottom: 6 }}>Prénom : …………………………………………………………</div>
              <div style={{ borderBottom: "1px dotted #999", paddingBottom: 6, gridColumn: "1 / -1" }}>
                Société / Raison sociale (si don d&apos;entreprise — SIREN) : ……………………………………………………………………………………
              </div>
              <div style={{ borderBottom: "1px dotted #999", paddingBottom: 6, gridColumn: "1 / -1" }}>
                Adresse postale : ………………………………………………………………………………………………………………………………………
              </div>
              <div style={{ borderBottom: "1px dotted #999", paddingBottom: 6 }}>Code postal &amp; Ville : …………………………………………</div>
              <div style={{ borderBottom: "1px dotted #999", paddingBottom: 6 }}>Téléphone : ………………………………………………………</div>
              <div style={{ borderBottom: "1px dotted #999", paddingBottom: 6, gridColumn: "1 / -1" }}>
                Adresse e-mail (pour recevoir le reçu fiscal et les nouvelles du chantier) : …………………………………………………………
              </div>
            </div>

            {/* 3. Modalités de règlement */}
            <h3 style={{ marginBottom: 10, fontSize: "1.05rem" }}>3. Mode de règlement choisi</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 18 }}>
              <div style={{ border: "1px solid #e6e0d4", borderRadius: 8, padding: 14 }}>
                <strong>☐ Par chèque bancaire</strong>
                <p className="small" style={{ margin: "6px 0" }}>
                  • Libellé à l&apos;ordre de : <b>{SITE.don.cheque.ordre}</b>
                  <br />• Important : <b>{SITE.don.cheque.mention}</b>
                  <br />• À remettre à l&apos;accueil ou à envoyer avec ce bulletin à :
                  <br />
                  <b>Paroisse Saint-Arnoux — Projet SJO2</b>
                  <br />
                  {SITE.adresse}
                </p>
              </div>
              <div style={{ border: "1px solid #e6e0d4", borderRadius: 8, padding: 14 }}>
                <strong>☐ Par virement bancaire</strong>
                <p className="small" style={{ margin: "6px 0" }}>
                  • Bénéficiaire : <b>{v.beneficiaire}</b>
                  <br />• IBAN : <b>{v.iban}</b>
                  <br />• BIC : <b>{v.bic}</b> ({v.banque})
                  <br />• Libellé obligatoire du virement : <b>{v.objet}</b>
                </p>
              </div>
            </div>

            {/* Bas de page : QR code + fiscalité */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, background: "#f8f6f1", padding: 14, borderRadius: 8 }}>
              <div style={{ fontSize: "0.82rem", lineHeight: 1.45 }}>
                <b>Déduction fiscale :</b>
                <br />• <b>Particuliers :</b> réduction d&apos;impôt sur le revenu de <b>66 %</b> du don (dans la limite de 20 % du revenu imposable).
                <br />• <b>Entreprises :</b> réduction d&apos;impôt de <b>60 %</b> (dans la limite de 20 000 € ou 5 ‰ du CA HT).
                <br />• Contact Dons &amp; Legs : {SITE.contact.donsEtLegs.nom} ({SITE.contact.donsEtLegs.telephone} · {SITE.contact.donsEtLegs.email})
              </div>
              <div style={{ textAlign: "center", flexShrink: 0 }}>
                <Image src={v.qr} alt="QR Code Don en ligne" width={76} height={76} />
                <div style={{ fontSize: "0.72rem" }}>Don en ligne immédiat</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
