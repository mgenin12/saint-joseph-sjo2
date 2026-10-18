import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Politique de confidentialité",
  description: "Données personnelles collectées par le site du projet SJO2 et vos droits.",
  path: "/confidentialite",
  noindex: true,
});

export default function ConfidentialitePage() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <span className="eyebrow">Informations</span>
          <h1>Politique de confidentialité</h1>
        </div>
      </section>
      <section className="section section--tight">
        <div className="narrow prose">
          <h2>Données collectées</h2>
          <ul>
            <li>
              <b>Formulaire de contact</b> : nom, e-mail, sujet, message — utilisés uniquement pour répondre à votre demande.
            </li>
            <li>
              <b>Newsletter</b> : e-mail et prénom — utilisés uniquement pour l&apos;envoi de la lettre d&apos;information du projet, avec votre
              consentement. Désinscription possible à tout moment via le lien présent dans chaque e-mail.
            </li>
            <li>
              <b>Dons</b> : les paiements sont réalisés sur la plateforme du Diocèse de Nice, qui applique sa propre politique de confidentialité. Ce
              site ne collecte aucune donnée bancaire.
            </li>
          </ul>
          <h2>Cookies et mesure d&apos;audience</h2>
          <p>
            Ce site ne dépose aucun cookie publicitaire ni traceur tiers. Les boutons de partage sont de simples liens vers les réseaux sociaux : aucune
            donnée n&apos;est transmise tant que vous ne cliquez pas.
          </p>
          <h2>Responsable du traitement</h2>
          <p>
            Association Diocésaine de Nice — Paroisse Saint-Arnoux. <em>[À compléter : adresse e-mail pour l&apos;exercice des droits]</em>
          </p>
          <h2>Vos droits</h2>
          <p>
            Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement et d&apos;opposition sur vos données. Pour
            l&apos;exercer, écrivez-nous via la page <Link href="/contact">Contact</Link>. Vous pouvez également saisir la CNIL.
          </p>
        </div>
      </section>
    </>
  );
}
