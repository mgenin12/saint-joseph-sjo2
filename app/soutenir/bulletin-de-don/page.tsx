import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PrintButton from "@/components/PrintButton";
import { SITE } from "@/content/site";
import { getSiteConfig } from "@/lib/config";
import { formatEuros } from "@/lib/text";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 600;

export const metadata: Metadata = pageMetadata({
  title: "Bulletin de soutien — Projet Église Saint-Joseph (SJO2)",
  description:
    "Bulletin de soutien papier d'une page à imprimer ou enregistrer en PDF pour accompagner votre don par chèque ou par virement au profit du projet Église Saint-Joseph (SJO2) au Rouret.",
  path: "/soutenir/bulletin-de-don",
});

type SearchParams = Promise<{ montant?: string }>;

export default async function BulletinDeDonPage({ searchParams }: { searchParams: SearchParams }) {
  const { montant } = await searchParams;
  const config = await getSiteConfig();
  const v = SITE.don.virement;
  const montantPreRempli = montant ? Number(montant) : undefined;

  return (
    <>
      <style>{`
        @page {
          size: A4 portrait;
          margin: 0;
        }
        .bulletin-amounts {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          margin-bottom: 14px;
        }
        .bulletin-coords {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 14px;
          font-size: 0.86rem;
        }
        .bulletin-coords > div {
          overflow-wrap: anywhere;
        }
        .bulletin-modes {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 14px;
        }
        .bulletin-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 14px;
          background: #f8f6f1;
          padding: 10px 12px;
          border-radius: 8px;
        }
        @media screen and (max-width: 640px) {
          .print-sheet {
            padding: 18px 16px !important;
          }
          .bulletin-amounts {
            grid-template-columns: 1fr;
          }
          .bulletin-coords {
            grid-template-columns: 1fr;
          }
          .bulletin-modes {
            grid-template-columns: 1fr;
          }
          .bulletin-footer {
            flex-direction: column;
            align-items: flex-start;
          }
        }
        @media print {
          header, footer, .cta-band, .no-print {
            display: none !important;
          }
          html, body, main, .section, .container, .narrow {
            background: #fff !important;
            color: #000 !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
          }
          .print-sheet {
            box-shadow: none !important;
            border: none !important;
            border-radius: 0 !important;
            margin: 0 !important;
            padding: 12mm 15mm !important;
            width: 100% !important;
            max-width: 100% !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
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
          <h1>Bulletin de don à imprimer (1 page)</h1>
          <p className="lead">
            Cliquez sur le bouton ci-dessous pour imprimer ce bulletin sur une seule page (ou l&apos;enregistrer en PDF).
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
              padding: "24px 28px",
              borderTop: "5px solid var(--gold)",
            }}
          >
            {/* Uniquement le titre avant la section 1 */}
            <h2
              style={{
                margin: "0 0 14px 0",
                paddingBottom: "10px",
                borderBottom: "2px solid #e6e0d4",
                fontSize: "1.35rem",
              }}
            >
              Bulletin de soutien — Projet Église Saint-Joseph (SJO2)
            </h2>

            {/* 1. Montant du don */}
            <h3 style={{ marginTop: 0, marginBottom: 6, fontSize: "1rem" }}>1. Mon engagement de bâtisseur</h3>
            <p className="small" style={{ marginTop: 0, marginBottom: 8 }}>
              Je souhaite soutenir la construction de l&apos;église Saint-Joseph et du centre paroissial au Rouret par un don de :
            </p>
            <div className="bulletin-amounts">
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
                    padding: "6px 8px",
                    fontSize: "0.82rem",
                    fontWeight: montantPreRempli === opt.m ? 700 : 500,
                  }}
                >
                  {montantPreRempli === opt.m ? "☑" : "☐"} {opt.label}
                </div>
              ))}
              <div style={{ border: "1px solid #d5cfc2", borderRadius: 6, padding: "6px 8px", fontSize: "0.82rem" }}>
                {montantPreRempli && ![50, 100, 200, 500, 1000].includes(montantPreRempli)
                  ? `☑ Autre montant : ${formatEuros(montantPreRempli)}`
                  : "☐ Autre montant : ……………… €"}
              </div>
            </div>

            {/* 2. Coordonnées du donateur (pour le reçu fiscal) */}
            <h3 style={{ marginTop: 0, marginBottom: 8, fontSize: "1rem" }}>
              2. Mes coordonnées (indispensables pour l&apos;envoi du reçu fiscal)
            </h3>
            <div className="bulletin-coords">
              <div style={{ borderBottom: "1px dotted #999", paddingBottom: 4 }}>Nom : ………………………………………………………………</div>
              <div style={{ borderBottom: "1px dotted #999", paddingBottom: 4 }}>Prénom : …………………………………………………………</div>
              <div style={{ borderBottom: "1px dotted #999", paddingBottom: 4, gridColumn: "1 / -1" }}>
                Société / Raison sociale (si don d&apos;entreprise — SIREN) : ……………………………………………………………………………………
              </div>
              <div style={{ borderBottom: "1px dotted #999", paddingBottom: 4, gridColumn: "1 / -1" }}>
                Adresse postale : ………………………………………………………………………………………………………………………………………
              </div>
              <div style={{ borderBottom: "1px dotted #999", paddingBottom: 4 }}>Code postal &amp; Ville : …………………………………………</div>
              <div style={{ borderBottom: "1px dotted #999", paddingBottom: 4 }}>Téléphone : ………………………………………………………</div>
              <div style={{ borderBottom: "1px dotted #999", paddingBottom: 4, gridColumn: "1 / -1" }}>
                Adresse e-mail (pour recevoir le reçu fiscal et les nouvelles du chantier) : …………………………………………………………
              </div>
            </div>

            {/* 3. Modalités de règlement */}
            <h3 style={{ marginTop: 0, marginBottom: 8, fontSize: "1rem" }}>3. Mode de règlement choisi</h3>
            <div className="bulletin-modes">
              <div style={{ border: "1px solid #e6e0d4", borderRadius: 8, padding: "10px 12px" }}>
                <strong style={{ fontSize: "0.9rem" }}>☐ Par chèque bancaire</strong>
                <p className="small" style={{ margin: "4px 0 0", fontSize: "0.82rem", lineHeight: 1.4 }}>
                  • Libellé à l&apos;ordre de : <b>{SITE.don.cheque.ordre}</b>
                  <br />• Important : <b>{SITE.don.cheque.mention}</b>
                  <br />• À remettre à l&apos;accueil ou à envoyer avec ce bulletin à :
                  <br />
                  <b>Paroisse Saint-Arnoux — Projet SJO2</b> · {SITE.adresse}
                </p>
              </div>
              <div style={{ border: "1px solid #e6e0d4", borderRadius: 8, padding: "10px 12px" }}>
                <strong style={{ fontSize: "0.9rem" }}>☐ Par virement bancaire</strong>
                <p className="small" style={{ margin: "4px 0 0", fontSize: "0.82rem", lineHeight: 1.4 }}>
                  • Bénéficiaire : <b>{v.beneficiaire}</b>
                  <br />• IBAN : <b>{v.iban}</b>
                  <br />• BIC : <b>{v.bic}</b> ({v.banque})
                  <br />• Libellé obligatoire du virement : <b>{v.objet}</b>
                </p>
              </div>
            </div>

            {/* Bas de page : QR code + fiscalité */}
            <div className="bulletin-footer">
              <div style={{ fontSize: "0.78rem", lineHeight: 1.4 }}>
                <b>Déduction fiscale :</b>
                <br />• <b>Particuliers :</b> réduction d&apos;impôt sur le revenu de <b>66 %</b> du don (dans la limite de 20 % du revenu imposable).
                <br />• <b>Entreprises :</b> réduction d&apos;impôt de <b>60 %</b> (dans la limite de 20 000 € ou 5 ‰ du CA HT).
                <br />• Contact Dons &amp; Legs : {SITE.contact.donsEtLegs.nom} ({SITE.contact.donsEtLegs.telephone} · {SITE.contact.donsEtLegs.email})
              </div>
              <div style={{ textAlign: "center", flexShrink: 0 }}>
                <Image src={v.qr} alt="QR Code Don en ligne" width={64} height={64} />
                <div style={{ fontSize: "0.68rem" }}>Don en ligne immédiat</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
