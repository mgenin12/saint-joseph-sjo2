import type { MediaPhoto, MediaVideo } from "@/lib/types";
import { driveImageUrl } from "@/lib/text";

function toEmbedUrl(rawUrl: string): { type: "iframe" | "video"; src: string } | null {
  const url = rawUrl.trim();
  if (!url) return null;

  // YouTube (watch?v=, youtu.be/, shorts/, embed/)
  const yt = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/i,
  );
  if (yt) {
    return { type: "iframe", src: `https://www.youtube-nocookie.com/embed/${yt[1]}` };
  }

  // Vimeo
  const vimeo = url.match(/vimeo\.com\/(\d+)/i);
  if (vimeo) {
    return { type: "iframe", src: `https://player.vimeo.com/video/${vimeo[1]}` };
  }

  // Google Drive video preview
  const drive = url.match(/drive\.google\.com\/file\/d\/([^/]+)/i);
  if (drive) {
    return { type: "iframe", src: `https://drive.google.com/file/d/${drive[1]}/preview` };
  }

  // Fichier vidéo direct (.mp4, .webm, .mov)
  return { type: "video", src: url };
}

export default function MediaGallery({
  photos,
  videos,
}: {
  photos?: (string | MediaPhoto)[];
  videos?: (string | MediaVideo)[];
}) {
  const normalizedPhotos: MediaPhoto[] = (photos ?? [])
    .map((p) => (typeof p === "string" ? { url: p } : p))
    .filter((p) => Boolean(p?.url?.trim()))
    .map((p) => ({ url: driveImageUrl(p.url) ?? p.url, legende: p.legende }));

  const normalizedVideos: MediaVideo[] = (videos ?? [])
    .map((v) => (typeof v === "string" ? { url: v } : v))
    .filter((v) => Boolean(v?.url?.trim()));

  if (normalizedPhotos.length === 0 && normalizedVideos.length === 0) return null;

  return (
    <div className="media-gallery" style={{ marginTop: 32 }}>
      {normalizedVideos.length > 0 && (
        <div style={{ marginBottom: normalizedPhotos.length > 0 ? 32 : 0 }}>
          <span className="eyebrow">Vidéo{normalizedVideos.length > 1 ? "s" : ""}</span>
          <h2 style={{ fontSize: "1.45rem", marginBottom: 16 }}>
            En vidéo
          </h2>
          <div style={{ display: "grid", gap: 20 }}>
            {normalizedVideos.map((v, i) => {
              const embed = toEmbedUrl(v.url);
              if (!embed) return null;
              return (
                <figure key={`${v.url}-${i}`} style={{ margin: 0 }}>
                  {embed.type === "iframe" ? (
                    <div
                      style={{
                        position: "relative",
                        paddingBottom: "56.25%",
                        height: 0,
                        overflow: "hidden",
                        borderRadius: 14,
                        background: "#001433",
                      }}
                    >
                      <iframe
                        src={embed.src}
                        title={v.titre || `Vidéo ${i + 1}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          border: 0,
                        }}
                      />
                    </div>
                  ) : (
                    <video
                      src={embed.src}
                      controls
                      preload="metadata"
                      style={{ width: "100%", borderRadius: 14, background: "#001433" }}
                    />
                  )}
                  {v.titre && (
                    <figcaption className="small muted" style={{ marginTop: 8 }}>
                      {v.titre}
                    </figcaption>
                  )}
                </figure>
              );
            })}
          </div>
        </div>
      )}

      {normalizedPhotos.length > 0 && (
        <div>
          <span className="eyebrow">Galerie photos</span>
          <h2 style={{ fontSize: "1.45rem", marginBottom: 16 }}>
            Photos de l&apos;événement ({normalizedPhotos.length})
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 16,
            }}
          >
            {normalizedPhotos.map((p, i) => (
              <figure
                key={`${p.url}-${i}`}
                style={{
                  margin: 0,
                  background: "var(--parchment-2, #EDE5D3)",
                  borderRadius: 12,
                  overflow: "hidden",
                  border: "1px solid rgba(0,32,78,0.08)",
                }}
              >
                <a href={p.url} target="_blank" rel="noopener noreferrer">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.url}
                    alt={p.legende || `Photo ${i + 1}`}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: 210,
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </a>
                {p.legende && (
                  <figcaption className="small" style={{ padding: "10px 14px", color: "var(--ink-soft)" }}>
                    {p.legende}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
