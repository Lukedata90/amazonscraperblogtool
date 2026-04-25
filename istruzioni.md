# Istruzioni Tool Scraper — Amazon Insider Blog

## Panoramica

Questo documento descrive come costruire il sistema di raccolta automatica di news per il blog **Amazon Insider**, focalizzato su notizie per venditori Amazon e aggiornamenti aziendali su Amazon come company.

La pipeline è composta da tre componenti principali:
- **Apify** — raccolta news via RSS feed
- **Claude API** — sommario AI e categorizzazione in italiano
- **Supabase** — storage degli articoli processati

---

## Stack Tecnologica

| Componente | Servizio | Ruolo |
|---|---|---|
| Scraper | Apify `automation-lab/rss-feed-reader` | Legge i feed RSS delle fonti |
| AI Processing | Claude API `claude-sonnet-4-20250514` | Genera summary in italiano + categoria + tag |
| Database | Supabase (PostgreSQL) | Salva articoli, gestisce deduplication |
| Backend | Next.js API Route `/api/ingest` | Orchestra l'intera pipeline |
| Scheduler | Vercel Cron Job | Triggera `/api/ingest` ogni 6 ore |
| Hosting | Vercel | Deploy frontend + API |

---

## Fonti RSS Configurate

Queste fonti vanno inserite nella tabella `sources` di Supabase. L'Actor Apify le leggerà tutte a ogni run.

### Strumenti e Strategie Seller

| Nome | RSS URL |
|---|---|
| Helium 10 Blog | `https://www.helium10.com/blog/feed/` |
| Jungle Scout Blog | `https://www.junglescout.com/blog/feed/` |
| Seller App Blog | `https://www.sellerapp.com/blog/feed/` |
| Viral Launch Blog | `https://viral-launch.com/blog/feed/` |

### News Marketplace

| Nome | RSS URL |
|---|---|
| Marketplace Pulse | `https://www.marketplacepulse.com/feed` |
| ChannelX Amazon | `https://channelx.world/category/amazon/feed/` |

### News Aziendali Amazon

| Nome | RSS URL |
|---|---|
| Amazon Press Room | `https://press.aboutamazon.com/rss/news-releases.rss` |
| About Amazon News | `https://www.aboutamazon.com/news/rss.xml` |
| Adweek Amazon | `https://www.adweek.com/category/amazon/feed/` |

### Advertising & Finance

| Nome | RSS URL |
|---|---|
| Tinuiti Amazon Blog | `https://tinuiti.com/blog/?filter-topic=amazon&feed=rss` |
| Intentwise Blog | `https://intentwise.com/blog/feed/` |
| Payability Blog | `https://payability.com/feed/` |

### Community

| Nome | RSS URL |
|---|---|
| Reddit r/FulfillmentByAmazon | `https://www.reddit.com/r/FulfillmentByAmazon/.rss` |
| Reddit r/AmazonSeller | `https://www.reddit.com/r/AmazonSeller/.rss` |

---

## Schema Database Supabase

Eseguire questo SQL nella Supabase SQL Editor prima di avviare il progetto.

```sql
-- Tabella fonti RSS
create table sources (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  rss_url text not null,
  category text,
  active boolean default true,
  created_at timestamptz default now()
);

-- Tabella articoli
create table articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  summary_ai text,
  content text,
  source_url text unique not null,
  source_name text,
  category text,
  tags text[],
  published_at timestamptz,
  scraped_at timestamptz default now(),
  slug text unique,
  is_featured boolean default false,
  image_url text,
  language text default 'it'
);

-- Indice per full-text search in italiano
create index on articles
  using gin(to_tsvector('italian', title || ' ' || coalesce(summary_ai, '')));
```

---

## Variabili d'Ambiente

Creare un file `.env.local` nella root del progetto Next.js con queste variabili:

```env
# Supabase
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_KEY=eyJ...

# Anthropic
ANTHROPIC_API_KEY=sk-ant-...

# Apify
APIFY_API_TOKEN=apify_api_...

# Sicurezza endpoint ingest
INGEST_API_KEY=scegli_una_chiave_segreta_lunga
```

> ⚠️ Non committare mai il file `.env.local` su GitHub. Aggiungilo al `.gitignore`.

---

## Come Funziona la Pipeline

### Passo 1 — Trigger (automatico o manuale)

Vercel Cron chiama ogni 6 ore:

```
POST /api/ingest
Authorization: Bearer {INGEST_API_KEY}
```

Per testare manualmente da terminale:

```bash
curl -X POST https://tuo-sito.vercel.app/api/ingest \
  -H "Authorization: Bearer la_tua_ingest_api_key"
```

### Passo 2 — Lettura fonti da Supabase

La route legge tutte le righe di `sources` dove `active = true`.

### Passo 3 — Chiamata Apify RSS Reader

Per ogni fonte, viene chiamato l'Actor `automation-lab/rss-feed-reader` tramite API REST:

```
POST https://api.apify.com/v2/acts/automation-lab~rss-feed-reader/run-sync-get-dataset-items
?token={APIFY_API_TOKEN}

Body JSON:
{
  "feedUrls": ["https://url-del-feed-rss"],
  "maxItemsPerFeed": 20
}
```

L'Actor restituisce un array di oggetti con: `title`, `link`, `pubDate`, `author`, `description`, `content`.

### Passo 4 — Deduplication

Prima di processare ogni articolo, la route controlla se `source_url` esiste già nella tabella `articles`. Se esiste, l'articolo viene saltato.

### Passo 5 — Processing con Claude API

Per ogni articolo nuovo, viene chiamata Claude API con questo prompt:

```
Sei un editor specializzato in news per venditori Amazon e e-commerce.
Dato questo articolo, produci un JSON con:
- "summary": riassunto in italiano di 120-150 parole, chiaro e informativo
- "category": una tra [Policy & Regolamenti, FBA & Logistica, Strumenti Seller,
  Advertising, News Aziendale, Finanza & Tasse, Community]
- "tags": array di 3-5 tag pertinenti in italiano

Rispondi SOLO con JSON valido, nessun testo aggiuntivo.

Titolo: {title}
Contenuto: {content}
```

### Passo 6 — Salvataggio su Supabase

L'articolo viene salvato con tutti i campi, inclusi `summary_ai`, `category` e `tags` generati da Claude. Lo `slug` viene generato automaticamente dal titolo (lowercase, trattini, caratteri speciali rimossi).

---

## Configurazione Vercel Cron

Creare il file `vercel.json` nella root del progetto:

```json
{
  "crons": [
    {
      "path": "/api/ingest",
      "schedule": "0 */6 * * *"
    }
  ]
}
```

> Il cron è disponibile solo su piani Vercel Pro. Su piano Hobby si può usare un servizio esterno come **[cron-job.org](http://cron-job.org)** (gratuito) che chiama l'endpoint `/api/ingest` ogni 6 ore.

---

## Apify Actor — Dettagli Tecnici

**Actor da usare:** `automation-lab/rss-feed-reader`

**Caratteristiche:**
- Supporta RSS 2.0, Atom 1.0, RSS 1.0 (RDF)
- Estrae: titolo, link, data pubblicazione, autore, categoria, descrizione, contenuto
- Supporta più feed URL in una sola run
- Deduplication interna tramite campo `guid`
- Costo stimato: ~$0.0005 per articolo

**Esempio di output per singolo articolo:**

```json
{
  "title": "Amazon Raises FBA Fees for Q4 2025",
  "link": "https://www.helium10.com/blog/amazon-fba-fees-q4",
  "pubDate": "2025-10-01T10:30:00Z",
  "author": "Helium 10 Team",
  "description": "Amazon has announced new FBA fee changes...",
  "content": "Full article text here...",
  "guid": "https://www.helium10.com/blog/amazon-fba-fees-q4"
}
```

---

## Aggiungere Nuove Fonti

Per aggiungere una nuova fonte RSS senza toccare il codice, inserire una riga nella tabella `sources` su Supabase:

```sql
insert into sources (name, rss_url, category, active)
values ('Nome Fonte', 'https://esempio.com/feed/', 'News', true);
```

La prossima run di Apify la includerà automaticamente.

Per disattivare temporaneamente una fonte senza eliminarla:

```sql
update sources set active = false where name = 'Nome Fonte';
```

---

## Costi Stimati Mensili

| Servizio | Utilizzo stimato | Costo |
|---|---|---|
| Apify | ~300 articoli/mese | ~$0.15 |
| Claude API | ~300 chiamate/mese | ~$3–5 |
| Supabase | Free tier (500MB) | €0 |
| Vercel | Hobby / Pro | €0–20 |
| **Totale** | | **~€5–25/mese** |

---

## Troubleshooting

**L'ingest non raccoglie articoli nuovi**
→ Verificare che i feed RSS siano attivi visitando gli URL direttamente nel browser.
→ Controllare i log Vercel in `Functions` → `/api/ingest`.

**Claude restituisce JSON malformato**
→ Aggiungere un blocco try/catch con fallback: se il parsing JSON fallisce, salvare l'articolo senza summary AI e riprocessarlo in un secondo momento.

**Articoli duplicati nel database**
→ Il constraint `unique` su `source_url` blocca i duplicati a livello DB. Se appaiono duplicati, verificare che lo slug venga generato correttamente.

**Feed Reddit bloccato**
→ Reddit può bloccare request senza User-Agent. Passare header custom nell'Actor Apify: `"User-Agent": "AmazonInsiderBot/1.0"`.

---

## Roadmap Futura

- [ ] Aggiungere Google News RSS con query `amazon seller site:[news.google.com](http://news.google.com)`
- [ ] Notifiche Telegram/Slack per articoli con keyword ad alta priorità (es. "fee increase", "policy change")
- [ ] Dashboard admin per gestire fonti e mettere articoli in evidenza
- [ ] Newsletter settimanale automatica con Resend
- [ ] Traduzione automatica per fonti in lingua diversa dall'inglese
