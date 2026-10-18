import { describe, it, expect } from "vitest";
import { normalize, slugify, normalizeHeader, splitList, parseBool, truncate, stripMarkdown, formatEuros } from "@/lib/text";

describe("text helpers", () => {
  it("normalise accents et casse", () => {
    expect(normalize("Équipe & Déduction fiscales")).toBe("equipe & deduction fiscales");
  });

  it("slugifie les titres d'articles", () => {
    expect(slugify("Qui est Bao Dinh ?")).toBe("qui-est-bao-dinh");
    expect(slugify("Pourquoi le coût de la construction a augmenté")).toBe("pourquoi-le-cout-de-la-construction-a-augmente");
    expect(slugify("Focus sur les matériaux locaux (les normes, etc.)")).toBe("focus-sur-les-materiaux-locaux");
  });

  it("normalise les en-têtes du Sheet", () => {
    expect(normalizeHeader("Contenu en quelques mots")).toBe("contenu_en_quelques_mots");
    expect(normalizeHeader("Cible principale (paroissiens, donateurs…)")).toBe("cible_principale");
    expect(normalizeHeader("Date de publication")).toBe("date_de_publication");
    expect(normalizeHeader("Catégorie")).toBe("categorie");
  });

  it("découpe les listes multi-valeurs", () => {
    expect(splitList("Présentation, Équipe ; Budget\nAgenda")).toEqual(["Présentation", "Équipe", "Budget", "Agenda"]);
    expect(splitList(undefined)).toEqual([]);
  });

  it("interprète les booléens du Sheet", () => {
    expect(parseBool("oui")).toBe(true);
    expect(parseBool("Non")).toBe(false);
    expect(parseBool("TRUE")).toBe(true);
    expect(parseBool("", true)).toBe(true);
  });

  it("tronque proprement et retire le Markdown", () => {
    expect(truncate("a".repeat(200), 20).length).toBeLessThanOrEqual(21);
    expect(stripMarkdown("## Titre\n\nUn **texte** avec [lien](https://x.y) et `code`.")).toContain("Un texte avec lien et code.");
  });

  it("formate les euros à la française", () => {
    expect(formatEuros(6_000_000).replace(/\u202f|\u00a0/g, " ")).toBe("6 000 000 €");
  });
});
