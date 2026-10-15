import { getCampaign } from "@/data/campaign";
import { costsFor, daysCovered, daysInYear, yearlyCostFor } from "@/data/goals";
import { formatMoney, type Locale } from "@/lib/locales";
import type { Dict } from "@/lib/ui";

/**
 * Lo stato della campagna, in giorni: la barra verso l'anno intero, la riga
 * con il traguardo e, sotto, da dove viene la cifra.
 *
 * Compare anche a zero. "0 giorni coperti" è lo stato vero quando nessuno
 * ha ancora donato, e dice esattamente cosa manca; nasconderlo lasciava la
 * campagna senza niente di misurabile.
 */
export async function SupportStats({
  dict,
  locale,
}: {
  dict: Dict;
  locale: Locale;
}) {
  const copy = dict.support.campaign;
  const { currency, items } = costsFor(locale);
  const { raised } = await getCampaign();
  const days = daysCovered(raised);
  const percent = Math.min(100, (days / daysInYear) * 100);
  const goal = formatMoney(yearlyCostFor(locale), currency, locale);

  return (
    <div className="flex flex-col gap-2.5">
      <div
        className="h-3.5 overflow-hidden rounded-full bg-line"
        role="progressbar"
        aria-valuenow={days}
        aria-valuemin={0}
        aria-valuemax={daysInYear}
        aria-label={copy.goalLine
          .replace("{total}", String(daysInYear))
          .replace("{goal}", goal)}
      >
        <div
          className="h-full rounded-full bg-accent"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-[0.8rem] text-muted tabular-nums">
        <span>{copy.daysCount.replace("{days}", String(days))}</span>
        <span>
          {copy.goalLine
            .replace("{total}", String(daysInYear))
            .replace("{goal}", goal)}
        </span>
      </div>

      {/* Da dove viene la cifra, in una riga: trasparenza senza tabella. */}
      <p className="text-xs leading-relaxed text-muted">
        <span className="font-semibold">{copy.costsTitle}:</span>{" "}
        {items
          .map(
            (cost) =>
              `${copy.costs[cost.key]} ${formatMoney(cost.amount, currency, locale)} ${copy.periods[cost.period]}`,
          )
          .join(" · ")}
        {" · "}
        {copy.yearTotal} {goal}
      </p>
    </div>
  );
}
