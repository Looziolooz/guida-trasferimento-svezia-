import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { Locale } from "@/lib/locales";
import { siteUrl } from "@/lib/site";

/**
 * Cartolina 1200×630 per le anteprime social (home e guide).
 * Colori e carattere sono quelli del sito; i font stanno in `assets/fonts/`
 * (OFL, vedi ASSETS.md) e si leggono dal disco: niente rete a runtime.
 */

export const ogSize = { width: 1200, height: 630 };

const color = {
  paper: "#faf7f2",
  ink: "#1b2a26",
  muted: "#5e6e69",
  brand: "#0e5245",
  accent: "#b34a24",
  line: "#e5ded2",
};

const fontPath = (file: string) => join(process.cwd(), "assets", "fonts", file);

const fontsPromise = Promise.all([
  readFile(fontPath("SourceSerif4-Semibold.ttf")),
  readFile(fontPath("Inter-Regular.ttf")),
  readFile(fontPath("Inter-Bold.ttf")),
]);

const claim: Record<Locale, string> = {
  it: "Gratis · Senza pubblicità · IT · SV · EN",
  sv: "Gratis · Utan reklam · IT · SV · EN",
  en: "Free · No ads · IT · SV · EN",
};

/** Più il titolo è lungo, più il corpo scende: tre righe e niente sbordi. */
function titleSize(title: string): number {
  const n = title.length;
  if (n <= 40) return 72;
  if (n <= 60) return 64;
  if (n <= 80) return 54;
  if (n <= 105) return 46;
  return 40;
}

function Contours() {
  const rings = [60, 120, 180, 240, 300, 360, 420, 480];
  return (
    <svg
      width={760}
      height={630}
      viewBox="0 0 760 630"
      style={{ position: "absolute", right: 0, top: 0 }}
    >
      {rings.map((r, i) => (
        <ellipse
          key={r}
          cx={620}
          cy={250}
          rx={r * 1.25}
          ry={r * 0.9}
          fill="none"
          stroke={color.brand}
          strokeWidth={i % 3 === 0 ? 2.5 : 1.5}
          strokeOpacity={0.24 - i * 0.02}
          transform="rotate(-14 620 250)"
        />
      ))}
      {[90, 210, 330].map((r) => (
        <ellipse
          key={`b${r}`}
          cx={700}
          cy={560}
          rx={r * 1.1}
          ry={r * 0.6}
          fill="none"
          stroke={color.accent}
          strokeWidth={1.5}
          strokeOpacity={0.12}
          transform="rotate(10 700 560)"
        />
      ))}
    </svg>
  );
}

export async function renderOgCard({
  eyebrow,
  title,
  locale,
  siteName,
}: {
  eyebrow: string;
  title: string;
  locale: Locale;
  siteName: string;
}) {
  const [serif, interRegular, interBold] = await fontsPromise;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          background: color.paper,
          color: color.ink,
          padding: "60px 80px 52px",
          borderBottom: `14px solid ${color.brand}`,
          fontFamily: "Inter",
        }}
      >
        <Contours />

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: color.brand,
              color: color.paper,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            SP
          </div>
          <div style={{ fontSize: 30, fontWeight: 700, color: color.ink }}>
            {siteName}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: color.accent,
              textTransform: "uppercase",
              letterSpacing: 4,
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              fontFamily: "Source Serif 4",
              fontWeight: 600,
              fontSize: titleSize(title),
              lineHeight: 1.1,
              letterSpacing: -1.5,
              maxWidth: 940,
              lineClamp: 3,
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: `2px solid ${color.line}`,
            paddingTop: 22,
            fontSize: 26,
          }}
        >
          <div style={{ fontWeight: 700, color: color.brand }}>
            {new URL(siteUrl).host}
          </div>
          <div style={{ color: color.muted }}>{claim[locale]}</div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Source Serif 4", data: serif, weight: 600, style: "normal" },
        { name: "Inter", data: interRegular, weight: 400, style: "normal" },
        { name: "Inter", data: interBold, weight: 700, style: "normal" },
      ],
    },
  );
}
