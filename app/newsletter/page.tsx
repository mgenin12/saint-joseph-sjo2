import type { Metadata } from "next";
import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";
import { getSiteConfig } from "@/lib/config";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 600;

export const metadata: Metadata = pageMetadata({
  title: "M'inscrire à la newsletter",
  description: "Recevez les nouvelles du projet SJO2 : avancement du chantier, rendez-vous, appels à la générosité. Environ un envoi par mois, désinscription à tout moment.",
  path: "/newsletter",
});

export default async function NewsletterPage() {
  const config = await getSiteConfig();
  return (
    <>
      <section className="page-head">
        <div className="container">
          <span className="eyebrow">Newsletter</span>
          <h1>Suivez le chantier, mois après mois.</h1>
          <p className="lead">
            Avancement du projet, prochains rendez-vous, portraits de bâtisseurs, appels à la générosité : l&apos;essentiel, directement dans votre boîte mail.
          </p>
        </div>
      </section>
      <section className="section section--tight">
        <div className="container grid grid-2" style={{ alignItems: "start" }}>
          <div>
            {config.urlNewsletter ? (
              <div className="card">
                <p>L&apos;inscription se fait sur notre outil d&apos;envoi.</p>
                <a className="btn btn--gold btn--lg" href={config.urlNewsletter} target="_blank" rel="noopener">
                  M&apos;inscrire
                </a>
              </div>
            ) : (
              <NewsletterForm externalUrl={config.urlNewsletter} facebookUrl={config.reseaux.facebook} emailFallback={config.emailContact} />
            )}
          </div>
          <aside className="grid" style={{ gap: 16 }}>
            <div className="card">
              <h3>Ce que vous recevrez</h3>
              <ul>
                <li>Les étapes franchies et les prochaines (études, autorisations, travaux)</li>
                <li>Les rendez-vous : messes sur le terrain, fêtes, rencontres</li>
                <li>L&apos;état de la collecte : la hauteur du clocher, mois après mois</li>
                <li>Les nouveaux articles et portraits de l&apos;équipe</li>
              </ul>
            </div>
            <div className="card">
              <h3>Vos données</h3>
              <p className="small">
                Votre adresse n&apos;est utilisée que pour cet envoi et n&apos;est jamais cédée. Désinscription en un clic depuis chaque e-mail. Voir la{" "}
                <Link href="/confidentialite">politique de confidentialité</Link>.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
