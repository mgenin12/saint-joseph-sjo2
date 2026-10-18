"use client";

import { useState } from "react";
import { DEFAULT_CATEGORIES } from "@/lib/articles";

type PhotoItem = { url: string; legende?: string };
type VideoItem = { url: string; titre?: string };

type ArticleData = {
  slug: string;
  aliases?: string[];
  titre: string;
  categories: string[];
  date: string;
  auteur: string;
  image: string;
  resume: string;
  motsCles: string[];
  statut: string;
  photos: PhotoItem[];
  videos: VideoItem[];
  contenu: string;
};

type EventData = {
  slug: string;
  visible: boolean;
  titre: string;
  date: string;
  dateFin?: string;
  heureDebut?: string;
  heureFin?: string;
  lieu?: string;
  categorie: string;
  description: string;
  lienInscription?: string;
  places?: number;
  inscrits?: number;
  image?: string;
  photos: PhotoItem[];
  videos: VideoItem[];
};

type TemoignageItem = {
  auteur: string;
  role: string;
  commune: string;
  citation: string;
};

type MaquetteItem = {
  code: string;
  titre: string;
  statut: string;
  resume: string;
  image: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AdminPayload = Record<string, any>;

function slugifySimple(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function AdminEditor() {
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [generatedJs, setGeneratedJs] = useState<string | null>(null);
  const [githubToken, setGithubToken] = useState("");
  const [hasServerToken, setHasServerToken] = useState(false);

  const [payload, setPayload] = useState<AdminPayload | null>(null);
  const [activeTab, setActiveTab] = useState<"collecte" | "articles" | "evenements" | "temoignages" | "newsletter">("articles");
  const [selectedArticleIdx, setSelectedArticleIdx] = useState(0);
  const [selectedEventIdx, setSelectedEventIdx] = useState(0);
  const [subscribers, setSubscribers] = useState<{ nom: string; email: string; date: string }[]>([]);
  const [loadingSubs, setLoadingSubs] = useState(false);

  async function loadSubscribers(pw: string) {
    setLoadingSubs(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "list", password: pw }),
      });
      const json = await res.json();
      if (json.ok && Array.isArray(json.subscribers)) {
        setSubscribers(json.subscribers);
      }
    } catch {
      // ignore
    } finally {
      setLoadingSubs(false);
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "login", password }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setError(json.error || "Accès refusé.");
      } else {
        setPayload(json.data);
        setHasServerToken(Boolean(json.hasServerGithubToken));
        setLoggedIn(true);
        loadSubscribers(password);
      }
    } catch {
      setError("Impossible de contacter le serveur.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (!payload) return;
    setLoading(true);
    setError(null);
    setStatusMsg(null);
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "save", password, payload, githubToken }),
      });
      const json = await res.json();
      if (json.fileContent) {
        setGeneratedJs(json.fileContent);
      }
      if (!res.ok || !json.ok) {
        setError(json.error || "Erreur lors de la sauvegarde.");
      } else if (json.publishedToGitHub) {
        setStatusMsg("✅ Modifications publiées directement sur GitHub ! Le site Vercel se met à jour automatiquement (environ 45 secondes).");
      } else {
        setStatusMsg(
          "✅ Fichier js/content.js généré avec vos modifications ! Vous pouvez le télécharger ou le copier en un clic ci-dessous.",
        );
      }
    } catch {
      setError("Erreur réseau lors de la sauvegarde.");
    } finally {
      setLoading(false);
    }
  }

  function downloadContentJs(content: string) {
    const blob = new Blob([content], { type: "application/javascript;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "content.js";
    a.click();
    URL.revokeObjectURL(url);
  }

  if (!loggedIn || !payload) {
    return (
      <div className="card" style={{ maxWidth: 520, margin: "0 auto", padding: 32 }}>
        <span className="eyebrow">Accès réservé · Équipe paroissiale</span>
        <h2 style={{ marginTop: 6 }}>Connexion à l&apos;espace rédaction</h2>
        <p className="small muted">
          Cet espace permet aux membres autorisés de la paroisse Saint-Arnoux de créer ou modifier des articles, des événements du calendrier
          (avec photos et vidéos) et le montant de la collecte sans toucher au code.
        </p>
        <form onSubmit={handleLogin} className="form" style={{ marginTop: 16 }}>
          <div className="field">
            <label htmlFor="admin-pw">Mot de passe paroissial *</label>
            <input
              id="admin-pw"
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Saisissez le mot de passe…"
              required
            />
          </div>
          {error && (
            <div className="notice notice--err" role="alert">
              {error}
            </div>
          )}
          <button type="submit" className="btn btn--gold btn--lg" disabled={loading}>
            {loading ? "Vérification…" : "Se connecter"}
          </button>
        </form>
      </div>
    );
  }

  const articles: ArticleData[] = payload.articles || [];
  const evenements: EventData[] = payload.evenements || [];
  const currentArticle = articles[selectedArticleIdx];
  const currentEvent = evenements[selectedEventIdx];

  function updateArticle(patch: Partial<ArticleData>) {
    const next = [...articles];
    next[selectedArticleIdx] = { ...next[selectedArticleIdx], ...patch };
    setPayload({ ...payload, articles: next });
  }

  function updateEvent(patch: Partial<EventData>) {
    const next = [...evenements];
    next[selectedEventIdx] = { ...next[selectedEventIdx], ...patch };
    setPayload({ ...payload, evenements: next });
  }

  function addNewArticle() {
    const today = new Date().toISOString().slice(0, 10);
    const nouv: ArticleData = {
      slug: `nouvel-article-${articles.length + 1}`,
      aliases: [],
      titre: "Nouvel article de la paroisse",
      categories: ["Projet"],
      date: today,
      auteur: "Équipe projet SJO2",
      image: "/assets/img/l-ensemble-paroissial-dans-son-site.jpeg",
      resume: "Résumé court de l'article (affiché dans la liste et sur les réseaux sociaux).",
      motsCles: ["Le Rouret", "Église Saint-Joseph"],
      statut: "publie",
      photos: [],
      videos: [],
      contenu: "Écrivez ici le texte de votre article.\n\n## Sous-titre\n\nVotre paragraphe...",
    };
    const next = [nouv, ...articles];
    setPayload({ ...payload, articles: next });
    setSelectedArticleIdx(0);
  }

  function addNewEvent() {
    const today = new Date().toISOString().slice(0, 10);
    const nouv: EventData = {
      slug: `${today}-nouvel-evenement`,
      visible: true,
      titre: "Nouvel événement paroissial",
      date: today,
      heureDebut: "10h30",
      heureFin: "12h30",
      lieu: "Le Rouret",
      categorie: "Rencontre",
      description: "Description complète de l'événement...",
      lienInscription: "",
      image: "/assets/img/l-ensemble-paroissial-dans-son-site.jpeg",
      photos: [],
      videos: [],
    };
    const next = [nouv, ...evenements];
    setPayload({ ...payload, evenements: next });
    setSelectedEventIdx(0);
  }

  return (
    <div>
      {/* Barre d'actions supérieure */}
      <div
        className="card"
        style={{
          marginBottom: 24,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
          background: "#f8f6f1",
          borderLeft: "5px solid var(--gold)",
        }}
      >
        <div>
          <strong>Mode édition actif (`js/content.js`)</strong>
          <p className="small muted" style={{ margin: 0 }}>
            Modifiez vos contenus dans les onglets ci-dessous, puis cliquez sur « Enregistrer ».
          </p>
        </div>
        <div className="row">
          {!hasServerToken && (
            <input
              type="password"
              className="input"
              style={{ width: 230, padding: "8px 10px", fontSize: "0.85rem" }}
              placeholder="Jeton GitHub (optionnel)"
              value={githubToken}
              onChange={(e) => setGithubToken(e.target.value)}
              title="Renseignez un Personal Access Token GitHub si vous souhaitez publier directement sans passer par l'interface GitHub."
            />
          )}
          <button type="button" className="btn btn--gold" onClick={handleSave} disabled={loading}>
            {loading ? "Enregistrement…" : "🚀 Enregistrer / Générer js/content.js"}
          </button>
        </div>
      </div>

      {error && (
        <div className="notice notice--err" style={{ marginBottom: 20 }}>
          {error}
        </div>
      )}

      {statusMsg && (
        <div className="notice notice--ok" style={{ marginBottom: 20 }}>
          <p style={{ margin: "0 0 10px" }}>{statusMsg}</p>
          {generatedJs && (
            <div className="row">
              <button type="button" className="btn btn--navy btn--sm" onClick={() => downloadContentJs(generatedJs)}>
                💾 Télécharger content.js
              </button>
              <button
                type="button"
                className="btn btn--outline btn--sm"
                onClick={() => navigator.clipboard.writeText(generatedJs)}
              >
                📋 Copier tout le fichier js/content.js
              </button>
              <a
                className="btn btn--outline btn--sm"
                href="https://github.com/mgenin12/saint-joseph-sjo2/edit/main/js/content.js"
                target="_blank"
                rel="noopener"
              >
                ✏️ Ouvrir js/content.js sur GitHub →
              </a>
            </div>
          )}
        </div>
      )}

      {/* Onglets de navigation */}
      <div className="row" style={{ marginBottom: 24 }}>
        <button
          type="button"
          className={`btn ${activeTab === "articles" ? "btn--navy" : "btn--outline"}`}
          onClick={() => setActiveTab("articles")}
        >
          📰 Articles ({articles.length})
        </button>
        <button
          type="button"
          className={`btn ${activeTab === "evenements" ? "btn--navy" : "btn--outline"}`}
          onClick={() => setActiveTab("evenements")}
        >
          📅 Événements du Calendrier ({evenements.length})
        </button>
        <button
          type="button"
          className={`btn ${activeTab === "collecte" ? "btn--navy" : "btn--outline"}`}
          onClick={() => setActiveTab("collecte")}
        >
          📊 Collecte &amp; Liens
        </button>
        <button
          type="button"
          className={`btn ${activeTab === "temoignages" ? "btn--navy" : "btn--outline"}`}
          onClick={() => setActiveTab("temoignages")}
        >
          💬 Témoignages &amp; Architectes
        </button>
        <button
          type="button"
          className={`btn ${activeTab === "newsletter" ? "btn--navy" : "btn--outline"}`}
          onClick={() => {
            setActiveTab("newsletter");
            loadSubscribers(password);
          }}
        >
          📬 Inscrits Newsletter ({subscribers.length})
        </button>
      </div>

      {/* ONGLET 1 : ARTICLES */}
      {activeTab === "articles" && (
        <div className="grid admin-split">
          <div className="card" style={{ padding: 16 }}>
            <button type="button" className="btn btn--gold btn--sm" style={{ width: "100%", marginBottom: 12 }} onClick={addNewArticle}>
              + Nouvel article
            </button>
            <div style={{ display: "grid", gap: 8 }}>
              {articles.map((a, idx) => (
                <button
                  key={a.slug + idx}
                  type="button"
                  onClick={() => setSelectedArticleIdx(idx)}
                  style={{
                    textAlign: "left",
                    padding: "10px 12px",
                    borderRadius: 8,
                    border: idx === selectedArticleIdx ? "2px solid var(--gold)" : "1px solid #e2ddd2",
                    background: idx === selectedArticleIdx ? "#fffdf7" : "#fff",
                    cursor: "pointer",
                  }}
                >
                  <strong style={{ display: "block", fontSize: "0.9rem" }}>{a.titre}</strong>
                  <span className="small muted">
                    {a.date} · {a.statut === "publie" ? "Publié" : "Brouillon"}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {currentArticle && (
            <div className="card form">
              <h3 style={{ marginTop: 0 }}>Éditer l&apos;article : {currentArticle.titre}</h3>
              <div className="form-row">
                <div className="field">
                  <label>Titre de l&apos;article *</label>
                  <input
                    className="input"
                    value={currentArticle.titre}
                    onChange={(e) =>
                      updateArticle({
                        titre: e.target.value,
                        slug: currentArticle.slug.startsWith("nouvel-article") ? slugifySimple(e.target.value) : currentArticle.slug,
                      })
                    }
                  />
                </div>
                <div className="field">
                  <label>Identifiant URL (`slug`)</label>
                  <input className="input" value={currentArticle.slug} onChange={(e) => updateArticle({ slug: slugifySimple(e.target.value) })} />
                </div>
              </div>

              <div className="form-row">
                <div className="field">
                  <label>Date de publication (AAAA-MM-JJ)</label>
                  <input type="date" className="input" value={currentArticle.date} onChange={(e) => updateArticle({ date: e.target.value })} />
                </div>
                <div className="field">
                  <label>Auteur</label>
                  <input className="input" value={currentArticle.auteur || ""} onChange={(e) => updateArticle({ auteur: e.target.value })} />
                </div>
                <div className="field">
                  <label>Statut</label>
                  <select className="select" value={currentArticle.statut} onChange={(e) => updateArticle({ statut: e.target.value })}>
                    <option value="publie">Publié (visible sur le site)</option>
                    <option value="brouillon">Brouillon (masqué)</option>
                  </select>
                </div>
              </div>

              <div className="field">
                <label>Catégories (pour la recherche par filtres)</label>
                <div className="row" style={{ gap: 8 }}>
                  {DEFAULT_CATEGORIES.map((cat) => {
                    const checked = currentArticle.categories?.includes(cat);
                    return (
                      <label key={cat} className={`chip${checked ? " active" : ""}`} style={{ cursor: "pointer" }}>
                        <input
                          type="checkbox"
                          checked={checked}
                          style={{ marginRight: 6 }}
                          onChange={(e) => {
                            const nextCats = e.target.checked
                              ? [...(currentArticle.categories || []), cat]
                              : (currentArticle.categories || []).filter((c) => c !== cat);
                            updateArticle({ categories: nextCats });
                          }}
                        />
                        {cat}
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="form-row">
                <div className="field">
                  <label>Image principale (chemin `/assets/img/...` ou lien Drive)</label>
                  <input className="input" value={currentArticle.image || ""} onChange={(e) => updateArticle({ image: e.target.value })} />
                </div>
                <div className="field">
                  <label>Mots-clés (séparés par une virgule)</label>
                  <input
                    className="input"
                    value={(currentArticle.motsCles || []).join(", ")}
                    onChange={(e) =>
                      updateArticle({
                        motsCles: e.target.value
                          .split(",")
                          .map((s) => s.trim())
                          .filter(Boolean),
                      })
                    }
                  />
                </div>
              </div>

              <div className="field">
                <label>Résumé court (chapô &amp; partage réseaux sociaux)</label>
                <textarea className="textarea" rows={2} value={currentArticle.resume || ""} onChange={(e) => updateArticle({ resume: e.target.value })} />
              </div>

              <div className="field">
                <label>Contenu de l&apos;article (Markdown + blocs interactifs)</label>
                <div className="row" style={{ marginBottom: 6 }}>
                  {["[[budget]]", "[[equipe]]", "[[concours]]", "[[clocher]]", "[[avancement]]", "[[faq]]", "[[missions]]"].map((tok) => (
                    <button
                      key={tok}
                      type="button"
                      className="chip"
                      onClick={() => updateArticle({ contenu: `${currentArticle.contenu}\n\n${tok}\n` })}
                    >
                      + Insérer {tok}
                    </button>
                  ))}
                </div>
                <textarea
                  className="textarea"
                  rows={12}
                  value={currentArticle.contenu || ""}
                  onChange={(e) => updateArticle({ contenu: e.target.value })}
                />
              </div>

              {/* Galerie Photos de l'article */}
              <div className="field" style={{ background: "#f8f6f1", padding: 16, borderRadius: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <strong>📷 Galerie photos de l&apos;article ({(currentArticle.photos || []).length})</strong>
                  <button
                    type="button"
                    className="btn btn--outline btn--sm"
                    onClick={() =>
                      updateArticle({
                        photos: [...(currentArticle.photos || []), { url: "/assets/img/l-ensemble-paroissial-dans-son-site.jpeg", legende: "" }],
                      })
                    }
                  >
                    + Ajouter une photo
                  </button>
                </div>
                {(currentArticle.photos || []).map((p, pIdx) => (
                  <div key={pIdx} className="form-row" style={{ marginBottom: 8, alignItems: "center" }}>
                    <input
                      className="input"
                      placeholder="URL (/assets/img/photo.jpg ou lien Google Drive)"
                      value={p.url}
                      onChange={(e) => {
                        const next = [...(currentArticle.photos || [])];
                        next[pIdx] = { ...next[pIdx], url: e.target.value };
                        updateArticle({ photos: next });
                      }}
                    />
                    <input
                      className="input"
                      placeholder="Légende sous la photo"
                      value={p.legende || ""}
                      onChange={(e) => {
                        const next = [...(currentArticle.photos || [])];
                        next[pIdx] = { ...next[pIdx], legende: e.target.value };
                        updateArticle({ photos: next });
                      }}
                    />
                    <button
                      type="button"
                      className="btn btn--outline btn--sm"
                      onClick={() => updateArticle({ photos: (currentArticle.photos || []).filter((_, i) => i !== pIdx) })}
                    >
                      Supprimer
                    </button>
                  </div>
                ))}
              </div>

              {/* Galerie Vidéos de l'article */}
              <div className="field" style={{ background: "#f8f6f1", padding: 16, borderRadius: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <strong>🎬 Vidéos de l&apos;article ({(currentArticle.videos || []).length})</strong>
                  <button
                    type="button"
                    className="btn btn--outline btn--sm"
                    onClick={() =>
                      updateArticle({
                        videos: [...(currentArticle.videos || []), { url: "https://www.youtube.com/watch?v=", titre: "" }],
                      })
                    }
                  >
                    + Ajouter une vidéo (YouTube / Drive)
                  </button>
                </div>
                {(currentArticle.videos || []).map((v, vIdx) => (
                  <div key={vIdx} className="form-row" style={{ marginBottom: 8, alignItems: "center" }}>
                    <input
                      className="input"
                      placeholder="Lien YouTube, Vimeo ou Google Drive"
                      value={v.url}
                      onChange={(e) => {
                        const next = [...(currentArticle.videos || [])];
                        next[vIdx] = { ...next[vIdx], url: e.target.value };
                        updateArticle({ videos: next });
                      }}
                    />
                    <input
                      className="input"
                      placeholder="Titre de la vidéo"
                      value={v.titre || ""}
                      onChange={(e) => {
                        const next = [...(currentArticle.videos || [])];
                        next[vIdx] = { ...next[vIdx], titre: e.target.value };
                        updateArticle({ videos: next });
                      }}
                    />
                    <button
                      type="button"
                      className="btn btn--outline btn--sm"
                      onClick={() => updateArticle({ videos: (currentArticle.videos || []).filter((_, i) => i !== vIdx) })}
                    >
                      Supprimer
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ONGLET 2 : ÉVÉNEMENTS DU CALENDRIER */}
      {activeTab === "evenements" && (
        <div className="grid admin-split">
          <div className="card" style={{ padding: 16 }}>
            <button type="button" className="btn btn--gold btn--sm" style={{ width: "100%", marginBottom: 12 }} onClick={addNewEvent}>
              + Nouvel événement
            </button>
            <div style={{ display: "grid", gap: 8 }}>
              {evenements.map((ev, idx) => (
                <button
                  key={ev.slug + idx}
                  type="button"
                  onClick={() => setSelectedEventIdx(idx)}
                  style={{
                    textAlign: "left",
                    padding: "10px 12px",
                    borderRadius: 8,
                    border: idx === selectedEventIdx ? "2px solid var(--gold)" : "1px solid #e2ddd2",
                    background: idx === selectedEventIdx ? "#fffdf7" : "#fff",
                    cursor: "pointer",
                  }}
                >
                  <strong style={{ display: "block", fontSize: "0.9rem" }}>{ev.titre}</strong>
                  <span className="small muted">
                    {ev.date} · {ev.visible ? "👁️ Visible" : "🙈 Masqué"}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {currentEvent && (
            <div className="card form">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                <h3 style={{ margin: 0 }}>Éditer l&apos;événement : {currentEvent.titre}</h3>
                <label className="chip active" style={{ cursor: "pointer", fontWeight: 700 }}>
                  <input
                    type="checkbox"
                    checked={currentEvent.visible !== false}
                    onChange={(e) => updateEvent({ visible: e.target.checked })}
                    style={{ marginRight: 6 }}
                  />
                  Afficher cet événement sur le site (`visible`)
                </label>
              </div>

              <div className="form-row">
                <div className="field">
                  <label>Titre de l&apos;événement *</label>
                  <input className="input" value={currentEvent.titre} onChange={(e) => updateEvent({ titre: e.target.value })} />
                </div>
                <div className="field">
                  <label>Identifiant URL (`slug` → `/calendrier/...`)</label>
                  <input className="input" value={currentEvent.slug} onChange={(e) => updateEvent({ slug: slugifySimple(e.target.value) })} />
                </div>
              </div>

              <div className="form-row">
                <div className="field">
                  <label>Date de début (AAAA-MM-JJ)</label>
                  <input type="date" className="input" value={currentEvent.date} onChange={(e) => updateEvent({ date: e.target.value })} />
                </div>
                <div className="field">
                  <label>Date de fin (optionnel)</label>
                  <input type="date" className="input" value={currentEvent.dateFin || ""} onChange={(e) => updateEvent({ dateFin: e.target.value || undefined })} />
                </div>
                <div className="field">
                  <label>Heure début (ex. 10h30)</label>
                  <input className="input" value={currentEvent.heureDebut || ""} onChange={(e) => updateEvent({ heureDebut: e.target.value })} />
                </div>
                <div className="field">
                  <label>Heure fin (ex. 12h30)</label>
                  <input className="input" value={currentEvent.heureFin || ""} onChange={(e) => updateEvent({ heureFin: e.target.value })} />
                </div>
              </div>

              <div className="form-row">
                <div className="field">
                  <label>Lieu</label>
                  <input className="input" value={currentEvent.lieu || ""} onChange={(e) => updateEvent({ lieu: e.target.value })} />
                </div>
                <div className="field">
                  <label>Catégorie (ex. Messe, Rencontre, Étape du projet)</label>
                  <input className="input" value={currentEvent.categorie || ""} onChange={(e) => updateEvent({ categorie: e.target.value })} />
                </div>
                <div className="field">
                  <label>Lien d&apos;inscription (Google Forms, HelloAsso, ou `/contact`)</label>
                  <input className="input" value={currentEvent.lienInscription || ""} onChange={(e) => updateEvent({ lienInscription: e.target.value })} />
                </div>
              </div>

              <div className="field">
                <label>Description complète de l&apos;événement</label>
                <textarea className="textarea" rows={5} value={currentEvent.description || ""} onChange={(e) => updateEvent({ description: e.target.value })} />
              </div>

              {/* Galerie Photos de l'événement */}
              <div className="field" style={{ background: "#f8f6f1", padding: 16, borderRadius: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <strong>📷 Photos de l&apos;événement ({(currentEvent.photos || []).length})</strong>
                  <button
                    type="button"
                    className="btn btn--outline btn--sm"
                    onClick={() =>
                      updateEvent({
                        photos: [...(currentEvent.photos || []), { url: "/assets/img/terrain-oliviers.jpeg", legende: "" }],
                      })
                    }
                  >
                    + Ajouter une photo
                  </button>
                </div>
                {(currentEvent.photos || []).map((p, pIdx) => (
                  <div key={pIdx} className="form-row" style={{ marginBottom: 8, alignItems: "center" }}>
                    <input
                      className="input"
                      placeholder="URL (/assets/img/ma-photo.jpg ou lien Google Drive)"
                      value={p.url}
                      onChange={(e) => {
                        const next = [...(currentEvent.photos || [])];
                        next[pIdx] = { ...next[pIdx], url: e.target.value };
                        updateEvent({ photos: next });
                      }}
                    />
                    <input
                      className="input"
                      placeholder="Légende sous la photo"
                      value={p.legende || ""}
                      onChange={(e) => {
                        const next = [...(currentEvent.photos || [])];
                        next[pIdx] = { ...next[pIdx], legende: e.target.value };
                        updateEvent({ photos: next });
                      }}
                    />
                    <button
                      type="button"
                      className="btn btn--outline btn--sm"
                      onClick={() => updateEvent({ photos: (currentEvent.photos || []).filter((_, i) => i !== pIdx) })}
                    >
                      Supprimer
                    </button>
                  </div>
                ))}
              </div>

              {/* Galerie Vidéos de l'événement */}
              <div className="field" style={{ background: "#f8f6f1", padding: 16, borderRadius: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <strong>🎬 Vidéos de l&apos;événement ({(currentEvent.videos || []).length})</strong>
                  <button
                    type="button"
                    className="btn btn--outline btn--sm"
                    onClick={() =>
                      updateEvent({
                        videos: [...(currentEvent.videos || []), { url: "https://www.youtube.com/watch?v=", titre: "" }],
                      })
                    }
                  >
                    + Ajouter une vidéo (YouTube / Drive)
                  </button>
                </div>
                {(currentEvent.videos || []).map((v, vIdx) => (
                  <div key={vIdx} className="form-row" style={{ marginBottom: 8, alignItems: "center" }}>
                    <input
                      className="input"
                      placeholder="Lien YouTube, Vimeo ou Google Drive"
                      value={v.url}
                      onChange={(e) => {
                        const next = [...(currentEvent.videos || [])];
                        next[vIdx] = { ...next[vIdx], url: e.target.value };
                        updateEvent({ videos: next });
                      }}
                    />
                    <input
                      className="input"
                      placeholder="Titre de la vidéo"
                      value={v.titre || ""}
                      onChange={(e) => {
                        const next = [...(currentEvent.videos || [])];
                        next[vIdx] = { ...next[vIdx], titre: e.target.value };
                        updateEvent({ videos: next });
                      }}
                    />
                    <button
                      type="button"
                      className="btn btn--outline btn--sm"
                      onClick={() => updateEvent({ videos: (currentEvent.videos || []).filter((_, i) => i !== vIdx) })}
                    >
                      Supprimer
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ONGLET 3 : COLLECTE & LIENS */}
      {activeTab === "collecte" && (
        <div className="card form">
          <h3 style={{ marginTop: 0 }}>Compteur du Clocher des Bâtisseurs (22 mètres) &amp; Liens</h3>
          <div className="form-row">
            <div className="field">
              <label>Montant actuellement collecté (€, terrain inclus)</label>
              <input
                type="number"
                className="input"
                value={payload.site.collecte.collecteActuelle}
                onChange={(e) =>
                  setPayload({
                    ...payload,
                    site: {
                      ...payload.site,
                      collecte: { ...payload.site.collecte, collecteActuelle: Number(e.target.value) || 0 },
                    },
                  })
                }
              />
            </div>
            <div className="field">
              <label>Objectif global du projet (€)</label>
              <input
                type="number"
                className="input"
                value={payload.site.collecte.objectifGlobal}
                onChange={(e) =>
                  setPayload({
                    ...payload,
                    site: {
                      ...payload.site,
                      collecte: { ...payload.site.collecte, objectifGlobal: Number(e.target.value) || 6000000 },
                    },
                  })
                }
              />
            </div>
          </div>
          <div className="form-row">
            <div className="field">
              <label>Lien du bouton « Faire un don » (plateforme du Diocèse)</label>
              <input
                className="input"
                value={payload.site.liens.don}
                onChange={(e) =>
                  setPayload({
                    ...payload,
                    site: { ...payload.site, liens: { ...payload.site.liens, don: e.target.value } },
                  })
                }
              />
            </div>
            <div className="field">
              <label>Lien d&apos;inscription à la Newsletter</label>
              <input
                className="input"
                value={payload.site.liens.newsletter}
                onChange={(e) =>
                  setPayload({
                    ...payload,
                    site: { ...payload.site, liens: { ...payload.site.liens, newsletter: e.target.value } },
                  })
                }
              />
            </div>
          </div>
        </div>
      )}

      {/* ONGLET 4 : TÉMOIGNAGES & ARCHITECTES */}
      {activeTab === "temoignages" && (
        <div className="grid" style={{ gap: 24 }}>
          <div className="card form">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ margin: 0 }}>Le Livre d&apos;Or des Bâtisseurs (Témoignages)</h3>
              <button
                type="button"
                className="btn btn--gold btn--sm"
                onClick={() => {
                  const items: TemoignageItem[] = payload.site.temoignages?.items || [];
                  setPayload({
                    ...payload,
                    site: {
                      ...payload.site,
                      temoignages: {
                        ...payload.site.temoignages,
                        items: [
                          ...items,
                          { auteur: "Nouveau paroissien", role: "Bâtisseur", commune: "Le Rouret", citation: "Votre témoignage..." },
                        ],
                      },
                    },
                  });
                }}
              >
                + Ajouter un témoignage
              </button>
            </div>
            {((payload.site.temoignages?.items || []) as TemoignageItem[]).map((item, idx) => (
              <div key={idx} style={{ background: "#f8f6f1", padding: 14, borderRadius: 8 }}>
                <div className="form-row">
                  <input
                    className="input"
                    placeholder="Nom / Prénom"
                    value={item.auteur}
                    onChange={(e) => {
                      const next = [...payload.site.temoignages.items];
                      next[idx] = { ...next[idx], auteur: e.target.value };
                      setPayload({ ...payload, site: { ...payload.site, temoignages: { ...payload.site.temoignages, items: next } } });
                    }}
                  />
                  <input
                    className="input"
                    placeholder="Rôle (ex. Paroissiens, Bénévole...)"
                    value={item.role}
                    onChange={(e) => {
                      const next = [...payload.site.temoignages.items];
                      next[idx] = { ...next[idx], role: e.target.value };
                      setPayload({ ...payload, site: { ...payload.site, temoignages: { ...payload.site.temoignages, items: next } } });
                    }}
                  />
                  <input
                    className="input"
                    placeholder="Commune"
                    value={item.commune}
                    onChange={(e) => {
                      const next = [...payload.site.temoignages.items];
                      next[idx] = { ...next[idx], commune: e.target.value };
                      setPayload({ ...payload, site: { ...payload.site, temoignages: { ...payload.site.temoignages, items: next } } });
                    }}
                  />
                </div>
                <textarea
                  className="textarea mt-2"
                  rows={2}
                  value={item.citation}
                  onChange={(e) => {
                    const next = [...payload.site.temoignages.items];
                    next[idx] = { ...next[idx], citation: e.target.value };
                    setPayload({ ...payload, site: { ...payload.site, temoignages: { ...payload.site.temoignages, items: next } } });
                  }}
                />
              </div>
            ))}
          </div>

          <div className="card form">
            <h3 style={{ marginTop: 0 }}>Les 5 maquettes finalistes du Concours d&apos;Architectes</h3>
            {((payload.site.concours?.maquettes || []) as MaquetteItem[]).map((m, idx) => (
              <div key={idx} className="form-row" style={{ background: "#f8f6f1", padding: 12, borderRadius: 8 }}>
                <input
                  className="input"
                  value={m.titre}
                  placeholder="Titre du projet"
                  onChange={(e) => {
                    const next = [...payload.site.concours.maquettes];
                    next[idx] = { ...next[idx], titre: e.target.value };
                    setPayload({ ...payload, site: { ...payload.site, concours: { ...payload.site.concours, maquettes: next } } });
                  }}
                />
                <input
                  className="input"
                  value={m.image}
                  placeholder="Image (/assets/img/...)"
                  onChange={(e) => {
                    const next = [...payload.site.concours.maquettes];
                    next[idx] = { ...next[idx], image: e.target.value };
                    setPayload({ ...payload, site: { ...payload.site, concours: { ...payload.site.concours, maquettes: next } } });
                  }}
                />
                <input
                  className="input"
                  value={m.resume}
                  placeholder="Résumé"
                  onChange={(e) => {
                    const next = [...payload.site.concours.maquettes];
                    next[idx] = { ...next[idx], resume: e.target.value };
                    setPayload({ ...payload, site: { ...payload.site, concours: { ...payload.site.concours, maquettes: next } } });
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================== ONGLET INSCRITS NEWSLETTER ==================== */}
      {activeTab === "newsletter" && (
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
            <div>
              <h3 style={{ margin: 0 }}>Liste des inscrits à la Newsletter ({subscribers.length})</h3>
              <p className="small muted" style={{ margin: "4px 0 0" }}>
                Chaque nouvelle inscription envoie aussi un e-mail automatique à <b>secretariat@saint-arnoux.fr</b>.
              </p>
            </div>
            <div className="row" style={{ gap: 8 }}>
              <button
                type="button"
                className="btn btn--outline btn--sm"
                onClick={() => loadSubscribers(password)}
                disabled={loadingSubs}
              >
                🔄 Actualiser
              </button>
              {subscribers.length > 0 && (
                <>
                  <button
                    type="button"
                    className="btn btn--outline btn--sm"
                    onClick={() => {
                      const emails = subscribers.map((s) => s.email).join(", ");
                      navigator.clipboard.writeText(emails);
                      setStatusMsg("✅ Toutes les adresses e-mail ont été copiées dans votre presse-papiers !");
                    }}
                  >
                    📋 Copier tous les e-mails
                  </button>
                  <button
                    type="button"
                    className="btn btn--gold btn--sm"
                    onClick={() => {
                      const csv = [
                        "Prénom et Nom,E-mail,Date d'inscription",
                        ...subscribers.map(
                          (s) => `"${(s.nom || "").replace(/"/g, '""')}","${s.email}","${s.date}"`,
                        ),
                      ].join("\n");
                      const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = "inscrits-newsletter-sjo2.csv";
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                  >
                    📥 Télécharger en CSV (Excel)
                  </button>
                </>
              )}
            </div>
          </div>

          {subscribers.length === 0 ? (
            <p className="muted">Aucune inscription enregistrée pour le moment.</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.92rem" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid rgba(0,32,78,0.15)", textAlign: "left" }}>
                    <th style={{ padding: "8px 10px" }}>Prénom et Nom</th>
                    <th style={{ padding: "8px 10px" }}>E-mail</th>
                    <th style={{ padding: "8px 10px" }}>Date d&apos;inscription</th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.map((s, idx) => (
                    <tr key={idx} style={{ borderBottom: "1px solid rgba(0,32,78,0.08)" }}>
                      <td style={{ padding: "8px 10px", fontWeight: 600 }}>{s.nom || "—"}</td>
                      <td style={{ padding: "8px 10px" }}>
                        <a href={`mailto:${s.email}`}>{s.email}</a>
                      </td>
                      <td style={{ padding: "8px 10px" }}>{s.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
