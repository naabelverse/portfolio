import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { hero, profile } from "@/content/site";

export const alt = `${profile.displayName}, ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Static TTF instances (next/og cannot read the site's variable woff2).
const font = (file: string) => readFile(join(process.cwd(), "assets/og", file));
const [display, medium, semibold] = await Promise.all([
  font("BricolageGrotesque-ExtraBold.ttf"),
  font("Figtree-Medium.ttf"),
  font("Figtree-SemiBold.ttf"),
]);

/**
 * The social card in the site's palette. next/og supports flexbox only and
 * no custom properties, so colours are the literal token values.
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
          backgroundColor: "#FAFAF7",
          color: "#111318",
          padding: 72,
          fontFamily: "Figtree",
        }}
      >
        <div style={{ display: "flex", fontFamily: "Bricolage", fontSize: 40, letterSpacing: "-0.04em" }}>
          {profile.shortName}
          <span style={{ color: "#1F43E6" }}>.</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", flexWrap: "wrap", fontFamily: "Bricolage", fontSize: 92, lineHeight: 1.03, letterSpacing: "-0.03em" }}>
            {hero.headline}
          </div>
          {/* No role here: the headline above already says it. */}
          <div style={{ display: "flex", marginTop: 28, fontSize: 32, fontWeight: 500, color: "#4A4F5C" }}>
            {profile.displayName}, {profile.universityShort}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "4px solid #111318",
            paddingTop: 26,
            fontSize: 26,
            fontWeight: 600,
          }}
        >
          <span>ForgeRoom and AI Resume Analyzer</span>
          <span style={{ color: "#1F43E6" }}>github.com/naabelverse</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Bricolage", data: display, weight: 800, style: "normal" },
        { name: "Figtree", data: medium, weight: 500, style: "normal" },
        { name: "Figtree", data: semibold, weight: 600, style: "normal" },
      ],
    },
  );
}
