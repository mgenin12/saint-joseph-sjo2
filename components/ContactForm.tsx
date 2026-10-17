"use client";

import Link from "next/link";
import { useActionState } from "react";
import { sendContact, type FormState } from "@/app/actions";

const SUJETS = [
  { value: "information", label: "Demande d'information" },
  { value: "don", label: "Don, legs ou mécénat" },
  { value: "benevolat", label: "Proposer mon aide (bénévolat)" },
  { value: "presse", label: "Presse & partenariats" },
  { value: "autre", label: "Autre" },
];

type Props = { sujet?: string; mission?: string; emailFallback?: string; facebookUrl?: string; donsContact: { nom: string; telephone: string; email: string } };

const initial: FormState = { ok: false };

export default function ContactForm({ sujet, mission, emailFallback, facebookUrl, donsContact }: Props) {
  const [state, action, pending] = useActionState(sendContact, initial);

  if (state.ok && state.code !== "spam") {
    return (
      <div className="notice notice--ok" role="status">
        <b>Merci !</b> Votre message a bien été envoyé. Nous vous répondrons dès que possible.
      </div>
    );
  }

  return (
    <form className="form" action={action} noValidate>
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
        Vos données servent uniquement à traiter votre demande (voir la <Link href="/confidentialite">politique de confidentialité</Link>).
      </p>

      {state.code === "invalid" && (
        <div className="notice notice--err" role="alert">
          {state.message}
        </div>
      )}
      {state.code === "error" && (
        <div className="notice notice--err" role="alert">
          {state.message}
        </div>
      )}
      {state.code === "not_configured" && (
        <div className="notice notice--info" role="alert">
          <b>L&apos;envoi en ligne n&apos;est pas encore activé.</b> En attendant, contactez-nous directement :{" "}
          {emailFallback ? (
            <a href={`mailto:${emailFallback}`}>{emailFallback}</a>
          ) : (
            <>
              pour les dons et legs, {donsContact.nom} — <a href={`tel:${donsContact.telephone.replace(/\s/g, "")}`}>{donsContact.telephone}</a> ·{" "}
              <a href={`mailto:${donsContact.email}`}>{donsContact.email}</a>
            </>
          )}
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

      <div>
        <button type="submit" className="btn btn--gold btn--lg" disabled={pending}>
          {pending ? "Envoi…" : "Envoyer"}
        </button>
      </div>
    </form>
  );
}
