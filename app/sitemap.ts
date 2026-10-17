import type { MetadataRoute } from "next";
import { getArticles } from "@/lib/articles";
import { getEvents } from "@/lib/events";
import { absoluteUrl } from "@/lib/config";

export const revalidate = 600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, events] = await Promise.all([getArticles({ drafts: false }), getEvents()]);
  const now = new Date();
  const pages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/articles"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/soutenir"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/calendrier"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/newsletter"), lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: absoluteUrl("/contact"), lastModified: now, changeFrequency: "yearly", priority: 0.5 },
  ];
  for (const a of articles) {
    pages.push({
      url: absoluteUrl(`/articles/${a.slug}`),
      lastModified: a.date ? new Date(a.date) : now,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }
  for (const e of events) {
    pages.push({ url: absoluteUrl(`/calendrier/${e.slug}`), lastModified: now, changeFrequency: "monthly", priority: 0.5 });
  }
  return pages;
}
