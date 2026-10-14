"use client";

import { useEffect, useState } from "react";
import type { TocEntry } from "@/lib/markdown";

export function Toc({ entries, label }: { entries: TocEntry[]; label: string }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const headings = entries
      .map((entry) => document.getElementById(entry.id))
      .filter((element): element is HTMLElement => element !== null);

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (records) => {
        const visible = records
          .filter((record) => record.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      // La banda stretta in alto evita che tre titoli risultino attivi insieme.
      { rootMargin: "-88px 0px -70% 0px", threshold: 0 },
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [entries]);

  if (entries.length < 2) return null;

  return (
    <nav aria-label={label} className="text-sm">
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-muted">
        {label}
      </p>
      <ul className="mt-4 space-y-1 border-l border-line">
        {entries.map((entry) => (
          <li key={entry.id}>
            <a
              href={`#${entry.id}`}
              className={`-ml-px block border-l py-1 leading-snug transition-colors ${
                entry.depth === 3 ? "pl-6 text-[0.8rem]" : "pl-4"
              } ${
                active === entry.id
                  ? "border-brand text-brand"
                  : "border-transparent text-muted hover:text-ink"
              }`}
            >
              {entry.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
