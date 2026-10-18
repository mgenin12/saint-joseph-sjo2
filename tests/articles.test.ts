import { describe, it, expect } from "vitest";
import { buildArticles, computeStatut, sortArticles, DEFAULT_CATEGORIES } from "@/lib/articles";
import { rowsToObjects, parseCsv } from "@/lib/sheets";
import type { Article } from "@/lib/types";

const HEADERS = ["Article", "Catégorie", "Contenu en quelques mots", "Cible principale (paroissiens, donateurs…)", "Rédacteur", "Date de publication"];

function rows(...lines: string[][]) {
  return rowsToObjects([HEADERS, ...lines]);
}

const seed = (over: Partial<Parameters<typeof buildArticles>[1][number]> = {}) => ({
  slug: "qui-est-bao-dinh",
  titre: "Qui est Bao Dinh ?",
  categories: ["Présentation"],
  motsCles: ["curé"],
  aliases: [],
  publie: false,
  contenu: "# Bonjour\n\nTexte du dépôt.",
  ...over,
});

describe("règle de publication", () => {
  it("publie par défaut (ni statut, ni date)", () => {
    expect(computeStatut(undefined, undefined, "2026-10-05")).toBe("publie");
  });
  it("masque les dates futures", () => {
    expect(computeStatut(undefined, "2026-12-01", "2026-10-05")).toBe("brouillon");
    expect(computeStatut(undefined, "2026-10-05", "2026-10-05")).toBe("publie");
  });
  it("respecte un statut explicite", () => {
    expect(computeStatut("Brouillon", undefined)).toBe("brouillon");
    expect(computeStatut("Publié", "2999-01-01")).toBe("publie");
    expect(computeStatut("en ligne", undefined)).toBe("publie");
  });
});

describe("buildArticles", () => {
  it("fusionne une ligne du Sheet avec le contenu du dépôt", () => {
    const out = buildArticles(rows(["Qui est Bao Dinh ?", "Présentation", "Portrait du curé", "Paroissiens", "Marlyne", "20/09/2026"]), [seed()], DEFAULT_CATEGORIES);
    expect(out).toHaveLength(1);
    expect(out[0]).toMatchObject({
      slug: "qui-est-bao-dinh",
      categories: ["Présentation"],
      brief: "Portrait du curé",
      auteur: "Marlyne",
      date: "2026-09-20",
      contenuSource: "repo",
      source: "sheet",
    });
    expect(out[0].contenu).toContain("Texte du dépôt");
  });

  it("gère plusieurs catégories et corrige l'orthographe officielle", () => {
    const out = buildArticles(rows(["Budget", "budget, equipe", "", "", "", ""]), [], DEFAULT_CATEGORIES);
    expect(out[0].categories).toEqual(["Budget", "Équipe"]);
  });

  it("retrouve un article par alias quand le titre du Sheet change", () => {
    const out = buildArticles(
      rows(["Pourquoi le coût de la construction a augmenté", "Budget", "", "", "", ""]),
      [seed({ slug: "pourquoi-le-cout-a-augmente", titre: "Pourquoi le coût a augmenté", aliases: ["pourquoi-le-cout-de-la-construction-a-augmente"] })],
      DEFAULT_CATEGORIES,
    );
    expect(out[0].slug).toBe("pourquoi-le-cout-a-augmente");
    expect(out[0].contenuSource).toBe("repo");
  });

  it("ajoute les articles du dépôt marqués publie: true et ignore les autres", () => {
    const out = buildArticles(rows(["Le terrain", "Projet", "", "", "", ""]), [seed({ slug: "faq", titre: "FAQ", publie: true }), seed({ slug: "secret", titre: "Secret" })], DEFAULT_CATEGORIES);
    expect(out.map((a) => a.slug).sort()).toEqual(["faq", "le-terrain"]);
    expect(out.find((a) => a.slug === "faq")?.source).toBe("repo");
  });

  it("ignore les lignes sans titre et dédoublonne les slugs", () => {
    const out = buildArticles(rows(["", "Projet", "", "", "", ""], ["Le terrain", "", "", "", "", ""], ["Le terrain", "", "", "", "", ""]), [], DEFAULT_CATEGORIES);
    expect(out.map((a) => a.slug)).toEqual(["le-terrain", "le-terrain-2"]);
  });

  it("lit le CSV réel exporté du Sheet (lignes irrégulières)", () => {
    const csv = `Article,Catégorie,Contenu en quelques mots,"Cible principale (paroissiens, donateurs…)",Rédacteur,Date de publication\nLe terrain,Projet,"Historique, achat",Tous\nBudget,"Budget, Présentation"\n`;
    const out = buildArticles(rowsToObjects(parseCsv(csv)), [], DEFAULT_CATEGORIES);
    expect(out.map((a) => a.titre)).toEqual(["Le terrain", "Budget"]);
    expect(out[1].categories).toEqual(["Budget", "Présentation"]);
  });
});

describe("sortArticles", () => {
  const mk = (slug: string, date: string | undefined, ordre: number): Article =>
    ({ slug, titre: slug, categories: [], brief: "", resume: "", contenu: "", contenuSource: "brief", motsCles: [], statut: "publie", source: "sheet", ordre, date }) as Article;
  it("trie les datés du plus récent au plus ancien, puis les non datés dans l'ordre du Sheet", () => {
    const out = sortArticles([mk("c", undefined, 2), mk("a", "2026-01-01", 0), mk("d", undefined, 3), mk("b", "2026-06-01", 1)]);
    expect(out.map((a) => a.slug)).toEqual(["b", "a", "c", "d"]);
  });
});
