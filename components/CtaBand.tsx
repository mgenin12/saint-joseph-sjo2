import Link from "next/link";

/** Bandeau présent en bas de chaque page : newsletter + don (exigence du cahier des charges). */
export default function CtaBand({ urlDon }: { urlDon: string }) {
  return (
    <section className="cta-band" aria-labelledby="cta-band-title">
      <div className="container cta-band__inner">
        <div>
          <h2 id="cta-band-title">Bâtissons ensemble l&apos;église Saint Joseph.</h2>
          <p>Recevez les nouvelles du projet, ou posez dès aujourd&apos;hui votre pierre au clocher.</p>
        </div>
        <div className="cta-band__links">
          <Link className="btn btn--outline" href="/newsletter">
            M&apos;inscrire à la newsletter
          </Link>
          <a className="btn btn--gold" href={urlDon} target="_blank" rel="noopener">
            Donner
          </a>
        </div>
        <p className="cta-band__alt">
          Vous préférez un virement, un chèque ou le mécénat d&apos;entreprise ?{" "}
          <Link href="/soutenir#autres-moyens">Voir toutes les façons de soutenir</Link>.
        </p>
      </div>
    </section>
  );
}
