import type { Metadata } from "next";
import Calendar from "@/components/Calendar";
import { getEvents } from "@/lib/events";
import { googleCalendarSubscribeUrl } from "@/lib/ics";
import { monthOrCurrent, todayIso, toIsoDate } from "@/lib/dates";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 600;

type SearchParams = Promise<{ mois?: string; date?: string }>;

export const metadata: Metadata = pageMetadata({
  title: "Calendrier des événements",
  description:
    "Messes sur le terrain, fêtes paroissiales, étapes du projet, rendez-vous des bâtisseurs : le calendrier du projet SJO2. Cliquez sur une date pour la description et l'inscription.",
  path: "/calendrier",
});

export default async function CalendrierPage({ searchParams }: { searchParams: SearchParams }) {
  const { mois, date } = await searchParams;
  const events = await getEvents();
  const today = todayIso();
  const selected = toIsoDate(date);
  const initialMonth = monthOrCurrent(mois ?? selected?.slice(0, 7));
  const subscribeUrl = googleCalendarSubscribeUrl();

  return (
    <>
      <section className="page-head">
        <div className="container">
          <span className="eyebrow">Calendrier</span>
          <h1>Les rendez-vous du projet</h1>
          <p className="lead">
            Cliquez sur une date pour découvrir l&apos;événement, sa description et le lien d&apos;inscription. Ajoutez-le à votre agenda en un clic.
          </p>
          <div className="row mt-4">
            <a className="btn btn--outline btn--sm" href={subscribeUrl} target="_blank" rel="noopener">
              + S&apos;abonner au Google Agenda
            </a>
          </div>
        </div>
      </section>
      <section className="section section--tight">
        <div className="container">
          <Calendar events={events} today={today} initialMonth={initialMonth} initialDate={selected} />
        </div>
      </section>
    </>
  );
}
