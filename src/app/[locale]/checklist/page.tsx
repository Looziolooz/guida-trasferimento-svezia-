import type { Metadata } from "next";
import { ChecklistBoard } from "@/components/ChecklistBoard";
import { loadAllGuides } from "@/lib/content";
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
    title: dict.pages.checklist.title,
    description: dict.pages.checklist.lede,
    alternates: alternatesFor(locale, "/checklist"),
  };
}

export default async function ChecklistPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDict(locale);

  const guideTitles = Object.fromEntries(
    loadAllGuides(locale).map((guide) => [
      guide.meta.slug,
      guide.frontmatter.title,
    ]),
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-serif text-[clamp(2rem,1.5rem+2.2vw,3.25rem)] leading-tight tracking-[-0.025em]">
        {dict.pages.checklist.title}
      </h1>
      <p className="mb-12 mt-4 text-lg leading-relaxed text-muted">
        {dict.pages.checklist.lede}
      </p>

      <ChecklistBoard locale={locale} dict={dict} guideTitles={guideTitles} />
    </div>
  );
}
