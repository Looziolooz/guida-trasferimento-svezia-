"use client";

import { HeartHandshake } from "lucide-react";
import { useSupportChoice } from "./useSupportChoice";
import { formatMoney, type Locale } from "@/lib/locales";
import { supportMaxAmount } from "@/lib/site";
import type { Dict } from "@/lib/ui";

/**
 * La colonna della scelta: tre livelli contati in giorni, la cifra libera,
 * il bottone, la riga di fiducia.
 *
 * Il giorno è l'unità grande e la cifra quella piccola: "15 giorni online"
 * è un risultato, "110 kr" è solo un prezzo. I giorni derivano dai costi
 * dichiarati, non sono inventati.
 */
export function EspressoPicker({
  dict,
  locale,
}: {
  dict: Dict;
  locale: Locale;
}) {
  const copy = dict.support.campaign;
  const choice = useSupportChoice(locale, copy.transferNote);
  const amount = formatMoney(choice.amount, choice.currency, locale);

  return (
    <div className="flex flex-col gap-4">
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-muted">
        {copy.chooseLevel}
      </p>

      <div
        role="group"
        aria-label={copy.heading}
        className="grid grid-cols-3 gap-2"
      >
        {choice.tiers.map((tier) => (
          <button
            key={tier.key}
            type="button"
            aria-pressed={tier.selected}
            onClick={() => choice.pick(tier.index)}
            className={`flex min-h-16 flex-col items-start justify-center gap-0.5 rounded-xl text-left transition-colors ${
              tier.selected
                ? "border-2 border-accent bg-accent-soft px-2.75 py-2.25 text-accent"
                : "border border-line bg-surface px-3 py-2.5 text-ink hover:border-accent/40"
            }`}
          >
            <span className="text-[0.95rem] font-semibold leading-tight tabular-nums">
              {copy.daysCount.replace("{days}", String(tier.days))}
            </span>
            <span
              className={`text-xs tabular-nums ${tier.selected ? "" : "text-muted"}`}
            >
              {formatMoney(tier.amount, choice.currency, locale)}
            </span>
          </button>
        ))}
      </div>

      <label
        className={`flex min-h-11 items-center gap-2 rounded-xl transition-colors ${
          choice.usingCustom
            ? "border-2 border-accent bg-accent-soft px-2.75 py-1.75"
            : "border border-line bg-surface px-3 py-2"
        }`}
      >
        <span className="text-xs text-muted">{copy.custom}</span>
        <input
          type="number"
          inputMode="numeric"
          min={1}
          max={supportMaxAmount}
          step={1}
          value={choice.custom}
          onChange={(event) => choice.type(event.target.value)}
          aria-label={copy.customLabel}
          placeholder="—"
          className="min-w-0 flex-1 bg-transparent text-right text-sm tabular-nums outline-none placeholder:text-muted"
        />
        <span className="text-xs text-muted tabular-nums">{choice.currency}</span>
      </label>

      <p className="text-xs leading-relaxed text-muted">{copy.listing}</p>

      <div>
        <a
          href={choice.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-center gap-2.5 rounded-full bg-accent px-5 py-3.5 text-[0.95rem] font-semibold text-paper transition-opacity hover:opacity-90"
        >
          <HeartHandshake className="h-4.5 w-4.5 shrink-0 transition-transform duration-300 group-hover:-rotate-6" aria-hidden />
          {/* Sotto i due giorni la cifra parla da sola: "0 giorni" sarebbe un rimprovero. */}
          {choice.days >= 2
            ? copy.submitDays
                .replace("{amount}", amount)
                .replace("{days}", String(choice.days))
            : copy.submit.replace("{amount}", amount)}
        </a>
        <p className="mt-3 text-center text-xs leading-relaxed text-muted">
          {copy.trust}
        </p>
      </div>
    </div>
  );
}
