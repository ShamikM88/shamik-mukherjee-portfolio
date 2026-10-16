import { ImageResponse } from "next/og";
import { identity } from "@/data/content";

export const dynamic = "force-static";
export const alt = "Evidence — I like hard problems. Product leadership at the point where business ambiguity meets engineering reality.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand palette, copied from tailwind.config.ts's brand/ink scales so this route
// doesn't depend on Tailwind's runtime (satori renders from inline styles only).
const BRAND_950 = "#04241c";
const BRAND_500 = "#149c72";
const BRAND_300 = "#5fe0ac";
const BRAND_800_TRANSLUCENT = "rgba(9, 79, 61, 0.55)";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 80px",
          backgroundColor: BRAND_950,
          backgroundImage: `radial-gradient(ellipse 900px 500px at 85% 0%, rgba(20,156,114,0.25), transparent 60%)`,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 72,
              height: 72,
              borderRadius: 16,
              backgroundColor: BRAND_500,
              color: "white",
              fontSize: 28,
              fontWeight: 700,
              marginBottom: 40,
            }}
          >
            SM
          </div>
          <div style={{ display: "flex", fontSize: 64, fontWeight: 700, color: "white" }}>
            {identity.name}
          </div>
          <div style={{ display: "flex", fontSize: 30, color: BRAND_300, marginTop: 16 }}>
            I like hard problems.
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#e2e8f0", marginTop: 12 }}>
            Digital Payments · AI Engineering · Technical Delivery
          </div>
        </div>

        <div style={{ display: "flex", gap: 24 }}>
          {
          ["Product leadership", "Payments", "AI"].map((label) => (
            <div
              key={label}
              style={{
                display: "flex",
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: BRAND_800_TRANSLUCENT,
                borderRadius: 16,
                padding: "28px 24px",
              }}
            >
              <div style={{ display: "flex", fontSize: 24, color: "#cbd5e1" }}>{label}</div>
            </div>
          ))
        }
        </div>
      </div>
    ),
    { ...size }
  );
}
