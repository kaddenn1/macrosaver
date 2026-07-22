import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";

export const alt = `${SITE_NAME} supplement value comparison`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
        }}
      >
        <div style={{ display: "flex", fontSize: 120, fontWeight: 900, letterSpacing: -2 }}>
          <span style={{ color: "#a3e635" }}>Macro</span>
          <span style={{ color: "#ffffff" }}>Saver</span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 32,
            fontWeight: 700,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "rgba(163, 230, 53, 0.8)",
            marginTop: 24,
          }}
        >
          Know Where Every Dollar Goes
        </div>
      </div>
    ),
    { ...size }
  );
}
