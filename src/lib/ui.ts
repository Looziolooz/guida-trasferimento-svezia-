import type { CategoryId } from "./guides";
import type { Locale } from "./locales";

type CategoryCopy = { label: string; description: string };

export type Dict = {
  site: { name: string; tagline: string; description: string };
  nav: {
    guides: string;
    checklist: string;
    entities: string;
    glossary: string;
    about: string;
    menu: string;
    close: string;
    theme: string;
    language: string;
  };
  home: {
    eyebrow: string;
    titleLead: string;
    titleAccent: string;
    lede: string;
    ctaPrimary: string;
    ctaSecondary: string;
    statGuides: string;
    statLangs: string;
    statFunding: string;
    statFundingValue: string;
    pathTitle: string;
    pathLede: string;
    categoriesTitle: string;
    categoriesLede: string;
    freeTitle: string;
    freeBody: string;
    euTitle: string;
    euBody: string;
  };
  common: {
    updated: string;
    reviewed: string;
    readingTime: string;
    officialSources: string;
    officialSourcesNote: string;
    onThisPage: string;
    related: string;
    allGuides: string;
    backToGuides: string;
    search: string;
    searchPlaceholder: string;
    searchHint: string;
    noResults: string;
    translationMissing: string;
    essential: string;
    step: string;
    steps: string;
    of: string;
    reset: string;
    progress: string;
    filter: string;
    all: string;
    copy: string;
    copied: string;
    openOfficial: string;
    skipToContent: string;
  };
  disclaimer: { title: string; body: string; short: string };
  support: {
    /** Bottone di riserva quando la destinazione non sa leggere un importo. */
    cta: string;
    /** Le due righe della barra fissa in fondo: corte, si leggono di sfuggita. */
    bar: { question: string; body: string };
    /** La campagna: il primo anno di gestione come obiettivo dichiarato. */
    campaign: {
      eyebrow: string;
      status: string;
      /** `{total}`: i giorni dell'anno. */
      title: string;
      /** `{days}`: i giorni già pagati, anche zero. */
      covered: string;
      /** `{daily}`: quanto costa un giorno. */
      intro: string;
      /** `{days}` */
      daysCount: string;
      /** `{total}`, `{goal}` */
      goalLine: string;
      costsTitle: string;
      costs: Record<"hosting" | "domain", string>;
      periods: Record<"month" | "year", string>;
      yearTotal: string;
      complete: string;
      chooseLevel: string;
      /** Solo etichetta accessibile del gruppo di bottoni. */
      heading: string;
      custom: string;
      customLabel: string;
      /** `{amount}` */
      submit: string;
      /** `{amount}`, `{days}` */
      submitDays: string;
      trust: string;
      /** Come si compare nella parete, e come restarne fuori. */
      listing: string;
      transferNote: string;
    };
    /** In fondo a ogni guida. `{weekly}`, `{total}`. */
    inline: { title: string; body: string; yearOne: string };
    /** Chi ha donato. `{people}`, `{count}`, `{amount}`. */
    donors: {
      title: string;
      total: string;
      anonymous: string;
      raised: string;
      last: string;
    };
  };
  author: {
    role: string;
    footerCredit: string;
  };
  categories: Record<CategoryId, CategoryCopy>;
  pages: {
    guides: { title: string; lede: string };
    checklist: { title: string; lede: string; done: string; note: string };
    entities: {
      title: string;
      lede: string;
      whatFor: string;
      where: string;
      level: string;
      levels: Record<"stato" | "regione" | "comune" | "altro", string>;
    };
    glossary: { title: string; lede: string; original: string; meaning: string };
    about: { title: string; lede: string };
    notFound: { title: string; body: string; cta: string };
  };
  footer: {
    built: string;
    sources: string;
    license: string;
    contribute: string;
    sister: string;
  };
};

const it: Dict = {
  site: {
    name: "Svezia Pratica",
    tagline: "La burocrazia svedese, spiegata passo per passo",
    description:
      "Guida gratuita e indipendente per chi si trasferisce in Svezia: personnummer, folkbokföring, BankID, casa, sanità, Försäkringskassan. In italiano, svedese e inglese.",
  },
  nav: {
    guides: "Guide",
    checklist: "Primi 90 giorni",
    entities: "Chi fa cosa",
    glossary: "Glossario",
    about: "Il progetto",
    menu: "Menu",
    close: "Chiudi",
    theme: "Tema",
    language: "Lingua",
  },
  home: {
    eyebrow: "Gratuito · Senza registrazione · Tre lingue",
    titleLead: "Trasferirsi in Svezia,",
    titleAccent: "un ufficio alla volta.",
    lede:
      "Ogni pratica spiegata nell’ordine in cui va fatta: cosa serve, dove si va, quanto costa, quanto ci mette. Con i link alle fonti ufficiali, senza intermediari che vendono servizi.",
    ctaPrimary: "Inizia dai primi 90 giorni",
    ctaSecondary: "Sfoglia tutte le guide",
    statGuides: "guide",
    statLangs: "lingue",
    statFunding: "si mantiene con",
    statFundingValue: "donazioni",
    pathTitle: "Il percorso, in ordine",
    pathLede:
      "Alcune pratiche ne sbloccano altre. Se vieni da fuori UE il permesso di soggiorno viene prima di tutto; poi la folkbokföring, che ti dà il personnummer; poi la carta d’identità; poi conto in banca e BankID. Con quelli, quasi tutto il resto (medico, assegni, lavoro) diventa possibile.",
    categoriesTitle: "Tutte le aree",
    categoriesLede:
      "{count} guide, aggiornate a mano, con la data dell’ultima revisione in cima a ognuna.",
    freeTitle: "Perché è gratis",
    freeBody:
      "Nessuna di queste pratiche richiede un intermediario a pagamento. La registrazione in folkbokföring è gratuita, il personnummer è gratuito, il corso di svedese SFI è gratuito. Questo sito esiste perché quell’informazione non dovrebbe richiedere un’agenzia di relocation.",
    euTitle: "UE, SEE e resto del mondo",
    euBody:
      "Le regole cambiano radicalmente. I cittadini UE, SEE e svizzeri hanno diritto di soggiorno e non hanno bisogno di un permesso; chi arriva da fuori UE, di regola, deve ottenere un permesso di soggiorno prima di arrivare. I cittadini nordici hanno regole proprie. Ogni guida segnala esplicitamente dove i percorsi si separano.",
  },
  common: {
    updated: "Aggiornata il",
    reviewed: "verificata il",
    readingTime: "min di lettura",
    officialSources: "Fonti ufficiali",
    officialSourcesNote:
      "Link ai siti delle autorità competenti. Se una pagina non risponde, cerca il nome dell’ente su verksamt.se o sverige.se.",
    onThisPage: "In questa pagina",
    related: "Guide collegate",
    allGuides: "Tutte le guide",
    backToGuides: "Torna alle guide",
    search: "Cerca",
    searchPlaceholder: "Cerca una pratica, un ufficio, una parola…",
    searchHint: "Premi / per cercare",
    noResults: "Nessun risultato.",
    translationMissing:
      "Questa guida non è ancora tradotta in questa lingua: stai leggendo la versione italiana.",
    essential: "Essenziale",
    step: "Passo",
    steps: "passi",
    of: "di",
    reset: "Azzera",
    progress: "completato",
    filter: "Filtra",
    all: "Tutte",
    copy: "Copia",
    copied: "Copiato",
    openOfficial: "Apri il sito ufficiale",
    skipToContent: "Vai al contenuto",
  },
  disclaimer: {
    title: "Informazione, non consulenza",
    body:
      "Questo sito è scritto con cura e rimanda sempre alla fonte ufficiale, ma non è consulenza legale, fiscale o di immigrazione. Le norme svedesi cambiano, e la loro applicazione può variare da comune a comune e da regione a regione. Prima di una decisione che vale soldi o diritti — un contratto d’affitto, una domanda di permesso, un’indennità — verifica sulla fonte ufficiale linkata e, dove indicato, fatti seguire da un professionista.",
    short: "Informazione, non consulenza. Verifica sempre sulla fonte ufficiale.",
  },
  support: {
    cta: "Dona",
    bar: {
      question: "Ti è servita questa pagina?",
      body: "Una donazione tiene il sito online e aggiornato.",
    },
    campaign: {
      eyebrow: "Campagna · anno uno",
      status: "In corso",
      title: "{total} giorni online.",
      covered: "Coperti finora: {days}.",
      intro:
        "Gratis, senza pubblicità, controllata sulle fonti. L’unica cosa che costa è tenerla accesa: circa {daily} al giorno. Svezia Pratica e Italia Pratica stanno sullo stesso hosting, quindi la campagna è condivisa: una donazione tiene online entrambi i siti. Scegli quanti giorni portare tu — i soldi vanno dritti a hosting e dominio.",
      daysCount: "{days} giorni",
      goalLine: "Obiettivo: {total} giorni · {goal}",
      costsTitle: "Dove vanno i soldi",
      costs: { hosting: "Hosting (Vercel Pro, 18,50 $ + IVA)", domain: "Dominio" },
      periods: { month: "/ mese", year: "/ anno" },
      yearTotal: "Un anno",
      complete: "Il primo anno è coperto. Grazie.",
      chooseLevel: "Quanti giorni vuoi coprire?",
      heading: "Quanti giorni vuoi coprire?",
      custom: "Altra cifra",
      customLabel: "Importo libero, in cifre intere",
      submit: "Dona {amount}",
      submitDays: "Dona {amount} · {days} giorni",
      trust: "Una tantum via Revolut · nessun account · per donare in anonimo scrivi «anonimo» nella nota",
      listing: "Comparirai fra chi ha donato con nome e iniziale del cognome.",
      transferNote: "Donazione per Svezia Pratica",
    },
    inline: {
      title: "Ti è servita questa pagina?",
      body: "Viene controllata sulle fonti ufficiali e aggiornata quando cambiano le regole. Tenerla online costa {weekly} a settimana.",
      yearOne: "giorni coperti su {total} · anno uno",
    },
    donors: {
      title: "Grazie a",
      total: "{people} persone hanno donato",
      anonymous: "{count} in anonimo",
      raised: "{amount} raccolti",
      last: "ultimo il",
    },
  },
  author: {
    role: "Designer e sviluppatore web, vivo e lavoro a Norrtälje, nato e cresciuto in Calabria.",
    footerCredit: "Progetto volontario di",
  },
  categories: {
    arrivo: {
      label: "Arrivo e documenti",
      description: "Permesso di soggiorno, folkbokföring, personnummer, samordningsnummer, carta d’identità, BankID, cittadinanza svedese, AIRE per gli italiani, come lasciare la Svezia.",
    },
    casa: {
      label: "Casa",
      description: "Affitto, coda per la casa, contratto di seconda mano, comprare casa, assicurazione, luce e internet.",
    },
    famiglia: {
      label: "Famiglia e scuola",
      description: "Asilo e scuola, gravidanza, congedo parentale, VAB.",
    },
    salute: {
      label: "Salute",
      description: "1177, vårdcentral, costi delle cure.",
    },
    soldi: {
      label: "Previdenza e soldi",
      description: "Försäkringskassan, assegni familiari, indennità di malattia, tasse e pensione.",
    },
    vita: {
      label: "Lavoro e lingua",
      description: "SFI (svedese per stranieri), Arbetsförmedlingen, sindacato e a-kassa, patente, titoli di studio, voto.",
    },
  },
  pages: {
    guides: {
      title: "Tutte le guide",
      lede:
        "{count} pratiche, divise per area. Quelle segnate come essenziali sono quelle che sbloccano le altre.",
    },
    checklist: {
      title: "I primi 90 giorni",
      lede:
        "L’ordine conta. Questa lista tiene il segno da sola nel tuo browser: nessun account, nessun dato inviato da nessuna parte.",
      done: "fatto",
      note: "Il progresso resta su questo dispositivo.",
    },
    entities: {
      title: "Chi fa cosa",
      lede:
        "Il problema più frequente non è la pratica: è capire a quale ufficio si appartiene. Questa tabella risponde a quello.",
      whatFor: "Di cosa si occupa",
      where: "Dove si trova",
      level: "Livello",
      levels: { stato: "Stato", regione: "Regione", comune: "Comune", altro: "Altro" },
    },
    glossary: {
      title: "Glossario",
      lede:
        "Le parole che compaiono agli sportelli e nei moduli, con la traduzione e cosa significano davvero.",
      original: "Svedese",
      meaning: "Cosa significa",
    },
    about: {
      title: "Il progetto",
      lede: "Cos’è questo sito, come è fatto, e cosa non è.",
    },
    notFound: {
      title: "Pagina non trovata",
      body: "Il link potrebbe essere vecchio o la guida potrebbe aver cambiato indirizzo.",
      cta: "Vai alle guide",
    },
  },
  footer: {
    built: "Sito statico, senza cookie di tracciamento e senza pubblicità.",
    sources: "Ogni guida linka le fonti ufficiali che la sostengono.",
    license: "Testi riutilizzabili con attribuzione (CC BY 4.0).",
    contribute: "Trovato un errore o una regola cambiata? Scrivimi su looz.design",
    sister: "Ti trasferisci in Italia?",
  },
};

const sv: Dict = {
  site: {
    name: "Svezia Pratica",
    tagline: "Den svenska byråkratin, steg för steg",
    description:
      "Gratis och oberoende guide för dig som flyttar till Sverige: personnummer, folkbokföring, BankID, bostad, sjukvård och Försäkringskassan. På svenska, engelska och italienska.",
  },
  nav: {
    guides: "Guider",
    checklist: "Första 90 dagarna",
    entities: "Vem gör vad",
    glossary: "Ordlista",
    about: "Om projektet",
    menu: "Meny",
    close: "Stäng",
    theme: "Tema",
    language: "Språk",
  },
  home: {
    eyebrow: "Gratis · Ingen registrering · Tre språk",
    titleLead: "Flytta till Sverige,",
    titleAccent: "en myndighet i taget.",
    lede:
      "Varje ärende förklarat i den ordning det faktiskt ska göras: vad som krävs, vart du går, vad det kostar, hur lång tid det tar. Med länkar till officiella källor och utan mellanhänder som säljer tjänster.",
    ctaPrimary: "Börja med de första 90 dagarna",
    ctaSecondary: "Bläddra bland alla guider",
    statGuides: "guider",
    statLangs: "språk",
    statFunding: "finansieras av",
    statFundingValue: "donationer",
    pathTitle: "Ordningen som fungerar",
    pathLede:
      "Vissa ärenden låser upp andra. Kommer du från ett land utanför EU kommer uppehållstillståndet först; sedan folkbokföringen, som ger dig personnummer; sedan ID-kortet; sedan bankkonto och BankID. Med de på plats går nästan allt annat att ordna: vård, bidrag, jobb.",
    categoriesTitle: "Alla områden",
    categoriesLede:
      "{count} guider, uppdaterade för hand, var och en med datum för senaste genomgång högst upp.",
    freeTitle: "Varför det är gratis",
    freeBody:
      "Inget av det här kräver en betald mellanhand. Folkbokföringen är gratis, personnumret är gratis, svenskundervisningen SFI är gratis. Sajten finns för att den informationen inte ska behöva köpas av en relocation-byrå.",
    euTitle: "EU, EES och resten av världen",
    euBody:
      "Reglerna skiljer sig radikalt. Medborgare i EU, EES och Schweiz har uppehållsrätt och behöver inget tillstånd; kommer du från ett land utanför EU behöver du som regel uppehållstillstånd innan du reser. Nordiska medborgare har egna regler. Varje guide markerar tydligt var vägarna delar sig.",
  },
  common: {
    updated: "Uppdaterad",
    reviewed: "kontrollerad",
    readingTime: "min läsning",
    officialSources: "Officiella källor",
    officialSourcesNote:
      "Länkar till de ansvariga myndigheterna. Om en sida inte svarar, sök myndighetens namn på verksamt.se eller sverige.se.",
    onThisPage: "På den här sidan",
    related: "Relaterade guider",
    allGuides: "Alla guider",
    backToGuides: "Tillbaka till guiderna",
    search: "Sök",
    searchPlaceholder: "Sök ett ärende, ett kontor, ett ord…",
    searchHint: "Tryck / för att söka",
    noResults: "Inga träffar.",
    translationMissing:
      "Den här guiden är ännu inte översatt till svenska: du läser den italienska versionen.",
    essential: "Grundläggande",
    step: "Steg",
    steps: "steg",
    of: "av",
    reset: "Nollställ",
    progress: "klart",
    filter: "Filtrera",
    all: "Alla",
    copy: "Kopiera",
    copied: "Kopierat",
    openOfficial: "Öppna den officiella sidan",
    skipToContent: "Till innehållet",
  },
  disclaimer: {
    title: "Information, inte rådgivning",
    body:
      "Sajten är skriven med omsorg och hänvisar alltid till den officiella källan, men den är inte juridisk, skattemässig eller migrationsrättslig rådgivning. Svenska regler ändras, och tillämpningen kan skilja sig mellan kommuner och regioner. Innan ett beslut som rör pengar eller rättigheter — ett hyreskontrakt, en tillståndsansökan, en ersättning — kontrollera den länkade källan och ta hjälp av en yrkesperson där det anges.",
    short: "Information, inte rådgivning. Kontrollera alltid mot den officiella källan.",
  },
  support: {
    cta: "Donera",
    bar: {
      question: "Var sidan till hjälp?",
      body: "En donation håller sajten uppe och uppdaterad.",
    },
    campaign: {
      eyebrow: "Kampanj · år ett",
      status: "Pågår",
      title: "{total} dagar online.",
      covered: "Täckta hittills: {days}.",
      intro:
        "Gratis, utan reklam, kontrollerad mot källorna. Det enda som kostar är att hålla den igång: cirka {daily} om dagen. Svezia Pratica och Italia Pratica ligger på samma hosting, så kampanjen är gemensam: en donation håller båda sajterna uppe. Välj hur många dagar du vill bära — pengarna går rakt till hosting och domän.",
      daysCount: "{days} dagar",
      goalLine: "Mål: {total} dagar · {goal}",
      costsTitle: "Vart pengarna går",
      costs: { hosting: "Hosting (Vercel Pro, 18,50 $ + moms)", domain: "Domän" },
      periods: { month: "/ mån", year: "/ år" },
      yearTotal: "Ett år",
      complete: "Första året är täckt. Tack.",
      chooseLevel: "Hur många dagar vill du täcka?",
      heading: "Hur många dagar vill du täcka?",
      custom: "Annan summa",
      customLabel: "Valfri summa, heltal",
      submit: "Donera {amount}",
      submitDays: "Donera {amount} · {days} dagar",
      trust: "Engångsdonation via Revolut · inget konto · vill du vara anonym, skriv ”anonym” i meddelandet",
      listing: "Du syns bland givarna med förnamn och efternamnets initial.",
      transferNote: "Donation till Svezia Pratica",
    },
    inline: {
      title: "Hjälpte den här sidan?",
      body: "Den kontrolleras mot myndigheternas egna sidor och uppdateras när reglerna ändras. Att hålla den uppe kostar {weekly} i veckan.",
      yearOne: "dagar täckta av {total} · år ett",
    },
    donors: {
      title: "Tack till",
      total: "{people} personer har donerat",
      anonymous: "{count} anonyma",
      raised: "{amount} insamlat",
      last: "senaste den",
    },
  },
  author: {
    role: "Designer och webbutvecklare, bor och arbetar i Norrtälje, född och uppvuxen i Kalabrien.",
    footerCredit: "Ideellt projekt av",
  },
  categories: {
    arrivo: {
      label: "Ankomst och dokument",
      description: "Uppehållstillstånd, folkbokföring, personnummer, samordningsnummer, ID-kort, BankID, svenskt medborgarskap, AIRE för italienare, att lämna Sverige.",
    },
    casa: {
      label: "Bostad",
      description: "Hyra, bostadskö, andrahandskontrakt, köpa bostad, hemförsäkring, el och bredband.",
    },
    famiglia: {
      label: "Familj och skola",
      description: "Förskola och skola, graviditet, föräldraledighet, VAB.",
    },
    salute: {
      label: "Hälsa",
      description: "1177, vårdcentral, vad vården kostar.",
    },
    soldi: {
      label: "Trygghet och pengar",
      description: "Försäkringskassan, barnbidrag, sjukpenning, skatt och pension.",
    },
    vita: {
      label: "Jobb och språk",
      description: "SFI (svenska för invandrare), Arbetsförmedlingen, fack och a-kassa, körkort, utländsk utbildning, rösträtt.",
    },
  },
  pages: {
    guides: {
      title: "Alla guider",
      lede:
        "{count} ärenden, sorterade per område. De som är märkta som grundläggande är de som låser upp resten.",
    },
    checklist: {
      title: "De första 90 dagarna",
      lede:
        "Ordningen spelar roll. Listan håller reda på sig själv i din webbläsare: inget konto, ingen data skickas någonstans.",
      done: "klart",
      note: "Framstegen stannar på den här enheten.",
    },
    entities: {
      title: "Vem gör vad",
      lede:
        "Det svåra är sällan ärendet i sig — det är att förstå vilket kontor som är ditt. Den här tabellen svarar på det.",
      whatFor: "Ansvarar för",
      where: "Var det finns",
      level: "Nivå",
      levels: { stato: "Staten", regione: "Region", comune: "Kommun", altro: "Annat" },
    },
    glossary: {
      title: "Ordlista",
      lede:
        "Orden som dyker upp i luckan och på blanketterna, med översättning och vad de faktiskt betyder.",
      original: "Svenska",
      meaning: "Betyder",
    },
    about: {
      title: "Om projektet",
      lede: "Vad sajten är, hur den är byggd, och vad den inte är.",
    },
    notFound: {
      title: "Sidan hittades inte",
      body: "Länken kan vara gammal, eller så har guiden bytt adress.",
      cta: "Gå till guiderna",
    },
  },
  footer: {
    built: "Statisk sajt, utan spårningskakor och utan reklam.",
    sources: "Varje guide länkar de officiella källor den vilar på.",
    license: "Texterna får återanvändas med källhänvisning (CC BY 4.0).",
    contribute: "Hittat ett fel eller en regel som ändrats? Hör av dig på looz.design",
    sister: "Flyttar du till Italien?",
  },
};

const en: Dict = {
  site: {
    name: "Svezia Pratica",
    tagline: "Swedish bureaucracy, explained step by step",
    description:
      "A free, independent guide for people moving to Sweden: personnummer, folkbokföring, BankID, housing, healthcare and Försäkringskassan. In English, Swedish and Italian.",
  },
  nav: {
    guides: "Guides",
    checklist: "First 90 days",
    entities: "Who does what",
    glossary: "Glossary",
    about: "About",
    menu: "Menu",
    close: "Close",
    theme: "Theme",
    language: "Language",
  },
  home: {
    eyebrow: "Free · No sign-up · Three languages",
    titleLead: "Moving to Sweden,",
    titleAccent: "one agency at a time.",
    lede:
      "Every procedure explained in the order you actually have to do it: what to bring, where to go, what it costs, how long it takes. With links to the official sources, and no middlemen selling services.",
    ctaPrimary: "Start with the first 90 days",
    ctaSecondary: "Browse all guides",
    statGuides: "guides",
    statLangs: "languages",
    statFunding: "funded by",
    statFundingValue: "donations",
    pathTitle: "The order that works",
    pathLede:
      "Some steps unlock others. If you come from outside the EU, the residence permit comes first; then folkbokföring, which gives you a personnummer; then an ID card; then a bank account and BankID. Once those are in place, almost everything else (healthcare, benefits, work) becomes possible.",
    categoriesTitle: "All areas",
    categoriesLede:
      "{count} guides, maintained by hand, each with its last review date at the top.",
    freeTitle: "Why it is free",
    freeBody:
      "None of this requires a paid intermediary. Registering in folkbokföring is free, the personnummer is free, the SFI Swedish course is free. This site exists because that information should not have to be bought from a relocation agency.",
    euTitle: "EU, EEA and the rest of the world",
    euBody:
      "The rules differ radically. EU, EEA and Swiss citizens have a right of residence and need no permit; if you come from outside the EU you generally need a residence permit before you arrive. Nordic citizens have rules of their own. Every guide flags where the paths split.",
  },
  common: {
    updated: "Updated",
    reviewed: "checked",
    readingTime: "min read",
    officialSources: "Official sources",
    officialSourcesNote:
      "Links to the responsible authorities. If a page does not respond, search the agency’s name on verksamt.se or sverige.se.",
    onThisPage: "On this page",
    related: "Related guides",
    allGuides: "All guides",
    backToGuides: "Back to guides",
    search: "Search",
    searchPlaceholder: "Search a procedure, an office, a word…",
    searchHint: "Press / to search",
    noResults: "No results.",
    translationMissing:
      "This guide is not translated into this language yet: you are reading the Italian version.",
    essential: "Essential",
    step: "Step",
    steps: "steps",
    of: "of",
    reset: "Reset",
    progress: "done",
    filter: "Filter",
    all: "All",
    copy: "Copy",
    copied: "Copied",
    openOfficial: "Open the official site",
    skipToContent: "Skip to content",
  },
  disclaimer: {
    title: "Information, not advice",
    body:
      "This site is written carefully and always points at the official source, but it is not legal, tax or immigration advice. Swedish rules change, and how they are applied can vary from one municipality and region to the next. Before a decision involving money or rights — a rental contract, a permit application, a benefit — check the linked source and, where indicated, work with a professional.",
    short: "Information, not advice. Always check the official source.",
  },
  support: {
    cta: "Donate",
    bar: {
      question: "Was this page useful?",
      body: "A donation keeps the site up and current.",
    },
    campaign: {
      eyebrow: "Campaign · year one",
      status: "Ongoing",
      title: "{total} days online.",
      covered: "Covered so far: {days}.",
      intro:
        "Free, no ads, checked against the sources. The only thing that costs is keeping it on: about {daily} a day. Svezia Pratica and Italia Pratica run on the same hosting, so the campaign is shared: one donation keeps both sites online. Choose how many days you want to carry — the money goes straight to hosting and the domain.",
      daysCount: "{days} days",
      goalLine: "Goal: {total} days · {goal}",
      costsTitle: "Where the money goes",
      costs: { hosting: "Hosting (Vercel Pro, $18.50 + VAT)", domain: "Domain" },
      periods: { month: "/ month", year: "/ year" },
      yearTotal: "One year",
      complete: "Year one is covered. Thank you.",
      chooseLevel: "How many days do you want to cover?",
      heading: "How many days do you want to cover?",
      custom: "Another amount",
      customLabel: "Free amount, whole numbers",
      submit: "Donate {amount}",
      submitDays: "Donate {amount} · {days} days",
      trust: "One-off via Revolut · no account · to give anonymously, write “anonymous” in the note",
      listing: "You will be listed among donors by first name and last initial.",
      transferNote: "Donation to Svezia Pratica",
    },
    inline: {
      title: "Did this page help?",
      body: "It is checked against the official pages and updated when the rules change. Keeping it up costs {weekly} a week.",
      yearOne: "days covered of {total} · year one",
    },
    donors: {
      title: "Thanks to",
      total: "{people} people have donated",
      anonymous: "{count} anonymous",
      raised: "{amount} raised",
      last: "latest on",
    },
  },
  author: {
    role: "Designer and web developer, living and working in Norrtälje, born and raised in Calabria.",
    footerCredit: "A volunteer project by",
  },
  categories: {
    arrivo: {
      label: "Arrival and documents",
      description: "Residence permit, folkbokföring, personnummer, samordningsnummer, ID card, BankID, Swedish citizenship, AIRE for Italians, leaving Sweden.",
    },
    casa: {
      label: "Housing",
      description: "Renting, the housing queue, sublet contracts, buying a home, home insurance, electricity and internet.",
    },
    famiglia: {
      label: "Family and school",
      description: "Preschool and school, pregnancy, parental leave, VAB.",
    },
    salute: {
      label: "Health",
      description: "1177, the vårdcentral (health centre), what care costs.",
    },
    soldi: {
      label: "Benefits and money",
      description: "Försäkringskassan, child allowance, sick pay, tax and pensions.",
    },
    vita: {
      label: "Work and language",
      description: "SFI (Swedish for immigrants), Arbetsförmedlingen, unions and a-kassa (unemployment insurance), driving licence, foreign qualifications, voting.",
    },
  },
  pages: {
    guides: {
      title: "All guides",
      lede:
        "{count} procedures, grouped by area. The ones marked essential are the ones that unlock the rest.",
    },
    checklist: {
      title: "The first 90 days",
      lede:
        "Order matters. This list keeps its own score in your browser: no account, no data sent anywhere.",
      done: "done",
      note: "Progress stays on this device.",
    },
    entities: {
      title: "Who does what",
      lede:
        "The hard part is rarely the procedure — it is working out which office is yours. This table answers that.",
      whatFor: "Responsible for",
      where: "Where to find it",
      level: "Level",
      levels: { stato: "State", regione: "Region", comune: "Municipality", altro: "Other" },
    },
    glossary: {
      title: "Glossary",
      lede:
        "The words that show up at the counter and on the forms, with a translation and what they actually mean.",
      original: "Swedish",
      meaning: "Means",
    },
    about: {
      title: "About",
      lede: "What this site is, how it is built, and what it is not.",
    },
    notFound: {
      title: "Page not found",
      body: "The link may be old, or the guide may have moved.",
      cta: "Go to the guides",
    },
  },
  footer: {
    built: "Static site, no tracking cookies, no ads.",
    sources: "Every guide links the official sources behind it.",
    license: "Text reusable with attribution (CC BY 4.0).",
    contribute: "Found an error, or a rule that changed? Get in touch at looz.design",
    sister: "Moving to Italy?",
  },
};

export const dictionaries: Record<Locale, Dict> = { it, sv, en };

export function getDict(locale: Locale): Dict {
  return dictionaries[locale];
}
