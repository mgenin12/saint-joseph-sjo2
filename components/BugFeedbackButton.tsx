"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent, type PointerEvent } from "react";

const FEEDBACK_EMAIL = "max.ac.genin@gmail.com";

export default function BugFeedbackButton() {
  const [open, setOpen] = useState(false);
  const [capturingMode, setCapturingMode] = useState(false);
  const [capturingBusy, setCapturingBusy] = useState(false);

  const [type, setType] = useState("Bug / Problème d'affichage");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [baseScreenshot, setBaseScreenshot] = useState<string | null>(null);
  const [drawing, setDrawing] = useState(false);
  const [hasStrokes, setHasStrokes] = useState(false);

  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const lastPtRef = useRef<{ x: number; y: number } | null>(null);

  // Redessine l'image de base dans le canvas d'annotation dès qu'un screenshot est pris
  useEffect(() => {
    if (!baseScreenshot || !canvasRef.current || !open || capturingMode) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new window.Image();
    img.onload = () => {
      const maxW = 960;
      const scale = img.width > maxW ? maxW / img.width : 1;
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      setHasStrokes(false);
    };
    img.src = baseScreenshot;
  }, [baseScreenshot, open, capturingMode]);

  // Capture la vue actuelle de la page via html2canvas (sans popup de permission navigateur)
  async function captureCurrentPageDom() {
    setCapturingBusy(true);
    setError(null);
    try {
      const html2canvasMod = await import("html2canvas");
      const html2canvas = html2canvasMod.default;
      await new Promise((r) => setTimeout(r, 120));

      const canvas = await html2canvas(document.body, {
        useCORS: true,
        allowTaint: true,
        logging: false,
        x: window.scrollX,
        y: window.scrollY,
        width: window.innerWidth,
        height: window.innerHeight,
        windowWidth: document.documentElement.clientWidth,
        windowHeight: document.documentElement.clientHeight,
        scale: Math.min(window.devicePixelRatio || 1, 1.5),
        ignoreElements: (el) => el.hasAttribute("data-feedback-ignore"),
      });

      const dataUrl = canvas.toDataURL("image/jpeg", 0.82);
      setBaseScreenshot(dataUrl);
      setCapturingMode(false);
      setOpen(true);
    } catch (err) {
      console.error("[feedback] Erreur capture DOM", err);
      setError("La capture automatique a échoué. Vous pouvez utiliser « Capturer l'onglet » ou importer une image.");
      setCapturingMode(false);
      setOpen(true);
    } finally {
      setCapturingBusy(false);
    }
  }

  // Capture l'onglet via l'API native Screen Capture du navigateur (Desktop)
  async function captureBrowserTab() {
    if (!navigator.mediaDevices?.getDisplayMedia) {
      await captureCurrentPageDom();
      return;
    }
    setCapturingBusy(true);
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { displaySurface: "browser" },
        audio: false,
        // @ts-expect-error preferCurrentTab est supporté par Chrome/Edge
        preferCurrentTab: true,
      });
      await new Promise((r) => setTimeout(r, 180));
      const video = document.createElement("video");
      video.srcObject = stream;
      video.muted = true;
      await video.play();

      const canvas = document.createElement("canvas");
      const maxW = 1280;
      const scale = video.videoWidth > maxW ? maxW / video.videoWidth : 1;
      canvas.width = Math.round(video.videoWidth * scale);
      canvas.height = Math.round(video.videoHeight * scale);
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      }
      stream.getTracks().forEach((t) => t.stop());

      const dataUrl = canvas.toDataURL("image/jpeg", 0.82);
      setBaseScreenshot(dataUrl);
      setCapturingMode(false);
      setOpen(true);
    } catch {
      // Si l'utilisateur annule la boîte de dialogue, on revient au formulaire
      setCapturingMode(false);
      setOpen(true);
    } finally {
      setCapturingBusy(false);
    }
  }

  function handleFileUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setBaseScreenshot(reader.result);
      }
    };
    reader.readAsDataURL(file);
  }

  function getCanvasCoords(e: PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * canvas.width,
      y: ((e.clientY - rect.top) / rect.height) * canvas.height,
    };
  }

  function startDraw(e: PointerEvent<HTMLCanvasElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);
    setDrawing(true);
    lastPtRef.current = getCanvasCoords(e);
  }

  function moveDraw(e: PointerEvent<HTMLCanvasElement>) {
    if (!drawing || !canvasRef.current || !lastPtRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    const pt = getCanvasCoords(e);
    ctx.strokeStyle = "#e11d48";
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(lastPtRef.current.x, lastPtRef.current.y);
    ctx.lineTo(pt.x, pt.y);
    ctx.stroke();
    lastPtRef.current = pt;
    setHasStrokes(true);
  }

  function endDraw() {
    setDrawing(false);
    lastPtRef.current = null;
  }

  function clearAnnotations() {
    if (!baseScreenshot || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = new window.Image();
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      setHasStrokes(false);
    };
    img.src = baseScreenshot;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!message.trim()) {
      setError("Merci de décrire le problème ou votre suggestion.");
      return;
    }

    setSending(true);
    setError(null);

    const pageUrl = typeof window !== "undefined" ? window.location.href : "";
    const viewport =
      typeof window !== "undefined"
        ? `${window.innerWidth}×${window.innerHeight}px · ${navigator.userAgent.slice(0, 120)}`
        : "";

    const finalScreenshot =
      baseScreenshot && canvasRef.current
        ? canvasRef.current.toDataURL("image/jpeg", 0.82)
        : baseScreenshot;

    let screenshotUrl = "";
    try {
      const apiRes = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          nom,
          email,
          message,
          pageUrl,
          viewport,
          screenshotDataUrl: finalScreenshot || undefined,
        }),
      });
      if (apiRes.ok) {
        const data = (await apiRes.json()) as { screenshotUrl?: string };
        if (data.screenshotUrl) screenshotUrl = data.screenshotUrl;
      }
    } catch {
      // Continue avec l'envoi direct FormSubmit
    }

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(FEEDBACK_EMAIL)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: `[Site SJO2 — Bug & Feedback] ${type} — ${pageUrl}`,
          ...(email.trim() ? { _replyto: email.trim() } : {}),
          _template: "table",
          _captcha: "false",
          Type: type,
          "Page concernée": pageUrl,
          "Nom / Prénom": nom.trim() || "Anonyme",
          "E-mail": email.trim() || "Non renseigné",
          Message: message.trim(),
          "Screenshot de la page": screenshotUrl || (finalScreenshot ? "Capture prise sur la page" : "Aucune capture jointe"),
          "Écran & Navigateur": viewport,
        }),
      });

      if (res.ok || screenshotUrl) {
        setSent(true);
        setSending(false);
        return;
      }
    } catch {
      if (screenshotUrl) {
        setSent(true);
        setSending(false);
        return;
      }
    }

    setSending(false);
    setError("L'envoi a rencontré un problème. Veuillez réessayer dans quelques secondes.");
  }

  function resetModal() {
    setSent(false);
    setError(null);
    setMessage("");
    setBaseScreenshot(null);
    setHasStrokes(false);
    setOpen(false);
    setCapturingMode(false);
  }

  return (
    <>
      <button
        type="button"
        className="feedback-trigger no-print"
        data-feedback-ignore="true"
        onClick={() => {
          setSent(false);
          setError(null);
          setOpen(true);
        }}
        title="Signaler un problème ou envoyer un commentaire sur cette page"
      >
        <span aria-hidden="true">🐞</span> Bug &amp; Feedback
      </button>

      {/* Barre flottante sur la page originale pour prendre un screenshot à l'endroit exact */}
      {capturingMode && (
        <div className="feedback-capture-bar no-print" data-feedback-ignore="true">
          <div className="feedback-capture-bar__inner">
            <span>
              📸 <strong>Mode capture :</strong> faites défiler la page jusqu&apos;à l&apos;endroit du problème, puis cliquez sur :
            </span>
            <div className="feedback-capture-bar__actions">
              <button
                type="button"
                className="btn btn--gold btn--sm"
                disabled={capturingBusy}
                onClick={captureCurrentPageDom}
              >
                {capturingBusy ? "Capture en cours…" : "📸 Capturer cette vue de la page"}
              </button>
              <button
                type="button"
                className="btn btn--outline btn--sm"
                style={{ color: "#fff", borderColor: "rgba(255,255,255,0.4)" }}
                disabled={capturingBusy}
                onClick={captureBrowserTab}
              >
                🖥️ Capturer l&apos;onglet exact
              </button>
              <button
                type="button"
                className="btn btn--ghost btn--sm"
                disabled={capturingBusy}
                onClick={() => {
                  setCapturingMode(false);
                  setOpen(true);
                }}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fenêtre modale Bug & Feedback */}
      {open && !capturingMode && (
        <div
          className="feedback-modal-backdrop no-print"
          data-feedback-ignore="true"
          role="dialog"
          aria-modal="true"
          aria-labelledby="feedback-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className="feedback-modal">
            <div className="feedback-modal__head">
              <div>
                <span className="eyebrow" style={{ marginBottom: 4 }}>
                  Amélioration continue du site
                </span>
                <h3 id="feedback-modal-title" style={{ margin: 0 }}>
                  Bug &amp; Feedback
                </h3>
              </div>
              <button
                type="button"
                className="feedback-modal__close"
                aria-label="Fermer"
                onClick={() => setOpen(false)}
              >
                ✕
              </button>
            </div>

            {sent ? (
              <div className="feedback-modal__body">
                <div className="notice notice--ok" role="status">
                  <b>Merci pour votre retour !</b> Votre message (ainsi que la capture d&apos;écran et l&apos;adresse de la page) a bien été envoyé à{" "}
                  <b>{FEEDBACK_EMAIL}</b>.
                </div>
                <div style={{ marginTop: 16, textAlign: "right" }}>
                  <button type="button" className="btn btn--navy" onClick={resetModal}>
                    Fermer
                  </button>
                </div>
              </div>
            ) : (
              <form className="feedback-modal__body" onSubmit={handleSubmit}>
                <div className="feedback-screenshot-box">
                  <div className="feedback-screenshot-box__header">
                    <strong>1. Capture d&apos;écran de la page (optionnel)</strong>
                    <div className="feedback-screenshot-box__btns">
                      <button
                        type="button"
                        className="btn btn--gold btn--sm"
                        onClick={() => {
                          setOpen(false);
                          setCapturingMode(true);
                        }}
                      >
                        📸 Prendre un screenshot sur la page
                      </button>
                      <label className="btn btn--outline btn--sm" style={{ cursor: "pointer", margin: 0 }}>
                        📎 Importer une image
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          style={{ display: "none" }}
                        />
                      </label>
                    </div>
                  </div>

                  {baseScreenshot ? (
                    <div className="feedback-canvas-wrap">
                      <p className="small muted" style={{ margin: "6px 0" }}>
                        💡 <b>Astuce :</b> dessinez directement en rouge sur l&apos;image ci-dessous avec votre souris ou votre doigt pour entourer le problème.
                      </p>
                      <canvas
                        ref={canvasRef}
                        className="feedback-canvas"
                        onPointerDown={startDraw}
                        onPointerMove={moveDraw}
                        onPointerUp={endDraw}
                        onPointerCancel={endDraw}
                      />
                      <div className="row" style={{ gap: 8, marginTop: 8 }}>
                        {hasStrokes && (
                          <button type="button" className="btn btn--outline btn--sm" onClick={clearAnnotations}>
                            Effacer mes traits
                          </button>
                        )}
                        <button
                          type="button"
                          className="btn btn--outline btn--sm"
                          onClick={() => setBaseScreenshot(null)}
                        >
                          Supprimer la capture
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="small muted" style={{ margin: "6px 0 0" }}>
                      Cliquez sur <b>« Prendre un screenshot sur la page »</b> pour revenir sur la page originale, viser la section concernée et la capturer en un clic.
                    </p>
                  )}
                </div>

                <div className="form-row" style={{ marginTop: 14 }}>
                  <div className="field">
                    <label htmlFor="fb-type">Type de retour</label>
                    <select
                      id="fb-type"
                      className="select"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                    >
                      <option value="Bug / Problème d'affichage">Bug / Problème d&apos;affichage</option>
                      <option value="Correction de texte ou chiffre">Correction de texte ou chiffre</option>
                      <option value="Suggestion / Idée d'amélioration">Suggestion / Idée d&apos;amélioration</option>
                      <option value="Autre">Autre remarque</option>
                    </select>
                  </div>
                  <div className="field">
                    <label htmlFor="fb-nom">Votre nom (facultatif)</label>
                    <input
                      id="fb-nom"
                      className="input"
                      value={nom}
                      onChange={(e) => setNom(e.target.value)}
                      placeholder="Ex. Maxime"
                    />
                  </div>
                </div>

                <div className="field" style={{ marginTop: 10 }}>
                  <label htmlFor="fb-email">Votre e-mail (facultatif, pour vous répondre)</label>
                  <input
                    id="fb-email"
                    type="email"
                    className="input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.fr"
                  />
                </div>

                <div className="field" style={{ marginTop: 10 }}>
                  <label htmlFor="fb-msg">Description du problème ou feedback *</label>
                  <textarea
                    id="fb-msg"
                    className="textarea"
                    rows={3}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Expliquez ce qui ne fonctionne pas ou ce que vous souhaiteriez modifier sur cette page…"
                  />
                </div>

                {error && (
                  <div className="notice notice--err" role="alert" style={{ marginTop: 10 }}>
                    {error}
                  </div>
                )}

                <div className="feedback-modal__foot">
                  <span className="small muted">
                    Envoyé directement à <b>{FEEDBACK_EMAIL}</b>
                  </span>
                  <div className="row" style={{ gap: 10 }}>
                    <button type="button" className="btn btn--outline btn--sm" onClick={() => setOpen(false)}>
                      Annuler
                    </button>
                    <button type="submit" className="btn btn--gold" disabled={sending}>
                      {sending ? "Envoi en cours…" : "Envoyer le feedback"}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
