import type { Locale } from "@/lib/locales";
import { authorName, authorSiteFor, authorSiteLabel } from "@/lib/site";
import type { Dict } from "@/lib/ui";

/** Riga compatta per il footer: presente su ogni pagina. */
export function AuthorCredit({
  dict,
  locale,
}: {
  dict: Dict;
  locale: Locale;
}) {
  return (
    <p>
      {dict.author.footerCredit}{" "}
      <span className="text-ink">{authorName}</span>
      {" · "}
      <a
        href={authorSiteFor(locale)}
        target="_blank"
        rel="noopener noreferrer me"
        className="underline underline-offset-2 transition-colors hover:text-brand"
      >
        {authorSiteLabel}
      </a>
    </p>
  );
}
