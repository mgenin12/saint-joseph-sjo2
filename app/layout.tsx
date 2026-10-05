import type { Metadata, Viewport } from "next";
import { Fraunces, Hanken_Grotesk } from "next/font/google";
import "@/styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CtaBand from "@/components/CtaBand";
import RevealObserver from "@/components/RevealObserver";
import { getSiteConfig, siteUrl } from "@/lib/config";
import { slugify } from "@/lib/text";
import { MENU_PROJET } from "@/content/site";
import { SITE_NAME, SITE_TITLE, SITE_DESCRIPTION, DEFAULT_OG_IMAGE, DEFAULT_OG_ALT, churchJsonLd } from "@/lib/seo";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  style: ["normal", "italic"],
});

const body = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: SITE_TITLE, template: `%s · ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  applicationName: "Projet SJO2",
  keywords: ["église Saint Joseph", "Le Rouret", "Paroisse Saint-Arnoux", "centre paroissial", "don", "Diocèse de Nice", "SJO2"],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: DEFAULT_OG_ALT }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  icons: { icon: "/assets/img/eglise-saint-joseph-batisseurs-du-seigneur.png" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#00204e",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const config = await getSiteConfig();
  const menu = MENU_PROJET.map((nom) => ({ nom, slug: slugify(nom) }));
  const jsonLd = churchJsonLd(config.urlDon);

  return (
    <html lang="fr" className={`${display.variable} ${body.variable}`}>
      <body>
        <a className="skip-link" href="#contenu">
          Aller au contenu
        </a>
        <Header urlDon={config.urlDon} categories={menu} />
        <main id="contenu">{children}</main>
        <CtaBand urlDon={config.urlDon} />
        <Footer config={config} />
        <RevealObserver />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
