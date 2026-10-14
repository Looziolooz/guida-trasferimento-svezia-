"use client";

import { animate, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { HeartHandshake } from "lucide-react";
import { donorWall } from "@/data/donors";
import { costsFor, raisedFor } from "@/data/goals";
import { formatDate, formatMoney, type Locale } from "@/lib/locales";
import type { Dict } from "@/lib/ui";

/** Stesso easing del resto del sito. */
const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * La parete di chi ha offerto un espresso.
 *
 * Non compare finché l'elenco in `src/data/donors.ts` è vuoto: una parete
 * con zero nomi dice solo che nessuno ha dato niente.
 *
 * Si anima quando entra in campo — le pastiglie a cascata, il totale che
 * sale da zero — perché un blocco che si muove si guarda. Ma **non finge
 * niente**: nessun contributo "appena arrivato", nessun nome che spunta a
 * tempo. Quello che si vede è l'elenco vero, presentato bene; la data è
 * quella del contributo più recente, non un "poco fa" calcolato per fare
 * scena.
 */
export function SupportDonors({
  dict,
  locale,
}: {
  dict: Dict;
  locale: Locale;
}) {
  const wall = donorWall();
  const reduced = useReducedMotion();
  const totalRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(totalRef, { once: true, margin: "-60px" });

  // Parte dal numero vero: senza JavaScript resta quello, non uno zero.
  const total = wall ? wall.named.length + wall.anonymousPeople : 0;
  const [shown, setShown] = useState(total);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, total, {
      duration: reduced ? 0 : 0.7,
      ease: "easeOut",
      onUpdate: (value) => setShown(Math.round(value)),
    });
    return () => controls.stop();
  }, [inView, total, reduced]);

  if (!wall) return null;

  const copy = dict.support.donors;
  // Derivato dal registro, non da un secondo numero da tenere allineato.
  const money = raisedFor(locale);
  const { currency } = costsFor(locale);

  const chips = [
    ...wall.named.map((donor) => ({
      id: donor.name,
      label: donor.name,
      anonymous: false,
    })),
    ...(wall.anonymousPeople > 0
      ? [
          {
            id: "__anonymous__",
            label: copy.anonymous.replace(
              "{count}",
              String(wall.anonymousPeople),
            ),
            anonymous: true,
          },
        ]
      : []),
  ];

  return (
    <section className="border-t border-line px-7 py-6 sm:px-8">
      <h3 className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-muted">
        <HeartHandshake className="h-4 w-4 text-accent" aria-hidden />
        {copy.title}
        <span className="font-normal normal-case tracking-normal">
          <span ref={totalRef} className="tabular-nums">
            {copy.total.replace("{people}", String(shown))}
          </span>
        </span>
      </h3>

      {money !== null || wall.lastOn ? (
        <p className="mt-1 text-xs text-muted">
          {money !== null
            ? copy.raised.replace("{amount}", formatMoney(money, currency, locale))
            : null}
          {money !== null && wall.lastOn ? " · " : null}
          {wall.lastOn ? `${copy.last} ${formatDate(wall.lastOn, locale)}` : null}
        </p>
      ) : null}

      <motion.ul
        className="mt-3 flex flex-wrap gap-2"
        initial={reduced ? undefined : "hidden"}
        whileInView={reduced ? undefined : "visible"}
        viewport={{ once: true, margin: "-60px" }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
      >
        {chips.map((chip) => (
          <motion.li
            key={chip.id}
            variants={{
              hidden: { opacity: 0, y: 10, scale: 0.96 },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 0.45, ease: EASE },
              },
            }}
            className={`rounded-full px-3 py-1 text-sm ${
              chip.anonymous
                ? "border border-dashed border-line text-muted"
                : "border border-line bg-raised"
            }`}
          >
            {chip.label}
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
