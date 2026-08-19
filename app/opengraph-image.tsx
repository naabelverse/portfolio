import { ImageResponse } from "next/og";

import { profile } from "@/content/site";

export const alt = `${profile.displayName} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The social card, drawn with the same tokens as the site.
 *
 * next/og supports a subset of CSS — flexbox only, no grid, no custom
 * properties — so the values here are the literal hex codes from DESIGN.md
 * rather than the theme variables used everywhere else.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#010102",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 44,
              height: 44,
              borderRadius: 8,
              backgroundColor: "#2dd4bf",
              color: "#010102",
              fontSize: 26,
              fontWeight: 600,
            }}
          >
            N
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#8a8f98" }}>
            {profile.university}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 82,
              fontWeight: 600,
              letterSpacing: "-0.035em",
              color: "#f7f8f8",
              lineHeight: 1.05,
            }}
          >
            {profile.displayName}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: 34,
              color: "#d0d6e0",
            }}
          >
            {profile.role} · Flutter, Node.js, MongoDB
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #23252a",
            paddingTop: 28,
            fontSize: 24,
            color: "#8a8f98",
          }}
        >
          <div style={{ display: "flex" }}>ForgeRoom — final-year project</div>
          <div style={{ display: "flex", color: "#2dd4bf" }}>
            github.com/naabelverse
          </div>
        </div>
      </div>
    ),
    size,
  );
}
