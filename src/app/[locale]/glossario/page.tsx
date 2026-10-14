import type { Metadata } from "next";
import { GlossaryList } from "@/components/GlossaryList";
import type { Locale } from "@/lib/locales";
import { alternatesFor } from "@/lib/site";
import { getDict } from "@/lib/ui";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDict(locale);
  return {
    title: dict.pages.glossary.title,
    description: dict.pages.glossary.lede,
    alternates: alternatesFor(locale, "/glossario"),
  };
}

export default async function GlossaryPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDict(locale);

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-serif text-[clamp(2rem,1.5rem+2.2vw,3.25rem)] leading-tight tracking-[-0.025em]">
        {dict.pages.glossary.title}
      </h1>
      <p className="mb-10 mt-4 max-w-2xl text-lg leading-relaxed text-muted">
        {dict.pages.glossary.lede}
      </p>

      <GlossaryList locale={locale} dict={dict} />
    </div>
  );
}
