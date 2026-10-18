import { NextResponse } from "next/server";
import {
  SITE,
  MENU_PROJET,
  FOOTER_LINKS,
  ARTICLES,
  EVENEMENTS,
  CALENDRIER_GOOGLE,
} from "@/content/site";

const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "SJO2-Batisseurs-2026";
const GITHUB_REPO = process.env.GITHUB_REPO || "mgenin12/saint-joseph-sjo2";
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || "main";

function checkPassword(pw: string | undefined): boolean {
  if (!pw) return false;
  return pw.trim() === DEFAULT_ADMIN_PASSWORD.trim();
}

function serializeContentJs(payload: {
  site: typeof SITE;
  menuProjet: typeof MENU_PROJET;
  footerLinks: typeof FOOTER_LINKS;
  articles: typeof ARTICLES;
  evenements: typeof EVENEMENTS;
  calendrierGoogle: typeof CALENDRIER_GOOGLE;
}): string {
  return `/* ============================================================================
   FICHIER UNIQUE DE CONTENU DU SITE — PROJET SJO2 (ÉGLISE SAINT-JOSEPH · LE ROURET)
   ============================================================================
   Tout le contenu du site (textes, chiffres de la collecte, articles,
   événements du calendrier, galeries photos/vidéos, concours d'architectes
   et témoignages) se modifie ici ou depuis l'interface visuelle /admin.
   ============================================================================ */

export const SITE = ${JSON.stringify(payload.site, null, 2)};

export const MENU_PROJET = ${JSON.stringify(payload.menuProjet, null, 2)};

export const FOOTER_LINKS = ${JSON.stringify(payload.footerLinks, null, 2)};

export const ARTICLES = ${JSON.stringify(payload.articles, null, 2)};

export const CALENDRIER_GOOGLE = ${JSON.stringify(payload.calendrierGoogle, null, 2)};

export const EVENEMENTS = ${JSON.stringify(payload.evenements, null, 2)};
`;
}

async function commitFileToGitHub(opts: {
  token: string;
  path: string;
  contentBase64: string;
  message: string;
}): Promise<{ ok: boolean; commitUrl?: string; error?: string }> {
  const apiUrl = `https://api.github.com/repos/${GITHUB_REPO}/contents/${opts.path}`;
  const headers: Record<string, string> = {
    Authorization: `Bearer ${opts.token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "Content-Type": "application/json",
  };

  let sha: string | undefined;
  const getRes = await fetch(`${apiUrl}?ref=${encodeURIComponent(GITHUB_BRANCH)}`, {
    headers,
    cache: "no-store",
  });
  if (getRes.ok) {
    const existing = (await getRes.json()) as { sha?: string };
    sha = existing.sha;
  }

  const putRes = await fetch(apiUrl, {
    method: "PUT",
    headers,
    body: JSON.stringify({
      message: opts.message,
      content: opts.contentBase64,
      branch: GITHUB_BRANCH,
      ...(sha ? { sha } : {}),
    }),
  });

  if (!putRes.ok) {
    const errText = await putRes.text();
    return { ok: false, error: `GitHub API (${putRes.status}): ${errText.slice(0, 240)}` };
  }
  const data = (await putRes.json()) as { commit?: { html_url?: string } };
  return { ok: true, commitUrl: data.commit?.html_url };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, password } = body as { action?: string; password?: string };

    if (!checkPassword(password)) {
      return NextResponse.json(
        { ok: false, error: "Mot de passe incorrect. Veuillez vérifier vos identifiants d'accès paroissial." },
        { status: 401 },
      );
    }

    if (action === "login") {
      return NextResponse.json({
        ok: true,
        hasServerGithubToken: Boolean(process.env.GITHUB_TOKEN),
        data: {
          site: SITE,
          menuProjet: MENU_PROJET,
          footerLinks: FOOTER_LINKS,
          articles: ARTICLES,
          evenements: EVENEMENTS,
          calendrierGoogle: CALENDRIER_GOOGLE,
        },
      });
    }

    if (action === "upload_photo") {
      const { fileName, base64Data, githubToken } = body as {
        fileName?: string;
        base64Data?: string;
        githubToken?: string;
      };
      const cleanName = (fileName || "photo.jpg")
        .toLowerCase()
        .replace(/[^a-z0-9._-]+/g, "-")
        .replace(/^-+|-+$/g, "");
      const repoPath = `public/assets/img/${cleanName}`;
      const publicUrl = `/assets/img/${cleanName}`;
      const token = (githubToken || process.env.GITHUB_TOKEN || "").trim();

      if (!token || !base64Data) {
        return NextResponse.json({
          ok: false,
          publicUrl,
          error:
            "Pour téléverser directement un fichier image sur GitHub depuis cette page, renseignez un jeton GitHub (GITHUB_TOKEN) ou déposez l'image dans public/assets/img/ sur GitHub.",
        });
      }

      const res = await commitFileToGitHub({
        token,
        path: repoPath,
        contentBase64: base64Data,
        message: `Ajout de la photo ${cleanName} depuis l'espace /admin`,
      });
      if (!res.ok) {
        return NextResponse.json({ ok: false, error: res.error }, { status: 500 });
      }
      return NextResponse.json({ ok: true, publicUrl, commitUrl: res.commitUrl });
    }

    if (action === "save") {
      const { payload, githubToken } = body as {
        payload: Parameters<typeof serializeContentJs>[0];
        githubToken?: string;
      };
      const fileContent = serializeContentJs(payload);
      const token = (githubToken || process.env.GITHUB_TOKEN || "").trim();

      if (token) {
        const res = await commitFileToGitHub({
          token,
          path: "js/content.js",
          contentBase64: Buffer.from(fileContent, "utf-8").toString("base64"),
          message: "Mise à jour de js/content.js depuis l'espace rédaction (/admin)",
        });
        if (!res.ok) {
          return NextResponse.json({ ok: false, fileContent, error: res.error }, { status: 500 });
        }
        return NextResponse.json({
          ok: true,
          publishedToGitHub: true,
          commitUrl: res.commitUrl,
          fileContent,
        });
      }

      return NextResponse.json({
        ok: true,
        publishedToGitHub: false,
        fileContent,
      });
    }

    return NextResponse.json({ ok: false, error: "Action inconnue." }, { status: 400 });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Erreur serveur" },
      { status: 500 },
    );
  }
}
