"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Ancres de l'ancien site (v1 monopage) → nouvelles pages. */
const MAP: Record<string, string> = {
  "#budget": "/articles/budget-equipe-et-questions-frequentes",
  "#equipe": "/articles/qui-est-bao-dinh",
  "#equipes": "/articles/qui-est-bao-dinh",
  "#faq": "/articles/budget-equipe-et-questions-frequentes",
  "#recrutement": "/articles/budget-equipe-et-questions-frequentes",
  "#rejoindre": "/articles/budget-equipe-et-questions-frequentes",
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
