"use client";

import { HeartHandshake } from "lucide-react";
import { useSupportChoice } from "./useSupportChoice";
import { daysCovered, daysInYear, weeklyCostFor } from "@/data/goals";
import { donorWall } from "@/data/donors";
import { formatDate, formatMoney, type Locale } from "@/lib/locales";
import { supportAmountsEnabled, supportEnabled } from "@/lib/site";
import type { Dict } from "@/lib/ui";

/**
 * La richiesta in fondo a ogni guida, nel momento giusto: il lettore ha
 * appena ottenuto quello per cui era venuto.
 *
 * Compatta, una domanda e una riga: la pagina viene controllata sulle fonti
 * e ogni livello la tiene online tot giorni. Niente storia, niente tabella
 * dei costi — quelle stanno sulla home — solo i livelli, il bottone e dove
 * siamo con l'anno, in giorni, anche quando sono zero.
 */
export function SupportInline({
  dict,
  locale,
}: {
  dict: Dict;
  locale: Locale;
}) {
  const copy = dict.support;
  const choice = useSupportChoice(locale, copy.campaign.transferNote);
  if (!supportEnabled || !supportAmountsEnabled) return null;

  const days = daysCovered();
  const percent = Math.min(100, (days / daysInYear) * 100);
  const yearOne = copy.inline.yearOne.replace("{total}", String(daysInYear));
  const wall = donorWall();

  return (
    <section
      data-support-anchor
      className="mt-16 rounded-card border border-line bg-surface p-6 sm:p-7"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h2 className="font-serif text-2xl leading-tight tracking-tight">
            {copy.inline.title}
          </h2>
          <p className="mt-1.5 max-w-[48ch] text-sm leading-relaxed text-muted">
            {copy.inline.body.replace(
              "{weekly}",
              formatMoney(weeklyCostFor(locale), choice.currency, locale),
            )}
          </p>
        </div>

        <div className="shrink-0 sm:text-right">
          <p className="font-serif text-[1.75rem] leading-none tabular-nums">
            {days}
          </p>
          <p className="mt-1 text-xs text-muted">{yearOne}</p>
          <div
            className="mt-2 h-1.5 w-40 overflow-hidden rounded-full bg-line sm:ml-auto"
            role="progressbar"
            aria-valuenow={days}
            aria-valuemin={0}
            aria-valuemax={daysInYear}
            aria-label={yearOne}
          >
            <div
              className="h-full rounded-full bg-accent"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      </div>

      <div
        role="group"
        aria-label={copy.campaign.heading}
        className="mt-5 flex flex-wrap items-center gap-2.5"
      >
        {choice.tiers.map((tier) => (
          <button
            key={tier.key}
            type="button"
            aria-pressed={tier.selected}
            onClick={() => choice.pick(tier.index)}
            className={`flex flex-col items-start gap-0.5 rounded-xl text-left transition-colors ${
              tier.selected
                ? "border-2 border-accent bg-accent-soft px-3.25 py-2 text-accent"
                : "border border-line bg-surface px-3.5 py-2.25 text-ink hover:border-accent/40"
            }`}
          >
            <span className="text-[0.95rem] font-semibold leading-tight tabular-nums">
              {copy.campaign.daysCount.replace("{days}", String(tier.days))}
            </span>
            <span className={`text-xs tabular-nums ${tier.selected ? "" : "text-muted"}`}>
              {formatMoney(tier.amount, choice.currency, locale)}
            </span>
          </button>
        ))}

        <a
          href={choice.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-accent px-5 py-3 text-sm font-semibold text-paper transition-opacity hover:opacity-90 sm:ml-auto"
        >
          <HeartHandshake className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:-rotate-6" aria-hidden />
          {copy.campaign.submit.replace(
            "{amount}",
            formatMoney(choice.amount, choice.currency, locale),
          )}
        </a>
      </div>

      <p className="mt-3 text-xs leading-relaxed text-muted">
        {copy.campaign.listing}
      </p>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-line pt-3.5 text-xs text-muted">
        <span>
          {wall
            ? [
                copy.donors.total.replace(
                  "{people}",
                  String(wall.named.length + wall.anonymousPeople),
                ),
                wall.lastOn
                  ? `${copy.donors.last} ${formatDate(wall.lastOn, locale)}`
                  : null,
              ]
                .filter(Boolean)
                .join(" · ")
            : copy.campaign.trust}
        </span>
        {wall ? <span>{copy.campaign.trust}</span> : null}
      </div>
    </section>
  );
}
