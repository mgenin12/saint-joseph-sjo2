import { getEvent } from "@/lib/events";
import { eventToIcs } from "@/lib/ics";

export const revalidate = 600;

/** GET /calendrier/[slug]/ics → fichier .ics « Ajouter à mon agenda ». */
export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const e = await getEvent(slug);
  if (!e) return new Response("Événement introuvable", { status: 404 });
  return new Response(eventToIcs(e), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${e.slug}.ics"`,
      "Cache-Control": "public, max-age=600",
    },
  });
}
