import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import { SITE } from "@/content/site";
import { getSiteConfig } from "@/lib/config";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 600;

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: "Une question sur le projet SJO2, un don, un legs, une proposition de bénévolat ou de mécénat ? Écrivez à l'équipe du projet Saint Joseph.",
  path: "/contact",
});

type SearchParams = Promise<{ sujet?: string; mission?: string }>;

export default async function ContactPage({ searchParams }: { searchParams: SearchParams }) {
  const { sujet, mission } = await searchParams;
  const config = await getSiteConfig();
  const dons = SITE.contact.donsEtLegs;

  return (
    <>
      <section className="page-head">
        <div className="container">
          <span className="eyebrow">Contact</span>
          <h1>Écrivez-nous</h1>
          <p className="lead">Une question, une idée, une compétence à offrir ? L&apos;équipe du projet vous répond.</p>
        </div>
      </section>
      <section className="section section--tight">
        <div className="container grid grid-2" style={{ alignItems: "start" }}>
          <div>
            {config.urlFormulaireContact ? (
              <div className="card">
                <p>Notre formulaire de contact est hébergé sur un service externe.</p>
                <a className="btn btn--gold" href={config.urlFormulaireContact} target="_blank" rel="noopener">
                  Ouvrir le formulaire
                </a>
              </div>
            ) : (
              <ContactForm sujet={sujet} mission={mission} emailFallback={config.emailContact} facebookUrl={config.reseaux.facebook} donsContact={dons} />
            )}
          </div>
          <aside className="grid" style={{ gap: 16 }}>
            <div className="card">
              <h3>Dons, legs et mécénat</h3>
              <p>
                {dons.nom}
                <br />
                <a href={`tel:${dons.telephone.replace(/\s/g, "")}`}>{dons.telephone}</a>
                <br />
                <a href={`mailto:${dons.email}`}>{dons.email}</a>
              </p>
            </div>
            <div className="card">
              <h3>Paroisse Saint-Arnoux</h3>
              <p>{SITE.adresse}</p>
              {config.emailContact && (
                <p>
                  <a href={`mailto:${config.emailContact}`}>{config.emailContact}</a>
                </p>
              )}
              {config.reseaux.facebook && (
                <p>
                  <a href={config.reseaux.facebook} target="_blank" rel="noopener">
                    Page Facebook de la paroisse
                  </a>
                </p>
              )}
            </div>
            <div className="card">
              <h3>Bénévolat</h3>
              <p className="small">
                Consultez les <Link href="/articles/rejoindre-les-benevoles">missions ouvertes</Link> et indiquez celle qui vous intéresse dans le formulaire.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
