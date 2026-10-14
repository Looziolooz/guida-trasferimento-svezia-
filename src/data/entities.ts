import type { Locale } from "@/lib/locales";

export type EntityLevel = "stato" | "regione" | "comune" | "altro";

export type Entity = {
  id: string;
  /** Nome ufficiale svedese: è quello che si legge sulla porta e sui moduli. */
  name: string;
  level: EntityLevel;
  site?: string;
  phone?: string;
  what: Record<Locale, string>;
  where: Record<Locale, string>;
  /** Slug delle guide che riguardano questo ente. */
  guides?: string[];
};

export const entities: Entity[] = [
  {
    id: "skatteverket",
    name: "Skatteverket",
    level: "stato",
    site: "https://www.skatteverket.se/",
    what: {
      it: "L’agenzia delle entrate svedese, che tiene anche il registro della popolazione: folkbokföring e personnummer, samordningsnummer, carta d’identità (finché il servizio esiste) e dichiarazione dei redditi.",
      sv: "Skatteförvaltningen, som också för folkbokföringen: personnummer, samordningsnummer, ID-kort (så länge verksamheten finns) och deklaration.",
      en: "The Swedish tax agency, which also keeps the population register: folkbokföring and personnummer, samordningsnummer, ID cards (while the service lasts) and the tax return.",
    },
    where: {
      it: "Si comincia online (“Flytta till Sverige”). Il controllo d’identità si fa di persona, su prenotazione, in un servicekontor gestito da Statens servicecenter.",
      sv: "Du börjar online (”Flytta till Sverige”). Id-kontrollen görs personligen, med bokad tid, på ett servicekontor som drivs av Statens servicecenter.",
      en: "You start online (“Flytta till Sverige”). The identity check is done in person, by appointment, at a servicekontor run by Statens servicecenter.",
    },
    guides: ["folkbokforing", "samordningsnummer", "bankid"],
  },
  {
    id: "migrationsverket",
    name: "Migrationsverket",
    level: "stato",
    site: "https://www.migrationsverket.se/",
    what: {
      it: "Decide sui permessi di soggiorno e di lavoro, sulla carta di soggiorno dei familiari non UE di cittadini UE (uppehållskort) e sulla cittadinanza. I cittadini UE/SEE con diritto di soggiorno non devono rivolgersi a loro.",
      sv: "Beslutar om uppehållstillstånd och arbetstillstånd, uppehållskort för familjemedlemmar utanför EU till EU-medborgare, och om medborgarskap. EU/EES-medborgare med uppehållsrätt behöver inte kontakta Migrationsverket.",
      en: "Decides on residence and work permits, on the residence card for non-EU family members of EU citizens (uppehållskort) and on citizenship. EU/EEA citizens with a right of residence do not need to contact them.",
    },
    where: {
      it: "Le domande si fanno soprattutto online; foto e impronte, se servono, all’ambasciata o con un controllo di persona.",
      sv: "Ansökningar görs främst online; foto och fingeravtryck, när de behövs, lämnas på ambassaden eller vid ett personligt besök.",
      en: "Applications are mostly made online; photo and fingerprints, when needed, are given at the embassy or in person.",
    },
    guides: ["uppehallstillstand"],
  },
  {
    id: "forsakringskassan",
    name: "Försäkringskassan",
    level: "stato",
    site: "https://www.forsakringskassan.se/",
    what: {
      it: "La cassa delle assicurazioni sociali: barnbidrag, föräldrapenning, sjukpenning, bostadsbidrag e altre prestazioni legate a dove vivi o lavori.",
      sv: "Socialförsäkringsmyndigheten: barnbidrag, föräldrapenning, sjukpenning, bostadsbidrag och andra förmåner som beror på var du bor eller arbetar.",
      en: "The social insurance agency: barnbidrag, föräldrapenning, sjukpenning, bostadsbidrag and other benefits that depend on where you live or work.",
    },
    where: {
      it: "Verifica se sei assicurato quando chiedi una prestazione; se non hai il personnummer può chiedere per te un samordningsnummer.",
      sv: "De kontrollerar om du är försäkrad när du ansöker om en förmån; saknar du personnummer kan de begära ett samordningsnummer åt dig.",
      en: "They check whether you are insured when you apply for a benefit; if you have no personnummer they can request a samordningsnummer for you.",
    },
    guides: ["forsakringskassan"],
  },
  {
    id: "arbetsformedlingen",
    name: "Arbetsförmedlingen",
    level: "stato",
    site: "https://arbetsformedlingen.se/",
    what: {
      it: "Il servizio pubblico per l’impiego: ci si iscrive come persona in cerca di lavoro, cosa che serve anche per l’indennità dell’a-kassa.",
      sv: "Den offentliga arbetsförmedlingen: du anmäler dig som arbetssökande, vilket också behövs för ersättning från a-kassan.",
      en: "The public employment service: you register as a job seeker, which is also needed for a-kassa benefits.",
    },
    where: {
      it: "Online e negli uffici locali.",
      sv: "Online och på lokala kontor.",
      en: "Online and at local offices.",
    },
    guides: ["sfi-och-arbete"],
  },
  {
    id: "a-kassa",
    name: "A-kassa (arbetslöshetskassor)",
    level: "altro",
    site: "https://www.iaf.se/",
    what: {
      it: "Le casse di disoccupazione a cui ti iscrivi per avere l’indennità basata sul reddito. Sono sorvegliate da IAF, l’ispettorato per l’assicurazione contro la disoccupazione.",
      sv: "Arbetslöshetskassorna, där du blir medlem för att få inkomstrelaterad ersättning vid arbetslöshet. De står under tillsyn av IAF, Inspektionen för arbetslöshetsförsäkringen.",
      en: "The unemployment insurance funds you join to get income-based benefit. They are supervised by IAF, the Unemployment Insurance Inspectorate.",
    },
    where: {
      it: "Ogni cassa ha il suo sito; iscriviti presto, perché la percentuale dell’indennità dipende da quanto a lungo sei stato iscritto.",
      sv: "Varje kassa har sin egen webbplats; gå med tidigt, eftersom ersättningsnivån beror på hur länge du varit medlem.",
      en: "Each fund has its own website; join early, because the benefit level depends on how long you have been a member.",
    },
    guides: ["sfi-och-arbete"],
  },
  {
    id: "regioner-1177",
    name: "Regionerna och 1177",
    level: "regione",
    site: "https://www.1177.se/",
    phone: "1177",
    what: {
      it: "La sanità la gestiscono le regioni, che fissano quasi da sole i ticket. 1177 è il numero (24 ore su 24) e il sito per consigli sanitari, per scegliere la vårdcentral e prenotare.",
      sv: "Regionerna ansvarar för sjukvården och bestämmer i stort sett själva patientavgifterna. 1177 är numret (dygnet runt) och webbplatsen för sjukvårdsrådgivning, val av vårdcentral och tidsbokning.",
      en: "The regions run healthcare and largely set the patient fees themselves. 1177 is the 24-hour number and website for health advice, choosing a vårdcentral and booking.",
    },
    where: {
      it: "Per le emergenze gravi chiama il 112, non il 1177.",
      sv: "Vid akuta nödlägen ring 112, inte 1177.",
      en: "For serious emergencies call 112, not 1177.",
    },
    guides: ["vard"],
  },
  {
    id: "kommun",
    name: "Kommunen",
    level: "comune",
    site: "https://www.skolverket.se/",
    what: {
      it: "Il comune: organizza SFI (svedese per stranieri), scuole e asili, servizi sociali.",
      sv: "Kommunen ansvarar för SFI, förskola och skola samt socialtjänst.",
      en: "The municipality runs SFI (Swedish for immigrants), schools and preschools, and social services.",
    },
    where: {
      it: "Nel comune dove vivi; per SFI il personnummer non è richiesto. Il sito indicato è quello di Skolverket, l’autorità scolastica, con le regole su SFI.",
      sv: "I den kommun där du bor; för SFI krävs inte personnummer. Webbplatsen som länkas är Skolverkets, med reglerna för SFI.",
      en: "In the municipality where you live; a personnummer is not required for SFI. The linked site is Skolverket’s, the schools authority, with the SFI rules.",
    },
    guides: ["sfi-och-arbete"],
  },
  {
    id: "polismyndigheten",
    name: "Polismyndigheten",
    level: "stato",
    site: "https://polisen.se/",
    phone: "112",
    what: {
      it: "La Polizia: emergenze (112), denunce non urgenti (114 14), passaporti per i cittadini svedesi. Dal 1° dicembre 2026 rilascia anche la nuova e-legitimation di Stato “Sverige-id” e una carta d’identità speciale ai residenti registrati non cittadini svedesi, senza funzione di viaggio.",
      sv: "Polisen: nödsituationer (112), anmälningar som inte är akuta (114 14), pass till svenska medborgare. Från 1 december 2026 utfärdar Polisen också den nya statliga e-legitimationen ”Sverige-id” och ett särskilt ID-kort till folkbokförda som inte är svenska medborgare, utan resefunktion.",
      en: "The Police: emergencies (112), non-urgent reports (114 14), passports for Swedish citizens. From 1 December 2026 they also issue the new state e-ID “Sverige-id” and a special ID card to registered residents who are not Swedish citizens, without a travel function.",
    },
    where: {
      it: "112 per le emergenze; 114 14 per le denunce, comprese le truffe sugli annunci di casa.",
      sv: "112 vid nödsituationer; 114 14 för anmälan, bland annat vid bostadsbedrägerier.",
      en: "112 for emergencies; 114 14 for reports, including housing-ad scams.",
    },
    guides: ["bankid", "bostad"],
  },
  {
    id: "hyresnamnden",
    name: "Hyresnämnden",
    level: "altro",
    site: "https://www.domstol.se/amnen/hyra-bostadsratt-och-arrende/",
    what: {
      it: "Il collegio che decide le controversie sugli affitti: affitto non ragionevole, subaffitto, restituzione dell’eccedenza pagata dal subinquilino.",
      sv: "Nämnden som prövar hyrestvister: oskälig hyra, andrahandsuthyrning och återbetalning av för mycket betald hyra till en andrahandshyresgäst.",
      en: "The tribunal that rules on rent disputes: unreasonable rent, subletting and repayment of overpaid rent to a subtenant.",
    },
    where: {
      it: "Fa parte dei tribunali svedesi (domstol.se).",
      sv: "Hyresnämnden är en del av de svenska domstolarna (domstol.se).",
      en: "It is part of the Swedish courts (domstol.se).",
    },
    guides: ["bostad"],
  },
  {
    id: "arn",
    name: "Allmänna reklamationsnämnden (ARN)",
    level: "stato",
    site: "https://www.arn.se/",
    what: {
      it: "L’organismo che esamina i reclami dei consumatori, tra cui quelli contro una banca che ti rifiuta un conto di pagamento di base.",
      sv: "Nämnden som prövar konsumenttvister, bland annat när en bank nekat dig ett betalkonto.",
      en: "The board that handles consumer complaints, including against a bank that refuses you a basic payment account.",
    },
    where: {
      it: "Prima il responsabile reclami della banca, poi ARN.",
      sv: "Först bankens klagomålsansvarige, sedan ARN.",
      en: "First the bank’s complaints officer, then ARN.",
    },
    guides: ["bankid"],
  },
  {
    id: "konsumenternas-bank",
    name: "Konsumenternas Bank- och finansbyrå",
    level: "altro",
    site: "https://www.konsumenternas.se/",
    phone: "0200-22 58 00",
    what: {
      it: "Consulenza gratuita su banca e finanza personale, anche se una banca ti ha rifiutato un conto.",
      sv: "Kostnadsfri rådgivning om bank och privatekonomi, även om en bank har nekat dig konto.",
      en: "Free advice on banking and personal finance, including when a bank has refused you an account.",
    },
    where: {
      it: "Per telefono nei giorni feriali, dalle 9 alle 12.",
      sv: "Per telefon på vardagar kl. 9–12.",
      en: "By phone on weekdays, 9–12.",
    },
    guides: ["bankid"],
  },
  {
    id: "pensionsmyndigheten",
    name: "Pensionsmyndigheten",
    level: "stato",
    site: "https://www.pensionsmyndigheten.se/",
    what: {
      it: "L’autorità che gestisce la pensione pubblica svedese.",
      sv: "Myndigheten som administrerar den allmänna pensionen.",
      en: "The agency that administers the Swedish public pension.",
    },
    where: {
      it: "Online, sul sito dell’autorità.",
      sv: "Online, på myndighetens webbplats.",
      en: "Online, on the agency’s website.",
    },
  },
  {
    id: "statens-servicecenter",
    name: "Statens servicecenter",
    level: "stato",
    site: "https://www.statenssc.se/",
    what: {
      it: "Gestisce i servicekontor, gli sportelli dove si fanno i controlli d’identità di Skatteverket.",
      sv: "Driver servicekontoren, där Skatteverkets id-kontroller görs.",
      en: "Runs the servicekontor, the offices where Skatteverket’s identity checks are done.",
    },
    where: {
      it: "Il controllo d’identità va prenotato in uno degli uffici indicati; non tutti i servicekontor rilasciano carte d’identità.",
      sv: "Id-kontrollen ska bokas på något av de angivna kontoren; inte alla servicekontor utfärdar ID-kort.",
      en: "The identity check must be booked at one of the listed offices; not every servicekontor issues ID cards.",
    },
    guides: ["folkbokforing", "samordningsnummer"],
  },
];

export const entityLevels: EntityLevel[] = ["stato", "regione", "comune", "altro"];
