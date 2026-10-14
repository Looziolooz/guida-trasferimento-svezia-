import type { Metadata } from "next";
import { GuideCard } from "@/components/GuideCard";
import { categoryIcons } from "@/components/Icon";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { loadGuide } from "@/lib/content";
import { categoryIds, guides, guidesByCategory } from "@/lib/guides";
import type { Locale } from "@/lib/locales";
import { alternatesFor } from "@/lib/site";
import { getDict } from "@/lib/ui";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDict(locale);
  return {
    title: dict.pages.guides.title,
    description: dict.pages.guides.lede.replace(
      "{count}",
      String(guides.length),
    ),
    alternates: alternatesFor(locale, "/guide"),
  };
}

export default async function GuidesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDict(locale);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <Reveal>
        <h1 className="font-serif text-[clamp(2rem,1.5rem+2.2vw,3.25rem)] leading-tight tracking-[-0.025em]">
          {dict.pages.guides.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
          {dict.pages.guides.lede.replace("{count}", String(guides.length))}
        </p>
      </Reveal>

      <nav className="mt-10 flex flex-wrap gap-2" aria-label={dict.common.filter}>
        {categoryIds.map((category) => (
          <a
            key={category}
            href={`#${category}`}
            className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm text-muted transition-colors hover:border-brand hover:text-brand"
          >
            {dict.categories[category].label}
          </a>
        ))}
      </nav>

      <div className="mt-16 space-y-20">
        {categoryIds.map((category) => {
          const CategoryIcon = categoryIcons[category];
          const items = guidesByCategory(category)
            .map((meta) => loadGuide(meta.slug, locale))
            .filter((guide) => guide !== null);

          if (items.length === 0) return null;

          return (
            <section key={category} id={category}>
              <Reveal>
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-xl border border-line bg-surface text-brand">
                    <CategoryIcon className="h-4 w-4" aria-hidden />
                  </span>
                  <h2 className="font-serif text-2xl tracking-tight">
                    {dict.categories[category].label}
                  </h2>
                </div>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                  {dict.categories[category].description}
                </p>
              </Reveal>

              <RevealGroup className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((guide) => (
                  <RevealItem key={guide.meta.slug} className="h-full">
                    <GuideCard guide={guide} locale={locale} dict={dict} />
                  </RevealItem>
                ))}
              </RevealGroup>
            </section>
          );
        })}
      </div>
    </div>
  );
}
