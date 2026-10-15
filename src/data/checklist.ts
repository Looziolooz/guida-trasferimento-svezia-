import type { Locale } from "@/lib/locales";

export type Phase = "prima" | "settimana" | "mese" | "trimestre";

export type ChecklistStep = {
  id: string;
  phase: Phase;
  /** Guida di riferimento, se esiste. */
  guide?: string;
  title: Record<Locale, string>;
  detail: Record<Locale, string>;
};

export const phaseLabels: Record<Phase, Record<Locale, string>> = {
  prima: {
    it: "Prima di partire",
    sv: "Innan avresan",
    en: "Before you leave",
  },
  settimana: {
    it: "Prima settimana in Svezia",
    sv: "Första veckan i Sverige",
    en: "First week in Sweden",
  },
  mese: {
    it: "Primo mese",
    sv: "Första månaden",
    en: "First month",
  },
  trimestre: {
    it: "Entro i primi 90 giorni",
    sv: "Inom 90 dagar",
    en: "Within 90 days",
  },
};

export const phaseOrder: Phase[] = ["prima", "settimana", "mese", "trimestre"];

export const checklist: ChecklistStep[] = [
  // ── Innan avresan ─────────────────────────────────────────────────────
  {
    id: "tillstand-fore-resan",
    phase: "prima",
    guide: "uppehallstillstand",
    title: {
      it: "Solo non UE: ottieni il permesso prima di partire",
      sv: "Bara utanför EU: ordna tillståndet innan du reser",
      en: "Non-EU only: get your permit before you travel",
    },
    detail: {
      it: "Chi viene da fuori UE/SEE chiede il permesso a Migrationsverket: lavoro, ricerca di lavoro o legami familiari. Per il lavoro lo stipendio deve essere almeno il 90 % del salario mediano (dal 16 giugno 2026: 34 470 kr al mese) e rispettare il contratto collettivo o la prassi del settore. La domanda di lavoro costa 2 200 kr, non rimborsabili. Cittadini UE/SEE: non serve alcuna domanda a Migrationsverket.",
      sv: "Kommer du från ett land utanför EU/EES ansöker du om tillstånd hos Migrationsverket: arbete, arbetssökande eller anknytning. För arbete ska lönen vara minst 90 % av medianlönen (från 16 juni 2026: 34 470 kr i månaden) och följa kollektivavtal eller branschpraxis. Ansökan om arbetstillstånd kostar 2 200 kr, som inte betalas tillbaka. Är du medborgare i EU/EES behöver du inte ansöka hos Migrationsverket.",
      en: "If you come from outside the EU/EEA you apply to Migrationsverket for a permit: work, job seeking or family ties. For work the salary must be at least 90% of the median wage (from 16 June 2026: 34,470 kr a month) and follow the collective agreement or industry practice. The work-permit application costs 2,200 kr, non-refundable. EU/EEA citizens do not need to apply to Migrationsverket.",
    },
  },
  {
    id: "intyg-familj",
    phase: "prima",
    guide: "folkbokforing",
    title: {
      it: "Prepara i certificati di famiglia e i documenti d’identità",
      sv: "Ta fram familjeintyg och id-handlingar",
      en: "Gather your family certificates and ID documents",
    },
    detail: {
      it: "Se ti trasferisci con partner o figli porta il certificato di matrimonio (o l’estratto del registro civile, o la sentenza di divorzio) e, per i figli, il certificato di nascita. Porta tutti i documenti d’identità in originale. Controlla con Skatteverket se i tuoi certificati devono essere legalizzati o tradotti.",
      sv: "Flyttar du med partner eller barn: ta med vigselbevis (eller utdrag ur civilståndsregistret, eller skilsmässodom) och barnens födelsebevis. Ta med alla id-handlingar i original. Fråga Skatteverket om dina intyg behöver legaliseras eller översättas.",
      en: "If you move with a partner or children, bring the marriage certificate (or civil-registry extract, or divorce judgment) and the children’s birth certificates. Bring all identity documents in original. Ask Skatteverket whether your certificates need to be legalised or translated.",
    },
  },
  {
    id: "forsakring-fore-folkbokforing",
    phase: "prima",
    guide: "vard",
    title: {
      it: "Copri la sanità fino alla registrazione: EHIC o assicurazione privata",
      sv: "Ordna sjukvårdsskydd tills du är folkbokförd: EHIC eller privat försäkring",
      en: "Cover healthcare until you are registered: EHIC or private insurance",
    },
    detail: {
      it: "Cittadini UE/SEE/Svizzera: porta la tessera europea (EHIC), con cui paghi il ticket normale per le cure urgenti e necessarie. Chi viene da fuori UE e non è ancora registrato paga il costo pieno delle cure, salvo accordi con alcuni paesi: stipula un’assicurazione privata. Per la sanità agevolata devi essere folkbokförd; il permesso da solo non basta.",
      sv: "Medborgare i EU/EES/Schweiz: ta med europeiskt sjukförsäkringskort (EHIC) – med det betalar du vanlig patientavgift för akut och nödvändig vård. Kommer du från ett land utanför EU och inte är folkbokförd än betalar du hela kostnaden, om inte ett avtal med ditt land gäller: teckna en privat försäkring. För subventionerad vård måste du vara folkbokförd; tillståndet räcker inte.",
      en: "EU/EEA/Swiss citizens: bring your European Health Insurance Card (EHIC); with it you pay the normal patient fee for urgent and necessary care. If you come from outside the EU and are not yet registered you pay the full cost of care, unless an agreement with your country applies: take out private insurance. To get subsidised care you must be folkbokförd; a permit alone is not enough.",
    },
  },
  {
    id: "bostad-sok",
    phase: "prima",
    guide: "bostad",
    title: {
      it: "Comincia a cercare casa e diffida delle truffe",
      sv: "Börja leta bostad och se upp för bedrägerier",
      en: "Start your housing search and watch out for scams",
    },
    detail: {
      it: "Nelle grandi città le attese per una casa sono di anni, quindi cominciare presto conta. Non pagare mai in anticipo prima di aver visto l’appartamento e di avere il contratto firmato; un padrone di casa “all’estero” che chiede il deposito è un segnale di truffa. Chiedi un contratto scritto e controlla che chi subaffitta sia davvero l’inquilino. Se sei truffato: prima la banca, poi la polizia al 114 14.",
      sv: "I storstäderna är väntetiderna för bostad flera år, så det lönar sig att börja tidigt. Betala aldrig i förskott innan du har sett lägenheten och kontraktet är påskrivet; en hyresvärd ”utomlands” som vill ha deposition är en varningssignal. Kräv skriftligt kontrakt och kontrollera att den som hyr ut i andra hand verkligen är hyresgästen. Blir du lurad: kontakta först banken, sedan polisen på 114 14.",
      en: "In the big cities waits for housing run to years, so starting early matters. Never pay in advance before you have seen the flat and the contract is signed; a landlord “abroad” asking for a deposit is a scam signal. Insist on a written contract and check that whoever sublets really is the tenant. If you are scammed: bank first, then the police on 114 14.",
    },
  },

  // ── Första veckan ─────────────────────────────────────────────────────
  {
    id: "flytta-till-sverige",
    phase: "settimana",
    guide: "folkbokforing",
    title: {
      it: "Notifica il trasferimento con “Flytta till Sverige”",
      sv: "Anmäl flytten med ”Flytta till Sverige”",
      en: "Notify your move with “Flytta till Sverige”",
    },
    detail: {
      it: "Se pensi di restare almeno un anno devi in genere essere folkbokförd. Si fa con il servizio online di Skatteverket “Flytta till Sverige”. Cittadini UE/SEE: dimostra il diritto di soggiorno (lavoro, impresa, o mezzi sufficienti). Non UE: mostra la tessera del permesso svedese valido; un permesso di un altro paese UE non basta.",
      sv: "Planerar du att bo här minst ett år ska du i de flesta fall vara folkbokförd. Det anmäler du i Skatteverkets e-tjänst ”Flytta till Sverige”. Medborgare i EU/EES visar uppehållsrätt (arbete, eget företag eller tillräckliga medel). Utanför EU visar du ditt giltiga svenska tillståndskort; ett tillstånd från ett annat EU-land räcker inte.",
      en: "If you plan to stay at least a year you will in most cases have to be folkbokförd. You do it in Skatteverket’s online service “Flytta till Sverige”. EU/EEA citizens show their right of residence (work, own business or sufficient means). Non-EU citizens show a valid Swedish permit card; a permit from another EU country is not enough.",
    },
  },
  {
    id: "id-kontroll-servicekontor",
    phase: "settimana",
    guide: "folkbokforing",
    title: {
      it: "Prenota il controllo d’identità a un servicekontor",
      sv: "Boka id-kontroll på ett servicekontor",
      en: "Book your identity check at a servicekontor",
    },
    detail: {
      it: "Tu e i familiari che si trasferiscono con te dovete presentarvi di persona a un servicekontor, prenotando in uno degli uffici indicati. I controlli d’identità di Skatteverket si fanno nei servicekontor gestiti da Statens servicecenter. Porta tutti i documenti d’identità in originale.",
      sv: "Du och de familjemedlemmar som flyttar med dig ska komma personligen till ett servicekontor och boka tid hos något av de angivna kontoren. Skatteverkets id-kontroller görs på servicekontor som drivs av Statens servicecenter. Ta med alla id-handlingar i original.",
      en: "You and the family members moving with you must go in person to a servicekontor, booking at one of the listed offices. Skatteverket’s identity checks take place at servicekontor run by Statens servicecenter. Bring all identity documents in original.",
    },
  },
  {
    id: "samordningsnummer-kort-vistelse",
    phase: "settimana",
    guide: "samordningsnummer",
    title: {
      it: "Resti meno di un anno? Chiedi il samordningsnummer",
      sv: "Stannar du under ett år? Ansök om samordningsnummer",
      en: "Staying under a year? Apply for a samordningsnummer",
    },
    detail: {
      it: "Se resti meno di un anno e ti serve un numero (per esempio per lavorare o pagare le tasse) puoi chiederlo tu stesso: servizio online “Samordningsnummer” o modulo SKV 7540. Serve un controllo d’identità di persona a un servicekontor, da prenotare. Dura 5 anni. Non è un personnummer e non dà diritto alle prestazioni legate alla residenza. Se resti un anno o più, notifica invece il trasferimento.",
      sv: "Stannar du under ett år och behöver ett nummer (till exempel för att arbeta eller betala skatt) kan du ansöka själv: e-tjänsten ”Samordningsnummer” eller blankett SKV 7540. Du måste göra en id-kontroll personligen på ett servicekontor, som du bokar. Numret gäller i 5 år. Det är inte ett personnummer och ger ingen rätt till bosättningsbaserade förmåner. Stannar du ett år eller längre anmäler du i stället flytten.",
      en: "If you stay under a year and need a number (for example to work or pay tax) you can apply yourself: the online service “Samordningsnummer” or form SKV 7540. You must do an identity check in person at a servicekontor, which you book. It is valid for 5 years. It is not a personnummer and gives no right to residence-based benefits. If you stay a year or more, notify your move instead.",
    },
  },
  {
    id: "boende-kontrakt",
    phase: "settimana",
    guide: "bostad",
    title: {
      it: "Metti per iscritto dove abiti e con quale contratto",
      sv: "Se till att du har skriftligt kontrakt på din bostad",
      en: "Get your housing contract in writing",
    },
    detail: {
      it: "Per la registrazione serve l’indirizzo completo dove dormi, quindi ti serve una sistemazione già nella prima settimana. Se subaffitti, il subaffitto deve essere autorizzato dal proprietario o dalla Hyresnämnden. Per gli affitti da privati vale dal 1° luglio 2026 la nuova legge: l’affitto deve essere ragionevole rispetto ad abitazioni simili, altrimenti ti rivolgi alla Hyresnämnden.",
      sv: "För folkbokföringen behövs den fullständiga adressen där du sover, så du behöver ett boende redan första veckan. Hyr du i andra hand ska uthyrningen vara godkänd av hyresvärden eller Hyresnämnden. För privatuthyrning gäller sedan 1 juli 2026 en ny lag: hyran ska vara skälig i förhållande till liknande bostäder, annars vänder du dig till Hyresnämnden.",
      en: "Registration requires the full address where you sleep, so you need somewhere to live in the first week. If you sublet, the sublet must be approved by the landlord or the Hyresnämnden. For lets from private individuals a new law applies from 1 July 2026: the rent must be reasonable compared with similar homes, otherwise you turn to the Hyresnämnden.",
    },
  },

  // ── Första månaden ────────────────────────────────────────────────────
  {
    id: "personnummer-ankommer",
    phase: "mese",
    guide: "folkbokforing",
    title: {
      it: "Aspetta il personnummer (circa 5 settimane)",
      sv: "Vänta på ditt personnummer (cirka 5 veckor)",
      en: "Wait for your personnummer (about 5 weeks)",
    },
    detail: {
      it: "Ci vogliono circa 5 settimane prima che la pratica sia assegnata a un funzionario; la decisione arriva per lettera. Il personnummer arriva con la prima registrazione ed è la chiave per quasi tutto il resto: conto completo, BankID, vårdcentral.",
      sv: "Det tar cirka 5 veckor innan ärendet tilldelas en handläggare; beslutet kommer med brev. Personnumret kommer med den första folkbokföringen och är nyckeln till nästan allt annat: fullständigt bankkonto, BankID, vårdcentral.",
      en: "It takes about 5 weeks before the case is assigned to a caseworker; the decision arrives by letter. The personnummer comes with the first registration and is the key to almost everything else: a full bank account, BankID, a vårdcentral.",
    },
  },
  {
    id: "bankkonto",
    phase: "mese",
    guide: "bankid",
    title: {
      it: "Apri un conto: hai diritto a un conto di pagamento di base",
      sv: "Öppna bankkonto: du har rätt till ett betalkonto",
      en: "Open a bank account: you have a right to a basic account",
    },
    detail: {
      it: "Chi è residente in Svezia o altrove nel SEE ha diritto a un conto di pagamento di base (betalkonto). La banca decide entro dieci giorni lavorativi bancari dalla domanda completa e può rifiutare solo in certi casi; se rifiuta deve dirtelo per iscritto, gratis. Molte banche chiedono personnummer e un documento svedese per un conto completo. Reclami: ARN. Consulenza gratuita: Konsumenternas Bank- och finansbyrå, 0200-22 58 00.",
      sv: "Du som är bosatt i Sverige eller annat EES-land har rätt till ett betalkonto med grundläggande funktioner. Banken ska besluta inom tio bankdagar efter en komplett ansökan och får bara neka i vissa fall; nekar den ska den säga det skriftligt och utan kostnad. Många banker kräver personnummer och svensk id-handling för ett fullständigt konto. Klagomål: ARN. Gratis rådgivning: Konsumenternas Bank- och finansbyrå, 0200-22 58 00.",
      en: "If you are resident in Sweden or elsewhere in the EEA you have a right to a basic payment account (betalkonto). The bank must decide within ten banking days of a complete application and may refuse only in certain cases; if it refuses it must tell you in writing, free of charge. Many banks ask for a personnummer and a Swedish ID document for a full account. Complaints: ARN. Free advice: Konsumenternas Bank- och finansbyrå, 0200-22 58 00.",
    },
  },
  {
    id: "bankid-swish",
    phase: "mese",
    guide: "bankid",
    title: {
      it: "Attiva BankID e Swish",
      sv: "Skaffa BankID och Swish",
      en: "Set up BankID and Swish",
    },
    detail: {
      it: "BankID lo rilascia la tua banca: in pratica servono personnummer, essere cliente della banca e un documento d’identità accettato (di solito svedese); chiedi alla banca se accetta il tuo passaporto. Swish si attiva tramite la banca e richiede BankID sullo stesso telefono. Con solo il samordningsnummer è più difficile. Alternativa da verificare: Freja eID.",
      sv: "BankID utfärdas av din bank: i praktiken krävs personnummer, att du är kund i banken och en godkänd id-handling (oftast svensk); fråga banken om den godtar ditt pass. Swish aktiverar du via banken och det kräver BankID på samma telefon. Med enbart samordningsnummer är det svårare. Ett alternativ att undersöka: Freja eID.",
      en: "BankID is issued by your bank: in practice you need a personnummer, to be a customer of the bank and an accepted ID document (usually Swedish); ask the bank whether it accepts your passport. Swish is activated through your bank and needs BankID on the same phone. With only a samordningsnummer it is harder. An alternative to check: Freja eID.",
    },
  },
  {
    id: "id-kort",
    phase: "mese",
    guide: "bankid",
    title: {
      it: "Carta d’identità: attento al cambio dal 1° dicembre 2026",
      sv: "ID-kort: håll koll på ändringen 1 december 2026",
      en: "ID card: mind the change from 1 December 2026",
    },
    detail: {
      it: "Oggi Skatteverket rilascia la carta d’identità a chi è folkbokförd: 400 kr da pagare prima della visita, pronta in circa due settimane; non è un documento di viaggio. Dal 1° dicembre 2026 la Polizia rilascia una carta d’identità speciale ai residenti registrati non cittadini svedesi, senza funzione di viaggio. Il governo propone di chiudere il servizio di Skatteverket dal 1° marzo 2027: è una proposta, non ancora legge.",
      sv: "I dag utfärdar Skatteverket ID-kort till den som är folkbokförd: 400 kr som betalas före besöket, klart efter cirka två veckor; det är ingen resehandling. Från 1 december 2026 utfärdar Polisen ett särskilt ID-kort till folkbokförda som inte är svenska medborgare, utan resefunktion. Regeringen föreslår att Skatteverkets id-kortsverksamhet avvecklas från 1 mars 2027; det är ett förslag, ännu inte lag.",
      en: "Today Skatteverket issues an ID card to people who are folkbokförd: 400 kr, paid before the visit, ready in about two weeks; it is not a travel document. From 1 December 2026 the Police issue a special ID card to registered residents who are not Swedish citizens, without a travel function. The government proposes closing Skatteverket’s ID-card service from 1 March 2027: this is a proposal, not yet law.",
    },
  },
  {
    id: "vardcentral",
    phase: "mese",
    guide: "vard",
    title: {
      it: "Scegli una vårdcentral su 1177",
      sv: "Välj vårdcentral via 1177",
      en: "Choose a vårdcentral through 1177",
    },
    detail: {
      it: "Quando hai il personnummer scegli la tua vårdcentral e iscriviti (listning) su 1177.se. 1177 è anche il numero per consigli sanitari 24 ore su 24; il numero di emergenza è 112. I ticket li fissa la regione: a Stoccolma una visita in ambulatorio costa 275 kr, gratis da 0 a 17 anni; c’è un tetto di spesa (högkostnadsskydd) di 1 450 kr in 12 mesi, poi frikort.",
      sv: "När du har personnummer väljer du vårdcentral och listar dig via 1177.se. 1177 är också numret för sjukvårdsrådgivning dygnet runt; nödnumret är 112. Patientavgifterna bestämmer regionen: i Region Stockholm kostar ett läkarbesök 275 kr, gratis för 0–17 år; högkostnadsskyddet är 1 450 kr på 12 månader, därefter frikort.",
      en: "Once you have a personnummer, choose your vårdcentral and register (listning) on 1177.se. 1177 is also the 24-hour health advice line; the emergency number is 112. The region sets patient fees: in Region Stockholm an outpatient visit costs 275 kr, free for ages 0–17; the high-cost cap (högkostnadsskydd) is 1,450 kr in 12 months, then a frikort.",
    },
  },
  {
    id: "sfi",
    phase: "mese",
    guide: "sfi-och-arbete",
    title: {
      it: "Chiedi SFI al tuo comune",
      sv: "Ansök om SFI hos din kommun",
      en: "Apply for SFI through your kommun",
    },
    detail: {
      it: "SFI (svenska för invandrare) è il corso di svedese organizzato dal comune, gratuito per legge. Hai diritto dalla seconda metà dell’anno in cui compi 16 anni, se vivi in Svezia e ti mancano le basi. Il personnummer non è richiesto. Dal 1° gennaio 2026 il diritto dura 3 anni dalla prima ammissione, con proroghe di 6 mesi per motivi particolari.",
      sv: "SFI (svenska för invandrare) är kommunens svenskundervisning och är avgiftsfri enligt skollagen. Du har rätt från andra halvåret det år du fyller 16, om du bor i Sverige och saknar grundläggande kunskaper i svenska. Personnummer krävs inte. Från 1 januari 2026 gäller rätten i 3 år från första antagningen, med förlängning med 6 månader i taget av särskilda skäl.",
      en: "SFI (svenska för invandrare) is the Swedish course run by the kommun, free of charge by law. You have a right from the second half of the year you turn 16, if you live in Sweden and lack basic Swedish. A personnummer is not required. From 1 January 2026 the right lasts 3 years from first admission, with 6-month extensions for particular reasons.",
    },
  },

  // ── Inom 90 dagar ─────────────────────────────────────────────────────
  {
    id: "akassa-fack",
    phase: "mese",
    guide: "fack-och-a-kassa",
    title: {
      it: "Iscriviti a un’a-kassa (e valuta il sindacato) appena inizi a lavorare",
      sv: "Gå med i en a-kassa (och fundera på facket) så fort du börjar arbeta",
      en: "Join an a-kassa (and consider a union) as soon as you start working",
    },
    detail: {
      it: "Sindacato e a-kassa sono due iscrizioni separate: puoi fare l’una senza l’altra. Per l’a-kassa conta la durata: dal 1° ottobre 2025 l’indennità è all’80 % solo con almeno 12 mesi di iscrizione che coprono tutto il periodo di riferimento, 60 % con gli ultimi 6 mesi, 50 % negli altri casi. Se non sai quale scegliere, l’Alfa-kassan è aperta a chiunque abbia lavorato in Svezia.",
      sv: "Fack och a-kassa är två skilda medlemskap: du kan gå med i det ena utan det andra. För a-kassan räknas tiden: sedan 1 oktober 2025 får du 80 % bara med minst 12 månaders medlemskap som täcker hela referensperioden, 60 % med de sista 6 månaderna, annars 50 %. Vet du inte vilken du ska välja är Alfa-kassan öppen för alla som arbetat i Sverige.",
      en: "A union and an a-kassa are two separate memberships: you can join one without the other. For the a-kassa, length counts: since 1 October 2025 the benefit is 80% only with at least 12 months of membership covering the whole reference period, 60% with the last 6 months, 50% otherwise. If you are unsure which to pick, Alfa-kassan is open to anyone who has worked in Sweden.",
    },
  },
  {
    id: "forsakringskassan-formaner",
    phase: "trimestre",
    guide: "forsakringskassan",
    title: {
      it: "Controlla le prestazioni di Försäkringskassan",
      sv: "Kolla dina förmåner hos Försäkringskassan",
      en: "Check your Försäkringskassan benefits",
    },
    detail: {
      it: "Conta dove vivi o lavori, non la cittadinanza. Il barnbidrag (1 250 kr per figlio al mese) è automatico per chi vive in Svezia con i figli; le altre prestazioni, come föräldrapenning e bostadsbidrag, si chiedono a Försäkringskassan. Novità: dal 1° gennaio 2027 per alcune prestazioni legate alla residenza servirà aver vissuto in Svezia 5 anni negli ultimi 15, o vivere in Svezia con un certo reddito da lavoro, con eccezioni; chi si è stabilito prima del 1° gennaio 2027 segue le regole vecchie.",
      sv: "Det är var du bor eller arbetar som räknas, inte medborgarskapet. Barnbidraget (1 250 kr per barn och månad) betalas ut automatiskt till den som bor i Sverige med sina barn; övriga förmåner, till exempel föräldrapenning och bostadsbidrag, ansöker du om hos Försäkringskassan. Nytt: från 1 januari 2027 krävs för vissa bosättningsbaserade förmåner att du bott i Sverige 5 år av de senaste 15, eller bor här med viss arbetsinkomst, med undantag; den som bosatt sig före 1 januari 2027 omfattas av de gamla reglerna.",
      en: "What counts is where you live or work, not citizenship. Barnbidrag (1,250 kr per child a month) is automatic for those living in Sweden with their children; other benefits, such as föräldrapenning and bostadsbidrag, you apply for at Försäkringskassan. New: from 1 January 2027 certain residence-based benefits require 5 years of residence in Sweden in the last 15, or living here with a certain work income, with exceptions; those who settled before 1 January 2027 follow the old rules.",
    },
  },
  {
    id: "arbetsformedlingen-akassa",
    phase: "trimestre",
    guide: "sfi-och-arbete",
    title: {
      it: "Se cerchi lavoro: iscriviti ad Arbetsförmedlingen",
      sv: "Söker du jobb: anmäl dig hos Arbetsförmedlingen",
      en: "If you are job hunting: register with Arbetsförmedlingen",
    },
    detail: {
      it: "Iscriviti ad Arbetsförmedlingen come persona in cerca di lavoro: serve anche per chiedere l’a-kassa. La cassa a cui iscriverti (e perché farlo presto) è nel passo sull’a-kassa, nel primo mese.",
      sv: "Anmäl dig som arbetssökande hos Arbetsförmedlingen; det behövs också för att kunna få a-kassa. Vilken kassa du ska gå med i, och varför tidigt, står i steget om a-kassa under första månaden.",
      en: "Register with Arbetsförmedlingen as a job seeker; it is also needed to claim the a-kassa. Which fund to join, and why early, is in the a-kassa step in the first month.",
    },
  },
  {
    id: "aire-iscrizione",
    phase: "trimestre",
    guide: "aire",
    title: {
      it: "Solo cittadini italiani: iscriviti all’AIRE entro 90 giorni",
      sv: "Bara italienska medborgare: registrera dig i AIRE inom 90 dagar",
      en: "Italian citizens only: register with AIRE within 90 days",
    },
    detail: {
      it: "Se ti trasferisci in Svezia per più di 12 mesi devi iscriverti all’AIRE entro 90 giorni, online sul portale FAST IT. Ti servono la carta d’identità o il passaporto italiano e il certificato di Skatteverket con i dati sulla famiglia e la data del trasloco, rilasciato da non più di 3 mesi: per questo conviene arrivarci dopo la folkbokföring.",
      sv: "Flyttar du till Sverige för mer än 12 månader ska du registrera dig i AIRE inom 90 dagar, online på portalen FAST IT. Du behöver ditt italienska ID-kort eller pass och Skatteverkets intyg om familjerelationer och flyttdatum, utfärdat för högst 3 månader sedan: därför ska du göra det efter folkbokföringen.",
      en: "If you move to Sweden for more than 12 months you must register with AIRE within 90 days, online on the FAST IT portal. You need your Italian ID card or passport and the Skatteverket certificate with family relations and move dates, issued no more than 3 months ago: that is why it comes after folkbokföring.",
    },
  },
  {
    id: "kontrollera-tillstand",
    phase: "trimestre",
    guide: "uppehallstillstand",
    title: {
      it: "Verifica che permesso e diritto di soggiorno siano a posto",
      sv: "Kontrollera att tillstånd och uppehållsrätt är i ordning",
      en: "Check that your permit and right of residence are in order",
    },
    detail: {
      it: "Cittadini UE/SEE: dopo 3 mesi il diritto di soggiorno richiede lavoro, impresa, studio o mezzi sufficienti; dopo 5 anni diventa permanente. Non UE: tieni d’occhio la scadenza del permesso; dal 12 luglio 2026 il permesso permanente non viene più concesso come regola generale. I familiari non UE di un cittadino UE che restano più di 3 mesi chiedono la carta di soggiorno (uppehållskort) a Migrationsverket.",
      sv: "Medborgare i EU/EES: efter 3 månader krävs för uppehållsrätt arbete, eget företag, studier eller tillräckliga medel; efter 5 år blir den permanent. Utanför EU: håll koll på när tillståndet går ut; från 12 juli 2026 beviljas permanent uppehållstillstånd inte längre som huvudregel. Familjemedlemmar utanför EU till en EU-medborgare som stannar längre än 3 månader ansöker om uppehållskort hos Migrationsverket.",
      en: "EU/EEA citizens: after 3 months the right of residence requires work, a business, study or sufficient means; after 5 years it becomes permanent. Non-EU: watch your permit’s expiry date; from 12 July 2026 a permanent residence permit is no longer granted as a general rule. Non-EU family members of an EU citizen who stay more than 3 months apply to Migrationsverket for a residence card (uppehållskort).",
    },
  },
];
