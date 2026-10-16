import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Clocher from "@/components/Clocher";
import Wall from "@/components/Wall";
import Simulator from "@/components/Simulator";
import Faq from "@/components/Faq";
import { SITE } from "@/content/site";
import { computeClocher, getSiteConfig, CLOCHER_METRES } from "@/lib/config";
import { formatEuros, formatNumber } from "@/lib/text";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 600;

export const metadata: Metadata = pageMetadata({
  title: "Soutenir — Faites monter le clocher",
  description:
    "1 pierre = 10 €, 1 mur = 100 pierres : aidez le clocher de l'église Saint Joseph à atteindre ses 22 mètres. Don en ligne, virement, chèque, mécénat d'entreprise ; réduction d'impôt de 66 %.",
  path: "/soutenir",
});

export default async function SoutenirPage() {
  const config = await getSiteConfig();
  const data = computeClocher(config.montantCollecte, config.objectif);
  const v = SITE.don.virement;

  return (
    <>
      <section className="page-head">
        <div className="container">
          <span className="eyebrow">Soutenir</span>
          <h1>Faites monter le clocher.</h1>
          <p className="lead">
            Le clocher de l&apos;église Saint Joseph culminera à {CLOCHER_METRES} mètres. Chaque don le fait grandir : 1 pierre = 10 €, 1 mur = 100 pierres,
            1 mètre de clocher ≈ {formatEuros(data.eurosParMetre)}. Déjà {formatEuros(data.montant)} réunis (terrain inclus) : {data.hauteurM.toLocaleString("fr-FR")} m sur{" "}
            {CLOCHER_METRES}.
          </p>
          <div className="row">
            <a className="btn btn--gold btn--lg" href={config.urlDon} target="_blank" rel="noopener">
              Faire un don en ligne
            </a>
            <a className="btn btn--outline" href="#autres-moyens">
              Virement, chèque, entreprise
            </a>
          </div>
        </div>
      </section>

      {/* ---------- Clocher + mur ---------- */}
      <section className="section section--navy" aria-labelledby="collecte-title">
        <div className="container">
          <h2 id="collecte-title" className="sr-only">
            État de la collecte
          </h2>
          <div className="collecte-layout">
            <div className="panel reveal">
              <h3>Le clocher s&apos;élève</h3>
              <p className="panel__sub">
                {CLOCHER_METRES} m = {formatEuros(data.objectif)} · 1 m ≈ {formatEuros(data.eurosParMetre)} · 1 cm ≈ {formatEuros(data.eurosParCm)}
              </p>
              <Clocher data={data} />
            </div>
            <div className="panel reveal">
              <h3>Le mur des bâtisseurs</h3>
              <p className="panel__sub">
                {formatNumber(data.pierres)} pierres posées · {formatNumber(data.murs)} murs sur {formatNumber(data.mursObjectif)}
              </p>
              <Wall data={data} />
              <div className="qr">
                <Image src={v.qr} alt="QR code vers la plateforme de don du Diocèse de Nice" width={92} height={92} />
                <small>
                  Scannez pour donner depuis votre téléphone — plateforme sécurisée du Diocèse de Nice, reçu fiscal automatique.
                </small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Paliers ---------- */}
      <section className="section" aria-labelledby="paliers-title">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Les paliers</span>
            <h2 id="paliers-title">De la première pierre au sommet du clocher.</h2>
            <p className="lead">Quel que soit son montant, votre don a une place dans l&apos;édifice.</p>
          </div>
          <div className="tiers">
            {SITE.don.paliers.map((p) => (
              <div key={p.nom} className="tier reveal">
                <b>{p.nom}</b>
                <span className="amount">{p.montant > 0 ? formatEuros(p.montant) : "Ensemble"}</span>
                <p>{p.texte}</p>
                {p.montant > 0 ? (
                  <a className="btn btn--navy btn--sm" href={config.urlDon} target="_blank" rel="noopener">
                    Donner {formatEuros(p.montant)}
                  </a>
                ) : (
                  <a className="btn btn--gold btn--sm" href={config.urlDon} target="_blank" rel="noopener">
                    Donner
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Simulateur ---------- */}
      <section className="section section--alt" aria-labelledby="sim-title">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Mon don en pierres</span>
            <h2 id="sim-title">Combien de pierres, combien de centimètres ?</h2>
            <p className="lead">Et surtout : combien votre don vous coûte réellement après réduction d&apos;impôt.</p>
          </div>
          <Simulator urlDon={config.urlDon} eurosParCm={data.eurosParCm} eurosParMetre={data.eurosParMetre} />
        </div>
      </section>

      {/* ---------- Autres moyens ---------- */}
      <section id="autres-moyens" className="section section--white" aria-labelledby="moyens-title">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Autres moyens de donner</span>
            <h2 id="moyens-title">Virement, chèque, mécénat, legs.</h2>
            <p className="lead">Chaque don, quel que soit le canal, donne lieu à un reçu fiscal.</p>
          </div>
          <div className="bank">
            <div className="card reveal">
              <h3>Par virement</h3>
              <dl>
                <dt>Bénéficiaire</dt>
                <dd>{v.beneficiaire}</dd>
                <dt>IBAN</dt>
                <dd>{v.iban}</dd>
                <dt>BIC</dt>
                <dd>{v.bic}</dd>
                <dt>Banque</dt>
                <dd>{v.banque}</dd>
                <dt>Libellé</dt>
                <dd>{v.objet}</dd>
              </dl>
              <p className="small muted mt-2">Indiquez « {v.objet} » en libellé pour que votre don soit affecté au projet.</p>
            </div>
            <div className="card reveal">
              <h3>Par chèque</h3>
              <p>
                À l&apos;ordre de <b>{SITE.don.cheque.ordre}</b>, {SITE.don.cheque.mention}, à déposer à l&apos;accueil de la paroisse ou à envoyer à :
              </p>
              <p>
                Paroisse Saint-Arnoux
                <br />
                {SITE.adresse}
              </p>
              <h3 className="mt-4">Legs, donations, assurance-vie</h3>
              <p>
                {SITE.contact.donsEtLegs.nom} vous accompagne en toute confidentialité :{" "}
                <a href={`tel:${SITE.contact.donsEtLegs.telephone.replace(/\s/g, "")}`}>{SITE.contact.donsEtLegs.telephone}</a> ·{" "}
                <a href={`mailto:${SITE.contact.donsEtLegs.email}`}>{SITE.contact.donsEtLegs.email}</a>
              </p>
            </div>
          </div>

          <div className="grid grid-2 mt-6">
            <div className="card reveal">
              <span className="eyebrow">Particuliers · 66 %</span>
              <p>{SITE.don.fiscalite.particuliers}</p>
            </div>
            <div className="card reveal">
              <span className="eyebrow">Entreprises · 60 %</span>
              <p>{SITE.don.fiscalite.entreprises}</p>
              <p className="small muted">
                Mécénat d&apos;entreprise : contactez-nous pour une convention et une visibilité adaptée.{" "}
                <Link href="/contact?sujet=don">Nous écrire</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- S'engager autrement ---------- */}
      <section className="section" aria-labelledby="engage-title">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">S&apos;engager</span>
            <h2 id="engage-title">Quatre façons de bâtir avec nous.</h2>
          </div>
          <div className="engage">
            {SITE.don.engagements.map((e) => (
              <div key={e.nom} className="reveal">
                <b>{e.nom}</b>
                <p>{e.texte}</p>
              </div>
            ))}
          </div>
          <div className="row mt-4">
            <Link className="btn btn--navy" href="/articles/rejoindre-les-benevoles">
              Voir les missions bénévoles
            </Link>
            <Link className="btn btn--outline" href="/newsletter">
              Recevoir la newsletter
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--alt section--tight" aria-labelledby="faq-title">
        <div className="container narrow">
          <div className="section-head">
            <span className="eyebrow">Questions fréquentes</span>
            <h2 id="faq-title">Vos questions sur le don</h2>
          </div>
          <Faq items={SITE.faq} />
          <p className="mt-2">
            <Link href="/articles/questions-frequentes">Toutes les questions fréquentes →</Link>
          </p>
        </div>
      </section>
    </>
  );
}
