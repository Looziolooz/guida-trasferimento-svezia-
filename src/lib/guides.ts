export const categoryIds = ["arrivo", "casa", "famiglia", "salute", "soldi", "vita"] as const;

export type CategoryId = (typeof categoryIds)[number];

export type GuideMeta = {
  /** Slug stabile e identico in tutte le lingue: /{locale}/guide/{slug}. */
  slug: string;
  category: CategoryId;
  /** Nome icona lucide-react, risolto in components/Icon.tsx. */
  icon: string;
  /** Ordine dentro la categoria. */
  order: number;
  /** Compare nel percorso consigliato "primi 90 giorni". */
  essential?: boolean;
};

/**
 * Registro delle guide. Lo slug non è tradotto di proposito: sono termini
 * burocratici svedesi (folkbokföring, BankID, samordningsnummer) che restano
 * gli stessi in ogni lingua ed è così che vengono cercati.
 * Una guida registrata ma senza file markdown viene semplicemente saltata
 * (vedi content.ts): il sito si builda anche a contenuto parziale.
 */
export const guides: GuideMeta[] = [
  // ── Arrivo e documenti ────────────────────────────────────────────────
  // Solo per chi non è cittadino UE/SEE: il permesso viene prima di tutto.
  { slug: "uppehallstillstand", category: "arrivo", icon: "Plane", order: 1, essential: true },
  { slug: "folkbokforing", category: "arrivo", icon: "IdCard", order: 2, essential: true },
  { slug: "samordningsnummer", category: "arrivo", icon: "Hash", order: 3 },
  { slug: "bankid", category: "arrivo", icon: "KeyRound", order: 4, essential: true },
  { slug: "medborgarskap", category: "arrivo", icon: "Landmark", order: 5 },
  // Solo per cittadini italiani: l'iscrizione AIRE scatta con la folkbokföring.
  { slug: "aire", category: "arrivo", icon: "Flag", order: 6 },
  { slug: "flytta-fran-sverige", category: "arrivo", icon: "PlaneTakeoff", order: 9 },

  // ── Casa ──────────────────────────────────────────────────────────────
  { slug: "bostad", category: "casa", icon: "Home", order: 1, essential: true },
  { slug: "kopa-bostad", category: "casa", icon: "KeySquare", order: 2 },
  { slug: "hemforsakring", category: "casa", icon: "ShieldCheck", order: 3 },
  { slug: "el-bredband-mobil", category: "casa", icon: "Zap", order: 4 },

  // ── Famiglia e scuola ─────────────────────────────────────────────────
  { slug: "forskola-och-skola", category: "famiglia", icon: "School", order: 1, essential: true },
  { slug: "barn-och-familj", category: "famiglia", icon: "Baby", order: 2 },

  // ── Salute ────────────────────────────────────────────────────────────
  { slug: "vard", category: "salute", icon: "Stethoscope", order: 1, essential: true },

  // ── Previdenza e soldi ────────────────────────────────────────────────
  { slug: "forsakringskassan", category: "soldi", icon: "PiggyBank", order: 1 },
  { slug: "skatt-och-deklaration", category: "soldi", icon: "Receipt", order: 2 },
  { slug: "pension", category: "soldi", icon: "Sunset", order: 3 },

  // ── Lavoro e lingua ───────────────────────────────────────────────────
  { slug: "sfi-och-arbete", category: "vita", icon: "GraduationCap", order: 1, essential: true },
  { slug: "fack-och-a-kassa", category: "vita", icon: "Handshake", order: 2 },
  { slug: "korkort-och-bil", category: "vita", icon: "Car", order: 3 },
  { slug: "utlandsk-utbildning", category: "vita", icon: "Award", order: 4 },
  { slug: "rostratt", category: "vita", icon: "Vote", order: 5 },
];

export const guideSlugs = guides.map((g) => g.slug);

export function getGuideMeta(slug: string): GuideMeta | undefined {
  return guides.find((g) => g.slug === slug);
}

export function guidesByCategory(category: CategoryId): GuideMeta[] {
  return guides
    .filter((g) => g.category === category)
    .sort((a, b) => a.order - b.order);
}
