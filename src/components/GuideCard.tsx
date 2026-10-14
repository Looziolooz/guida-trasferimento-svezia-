import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Icon } from "./Icon";
import type { LoadedGuide } from "@/lib/content";
import { formatDate, type Locale } from "@/lib/locales";
import type { Dict } from "@/lib/ui";

export function GuideCard({
  guide,
  locale,
  dict,
  showCategory = false,
}: {
  guide: LoadedGuide;
  locale: Locale;
  dict: Dict;
  showCategory?: boolean;
}) {
  return (
    <Link
      href={`/${locale}/guide/${guide.meta.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg hover:shadow-ink/5"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-brand-soft to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden
      />

      <div className="relative flex items-start justify-between gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line bg-raised text-brand">
          <Icon name={guide.meta.icon} className="h-[18px] w-[18px]" />
        </span>
        <ArrowUpRight
          className="h-4 w-4 shrink-0 text-muted opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
          aria-hidden
        />
      </div>

      <h3 className="relative mt-5 font-serif text-xl leading-snug tracking-tight">
        {guide.frontmatter.title}
      </h3>
      <p className="relative mt-2 flex-1 text-sm leading-relaxed text-muted">
        {guide.frontmatter.summary}
      </p>

      <div className="relative mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.7rem] uppercase tracking-[0.08em] text-muted">
        {guide.meta.essential ? (
          <span className="rounded-full bg-accent-soft px-2 py-0.5 font-medium text-accent">
            {dict.common.essential}
          </span>
        ) : null}
        {showCategory ? (
          <span>{dict.categories[guide.meta.category].label}</span>
        ) : null}
        <span>
          {guide.minutes} {dict.common.readingTime}
        </span>
        <span className="hidden sm:inline">
          {formatDate(guide.lastTouched, locale)}
        </span>
      </div>
    </Link>
  );
}
