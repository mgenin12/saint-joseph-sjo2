import type { Metadata } from "next";
import ArticleSearch from "@/components/ArticleSearch";
import { getArticles, getCategories, findCategory, getArticlesSource } from "@/lib/articles";
import { toIndexEntry } from "@/lib/search";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 600;

type SearchParams = Promise<{ q?: string; categorie?: string }>;

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const { categorie } = await searchParams;
  const cat = findCategory(await getCategories(), categorie);
  const title = cat ? `Le projet — ${cat.nom}` : "Le projet et l'équipe - Articles et descriptifs";
  return pageMetadata({
    title,
    description:
      "Tous les articles du projet SJO2 : présentation, architecture, avancement, équipe, budget, déduction fiscale, questions fréquentes. Recherche par mot-clé et par catégorie.",
    path: cat ? `/articles?categorie=${cat.slug}` : "/articles",
  });
}

export default async function ArticlesPage({ searchParams }: { searchParams: SearchParams }) {
  const { q = "", categorie = "" } = await searchParams;
  const [articles, categories, source] = await Promise.all([getArticles(), getCategories(), getArticlesSource()]);
  const cat = findCategory(categories, categorie);
  const entries = articles.map(toIndexEntry);

  return (
    <>
      <section className="page-head">
        <div className="container">
          <span className="eyebrow">Le projet</span>
          <h1>{cat ? cat.nom : "Le projet et l'équipe - Articles et descriptifs"}</h1>
          <p className="lead">
            Le terrain, les architectes, le budget, l&apos;équipe, les étapes… Recherchez un article par mot-clé ou parcourez-les par catégorie.
          </p>
          {source === "snapshot" && process.env.NODE_ENV !== "production" && (
            <p className="small" style={{ color: "var(--gold-soft)" }}>
              Mode hors-ligne : contenu issu de la copie locale du Google Sheet.
            </p>
          )}
        </div>
      </section>
      <section className="section section--tight">
        <div className="container">
          <ArticleSearch entries={entries} categories={categories} initialQuery={q} initialCategorie={cat?.slug ?? ""} />
        </div>
      </section>
    </>
  );
}
