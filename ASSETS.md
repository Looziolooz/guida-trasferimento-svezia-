# ASSETS.md — Svezia Pratica

Registro degli asset del progetto, come richiesto dal `CLAUDE.md` del repo.

## Regola applicata

**Nessun asset di terzi è referenziato da URL esterno, e nessuno script di terze parti.**
Il sito non carica immagini, video, font o script da CDN altrui a runtime: tutto ciò che
serve è nel repo o viene self-hostato in fase di build.

Il widget ufficiale di Buy Me a Coffee era stato installato e **poi rimosso**: caricava uno
script da `cdnjs.buymeacoffee.com` e costringeva a riscrivere, in tre lingue, le frasi
"nessuno script di terze parti" e "nessun cookie di tracciamento". Al suo posto c'è un
banner scritto in casa — vedi sotto — che fa la stessa cosa senza chiamare nessuno.

Lo sfondo dell'hero, che nel prompt di riferimento della MotionSites Collection era un
**video scroll-bound servito da Cloudinary**, è stato **sostituito con CSS puro**
(`.topo-field`, `.topo-lines`, `.topo-lines-2`, `.grain` in `src/app/globals.css`):
gradienti radiali più curve di livello generate con `repeating-radial-gradient` e
maschere, in lenta deriva. Pesa zero byte di rete, non ha problemi di autoplay su iOS e
rispetta `prefers-reduced-motion`.

## Asset del progetto

| File | Sorgente | Prompt / metodo | Data | Licenza |
|---|---|---|---|---|
| `src/app/icon.svg` | Generato in questo progetto | SVG scritto a mano: documento stilizzato su fondo verde cipresso `#0E5245`, coerente con il wordmark nell'header | 2026-09-04 | Proprietaria del progetto |
| Marchio nell'header (`<Mark />` in `src/components/Header.tsx`) | Generato in questo progetto | SVG inline, stessa forma dell'icona | 2026-09-04 | Proprietaria del progetto |
| Sfondo hero (CSS) | Generato in questo progetto | `radial-gradient` + `repeating-radial-gradient` mascherati, animazione `topo-drift` | 2026-09-04 | Proprietaria del progetto |
| Tazzina espresso (`<EspressoCup />` in `src/components/SupportBanner.tsx`) | Generato in questo progetto | SVG scritto a mano: tazzina con piattino, manico e due filetti di vapore. Sostituisce il logo di Buy Me a Coffee, che non si può riusare | 2026-10-05 | Proprietaria del progetto |

## Dipendenze visive di terzi

| Cosa | Come viene servito | Licenza |
|---|---|---|
| **Inter** (testo e interfaccia) | `next/font/google`: i file font vengono scaricati **al build** e serviti dal dominio del sito. Nessuna chiamata a `fonts.gstatic.com` a runtime | SIL Open Font License 1.1 |
| **Source Serif 4** (titoli) | Idem | SIL Open Font License 1.1 |
| **lucide-react** (icone) | Componenti React, incluse nel bundle | ISC |

## Riferimento di layout

La struttura dell'hero e le meccaniche di animazione (easing `[0.16, 1, 0.3, 1]`,
stagger 0,08 s, `whileInView` con margine negativo, barra flottante con `backdrop-blur`,
card con hover-lift, ritmo `px-6 md:px-12 py-32`) derivano dal prompt **`prism`**
della MotionSites Collection (`hero / corporate`), consultato con `/motion-prompt`.

Secondo la regola del repo sono stati **riusati**: griglia, z-index, scala tipografica,
keyframe, easing, stagger, e il livello di finitura come obiettivo.
Sono stati **scartati**: la palette plum/rosa ciliegio, il brand fittizio "Prism", i copy,
e tutti gli URL di immagini e video (`res.cloudinary.com/dprydfxok/...`).

## Se in futuro si aggiungono immagini

1. Generarle per questo progetto (Canva MCP, Higgsfield MCP, `/blender-asset-from-prompt`),
   mai scaricarle da un CDN altrui.
2. Metterle in `public/`.
3. Aggiungere una riga a questa tabella con file, sorgente, prompt, data e licenza.
4. Servirle con `next/image`.

## Font per le anteprime social

Letti da disco in `src/lib/og-card.tsx` (nessun URL esterno a runtime). `next/og` (Satori)
non legge WOFF2: TTF, un solo peso ciascuno.

| File | Sorgente | Scopo | Data | Licenza |
|---|---|---|---|---|
| `assets/fonts/SourceSerif4-Semibold.ttf` | https://github.com/adobe-fonts/source-serif/releases/download/4.005R/source-serif-4.005_Desktop.zip (TTF/) | Titolo delle immagini Open Graph | 2026-10-15 | SIL OFL 1.1 |
| `assets/fonts/Inter-Regular.ttf` | https://github.com/rsms/inter/releases/download/v4.1/Inter-4.1.zip (extras/ttf/) | Testo piccolo delle immagini Open Graph | 2026-10-15 | SIL OFL 1.1 |
| `assets/fonts/Inter-Bold.ttf` | https://github.com/rsms/inter/releases/download/v4.1/Inter-4.1.zip (extras/ttf/) | Etichette e dominio delle immagini Open Graph | 2026-10-15 | SIL OFL 1.1 |

## Disegni vettoriali scritti a mano

Non è un file: è un componente. Nessuna sorgente esterna, nessun URL di terzi,
nessun logo. I tratti usano `currentColor`, quindi segue il tema.

| Componente | Cosa disegna | Data | Licenza |
|---|---|---|---|

Il fondale illustrato (moka, cornetto, tenda da bar, tricolore) è stato tolto il
2026-10-05: toglieva attenzione al testo senza aggiungere informazione.
