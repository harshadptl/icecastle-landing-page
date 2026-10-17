import { ImageResponse } from "next/og";
import { articles, getArticle } from "@/lib/articles";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  const category = article?.category ?? "ICE Castle";
  const title = article?.title ?? "ICE Castle";
  const index = article?.index ?? "01";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#05070B",
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(189,239,255,0.16), transparent 55%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: 4,
              color: "#BDEFFF",
              border: "1px solid rgba(189,239,255,0.3)",
              borderRadius: 999,
              padding: "8px 18px",
              textTransform: "uppercase",
            }}
          >
            {`B.${index}`}
          </div>
          <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: 2, color: "#8A94A6", textTransform: "uppercase" }}>
            {category}
          </div>
        </div>
        <div
          style={{
            fontSize: title.length > 70 ? 52 : 64,
            fontWeight: 800,
            lineHeight: 1.12,
            letterSpacing: -1,
            color: "#F5F7FA",
            display: "flex",
          }}
        >
          {title}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: 3, color: "#F5F7FA" }}>ICE CASTLE</div>
          <div style={{ fontSize: 18, color: "#5F6878" }}>— GPU Infrastructure, Reserved</div>
        </div>
      </div>
    ),
    size,
  );
}
