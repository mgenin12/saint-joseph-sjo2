import { NextResponse } from "next/server";

const GITHUB_REPO = process.env.GITHUB_REPO || "mgenin12/saint-joseph-sjo2";
const SCREENSHOT_BRANCH = "feedback-screenshots";
const FEEDBACK_EMAIL = "max.ac.genin@gmail.com";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      type?: string;
      nom?: string;
      email?: string;
      message?: string;
      pageUrl?: string;
      viewport?: string;
      screenshotDataUrl?: string;
    };

    const type = (body.type || "Bug / Problème").trim();
    const nom = (body.nom || "Anonyme").trim();
    const email = (body.email || "").trim();
    const message = (body.message || "").trim();
    const pageUrl = (body.pageUrl || "https://saint-joseph-sjo2.vercel.app").trim();
    const viewport = (body.viewport || "").trim();

    if (!message) {
      return NextResponse.json(
        { ok: false, error: "Merci de décrire le problème ou votre remarque." },
        { status: 400 },
      );
    }

    let screenshotUrl = "";
    const token = (process.env.GITHUB_TOKEN || "").trim();

    if (body.screenshotDataUrl && token) {
      const base64Clean = body.screenshotDataUrl.replace(/^data:image\/[a-zA-Z0-9+.-]+;base64,/, "");
      const fileName = `feedback-${Date.now()}.jpg`;
      const repoPath = `screenshots/${fileName}`;
      const apiUrl = `https://api.github.com/repos/${GITHUB_REPO}/contents/${repoPath}`;

      try {
        const putRes = await fetch(apiUrl, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: `Screenshot Bug & Feedback (${pageUrl})`,
            content: base64Clean,
            branch: SCREENSHOT_BRANCH,
          }),
        });

        if (putRes.ok) {
          screenshotUrl = `https://raw.githubusercontent.com/${GITHUB_REPO}/${SCREENSHOT_BRANCH}/${repoPath}`;
        }
      } catch (err) {
        console.error("[feedback] Erreur lors de l'enregistrement du screenshot", err);
      }
    }

    // Envoi serveur de secours vers FormSubmit (max.ac.genin@gmail.com)
    let serverEmailSent = false;
    try {
      const mailRes = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(FEEDBACK_EMAIL)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Origin: "https://saint-joseph-sjo2.vercel.app",
          Referer: pageUrl,
        },
        body: JSON.stringify({
          _subject: `[Site SJO2 — Bug & Feedback] ${type} (${pageUrl})`,
          ...(email ? { _replyto: email } : {}),
          _template: "table",
          _captcha: "false",
          Type: type,
          "Page concernée": pageUrl,
          "Nom / Prénom": nom || "Anonyme",
          "E-mail": email || "Non renseigné",
          Description: message,
          "Capture d'écran": screenshotUrl || (body.screenshotDataUrl ? "Jointe au rapport" : "Aucune capture"),
          "Écran / Navigateur": viewport || "—",
        }),
        cache: "no-store",
      });
      serverEmailSent = mailRes.ok;
    } catch {
      // Le navigateur envoie également directement à FormSubmit
    }

    return NextResponse.json({
      ok: true,
      screenshotUrl,
      serverEmailSent,
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Erreur serveur" },
      { status: 500 },
    );
  }
}
