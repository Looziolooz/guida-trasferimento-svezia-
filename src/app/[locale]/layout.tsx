import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter, Source_Serif_4 } from "next/font/google";
import type { ReactNode } from "react";
import "../globals.css";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SupportBar } from "@/components/SupportBar";
import type { SearchEntry } from "@/components/SearchDialog";
import { buildGuideSearchDocs } from "@/lib/content";
import { entities } from "@/data/entities";
import { glossary } from "@/data/glossary";
import { isLocale, locales, localeTags, type Locale } from "@/lib/locales";
import { alternatesFor, siteUrl } from "@/lib/site";
import { slugify } from "@/lib/slug";
import { getDict } from "@/lib/ui";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const serif = Source_Serif_4({
  subsets: ["latin", "latin-ext"],
  variable: "--font-source-serif",
  display: "swap",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDict(locale);

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: `${dict.site.name} — ${dict.site.tagline}`,
      template: `%s · ${dict.site.name}`,
    },
    description: dict.site.description,
    alternates: alternatesFor(locale),
    openGraph: {
      type: "website",
      siteName: dict.site.name,
      title: `${dict.site.name} — ${dict.site.tagline}`,
      description: dict.site.description,
      locale: localeTags[locale].replace("-", "_"),
      url: `/${locale}`,
    },
    robots: { index: true, follow: true },
  };
}

/** Applica il tema prima della prima pittura, così non c'è il lampo bianco. */
const themeScript = `(function(){try{var t=localStorage.getItem('ip-theme');if(t!=='dark'&&t!=='light'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme='light';}})();`;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDict(locale);

  const index: SearchEntry[] = [
    ...buildGuideSearchDocs(locale).map((doc) => ({
      ...doc,
      kind: "guide" as const,
    })),
    {
      t: dict.pages.checklist.title,
      s: dict.pages.checklist.lede,
      u: "/checklist",
      k: "checklist 90 giorni first days",
      kind: "page" as const,
    },
    {
      t: dict.pages.entities.title,
      s: dict.pages.entities.lede,
      u: "/enti",
      k: "kommun region myndighet skatteverket försäkringskassan migrationsverket",
      kind: "page" as const,
    },
    ...entities.map((entity) => ({
      t: entity.name,
      s: entity.what[locale],
      u: `/enti#${entity.id}`,
      k: entity.where[locale],
      kind: "entity" as const,
    })),
    ...glossary.map((term) => ({
      t: term.sv,
      s: term.note[locale],
      u: `/glossario#${slugify(term.sv)}`,
      k: `${term.it} ${term.en}`,
      kind: "glossary" as const,
    })),
  ];

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${inter.variable} ${serif.variable} antialiased`}>
        <Header locale={locale} dict={dict} index={index} />
        <main id="main" className="pt-16">
          {children}
        </main>

        <Footer locale={locale} dict={dict} />
        <SupportBar dict={dict} locale={locale} />
      </body>
    </html>
  );
}
