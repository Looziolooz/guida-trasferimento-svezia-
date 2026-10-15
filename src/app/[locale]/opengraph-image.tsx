import { isLocale, locales } from "@/lib/locales";
import { ogSize, renderOgCard } from "@/lib/og-card";
import { getDict } from "@/lib/ui";

/**
 * L'anteprima che compare quando il link viene condiviso (Facebook,
 * WhatsApp, Slack). Generata dal codice, una per lingua, alla build.
 * Le guide hanno la loro (vedi guide/[slug]/opengraph-image.tsx).
 */

export const alt = "Svezia Pratica";
export const size = ogSize;
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
  const lang = isLocale(locale) ? locale : "it";
  const dict = getDict(lang);

  return renderOgCard({
    eyebrow: dict.home.eyebrow,
    title: dict.site.tagline,
    locale: lang,
    siteName: dict.site.name,
  });
}
