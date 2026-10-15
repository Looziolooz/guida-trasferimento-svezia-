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
  {
    sv: "AIRE",
    it: "Anagrafe degli italiani residenti all’estero",
    en: "Register of Italians residing abroad",
    group: "arrivo",
    note: {
      it: "Il registro dei cittadini italiani che vivono all’estero per più di 12 mesi. Va richiesta entro 90 giorni dal trasferimento, online su FAST IT; l’iscrizione cancella dall’anagrafe del comune italiano.",
      sv: "Italiens register över medborgare som bor utomlands i mer än 12 månader. Anmälan ska göras inom 90 dagar efter flytten, online via FAST IT; registreringen avförs ur den italienska kommunens befolkningsregister.",
      en: "Italy’s register of citizens living abroad for more than 12 months. You must register within 90 days of moving, online on FAST IT; registering removes you from the Italian municipality’s population register.",
    },
  },
  {
    sv: "FAST IT",
    it: "Portale dei servizi consolari online",
    en: "Online consular services portal",
    group: "arrivo",
    note: {
      it: "Il portale del Ministero degli Esteri italiano dove si chiede l’iscrizione all’AIRE. Si entra anche con SPID.",
      sv: "Det italienska utrikesministeriets portal där man ansöker om registrering i AIRE. Man kan logga in med SPID.",
      en: "The Italian Foreign Ministry portal where you apply for AIRE registration. You can also log in with SPID.",
    },
  },
  {
    sv: "Prenot@mi",
    it: "Prenotazione degli appuntamenti consolari",
    en: "Consular appointment booking",
    group: "arrivo",
    note: {
      it: "Il sistema online con cui si prenota un appuntamento all’Ambasciata d’Italia a Stoccolma. È gratuito e vale una persona per appuntamento.",
      sv: "Det onlinesystem där man bokar tid på Italiens ambassad i Stockholm. Det är kostnadsfritt och gäller en person per tid.",
      en: "The online system for booking an appointment at the Italian Embassy in Stockholm. It is free, one person per appointment.",
    },
  },
  {
    sv: "Trascrizione",
    it: "Trascrizione degli atti di stato civile",
    en: "Transcription of civil-status records",
    group: "arrivo",
    note: {
      it: "Nascite, matrimoni, divorzi e decessi avvenuti in Svezia vanno trascritti in Italia tramite l’Ambasciata. Prima serve l’iscrizione AIRE; senza trascrizione non ottieni certificati italiani aggiornati.",
      sv: "Födslar, äktenskap, skilsmässor och dödsfall som inträffat i Sverige ska registreras i Italien via ambassaden. Först krävs AIRE-registrering; utan den får du inga uppdaterade italienska intyg.",
      en: "Births, marriages, divorces and deaths that happen in Sweden must be transcribed in Italy through the Embassy. AIRE registration comes first; without transcription you cannot get up-to-date Italian certificates.",
    },
  },
  {
    sv: "Medborgarskap",
    it: "Cittadinanza",
    en: "Citizenship",
    group: "arrivo",
    note: {
      it: "Si è svedesi alla nascita se un genitore è svedese; gli altri la ottengono per naturalizzazione. Dal 6 giugno 2026 le regole sono più severe, anche per le domande già presentate.",
      sv: "Du är svensk vid födseln om en förälder är svensk; andra får det genom naturalisering. Från 6 juni 2026 gäller strängare regler, även för redan inlämnade ansökningar.",
      en: "You are Swedish at birth if a parent is Swedish; others obtain it by naturalisation. Since 6 June 2026 the rules are stricter, including for applications already filed.",
    },
  },
  {
    sv: "Naturalisering",
    it: "Naturalizzazione",
    en: "Naturalisation",
    group: "arrivo",
    note: {
      it: "La via per diventare cittadini svedesi su domanda a Migrationsverket: residenza (8 anni di regola), identità, capacità di mantenersi, condotta irreprensibile e conoscenze di lingua e società. I cittadini SEE non hanno bisogno del permesso permanente.",
      sv: "Vägen till svenskt medborgarskap genom ansökan hos Migrationsverket: bosättning (som regel 8 år), styrkt identitet, försörjningsförmåga, skötsamhet samt kunskaper i språk och samhälle. EES-medborgare behöver inte permanent uppehållstillstånd.",
      en: "The route to Swedish citizenship by applying to Migrationsverket: residence (8 years as a rule), proven identity, ability to support yourself, good conduct and knowledge of language and society. EEA citizens do not need a permanent permit.",
    },
  },
  {
    sv: "Medborgarskapsprov",
    it: "Test di cittadinanza",
    en: "Citizenship test",
    group: "arrivo",
    note: {
      it: "Il test di conoscenza della società svedese (samhällskunskap) richiesto per la cittadinanza. Il test di lingua non è ancora attivo: verifica su Migrationsverket come dimostrare lo svedese.",
      sv: "Provet i samhällskunskap som krävs för medborgarskap. Språkprovet är inte i drift ännu: kontrollera hos Migrationsverket hur du visar kunskaper i svenska.",
      en: "The test of knowledge of Swedish society (samhällskunskap) required for citizenship. The language test is not yet active: check with Migrationsverket how to prove your Swedish.",
    },
  },
  {
    sv: "Inkomstbasbelopp",
    it: "Importo base di reddito",
    en: "Income base amount",
    group: "arrivo",
    note: {
      it: "Un importo di riferimento fissato ogni anno. Per la cittadinanza serve un reddito da lavoro o impresa di almeno tre inkomstbasbelopp all’anno, circa 20 000 kr al mese prima delle tasse secondo Migrationsverket.",
      sv: "Ett referensbelopp som fastställs varje år. För medborgarskap krävs inkomst från arbete eller eget företag på minst tre inkomstbasbelopp per år, ungefär 20 000 kr i månaden före skatt enligt Migrationsverket.",
      en: "A reference amount set every year. Citizenship requires income from work or business of at least three inkomstbasbelopp a year, about 20,000 kr a month before tax according to Migrationsverket.",
    },
  },
  {
    sv: "Försörjningsstöd",
    it: "Assistenza sociale",
    en: "Social assistance",
    group: "soldi",
    note: {
      it: "Il sostegno economico del comune a chi non riesce a mantenersi. Per la cittadinanza non puoi averne ricevuto per più di 6 mesi in totale nei 3 anni prima della domanda.",
      sv: "Kommunens ekonomiska stöd till den som inte kan försörja sig. För medborgarskap får du inte ha fått det i mer än sammanlagt 6 månader under de tre åren före ansökan.",
      en: "The municipality’s financial support for people who cannot support themselves. For citizenship you may not have received it for more than 6 months in total in the 3 years before applying.",
    },
  },
  {
    sv: "Bostadsrättsförening",
    it: "Cooperativa edilizia (condominio)",
    en: "Housing cooperative",
    group: "casa",
    note: {
      it: "L’associazione che possiede il palazzo: comprando una bostadsrätt diventi membro e paghi un canone mensile (avgift). Il consiglio deve approvarti e può rifiutare solo per motivi molto seri.",
      sv: "Föreningen som äger huset: när du köper en bostadsrätt blir du medlem och betalar en månadsavgift. Styrelsen ska godkänna dig och får bara avslå av mycket allvarliga skäl.",
      en: "The association that owns the building: when you buy a bostadsrätt you become a member and pay a monthly fee (avgift). The board must approve you and may refuse only for very serious reasons.",
    },
  },
  {
    sv: "Årsredovisning",
    it: "Bilancio annuale",
    en: "Annual report",
    group: "casa",
    note: {
      it: "Il bilancio della cooperativa. Prima di comprare una bostadsrätt leggilo: mostra se l’economia dell’associazione è stabile.",
      sv: "Föreningens bokslut. Läs det innan du köper en bostadsrätt: det visar om föreningens ekonomi är stabil.",
      en: "The cooperative’s annual accounts. Read it before buying a bostadsrätt: it shows whether the association’s finances are stable.",
    },
  },
  {
    sv: "Lånelöfte",
    it: "Promessa di mutuo",
    en: "Loan promise",
    group: "casa",
    note: {
      it: "La conferma preliminare della banca di quanto ti presta. Chiedila prima delle visite; la banca può comunque rifiutare dopo, se la casa non corrisponde.",
      sv: "Bankens förhandsbesked om hur mycket du kan låna. Be om det före visningarna; banken kan ändå säga nej senare om bostaden inte håller.",
      en: "The bank’s preliminary confirmation of how much it will lend you. Ask for it before viewings; the bank can still refuse later if the home does not qualify.",
    },
  },
  {
    sv: "Bolånetak",
    it: "Tetto del mutuo",
    en: "Mortgage cap",
    group: "casa",
    note: {
      it: "Il limite massimo del mutuo rispetto al valore della casa: 90 % dal 1° aprile 2026 (prima 85 %), quindi un anticipo minimo del 10 %.",
      sv: "Högsta tillåtna lån i förhållande till bostadens värde: 90 % sedan 1 april 2026 (tidigare 85 %), alltså minst 10 % i kontantinsats.",
      en: "The maximum loan relative to the home’s value: 90% since 1 April 2026 (previously 85%), so a minimum 10% down payment.",
    },
  },
  {
    sv: "Amorteringskrav",
    it: "Obbligo di rimborso del capitale",
    en: "Amortisation requirement",
    group: "casa",
    note: {
      it: "Il rimborso obbligatorio del mutuo: almeno 1 % all’anno se il debito supera il 50 % del valore, 2 % oltre il 70 %. Il requisito legato al reddito è abolito dal 1° aprile 2026.",
      sv: "Obligatorisk avbetalning på bolånet: minst 1 % per år om lånet överstiger 50 % av värdet, 2 % över 70 %. Kravet kopplat till inkomsten är avskaffat från 1 april 2026.",
      en: "Mandatory repayment of the mortgage: at least 1% a year if the loan exceeds 50% of the value, 2% above 70%. The income-linked requirement was abolished on 1 April 2026.",
    },
  },
  {
    sv: "Kontantinsats",
    it: "Anticipo",
    en: "Down payment",
    group: "casa",
    note: {
      it: "La parte del prezzo che paghi di tasca tua. Con il tetto del 90 % è almeno il 10 % del valore della casa.",
      sv: "Den del av priset du betalar med egna pengar. Med bolånetaket på 90 % är det minst 10 % av bostadens värde.",
      en: "The part of the price you pay from your own money. With the 90% cap it is at least 10% of the home’s value.",
    },
  },
  {
    sv: "Handpenning",
    it: "Caparra",
    en: "Deposit (earnest money)",
    group: "casa",
    note: {
      it: "Un acconto che compratore e venditore possono concordare alla firma, versato su un conto clienti dell’agente. La legge non fissa nessuna percentuale.",
      sv: "En handpenning som köpare och säljare kan komma överens om vid kontraktsskrivningen, insatt på mäklarens klientmedelskonto. Lagen anger ingen procentsats.",
      en: "A deposit buyer and seller may agree at signing, paid into the agent’s client account. The law sets no percentage.",
    },
  },
  {
    sv: "Köpekontrakt",
    it: "Contratto di compravendita",
    en: "Purchase contract",
    group: "casa",
    note: {
      it: "Il contratto firmato da entrambe le parti: solo allora l’offerta diventa vincolante.",
      sv: "Avtalet som båda parter skriver under: först då blir budet bindande.",
      en: "The contract signed by both parties: only then does the bid become binding.",
    },
  },
  {
    sv: "Budgivning",
    it: "Asta delle offerte",
    en: "Bidding",
    group: "casa",
    note: {
      it: "La fase in cui si fanno offerte sulla casa. Le offerte non sono vincolanti per nessuno finché non si firma il köpekontrakt; l’agente deve riferire ogni offerta al venditore.",
      sv: "Skedet då man lägger bud på bostaden. Bud är inte bindande för någon förrän köpekontraktet skrivs under; mäklaren ska förmedla varje bud till säljaren.",
      en: "The stage where bids are placed on the home. Bids bind nobody until the köpekontrakt is signed; the agent must pass every bid on to the seller.",
    },
  },
  {
    sv: "Besiktning",
    it: "Perizia dell’immobile",
    en: "Property inspection",
    group: "casa",
    note: {
      it: "L’ispezione della casa prima di firmare. Per una casa di proprietà il compratore ha un obbligo di ispezione: dopo non puoi chiedere danni per difetti che un controllo attento avrebbe trovato.",
      sv: "Besiktning av bostaden före undertecknandet. Vid köp av hus har köparen undersökningsplikt: du kan inte i efterhand kräva ersättning för fel som en noggrann undersökning hade upptäckt.",
      en: "The inspection of the home before signing. For a house the buyer has a duty to inspect: you cannot later claim for defects a careful inspection would have found.",
    },
  },
  {
    sv: "Lagfart",
    it: "Registrazione della proprietà",
    en: "Registration of title",
    group: "casa",
    note: {
      it: "La registrazione di chi è proprietario di una casa o di un terreno, presso Lantmäteriet. Costa un’imposta di bollo dell’1,5 % del prezzo più 825 kr; per i trasferimenti dal 1° luglio 2026 serve personnummer o samordningsnummer. Non serve per la bostadsrätt.",
      sv: "Registreringen av vem som äger en fastighet, hos Lantmäteriet. Den kostar 1,5 % av priset i stämpelskatt plus 825 kr; för överlåtelser från 1 juli 2026 krävs personnummer eller samordningsnummer. Behövs inte för bostadsrätt.",
      en: "The registration of who owns a house or land, at Lantmäteriet. It costs stamp duty of 1.5% of the price plus 825 kr; for transfers from 1 July 2026 a personnummer or samordningsnummer is required. Not needed for a bostadsrätt.",
    },
  },
  {
    sv: "Pantbrev",
    it: "Titolo ipotecario",
    en: "Mortgage deed",
    group: "casa",
    note: {
      it: "Il documento che serve da garanzia per il mutuo su una casa di proprietà. I nuovi pantbrev costano il 2 % dell’importo più 375 kr ciascuno; per la bostadsrätt non esistono.",
      sv: "Handlingen som är säkerhet för bolånet på en fastighet. Nya pantbrev kostar 2 % av beloppet plus 375 kr styck; för bostadsrätt finns de inte.",
      en: "The document that secures the mortgage on an owned house. New pantbrev cost 2% of the amount plus 375 kr each; they do not exist for a bostadsrätt.",
    },
  },
  {
    sv: "Fastighetsavgift",
    it: "Imposta annuale sulla casa",
    en: "Annual property fee",
    group: "casa",
    note: {
      it: "La tassa annuale sulle case: 0,75 % del valore fiscale, al massimo 10 425 kr nel 2026 per abitazione. Chi ha una bostadsrätt non la paga direttamente: la paga la cooperativa.",
      sv: "Den årliga avgiften för småhus: 0,75 % av taxeringsvärdet, högst 10 425 kr år 2026 per bostad. Med bostadsrätt betalar du den inte själv: det gör föreningen.",
      en: "The annual fee on houses: 0.75% of the assessed value, at most 10,425 kr in 2026 per home. With a bostadsrätt you do not pay it yourself: the cooperative does.",
    },
  },
  {
    sv: "Fackförbund",
    it: "Sindacato",
    en: "Trade union",
    group: "vita",
    note: {
      it: "L’organizzazione dei lavoratori che negozia i contratti collettivi. L’iscrizione è separata dall’a-kassa: puoi essere in uno senza l’altra. La quota non è detraibile.",
      sv: "Arbetstagarnas organisation som förhandlar fram kollektivavtal. Medlemskapet är skilt från a-kassan: du kan vara med i den ena utan den andra. Avgiften är inte avdragsgill.",
      en: "The workers’ organisation that negotiates collective agreements. Membership is separate from the a-kassa: you can join one without the other. The fee is not tax-deductible.",
    },
  },
  {
    sv: "Alfa-kassan",
    it: "A-kassa aperta a tutti",
    en: "The open-to-all a-kassa",
    group: "vita",
    note: {
      it: "L’a-kassa a cui può iscriversi chiunque abbia lavorato in Svezia, qualunque sia il mestiere (170 kr al mese secondo il suo sito). Chi non è iscritto a nessuna cassa fa domanda tramite Alfa-kassan, ma al livello del 50 %.",
      sv: "A-kassan som alla som arbetat i Sverige kan gå med i, oavsett yrke (170 kr i månaden enligt dess webbplats). Den som inte är medlem i någon kassa ansöker via Alfa-kassan, men på 50 %-nivån.",
      en: "The a-kassa anyone who has worked in Sweden can join, whatever their trade (170 kr a month according to its website). Those who belong to no fund apply through Alfa-kassan, but at the 50% level.",
    },
  },
  {
    sv: "Ramtid",
    it: "Periodo di riferimento",
    en: "Reference period",
    group: "vita",
    note: {
      it: "Per l’a-kassa sono i 12 mesi prima del mese della domanda: in questo periodo si contano reddito e iscrizione. L’80 % arriva solo se sei stato iscritto per tutto il periodo.",
      sv: "För a-kassan är det de 12 månaderna före ansökningsmånaden: under den tiden räknas inkomst och medlemskap. 80 % får du bara om du varit medlem hela perioden.",
      en: "For the a-kassa, the 12 months before the month of your application: income and membership are counted over this period. You reach 80% only if you were a member for the whole period.",
    },
  },
  {
    sv: "U1",
    it: "Certificato U1 (periodi di lavoro esteri)",
    en: "Form U1 (periods abroad)",
    group: "vita",
    note: {
      it: "Il certificato che attesta i contributi versati in un altro paese UE/SEE, per sommarli a quelli svedesi. Lo rilascia l’autorità del paese dove hai lavorato; chiedi alla tua a-kassa, che lo richiede per via elettronica.",
      sv: "Intyget som styrker perioder i ett annat EU/EES-land så att de kan läggas ihop med de svenska. Det utfärdas av myndigheten i landet där du arbetat; fråga din a-kassa, som begär det elektroniskt.",
      en: "The certificate proving periods in another EU/EEA country so they can be added to your Swedish ones. It is issued by the authority of the country where you worked; ask your a-kassa, which requests it electronically.",
    },
  },
  {
    sv: "Provanställning",
    it: "Periodo di prova",
    en: "Probationary employment",
    group: "vita",
    note: {
      it: "Un contratto di prova di al massimo 6 mesi. Non va confuso con il contratto a tempo indeterminato (tillsvidareanställning).",
      sv: "En anställning på prov på högst 6 månader. Förväxla den inte med en tillsvidareanställning.",
      en: "A trial employment of at most 6 months. Not to be confused with a permanent contract (tillsvidareanställning).",
    },
  },
  {
    sv: "Semesterlag",
    it: "Legge sulle ferie",
    en: "Annual Leave Act",
    group: "vita",
    note: {
      it: "La legge che garantisce 25 giorni di ferie all’anno. Se inizi a lavorare dopo il 31 agosto, il primo anno sono 5 giorni.",
      sv: "Lagen som ger 25 semesterdagar per år. Om du börjar arbeta efter 31 augusti är det 5 dagar det första året.",
      en: "The law that guarantees 25 days of leave a year. If you start work after 31 August, the first year it is 5 days.",
    },
  },
];
