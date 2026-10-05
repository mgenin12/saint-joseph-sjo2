import type { Metadata } from "next";
import { absoluteUrl } from "./config";
import { truncate } from "./text";

export const SITE_NAME = "Église Saint Joseph — Le Rouret";
export const SITE_TITLE = "Église Saint Joseph — Projet SJO2 · Paroisse Saint-Arnoux · Le Rouret";
export const SITE_DESCRIPTION =
  "Projet SJO2 : la Paroisse Saint-Arnoux bâtit l'église Saint Joseph et son centre paroissial au Rouret (Alpes-Maritimes). Découvrez le projet, suivez son avancement et faites monter le clocher.";
export const DEFAULT_OG_IMAGE = "/og-image.jpg";
export const DEFAULT_OG_ALT = "L'église Saint Joseph du Rouret, vue de nuit";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  publishedTime?: string;
  authors?: string[];
  section?: string;
  tags?: string[];
  noindex?: boolean;
};

/** Métadonnées complètes (Open Graph + Twitter Cards + canonical) pour une page. */
export function pageMetadata(meta: PageMeta): Metadata {
  const url = absoluteUrl(meta.path);
  const description = truncate(meta.description, 160);
  const image = meta.image ? (meta.image.startsWith("http") ? meta.image : absoluteUrl(meta.image)) : absoluteUrl(DEFAULT_OG_IMAGE);
  const alt = meta.imageAlt ?? DEFAULT_OG_ALT;
  const openGraph: NonNullable<Metadata["openGraph"]> = {
    type: meta.type ?? "website",
    locale: "fr_FR",
    siteName: SITE_NAME,
    url,
    title: meta.title,
    description,
    images: [{ url: image, width: 1200, height: 630, alt }],
  };
  if (meta.type === "article") {
    Object.assign(openGraph, {
      publishedTime: meta.publishedTime,
      authors: meta.authors,
      section: meta.section,
      tags: meta.tags,
    });
  }
  return {
    title: meta.title,
    description,
    alternates: { canonical: url },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description,
      images: [image],
    },
    robots: meta.noindex ? { index: false, follow: false } : undefined,
  };
}

/** Données structurées Schema.org de l'organisation (dans le layout). */
export function churchJsonLd(urlDon: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Church",
    name: "Église Saint Joseph — Projet SJO2",
    alternateName: "Centre paroissial et église Saint Joseph du Rouret",
    url: absoluteUrl("/"),
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    logo: absoluteUrl("/assets/img/eglise-saint-joseph-batisseurs-du-seigneur.png"),
    address: {
      "@type": "PostalAddress",
      streetAddress: "30 Allée du Pré des Roures",
      postalCode: "06650",
      addressLocality: "Le Rouret",
      addressCountry: "FR",
    },
    parentOrganization: {
      "@type": "Organization",
      name: "Association Diocésaine de Nice",
      url: "https://nice.catholique.fr/",
    },
    potentialAction: {
      "@type": "DonateAction",
      name: "Faire un don au projet SJO2",
      target: urlDon,
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}
