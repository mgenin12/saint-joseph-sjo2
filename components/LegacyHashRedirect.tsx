"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Ancres de l'ancien site (v1 monopage) → nouvelles pages. */
const MAP: Record<string, string> = {
  "#budget": "/articles/budget",
  "#equipe": "/articles/qui-sommes-nous",
  "#equipes": "/articles/qui-sommes-nous",
  "#faq": "/articles/questions-frequentes",
  "#recrutement": "/articles/rejoindre-les-benevoles",
  "#rejoindre": "/articles/rejoindre-les-benevoles",
  "#don": "/soutenir",
  "#collecte": "/soutenir",
  "#soutenir": "/soutenir",
  "#calendrier": "/calendrier",
  "#agenda": "/calendrier",
  "#contact": "/contact",
  "#parrains": "/",
  "#archi": "/",
  "#architecture": "/articles?categorie=architecture",
  "#projet": "/#decouvrir",
};

export default function LegacyHashRedirect() {
  const router = useRouter();
  useEffect(() => {
    const hash = window.location.hash.toLowerCase();
    const target = MAP[hash];
    if (target && target !== "/") router.replace(target);
  }, [router]);
  return null;
}
