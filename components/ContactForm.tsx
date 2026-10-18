"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { sendContact, type FormState } from "@/app/actions";

const SUJETS = [
  { value: "information", label: "Demande d'information" },
  { value: "don", label: "Don, legs ou mécénat" },
  { value: "concours-architectes", label: "Concours d'architectes & consultation des 28–29 nov." },
  { value: "temoignage", label: "Livre d'Or — Partager un témoignage de bâtisseur" },
  { value: "benevolat", label: "Proposer mon aide (bénévolat)" },
  { value: "presse", label: "Presse & partenariats" },
  { value: "autre", label: "Autre" },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Props = { sujet?: string; mission?: string; emailFallback?: string; facebookUrl?: string; donsContact: { nom: string; telephone: string; email: string } };

const initial: FormState = { ok: false };

export default function ContactForm({ sujet, mission, emailFallback, facebookUrl, donsContact }: Props) {
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

    const nom = String(formData.get("nom") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const sujetVal = String(formData.get("sujet") ?? "information").trim();
    const sujetLabel = SUJETS.find((s) => s.value === sujetVal)?.label ?? sujetVal;
    const missionVal = String(formData.get("mission") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    if (!nom || !EMAIL_RE.test(email) || message.length < 10) {
      setState({
        ok: false,
        code: "invalid",
        message: "Merci d'indiquer votre nom, un e-mail valide et un message (10 caractères minimum).",
      });
      return;
    }

    setPending(true);
    setState(initial);

    try {
      // Envoi direct depuis la page vers secretariat@saint-arnoux.fr (FormSubmit AJAX)
      const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(destEmail)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: `[Site SJO2 — Contact] ${sujetLabel} — ${nom}`,
          _replyto: email,
          _template: "table",
          _captcha: "false",
          "Nom et prénom": nom,
          "E-mail": email,
          Sujet: sujetLabel,
          "Mission bénévole": missionVal || "—",
          Message: message,
        }),
      });

      if (res.ok) {
        setState({ ok: true, code: "sent" });
        setPending(false);
        return;
      }
    } catch {
      // Repli sur l'action serveur si l'appel navigateur est bloqué
    }

    const serverResult = await sendContact(initial, formData);
    setState(serverResult);
    setPending(false);
  }

  if (state.ok && state.code !== "spam") {
    return (
      <div className="notice notice--ok" role="status">
        <b>Merci !</b> Votre message a bien été envoyé à <b>{destEmail}</b>. Nous vous répondrons dès que possible.
      </div>
    );
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <div className="field">
          <label htmlFor="c-nom">Nom et prénom *</label>
          <input id="c-nom" name="nom" className="input" required autoComplete="name" />
        </div>
        <div className="field">
          <label htmlFor="c-email">E-mail *</label>
          <input id="c-email" name="email" type="email" className="input" required autoComplete="email" />
        </div>
      </div>
      <div className="form-row">
        <div className="field">
          <label htmlFor="c-sujet">Sujet</label>
          <select id="c-sujet" name="sujet" className="select" defaultValue={SUJETS.some((s) => s.value === sujet) ? sujet : "information"}>
            {SUJETS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="c-mission">Mission bénévole (facultatif)</label>
          <input id="c-mission" name="mission" className="input" defaultValue={mission ?? ""} placeholder="ex. Community manager" />
        </div>
      </div>
      <div className="field">
        <label htmlFor="c-message">Message *</label>
        <textarea id="c-message" name="message" className="textarea" required minLength={10} />
      </div>
      <label className="hp" aria-hidden="true">
        Ne pas remplir
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <p className="small muted" style={{ margin: 0 }}>
        Votre message est transmis directement à <b>{destEmail}</b>. Vos données servent uniquement à traiter votre demande (voir la{" "}
        <Link href="/confidentialite">politique de confidentialité</Link>).
      </p>

      {state.code === "invalid" && (
        <div className="notice notice--err" role="alert">
          {state.message}
        </div>
      )}
      {state.code === "error" && (
        <div className="notice notice--err" role="alert">
          {state.message} Vous pouvez aussi nous écrire directement à{" "}
          <a href={`mailto:${destEmail}`}>{destEmail}</a>
          {facebookUrl && (
            <>
              {" "}
              ou via la{" "}
              <a href={facebookUrl} target="_blank" rel="noopener">
                page Facebook de la paroisse
              </a>
            </>
          )}
          .
        </div>
      )}
      {state.code === "not_configured" && (
        <div className="notice notice--info" role="alert">
          Contactez-nous directement :{" "}
          {emailFallback ? (
            <a href={`mailto:${emailFallback}`}>{emailFallback}</a>
          ) : (
            <>
              pour les dons et legs, {donsContact.nom} — <a href={`tel:${donsContact.telephone.replace(/\s/g, "")}`}>{donsContact.telephone}</a> ·{" "}
              <a href={`mailto:${donsContact.email}`}>{donsContact.email}</a>
            </>
          )}
          .
        </div>
      )}

      <div>
        <button type="submit" className="btn btn--gold btn--lg" disabled={pending}>
          {pending ? "Envoi…" : "Envoyer"}
        </button>
      </div>
    </form>
  );
}
