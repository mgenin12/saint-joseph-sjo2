import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EventCard } from "@/components/Calendar";
import MediaGallery from "@/components/MediaGallery";
import ShareBar from "@/components/ShareBar";
import { getEvent, getEvents, isComplet } from "@/lib/events";
import { googleCalendarUrl } from "@/lib/ics";
import { absoluteUrl } from "@/lib/config";
import { formatDateFull, todayIso } from "@/lib/dates";
import { stripMarkdown, truncate } from "@/lib/text";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const revalidate = 600;
export const dynamicParams = true;

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return (await getEvents()).map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const e = await getEvent(slug);
  if (!e) return { title: "Événement introuvable" };
  return pageMetadata({
    title: `${e.titre} — ${formatDateFull(e.date)}`,
    description: truncate(stripMarkdown(e.description) || `${e.titre}, ${formatDateFull(e.date)}${e.lieu ? ` · ${e.lieu}` : ""}.`, 160),
    path: `/calendrier/${e.slug}`,
    image: e.image,
    type: "article",
  });
}

export default async function EvenementPage({ params }: { params: Params }) {
  const { slug } = await params;
  const e = await getEvent(slug);
  if (!e) notFound();
  const today = todayIso();
  const url = absoluteUrl(`/calendrier/${e.slug}`);
  const past = (e.dateFin ?? e.date) < today;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: e.titre,
    startDate: e.heureDebut ? `${e.date}T${e.heureDebut.replace("h", ":").padEnd(5, "0")}:00+02:00` : e.date,
    endDate: e.dateFin ?? undefined,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: e.lieu ? { "@type": "Place", name: e.lieu, address: "Le Rouret, Alpes-Maritimes, France" } : undefined,
    description: stripMarkdown(e.description),
    image: e.image ? [e.image] : undefined,
    url,
    organizer: { "@type": "Organization", name: "Paroisse Saint-Arnoux", url: absoluteUrl("/") },
    offers: e.lienInscription
      ? { "@type": "Offer", url: e.lienInscription, price: "0", priceCurrency: "EUR", availability: isComplet(e) ? "https://schema.org/SoldOut" : "https://schema.org/InStock" }
      : undefined,
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
              <Link href="/calendrier">Calendrier</Link>
            </li>
            <li>{formatDateFull(e.date)}</li>
          </ol>
          <span className="eyebrow">{e.categorie}</span>
          <h1>{e.titre}</h1>
          <p className="meta">
            {formatDateFull(e.date)}
            {e.lieu && ` · ${e.lieu}`}
            {past && " · événement passé"}
          </p>
        </div>
      </section>
      <section className="section section--tight">
        <div className="narrow">
          <EventCard e={e} today={today} detailed />
          <MediaGallery photos={e.photos} videos={e.videos} />
          <div className="row mt-4">
            <Link className="btn btn--outline btn--sm" href={`/calendrier?mois=${e.date.slice(0, 7)}&date=${e.date}`}>
              ← Voir dans le calendrier
            </Link>
          </div>
          <ShareBar url={url} title={e.titre} text={`${formatDateFull(e.date)}${e.lieu ? ` · ${e.lieu}` : ""}`} />
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Accueil", path: "/" },
              { name: "Calendrier", path: "/calendrier" },
              { name: e.titre, path: `/calendrier/${e.slug}` },
            ]),
          ),
        }}
      />
    </>
  );
}
