/**
 * Chi ha donato.
 *
 * La fonte è Italia Pratica: aggiorna i donatori là.
 *
 * Qui non c'è più nessun elenco da modificare: i donatori arrivano da
 * `/campaign.json` di Italia Pratica (vedi `campaign.ts`). Resta solo la
 * forma della parete che i componenti disegnano.
 *
 * Lista vuota = la sezione non compare affatto.
 */

import type { CampaignData } from "./campaign";

export type DonorWall = {
  /** Chi ha dato un nome, in ordine di arrivo. */
  named: { name: string }[];
  /** Quante persone hanno preferito restare anonime. */
  anonymousPeople: number;
  /** Data del contributo piu recente, se qualcuno ce l'ha. */
  lastOn: string | null;
};

/** `null` quando non c'è ancora nessuno: chi chiama non disegna niente. */
export function donorWall(campaign: CampaignData): DonorWall | null {
  if (campaign.named.length + campaign.anonymous === 0) return null;
  return {
    named: campaign.named.map((name) => ({ name })),
    anonymousPeople: campaign.anonymous,
    lastOn: campaign.lastOn,
  };
}
