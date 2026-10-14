import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { fallbackLocale, locales, type Locale } from "./locales";
import { guides, getGuideMeta, type GuideMeta } from "./guides";
import {
  extractToc,
  readingMinutes,
  renderMarkdown,
  toPlainText,
  type TocEntry,
} from "./markdown";

const CONTENT_DIR = path.join(process.cwd(), "content", "guides");

export type OfficialLink = { label: string; url: string };

export type GuideFrontmatter = {
  title: string;
  summary: string;
  /** Quando il contenuto è cambiato per l'ultima volta. */
  updated: string;
  /** Quando è stato ricontrollato senza trovare modifiche normative. */
  reviewed?: string;
  keywords?: string[];
  official?: OfficialLink[];
  related?: string[];
};

export type LoadedGuide = {
  meta: GuideMeta;
  frontmatter: GuideFrontmatter;
  /** Lingua effettivamente servita (può essere il fallback). */
  servedLocale: Locale;
  /** false quando si sta mostrando la versione di riserva. */
  translated: boolean;
  /**
   * Data dell'ultima verifica, **solo se successiva** a quella dell'ultima
   * modifica: una "verificata" più vecchia della modifica non vuol dire niente
   * e non va mostrata.
   */
  reviewed: string | null;
  /** La più recente delle due: è il segnale di freschezza da mostrare. */
  lastTouched: string;
  source: string;
  toc: TocEntry[];
  minutes: number;
};

function filePath(slug: string, locale: Locale) {
  return path.join(CONTENT_DIR, slug, `${locale}.md`);
}

function readRaw(slug: string, locale: Locale): string | null {
  const file = filePath(slug, locale);
  if (!fs.existsSync(file)) return null;
  return fs.readFileSync(file, "utf8");
}

const cache = new Map<string, LoadedGuide | null>();

/**
 * In sviluppo la cache va spenta: i .md non sono moduli, quindi Next non
 * ricarica nulla quando cambiano e si continuerebbe a servire il testo vecchio.
 */
const useCache = process.env.NODE_ENV === "production";

export function loadGuide(slug: string, locale: Locale): LoadedGuide | null {
  const key = `${slug}:${locale}`;
  if (useCache && cache.has(key)) return cache.get(key) ?? null;

  const meta = getGuideMeta(slug);
  if (!meta) {
    if (useCache) cache.set(key, null);
    return null;
  }

  let servedLocale: Locale = locale;
  let raw = readRaw(slug, locale);
  if (raw === null && locale !== fallbackLocale) {
    raw = readRaw(slug, fallbackLocale);
    servedLocale = fallbackLocale;
  }
  if (raw === null) {
    if (useCache) cache.set(key, null);
    return null;
  }

  const { data, content } = matter(raw);
  const frontmatter = data as GuideFrontmatter;

  const reviewed =
    frontmatter.reviewed && frontmatter.reviewed > frontmatter.updated
      ? frontmatter.reviewed
      : null;

  const guide: LoadedGuide = {
    meta,
    frontmatter,
    servedLocale,
    translated: servedLocale === locale,
    reviewed,
    lastTouched: reviewed ?? frontmatter.updated,
    source: content,
    toc: extractToc(content),
    minutes: readingMinutes(content),
  };

  if (useCache) cache.set(key, guide);
  return guide;
}

/** Solo le guide che hanno almeno un file: il sito resta buildabile a contenuto parziale. */
export function availableGuideSlugs(): string[] {
  return guides
    .filter((g) => locales.some((l) => fs.existsSync(filePath(g.slug, l))))
    .map((g) => g.slug);
}

export function loadAllGuides(locale: Locale): LoadedGuide[] {
  return guides
    .map((g) => loadGuide(g.slug, locale))
    .filter((g): g is LoadedGuide => g !== null);
}

export async function renderGuide(guide: LoadedGuide): Promise<string> {
  return renderMarkdown(guide.source);
}

export type SearchDoc = {
  t: string; // titolo
  s: string; // sommario
  u: string; // url (relativo alla lingua)
  k: string; // parole chiave concatenate
  c: string; // etichetta di contesto (categoria / sezione)
};

/** Indice leggero: solo titoli, sommari, intestazioni e parole chiave. */
export function buildGuideSearchDocs(locale: Locale): SearchDoc[] {
  return loadAllGuides(locale).map((g) => ({
    t: g.frontmatter.title,
    s: g.frontmatter.summary,
    u: `/guide/${g.meta.slug}`,
    k: [
      ...(g.frontmatter.keywords ?? []),
      ...g.toc.map((h) => h.text),
      toPlainText(g.source).slice(0, 400),
    ].join(" "),
    c: g.meta.category,
  }));
}
