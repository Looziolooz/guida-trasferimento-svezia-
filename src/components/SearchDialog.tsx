"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import type { Locale } from "@/lib/locales";
import type { Dict } from "@/lib/ui";

export type SearchEntry = {
  /** titolo */
  t: string;
  /** sommario */
  s: string;
  /** percorso senza prefisso di lingua */
  u: string;
  /** testo extra su cui cercare */
  k: string;
  kind: "guide" | "page" | "glossary" | "entity";
};

/** Intervallo dei segni diacritici combinanti, U+0300–U+036F. */
const COMBINING = new RegExp(
  `[${String.fromCharCode(0x300)}-${String.fromCharCode(0x36f)}]`,
  "g",
);

/** Le ricerche arrivano da tre lingue: gli accenti non devono pesare. */
function normalize(value: string): string {
  return value.toLowerCase().normalize("NFD").replace(COMBINING, "");
}

function score(entry: SearchEntry, tokens: string[]): number {
  const title = normalize(entry.t);
  const summary = normalize(entry.s);
  const extra = normalize(entry.k);
  let total = 0;

  for (const token of tokens) {
    if (title.startsWith(token)) total += 12;
    else if (title.includes(token)) total += 8;
    else if (summary.includes(token)) total += 4;
    else if (extra.includes(token)) total += 1.5;
    else return 0;
  }
  return total;
}

/**
 * Montato solo quando è aperto: lo stato riparte pulito a ogni apertura,
 * senza doverlo azzerare in un effect.
 */
export function SearchDialog({
  onClose,
  locale,
  dict,
  index,
}: {
  onClose: () => void;
  locale: Locale;
  dict: Dict;
  index: SearchEntry[];
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const results = useMemo(() => {
    const tokens = normalize(query).split(/\s+/).filter(Boolean);
    if (tokens.length === 0) {
      return index.filter((entry) => entry.kind === "guide").slice(0, 6);
    }
    return index
      .map((entry) => ({ entry, value: score(entry, tokens) }))
      .filter((row) => row.value > 0)
      .sort((a, b) => b.value - a.value)
      .slice(0, 12)
      .map((row) => row.entry);
  }, [query, index]);

  const go = (entry: SearchEntry) => {
    onClose();
    router.push(`/${locale}${entry.u}`);
  };

  const kindLabel: Record<SearchEntry["kind"], string> = {
    guide: dict.nav.guides,
    page: dict.site.name,
    glossary: dict.nav.glossary,
    entity: dict.nav.entities,
  };

  return (
    <div
      className="fixed inset-0 z-70 flex items-start justify-center bg-ink/40 px-4 pt-[12vh] backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={dict.common.search}
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl shadow-ink/20"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search className="h-4 w-4 shrink-0 text-muted" aria-hidden />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(0);
            }}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown") {
                event.preventDefault();
                setActive((i) => Math.min(i + 1, results.length - 1));
              } else if (event.key === "ArrowUp") {
                event.preventDefault();
                setActive((i) => Math.max(i - 1, 0));
              } else if (event.key === "Enter" && results[active]) {
                event.preventDefault();
                go(results[active]);
              }
            }}
            placeholder={dict.common.searchPlaceholder}
            className="h-14 w-full bg-transparent text-base outline-none placeholder:text-muted"
            aria-label={dict.common.search}
          />
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-muted hover:text-ink"
            aria-label={dict.nav.close}
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>

        <div className="max-h-[55vh] overflow-y-auto p-2">
          {results.length === 0 ? (
            <p className="px-3 py-8 text-center text-sm text-muted">
              {dict.common.noResults}
            </p>
          ) : (
            results.map((entry, i) => (
              <button
                key={`${entry.kind}-${entry.u}-${entry.t}`}
                type="button"
                onMouseEnter={() => setActive(i)}
                onClick={() => go(entry)}
                className={`flex w-full flex-col gap-0.5 rounded-xl px-3 py-2.5 text-left transition-colors ${
                  i === active ? "bg-brand-soft" : "hover:bg-raised"
                }`}
              >
                <span className="flex items-baseline gap-2">
                  <span className="text-sm font-medium">{entry.t}</span>
                  <span className="text-[0.65rem] uppercase tracking-wider text-muted">
                    {kindLabel[entry.kind]}
                  </span>
                </span>
                <span className="line-clamp-1 text-xs text-muted">
                  {entry.s}
                </span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
