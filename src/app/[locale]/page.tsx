import Link from "next/link";
import { ArrowRight, Scale } from "lucide-react";
import { SupportSection } from "@/components/SupportSection";
import { Hero } from "@/components/Hero";
import { GuideCard } from "@/components/GuideCard";
import { categoryIcons } from "@/components/Icon";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { checklist, phaseLabels, phaseOrder } from "@/data/checklist";
import { loadAllGuides } from "@/lib/content";
import { categoryIds, guidesByCategory } from "@/lib/guides";
import type { Locale } from "@/lib/locales";
import { getDict } from "@/lib/ui";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDict(locale);
  const all = loadAllGuides(locale);
  const essential = all.filter((guide) => guide.meta.essential);

  return (
    <>
      <Hero locale={locale} dict={dict} guideCount={all.length} />

      {/* ── Il percorso, in ordine (nascosto finché la checklist è vuota) ── */}
      {checklist.length > 0 ? (
      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-accent">
            {dict.nav.checklist}
          </p>
          <h2 className="mt-3 max-w-2xl font-serif text-[clamp(1.75rem,1.3rem+1.8vw,2.75rem)] leading-tight tracking-[-0.02em]">
            {dict.home.pathTitle}
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted">
            {dict.home.pathLede}
          </p>
        </Reveal>

        <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {phaseOrder.map((phase, index) => {
            const steps = checklist.filter((step) => step.phase === phase);
            return (
              <RevealItem key={phase} className="h-full">
                <div className="flex h-full flex-col rounded-card border border-line bg-surface p-6">
                  <span className="font-serif text-3xl text-brand/30 tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-medium">{phaseLabels[phase][locale]}</h3>
                  <ul className="mt-4 flex-1 space-y-2 text-sm text-muted">
                    {steps.slice(0, 3).map((step) => (
                      <li key={step.id} className="flex gap-2">
                        <span
                          className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-brand"
                          aria-hidden
                        />
                        <span className="leading-snug">{step.title[locale]}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-[0.7rem] uppercase tracking-[0.08em] text-muted">
                    {steps.length} {dict.common.step.toLowerCase()}
                  </p>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <Reveal delay={0.1}>
          <Link
            href={`/${locale}/checklist`}
            className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-brand"
          >
            {dict.home.ctaPrimary}
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </Reveal>
      </section>
      ) : null}

      {/* ── Le aree ───────────────────────────────────────────────────── */}
      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="max-w-2xl font-serif text-[clamp(1.75rem,1.3rem+1.8vw,2.75rem)] leading-tight tracking-[-0.02em]">
              {dict.home.categoriesTitle}
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-muted">
              {dict.home.categoriesLede.replace("{count}", String(all.length))}
            </p>
          </Reveal>

          <RevealGroup className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categoryIds.map((category) => {
              const CategoryIcon = categoryIcons[category];
              const count = guidesByCategory(category).length;
              return (
                <RevealItem key={category} className="h-full">
                  <Link
                    href={`/${locale}/guide#${category}`}
                    className="group flex h-full flex-col rounded-card border border-line bg-paper p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40"
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-surface text-brand transition-colors group-hover:border-brand/30">
                      <CategoryIcon className="h-[18px] w-[18px]" aria-hidden />
                    </span>
                    <h3 className="mt-5 font-serif text-xl tracking-tight">
                      {dict.categories[category].label}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                      {dict.categories[category].description}
                    </p>
                    <p className="mt-5 text-[0.7rem] uppercase tracking-[0.1em] text-muted">
                      {count} {dict.home.statGuides}
                    </p>
                  </Link>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* ── Le guide essenziali ───────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="font-serif text-[clamp(1.75rem,1.3rem+1.8vw,2.75rem)] leading-tight tracking-[-0.02em]">
            {dict.common.essential}
          </h2>
        </Reveal>
        <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {essential.map((guide) => (
            <RevealItem key={guide.meta.slug} className="h-full">
              <GuideCard guide={guide} locale={locale} dict={dict} showCategory />
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* ── Due colonne editoriali ────────────────────────────────────── */}
      <section className="border-t border-line bg-surface">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-24 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
          <Reveal>
            <h2 className="font-serif text-2xl tracking-tight">
              {dict.home.freeTitle}
            </h2>
            <p className="mt-4 leading-relaxed text-muted">{dict.home.freeBody}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-serif text-2xl tracking-tight">
              {dict.home.euTitle}
            </h2>
            <p className="mt-4 leading-relaxed text-muted">{dict.home.euBody}</p>
          </Reveal>
        </div>
      </section>

      {/* ── Chi c'è dietro ────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 pt-20 sm:px-6 lg:px-8">
        <Reveal>
          <SupportSection dict={dict} locale={locale} />
        </Reveal>
      </section>

      {/* ── Disclaimer ────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col gap-5 rounded-card border border-line bg-warn-soft p-7 sm:flex-row">
            <Scale className="h-6 w-6 shrink-0 text-warn" aria-hidden />
            <div>
              <h2 className="font-medium text-warn">{dict.disclaimer.title}</h2>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed">
                {dict.disclaimer.body}
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
