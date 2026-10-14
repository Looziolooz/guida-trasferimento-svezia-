import type { Locale } from "@/lib/locales";

/**
 * Quanto è coperto il primo anno di gestione.
 *
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │  L'UNICO numero da aggiornare a mano è `raised`.                     │
 * │  Mesi coperti, fin dove è pagato, la barra: tutto si calcola da lì.  │
 * └──────────────────────────────────────────────────────────────────────┘
 *
 * Finché `raised` è `null` la campagna parte da zero giorni coperti: è lo
 * stato vero, e si mostra. Un numero inventato no — su un sito il cui unico
 * capitale è l'esattezza vale parecchio meno di zero.
 *
 * Il conto si tiene in mesi e si mostra in giorni: "15 giorni online" dice
 * al lettore cosa compra davvero il suo contributo, senza chiedergli niente.
 */

/** Si guarda un anno alla volta: oltre, le previsioni diventano fantasia. */
export const monthsInYear = 12;

export type CostKey = "hosting" | "domain";
export type CostPeriod = "month" | "year";
export type CostItem = { key: CostKey; amount: number; period: CostPeriod };

/**
 * Le voci di spesa, una per una: è questa l'unica trasparenza che conta.
 *
 * Dichiarate **per valuta**, non convertite. La pagina italiana mostrava
 * prezzi in euro e costi in corone, che è il modo più rapido per sembrare
 * sciatti; e un cambio fisso scritto nel codice sarebbe falso in un mese.
 * Qui ogni lingua porta la cifra nella valuta che il suo lettore vede nei
 * bottoni, esattamente come il prezzo di una tazzina.
 *
 * Ogni voce porta anche il **suo** periodo: l'hosting si paga al mese, il
 * dominio all'anno.
 */
const COSTS: Record<Locale, { currency: string; items: CostItem[] }> = {
  sv: {
    currency: "SEK",
    items: [
      // Vercel Pro: 18,50 $ + IVA 25 % = 23,13 $/mese. Cambio BCE
      // dell'8 ottobre 2026: 1 $ = 10,01 kr = 0,894 €.
      { key: "hosting", amount: 231, period: "month" },
      // Rinnovo del dominio.
      { key: "domain", amount: 50, period: "year" },
    ],
  },
  it: {
    currency: "EUR",
    items: [
      { key: "hosting", amount: 21, period: "month" },
      { key: "domain", amount: 5, period: "year" },
    ],
  },
  en: {
    currency: "EUR",
    items: [
      { key: "hosting", amount: 21, period: "month" },
      { key: "domain", amount: 5, period: "year" },
    ],
  },
};

export function costsFor(locale: Locale) {
  return COSTS[locale];
}

function yearlyCost(items: CostItem[]): number {
  return items.reduce(
    (total, c) =>
      total + (c.period === "month" ? c.amount * monthsInYear : c.amount),
    0,
  );
}

/** Spesa di un anno intero, nella valuta della pagina. */
export function yearlyCostFor(locale: Locale): number {
  return yearlyCost(COSTS[locale].items);
}

/** Il canone mensile si deriva da quello annuale: una sola fonte di verità. */
export function monthlyCostFor(locale: Locale): number {
  return yearlyCostFor(locale) / monthsInYear;
}

/** Quanto costa una settimana: la cifra più parlante per chi legge. */
export function weeklyCostFor(locale: Locale): number {
  return yearlyCostFor(locale) / 52;
}

/** L'obiettivo della campagna, contato come lo legge chi dona: in giorni. */
export const daysInYear = 365;

/** Quanto costa un giorno di sito acceso, nella valuta della pagina. */
export function dailyCostFor(locale: Locale): number {
  return yearlyCostFor(locale) / daysInYear;
}

/**
 * Quanti giorni di sito compra un importo. Arrotondato per difetto: meglio
 * promettere un giorno in meno che uno in più.
 */
export function daysFor(amount: number, locale: Locale): number {
  const perDay = dailyCostFor(locale);
  return perDay > 0 ? Math.floor(amount / perDay) : 0;
}

/**
 * Il registro della raccolta sta nella valuta del conto che incassa: lì i
 * soldi arrivano davvero, e i mesi coperti si contano una volta sola. Il
 * risultato — "tre mesi su dodici" — non ha valuta, quindi vale per tutti.
 */
const LEDGER: Locale = "sv";
export const ledgerMonthlyCost = monthlyCostFor(LEDGER);

/** Primo giorno del primo anno coperto. */
export const yearStart = "2026-10-01";

/** Totale raccolto, nella valuta del registro. `null` = niente ancora. */
export const raised: number | null = 605; // somma di donors.ts

/** Quando il totale è stato aggiornato (ISO). */
export const raisedUpdated: string | null = "2026-10-13";

export type Coverage = {
  /** Mesi coperti, con la frazione: 3,4 vuol dire tre pieni e poco più. */
  months: number;
  /** Mesi interi coperti, mai oltre `monthsInYear`. */
  full: number;
  /** Quanto è pieno il mese in corso, 0–1. */
  partial: number;
  /**
   * Primo giorno dell'ULTIMO mese coperto, non del primo scoperto:
   * con partenza a ottobre e tre mesi pagati l'ultimo coperto è dicembre.
   * `null` quando non c'è ancora un mese intero.
   */
  paidThrough: string | null;
  /** Vero quando i dodici mesi sono coperti. */
  complete: boolean;
};

function addMonths(iso: string, months: number): string {
  const [year, month] = iso.split("-").map(Number);
  const total = year * 12 + (month - 1) + months;
  return `${Math.floor(total / 12)}-${String((total % 12) + 1).padStart(2, "0")}-01`;
}

/**
 * Il raccolto, nella valuta della pagina.
 *
 * Si ricava dai mesi coperti, non da un secondo numero da tenere allineato:
 * i mesi sono `raised / canone`, quindi rimoltiplicarli per il canone della
 * lingua ridà la stessa cifra in corone e il suo equivalente in euro. Una
 * sola fonte, nessun rischio che la parete e il riquadro si contraddicano.
 */
export function raisedFor(locale: Locale): number | null {
  const state = coverage();
  if (!state) return null;
  return state.months * monthlyCostFor(locale);
}

/**
 * Giorni dell'anno già pagati, da 0 a `daysInYear`.
 *
 * Qui `null` vale zero, ed è voluto: la campagna mostra il suo stato vero
 * anche quando nessuno ha ancora donato. "0 giorni coperti" è un fatto, non
 * una barra inventata — nasconderlo lasciava un titolo senza niente sotto.
 */
export function daysCovered(): number {
  const state = coverage();
  if (!state) return 0;
  return Math.min(daysInYear, Math.floor((state.months / monthsInYear) * daysInYear));
}

/** `null` quando non c'è un totale da mostrare: chi chiama non disegna niente. */
export function coverage(): Coverage | null {
  if (raised === null || !Number.isFinite(raised) || raised < 0) return null;
  if (ledgerMonthlyCost <= 0) return null;

  const months = raised / ledgerMonthlyCost;
  const full = Math.min(monthsInYear, Math.floor(months));

  return {
    months,
    full,
    partial: full >= monthsInYear ? 0 : Math.min(1, months - full),
    paidThrough: full > 0 ? addMonths(yearStart, full - 1) : null,
    complete: months >= monthsInYear,
  };
}
