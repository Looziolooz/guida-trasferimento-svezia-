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
    guides: ["pension", "flytta-fran-sverige"],
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
  {
    id: "ambasciata-italia-stoccolma",
    name: "Ambasciata d’Italia a Stoccolma",
    level: "altro",
    site: "https://ambstoccolma.esteri.it/",
    phone: "+46 8 545 671 00",
    what: {
      it: "Per i cittadini italiani: iscrizione AIRE, passaporti, carta d’identità elettronica (CIE), trascrizione degli atti di stato civile e voto all’estero.",
      sv: "För italienska medborgare: AIRE-registrering, pass, elektroniskt ID-kort (CIE), registrering av civilståndshandlingar i Italien och röstning utomlands.",
      en: "For Italian citizens: AIRE registration, passports, the electronic identity card (CIE), transcription of civil-status records and voting abroad.",
    },
    where: {
      it: "Djurgårdsvägen 174, Stoccolma. Si riceve solo su appuntamento, da prenotare su Prenot@mi.",
      sv: "Djurgårdsvägen 174, Stockholm. Besök endast efter tidsbokning via Prenot@mi.",
      en: "Djurgårdsvägen 174, Stockholm. By appointment only, booked through Prenot@mi.",
    },
    guides: ["aire"],
  },
  {
    id: "lantmateriet",
    name: "Lantmäteriet",
    level: "stato",
    site: "https://www.lantmateriet.se/",
    what: {
      it: "L’autorità del catasto: registra chi è proprietario di una casa o di un terreno (lagfart) e le ipoteche (pantbrev).",
      sv: "Myndigheten för fastighetsregistret: registrerar vem som äger en fastighet (lagfart) och pantbreven.",
      en: "The land registry authority: records who owns a house or land (lagfart) and mortgage deeds (pantbrev).",
    },
    where: {
      it: "Online, sul sito dell’autorità. La lagfart si chiede dopo l’acquisto di una casa di proprietà, non per una bostadsrätt.",
      sv: "Online, på myndighetens webbplats. Lagfart söker du efter köp av ett hus, inte för en bostadsrätt.",
      en: "Online, on the authority’s website. You apply for lagfart after buying an owned house, not for a bostadsrätt.",
    },
    guides: ["kopa-bostad"],
  },
  {
    id: "fmi",
    name: "Fastighetsmäklarinspektionen (FMI)",
    level: "stato",
    site: "https://fmi.se/",
    what: {
      it: "Vigila sugli agenti immobiliari (fastighetsmäklare) e può disciplinarli o revocare la loro iscrizione.",
      sv: "Tillsynsmyndighet över fastighetsmäklare; kan ge varning eller återkalla en mäklares registrering.",
      en: "Supervises estate agents (fastighetsmäklare) and can discipline them or remove their registration.",
    },
    where: {
      it: "Online. Puoi segnalare un agente immobiliare dal sito dell’autorità.",
      sv: "Online. Du kan anmäla en fastighetsmäklare via myndighetens webbplats.",
      en: "Online. You can report an estate agent through the authority’s website.",
    },
    guides: ["kopa-bostad"],
  },
  {
    id: "finansinspektionen",
    name: "Finansinspektionen (FI)",
    level: "stato",
    site: "https://www.fi.se/",
    what: {
      it: "L’autorità di vigilanza su banche e mercati finanziari; fino al 1° aprile 2026 fissava le regole sul tetto del mutuo e sul rimborso, oggi regolati per legge.",
      sv: "Tillsynsmyndighet för banker och finansmarknaden; fastställde fram till 1 april 2026 bolånetak och amorteringskrav, som nu regleras i lag.",
      en: "The supervisor of banks and financial markets; until 1 April 2026 it set the mortgage-cap and repayment rules, which are now set by law.",
    },
    where: {
      it: "Online, sul sito dell’autorità.",
      sv: "Online, på myndighetens webbplats.",
      en: "Online, on the authority’s website.",
    },
    guides: ["kopa-bostad"],
  },
  {
    id: "medlingsinstitutet",
    name: "Medlingsinstitutet",
    level: "stato",
    site: "https://www.mi.se/",
    what: {
      it: "L’agenzia per le trattative salariali: pubblica le statistiche sui contratti collettivi e sull’iscrizione ai sindacati.",
      sv: "Myndigheten för lönebildning och medling: publicerar statistik om kollektivavtalstäckning och organisationsgrad.",
      en: "The agency for wage bargaining and mediation: publishes statistics on collective-agreement coverage and union membership.",
    },
    where: {
      it: "Online, sul sito dell’autorità.",
      sv: "Online, på myndighetens webbplats.",
      en: "Online, on the authority’s website.",
    },
    guides: ["fack-och-a-kassa"],
  },
  {
    id: "transportstyrelsen",
    name: "Transportstyrelsen",
    level: "stato",
    site: "https://www.transportstyrelsen.se/",
    what: {
      it: "L’autorità per patenti e veicoli: scambio delle patenti estere, immatricolazione e importazione di auto (ursprungskontroll), trafikförsäkring, pneumatici invernali e trängselskatt.",
      sv: "Myndigheten för körkort och fordon: byte av utländska körkort, registrering och import av fordon (ursprungskontroll), trafikförsäkring, vinterdäck och trängselskatt.",
      en: "The authority for driving licences and vehicles: exchange of foreign licences, registration and import of cars (ursprungskontroll), trafikförsäkring, winter tyres and trängselskatt.",
    },
    where: {
      it: "Online. Per le patenti si compila la domanda e poi foto e firma si danno a un ufficio Trafikverket.",
      sv: "Online. För körkort fyller du i ansökan och lämnar sedan foto och underskrift hos ett Trafikverket-kontor.",
      en: "Online. For licences you fill in the application and then give photo and signature at a Trafikverket office.",
    },
    guides: ["korkort-och-bil", "hemforsakring", "flytta-fran-sverige"],
  },
  {
    id: "trafikverket",
    name: "Trafikverket",
    level: "stato",
    site: "https://www.trafikverket.se/",
    what: {
      it: "L’agenzia dei trasporti: gestisce gli esami di teoria e guida e riceve foto e firma per lo scambio della patente.",
      sv: "Transportmyndigheten: ansvarar för kunskaps- och körprov och tar emot foto och underskrift vid byte av körkort.",
      en: "The transport agency: runs the theory and driving tests and takes the photo and signature when a licence is exchanged.",
    },
    where: {
      it: "Negli uffici Trafikverket, su prenotazione online.",
      sv: "På Trafikverkets kontor, med bokad tid online.",
      en: "At Trafikverket offices, by online booking.",
    },
    guides: ["korkort-och-bil"],
  },
  {
    id: "uhr",
    name: "UHR (Universitets- och högskolerådet)",
    level: "stato",
    site: "https://www.uhr.se/",
    what: {
      it: "Valuta gratuitamente a cosa corrisponde in Svezia un titolo di studio estero. Non è una laurea svedese e non sostituisce un’abilitazione professionale.",
      sv: "Bedömer kostnadsfritt vad en utländsk utbildning motsvarar i Sverige. Det är inget svenskt examensbevis och ersätter inte en yrkeslegitimation.",
      en: "Assesses free of charge what a foreign qualification corresponds to in Sweden. It is not a Swedish degree and does not replace a professional licence.",
    },
    where: {
      it: "Domanda online; tempi medi 2–4 mesi da domanda completa.",
      sv: "Ansökan online; handläggningstiden är i genomsnitt 2–4 månader från komplett ansökan.",
      en: "Online application; average processing is 2–4 months from a complete application.",
    },
    guides: ["utlandsk-utbildning", "sfi-och-arbete"],
  },
  {
    id: "socialstyrelsen",
    name: "Socialstyrelsen",
    level: "stato",
    site: "https://www.socialstyrelsen.se/",
    what: {
      it: "Rilascia la legitimation alle professioni sanitarie (medici, infermieri, dentisti, farmacisti, ostetriche e altre). Serve lo svedese: una prova accettata è il livello C1.",
      sv: "Utfärdar legitimation för vårdyrken (läkare, sjuksköterskor, tandläkare, apotekare, barnmorskor med flera). Svenska krävs: ett godtaget bevis är nivå C1.",
      en: "Issues the legitimation for healthcare professions (doctors, nurses, dentists, pharmacists, midwives and others). Swedish is required: one accepted proof is level C1.",
    },
    where: {
      it: "Domanda online sul portale della legitimation; decisione di solito in 3–4 mesi da domanda completa.",
      sv: "Ansökan online via legitimationsportalen; beslut oftast inom 3–4 månader från komplett ansökan.",
      en: "Online application via the legitimation portal; a decision usually within 3–4 months of a complete application.",
    },
    guides: ["utlandsk-utbildning"],
  },
  {
    id: "energimarknadsinspektionen",
    name: "Energimarknadsinspektionen",
    level: "stato",
    site: "https://ei.se/",
    what: {
      it: "L’autorità di vigilanza sul mercato dell’energia. Il suo sito Elpriskollen confronta i contratti di luce in modo indipendente.",
      sv: "Tillsynsmyndigheten för energimarknaderna. Dess webbplats Elpriskollen jämför elavtal oberoende.",
      en: "The regulator of the energy markets. Its site Elpriskollen compares electricity contracts independently.",
    },
    where: {
      it: "Online: elpriskollen.se.",
      sv: "Online: elpriskollen.se.",
      en: "Online: elpriskollen.se.",
    },
    guides: ["el-bredband-mobil"],
  },
  {
    id: "konsumenternas",
    name: "Konsumenternas",
    level: "altro",
    site: "https://www.konsumenternas.se/",
    what: {
      it: "Consulenza indipendente ai consumatori su assicurazioni, banca, energia e altro. Telefono 0200-22 58 00, giorni feriali 9–12.",
      sv: "Oberoende konsumentrådgivning om försäkringar, bank, el med mera. Telefon 0200-22 58 00, vardagar 9–12.",
      en: "Independent consumer advice on insurance, banking, energy and more. Phone 0200-22 58 00, weekdays 9–12.",
    },
    where: {
      it: "Per telefono o sul sito; per le controversie con le compagnie c’è poi l’ARN.",
      sv: "Per telefon eller på webbplatsen; vid tvister med bolagen finns ARN.",
      en: "By phone or on the website; for disputes with companies there is then the ARN.",
    },
    guides: ["hemforsakring", "el-bredband-mobil"],
  },
  {
    id: "valmyndigheten",
    name: "Valmyndigheten",
    level: "stato",
    site: "https://www.val.se/",
    what: {
      it: "L’autorità elettorale: informa su chi può votare alle elezioni di Riksdag, regione e comune e alle europee.",
      sv: "Valmyndigheten: informerar om vem som får rösta i riksdags-, region-, kommun- och Europaparlamentsvalet.",
      en: "The election authority: explains who can vote in the Riksdag, regional, municipal and European elections.",
    },
    where: {
      it: "Sul sito; per le europee l’iscrizione alla röstlängden si fa alla länsstyrelse.",
      sv: "På webbplatsen; för Europaparlamentsvalet sker anmälan till röstlängden hos länsstyrelsen.",
      en: "On the website; for the European elections you register on the röstlängd with the länsstyrelse.",
    },
    guides: ["rostratt"],
  },
  {
    id: "csn",
    name: "CSN",
    level: "stato",
    site: "https://www.csn.se/",
    what: {
      it: "L’agenzia dei prestiti e sussidi di studio. Se te ne vai, comunica il nuovo indirizzo; per pagare dall’estero registra prima l’indirizzo estero.",
      sv: "Myndigheten för studiemedel. Flyttar du, anmäl din nya adress; för att betala från utlandet registrerar du först din utländska adress.",
      en: "The agency for student loans and grants. If you leave, report your new address; to pay from abroad, first register your foreign address.",
    },
    where: {
      it: "Online, su Mina sidor di CSN.",
      sv: "Online, via Mina sidor hos CSN.",
      en: "Online, via CSN’s Mina sidor.",
    },
    guides: ["flytta-fran-sverige"],
  },
];

export const entityLevels: EntityLevel[] = ["stato", "regione", "comune", "altro"];
