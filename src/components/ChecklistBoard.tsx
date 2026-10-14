"use client";

import Link from "next/link";
import { useMemo } from "react";
import { ArrowRight, Check, RotateCcw } from "lucide-react";
import { checklist, phaseLabels, phaseOrder } from "@/data/checklist";
import { useStoredState } from "@/lib/client-store";
import type { Locale } from "@/lib/locales";
import type { Dict } from "@/lib/ui";

const STORAGE_KEY = "ip-checklist";

/** Riferimento stabile: è anche lo snapshot lato server. */
const NOTHING_DONE: Record<string, boolean> = {};

export function ChecklistBoard({
  locale,
  dict,
  guideTitles,
}: {
  locale: Locale;
  dict: Dict;
  guideTitles: Record<string, string>;
}) {
  const [done, setDone] = useStoredState(STORAGE_KEY, NOTHING_DONE);

  const toggle = (id: string) => setDone({ ...done, [id]: !done[id] });

  const completed = useMemo(
    () => checklist.filter((step) => done[step.id]).length,
    [done],
  );
  // Con la lista vuota (0/0) la percentuale sarebbe NaN.
  const percent =
    checklist.length === 0 ? 0 : Math.round((completed / checklist.length) * 100);

  return (
    <div>
      <div className="sticky top-16 z-30 -mx-4 border-b border-line bg-paper/90 px-4 py-4 backdrop-blur-xl sm:-mx-6 sm:px-6">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="flex items-baseline justify-between text-sm">
              <span className="font-medium tabular-nums">
                {completed} / {checklist.length}
              </span>
              <span className="text-muted">
                {percent}% {dict.common.progress}
              </span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-raised">
              <div
                className="h-full rounded-full bg-brand transition-[width] duration-500 ease-out"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
          <button
            type="button"
            onClick={() => setDone(NOTHING_DONE)}
            className="flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs text-muted transition-colors hover:text-ink"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden />
            {dict.common.reset}
          </button>
        </div>
      </div>

      <div className="mt-12 space-y-16">
        {phaseOrder.map((phase, phaseIndex) => {
          const steps = checklist.filter((step) => step.phase === phase);
          // Fasi senza passi: non si mostrano.
          if (steps.length === 0) return null;
          const phaseDone = steps.filter((step) => done[step.id]).length;

          return (
            <section key={phase}>
              <div className="flex items-baseline gap-4">
                <span className="font-serif text-3xl text-brand/30 tabular-nums">
                  {String(phaseIndex + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="font-serif text-2xl tracking-tight">
                    {phaseLabels[phase][locale]}
                  </h2>
                  <p className="mt-1 text-[0.72rem] uppercase tracking-[0.08em] text-muted">
                    {phaseDone} {dict.common.of} {steps.length}{" "}
                    {dict.pages.checklist.done}
                  </p>
                </div>
              </div>

              <ul className="mt-6 space-y-3">
                {steps.map((step) => {
                  const checked = Boolean(done[step.id]);
                  return (
                    <li key={step.id}>
                      <div
                        className={`rounded-card border p-5 transition-colors ${
                          checked
                            ? "border-brand/30 bg-brand-soft"
                            : "border-line bg-surface"
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <button
                            type="button"
                            role="checkbox"
                            aria-checked={checked}
                            onClick={() => toggle(step.id)}
                            className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md border transition-colors ${
                              checked
                                ? "border-brand bg-brand text-paper"
                                : "border-line bg-paper hover:border-brand"
                            }`}
                          >
                            {checked ? (
                              <Check className="h-4 w-4" aria-hidden />
                            ) : null}
                          </button>

                          <div className="min-w-0 flex-1">
                            <p
                              className={`font-medium leading-snug ${
                                checked ? "text-muted line-through" : ""
                              }`}
                            >
                              {step.title[locale]}
                            </p>
                            <p className="mt-2 text-sm leading-relaxed text-muted">
                              {step.detail[locale]}
                            </p>
                            {step.guide && guideTitles[step.guide] ? (
                              <Link
                                href={`/${locale}/guide/${step.guide}`}
                                className="group mt-3 inline-flex items-center gap-1.5 text-sm text-brand"
                              >
                                {guideTitles[step.guide]}
                                <ArrowRight
                                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                                  aria-hidden
                                />
                              </Link>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>

      <p className="mt-16 text-center text-xs text-muted">
        {dict.pages.checklist.note}
      </p>
    </div>
  );
}
