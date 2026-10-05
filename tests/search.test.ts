import { describe, it, expect } from "vitest";
import { searchArticles, tokenize, toIndexEntry } from "@/lib/search";
import type { Article } from "@/lib/types";

const mk = (slug: string, titre: string, categories: string[], contenu = "", motsCles: string[] = []): Article => ({
  slug,
  titre,
  categories,
  brief: "",
  resume: "",
  contenu,
  contenuSource: "repo",
  motsCles,
  statut: "publie",
  source: "sheet",
  ordre: 0,
});

const entries = [
  mk("le-terrain", "Le terrain", ["Projet"], "Un hectare au Rouret, acquis en 2025.", ["terrain", "achat"]),
  mk("budget", "Budget", ["Budget", "Présentation"], "Coût global de 6 M€ TTC."),
  mk("qui-sommes-nous", "Qui sommes-nous ?", ["Équipe"], "Une équipe de bénévoles."),
].map(toIndexEntry);

describe("recherche d'articles", () => {
  it("découpe la requête en mots normalisés", () => {
    expect(tokenize("  Équipe, bénévoles ! ")).toEqual(["equipe", "benevoles"]);
  });

  it("retrouve par mot-clé sans tenir compte des accents ni de la casse", () => {
    expect(searchArticles(entries, "ROURET").map((e) => e.slug)).toEqual(["le-terrain"]);
    expect(searchArticles(entries, "benevoles").map((e) => e.slug)).toEqual(["qui-sommes-nous"]);
  });

  it("applique un ET logique entre les mots", () => {
    expect(searchArticles(entries, "terrain 2025").map((e) => e.slug)).toEqual(["le-terrain"]);
    expect(searchArticles(entries, "terrain budget")).toEqual([]);
  });

  it("filtre par catégorie (y compris les articles multi-catégories)", () => {
    expect(searchArticles(entries, "", "Présentation").map((e) => e.slug)).toEqual(["budget"]);
    expect(searchArticles(entries, "", "équipe").map((e) => e.slug)).toEqual(["qui-sommes-nous"]);
    expect(searchArticles(entries, "6 M", "Budget").map((e) => e.slug)).toEqual(["budget"]);
  });

  it("cherche aussi dans les catégories et les mots-clés", () => {
    expect(searchArticles(entries, "achat").map((e) => e.slug)).toEqual(["le-terrain"]);
    expect(searchArticles(entries, "presentation").map((e) => e.slug)).toEqual(["budget"]);
  });
});
