import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Info, Languages } from "lucide-react";
import { GuideCard } from "@/components/GuideCard";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { SupportInline } from "@/components/SupportInline";
import { Toc } from "@/components/Toc";
import { availableGuideSlugs, loadGuide, renderGuide } from "@/lib/content";
import { guidesByCategory } from "@/lib/guides";
import { formatDate, localeTags, type Locale } from "@/lib/locales";
import { alternatesFor, authorName, authorSite } from "@/lib/site";
import { getDict } from "@/lib/ui";

export const dynamicParams = false;

export function generateStaticParams() {
  return availableGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const guide = loadGuide(slug, locale);
  if (!guide) return {};

  return {
    title: guide.frontmatter.title,
    description: guide.frontmatter.summary,
    keywords: guide.frontmatter.keywords,
    alternates: alternatesFor(locale, `/guide/${slug}`),
    openGraph: {
      type: "article",
      title: guide.frontmatter.title,
      description: guide.frontmatter.summary,
      modifiedTime: guide.frontmatter.updated,
      url: `/${locale}/guide/${slug}`,
      // Un `openGraph` di pagina sostituisce quello del layout invece di
      // fondersi: senza questa riga le guide condivise non hanno anteprima.
      images: [
        { url: `/${locale}/opengraph-image`, width: 1200, height: 630, alt: "Svezia Pratica" },
      ],
    },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const guide = loadGuide(slug, locale);
  if (!guide) notFound();

  const dict = getDict(locale);
  const html = await renderGuide(guide);

  const related = guidesByCategory(guide.meta.category)
    .filter((meta) => meta.slug !== slug)
    .map((meta) => loadGuide(meta.slug, locale))
    .filter((item) => item !== null)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.frontmatter.title,
    description: guide.frontmatter.summary,
    dateModified: guide.frontmatter.updated,
    inLanguage: localeTags[locale],
    isAccessibleForFree: true,
    author: { "@type": "Person", name: authorName, url: authorSite },
    publisher: { "@type": "Organization", name: dict.site.name },
  };

  return (
    <article className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link
        href={`/${locale}/guide`}
        className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        {dict.common.backToGuides}
      </Link>

      <header className="mt-8 border-b border-line pb-10">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-surface text-brand">
            <Icon name={guide.meta.icon} className="h-5 w-5" />
          </span>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-accent">
            {dict.categories[guide.meta.category].label}
          </p>
        </div>

        <h1 className="mt-6 max-w-3xl font-serif text-[clamp(2rem,1.5rem+2.4vw,3.4rem)] leading-[1.08] tracking-[-0.025em]">
          {guide.frontmatter.title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          {guide.frontmatter.summary}
        </p>

        <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.72rem] uppercase tracking-[0.08em] text-muted">
          <span>
            {dict.common.updated} {formatDate(guide.frontmatter.updated, locale)}
          </span>
          {guide.reviewed ? (
            <>
              <span aria-hidden>·</span>
              <span>
                {dict.common.reviewed} {formatDate(guide.reviewed, locale)}
              </span>
            </>
          ) : null}
          <span aria-hidden>·</span>
          <span>
            {guide.minutes} {dict.common.readingTime}
          </span>
        </p>

        {!guide.translated ? (
          <p className="mt-6 flex items-start gap-3 rounded-xl border border-line bg-raised p-4 text-sm text-muted">
            <Languages className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            {dict.common.translationMissing}
          </p>
        ) : null}
      </header>

      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-16">
        {/*
          `min-w-0`: un elemento di griglia non si restringe sotto il suo
          contenuto, e su mobile una tabella larga allargava tutta la pagina
          invece di scorrere dentro il suo riquadro.
        */}
        <div className="min-w-0">
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          {/*
            Il momento giusto per chiedere: il lettore ha appena avuto quello
            per cui era venuto. Prima delle fonti, non dopo: chi legge fino in
            fondo all'articolo raramente scorre anche l'elenco dei link.
          */}
          <SupportInline dict={dict} locale={locale} />

          {guide.frontmatter.official?.length ? (
            <section className="mt-10 rounded-card border border-line bg-surface p-6">
              <h2 className="font-serif text-xl tracking-tight">
                {dict.common.officialSources}
              </h2>
              <p className="mt-2 text-sm text-muted">
                {dict.common.officialSourcesNote}
              </p>
              <ul className="mt-5 space-y-2">
                {guide.frontmatter.official.map((source) => (
                  <li key={source.url}>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-2 text-sm text-brand"
                    >
                      <ExternalLink
                        className="mt-0.5 h-3.5 w-3.5 shrink-0"
                        aria-hidden
                      />
                      <span className="underline decoration-brand/30 underline-offset-2 group-hover:decoration-brand">
                        {source.label}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <p className="mt-8 flex items-start gap-3 rounded-xl border border-line bg-warn-soft p-4 text-sm">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-warn" aria-hidden />
            {dict.disclaimer.short}
          </p>
        </div>

        <aside className="order-first lg:order-none">
          <div className="lg:sticky lg:top-24">
            <Toc entries={guide.toc} label={dict.common.onThisPage} />
          </div>
        </aside>
      </div>

      {related.length > 0 ? (
        <section className="mt-24 border-t border-line pt-14">
          <Reveal>
            <h2 className="font-serif text-2xl tracking-tight">
              {dict.common.related}
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <GuideCard
                key={item.meta.slug}
                guide={item}
                locale={locale}
                dict={dict}
              />
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
