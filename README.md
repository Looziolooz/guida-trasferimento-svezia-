# Svezia Pratica

Guida gratuita e trilingue (**italiano · svedese · inglese**) per chi si trasferisce in
Svezia, da un paese UE o da fuori: permesso di soggiorno, folkbokföring e personnummer,
samordningsnummer, BankID, casa, sanità, Försäkringskassan, SFI e lavoro.
Sito gemello di Italia Pratica (stesso autore, stesso impianto), pubblicato su
`svezia.italia-pratica.it`.

Sito statico in **Next.js 16 (App Router) + Tailwind CSS 4**, senza database, senza
account, senza cookie di tracciamento e senza pubblicità. Tutte le pagine sono
pre-generate al build.

---

## Avvio

```bash
npm install      # richiede Node 24.x (vedi "engines" in package.json)
npm run dev      # http://localhost:3000 → redirect su /sv, /en o /it
npm run build    # pre-genera tutte le pagine statiche
npm start        # server di produzione
npm run lint
```

> `next/font/google` scarica i font **durante il build**: la prima build ha bisogno di
> rete. In esecuzione i font sono self-hostati, nessuna chiamata a Google.

### Variabili d'ambiente

Due, entrambe opzionali. Copia `.env.example` in `.env.local`.

```bash
# canonical, hreflang, Open Graph, sitemap
NEXT_PUBLIC_SITE_URL=https://tuo-dominio.eu

# contribuzione volontaria: link personale Revolut, Stripe Payment Link,
# Ko-fi, Liberapay… è solo un URL esterno
NEXT_PUBLIC_SUPPORT_URL=https://revolut.me/tuo-handle
```

Senza la prima si usa il valore di riserva in [`src/lib/site.ts`](src/lib/site.ts).
Senza la seconda **il blocco "offrimi un caffè" non compare da nessuna parte**: meglio
niente che un bottone che non porta da nessun posto.

---

## Struttura

```
content/guides/<slug>/{it,sv,en}.md   Il contenuto. Una cartella per guida, un file per lingua
src/app/[locale]/                     Rotte: home, guide, checklist, enti, glossario, info
src/components/                       Header, Hero, GuideCard, Toc, ricerca, checklist…
src/data/                             Dati trilingui: enti, glossario, checklist
src/lib/                              i18n, registro guide, pipeline Markdown, store client
```

### Come è organizzato l'i18n

- Tre lingue in [`src/lib/locales.ts`](src/lib/locales.ts); **`sv` è la predefinita**.
- Le stringhe d'interfaccia stanno in un dizionario tipizzato,
  [`src/lib/ui.ts`](src/lib/ui.ts): aggiungere una chiave senza tradurla in tutte e tre
  le lingue **non compila**.
- `middleware.ts` negozia la lingua solo sulla radice, leggendo `Accept-Language`.
- Gli **slug non sono tradotti** di proposito: `folkbokforing`, `bankid`,
  `samordningsnummer` sono i termini che si trovano sui moduli ed è così che vengono cercati. Cambiare
  lingua conserva quindi la pagina: si sostituisce solo il primo segmento del percorso.
- Se manca la traduzione di una guida, viene servita la **versione italiana** con un
  avviso in cima, invece di un 404.

### Come è fatto il contenuto

Markdown con frontmatter, compilato al build con `remark` + `rehype` (GFM, slug sui
titoli, link di ancoraggio). Non è MDX: nessun componente React nel testo, quindi il
contenuto resta modificabile da chi non scrive codice.

```markdown
---
title: "Il codice fiscale"
summary: "Una riga che compare nella card e nella ricerca."
updated: "2026-10-05"   # quando il CONTENUTO è cambiato
reviewed: "2027-03-12"  # opzionale: quando l'hai ricontrollato senza modifiche
keywords: [codice fiscale, Agenzia delle Entrate]
official:
  - label: "Agenzia delle Entrate"
    url: "https://www.agenziaentrate.gov.it/"
---

## Un titolo di secondo livello finisce nell'indice laterale

:::tip[In breve]
Sei tipi di callout: `tip`, `note`, `warn`, `danger`, `who`, `cost`.
Il titolo tra parentesi quadre è facoltativo.
:::
```

Il blocco `:::who` — «a chi ti rivolgi» — è quello che questo sito usa di più: è la
domanda che precede tutte le altre.

### Le due date

Il sito è statico per scelta: una guida si aggiorna **solo quando cambia la norma**. Il
rischio è che una pagina ancora corretta sembri abbandonata, perché mostra una data vecchia.
Per questo il frontmatter ha due campi:

| Campo | Significato | Quando lo bumpi |
|---|---|---|
| `updated` | Il contenuto è cambiato | Hai riscritto qualcosa perché la regola è cambiata |
| `reviewed` | Ricontrollata, nulla da cambiare | Hai riletto e le fonti dicono ancora la stessa cosa |

In pagina diventa *«Aggiornata il 5 ottobre 2026 · verificata il 12 marzo 2027»*. Senza
`reviewed` compare la sola data di aggiornamento, quindi il campo si aggiunge solo quando
serve.

Tre dettagli voluti:

- una `reviewed` **anteriore** a `updated` viene ignorata: dopo una modifica non ha senso
  dichiarare una verifica più vecchia del cambiamento;
- le **card** e la ricerca mostrano la più recente delle due — è il segnale di freschezza;
- il **sitemap** resta su `updated`. `lastmod` deve indicare una modifica reale del
  contenuto: gonfiarlo a ogni rilettura è il modo più rapido per farselo ignorare dai
  motori di ricerca.

Il campo è per singolo file di lingua: le traduzioni si rileggono separatamente.

**Il rito annuale**, cinque minuti per guida: rileggi, apri i link alle fonti ufficiali,
se non è cambiato niente bumpi `reviewed` e committi. Nessuna modifica di contenuto, ma il
sito dichiara di essere vivo.

### Aggiungere una guida

1. Registrarla in [`src/lib/guides.ts`](src/lib/guides.ts): slug, categoria, icona
   (nome `lucide-react`), ordine, ed eventualmente `essential: true`.
2. Creare `content/guides/<slug>/it.md` (e `sv.md`, `en.md` quando pronte).
3. Basta. Rotte, sitemap, hreflang, indice di ricerca, card, guide collegate e link nel
   footer si aggiornano da soli.

Il sito **compila anche a contenuto parziale**: vengono pre-generate solo le guide che
hanno almeno un file.

---

## Cosa c'è dentro

| Pagina | Cosa fa |
|---|---|
| `/{lingua}` | Hero, percorso in quattro fasi, cinque aree, guide essenziali, disclaimer |
| `/{lingua}/guide` | Tutte le guide, raggruppate per area |
| `/{lingua}/guide/{slug}` | La guida, con indice laterale, fonti ufficiali e guide collegate |
| `/{lingua}/checklist` | I primi 90 giorni, con avanzamento salvato in `localStorage` |
| `/{lingua}/enti` | Directory degli enti: di cosa si occupano, dove stanno, guide collegate |
| `/{lingua}/glossario` | Termini burocratici con traduzione e spiegazione |
| `/{lingua}/info` | Cos'è il progetto, come è fatto, cosa non è |

Più: ricerca client-side su guide, enti e glossario (tasto `/`), tema chiaro/scuro senza
lampo al caricamento, `sitemap.xml` con hreflang, `robots.txt`, JSON-LD `Article` sulle
guide.

### Contribuzione volontaria

Un blocco «Ti piace questo progetto? Sostienilo con una donazione o offrimi un espresso» **su
ogni pagina**, più un **banner fluttuante "offrimi un espresso"** in basso a destra —
scritto in casa, sullo spirito del bottone di Buy Me a Coffee ma senza il suo script: si
veste col tema del sito, compare dopo ~1,8 s e si può chiudere (la scelta resta in
`localStorage`).

Il blocco vive in [`src/app/[locale]/layout.tsx`](src/app/[locale]/layout.tsx), non nelle
singole pagine: così compare anche sulle pagine che aggiungerai domani, senza doverlo
ricordare. Testi in [`src/lib/ui.ts`](src/lib/ui.ts) → `support`.

Per collegarlo serve un **URL completo** della destinazione:

```bash
NEXT_PUBLIC_SUPPORT_URL=https://revolut.me/<handle>   # link personale Revolut, gratis
NEXT_PUBLIC_SUPPORT_URL=https://buy.stripe.com/<id>   # Stripe Payment Link
NEXT_PUBLIC_SUPPORT_URL=https://ko-fi.com/<handle>    # Ko-fi, BMC, Liberapay…
```

Un **handle nudo viene ignorato** di proposito: da `tizio` non si può sapere la
piattaforma, e indovinarla male manderebbe le donazioni a un estraneo. In quel caso non
compare nulla, invece di comparire un bottone sbagliato.

- Variabile **vuota** → spariscono sia il blocco sia il banner.
- Qualunque piattaforma va bene: il banner è nostro, quindi non dipende da Buy Me a Coffee.

### La scala degli importi

Con un link **revolut.me** il blocco mostra tre livelli — un espresso, un giro da tre, un
giro da cinque — più una cifra libera, e scrive l'importo dentro al link. Chi paga lo
vede già compilato e può cambiarlo prima di confermare: è un suggerimento, non un
addebito. Con Stripe o Ko-fi la scala non compare e resta il bottone semplice, perché
lì l'importo sta dentro al link stesso.

La pagina di Revolut legge tre parametri dalla query string:

```
https://revolut.me/<handle>?amount=2500&currency=SEK&note=En+espresso
```

⚠ **`amount` è in centesimi.** `amount=2500` sono 25,00 kr, non 2500. Verificato
aprendo il link: con `amount=10` la pagina mostrava 0,10 €. Sbagliare il fattore 100
significa chiedere cento volte troppo, o troppo poco.

⚠ **La valuta deve essere una che il conto Revolut possiede davvero.** La pagina la
confronta con l'elenco dei conti e, se non la trova, scarta *sia* la valuta *sia*
l'importo: il bottone continua a funzionare, ma arriva senza cifra preimpostata.

Valuta e prezzo cambiano per lingua, in `SUPPORT_MONEY` dentro
[`src/lib/site.ts`](src/lib/site.ts): **corone** sulla pagina svedese (25 kr a espresso),
**euro** su quella italiana e inglese (2 €). Chi contribuisce è in larga parte svedese,
e con l'euro si prenderebbe un cambio sulla carta per due caffè.

### Limiti del link personale Revolut

Gratis su qualsiasi piano, anche Standard, ma con dei tetti:

| Limite | Valore |
|---|---|
| Carta, da chi **non** ha Revolut | ~250 £/settimana |
| Ricariche sul link | 20/settimana, 40/mese |
| Da Revolut a Revolut | nessun limite |

Il vincolo che si tocca per primo non è la cifra: sono le **40 donazioni al mese**.

### Dove compare la richiesta

Due pezzi, mai nella stessa schermata:

- [`SupportSection.tsx`](src/components/SupportSection.tsx) — **chi c'è dietro + come
  sostenerlo**, in un blocco solo, su home e `/info`. Erano due riquadri separati e il
  secondo ripeteva quello che il primo aveva già detto (che hosting e dominio li paga
  l'autore); uniti, la richiesta smette di essere un annuncio a sé e diventa la
  conseguenza di quello che si è appena letto. Dentro, la scala degli importi è
  [`EspressoPicker.tsx`](src/components/EspressoPicker.tsx).
- [`SupportBar.tsx`](src/components/SupportBar.tsx) — **la barra fissa in fondo**, su
  ogni pagina. Compare dopo il 35% della pagina, si chiude, e un `IntersectionObserver`
  la nasconde appena il blocco qui sopra entra in campo.

Il testo è volutamente corto: una riga di garanzia e tutto il resto — Revolut, lingua,
dati della carta — dentro un `<details>` che si apre solo se interessa. Niente fondale
illustrato: toglieva attenzione al testo senza aggiungere informazione.

## Fonti e verifica

Ogni guida porta in cima la **data dell'ultima revisione** e in fondo un blocco **Fonti
ufficiali** (`migrationsverket.se`, `skatteverket.se`, `forsakringskassan.se`, `1177.se`,
`bankid.com`, `sfi`/`komvux`, `arbetsformedlingen.se`…). I dati strutturati (checklist, enti,
glossario) sono **ancora vuoti**: vanno riempiti con dati svedesi verificati.

Per controllare gli URL esterni nel contenuto:

```bash
grep -ohrE 'https?://[^ ")]+' content/guides | sort -u | while read u; do
  printf '%s %s
' "$(curl -sL -o /dev/null -w '%{http_code}' -m 30 "$u")" "$u"
done | grep -v '^200'
```

## Accessibilità e privacy

- `prefers-reduced-motion` disattiva animazioni e scroll morbido.
- Skip link, `aria-label` sui controlli, focus visibile, contrasto verificato in entrambi
  i temi.
- Tabelle larghe scorrono nel proprio contenitore, il body non scorre mai in orizzontale.
- Nessun analytics e nessuna pubblicità. In `localStorage` restano solo la spunta della
  checklist (`ip-checklist`) e la preferenza di tema (`ip-theme`), che non lasciano il
  browser.
- **Nessuno script di terze parti.** Il banner "offrimi un espresso" è scritto in casa
  ([`SupportBanner.tsx`](src/components/SupportBanner.tsx)): niente widget esterni, niente
  cookie altrui. Vedi [ASSETS.md](ASSETS.md).

## Deploy

Va su qualunque host che esegua Next.js. Su Vercel Hobby è gratuito: importare il repo,
impostare `NEXT_PUBLIC_SITE_URL` e il build predefinito funziona così com'è.

L'unico pezzo non statico è il middleware che negozia la lingua su `/`. Se serve un
export completamente statico, si rimuove `src/middleware.ts` e si lascia il redirect di
`src/app/page.tsx`.

## Licenza

- **Testi delle guide**: CC BY 4.0 — riutilizzabili con attribuzione.
- **Codice**: MIT.
- Asset e font: vedi [ASSETS.md](ASSETS.md).

## Avvertenza

Il sito è informazione, non consulenza legale, fiscale o notarile. Le norme svedesi
cambiano e vengono applicate diversamente da comune a comune e da regione a regione. Ogni guida porta in
cima la **data dell'ultima revisione** e in fondo i **link alle fonti ufficiali**: se la
fonte ufficiale dice altro, ha ragione la fonte ufficiale.
