"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    google?: any;
  }
}

/**
 * Dictionnaire instantané FR -> EN pour les éléments clés de l'interface,
 * complété automatiquement par Google Website Translator pour traduire
 * l'intégralité des articles, événements et futurs contenus de `js/content.js`.
 */
const UI_DICTIONARY: Record<string, string> = {
  "Découvrir": "Discover",
  "Le projet": "The Project",
  "Soutenir": "Support Us",
  "Faire un don": "Donate",
  "Faire un don en ligne": "Donate Online",
  "Donner": "Donate",
  "M'inscrire à la newsletter": "Subscribe to the newsletter",
  "Calendrier des événements": "Events Calendar",
  "Tous les articles": "All Articles",
  "Découvrir le projet": "Discover the Project",
  "En savoir plus": "Learn More",
  "Voir l'avancement": "See Progress",
  "Toutes les façons de soutenir": "All Ways to Support",
  "Voir tout le calendrier →": "View Full Calendar →",
  "Lire le point d'étape complet →": "Read Full Progress Update →",
  "Prochains rendez-vous": "Upcoming Events",
  "Les derniers articles": "Latest Articles",
  "Nos valeurs": "Our Values",
  "L'avancement": "Project Progress",
  "Une dynamique déjà lancée.": "Momentum Already Underway.",
  "Chaque pierre compte.": "Every Stone Counts.",
  "Faites monter le clocher": "Raise the Bell Tower",
  "Faites monter le clocher.": "Raise the Bell Tower.",
  "Le clocher s'élève": "The Bell Tower Rises",
  "Le mur des bâtisseurs": "The Builders' Wall",
  "Un projet immobilier structuré et conçu pour la mission.": "A Structured Building Project Designed for the Mission.",
  "Pour aujourd'hui, pour demain, pour la Mission.": "For Today, for Tomorrow, for the Mission.",
  "Une église et un centre paroissial à bâtir ensemble": "A Church and Parish Center to Build Together",
  "Ensemble, bâtissons l'église Saint Joseph.": "Together, Let's Build Saint Joseph Church.",
  "Chaque pierre posée fait monter le clocher — et rapproche la paroisse de son futur lieu de vie et de prière au Rouret.":
    "Every stone laid raises the bell tower — bringing the parish closer to its future place of life and prayer in Le Rouret.",
  "Réseaux sociaux": "Social Media",
  "Qui sommes-nous": "Who We Are",
  "Contact": "Contact",
  "Nous écrire": "Write to Us",
  "Liens utiles": "Useful Links",
  "Mentions légales": "Legal Notice",
  "Confidentialité": "Privacy Policy",
  "Espace rédaction (Admin)": "Editorial Admin",
  "Bulletin de don papier (à imprimer)": "Printable Donation Form (PDF)",
  "🖨️ Bulletin de don papier (PDF)": "🖨️ Printable Donation Form (PDF)",
  "🖨️ Bulletin de don papier": "🖨️ Printable Donation Form",
  "Virement, chèque, entreprise": "Bank Transfer, Check, Corporate",
  "Partager": "Share",
  "Copier le lien": "Copy Link",
  "Lien copié ✓": "Link Copied ✓",
  "Le Livre d'Or des Bâtisseurs": "The Builders' Guestbook",
  "Pourquoi nous bâtissons l'église Saint-Joseph.": "Why We Are Building Saint Joseph Church.",
  "Concours d'architecture · Automne 2026": "Architectural Competition · Autumn 2026",
  "5 projets finalistes présentés aux paroissiens.": "5 Finalist Projects Presented to Parishioners.",
  "Venir voir les maquettes les 28–29 nov. →": "Come See the Models on Nov 28–29 →",
  "Partager un avis avec l'équipe projet": "Share Feedback with the Project Team",
  "✍️ Laisser un témoignage ou une intention de bâtisseur": "✍️ Leave a Builder's Testimonial or Intention",
};

function setGoogTransCookie(lang: "fr" | "en") {
  if (typeof document === "undefined") return;
  const val = lang === "en" ? "/fr/en" : "/fr/fr";
  document.cookie = `googtrans=${val}; path=/; SameSite=Lax`;
  const host = window.location.hostname;
  if (host && host !== "localhost") {
    document.cookie = `googtrans=${val}; path=/; domain=${host}; SameSite=Lax`;
    document.cookie = `googtrans=${val}; path=/; domain=.${host}; SameSite=Lax`;
  }
}

function applyInstantDictionary(lang: "fr" | "en") {
  if (typeof document === "undefined") return;
  document.documentElement.lang = lang;
  const elements = document.querySelectorAll<HTMLElement>(
    "a, button, h1, h2, h3, h4, span.eyebrow, p.lead, .nav__link, .share__label, .share__btn",
  );
  elements.forEach((el) => {
    if (el.closest(".notranslate")) return;
    if (el.children.length > 0 && !el.classList.contains("nav__link")) return;
    const current = (el.textContent || "").trim();
    if (lang === "en") {
      const orig = el.getAttribute("data-fr-orig") || current;
      if (UI_DICTIONARY[orig]) {
        if (!el.getAttribute("data-fr-orig")) {
          el.setAttribute("data-fr-orig", orig);
        }
        if (el.childNodes.length === 1 && el.childNodes[0].nodeType === Node.TEXT_NODE) {
          el.textContent = UI_DICTIONARY[orig];
        }
      }
    } else {
      const orig = el.getAttribute("data-fr-orig");
      if (orig && el.childNodes.length === 1 && el.childNodes[0].nodeType === Node.TEXT_NODE) {
        el.textContent = orig;
      }
    }
  });
}

function triggerGoogleTranslate(lang: "fr" | "en") {
  setGoogTransCookie(lang);
  const combo = document.querySelector<HTMLSelectElement>("select.goog-te-combo");
  if (combo) {
    combo.value = lang;
    combo.dispatchEvent(new Event("change"));
  }
}

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const [lang, setLang] = useState<"fr" | "en">("fr");

  useEffect(() => {
    // Charge le script Google Website Translator une seule fois en arrière-plan
    if (typeof window !== "undefined" && !document.getElementById("google-translate-script")) {
      window.googleTranslateElementInit = () => {
        if (window.google?.translate?.TranslateElement) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "fr",
              includedLanguages: "fr,en",
              autoDisplay: false,
            },
            "google_translate_element",
          );
        }
      };
      const s = document.createElement("script");
      s.id = "google-translate-script";
      s.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      s.async = true;
      document.body.appendChild(s);
    }

    const saved = (typeof window !== "undefined" && localStorage.getItem("sjo2_lang")) as "fr" | "en" | null;
    const cookieEn = typeof document !== "undefined" && document.cookie.includes("googtrans=/fr/en");
    const initial: "fr" | "en" = saved === "en" || cookieEn ? "en" : "fr";
    setLang(initial);
    if (initial === "en") {
      applyInstantDictionary("en");
      setTimeout(() => triggerGoogleTranslate("en"), 600);
    }
  }, []);

  useEffect(() => {
    if (lang === "en") {
      const t = setTimeout(() => {
        applyInstantDictionary("en");
        triggerGoogleTranslate("en");
      }, 150);
      return () => clearTimeout(t);
    } else {
      applyInstantDictionary("fr");
    }
  }, [pathname, lang]);

  function switchLanguage(nextLang: "fr" | "en") {
    if (nextLang === lang) return;
    setLang(nextLang);
    if (typeof window !== "undefined") {
      localStorage.setItem("sjo2_lang", nextLang);
    }
    applyInstantDictionary(nextLang);
    triggerGoogleTranslate(nextLang);

    // Si l'utilisateur repasse en français après une traduction complète Google Translate,
    // on nettoie le cookie et rafraîchit si le DOM Google Translate est actif.
    if (nextLang === "fr" && document.documentElement.classList.contains("translated-ltr")) {
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.reload();
    }
  }

  return (
    <div className="lang-switch notranslate" role="group" aria-label="Choix de la langue / Language switcher">
      <button
        type="button"
        className={`lang-switch__btn${lang === "fr" ? " active" : ""}`}
        onClick={() => switchLanguage("fr")}
        title="Afficher le site en français"
        aria-pressed={lang === "fr"}
      >
        FR
      </button>
      <button
        type="button"
        className={`lang-switch__btn${lang === "en" ? " active" : ""}`}
        onClick={() => switchLanguage("en")}
        title="Translate website into English"
        aria-pressed={lang === "en"}
      >
        EN
      </button>
      <div id="google_translate_element" style={{ display: "none" }} aria-hidden="true" />
    </div>
  );
}
