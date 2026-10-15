import { availableGuideSlugs, loadGuide } from "@/lib/content";
import { isLocale, locales } from "@/lib/locales";
import { ogSize, renderOgCard } from "@/lib/og-card";
import { getDict } from "@/lib/ui";

/** Anteprima social di ogni guida: categoria e titolo nella lingua richiesta. */

export const alt = "Svezia Pratica";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    availableGuideSlugs()
      .filter((slug) => loadGuide(slug, locale))
      .map((slug) => ({ locale, slug })),
  );
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const lang = isLocale(locale) ? locale : "it";
  const dict = getDict(lang);
  const guide = loadGuide(slug, lang);

  return renderOgCard({
    eyebrow: guide ? dict.categories[guide.meta.category].label : dict.site.name,
    title: guide ? guide.frontmatter.title : dict.site.tagline,
    locale: lang,
    siteName: dict.site.name,
  });
}
