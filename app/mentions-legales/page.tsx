import type { Metadata } from "next";
import { SITE } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Mentions légales",
  description: "Mentions légales du site du projet SJO2 — Église Saint Joseph, Paroisse Saint-Arnoux, Le Rouret.",
  path: "/mentions-legales",
  noindex: true,
});

export default function MentionsLegalesPage() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <span className="eyebrow">Informations</span>
          <h1>Mentions légales</h1>
        </div>
      </section>
      <section className="section section--tight">
        <div className="narrow prose">
          <h2>Éditeur du site</h2>
          <p>
            Association Diocésaine de Nice — Paroisse Saint-Arnoux
            <br />
            {SITE.adresse}
            <br />
            Directeur de la publication : <em>[À compléter : nom du directeur de la publication]</em>
            <br />
            Contact : <em>[À compléter : adresse e-mail de contact]</em>
          </p>
          <h2>Hébergement</h2>
          <p>
            Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis —{" "}
            <a href="https://vercel.com" target="_blank" rel="noopener">
              vercel.com
            </a>
          </p>
          <h2>Dons</h2>
          <p>
            Les dons en ligne sont collectés par l&apos;Association Diocésaine de Nice via sa plateforme sécurisée. Ils ouvrent droit à un reçu fiscal
            dans les conditions prévues par la loi (réduction d&apos;impôt de 66 % pour les particuliers, 60 % pour les entreprises).
          </p>
          <h2>Propriété intellectuelle</h2>
          <p>
            Les textes, photographies et visuels de ce site sont la propriété de la Paroisse Saint-Arnoux ou de leurs auteurs respectifs. Toute
            reproduction est soumise à autorisation préalable, à l&apos;exception du partage des pages via les réseaux sociaux.
          </p>
          <h2>Crédits</h2>
          <p>
            Photographies : Gwendoline Jayne Tuzzeo et les bénévoles du projet. Conception du site : équipe Communication du projet SJO2.
          </p>
        </div>
      </section>
    </>
  );
}
