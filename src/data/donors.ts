/**
 * Chi ha donato.
 *
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │  Si pubblica NOME e INIZIALE DEL COGNOME, mai il nome intero che     │
 * │  Revolut mostra. Chi scrive "anonimo" (o anonym, anonymous) nella    │
 * │  nota del pagamento va come anonimo. L'avviso sta sopra il bottone,  │
 * │  quindi chi dona lo legge prima di pagare.                           │
 * └──────────────────────────────────────────────────────────────────────┘
 *
 * Lista vuota = la sezione non compare affatto.
 */

export type Donor = {
  /** Come la persona ha chiesto di comparire. `null` = anonimo. */
  name: string | null;
  /** Quanto, nella valuta del registro. Solo per il tuo conto: non si mostra. */
  amount?: number;
  /**
   * Quando e' arrivato, in ISO. Facoltativo: se almeno uno ce l'ha, la
   * parete mostra la data dell'ultimo. E' una data vera o niente — non si
   * inventa per far sembrare il progetto piu vivo di quanto sia.
   */
  on?: string;
};

// Gli importi arrivano in euro e si registrano in corone con lo stesso
// rapporto dei costi dichiarati (2 822 kr = 257 €): la pagina in euro
// ridà la cifra esatta, quella in svedese il suo equivalente.
export const donors: Donor[] = [
  { name: "L.D.", amount: 55 }, // 5 € — il dominio, pagato dall'autore
  { name: "Annika", amount: 220 }, // 20 €
  { name: "Gustav", amount: 110 }, // 10 €
  { name: null, amount: 110 }, // 10 €
  { name: "Peter O.", amount: 55 }, // 55 kr
  { name: "Thomas Z.", amount: 55 }, // 55 kr
];

export type DonorWall = {
  /** Chi ha dato un nome, in ordine di arrivo. */
  named: Donor[];
  /** Quante persone hanno preferito restare anonime. */
  anonymousPeople: number;
  /** Data del contributo piu recente, se qualcuno ce l'ha. */
  lastOn: string | null;
};

/** `null` quando non c'è ancora nessuno: chi chiama non disegna niente. */
export function donorWall(): DonorWall | null {
  const valid = donors;
  if (valid.length === 0) return null;

  const named = valid.filter((d): d is Donor & { name: string } =>
    Boolean(d.name?.trim()),
  );
  const anonymous = valid.filter((d) => !d.name?.trim());

  const dates = valid
    .map((d) => d.on)
    .filter((on): on is string => Boolean(on))
    .sort();

  return {
    named,
    anonymousPeople: anonymous.length,
    lastOn: dates.length > 0 ? dates[dates.length - 1] : null,
  };
}
