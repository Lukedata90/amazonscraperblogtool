export type Article = {
  id: string;
  title: string;
  summary: string;
  category: string;
  tags: string[];
  source: string;
  publishedAt: string;
  isFeatured: boolean;
  slug: string;
};

export type Category = {
  id: string;
  label: string;
  count: number;
};

export const categories: Category[] = [
  { id: 'all',       label: 'Tutti',              count: 47 },
  { id: 'fba',       label: 'FBA & Logistica',    count: 12 },
  { id: 'policy',   label: 'Policy',              count: 8  },
  { id: 'tools',    label: 'Strumenti Seller',    count: 11 },
  { id: 'ads',      label: 'Advertising',         count: 7  },
  { id: 'company',  label: 'News Aziendale',      count: 6  },
  { id: 'finance',  label: 'Finanza',             count: 3  },
];

export const articles: Article[] = [
  {
    id: '1',
    title: 'Amazon aumenta le tariffe FBA per il Q3 2025: impatto su margini e strategie',
    summary: 'Amazon ha annunciato un aumento delle tariffe FBA del 3-7% a partire da luglio 2025. Le categorie più colpite sono abbigliamento, calzature e articoli di grandi dimensioni. I seller devono aggiornare i calcoli di margine prima della stagione estiva.',
    category: 'FBA & Logistica',
    tags: ['FBA', 'tariffe', 'Q3 2025', 'margini'],
    source: 'Helium 10 Blog',
    publishedAt: '2025-04-24T08:30:00Z',
    isFeatured: true,
    slug: 'amazon-tariffe-fba-q3-2025',
  },
  {
    id: '2',
    title: 'Nuova policy Amazon sui prodotti chimici: requisiti di conformità aggiornati',
    summary: 'Amazon aggiorna le linee guida per la vendita di prodotti chimici domestici. I seller hanno 60 giorni per adeguare le schede prodotto e fornire la documentazione SDS aggiornata.',
    category: 'Policy & Regolamenti',
    tags: ['policy', 'compliance', 'prodotti chimici'],
    source: 'Seller Central',
    publishedAt: '2025-04-23T14:00:00Z',
    isFeatured: false,
    slug: 'policy-prodotti-chimici-2025',
  },
  {
    id: '3',
    title: 'Helium 10 lancia Cerebro 3.0: reverse ASIN con AI integrata',
    summary: 'Il nuovo Cerebro 3.0 integra intelligenza artificiale per identificare keyword ad alto potenziale e suggerire ottimizzazioni al listing in tempo reale. Disponibile da oggi per i piani Diamond e Platinum.',
    category: 'Strumenti Seller',
    tags: ['Helium 10', 'keyword research', 'AI', 'tool'],
    source: 'Helium 10 Blog',
    publishedAt: '2025-04-23T10:15:00Z',
    isFeatured: false,
    slug: 'helium10-cerebro-3-ai',
  },
  {
    id: '4',
    title: 'Amazon Advertising: nuovi formati Sponsored Brand Video per dispositivi mobile',
    summary: 'Amazon introduce video ads verticali ottimizzati per mobile nelle pagine di ricerca. I brand possono ora caricare video fino a 30 secondi con CTA diretta alla brand store o al dettaglio prodotto.',
    category: 'Advertising',
    tags: ['Sponsored Brand', 'video ads', 'mobile', 'advertising'],
    source: 'Tinuiti Blog',
    publishedAt: '2025-04-22T16:45:00Z',
    isFeatured: false,
    slug: 'amazon-ads-video-mobile-2025',
  },
  {
    id: '5',
    title: 'Amazon apre un nuovo fulfillment center a Milano: 2000 nuovi posti di lavoro',
    summary: "Amazon annuncia l'apertura di un nuovo centro di distribuzione nell'area metropolitana di Milano entro il Q4 2025. L'investimento da 150 milioni di euro punta a ridurre i tempi di consegna nel nord Italia.",
    category: 'News Aziendale',
    tags: ['Amazon', 'fulfillment', 'Milano', 'espansione'],
    source: 'About Amazon',
    publishedAt: '2025-04-22T09:00:00Z',
    isFeatured: false,
    slug: 'amazon-fulfillment-center-milano',
  },
  {
    id: '6',
    title: 'IVA sulle vendite Amazon: guida aggiornata per seller italiani 2025',
    summary: 'Con le nuove normative OSS (One Stop Shop), i seller italiani devono riconsiderare la gestione IVA sulle vendite cross-border. La guida completa con esempi pratici e scadenze fiscali.',
    category: 'Finanza & Tasse',
    tags: ['IVA', 'fiscalità', 'OSS', 'cross-border'],
    source: 'Payability Blog',
    publishedAt: '2025-04-21T11:30:00Z',
    isFeatured: false,
    slug: 'iva-vendite-amazon-guida-2025',
  },
  {
    id: '7',
    title: 'Reddit AMA con top seller: le strategie vincenti per il Prime Day 2025',
    summary: "Sessione di domande e risposte con seller da oltre 2M€ annui condividono le loro strategie per massimizzare le vendite durante il Prime Day. Focus su stock management, PPC e lightning deals.",
    category: 'Community',
    tags: ['Prime Day', 'strategia', 'PPC', 'community'],
    source: 'r/FulfillmentByAmazon',
    publishedAt: '2025-04-21T19:00:00Z',
    isFeatured: false,
    slug: 'ama-top-seller-prime-day-2025',
  },
  {
    id: '8',
    title: 'Marketplace Pulse: Amazon supera i 2 milioni di seller attivi in Europa',
    summary: 'Il marketplace europeo di Amazon raggiunge un nuovo record con oltre 2 milioni di seller attivi. Italia e Spagna sono i mercati con la crescita più rapida, con un +34% YoY nel numero di nuovi account.',
    category: 'News Aziendale',
    tags: ['marketplace', 'Europa', 'crescita', 'statistiche'],
    source: 'Marketplace Pulse',
    publishedAt: '2025-04-20T13:00:00Z',
    isFeatured: false,
    slug: 'amazon-2-milioni-seller-europa',
  },
];

export const feeds = [
  { name: 'Helium 10', status: 'online' },
  { name: 'Jungle Scout', status: 'online' },
  { name: 'Marketplace Pulse', status: 'online' },
  { name: 'ChannelX', status: 'online' },
  { name: 'Amazon Press', status: 'online' },
  { name: 'About Amazon', status: 'online' },
  { name: 'Tinuiti', status: 'online' },
  { name: 'Reddit FBA', status: 'warning' },
  { name: 'Reddit Seller', status: 'warning' },
];

export function formatDate(iso: string): string {
  const d = new Date(iso);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const hh = String(d.getHours()).padStart(2, '0');
  const min = String(d.getMinutes()).padStart(2, '0');
  return `${yyyy}.${mm}.${dd} — ${hh}:${min}`;
}
