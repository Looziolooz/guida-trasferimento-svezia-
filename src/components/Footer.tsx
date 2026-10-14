import Link from "next/link";
import { AuthorCredit } from "./AuthorCredit";
import { categoryIds, guidesByCategory } from "@/lib/guides";
import { loadGuide } from "@/lib/content";
import { localeNames, locales, type Locale } from "@/lib/locales";
import { authorSiteFor } from "@/lib/site";
import type { Dict } from "@/lib/ui";

export function Footer({ locale, dict }: { locale: Locale; dict: Dict }) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-line bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <p className="font-serif text-xl tracking-tight">{dict.site.name}</p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">
              {dict.site.tagline}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {locales.map((item) => (
                <Link
                  key={item}
                  href={`/${item}`}
                  hrefLang={item}
                  className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                    item === locale
                      ? "border-brand bg-brand-soft text-brand-ink"
                      : "border-line text-muted hover:text-ink"
                  }`}
                >
                  {localeNames[item]}
                </Link>
              ))}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {categoryIds.slice(0, 3).map((category) => (
              <FooterColumn
                key={category}
                locale={locale}
                title={dict.categories[category].label}
                slugs={guidesByCategory(category).map((g) => g.slug)}
              />
            ))}
            {categoryIds.slice(3).map((category) => (
              <FooterColumn
                key={category}
                locale={locale}
                title={dict.categories[category].label}
                slugs={guidesByCategory(category).map((g) => g.slug)}
              />
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-8 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <AuthorCredit dict={dict} locale={locale} />
            <p>{dict.footer.built}</p>
            <p>{dict.footer.sources}</p>
          </div>
          <div className="space-y-1 sm:text-right">
            <p>{dict.footer.license}</p>
            <p>
              <a
                href={authorSiteFor(locale)}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-ink"
              >
                {dict.footer.contribute}
              </a>
            </p>
            <p>© {year} · {dict.site.name}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  locale,
  title,
  slugs,
}: {
  locale: Locale;
  title: string;
  slugs: string[];
}) {
  return (
    <div>
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-muted">
        {title}
      </p>
      <ul className="mt-3 space-y-2">
        {slugs.map((slug) => {
          const guide = loadGuide(slug, locale);
          if (!guide) return null;
          return (
            <li key={slug}>
              <Link
                href={`/${locale}/guide/${slug}`}
                className="text-sm text-muted transition-colors hover:text-ink"
              >
                {guide.frontmatter.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
