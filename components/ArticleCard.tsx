import Link from "next/link";
import { formatDateLong } from "@/lib/dates";

export type ArticleCardData = {
  slug: string;
  titre: string;
  resume: string;
  categories: string[];
  date?: string;
  auteur?: string;
  image?: string;
  statut: "publie" | "brouillon";
};

/** Carte d'article (listes, accueil, articles liés). Utilisable côté serveur et client. */
export default function ArticleCard({ article, reveal = true }: { article: ArticleCardData; reveal?: boolean }) {
  const initial = (article.titre.trim()[0] ?? "S").toUpperCase();
  return (
    <article className={`article-card${reveal ? " reveal" : ""}`}>
      <div className="article-card__media">
        {article.image ? (
          // Les visuels peuvent venir de Google Drive : on utilise une balise img simple.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={article.image} alt="" loading="lazy" />
        ) : (
          <div className="article-card__fallback" aria-hidden="true">
            <span>{initial}</span>
          </div>
        )}
      </div>
      <div className="article-card__body">
        <div className="badges">
          {article.categories.map((c) => (
            <span key={c} className="badge">
              {c}
            </span>
          ))}
          {article.statut === "brouillon" && <span className="badge badge--draft">Brouillon</span>}
        </div>
        <h3>
          <Link href={`/articles/${article.slug}`}>{article.titre}</Link>
        </h3>
        {article.resume && <p>{article.resume}</p>}
        <div className="meta">
          {article.date && <time dateTime={article.date}>{formatDateLong(article.date)}</time>}
          {article.date && article.auteur && <span aria-hidden="true"> · </span>}
          {article.auteur && <span>{article.auteur}</span>}
        </div>
        <span className="article-card__more" aria-hidden="true">
          Lire l&apos;article →
        </span>
      </div>
    </article>
  );
}
