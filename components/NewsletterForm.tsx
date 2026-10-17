"use client";

import { useState, type FormEvent } from "react";
import { subscribeNewsletter, type FormState } from "@/app/actions";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const initial: FormState = { ok: false };

type Props = { externalUrl?: string; facebookUrl?: string; emailFallback?: string };

export default function NewsletterForm({ externalUrl, facebookUrl, emailFallback }: Props) {
  const [state, setState] = useState<FormState>(initial);
  const [pending, setPending] = useState(false);

  const destEmail = emailFallback || "secretariat@saint-arnoux.fr";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (String(formData.get("website") ?? "")) {
      setState({ ok: true, code: "spam" });
      return;
    }

    const email = String(formData.get("email") ?? "").trim();
    const prenom = String(formData.get("prenom") ?? "").trim();
    const consent = formData.get("consentement") === "on";

    if (!EMAIL_RE.test(email)) {
      setState({ ok: false, code: "invalid", message: "Merci d'indiquer une adresse e-mail valide." });
      return;
    }
    if (!consent) {
      setState({ ok: false, code: "invalid", message: "Merci d'accepter de recevoir la newsletter." });
      return;
    }

    setPending(true);
    setState(initial);

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(destEmail)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: `[Site SJO2 — Newsletter] Nouvelle inscription (${email})`,
          _replyto: email,
          _template: "table",
          _captcha: "false",
          Prénom: prenom || "—",
          "E-mail": email,
          Consentement: "Oui",
        }),
      });
      if (res.ok) {
        setState({ ok: true, code: "sent" });
        setPending(false);
        return;
      }
    } catch {
      // Repli sur l'action serveur
    }

    const serverResult = await subscribeNewsletter(initial, formData);
    setState(serverResult);
    setPending(false);
  }

  if (state.ok && state.code !== "spam") {
    return (
      <div className="notice notice--ok" role="status">
        <b>Merci !</b> Votre inscription est enregistrée et transmise à <b>{destEmail}</b>. À bientôt dans votre boîte mail.
      </div>
    );
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <div className="field">
          <label htmlFor="n-prenom">Prénom</label>
          <input id="n-prenom" name="prenom" className="input" autoComplete="given-name" />
        </div>
        <div className="field">
          <label htmlFor="n-email">E-mail *</label>
          <input id="n-email" name="email" type="email" className="input" required autoComplete="email" />
        </div>
      </div>
      <label className="checkbox">
        <input type="checkbox" name="consentement" required />
        <span>
          J&apos;accepte de recevoir la newsletter du projet Saint Joseph (environ un envoi par mois). Je peux me désinscrire à tout moment
          via le lien présent dans chaque e-mail.
        </span>
      </label>
      <label className="hp" aria-hidden="true">
        Ne pas remplir
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>

      {(state.code === "invalid" || state.code === "error") && (
        <div className="notice notice--err" role="alert">
          {state.message}
        </div>
      )}
      {state.code === "not_configured" && (
        <div className="notice notice--info" role="alert">
          <b>L&apos;inscription en ligne n&apos;est pas encore activée.</b>{" "}
          {externalUrl ? (
            <>
              Inscrivez-vous via{" "}
              <a href={externalUrl} target="_blank" rel="noopener">
                ce formulaire
              </a>
              .
            </>
          ) : (
            <>
              En attendant, suivez les nouvelles du projet
              {facebookUrl && (
                <>
                  {" "}
                  sur la{" "}
                  <a href={facebookUrl} target="_blank" rel="noopener">
                    page Facebook de la paroisse
                  </a>
                </>
              )}
              {emailFallback && (
                <>
                  {" "}
                  ou écrivez-nous à <a href={`mailto:${emailFallback}`}>{emailFallback}</a>
                </>
              )}
              .
            </>
          )}
        </div>
      )}

      <div>
        <button type="submit" className="btn btn--gold btn--lg" disabled={pending}>
          {pending ? "Inscription…" : "M'inscrire"}
        </button>
      </div>
    </form>
  );
}
