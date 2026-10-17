import { NextResponse } from "next/server";

const GITHUB_REPO = process.env.GITHUB_REPO || "mgenin12/saint-joseph-sjo2";
const DATA_BRANCH = "feedback-screenshots";
const SUBSCRIBERS_PATH = "newsletter/subscribers.json";
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "SJO2-Batisseurs-2026";

export type NewsletterSubscriber = {
  nom: string;
  email: string;
  date: string;
};

async function fetchSubscribers(token: string): Promise<{ list: NewsletterSubscriber[]; sha?: string }> {
  const apiUrl = `https://api.github.com/repos/${GITHUB_REPO}/contents/${SUBSCRIBERS_PATH}?ref=${encodeURIComponent(DATA_BRANCH)}`;
  const res = await fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    cache: "no-store",
  });
  if (!res.ok) return { list: [] };
  const data = (await res.json()) as { content?: string; sha?: string };
  if (!data.content) return { list: [], sha: data.sha };
  try {
    const raw = Buffer.from(data.content, "base64").toString("utf-8");
    const parsed = JSON.parse(raw);
    return { list: Array.isArray(parsed) ? parsed : [], sha: data.sha };
  } catch {
    return { list: [], sha: data.sha };
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      action?: "subscribe" | "list";
      nom?: string;
      email?: string;
      password?: string;
    };

    const token = (process.env.GITHUB_TOKEN || "").trim();

    if (body.action === "list") {
      if (!body.password || body.password.trim() !== DEFAULT_ADMIN_PASSWORD.trim()) {
        return NextResponse.json({ ok: false, error: "Mot de passe incorrect." }, { status: 401 });
      }
      if (!token) {
        return NextResponse.json({ ok: true, subscribers: [] });
      }
      const { list } = await fetchSubscribers(token);
      return NextResponse.json({ ok: true, subscribers: list });
    }

    const email = (body.email || "").trim().toLowerCase();
    const nom = (body.nom || "").trim();
    if (!email) {
      return NextResponse.json({ ok: false, error: "E-mail requis." }, { status: 400 });
    }

    if (token) {
      const { list, sha } = await fetchSubscribers(token);
      const existsIdx = list.findIndex((s) => s.email.toLowerCase() === email);
      const entry: NewsletterSubscriber = {
        nom: nom || "—",
        email,
        date: new Date().toISOString().slice(0, 10),
      };
      if (existsIdx >= 0) {
        list[existsIdx] = entry;
      } else {
        list.unshift(entry);
      }

      const apiUrl = `https://api.github.com/repos/${GITHUB_REPO}/contents/${SUBSCRIBERS_PATH}`;
      await fetch(apiUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `Inscription newsletter : ${email}`,
          content: Buffer.from(JSON.stringify(list, null, 2), "utf-8").toString("base64"),
          branch: DATA_BRANCH,
          ...(sha ? { sha } : {}),
        }),
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Erreur serveur" },
      { status: 500 },
    );
  }
}
