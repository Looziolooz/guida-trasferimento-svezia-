import { ArrowUpRight, HeartHandshake } from "lucide-react";
import { EspressoPicker } from "./EspressoPicker";
import { SupportDonors } from "./SupportDonors";
import { SupportStats } from "./SupportStats";
import { getCampaign } from "@/data/campaign";
import { costsFor, dailyCostFor, daysCovered, daysInYear } from "@/data/goals";
import { formatMoney, type Locale } from "@/lib/locales";
import {
  authorName,
  authorSiteFor,
  authorSiteLabel,
  supportAmountsEnabled,
  supportEnabled,
  supportUrl,
} from "@/lib/site";
import type { Dict } from "@/lib/ui";

/**
 * Il sostegno come campagna, contata in giorni: "365 giorni online, N già
 * coperti". Il giorno è l'unità che chi dona capisce al volo; le corone e
 * gli euro stanno nella riga dei costi e sui bottoni.
 *
 * A sinistra il traguardo, la barra e da dove viene la cifra; a destra la
 * scelta; sotto, la parete. L'obiettivo è reale — i costi sono quelli
 * dichiarati in `src/data/goals.ts` — e non c'è nessun premio da sbloccare
 * né scadenza: il taglio da piattaforma è nella presentazione, non nei
 * meccanismi.
 *
 * `data-support-anchor` serve alla barra fissa, che si nasconde quando un
 * blocco di sostegno entra in campo: la stessa richiesta non deve arrivare
 * due volte nella stessa schermata.
 */
export async function SupportSection({
  dict,
  locale,
  className,
}: {
  dict: Dict;
  locale: Locale;
  className?: string;
}) {
  const copy = dict.support.campaign;
  const { currency } = costsFor(locale);
  const campaign = await getCampaign();
  const days = daysCovered(campaign.raised);
  const daily = dailyCostFor(locale);
  // Il costo di un giorno in euro sta sotto l'unità: lì servono i centesimi.
  const dailyLabel = formatMoney(daily, currency, locale, daily < 1 ? 2 : 0);

  return (
    <section
      id="support-card"
      data-support-anchor
      className={`overflow-hidden rounded-card border border-line bg-surface ${className ?? ""}`}
    >
      <div
        className={`grid ${
          supportEnabled ? "lg:grid-cols-[minmax(0,1fr)_23rem]" : ""
        }`}
      >
        <div className="flex flex-col gap-5 p-7 sm:p-8">
          <div className="flex flex-wrap items-center gap-2.5">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-muted">
              {copy.eyebrow}
            </p>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-2.5 py-0.5 text-[0.7rem] font-semibold text-brand">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden />
              {copy.status}
            </span>
          </div>

          <h2 className="font-serif text-[clamp(1.6rem,1.2rem+1.4vw,2.1rem)] leading-[1.1] tracking-[-0.02em]">
            {copy.title.replace("{total}", String(daysInYear))}
            <span className="block text-muted">
              {days >= daysInYear
                ? copy.complete
                : copy.covered.replace("{days}", String(days))}
            </span>
          </h2>

          <p className="max-w-[60ch] text-[0.95rem] leading-relaxed text-muted">
            {copy.intro.replace("{daily}", dailyLabel)}
          </p>

          <SupportStats dict={dict} locale={locale} />

          <div className="mt-auto flex items-center gap-3 pt-1">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-soft font-serif text-lg text-brand">
              {authorName.charAt(0)}
            </span>
            <p className="text-[0.8rem] leading-snug">
              <span className="block font-semibold">{authorName}</span>
              <span className="text-muted">
                {dict.author.role}{" · "}
                <a
                  href={authorSiteFor(locale)}
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="underline decoration-current/30 underline-offset-2 transition-colors hover:text-brand"
                >
                  {authorSiteLabel}
                </a>
              </span>
            </p>
          </div>
        </div>

        {supportEnabled ? (
          <div className="border-t border-line bg-raised p-7 sm:p-8 lg:border-l lg:border-t-0">
            {supportAmountsEnabled ? (
              <EspressoPicker dict={dict} locale={locale} />
            ) : (
              <div className="flex flex-col gap-4">
                <a
                  href={supportUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-paper transition-opacity hover:opacity-90"
                >
                  <HeartHandshake className="h-4 w-4" aria-hidden />
                  {dict.support.cta}
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </a>
                <p className="text-center text-xs leading-relaxed text-muted">
                  {copy.trust}
                </p>
              </div>
            )}
          </div>
        ) : null}
      </div>

      <SupportDonors dict={dict} locale={locale} campaign={campaign} />
    </section>
  );
}
