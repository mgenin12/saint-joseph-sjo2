import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Blocks from "@/components/Blocks";
import ArticleCard from "@/components/ArticleCard";
import ShareBar from "@/components/ShareBar";
import { getArticle, getArticles, getRelatedArticles, getAdjacentArticles } from "@/lib/articles";
import { absoluteUrl } from "@/lib/config";
import { formatDateLong } from "@/lib/dates";
import { slugify } from "@/lib/text";
import { pageMetadata, breadcrumbJsonLd, SITE_NAME } from "@/lib/seo";

export const revalidate = 600;
export const dynamicParams = true;

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const articles = await getArticles({ drafts: false });
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return { title: "Article introuvable" };
  return pageMetadata({
    title: article.titre,
    description: article.resume || article.brief || article.titre,
    path: `/articles/${article.slug}`,
    // Image Open Graph générée par opengraph-image.tsx (titre + catégorie + visuel éventuel).
    image: `/articles/${article.slug}/opengraph-image`,
    imageAlt: article.titre,
    type: "article",
    publishedTime: article.date,
    authors: article.auteur ? [article.auteur] : undefined,
    section: article.categories[0],
    tags: [...article.categories, ...article.motsCles],
    noindex: article.statut === "brouillon",
  });
}

export default async function ArticlePage({ params }: { params: Params }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();
  const [related, adjacent] = await Promise.all([getRelatedArticles(article, 3), getAdjacentArticles(article)]);
  const url = absoluteUrl(`/articles/${article.slug}`);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.titre,
    description: article.resume,
    datePublished: article.date,
    author: article.auteur ? { "@type": "Person", name: article.auteur } : { "@type": "Organization", name: "Paroisse Saint-Arnoux" },
    publisher: { "@type": "Organization", name: SITE_NAME },
    image: article.image ? [article.image] : [absoluteUrl(`/articles/${article.slug}/opengraph-image`)],
    mainEntityOfPage: url,
    articleSection: article.categories.join(", "),
    keywords: article.motsCles.join(", "),
  };

  return (
    <>
      <section className="page-head">
        <div className="container narrow">
          <ol className="breadcrumb" aria-label="Fil d'Ariane">
            <li>
              <Link href="/">Accueil</Link>
            </li>
            <li>
              <Link href="/articles">Le projet</Link>
            </li>
            {article.categories[0] && (
              <li>
                <Link href={`/articles?categorie=${slugify(article.categories[0])}`}>{article.categories[0]}</Link>
              </li>
            )}
          </ol>
          <div className="badges">
            {article.categories.map((c) => (
              <Link key={c} className="badge badge--gold" href={`/articles?categorie=${slugify(c)}`}>
                {c}
              </Link>
            ))}
            {article.statut === "brouillon" && <span className="badge badge--draft">Brouillon</span>}
          </div>
          <h1>{article.titre}</h1>
          {article.resume && <p className="lead">{article.resume}</p>}
          <p className="meta">
            {article.date && <time dateTime={article.date}>{formatDateLong(article.date)}</time>}
            {article.date && article.auteur && " · "}
            {article.auteur && <span>Par {article.auteur}</span>}
          </p>
        </div>
      </section>

      {article.image && (
        <div className="container">
          <figure className="article__cover">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={article.image} alt="" />
          </figure>
        </div>
      )}

      <article className="section section--tight">
        <div className="narrow">
          {article.statut === "brouillon" && (
            <div className="draft-banner">
              <b>Brouillon</b> — cet article n&apos;est pas encore publié : il n&apos;apparaît qu&apos;en prévisualisation.
            </div>
          )}
          {article.contenuSource === "brief" && article.brief && (
            <div className="notice notice--info" style={{ marginBottom: 24 }}>
              <b>Article en préparation.</b> Résumé de travail : {article.brief}
            </div>
          )}
          <div className="prose">
            <Blocks markdown={article.contenu || ""} />
          </div>

          {article.motsCles.length > 0 && (
            <div className="tags">
              {article.motsCles.map((m) => (
                <Link key={m} href={`/articles?q=${encodeURIComponent(m)}`}>
                  #{m}
                </Link>
              ))}
            </div>
          )}

          <ShareBar url={url} title={article.titre} text={article.resume} />

          <nav className="pager" aria-label="Autres articles">
            {adjacent.prev ? (
              <Link href={`/articles/${adjacent.prev.slug}`}>
                <small>← Article précédent</small>
                <br />
                {adjacent.prev.titre}
              </Link>
            ) : (
              <span />
            )}
            {adjacent.next ? (
              <Link href={`/articles/${adjacent.next.slug}`}>
                <small>Article suivant →</small>
                <br />
                {adjacent.next.titre}
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </div>
      </article>

      {related.length > 0 && (
        <section className="section section--alt section--tight" aria-labelledby="related-title">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">À lire aussi</span>
              <h2 id="related-title">Dans la même thématique</h2>
            </div>
            <div className="cards">
              {related.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </div>
        </section>
      )}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Accueil", path: "/" },
              { name: "Le projet", path: "/articles" },
              { name: article.titre, path: `/articles/${article.slug}` },
            ]),
          ),
        }}
      />
    </>
  );
}
