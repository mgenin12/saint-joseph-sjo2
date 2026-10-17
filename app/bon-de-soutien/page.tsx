import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PrintButton from "@/components/PrintButton";
import { SITE } from "@/content/site";
import { formatEuros } from "@/lib/text";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Bon de soutien imprimable (Chèque & Virement)",
  description:
    "Bon de soutien à imprimer ou enregistrer en PDF pour accompagner votre don par chèque ou virement bancaire au profit du projet SJO2 (église Saint-Joseph au Rouret).",
  path: "/bon-de-soutien",
});

export default function BonDeSoutienPage() {
  const b = SITE.don.bonDeSoutien;
  const v = SITE.don.virement;
  const c = SITE.don.cheque;

  return (
    <section className="section section--tight print-section">
      <div className="container narrow">
        <div className="row row--between mb-print-hide no-print" style={{ marginBottom: 24 }}>
          <Link href="/soutenir" className="btn btn--outline btn--sm">
            ← Retour à la page Soutenir
          </Link>
          <div className="row">
            <PrintButton label="Imprimer / Enregistrer en PDF" />
          </div>
        </div>

        <div className="print-sheet">
          <header className="print-sheet__header">
            <div>
              <span className="eyebrow">Paroisse Saint-Arnoux · Diocèse de Nice</span>
              <h1>{b.titre}</h1>
              <p className="muted" style={{ margin: 0 }}>
                {b.sousTitre}
              </p>
            </div>
            <Image
              src="/assets/img/eglise-saint-joseph-batisseurs-du-seigneur.png"
              alt="Logo Projet SJO2"
              width={76}
              height={76}
              className="print-sheet__logo"
            />
          </header>

          {/* 1. Mes coordonnées */}
          <div className="print-box">
            <h2>1. Mes coordonnées (indispensables pour l&apos;envoi de votre reçu fiscal)</h2>
            <div className="print-check-row">
              <span>☐ Particulier (réduction d&apos;impôt de 66 % IR)</span>
              <span>☐ Entreprise / Société (réduction d&apos;impôt de 60 % IS / IR)</span>
            </div>
            <div className="print-lines">
              <div className="print-line">
                <span>Nom &amp; Prénom (ou Raison sociale) :</span>
                <div className="print-dots" />
              </div>
              <div className="print-line">
                <span>N° SIREN (si entreprise) :</span>
                <div className="print-dots" />
              </div>
              <div className="print-line">
                <span>Adresse postale :</span>
                <div className="print-dots" />
              </div>
              <div className="print-line-2col">
                <div className="print-line">
                  <span>Code postal :</span>
                  <div className="print-dots" />
                </div>
                <div className="print-line">
                  <span>Commune :</span>
                  <div className="print-dots" />
                </div>
              </div>
              <div className="print-line-2col">
                <div className="print-line">
                  <span>Téléphone :</span>
                  <div className="print-dots" />
                </div>
                <div className="print-line">
                  <span>E-mail :</span>
                  <div className="print-dots" />
                </div>
              </div>
            </div>
          </div>

          {/* 2. Montant de mon don */}
          <div className="print-box">
            <h2>2. Montant de mon don pour bâtir l&apos;église Saint-Joseph &amp; le centre paroissial</h2>
            <p className="small muted">
              <strong>Particuliers (coût réel après réduction d&apos;impôt de 66 %) :</strong>
            </p>
            <div className="print-amounts">
              {b.montantsParticuliers.map((m) => (
                <div key={m} className="print-amount">
                  <span>☐ <strong>{formatEuros(m)}</strong></span>
                  <small>Coût réel : {formatEuros(Math.round(m * 0.34))}</small>
                </div>
              ))}
            </div>
            <p className="small muted mt-2">
              <strong>Entreprises &amp; Mécènes (coût réel après réduction d&apos;impôt de 60 %) :</strong>
            </p>
            <div className="print-amounts">
              {b.montantsEntreprises.map((m) => (
                <div key={m} className="print-amount">
                  <span>☐ <strong>{formatEuros(m)}</strong></span>
                  <small>Coût réel : {formatEuros(Math.round(m * 0.4))}</small>
                </div>
              ))}
            </div>
            <div className="print-line mt-2">
              <span>☐ Autre montant libre :</span>
              <div className="print-dots" />
              <span>€</span>
            </div>
          </div>

          {/* 3. Mode de règlement */}
          <div className="print-box">
            <h2>3. Mode de règlement choisi</h2>
            <div className="print-grid-2">
              <div className="print-subbox">
                <h3>☐ Par chèque bancaire</h3>
                <p>
                  Libellé à l&apos;ordre de : <strong>{c.ordre}</strong>
                  <br />
                  <em>({c.mention})</em>
                </p>
                <p className="small muted" style={{ marginBottom: 0 }}>
                  <strong>À déposer à l&apos;accueil ou à envoyer par courrier à :</strong>
                  <br />
                  {b.adressePostale.map((line) => (
                    <span key={line}>
                      {line}
                      <br />
                    </span>
                  ))}
                </p>
              </div>
              <div className="print-subbox">
                <h3>☐ Par virement bancaire</h3>
                <dl className="print-dl">
                  <dt>Bénéficiaire :</dt>
                  <dd>{v.beneficiaire}</dd>
                  <dt>IBAN :</dt>
                  <dd><strong>{v.iban}</strong></dd>
                  <dt>BIC :</dt>
                  <dd>{v.bic}</dd>
                  <dt>Banque :</dt>
                  <dd>{v.banque}</dd>
                  <dt>Libellé obligatoire :</dt>
                  <dd><strong>{v.objet}</strong></dd>
                </dl>
              </div>
            </div>
          </div>

          {/* 4. Signature & mentions */}
          <div className="print-footer">
            <div className="print-signature">
              <div>
                <span>Fait à : ___________________________ , le ____ / ____ / 202___</span>
              </div>
              <div className="print-sig-box">Signature (et cachet si entreprise) :</div>
            </div>
            <p className="print-legal">{b.noteRecuFiscal}</p>
            <p className="print-legal">
              Contact Dons &amp; Mécénat : {SITE.contact.donsEtLegs.nom} · {SITE.contact.donsEtLegs.telephone} · {SITE.contact.donsEtLegs.email}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
