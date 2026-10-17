import { ImageResponse } from "next/og";
import { locations } from "@/lib/locations";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
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
            display: "flex",
            alignSelf: "flex-start",
          }}
        >
          Capacity
        </div>
        <div
          style={{
            fontSize: 60,
            fontWeight: 800,
            lineHeight: 1.12,
            letterSpacing: -1,
            color: "#F5F7FA",
            display: "flex",
          }}
        >
          GPU capacity by location
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {locations.map((loc) => (
              <div
                key={loc.region}
                style={{
                  fontSize: 20,
                  fontWeight: 600,
                  color: "#A7B0BF",
                  border: "1px solid rgba(255,255,255,0.14)",
                  borderRadius: 999,
                  padding: "8px 18px",
                }}
              >
                {loc.region}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: 3, color: "#F5F7FA" }}>ICE CASTLE</div>
            <div style={{ fontSize: 18, color: "#5F6878" }}>— 100–200 GPUs · HIPAA · SOC 2</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
