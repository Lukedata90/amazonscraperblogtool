# Istruzioni Tool Scraper — Amazon Bulletin

## Panoramica

Questo documento descrive come costruire il sistema di raccolta automatica di news per **Amazon Bulletin**, un feed intelligence per venditori Amazon e per chiunque voglia monitorare l'ecosistema Amazon.

Il sistema raccoglie due tipologie di notizie, separate in due tab:

| Tab | Cosa raccoglie |
|---|---|
| **MONDO AMAZON** | FBA, policy, strumenti seller, advertising, community |
| **IMPATTO SU AMAZON** | Finanza & mercati, politica & leggi, Big Tech, macro economia |

La pipeline è composta da tre componenti principali:
- **Apify** — raccolta news via RSS feed
- **Claude API** — sommario AI, categorizzazione e assegnazione tab
- **Supabase** — storage degli articoli processati

---

## Stack Tecnologica

| Componente | Servizio | Ruolo |
|---|---|---|
| Scraper | Apify `automation-lab/rss-feed-reader` | Legge i feed RSS delle fonti |
| AI Processing | Claude API `claude-sonnet-4-5` | Genera summary in italiano + categoria + tab |
| Database | Supabase (PostgreSQL) | Salva articoli, gestisce deduplication |
| Backend | Next.js API Route `/api/ingest` | Orchestra l'intera pipeline |
| Scheduler | Vercel Cron Job | Triggera `/api/ingest` ogni 6 ore |
| Hosting | Vercel | Deploy frontend + API |

---

## Fonti RSS — Tab MONDO AMAZON

Fonti strettamente legate all'ecosistema venditori Amazon.

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

## Fonti RSS — Tab IMPATTO SU AMAZON

Fonti che coprono notizie macro che possono impattare Amazon come azienda: dazi, tassi, regolamentazione, mosse dei competitor Big Tech, recessioni di mercato.

### Finanza & Mercati

| Nome | RSS URL |
|---|---|
| Bloomberg Markets | `https://feeds.bloomberg.com/markets/news.rss` |
| Reuters Business | `https://feeds.reuters.com/reuters/businessNews` |
| Wall Street Journal Markets | `https://feeds.a.dj.com/rss/RSSMarketsMain.xml` |
| Financial Times | `https://www.ft.com/rss/home` |

### Politica & Regolamentazione

| Nome | RSS URL |
|---|---|
| Politico Economy | `https://www.politico.com/rss/economy.xml` |
| Reuters Politics | `https://feeds.reuters.com/reuters/politicsNews` |
| EU Commission News | `https://ec.europa.eu/commission/presscorner/api/rss` |

### Big Tech & Competizione

| Nome | RSS URL |
|---|---|
| TechCrunch | `https://techcrunch.com/feed/` |
| The Verge | `https://www.theverge.com/rss/index.xml` |
| Ars Technica Business | `https://feeds.arstechnica.com/arstechnica/business` |

### Macro Economia

| Nome | RSS URL |
|---|---|
| The Economist | `https://www.economist.com/finance-and-economics/rss.xml` |
| Project Syndicate | `https://www.project-syndicate.org/rss` |

---

## Schema Database Supabase

Eseguire questo SQL nella Supabase SQL Editor prima di avviare il progetto.

```sql
-- Tabella fonti RSS
create table sources (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  rss_url text not null,
  tab text not null check (tab in ('amazon', 'macro')),
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
  tab text not null check (tab in ('amazon', 'macro')),
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

-- Indice per filtrare per tab
create index on articles (tab, published_at desc);
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

> ⚠️ Non committare mai il file `.env.local` su GitHub.

---

## Come Funziona la Pipeline

### Passo 1 — Trigger (automatico o manuale)

Vercel Cron chiama ogni 6 ore:

```
POST /api/ingest
Authorization: Bearer {INGEST_API_KEY}
```

Per testare manualmente:

```bash
curl -X POST https://tuo-sito.vercel.app/api/ingest \
  -H "Authorization: Bearer la_tua_ingest_api_key"
```

### Passo 2 — Lettura fonti da Supabase

La route legge tutte le righe di `sources` dove `active = true`.
Ogni fonte ha un campo `tab` (`amazon` o `macro`) che viene passato all'articolo.

### Passo 3 — Chiamata Apify RSS Reader

Per ogni fonte, viene chiamato l'Actor `automation-lab/rss-feed-reader`:

```
POST https://api.apify.com/v2/acts/automation-lab~rss-feed-reader/run-sync-get-dataset-items
?token={APIFY_API_TOKEN}

Body JSON:
{
  "feedUrls": ["https://url-del-feed-rss"],
  "maxItemsPerFeed": 20
}
```

### Passo 4 — Deduplication

Prima di processare ogni articolo, la route controlla se `source_url` esiste già nella tabella `articles`. Se esiste, viene saltato.

### Passo 5 — Processing con Claude API

Per ogni articolo nuovo, viene chiamata Claude API con questo prompt:

```
Sei un editor specializzato in news finanziarie, di mercato e del mondo Amazon.
Dato questo articolo, produci un JSON con:

- "summary": riassunto in italiano di 120-150 parole, chiaro e informativo
- "tab": uno tra ["amazon", "macro"]
  - "amazon" = notizia diretta per venditori Amazon (FBA, policy, tools, advertising, community)
  - "macro" = notizia che può impattare Amazon come azienda (dazi, tassi, antitrust, Big Tech, recessione)
- "category": una tra le seguenti, coerente con il tab scelto:
  Se tab="amazon": [Policy & Regolamenti, FBA & Logistica, Strumenti Seller, Advertising, News Aziendale, Finanza & Tasse, Community]
  Se tab="macro":  [Finanza & Mercati, Politica & Leggi, Big Tech, Macro Economia]
- "tags": array di 3-5 tag pertinenti in italiano

Rispondi SOLO con JSON valido, nessun testo aggiuntivo.

Titolo: {title}
Contenuto: {content}
```

> Nota: il campo `tab` della fonte in Supabase è un suggerimento iniziale, ma Claude può correggerlo se il contenuto non corrisponde.

### Passo 6 — Salvataggio su Supabase

L'articolo viene salvato con tutti i campi inclusi `tab`, `summary_ai`, `category` e `tags`.
Lo `slug` viene generato automaticamente dal titolo.

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

> Su piano Hobby usare **cron-job.org** (gratuito) per triggerare l'endpoint ogni 6 ore.

---

## Struttura Frontend

Il frontend ha **due tab switchabili**:

| Tab | Colore accent | Categorie |
|---|---|---|
| MONDO AMAZON | Arancione `#FF6600` | FBA, Policy, Tools, Ads, Community, Finance, Company |
| IMPATTO SU AMAZON | Azzurro `#00BFFF` | Finanza & Mercati, Politica & Leggi, Big Tech, Macro Economia |

Ogni tab ha:
- Sidebar con categorie filtrabili specifiche del tab
- Feed RSS specifici del tab
- Articolo featured + griglia
- Statistiche e distribuzione specifiche del tab
- Il colore dell'interfaccia cambia dinamicamente con il tab attivo

---

## Aggiungere Nuove Fonti

```sql
-- Aggiungere una fonte al tab Amazon
insert into sources (name, rss_url, tab, category, active)
values ('Nome Fonte', 'https://esempio.com/feed/', 'amazon', 'FBA & Logistica', true);

-- Aggiungere una fonte al tab Macro
insert into sources (name, rss_url, tab, category, active)
values ('Nome Fonte', 'https://esempio.com/feed/', 'macro', 'Finanza & Mercati', true);

-- Disattivare una fonte
update sources set active = false where name = 'Nome Fonte';
```

---

## Costi Stimati Mensili

| Servizio | Utilizzo stimato | Costo |
|---|---|---|
| Apify | ~500 articoli/mese (2 tab) | ~$0.25 |
| Claude API | ~500 chiamate/mese | ~$5–8 |
| Supabase | Free tier (500MB) | €0 |
| Vercel | Hobby / Pro | €0–20 |
| **Totale** | | **~€7–30/mese** |

---

## Troubleshooting

**L'ingest non raccoglie articoli nuovi**
→ Verificare che i feed RSS siano attivi visitando gli URL nel browser.
→ Controllare i log Vercel in `Functions` → `/api/ingest`.

**Claude assegna il tab sbagliato**
→ Raffinare il prompt con esempi concreti. Il campo `tab` della fonte in Supabase è un hint iniziale che Claude può usare come contesto.

**Claude restituisce JSON malformato**
→ Aggiungere try/catch con fallback: se il parsing JSON fallisce, salvare l'articolo senza summary AI e riprocessarlo in seguito.

**Feed Reddit bloccato**
→ Passare header custom nell'Actor Apify: `"User-Agent": "AmazonBulletinBot/1.0"`.

**Feed Bloomberg/FT richiedono abbonamento**
→ Alcuni feed premium restituiscono solo titoli senza contenuto. In questo caso Claude elabora solo il titolo + description, con summary più breve.

---

## Roadmap Futura

- [ ] Alert Telegram per notizie ad alto impatto (keyword: "dazi", "antitrust", "fee increase")
- [ ] Score di rilevanza 1-10 per ogni articolo generato da Claude
- [ ] Dashboard admin per gestire fonti e featured
- [ ] Newsletter settimanale con top 5 per tab (Resend)
- [ ] Google News RSS con query `amazon site:news.google.com`
- [ ] Sentiment analysis sul titolo (positivo/negativo/neutro per Amazon)
