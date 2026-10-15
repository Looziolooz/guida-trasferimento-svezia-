import { cache } from "react";

/**
 * La campagna di sostegno: totale e donatori.
 *
 * La fonte è Italia Pratica: aggiorna i donatori là.
 *
 * Italia e Svezia condividono lo stesso conto, quindi i dati vivono in un
 * posto solo e Svezia li legge da `/campaign.json`. Il fetch ha
 * `revalidate: 3600`: le pagine restano statiche e si rigenerano al massimo
 * una volta all'ora (ISR), senza un nuovo deploy di Svezia.
 *
 * Se l'altro sito non risponde, o risponde con qualcosa che non è nella forma
 * attesa, si usa `FALLBACK`: la build non si rompe mai e la campagna non
 * appare mai vuota solo perché Italia è giù.
 *
 * `CAMPAIGN_SOURCE_URL` (facoltativa) sostituisce l'indirizzo di default.
 */

export const campaignSourceUrl =
  process.env.CAMPAIGN_SOURCE_URL || "https://italia-pratica.it/campaign.json";

/** Un'ora: il ritardo massimo con cui una donazione compare su Svezia. */
export const CAMPAIGN_REVALIDATE_SECONDS = 3600;

export type CampaignData = {
  /** Totale raccolto, in corone (valuta del registro). `null` = niente ancora. */
  raised: number | null;
  /** Quando il totale è stato aggiornato (ISO). */
  raisedUpdated: string | null;
  /** Chi ha chiesto di comparire con il nome, in ordine di arrivo. */
  named: string[];
  /** Quante persone hanno preferito restare anonime. */
  anonymous: number;
  /** Data del contributo più recente, se c'è. */
  lastOn: string | null;
};

/** Copia di riserva: i valori noti al momento dell'ultimo allineamento. */
export const FALLBACK: CampaignData = {
  raised: 605,
  raisedUpdated: "2026-10-13",
  named: ["L.D.", "Annika", "Gustav", "Peter O.", "Thomas Z."],
  anonymous: 1,
  lastOn: null,
};

function isNullableString(v: unknown): v is string | null {
  return v === null || typeof v === "string";
}

/** Controlla la forma del JSON; restituisce `null` se non è valido. */
export function parseCampaign(input: unknown): CampaignData | null {
  if (typeof input !== "object" || input === null) return null;
  const d = input as Record<string, unknown>;

  const raisedOk =
    d.raised === null ||
    (typeof d.raised === "number" && Number.isFinite(d.raised) && d.raised >= 0);
  const namedOk =
    Array.isArray(d.named) &&
    d.named.every((n) => typeof n === "string" && n.trim() !== "");
  const anonymousOk =
    typeof d.anonymous === "number" &&
    Number.isInteger(d.anonymous) &&
    d.anonymous >= 0;

  if (!raisedOk || !namedOk || !anonymousOk) return null;
  if (!isNullableString(d.raisedUpdated) || !isNullableString(d.lastOn)) {
    return null;
  }

  return {
    raised: d.raised as number | null,
    raisedUpdated: d.raisedUpdated,
    named: d.named as string[],
    anonymous: d.anonymous as number,
    lastOn: d.lastOn,
  };
}

/**
 * Legge la campagna da Italia, con ripiego sulla copia locale. Dedupata per
 * richiesta di render con `cache` di React: più componenti, un solo fetch.
 */
export const getCampaign = cache(async (): Promise<CampaignData> => {
  try {
    const res = await fetch(campaignSourceUrl, {
      next: { revalidate: CAMPAIGN_REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return FALLBACK;
    return parseCampaign(await res.json()) ?? FALLBACK;
  } catch {
    return FALLBACK;
  }
});
