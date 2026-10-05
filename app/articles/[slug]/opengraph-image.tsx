import { ImageResponse } from "next/og";
import { getArticle } from "@/lib/articles";
import { formatDateLong } from "@/lib/dates";

export const alt = "Article du projet SJO2 — Église Saint Joseph, Le Rouret";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const revalidate = 600;

/** Image Open Graph générée pour chaque article (titre, catégorie, visuel éventuel). */
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  const titre = article?.titre ?? "Église Saint Joseph — Projet SJO2";
  const cat = article?.categories[0] ?? "Le projet";
  const date = article?.date ? formatDateLong(article.date) : "";
  const image = article?.image;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "linear-gradient(160deg, #00204e 0%, #001433 100%)",
          color: "#f3eee2",
          fontFamily: "serif",
        }}
      >
        {image && (
          <img
            src={image}
            alt=""
            width={1200}
            height={630}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.35 }}
          />
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 72px",
            width: "100%",
            height: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26, letterSpacing: 6, textTransform: "uppercase", color: "#e2c97f" }}>
            <div style={{ width: 48, height: 2, background: "#e2c97f" }} />
            {cat}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ fontSize: titre.length > 60 ? 54 : 66, lineHeight: 1.1, fontWeight: 600, maxWidth: 1000 }}>{titre}</div>
            {date && <div style={{ fontSize: 26, color: "#cdd3df" }}>{date}</div>}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: 26 }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 34, fontWeight: 700 }}>Église Saint Joseph</div>
              <div style={{ color: "#cdd3df", fontSize: 22, letterSpacing: 3, textTransform: "uppercase" }}>Paroisse Saint-Arnoux · Le Rouret</div>
            </div>
            <div style={{ color: "#e2c97f" }}>Projet SJO2 · 2030</div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
