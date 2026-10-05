import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <span className="eyebrow">Erreur 404</span>
          <h1>Cette page n&apos;existe pas (encore).</h1>
          <p className="lead">Le lien est peut-être ancien : l&apos;article ou l&apos;événement a pu être renommé.</p>
        </div>
      </section>
      <section className="section section--tight">
        <div className="container row">
          <Link className="btn btn--navy" href="/">
            Retour à l&apos;accueil
          </Link>
          <Link className="btn btn--outline" href="/articles">
            Voir les articles
          </Link>
          <Link className="btn btn--outline" href="/calendrier">
            Voir le calendrier
          </Link>
        </div>
      </section>
    </>
  );
}
