import { EVENEMENTS_DEMARRAGE } from "@/content/evenements";
import { eventsToIcsCalendar } from "@/lib/ics";

export const revalidate = 600;

/**
 * GET /calendrier/export.ics → fichier .ics contenant les 6 dates initiales de 2026,
 * prêt à être importé dans Google Agenda (Paramètres → Importer et exporter).
 */
export async function GET() {
  return new Response(eventsToIcsCalendar(EVENEMENTS_DEMARRAGE), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="saint-joseph-sjo2-evenements-2026.ics"',
      "Cache-Control": "public, max-age=600",
    },
  });
}
