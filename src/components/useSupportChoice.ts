"use client";

import { useState } from "react";
import { daysFor } from "@/data/goals";
import type { Locale } from "@/lib/locales";
import { supportAmountUrl, supportMaxAmount, supportMoney } from "@/lib/site";

/**
 * La scelta dell'importo, condivisa dal blocco grande, da quello in fondo
 * alle guide e dalla barra: stesso stato, stessa cifra, stesso link. Il
 * componente decide solo come disegnarla.
 */
export function useSupportChoice(locale: Locale, transferNote: string) {
  const { currency, tiers } = supportMoney(locale);
  // Parte dal livello di mezzo, come nella bozza approvata; si cambia con un tocco.
  const [picked, setPicked] = useState(1);
  const [custom, setCustom] = useState("");

  // `parseInt` a destinazione: qui arrotondiamo per mostrare la stessa cifra
  // che partirà davvero, invece di prometterne una con i centesimi.
  const typed = Math.round(Number(custom.trim().replace(",", ".")));
  const usingCustom =
    custom.trim() !== "" && Number.isFinite(typed) && typed >= 1;

  const amount = usingCustom
    ? Math.min(typed, supportMaxAmount)
    : tiers[picked].amount;

  return {
    currency,
    custom,
    usingCustom,
    amount,
    days: daysFor(amount, locale),
    href: supportAmountUrl(amount, currency, transferNote),
    tiers: tiers.map((tier, index) => ({
      ...tier,
      days: daysFor(tier.amount, locale),
      selected: !usingCustom && picked === index,
      index,
    })),
    pick(index: number) {
      setPicked(index);
      setCustom("");
    },
    type(value: string) {
      setCustom(value);
    },
  };
}
