"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import { HeartHandshake } from "lucide-react";
import { useScrollProgress, useStoredState } from "@/lib/client-store";
import { useSupportChoice } from "./useSupportChoice";
import { formatMoney, type Locale } from "@/lib/locales";
import { supportAmountsEnabled, supportEnabled, supportUrl } from "@/lib/site";
import type { Dict } from "@/lib/ui";

/**
 * Chiave nuova: la vecchia conteneva un booleano "chiusa per sempre" e chi
 * l'aveva premuta una volta non avrebbe rivisto la barra mai piu.
 */
const DISMISS_KEY = "ip-espresso-dismissed-at";
const NEVER_DISMISSED = 0;

/** Dopo quanto la barra torna. Non insiste, ma non sparisce per sempre. */
const DISMISS_DAYS = 60;
const DISMISS_WINDOW = DISMISS_DAYS * 24 * 60 * 60 * 1000;

/**
 * "Adesso", fissato quando il modulo viene caricato. In render l'orologio
 * non si legge: Date.now() e' una funzione impura e React 19 la rifiuta.
 * Una visita dura minuti, la finestra sessanta giorni: l'approssimazione
 * non si vede.
 */
const LOADED_AT = Date.now();

/** Percentuale di pagina percorsa oltre la quale la barra compare. */
const APPEAR_AT = 35;

/**
 * Barra fissa in fondo, nello spirito del bottone di Buy Me a Coffee ma
 * scritta in casa: nessuno script esterno, nessun cookie di terze parti.
 *
 * Tre regole per non essere invadente:
 *  - non compare finché non hai letto almeno un terzo della pagina;
 *  - si chiude, e la scelta resta sul dispositivo di chi legge;
 *  - sparisce quando il blocco di sostegno entra in campo, così la stessa
 *    richiesta non arriva due volte nella stessa schermata.
 */
export function SupportBar({ dict, locale }: { dict: Dict; locale: Locale }) {
  const reduced = useReducedMotion();
  const [dismissedAt, setDismissedAt] = useStoredState(
    DISMISS_KEY,
    NEVER_DISMISSED,
  );
  const progress = useScrollProgress();
  const [cardInView, setCardInView] = useState(false);

  const choice = useSupportChoice(locale, dict.support.campaign.transferNote);

  useEffect(() => {
    // Qualunque blocco di sostegno in campo spegne la barra: la stessa
    // richiesta non deve arrivare due volte nella stessa schermata.
    const targets = document.querySelectorAll("[data-support-anchor]");
    if (targets.length === 0) return;

    const visible = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        }
        setCardInView(visible.size > 0);
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  if (!supportEnabled) return null;

  const copy = dict.support.campaign;
  const silenced =
    dismissedAt > 0 && LOADED_AT - dismissedAt < DISMISS_WINDOW;
  const visible = progress >= APPEAR_AT && !cardInView && !silenced;

  const label = supportAmountsEnabled
    ? copy.submit.replace(
        "{amount}",
        formatMoney(choice.amount, choice.currency, locale),
      )
    : dict.support.cta;

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-40"
          initial={reduced ? false : { y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduced ? { opacity: 0 } : { y: 80, opacity: 0 }}
          transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="border-t border-line bg-surface/95 shadow-[0_-8px_24px_-18px_rgba(27,42,38,0.5)] backdrop-blur-md">
            <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2.5 sm:gap-5 sm:px-6 lg:px-8">
              <span className="hidden h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent sm:grid">
                <HeartHandshake className="h-5 w-5" aria-hidden />
              </span>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">
                  {dict.support.bar.question}
                </p>
                <p className="hidden text-xs leading-snug text-muted sm:block">
                  {dict.support.bar.body}
                </p>
              </div>

              {supportAmountsEnabled ? (
                <div
                  role="group"
                  aria-label={copy.heading}
                  className="hidden items-center gap-1.5 lg:flex"
                >
                  {choice.tiers.map((tier) => {
                    const selected = tier.selected;
                    return (
                      <button
                        key={tier.key}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => choice.pick(tier.index)}
                        className={`rounded-full px-3.5 text-sm tabular-nums transition-colors ${
                          selected
                            ? "border-2 border-accent bg-accent-soft py-1 font-semibold text-accent"
                            : "border border-line bg-surface py-[5px] text-ink hover:border-accent/40"
                        }`}
                      >
                        {formatMoney(tier.amount, choice.currency, locale)}
                      </button>
                    );
                  })}
                </div>
              ) : null}

              {/* Il battito sta sul contenitore: l'ancora resta libera per l'hover. */}
              <span className="espresso-heartbeat-intro flex shrink-0">
                <a
                  href={supportAmountsEnabled ? choice.href : supportUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-accent px-4 py-2.5 text-sm font-medium text-paper transition-transform hover:-translate-y-0.5 focus-visible:-translate-y-0.5"
                >
                  <HeartHandshake className="h-4 w-4 shrink-0 sm:hidden" aria-hidden />
                  {label}
                </a>
              </span>

              <button
                type="button"
                onClick={() => setDismissedAt(Date.now())}
                aria-label={dict.nav.close}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-raised hover:text-ink"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
