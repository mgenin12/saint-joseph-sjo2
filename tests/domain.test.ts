import { describe, it, expect } from "vitest";
import { toIsoDate, formatDateLong, formatDateFull, monthOrCurrent, formatHeure } from "@/lib/dates";
import { computeClocher, coutReel, CLOCHER_METRES } from "@/lib/collecte";
import { splitBlocks, usesBlock } from "@/lib/blocks";
import { buildEvents } from "@/lib/events";
import { eventToIcs, googleCalendarUrl, parseIcsEvents, googleCalendarSubscribeUrl } from "@/lib/ics";
import { rowsToObjects } from "@/lib/sheets";

describe("dates", () => {
  it("convertit les formats du Sheet en ISO", () => {
    expect(toIsoDate("20/09/2026")).toBe("2026-09-20");
    expect(toIsoDate("7/5/2026")).toBe("2026-05-07");
    expect(toIsoDate("2026-09-20")).toBe("2026-09-20");
    expect(toIsoDate("2026-09-20T10:00:00Z")).toBe("2026-09-20");
    expect(toIsoDate("31/02/2026")).toBeUndefined();
    expect(toIsoDate("septembre 2026")).toBeUndefined();
    expect(toIsoDate("")).toBeUndefined();
  });
  it("formate en français", () => {
    expect(formatDateLong("2026-09-20")).toBe("20 septembre 2026");
    expect(formatDateFull("2026-09-20")).toBe("dimanche 20 septembre 2026");
    expect(formatHeure("10:30")).toBe("10h30");
    expect(formatHeure("18h00")).toBe("18h");
  });
  it("valide un mois AAAA-MM", () => {
    expect(monthOrCurrent("2026-05")).toBe("2026-05");
    expect(monthOrCurrent("2026-13")).toMatch(/^\d{4}-\d{2}$/);
  });
});

describe("clocher de 22 m", () => {
  const c = computeClocher(1_400_000, 6_000_000);
  it("convertit les euros en mètres, pierres et murs", () => {
    expect(CLOCHER_METRES).toBe(22);
    expect(c.pct).toBe(23);
    expect(c.hauteurM).toBe(5.13);
    expect(c.pierres).toBe(140_000);
    expect(c.murs).toBe(1_400);
    expect(c.eurosParMetre).toBe(272_727);
    expect(c.eurosParCm).toBe(2_727);
    expect(c.pierresObjectif).toBe(600_000);
    expect(c.mursObjectif).toBe(6_000);
    expect(c.reste).toBe(4_600_000);
  });
  it("borne la progression entre 0 et 100 %", () => {
    expect(computeClocher(9_000_000, 6_000_000).pct).toBe(100);
    expect(computeClocher(-5, 6_000_000).pct).toBe(0);
    expect(computeClocher(10, 0).ratio).toBeLessThanOrEqual(1);
  });
  it("calcule le coût réel après réduction d'impôt", () => {
    expect(coutReel(200, "particulier")).toBe(68);
    expect(coutReel(500, "entreprise")).toBe(200);
  });
});

describe("blocs dynamiques", () => {
  it("découpe le Markdown autour des jetons [[…]]", () => {
    const seg = splitBlocks("Intro\n\n[[budget]]\n\nSuite [[inconnu]] texte\n[[FAQ]]");
    expect(seg).toEqual([
      { type: "markdown", value: "Intro" },
      { type: "block", name: "budget" },
      { type: "markdown", value: "Suite [[inconnu]] texte" },
      { type: "block", name: "faq" },
    ]);
    expect(usesBlock("[[equipe]]", "equipe")).toBe(true);
    expect(usesBlock("texte", "equipe")).toBe(false);
  });
});

describe("événements", () => {
  const rows = rowsToObjects([
    ["Titre", "Date", "Heure début", "Lieu", "Catégorie", "Description", "Lien inscription", "Places", "Inscrits", "Publié"],
    ["Messe sur le terrain", "20/09/2026", "10:30", "Le Rouret", "Messe", "Avec Mgr Nault", "https://forms.gle/x", "300", "120", "oui"],
    ["Brouillon", "01/01/2027", "", "", "", "", "", "", "", "non"],
    ["Sans date", "", "", "", "", "", "", "", "", ""],
  ]);
  const events = buildEvents(rows);
  it("construit les événements depuis l'onglet", () => {
    expect(events).toHaveLength(2);
    expect(events[0]).toMatchObject({ slug: "2026-09-20-messe-sur-le-terrain", date: "2026-09-20", heureDebut: "10:30", places: 300, inscrits: 120, publie: true });
    expect(events[1].publie).toBe(false);
  });
  it("génère un .ics et un lien Google Agenda", () => {
    const ics = eventToIcs(events[0]);
    expect(ics).toContain("BEGIN:VEVENT");
    expect(ics).toContain("DTSTART;TZID=Europe/Paris:20260920T103000");
    expect(ics).toContain("SUMMARY:Messe sur le terrain");
    expect(googleCalendarUrl(events[0])).toContain("dates=20260920T103000%2F20260920T113000");
  });
  it("parse un flux iCal (.ics) Google Agenda", () => {
    const sampleIcs = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "BEGIN:VEVENT",
      "DTSTART:20261115T093000Z",
      "DTEND:20261115T110000Z",
      "SUMMARY:[Célébration] Messe des Bâtisseurs",
      "LOCATION:Terrain du Rouret",
      "DESCRIPTION:Venez nombreux !\\nInscription : https://forms.gle/batisseurs\\nPlaces : 200",
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "BEGIN:VEVENT",
      "DTSTART;VALUE=DATE:20261201",
      "DTEND;VALUE=DATE:20261204",
      "SUMMARY:Exposition du projet",
      "DESCRIPTION:Ouvert à tous https://helloasso.com/sjo2",
      "END:VEVENT",
      "BEGIN:VEVENT",
      "DTSTART;VALUE=DATE:20261210",
      "SUMMARY:Événement annulé",
      "STATUS:CANCELLED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const parsed = parseIcsEvents(sampleIcs);
    expect(parsed).toHaveLength(2);
    expect(parsed[0]).toMatchObject({
      slug: "2026-11-15-messe-des-batisseurs",
      titre: "Messe des Bâtisseurs",
      categorie: "Célébration",
      date: "2026-11-15",
      heureDebut: "10:30",
      heureFin: "12:00",
      lieu: "Terrain du Rouret",
      description: "Venez nombreux !",
      lienInscription: "https://forms.gle/batisseurs",
      places: 200,
    });
    expect(parsed[1]).toMatchObject({
      slug: "2026-12-01-exposition-du-projet",
      date: "2026-12-01",
      dateFin: "2026-12-03",
      lienInscription: "https://helloasso.com/sjo2",
    });
    expect(googleCalendarSubscribeUrl("9f2cb93155d97884909c3bcb4fb4c887a2659636e5c6059d68c6e43ad0b842e5@group.calendar.google.com")).toBe(
      "https://calendar.google.com/calendar/r?cid=OWYyY2I5MzE1NWQ5Nzg4NDkwOWMzYmNiNGZiNGM4ODdhMjY1OTYzNmU1YzYwNTlkNjhjNmU0M2FkMGI4NDJlNUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t",
    );
  });
});
