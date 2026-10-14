import type { Metadata } from "next";
import { SupportSection } from "@/components/SupportSection";
import { alternatesFor } from "@/lib/site";
import type { Locale } from "@/lib/locales";
import { getDict } from "@/lib/ui";

type Section = { heading: string; body: string[] };

const sections: Record<Locale, Section[]> = {
  it: [
    {
      heading: "Cos’è",
      body: [
        "Una guida gratuita per chi si trasferisce in Svezia, da un paese UE o da fuori. Copre le pratiche che si incontrano davvero nei primi mesi: permesso di soggiorno, folkbokföring e personnummer, samordningsnummer, BankID, casa, sanità, Försäkringskassan, SFI e lavoro.",
        "È il sito gemello di Italia Pratica, che fa lo stesso lavoro nella direzione opposta: la burocrazia italiana per chi arriva in Italia. Stesso autore, stesso impianto, stessa regola — niente registrazione, niente pubblicità, nessun servizio a pagamento dietro.",
      ],
    },
    {
      heading: "Come è fatto",
      body: [
        "Sito statico in Next.js, generato in anticipo e servito come pagine già pronte. Nessun database, nessun account, nessuna pubblicità, nessuno strumento di analisi, nessuno script di terze parti — nemmeno il bottone per l’espresso, che è scritto in casa.",
        "L’unica cosa salvata sul tuo dispositivo è la spunta della checklist, la preferenza di tema e il fatto che tu abbia eventualmente chiuso il bottone dell’espresso, tutto in localStorage: non lascia il browser e nessuno la riceve.",
      ],
    },
    {
      heading: "Le tre lingue",
      body: [
        "I contenuti esistono in italiano, svedese e inglese. Gli indirizzi delle guide restano in svedese di proposito — personnummer, folkbokföring, BankID sono le parole che troverai sui moduli e negli uffici, e sono quelle che si cercano.",
        "Se una guida non è ancora tradotta nella lingua scelta, viene mostrata la versione italiana con un avviso in cima, invece di una pagina vuota.",
      ],
    },
    {
      heading: "Cosa non è",
      body: [
        "Non è consulenza legale, fiscale o di immigrazione, e non sostituisce un avvocato o un consulente. Le regole svedesi cambiano e vengono applicate in modo diverso da comune a comune e da regione a regione: quello che vale a Stoccolma può non valere a Norrtälje.",
        "Ogni guida porta in cima la data dell’ultima revisione e in fondo i link alle fonti ufficiali. Se la fonte ufficiale dice qualcosa di diverso da questo sito, ha ragione la fonte ufficiale.",
      ],
    },
    {
      heading: "Segnalare un errore",
      body: [
        "Le regole cambiano e le pagine invecchiano. Se trovi qualcosa di sbagliato o superato, scrivimi dai contatti su looz.design, indicando la guida e, se puoi, la fonte aggiornata.",
        "I testi sono riutilizzabili con attribuzione, licenza CC BY 4.0. Se gestisci un’associazione, un comune o un servizio di accoglienza, puoi copiarli e adattarli.",
      ],
    },
  ],
  sv: [
    {
      heading: "Vad det är",
      body: [
        "En gratis guide för dig som flyttar till Sverige, från ett EU-land eller utanför EU. Den täcker de ärenden man faktiskt möter under de första månaderna: uppehållstillstånd, folkbokföring och personnummer, samordningsnummer, BankID, bostad, sjukvård, Försäkringskassan, SFI och jobb.",
        "Det är systersajten till Italia Pratica, som gör samma jobb åt andra hållet: den italienska byråkratin för den som kommer till Italien. Samma skapare, samma upplägg, samma princip — ingen registrering, ingen reklam, ingen betaltjänst bakom.",
      ],
    },
    {
      heading: "Hur den är byggd",
      body: [
        "Statisk sajt i Next.js, förgenererad och levererad som färdiga sidor. Ingen databas, inget konto, ingen reklam, inga analysverktyg, inga tredjepartsskript — inte ens espressoknappen, som är byggd här.",
        "Det enda som sparas på din enhet är checklistans bockar, temavalet och om du råkat stänga espressoknappen, allt i localStorage: det lämnar aldrig webbläsaren och ingen tar emot det.",
      ],
    },
    {
      heading: "De tre språken",
      body: [
        "Innehållet finns på svenska, engelska och italienska. Guidernas adresser är på svenska med flit — personnummer, folkbokföring, BankID är orden du möter på blanketterna och hos myndigheterna, och det är dem man söker på.",
        "Är en guide ännu inte översatt visas den italienska versionen med en notis högst upp, i stället för en tom sida.",
      ],
    },
    {
      heading: "Vad den inte är",
      body: [
        "Det är inte juridisk, skattemässig eller migrationsrättslig rådgivning, och den ersätter inte en jurist eller en rådgivare. Svenska regler ändras och tillämpas olika i olika kommuner och regioner: det som gäller i Stockholm behöver inte gälla i Norrtälje.",
        "Varje guide har datum för senaste genomgång högst upp och länkar till officiella källor längst ned. Säger den officiella källan något annat än den här sajten är det källan som har rätt.",
      ],
    },
    {
      heading: "Rapportera ett fel",
      body: [
        "Regler ändras och sidor åldras. Hittar du något felaktigt eller föråldrat, hör av dig via kontaktuppgifterna på looz.design och ange vilken guide det gäller och gärna den uppdaterade källan.",
        "Texterna får återanvändas med källhänvisning, licens CC BY 4.0. Driver du en förening, en kommun eller en mottagningsverksamhet får du kopiera och anpassa dem.",
      ],
    },
  ],
  en: [
    {
      heading: "What this is",
      body: [
        "A free guide for people moving to Sweden, from another EU country or from outside the EU. It covers the procedures you actually meet in the first months: residence permit, folkbokföring and personnummer, samordningsnummer, BankID, housing, healthcare, Försäkringskassan, SFI and work.",
        "It is the sister site of Italia Pratica, which does the same job in the opposite direction: Italian bureaucracy for people arriving in Italy. Same author, same set-up, same rule — no sign-up, no ads, no paid service behind it.",
      ],
    },
    {
      heading: "How it is built",
      body: [
        "A static Next.js site, pre-rendered and served as finished pages. No database, no accounts, no ads, no analytics, no third-party scripts — not even the espresso button, which is built in-house.",
        "The only things stored on your device are your checklist progress, your theme preference and whether you dismissed the espresso button, all in localStorage: none of it leaves the browser and nobody receives it.",
      ],
    },
    {
      heading: "The three languages",
      body: [
        "Content exists in English, Swedish and Italian. Guide addresses stay in Swedish on purpose — personnummer, folkbokföring, BankID are the words you will meet on the forms and at the agencies, and the words people search for.",
        "If a guide is not translated into your language yet, the Italian version is shown with a notice at the top, rather than an empty page.",
      ],
    },
    {
      heading: "What it is not",
      body: [
        "It is not legal, tax or immigration advice, and it does not replace a lawyer or an adviser. Swedish rules change and are applied differently from one municipality and region to the next: what holds in Stockholm may not hold in Norrtälje.",
        "Every guide carries its last review date at the top and links to official sources at the bottom. If the official source says something different from this site, the official source is right.",
      ],
    },
    {
      heading: "Reporting an error",
      body: [
        "Rules change and pages age. If you find something wrong or out of date, get in touch through the contact details at looz.design, naming the guide and, if you can, the updated source.",
        "The text is reusable with attribution under CC BY 4.0. If you run an association, a municipality or a welcome service, you may copy and adapt it.",
      ],
    },
  ],
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDict(locale);
  return {
    title: dict.pages.about.title,
    description: dict.pages.about.lede,
    alternates: alternatesFor(locale, "/info"),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDict(locale);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-serif text-[clamp(2rem,1.5rem+2.2vw,3.25rem)] leading-tight tracking-[-0.025em]">
        {dict.pages.about.title}
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">
        {dict.pages.about.lede}
      </p>

      <div className="prose mt-14">
        {sections[locale].map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </section>
        ))}
      </div>

      <SupportSection dict={dict} locale={locale} className="mt-14" />

      <aside className="callout callout-warn mt-8">
        <p className="callout-title">{dict.disclaimer.title}</p>
        <p>{dict.disclaimer.body}</p>
      </aside>
    </div>
  );
}
