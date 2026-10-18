import Link from "next/link";
import Image from "next/image";
import type { SiteConfig } from "@/lib/types";
import { SITE, FOOTER_LINKS } from "@/content/site";
import { OpenFeedbackLink } from "./BugFeedbackButton";

const RESEAUX_LABELS: Record<string, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  snapchat: "Snapchat",
  linkedin: "LinkedIn",
  youtube: "YouTube",
  x: "X",
};

function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return isExternal(href) ? (
    <a href={href} target="_blank" rel="noopener">
      {children}
    </a>
  ) : (
    <Link href={href}>{children}</Link>
  );
}

export default function Footer({ config }: { config: SiteConfig }) {
  const year = new Date().getFullYear();
  const reseaux = Object.entries(RESEAUX_LABELS);
  const dons = SITE.contact.donsEtLegs;

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Link href="/" className="brand">
              <Image
                className="brand__logo"
                src="/assets/img/eglise-saint-joseph-batisseurs-du-seigneur.png"
                alt=""
                width={46}
                height={46}
              />
              <span className="brand__text">
                <strong>{SITE.nom}</strong>
                <span>{SITE.sousTitre}</span>
              </span>
            </Link>
            <p>
              Église Saint Joseph &amp; Centre paroissial
              <br />
              {SITE.adresse}
            </p>
            <p className="small">
              Projet porté par la Paroisse Saint-Arnoux et l&apos;Association Diocésaine de Nice. Les dons ouvrent droit à
              un reçu fiscal.
            </p>
          </div>

          <div>
            <h4>Réseaux sociaux</h4>
            <div className="social">
              {reseaux.map(([key, label]) => {
                const url = config.reseaux[key];
                return url ? (
                  <a key={key} href={url} target="_blank" rel="noopener">
                    {label}
                  </a>
                ) : (
                  <a key={key} href="#" aria-disabled="true" tabIndex={-1} title="Bientôt disponible">
                    {label}
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h4>Qui sommes-nous</h4>
            <ul>
              {FOOTER_LINKS.quiSommesNous.map((l) => (
                <li key={l.href}>
                  <FooterLink href={l.href}>{l.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Contact</h4>
            <ul>
              <li>
                <Link href="/contact">Nous écrire</Link>
              </li>
              <li>
                <OpenFeedbackLink label="🐞 Signaler un bug / Feedback" />
              </li>
              {config.emailContact && (
                <li>
                  <a href={`mailto:${config.emailContact}`}>{config.emailContact}</a>
                </li>
              )}
              {config.telephoneContact && (
                <li>
                  <a href={`tel:${config.telephoneContact.replace(/\s/g, "")}`}>{config.telephoneContact}</a>
                </li>
              )}
              <li>
                <span className="small">Dons &amp; legs : {dons.nom}</span>
                <br />
                <a href={`tel:${dons.telephone.replace(/\s/g, "")}`}>{dons.telephone}</a>
                <br />
                <a href={`mailto:${dons.email}`}>{dons.email}</a>
              </li>
            </ul>
          </div>

          <div>
            <h4>Liens utiles</h4>
            <ul>
              <li>
                <a href={config.urlDon} target="_blank" rel="noopener">
                  Faire un don
                </a>
              </li>
              {FOOTER_LINKS.liensUtiles.map((l) => (
                <li key={l.href}>
                  <FooterLink href={l.href}>{l.label}</FooterLink>
                </li>
              ))}
              <li>
                <Link href="/mentions-legales">Mentions légales</Link>
              </li>
              <li>
                <Link href="/confidentialite">Confidentialité</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>
            © {year} Paroisse Saint-Arnoux · Association Diocésaine de Nice
          </span>
          <span className="footer__devise">{SITE.devise}</span>
          <a className="footer__diocese" href={SITE.liens.diocese} target="_blank" rel="noopener">
            <Image src="/assets/img/diocese-de-nice.png" alt="Diocèse de Nice" width={120} height={44} />
          </a>
        </div>
      </div>
    </footer>
  );
}
