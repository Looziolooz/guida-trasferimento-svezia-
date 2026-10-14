"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, ListChecks } from "lucide-react";
import type { Locale } from "@/lib/locales";
import type { Dict } from "@/lib/ui";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero({
  locale,
  dict,
  guideCount,
}: {
  locale: Locale;
  dict: Dict;
  guideCount: number;
}) {
  const reduced = useReducedMotion();

  const rise = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: EASE },
        };

  const stats = [
    { value: String(guideCount), label: dict.home.statGuides },
    { value: "3", label: dict.home.statLangs },
    { value: dict.home.statFundingValue, label: dict.home.statFunding },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Sfondo: solo CSS. Nessuna immagine, nessun video, nessun CDN. */}
      <div className="topo-field pointer-events-none absolute inset-0" aria-hidden />
      <div className="topo-lines pointer-events-none absolute inset-0" aria-hidden />
      <div className="topo-lines-2 pointer-events-none absolute inset-0" aria-hidden />
      <div className="grain pointer-events-none absolute inset-0" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-paper"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 pb-24 pt-20 sm:px-6 sm:pb-28 sm:pt-28 lg:px-8">
        <motion.p
          {...rise(0)}
          className="inline-flex items-center rounded-full border border-line bg-surface/70 px-3.5 py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.12em] text-muted backdrop-blur-sm"
        >
          {dict.home.eyebrow}
        </motion.p>

        <motion.h1
          {...rise(0.08)}
          className="mt-7 max-w-4xl font-serif text-[clamp(2.5rem,1.6rem+4.2vw,5rem)] leading-[1.02] tracking-[-0.03em]"
        >
          {dict.home.titleLead}
          <br />
          <span className="text-brand">{dict.home.titleAccent}</span>
        </motion.h1>

        <motion.p
          {...rise(0.16)}
          className="mt-7 max-w-2xl text-lg leading-relaxed text-muted"
        >
          {dict.home.lede}
        </motion.p>

        <motion.div {...rise(0.24)} className="mt-10 flex flex-wrap gap-3">
          <Link
            href={`/${locale}/checklist`}
            className="group inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-medium text-paper transition-colors hover:bg-brand-ink"
          >
            <ListChecks className="h-4 w-4" aria-hidden />
            {dict.home.ctaPrimary}
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
          <Link
            href={`/${locale}/guide`}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-5 py-3 text-sm font-medium backdrop-blur-sm transition-colors hover:border-brand hover:text-brand"
          >
            {dict.home.ctaSecondary}
          </Link>
        </motion.div>

        <motion.dl
          {...rise(0.32)}
          className="mt-16 flex flex-wrap gap-x-12 gap-y-6 border-t border-line pt-8"
        >
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="text-[0.7rem] uppercase tracking-[0.12em] text-muted">
                {stat.label}
              </dt>
              <dd className="mt-1 font-serif text-3xl tracking-tight">
                {stat.value}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
