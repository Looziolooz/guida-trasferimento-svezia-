import type { CategoryId } from "@/lib/guides";
import type { Locale } from "@/lib/locales";

export type Term = {
  /** Il termine nella lingua originale (svedese), com’è scritto sui moduli. */
  sv: string;
  it: string;
  en: string;
  group: CategoryId;
  note: Record<Locale, string>;
};

export const glossary: Term[] = [
  // ── Arrivo e documenti ────────────────────────────────────────────────
  {
    sv: "Personnummer",
    it: "Numero di identità personale",
    en: "Personal identity number",
    group: "arrivo",
    note: {
      it: "Il numero che ricevi con la prima registrazione in folkbokföring. Serve per quasi tutto: banca, BankID, sanità, prestazioni.",
      sv: "Numret du får när du folkbokförs första gången. Det behövs till nästan allt: bank, BankID, vård och förmåner.",
      en: "The number you receive when you are first registered in folkbokföring. You need it for almost everything: bank, BankID, healthcare, benefits.",
    },
  },
  {
    sv: "Samordningsnummer",
    it: "Numero di coordinamento",
    en: "Coordination number",
    group: "arrivo",
    note: {
      it: "Numero di identificazione per chi non è mai stato registrato in folkbokföring, per esempio se resti meno di un anno. Non è un personnummer e vale 5 anni.",
      sv: "Identitetsnummer för den som aldrig varit folkbokförd, till exempel om du stannar under ett år. Det är inte ett personnummer och gäller i 5 år.",
      en: "An identification number for people who have never been registered in folkbokföring, for example if you stay under a year. It is not a personnummer and is valid for 5 years.",
    },
  },
  {
    sv: "Folkbokföring",
    it: "Registrazione anagrafica",
    en: "Population registration",
    group: "arrivo",
    note: {
      it: "Il registro della popolazione tenuto da Skatteverket. Ti registri se pensi di restare almeno un anno; qui nasce il personnummer.",
      sv: "Befolkningsregistret som Skatteverket för. Du folkbokförs om du planerar att bo här minst ett år; här skapas personnumret.",
      en: "The population register kept by Skatteverket. You register if you plan to stay at least a year; this is where the personnummer comes from.",
    },
  },
  {
    sv: "Uppehållsrätt",
    it: "Diritto di soggiorno",
    en: "Right of residence",
    group: "arrivo",
    note: {
      it: "Il diritto dei cittadini UE/SEE di vivere in Svezia, senza chiedere nulla a Migrationsverket. Dopo 3 mesi richiede lavoro, impresa, studio o mezzi sufficienti.",
      sv: "EU/EES-medborgares rätt att bo i Sverige utan att ansöka hos Migrationsverket. Efter 3 månader krävs arbete, eget företag, studier eller tillräckliga medel.",
      en: "The right of EU/EEA citizens to live in Sweden without applying to Migrationsverket. After 3 months it requires work, a business, study or sufficient means.",
    },
  },
  {
    sv: "Uppehållstillstånd",
    it: "Permesso di soggiorno",
    en: "Residence permit",
    group: "arrivo",
    note: {
      it: "Il permesso che i cittadini di paesi non UE chiedono a Migrationsverket per lavoro, ricerca di lavoro o legami familiari.",
      sv: "Tillståndet som medborgare utanför EU ansöker om hos Migrationsverket för arbete, arbetssökande eller anknytning.",
      en: "The permit that citizens of non-EU countries apply for from Migrationsverket for work, job seeking or family ties.",
    },
  },
  {
    sv: "Uppehållskort",
    it: "Carta di soggiorno (familiari UE)",
    en: "Residence card (EU family members)",
    group: "arrivo",
    note: {
      it: "La carta per i familiari non UE di un cittadino UE che restano più di 3 mesi. Si chiede a Migrationsverket e vale al massimo 5 anni.",
      sv: "Kortet för familjemedlemmar utanför EU till en EU-medborgare som stannar längre än 3 månader. Du ansöker hos Migrationsverket och det gäller längst 5 år.",
      en: "The card for non-EU family members of an EU citizen who stay more than 3 months. You apply to Migrationsverket and it is valid for at most 5 years.",
    },
  },
  {
    sv: "Uppehållstillståndskort",
    it: "Tessera del permesso di soggiorno",
    en: "Residence permit card",
    group: "arrivo",
    note: {
      it: "La tessera fisica del permesso di soggiorno. Skatteverket la chiede per registrarti se vieni da fuori UE.",
      sv: "Det fysiska kortet för ditt uppehållstillstånd. Skatteverket vill se det när du folkbokförs om du kommer från ett land utanför EU.",
      en: "The physical card for your residence permit. Skatteverket asks to see it when you register if you come from outside the EU.",
    },
  },
  {
    sv: "Servicekontor",
    it: "Sportello di servizio statale",
    en: "Service office",
    group: "arrivo",
    note: {
      it: "Gli uffici gestiti da Statens servicecenter dove si fanno i controlli d’identità di Skatteverket, su prenotazione. Non tutti rilasciano carte d’identità.",
      sv: "Kontoren som drivs av Statens servicecenter där Skatteverkets id-kontroller görs, efter bokning. Inte alla utfärdar ID-kort.",
      en: "The offices run by Statens servicecenter where Skatteverket’s identity checks are done, by appointment. Not all of them issue ID cards.",
    },
  },
  {
    sv: "Intygsgivare",
    it: "Garante d’identità",
    en: "Identity witness",
    group: "arrivo",
    note: {
      it: "Una persona approvata che ti conosce bene (per esempio coniuge, genitore, figlio adulto) e può confermare la tua identità se non hai un documento valido per la carta d’identità.",
      sv: "En godkänd person som känner dig väl (till exempel make eller maka, förälder, vuxet barn) och kan intyga din identitet om du saknar giltig id-handling för ID-kortet.",
      en: "An approved person who knows you well (for example spouse, parent, adult child) and can confirm your identity if you have no valid document for the ID card.",
    },
  },
  {
    sv: "ID-kort",
    it: "Carta d’identità",
    en: "ID card",
    group: "arrivo",
    note: {
      it: "Per chi è folkbokförd, 400 kr oggi da Skatteverket; non è un documento di viaggio. Dal 1° dicembre 2026 la Polizia rilascia una carta speciale ai residenti non cittadini svedesi.",
      sv: "För den som är folkbokförd, i dag 400 kr hos Skatteverket; det är ingen resehandling. Från 1 december 2026 utfärdar Polisen ett särskilt kort till folkbokförda som inte är svenska medborgare.",
      en: "For people who are folkbokförd, today 400 kr at Skatteverket; it is not a travel document. From 1 December 2026 the Police issue a special card to registered residents who are not Swedish citizens.",
    },
  },
  {
    sv: "BankID",
    it: "BankID (identità digitale)",
    en: "BankID (digital ID)",
    group: "arrivo",
    note: {
      it: "L’identità digitale che rilascia la tua banca. In pratica servono personnummer, essere cliente della banca e un documento accettato.",
      sv: "Den digitala identiteten som din bank utfärdar. I praktiken krävs personnummer, att du är bankkund och en godkänd id-handling.",
      en: "The digital ID issued by your bank. In practice you need a personnummer, to be a customer of the bank and an accepted ID document.",
    },
  },
  {
    sv: "E-legitimation",
    it: "Identità digitale (e-ID)",
    en: "Electronic ID (e-ID)",
    group: "arrivo",
    note: {
      it: "Il nome generico per BankID e simili, con cui ti identifichi online presso enti pubblici e banche. Dal 1° dicembre 2026 arriva anche “Sverige-id”, dello Stato.",
      sv: "Samlingsnamn för BankID och liknande, som du identifierar dig online med hos myndigheter och banker. Från 1 december 2026 kommer även statliga ”Sverige-id”.",
      en: "The general name for BankID and similar, which you use to identify yourself online with public agencies and banks. From 1 December 2026 the state’s “Sverige-id” also arrives.",
    },
  },
  // ── Soldi ─────────────────────────────────────────────────────────────
  {
    sv: "Betalkonto",
    it: "Conto di pagamento (di base)",
    en: "Payment account (basic)",
    group: "soldi",
    note: {
      it: "Chi è residente in Svezia o nel SEE ha diritto a un conto di pagamento di base. La banca decide entro dieci giorni lavorativi bancari e, se rifiuta, deve dirlo per iscritto.",
      sv: "Du som är bosatt i Sverige eller EES har rätt till ett betalkonto med grundläggande funktioner. Banken beslutar inom tio bankdagar och måste motivera ett nej skriftligt.",
      en: "If you are resident in Sweden or the EEA you have a right to a basic payment account. The bank decides within ten banking days and must put a refusal in writing.",
    },
  },
  {
    sv: "Swish",
    it: "Swish (pagamenti da telefono)",
    en: "Swish (mobile payments)",
    group: "soldi",
    note: {
      it: "Il sistema di pagamento da telefono che si attiva tramite la banca e richiede BankID sullo stesso telefono.",
      sv: "Betalningstjänsten i mobilen som aktiveras via banken och kräver BankID på samma telefon.",
      en: "The mobile payment service that you activate through your bank and that needs BankID on the same phone.",
    },
  },
  {
    sv: "Deklaration",
    it: "Dichiarazione dei redditi",
    en: "Tax return",
    group: "soldi",
    note: {
      it: "La dichiarazione che si fa a Skatteverket. Per quando e come, controlla il sito di Skatteverket.",
      sv: "Deklarationen du lämnar till Skatteverket. När och hur står på Skatteverkets webbplats.",
      en: "The return you file with Skatteverket. For when and how, check Skatteverket’s website.",
    },
  },
  {
    sv: "Försäkringskassan",
    it: "Cassa delle assicurazioni sociali",
    en: "Social Insurance Agency",
    group: "soldi",
    note: {
      it: "L’ente che paga barnbidrag, föräldrapenning, sjukpenning e bostadsbidrag. Conta dove vivi o lavori, non la cittadinanza.",
      sv: "Myndigheten som betalar ut barnbidrag, föräldrapenning, sjukpenning och bostadsbidrag. Det är var du bor eller arbetar som räknas, inte medborgarskapet.",
      en: "The agency that pays barnbidrag, föräldrapenning, sjukpenning and bostadsbidrag. What counts is where you live or work, not citizenship.",
    },
  },
  {
    sv: "Barnbidrag",
    it: "Assegno per i figli",
    en: "Child allowance",
    group: "soldi",
    note: {
      it: "1 250 kr al mese per figlio, in automatico per chi vive in Svezia con i figli. Dal 1° gennaio 2027 vale la nuova regola di qualificazione per chi si stabilisce dopo.",
      sv: "1 250 kr per barn och månad, automatiskt för den som bor i Sverige med sina barn. Från 1 januari 2027 gäller en ny kvalificeringsregel för den som bosätter sig efter det.",
      en: "1,250 kr per child a month, automatic for those living in Sweden with their children. From 1 January 2027 a new qualification rule applies to those who settle after that date.",
    },
  },
  {
    sv: "Föräldrapenning",
    it: "Indennità parentale",
    en: "Parental benefit",
    group: "soldi",
    note: {
      it: "Il compenso per il congedo con i figli piccoli: 480 giorni per figlio fra i due genitori. Il livello legato al reddito richiede un reddito sufficiente per la sjukpenning (SGI).",
      sv: "Ersättningen när du är hemma med små barn: 480 dagar per barn mellan föräldrarna. Inkomstrelaterad nivå kräver tillräcklig inkomst för sjukpenning (SGI).",
      en: "The pay for time at home with young children: 480 days per child between the two parents. The income-related level requires enough income for sjukpenning (SGI).",
    },
  },
  {
    sv: "Sjuklön",
    it: "Retribuzione in malattia",
    en: "Sick pay",
    group: "soldi",
    note: {
      it: "I primi 14 giorni di malattia li paga il datore di lavoro.",
      sv: "Under de första 14 sjukdagarna betalar arbetsgivaren.",
      en: "For the first 14 days of sickness the employer pays.",
    },
  },
  {
    sv: "Karensavdrag",
    it: "Trattenuta di carenza",
    en: "Qualifying deduction",
    group: "soldi",
    note: {
      it: "Una trattenuta sulla sjuklön, pari al 20 % della sjuklön di una settimana media.",
      sv: "Ett avdrag från sjuklönen, motsvarande 20 % av sjuklönen för en genomsnittlig arbetsvecka.",
      en: "A deduction from sick pay, equal to 20% of an average week’s sick pay.",
    },
  },
  {
    sv: "Sjukpenning",
    it: "Indennità di malattia",
    en: "Sickness benefit",
    group: "soldi",
    note: {
      it: "Dal 15° giorno di malattia la paga Försäkringskassan, dopo che il datore di lavoro l’ha segnalato.",
      sv: "Från dag 15 betalar Försäkringskassan, efter att arbetsgivaren har anmält sjukfallet.",
      en: "From day 15 Försäkringskassan pays, after your employer has reported the illness.",
    },
  },
  {
    sv: "SGI",
    it: "Reddito assicurato per le prestazioni (SGI)",
    en: "Sickness-benefit qualifying income (SGI)",
    group: "soldi",
    note: {
      it: "Sjukpenninggrundande inkomst: il reddito su cui Försäkringskassan calcola malattia e föräldrapenning. Per il livello legato al reddito servono 7 083 kr al mese per almeno 240 giorni prima del parto previsto.",
      sv: "Sjukpenninggrundande inkomst: den inkomst som Försäkringskassan räknar sjukpenning och föräldrapenning på. För inkomstrelaterad nivå krävs 7 083 kr i månaden under minst 240 dagar före beräknad förlossning.",
      en: "Sjukpenninggrundande inkomst: the income Försäkringskassan bases sickness and parental benefit on. For the income-related level you need 7,083 kr a month for at least 240 days before the expected birth.",
    },
  },
  {
    sv: "Kollektivavtal",
    it: "Contratto collettivo",
    en: "Collective agreement",
    group: "vita",
    note: {
      it: "L’accordo tra sindacato e datori di lavoro del settore. Per il permesso di lavoro lo stipendio deve rispettare il contratto collettivo o la prassi del settore.",
      sv: "Avtalet mellan fack och arbetsgivare i branschen. För arbetstillstånd ska lönen följa kollektivavtal eller branschpraxis.",
      en: "The agreement between the union and employers in the industry. For a work permit the salary must follow the collective agreement or industry practice.",
    },
  },
  {
    sv: "A-kassa",
    it: "Cassa di disoccupazione",
    en: "Unemployment insurance fund",
    group: "vita",
    note: {
      it: "La cassa a cui ti iscrivi per l’indennità di disoccupazione basata sul reddito. Dal 1° ottobre 2025 la percentuale (80, 60 o 50 %) dipende da quanto sei stato iscritto.",
      sv: "Kassan där du blir medlem för inkomstbaserad ersättning vid arbetslöshet. Sedan 1 oktober 2025 beror nivån (80, 60 eller 50 %) på hur länge du varit medlem.",
      en: "The fund you join for income-based unemployment benefit. Since 1 October 2025 the level (80, 60 or 50%) depends on how long you have been a member.",
    },
  },
  {
    sv: "Arbetsförmedlingen",
    it: "Servizio pubblico per l’impiego",
    en: "Public Employment Service",
    group: "vita",
    note: {
      it: "Ci si iscrive come persona in cerca di lavoro; l’iscrizione serve anche per l’a-kassa.",
      sv: "Där anmäler du dig som arbetssökande; anmälan behövs också för a-kassan.",
      en: "You register there as a job seeker; registration is also needed for the a-kassa.",
    },
  },
  {
    sv: "SFI",
    it: "Svedese per immigrati (SFI)",
    en: "Swedish for immigrants (SFI)",
    group: "vita",
    note: {
      it: "Il corso di svedese del comune. Hai diritto dalla seconda metà dell’anno in cui compi 16 anni; il personnummer non è richiesto. Dal 1° gennaio 2026 il diritto dura 3 anni.",
      sv: "Kommunens svenskundervisning. Du har rätt från andra halvåret det år du fyller 16; personnummer krävs inte. Från 1 januari 2026 gäller rätten i 3 år.",
      en: "The kommun’s Swedish course. You have a right from the second half of the year you turn 16; a personnummer is not required. From 1 January 2026 the right lasts 3 years.",
    },
  },
  {
    sv: "Kommun",
    it: "Comune",
    en: "Municipality",
    group: "vita",
    note: {
      it: "Il comune: organizza SFI, scuole e asili, servizi sociali. Si chiede SFI al comune in cui vivi.",
      sv: "Kommunen ansvarar för SFI, förskola och skola samt socialtjänst. SFI söker du i den kommun där du bor.",
      en: "The municipality runs SFI, schools and preschools, and social services. You apply for SFI in the kommun where you live.",
    },
  },
  // ── Salute ────────────────────────────────────────────────────────────
  {
    sv: "Region",
    it: "Regione (sanitaria)",
    en: "Region (healthcare)",
    group: "salute",
    note: {
      it: "L’ente che gestisce la sanità e fissa quasi da solo i ticket: per questo i prezzi cambiano da regione a regione.",
      sv: "Organet som ansvarar för sjukvården och i stort sett själv bestämmer patientavgifterna, så priserna skiljer sig mellan regioner.",
      en: "The body that runs healthcare and largely sets patient fees itself, so prices differ from region to region.",
    },
  },
  {
    sv: "Vårdcentral",
    it: "Centro di assistenza primaria",
    en: "Primary care centre",
    group: "salute",
    note: {
      it: "Il tuo primo contatto con la sanità per problemi non gravi. La scegli e ti iscrivi (listning) tramite 1177.se.",
      sv: "Din första kontakt med vården vid problem som inte är akuta. Du väljer och listar dig via 1177.se.",
      en: "Your first contact with healthcare for non-urgent problems. You choose it and register (listning) through 1177.se.",
    },
  },
  {
    sv: "1177",
    it: "1177 (consigli sanitari)",
    en: "1177 (health advice)",
    group: "salute",
    note: {
      it: "Numero di telefono per consigli sanitari 24 ore su 24 e sito per prenotare e scegliere la vårdcentral. Per le emergenze si chiama il 112.",
      sv: "Telefonnummer för sjukvårdsrådgivning dygnet runt och webbplats för tidsbokning och val av vårdcentral. Vid nödlägen ring 112.",
      en: "Phone number for 24-hour health advice and website for booking and choosing a vårdcentral. In an emergency call 112.",
    },
  },
  {
    sv: "Patientavgift",
    it: "Ticket sanitario",
    en: "Patient fee",
    group: "salute",
    note: {
      it: "Il prezzo che paghi per una visita, fissato dalla regione. A Stoccolma una visita in ambulatorio costa 275 kr, ed è gratis da 0 a 17 anni.",
      sv: "Avgiften du betalar för ett besök, som regionen bestämmer. I Stockholm kostar ett läkarbesök 275 kr och är gratis för 0–17 år.",
      en: "The price you pay for a visit, set by the region. In Stockholm an outpatient visit costs 275 kr and is free for ages 0–17.",
    },
  },
  {
    sv: "Högkostnadsskydd",
    it: "Tetto di spesa sanitaria",
    en: "High-cost protection",
    group: "salute",
    note: {
      it: "Il limite di spesa per le visite: al massimo 1 450 kr in 12 mesi, poi hai il frikort. Una regione può fissarlo più basso. Per i farmaci nel 2026 il tetto è 3 800 kr.",
      sv: "Taket för vårdavgifter: högst 1 450 kr på 12 månader, därefter får du frikort. En region kan sätta det lägre. För läkemedel är taket 3 800 kr under 2026.",
      en: "The cap on fees for visits: at most 1,450 kr in 12 months, then you get a frikort. A region may set it lower. For medicines in 2026 the cap is 3,800 kr.",
    },
  },
  {
    sv: "Frikort",
    it: "Tessera di esenzione",
    en: "Free-care card",
    group: "salute",
    note: {
      it: "Quando raggiungi il tetto del högkostnadsskydd non paghi più il ticket per il resto del periodo.",
      sv: "När du nått högkostnadsskyddets tak betalar du inga fler patientavgifter under resten av perioden.",
      en: "Once you reach the högkostnadsskydd cap you pay no more patient fees for the rest of the period.",
    },
  },
  // ── Casa ──────────────────────────────────────────────────────────────
  {
    sv: "Hyresrätt",
    it: "Appartamento in affitto (di ente)",
    en: "Rental apartment",
    group: "casa",
    note: {
      it: "Un appartamento in affitto con contratto, di norma da un padrone di casa o da un ente. Se l’inquilino subaffitta, può chiedere al massimo un affitto ragionevole.",
      sv: "En hyrd lägenhet med hyreskontrakt. Hyr hyresgästen ut i andra hand får hen högst ta ut en skälig hyra.",
      en: "A rented flat under a rental contract. If the tenant sublets, they may charge at most a reasonable rent.",
    },
  },
  {
    sv: "Bostadsrätt",
    it: "Appartamento in cooperativa (bostadsrätt)",
    en: "Co-operative apartment",
    group: "casa",
    note: {
      it: "Non compri l’appartamento ma il diritto di abitarlo in un’associazione. Se la affitti da un privato dal 1° luglio 2026 vale la nuova legge sugli affitti privati.",
      sv: "Du köper inte lägenheten utan rätten att bo i den i en förening. Hyr du en bostadsrätt av en privatperson gäller sedan 1 juli 2026 den nya privatuthyrningslagen.",
      en: "You do not buy the flat but the right to live in it in an association. If you rent one from a private individual, the new private-letting law applies from 1 July 2026.",
    },
  },
  {
    sv: "Förstahandskontrakt",
    it: "Contratto di prima mano",
    en: "First-hand contract",
    group: "casa",
    note: {
      it: "Il contratto che hai direttamente con il proprietario o l’ente. È quello più sicuro e quello che di solito si aspetta anni.",
      sv: "Kontraktet du har direkt med fastighetsägaren eller bostadsföretaget. Det är det tryggaste och det man oftast väntar år på.",
      en: "The contract you hold directly with the owner or housing company. It is the safest and usually the one you wait years for.",
    },
  },
  {
    sv: "Andrahandskontrakt",
    it: "Contratto di subaffitto",
    en: "Second-hand (sublet) contract",
    group: "casa",
    note: {
      it: "Il contratto con un inquilino che ti subaffitta. Deve essere autorizzato dal proprietario o dalla Hyresnämnden; se è arredato, la maggiorazione è al massimo del 15 %.",
      sv: "Kontraktet med en hyresgäst som hyr ut till dig. Det ska vara godkänt av hyresvärden eller Hyresnämnden; vid möblerad uthyrning får påslaget vara högst 15 %.",
      en: "The contract with a tenant who sublets to you. It must be approved by the landlord or the Hyresnämnden; if furnished, the surcharge is at most 15%.",
    },
  },
  {
    sv: "Bostadskö",
    it: "Coda per la casa",
    en: "Housing queue",
    group: "casa",
    note: {
      it: "La lista d’attesa per le case in affitto. Nelle grandi città le attese sono di anni; di solito c’è una piccola quota annua.",
      sv: "Kön för hyresbostäder. I storstäderna är väntetiderna flera år; det brukar finnas en liten årsavgift.",
      en: "The waiting list for rental homes. In the big cities waits run to years; there is usually a small annual fee.",
    },
  },
  {
    sv: "Hyresnämnden",
    it: "Collegio per gli affitti",
    en: "Rent tribunal",
    group: "casa",
    note: {
      it: "Decide le controversie sugli affitti. Il subinquilino può chiedere la restituzione dell’eccedenza fino a 2 anni indietro, entro 3 mesi dalla fine del contratto.",
      sv: "Prövar hyrestvister. En andrahandshyresgäst kan begära tillbaka för mycket betald hyra upp till 2 år bakåt, inom 3 månader efter att avtalet upphört.",
      en: "Rules on rent disputes. A subtenant can claim back overpaid rent up to 2 years, within 3 months of the contract ending.",
    },
  },
  {
    sv: "Inneboende",
    it: "Stanza in casa altrui",
    en: "Lodger",
    group: "casa",
    note: {
      it: "Chi affitta una stanza nella casa di qualcun altro. Se sei truffato: prima la banca, poi la polizia al 114 14.",
      sv: "Den som hyr ett rum i någon annans bostad. Blir du lurad: kontakta först banken, sedan polisen på 114 14.",
      en: "Someone who rents a room in someone else’s home. If you are scammed: bank first, then the police on 114 14.",
    },
  },
];
