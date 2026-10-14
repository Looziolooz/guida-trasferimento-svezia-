"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { glossary } from "@/data/glossary";
import { categoryIds, type CategoryId } from "@/lib/guides";
import { localeShort, type Locale } from "@/lib/locales";
import { slugify } from "@/lib/slug";
import type { Dict } from "@/lib/ui";

const COMBINING = new RegExp(
  `[${String.fromCharCode(0x300)}-${String.fromCharCode(0x36f)}]`,
  "g",
);

function normalize(value: string): string {
  return value.toLowerCase().normalize("NFD").replace(COMBINING, "");
}

export function GlossaryList({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dict;
}) {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState<CategoryId | "all">("all");

  const results = useMemo(() => {
    const tokens = normalize(query).split(/\s+/).filter(Boolean);
    return glossary
      .filter((term) => {
        if (group !== "all" && term.group !== group) return false;
        if (tokens.length === 0) return true;
        const haystack = normalize(
          `${term.it} ${term.sv} ${term.en} ${term.note[locale]}`,
        );
        return tokens.every((token) => haystack.includes(token));
      })
      .sort((a, b) => a.sv.localeCompare(b.sv, "sv"));
  }, [query, group, locale]);

  /** In svedese la colonna "traduzione" mostrerebbe lo svedese due volte. */
  const translationLocale: Locale = locale === "sv" ? "en" : locale;

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
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Chip
          active={group === "all"}
          onClick={() => setGroup("all")}
          label={dict.common.all}
        />
        {categoryIds.map((item) => (
          <Chip
            key={item}
            active={group === item}
            onClick={() => setGroup(item)}
            label={dict.categories[item].label}
          />
        ))}
      </div>

      {results.length === 0 ? (
        <p className="py-16 text-center text-sm text-muted">
          {dict.common.noResults}
        </p>
      ) : (
        <dl className="mt-10 divide-y divide-line border-y border-line">
          {results.map((term) => (
            <div
              key={term.sv}
              id={slugify(term.sv)}
              className="grid gap-2 py-6 sm:grid-cols-[14rem_1fr] sm:gap-8"
            >
              <dt>
                <p className="font-medium leading-snug">{term.sv}</p>
                <p className="mt-1 text-sm text-muted">
                  <span className="mr-1.5 text-[0.65rem] uppercase tracking-wider">
                    {localeShort[translationLocale]}
                  </span>
                  {term[translationLocale]}
                </p>
              </dt>
              <dd className="text-sm leading-relaxed text-muted">
                {term.note[locale]}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}

function Chip({
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
