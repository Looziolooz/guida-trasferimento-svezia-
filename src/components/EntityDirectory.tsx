"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ExternalLink, Phone, Search } from "lucide-react";
import { entities, entityLevels, type EntityLevel } from "@/data/entities";
import type { Locale } from "@/lib/locales";
import type { Dict } from "@/lib/ui";

const COMBINING = new RegExp(
  `[${String.fromCharCode(0x300)}-${String.fromCharCode(0x36f)}]`,
  "g",
);

function normalize(value: string): string {
  return value.toLowerCase().normalize("NFD").replace(COMBINING, "");
}

export function EntityDirectory({
  locale,
  dict,
  guideTitles,
}: {
  locale: Locale;
  dict: Dict;
  guideTitles: Record<string, string>;
}) {
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState<EntityLevel | "all">("all");

  const results = useMemo(() => {
    const tokens = normalize(query).split(/\s+/).filter(Boolean);
    return entities.filter((entity) => {
      if (level !== "all" && entity.level !== level) return false;
      if (tokens.length === 0) return true;
      const haystack = normalize(
        `${entity.name} ${entity.what[locale]} ${entity.where[locale]}`,
      );
      return tokens.every((token) => haystack.includes(token));
    });
  }, [query, level, locale]);

  const levelStyles: Record<EntityLevel, string> = {
    stato: "bg-brand-soft text-brand-ink",
    regione: "bg-accent-soft text-accent",
    comune: "bg-raised text-ink",
    altro: "bg-raised text-muted",
  };

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="flex flex-1 items-center gap-2 rounded-full border border-line bg-surface px-4">
          <Search className="h-4 w-4 shrink-0 text-muted" aria-hidden />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={dict.common.searchPlaceholder}
            className="h-11 w-full bg-transparent text-sm outline-none placeholder:text-muted"
            aria-label={dict.common.search}
          />
        </label>

        <div className="flex flex-wrap gap-2">
          <FilterChip
            active={level === "all"}
            onClick={() => setLevel("all")}
            label={dict.common.all}
          />
          {entityLevels.map((item) => (
            <FilterChip
              key={item}
              active={level === item}
              onClick={() => setLevel(item)}
              label={dict.pages.entities.levels[item]}
            />
          ))}
        </div>
      </div>

      {results.length === 0 ? (
        <p className="py-16 text-center text-sm text-muted">
          {dict.common.noResults}
        </p>
      ) : (
        <ul className="mt-8 space-y-4">
          {results.map((entity) => (
            <li
              key={entity.id}
              id={entity.id}
              className="rounded-card border border-line bg-surface p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h2 className="font-serif text-xl leading-snug tracking-tight">
                  {entity.name}
                </h2>
                <span
                  className={`rounded-full px-2.5 py-1 text-[0.68rem] font-medium uppercase tracking-[0.08em] ${
                    levelStyles[entity.level]
                  }`}
                >
                  {dict.pages.entities.levels[entity.level]}
                </span>
              </div>

              <dl className="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-muted">
                    {dict.pages.entities.whatFor}
                  </dt>
                  <dd className="mt-1.5 text-sm leading-relaxed">
                    {entity.what[locale]}
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-muted">
                    {dict.pages.entities.where}
                  </dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-muted">
                    {entity.where[locale]}
                  </dd>
                </div>
              </dl>

              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                {entity.site ? (
                  <a
                    href={entity.site}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-brand underline decoration-brand/30 underline-offset-2 hover:decoration-brand"
                  >
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                    {dict.common.openOfficial}
                  </a>
                ) : null}
                {entity.phone ? (
                  <span className="inline-flex items-center gap-1.5 text-muted">
                    <Phone className="h-3.5 w-3.5" aria-hidden />
                    <span className="tabular-nums">{entity.phone}</span>
                  </span>
                ) : null}
              </div>

              {entity.guides?.length ? (
                <div className="mt-5 flex flex-wrap gap-2 border-t border-line pt-4">
                  {entity.guides.map((slug) =>
                    guideTitles[slug] ? (
                      <Link
                        key={slug}
                        href={`/${locale}/guide/${slug}`}
                        className="rounded-full border border-line px-3 py-1 text-xs text-muted transition-colors hover:border-brand hover:text-brand"
                      >
                        {guideTitles[slug]}
                      </Link>
                    ) : null,
                  )}
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
        active
          ? "border-brand bg-brand-soft text-brand-ink"
          : "border-line bg-surface text-muted hover:text-ink"
      }`}
    >
      {label}
    </button>
  );
}
