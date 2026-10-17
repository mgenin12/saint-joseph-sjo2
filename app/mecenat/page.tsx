import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PrintButton from "@/components/PrintButton";
import { SITE } from "@/content/site";
import { formatEuros } from "@/lib/text";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Dossier Mécènes & Entreprises (60 % de réduction d'impôt)",
  description:
    "Dossier de présentation du mécénat d'entreprise pour la construction de l'église Saint-Joseph et du centre paroissial au Rouret (Paroisse Saint-Arnoux, Diocèse de Nice). Réduction d'impôt de 60 %.",
  path: "/mecenat",
});

export default function MecenatPage() {
  const m = SITE.mecenat;
  const v = SITE.don.virement;
  const c = SITE.don.cheque;

  return (
    <section className="section section--tight print-section">
      <div className="container narrow">
        <div className="row row--between no-print" style={{ marginBottom: 24 }}>
          <Link href="/soutenir#mecenat" className="btn btn--outline btn--sm">
            ← Retour à l&apos;espace Soutenir
          </Link>
          <div className="row">
            <Link href="/bon-de-soutien" className="btn btn--navy btn--sm">
              Bon de soutien seul
            </Link>
            <PrintButton label="Imprimer / Enregistrer le dossier en PDF" />
          </div>
        </div>

        <div className="print-sheet">
          <header className="print-sheet__header">
            <div>
              <span className="eyebrow">{m.surtitre}</span>
              <h1>{m.titre}</h1>
              <p className="muted" style={{ margin: 0 }}>
                Projet SJO2 · Église Saint-Joseph &amp; Centre Paroissial · {SITE.adresse}
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

          <div className="print-box">
            <h2>Un projet structurant au cœur de 10 communes des Alpes-Maritimes</h2>
            <p>{m.intro}</p>
            <div className="print-amounts">
              {SITE.projet.compteurs.map((cpt) => (
                <div key={cpt.label} className="print-amount">
                  <strong>
                    {cpt.valeur.toLocaleString("fr-FR")}
                    {cpt.suffixe}
                  </strong>
                  <small>{cpt.label}</small>
                </div>
              ))}
            </div>
          </div>

          <div className="print-box">
            <h2>Pourquoi devenir entreprise mécène du projet Saint-Joseph ?</h2>
            <div className="print-grid-3">
              {m.avantages.map((av) => (
                <div key={av.titre} className="print-subbox">
                  <h3>{av.titre}</h3>
                  <p className="small" style={{ marginBottom: 0 }}>
                    {av.texte}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="print-box">
            <h2>Paliers de mécénat &amp; coût réel après réduction d&apos;impôt de 60 %</h2>
            <table className="print-table">
              <thead>
                <tr>
                  <th>Palier</th>
                  <th>Don de l&apos;entreprise</th>
                  <th>Coût réel après IS (-60 %)</th>
                  <th>Portée &amp; reconnaissance</th>
                </tr>
              </thead>
              <tbody>
                {m.paliersEntreprises.map((p) => (
                  <tr key={p.nom}>
                    <td>
                      <strong>{p.nom}</strong>
                      <br />
                      <small>{p.equivalent}</small>
                    </td>
                    <td>
                      <strong>{formatEuros(p.don)}</strong>
                    </td>
                    <td>
                      <strong>{formatEuros(p.coutReel)}</strong>
                    </td>
                    <td>{p.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="print-box">
            <h2>Modalités pratiques &amp; contact dédié aux entreprises</h2>
            <div className="print-grid-2">
              <div className="print-subbox">
                <h3>Coordonnées bancaires (virement ou chèque)</h3>
                <p className="small">
                  <strong>Bénéficiaire :</strong> {v.beneficiaire}
                  <br />
                  <strong>IBAN :</strong> {v.iban}
                  <br />
                  <strong>BIC :</strong> {v.bic} ({v.banque})
                  <br />
                  <strong>Libellé du virement :</strong> {v.objet}
                  <br />
                  <strong>Chèque à l&apos;ordre de :</strong> {c.ordre} ({c.mention})
                </p>
              </div>
              <div className="print-subbox">
                <h3>Votre interlocutrice Mécénat &amp; Conventions</h3>
                <p className="small">
                  <strong>{SITE.contact.donsEtLegs.nom}</strong> — Commission Finance &amp; Économat
                  <br />
                  Téléphone : {SITE.contact.donsEtLegs.telephone}
                  <br />
                  E-mail : {SITE.contact.donsEtLegs.email}
                  <br />
                  Adresse : {SITE.adresse}
                </p>
              </div>
            </div>
          </div>

          <footer className="print-footer">
            <p className="print-legal">{SITE.don.bonDeSoutien.noteRecuFiscal}</p>
          </footer>
        </div>
      </div>
    </section>
  );
}
