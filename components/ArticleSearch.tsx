"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import ArticleCard from "./ArticleCard";
import type { ArticleIndexEntry } from "@/lib/search";
import { searchArticles } from "@/lib/search";
import type { Categorie } from "@/lib/types";

type Props = {
  entries: ArticleIndexEntry[];
  categories: Categorie[];
  initialQuery?: string;
  initialCategorie?: string;
};

/**
 * Recherche d'articles côté client (mots-clés + catégorie) avec synchronisation
 * de l'URL (?q=…&categorie=…) pour que les filtres soient partageables.
 */
export default function ArticleSearch({ entries, categories, initialQuery = "", initialCategorie = "" }: Props) {
  const [q, setQ] = useState(initialQuery);
  const [cat, setCat] = useState(initialCategorie);
  const first = useRef(true);

  const visibleCategories = useMemo(() => categories.filter((c) => c.count > 0), [categories]);
  const activeCategory = useMemo(() => visibleCategories.find((c) => c.slug === cat || c.nom === cat), [visibleCategories, cat]);

  const results = useMemo(() => searchArticles(entries, q, activeCategory?.nom), [entries, q, activeCategory]);

  // Synchronise l'URL sans recharger la page.
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (activeCategory) params.set("categorie", activeCategory.slug);
    const search = params.toString();
    const url = `${window.location.pathname}${search ? `?${search}` : ""}`;
    window.history.replaceState(window.history.state, "", url);
  }, [q, activeCategory]);

  // Bouton « précédent » du navigateur : relit l'URL.
  useEffect(() => {
    const onPop = () => {
      const p = new URLSearchParams(window.location.search);
      setQ(p.get("q") ?? "");
      setCat(p.get("categorie") ?? "");
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const reset = () => {
    setQ("");
    setCat("");
  };

  return (
    <div>
      <div className="search" role="search">
        <label className="sr-only" htmlFor="recherche-articles">
          Rechercher un article
        </label>
        <input
          id="recherche-articles"
          className="search__input"
          type="search"
          placeholder="Rechercher par mot-clé : terrain, budget, architectes, bénévoles…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          autoComplete="off"
        />
      </div>

      <div className="chips" role="group" aria-label="Filtrer par catégorie">
        <button type="button" className={`chip${!activeCategory ? " active" : ""}`} onClick={() => setCat("")}>
          Toutes <small>{entries.length}</small>
        </button>
        {visibleCategories.map((c) => (
          <button
            key={c.slug}
            type="button"
            className={`chip${activeCategory?.slug === c.slug ? " active" : ""}`}
            aria-pressed={activeCategory?.slug === c.slug}
            onClick={() => setCat(activeCategory?.slug === c.slug ? "" : c.slug)}
          >
            {c.nom} <small>{c.count}</small>
          </button>
        ))}
      </div>

      <p className="results-count" aria-live="polite">
        {results.length === 0
          ? "Aucun article ne correspond."
          : `${results.length} article${results.length > 1 ? "s" : ""}${activeCategory ? ` · ${activeCategory.nom}` : ""}${q.trim() ? ` · « ${q.trim()} »` : ""}`}
      </p>

      {results.length === 0 ? (
        <div className="empty">
          <p>
            Essayez un autre mot-clé ou une autre catégorie{activeCategory ? ` que « ${activeCategory.nom} »` : ""}.
          </p>
          <button type="button" className="btn btn--navy btn--sm" onClick={reset}>
            Réinitialiser la recherche
          </button>
        </div>
      ) : (
        <div className="cards">
          {results.map((a) => (
            <ArticleCard key={a.slug} article={a} reveal={false} />
          ))}
        </div>
      )}
    </div>
  );
}
