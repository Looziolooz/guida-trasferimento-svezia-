import type { MetadataRoute } from "next";
import { locales } from "@/lib/locales";
import { availableGuideSlugs, loadGuide } from "@/lib/content";
import { siteUrl } from "@/lib/site";

const staticPaths = ["", "/guide", "/checklist", "/enti", "/glossario", "/info"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const path of staticPaths) {
    for (const locale of locales) {
      entries.push({
        url: `${siteUrl}/${locale}${path}`,
        changeFrequency: "monthly",
        priority: path === "" ? 1 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((item) => [item, `${siteUrl}/${item}${path}`]),
          ),
        },
      });
    }
  }

  for (const slug of availableGuideSlugs()) {
    for (const locale of locales) {
      const guide = loadGuide(slug, locale);
      entries.push({
        url: `${siteUrl}/${locale}/guide/${slug}`,
        lastModified: guide?.frontmatter.updated,
        changeFrequency: "monthly",
        priority: 0.9,
        alternates: {
          languages: Object.fromEntries(
            locales.map((item) => [item, `${siteUrl}/${item}/guide/${slug}`]),
          ),
        },
      });
    }
  }

  return entries;
}
