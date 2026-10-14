export const locales = ["sv", "en", "it"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "sv";

/** Lingua di riserva quando manca la traduzione di una guida. */
export const fallbackLocale: Locale = "it";

export const localeNames: Record<Locale, string> = {
  sv: "Svenska",
  en: "English",
  it: "Italiano",
};

export const localeShort: Record<Locale, string> = {
  sv: "SV",
  en: "EN",
  it: "IT",
};

/** Tag BCP-47 per <html lang> e per Intl. */
export const localeTags: Record<Locale, string> = {
  sv: "sv-SE",
  en: "en-GB",
  it: "it-IT",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * Importo senza decimali: Revolut legge l'importo dalla query string con
 * `parseInt`, quindi i centesimi verrebbero troncati e mostrare "2,00 €"
 * prometterebbe una precisione che il link non ha.
 */
export function formatMoney(
  amount: number,
  currency: string,
  locale: Locale,
  /** Di norma cifre intere; il costo di un giorno in euro sta sotto l'unità. */
  maxFractions = 0,
): string {
  try {
    return new Intl.NumberFormat(localeTags[locale], {
      style: "currency",
      currency,
      // Con i centesimi, sempre due cifre: 0,70 €, non 0,7 €.
      minimumFractionDigits: maxFractions,
      maximumFractionDigits: maxFractions,
    }).format(amount);
  } catch {
    // Codice valuta non valido: Intl solleva, e un prezzo grezzo è meglio di una pagina rotta.
    return `${amount} ${currency}`;
  }
}

/** Solo mese e anno: "pagato fino a gennaio 2027" non vuole il giorno. */
export function formatMonth(iso: string, locale: Locale): string {
  const date = new Date(iso + "T00:00:00Z");
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat(localeTags[locale], {
    year: "numeric",
    month: "long",
    timeZone: "UTC",
  }).format(date);
}

/** Solo il mese, abbreviato: per una tessera stretta. */
export function formatMonthShort(iso: string, locale: Locale): string {
  const date = new Date(iso + "T00:00:00Z");
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat(localeTags[locale], {
    month: "short",
    timeZone: "UTC",
  }).format(date);
}

export function formatDate(iso: string, locale: Locale): string {
  const date = new Date(iso + "T00:00:00Z");
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat(localeTags[locale], {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}
