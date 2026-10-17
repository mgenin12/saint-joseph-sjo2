import type { Metadata } from "next";
import Link from "next/link";
import AdminEditor from "@/components/AdminEditor";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Espace rédaction (Administration)",
  description: "Interface protégée par mot de passe pour mettre à jour les articles, les événements (photos et vidéos) et la collecte du site Saint-Joseph SJO2.",
  path: "/admin",
  noindex: true,
});

export default function AdminPage() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <ol className="breadcrumb" aria-label="Fil d'Ariane">
            <li>
              <Link href="/">Accueil</Link>
            </li>
            <li>Espace rédaction</li>
          </ol>
          <span className="eyebrow">Administration · Paroisse Saint-Arnoux</span>
          <h1>Gestion du contenu du site</h1>
          <p className="lead">
            Ajoutez ou modifiez les articles, les événements du calendrier (avec galeries photos et vidéos YouTube/Drive) et le compteur du clocher.
          </p>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <AdminEditor />
        </div>
      </section>
    </>
  );
}
