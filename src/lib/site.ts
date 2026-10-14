import { defaultLocale, locales, localeTags, type Locale } from "./locales";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://svezia.italia-pratica.it";

/** Chi scrive il sito, e dove lo si trova. */
export const authorName = "Lorenzo";
/**
 * Indirizzo stabile dell'autore: serve dove conta l'identità, non la lingua
 * (JSON-LD), perché tre URL diversi per la stessa persona sono tre persone
 * diverse per un motore di ricerca.
 */
export const authorSite = "https://looz.design";
export const authorSiteLabel = "looz.design";

/**
 * Il link che vede chi legge, nella sua lingua. Percorsi verificati
 * sull'hreflang di looz.design: la radice è italiana, poi /en e /sv.
 */
const AUTHOR_SITE_BY_LOCALE: Record<Locale, string> = {
  it: "https://looz.design",
  en: "https://looz.design/en",
  sv: "https://looz.design/sv",
};

export function authorSiteFor(locale: Locale): string {
  return AUTHOR_SITE_BY_LOCALE[locale];
}

/**
 * Contribuzione volontaria. Va bene qualunque destinazione — un link
 * revolut.me, un Payment Link di Stripe, Ko-fi, Liberapay, PayPal.
 *
 * Serve un **URL, non un handle**: da un nome utente nudo non si può sapere
 * la piattaforma, e indovinarla male significa mandare i soldi a un estraneo.
 * Quindi:
 *   NEXT_PUBLIC_SUPPORT_URL=https://revolut.me/tizio  → usato così com'è
 *   NEXT_PUBLIC_SUPPORT_URL=revolut.me/tizio          → https:// aggiunto
 *   NEXT_PUBLIC_SUPPORT_URL=tizio                     → ignorato, niente banner
 *
 * Se il valore manca o non è un URL, blocco e banner non compaiono affatto:
 * meglio nessun bottone che un bottone che porta altrove.
 */
function normalizeSupportUrl(raw: string | undefined): string {
  const value = (raw ?? "").trim().replace(/\/+$/, "");
  if (!value) return "";
  if (/^https?:\/\//i.test(value)) return value;
  // Senza schema serve almeno un dominio riconoscibile: "qualcosa.qualcosa".
  if (/^[\w-]+(\.[\w-]+)+(\/|$)/.test(value)) return `https://${value}`;
  return "";
}

export const supportUrl = normalizeSupportUrl(process.env.NEXT_PUBLIC_SUPPORT_URL);

export const supportEnabled = supportUrl.length > 0;

/**
 * Valuta e livelli di donazione, per lingua.
 *
 * I livelli sono **tempo coperto** — una, due settimane, un mese — non
 * tazzine: "offrimi un caffè" dice un gesto, "un mese di sito acceso" dice
 * a cosa servono i soldi. Gli importi sono arrotondati a cifre tonde che
 * coprono almeno quel tempo ai costi dichiarati in `src/data/goals.ts`
 * (verifica: `daysFor(amount, locale)` ≥ i giorni promessi).
 *
 * Chi contribuisce è in larga parte svedese, quindi la pagina svedese chiede
 * corone: con l'euro il lettore si prenderebbe un cambio sulla carta. Le
 * pagine italiana e inglese restano in euro.
 *
 * ⚠ La valuta deve essere una che il conto Revolut possiede davvero: se non
 * la trova, scarta sia la valuta sia l'importo e il link arriva senza cifra.
 */
export type SupportTier = {
  key: "small" | "week" | "fortnight";
  amount: number;
};

const SUPPORT_MONEY: Record<Locale, { currency: string; tiers: SupportTier[] }> = {
  sv: {
    currency: "SEK",
    tiers: [
      { key: "small", amount: 25 },
      { key: "week", amount: 55 },
      { key: "fortnight", amount: 120 },
    ],
  },
  it: {
    currency: "EUR",
    tiers: [
      { key: "small", amount: 2 },
      { key: "week", amount: 5 },
      { key: "fortnight", amount: 11 },
    ],
  },
  en: {
    currency: "EUR",
    tiers: [
      { key: "small", amount: 2 },
      { key: "week", amount: 5 },
      { key: "fortnight", amount: 11 },
    ],
  },
};

export function supportMoney(locale: Locale): {
  currency: string;
  tiers: SupportTier[];
} {
  return SUPPORT_MONEY[locale];
}

/** Tetto a un contributo libero: oltre, quasi sempre è un dito scivolato. */
export const supportMaxAmount = 5000;

/**
 * Solo un link revolut.me sa leggere un importo dall'indirizzo: la sua pagina
 * prende `amount`, `currency` e `note` dalla query string. Un Payment Link di
 * Stripe o un Ko-fi hanno l'importo dentro al link stesso, quindi lì i livelli
 * non hanno senso e mostriamo il solo bottone.
 */
function supportHost(): string {
  try {
    return new URL(supportUrl).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return "";
  }
}

export const supportAmountsEnabled =
  supportEnabled && supportHost() === "revolut.me";

/**
 * Link con l'importo già scritto. Chi paga lo vede e può cambiarlo prima di
 * confermare: è un suggerimento, non un addebito.
 *
 * ⚠ `amount` va in **centesimi**: `?amount=1000` è 10 €. Verificato aprendo
 * il link — con `amount=10` la pagina Revolut mostrava 0,10 €.
 */
export function supportAmountUrl(
  amount: number,
  currency: string,
  note?: string,
): string {
  if (!supportAmountsEnabled) return supportUrl;

  const whole = Math.round(amount);
  if (!Number.isFinite(whole) || whole < 1 || whole > supportMaxAmount) {
    return supportUrl;
  }

  const url = new URL(supportUrl);
  url.searchParams.set("amount", String(whole * 100));
  url.searchParams.set("currency", currency);
  if (note) url.searchParams.set("note", note);
  return url.toString();
}

export function localePath(locale: Locale, path = ""): string {
  const clean = path.startsWith("/") ? path : path ? `/${path}` : "";
  return `/${locale}${clean}`;
}

export function absoluteUrl(path: string): string {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Blocco `alternates` per i metadata: canonical della lingua corrente,
 * hreflang per le altre due e x-default sulla lingua predefinita.
 * `path` è il percorso senza prefisso di lingua ("" per la home).
 */
export function alternatesFor(locale: Locale, path = "") {
  const languages: Record<string, string> = Object.fromEntries(
    locales.map((item) => [localeTags[item], `/${item}${path}`]),
  );
  languages["x-default"] = `/${defaultLocale}${path}`;

  return {
    canonical: `/${locale}${path}`,
    languages,
  };
}
