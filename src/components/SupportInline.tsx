import { getCampaign } from "@/data/campaign";
import type { Locale } from "@/lib/locales";
import type { Dict } from "@/lib/ui";
import { SupportInlineClient } from "./SupportInlineClient";

/**
 * La richiesta in fondo a ogni guida. Qui si leggono i dati della campagna
 * (server, con ISR); il disegno, che ha stato e click, sta in
 * `SupportInlineClient`.
 */
export async function SupportInline({
  dict,
  locale,
}: {
  dict: Dict;
  locale: Locale;
}) {
  const campaign = await getCampaign();
  return <SupportInlineClient dict={dict} locale={locale} campaign={campaign} />;
}
