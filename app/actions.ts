"use server";

/**
 * Actions serveur des formulaires. Les messages sont transmis à un webhook
 * (Make, Zapier, n8n, Google Apps Script…) défini par variable d'environnement :
 *   CONTACT_WEBHOOK_URL     — formulaire de contact
 *   NEWSLETTER_WEBHOOK_URL  — inscription newsletter
 * Sans webhook configuré, l'action renvoie `code: "not_configured"` et le
 * formulaire affiche les moyens de contact alternatifs.
 */

export type FormState = {
  ok: boolean;
  code?: "sent" | "not_configured" | "invalid" | "error" | "spam";
  message?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

async function post(url: string, payload: Record<string, unknown>): Promise<boolean> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, site: "saint-joseph-sjo2", envoyeLe: new Date().toISOString() }),
      cache: "no-store",
    });
    return res.ok;
  } catch (err) {
    console.error("[forms] webhook injoignable", err);
    return false;
  }
}

export async function sendContact(_prev: FormState, formData: FormData): Promise<FormState> {
  if (String(formData.get("website") ?? "")) return { ok: true, code: "spam" }; // pot de miel
  const nom = String(formData.get("nom") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const sujet = String(formData.get("sujet") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const mission = String(formData.get("mission") ?? "").trim();
  if (!nom || !EMAIL_RE.test(email) || message.length < 10) {
    return { ok: false, code: "invalid", message: "Merci d'indiquer votre nom, un e-mail valide et un message (10 caractères minimum)." };
  }
  const url = process.env.CONTACT_WEBHOOK_URL;
  if (!url) return { ok: false, code: "not_configured" };
  const sent = await post(url, { type: "contact", nom, email, sujet, mission, message });
  return sent ? { ok: true, code: "sent" } : { ok: false, code: "error", message: "L'envoi a échoué. Merci de réessayer dans quelques instants." };
}

export async function subscribeNewsletter(_prev: FormState, formData: FormData): Promise<FormState> {
  if (String(formData.get("website") ?? "")) return { ok: true, code: "spam" };
  const email = String(formData.get("email") ?? "").trim();
  const prenom = String(formData.get("prenom") ?? "").trim();
  const consent = formData.get("consentement") === "on";
  if (!EMAIL_RE.test(email)) return { ok: false, code: "invalid", message: "Merci d'indiquer une adresse e-mail valide." };
  if (!consent) return { ok: false, code: "invalid", message: "Merci d'accepter de recevoir la newsletter." };
  const url = process.env.NEWSLETTER_WEBHOOK_URL;
  if (!url) return { ok: false, code: "not_configured" };
  const sent = await post(url, { type: "newsletter", email, prenom });
  return sent ? { ok: true, code: "sent" } : { ok: false, code: "error", message: "L'inscription a échoué. Merci de réessayer dans quelques instants." };
}
