import { ImageResponse } from "next/og";
import { isLocale, locales } from "@/lib/locales";
import { siteUrl } from "@/lib/site";
import { getDict } from "@/lib/ui";

/**
 * L'anteprima che compare quando il link viene condiviso (Facebook,
 * WhatsApp, Slack). Senza, Facebook mostra un riquadro di solo testo o
 * pesca un'immagine a caso dalla pagina.
 *
 * Generata dal codice, una per lingua, al momento della build: niente file
 * da tenere allineati, nessuna immagine di terzi. Vale anche per le guide,
 * che la ereditano.
 */

export const alt = "Svezia Pratica";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDict(isLocale(locale) ? locale : "it");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#faf7f2",
          color: "#1b2a26",
          padding: "72px 80px",
          borderBottom: "14px solid #0e5245",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "#0e5245",
              color: "#faf7f2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              fontWeight: 700,
            }}
          >
            SP
          </div>
          <div style={{ fontSize: 36, fontWeight: 700 }}>{dict.site.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: -1.5,
              maxWidth: 980,
            }}
          >
            {dict.site.tagline}
          </div>
          <div style={{ fontSize: 30, color: "#5e6e69" }}>{dict.home.eyebrow}</div>
        </div>

        <div style={{ fontSize: 28, color: "#b34a24", fontWeight: 700 }}>
          {new URL(siteUrl).host}
        </div>
      </div>
    ),
    size,
  );
}
