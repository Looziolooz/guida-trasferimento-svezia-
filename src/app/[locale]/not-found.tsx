import Link from "next/link";
import { defaultLocale } from "@/lib/locales";
import { getDict } from "@/lib/ui";

/**
 * Il segmento [locale] non passa params a not-found: si usa la lingua
 * predefinita, che è anche quella del pubblico principale.
 */
export default function LocaleNotFound() {
  const dict = getDict(defaultLocale);

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col justify-center px-4 py-24 sm:px-6">
      <p className="font-serif text-6xl text-brand/30">404</p>
      <h1 className="mt-4 font-serif text-3xl tracking-tight">
        {dict.pages.notFound.title}
      </h1>
      <p className="mt-3 text-muted">{dict.pages.notFound.body}</p>
      <Link
        href={`/${defaultLocale}/guide`}
        className="mt-8 inline-flex w-fit items-center rounded-full bg-brand px-5 py-3 text-sm font-medium text-paper transition-colors hover:bg-brand-ink"
      >
        {dict.pages.notFound.cta}
      </Link>
    </div>
  );
}
