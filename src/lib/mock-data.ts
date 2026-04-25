export type Article = {
  id: string;
  title: string;
  summary: string;
  category: string;
  tab: "amazon" | "macro";
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

export const amazonCategories: Category[] = [
  { id: 'all',      label: 'Tutti',            count: 47 },
  { id: 'fba',      label: 'FBA & Logistica',  count: 12 },
  { id: 'policy',   label: 'Policy',           count: 8  },
  { id: 'tools',    label: 'Strumenti Seller', count: 11 },
  { id: 'ads',      label: 'Advertising',      count: 7  },
  { id: 'company',  label: 'News Aziendale',   count: 6  },
  { id: 'finance',  label: 'Finanza',          count: 3  },
];

export const macroCategories: Category[] = [
  { id: 'all',      label: 'Tutti',              count: 18 },
  { id: 'markets',  label: 'Finanza & Mercati',  count: 6  },
  { id: 'politics', label: 'Politica & Leggi',   count: 5  },
  { id: 'bigtech',  label: 'Big Tech',           count: 4  },
  { id: 'macro',    label: 'Macro Economia',     count: 3  },
];

export const categories = amazonCategories;

export const articles: Article[] = [
  // ── TAB: MONDO AMAZON ──────────────────────────────────────────────
  {
    id: '1',
    tab: 'amazon',
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
    tab: 'amazon',
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
    tab: 'amazon',
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
    tab: 'amazon',
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
    tab: 'amazon',
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
    tab: 'amazon',
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
    tab: 'amazon',
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
    tab: 'amazon',
    title: 'Marketplace Pulse: Amazon supera i 2 milioni di seller attivi in Europa',
    summary: 'Il marketplace europeo di Amazon raggiunge un nuovo record con oltre 2 milioni di seller attivi. Italia e Spagna sono i mercati con la crescita più rapida, con un +34% YoY nel numero di nuovi account.',
    category: 'News Aziendale',
    tags: ['marketplace', 'Europa', 'crescita', 'statistiche'],
    source: 'Marketplace Pulse',
    publishedAt: '2025-04-20T13:00:00Z',
    isFeatured: false,
    slug: 'amazon-2-milioni-seller-europa',
  },

  // ── TAB: IMPATTO SU AMAZON ─────────────────────────────────────────
  {
    id: '9',
    tab: 'macro',
    title: 'Dazi USA-Cina al 145%: l\'e-commerce rischia una crisi delle forniture globali',
    summary: 'La nuova tornata di dazi imposta dall\'amministrazione americana sulle merci cinesi porta il livello medio al 145%. Per Amazon e i suoi seller, che dipendono massicciamente dalla Cina per produzione e sourcing, lo scenario è critico: margini compressi, prezzi in aumento e potenziale calo della domanda consumer.',
    category: 'Politica & Leggi',
    tags: ['dazi', 'Cina', 'USA', 'supply chain', 'e-commerce'],
    source: 'Reuters',
    publishedAt: '2025-04-24T07:00:00Z',
    isFeatured: true,
    slug: 'dazi-usa-cina-145-ecommerce',
  },
  {
    id: '10',
    tab: 'macro',
    title: 'Fed mantiene i tassi: inflazione persistente frena i consumi online',
    summary: 'La Federal Reserve conferma il tasso al 5.25-5.5% per il sesto trimestre consecutivo. Con l\'inflazione core ancora sopra il 3%, il potere d\'acquisto dei consumatori americani rimane sotto pressione. Amazon potrebbe vedere un rallentamento nella crescita del GMV nel segmento non-essential goods.',
    category: 'Finanza & Mercati',
    tags: ['Fed', 'tassi', 'inflazione', 'consumi', 'GMV'],
    source: 'Bloomberg',
    publishedAt: '2025-04-23T18:00:00Z',
    isFeatured: false,
    slug: 'fed-tassi-inflazione-consumi-amazon',
  },
  {
    id: '11',
    tab: 'macro',
    title: 'UE approva il Digital Markets Act: Amazon Marketplace sotto esame antitrust',
    summary: 'La Commissione Europea ha avviato un\'indagine formale su Amazon nell\'ambito del DMA. Le accuse riguardano l\'uso di dati di terze parti per favorire i propri prodotti e pratiche di self-preferencing. Potenziali sanzioni fino al 10% del fatturato globale e obbligo di apertura del marketplace a condizioni paritarie.',
    category: 'Politica & Leggi',
    tags: ['DMA', 'antitrust', 'UE', 'regolamentazione', 'marketplace'],
    source: 'Financial Times',
    publishedAt: '2025-04-22T11:30:00Z',
    isFeatured: false,
    slug: 'ue-dma-amazon-antitrust-2025',
  },
  {
    id: '12',
    tab: 'macro',
    title: 'Microsoft e Google tagliano i budget cloud: AWS potrebbe beneficiarne',
    summary: 'Le recenti ristrutturazioni annunciate da Microsoft Azure e Google Cloud apriranno spazio competitivo ad AWS. Gli analisti di Morgan Stanley stimano che Amazon Web Services potrebbe acquisire 3-5 punti percentuali di quota di mercato entro fine 2025, con impatto positivo diretto sugli utili del gruppo.',
    category: 'Big Tech',
    tags: ['AWS', 'cloud', 'Microsoft', 'Google', 'competizione'],
    source: 'The Information',
    publishedAt: '2025-04-21T14:00:00Z',
    isFeatured: false,
    slug: 'aws-cloud-microsoft-google-quota',
  },
  {
    id: '13',
    tab: 'macro',
    title: 'Recessione tecnica in Germania: rallenta il mercato e-commerce europeo',
    summary: 'La Germania è entrata ufficialmente in recessione tecnica con due trimestri consecutivi di PIL negativo. Essendo il secondo mercato Amazon in Europa, il rallentamento dell\'economia tedesca potrebbe pesare sui ricavi retail Q2-Q3 2025. Gli analisti abbassano le stime di crescita per Amazon.de del 4%.',
    category: 'Macro Economia',
    tags: ['Germania', 'recessione', 'Europa', 'PIL', 'retail'],
    source: 'Wall Street Journal',
    publishedAt: '2025-04-20T09:00:00Z',
    isFeatured: false,
    slug: 'recessione-germania-amazon-europa',
  },
  {
    id: '14',
    tab: 'macro',
    title: 'OpenAI lancia shopping AI: minaccia diretta al motore di ricerca di Amazon',
    summary: 'OpenAI ha annunciato funzionalità di shopping integrato in ChatGPT, permettendo agli utenti di cercare e acquistare prodotti direttamente tramite AI. Questa mossa compete frontalmente con Amazon come punto di partenza per la ricerca di prodotti, dove oggi il 54% delle ricerche parte direttamente su Amazon.',
    category: 'Big Tech',
    tags: ['OpenAI', 'AI shopping', 'ricerca prodotti', 'competizione'],
    source: 'TechCrunch',
    publishedAt: '2025-04-19T16:00:00Z',
    isFeatured: false,
    slug: 'openai-shopping-ai-vs-amazon',
  },
];

export const amazonFeeds = [
  { name: 'Helium 10',         status: 'online'  },
  { name: 'Jungle Scout',      status: 'online'  },
  { name: 'Marketplace Pulse', status: 'online'  },
  { name: 'ChannelX',          status: 'online'  },
  { name: 'Amazon Press',      status: 'online'  },
  { name: 'About Amazon',      status: 'online'  },
  { name: 'Tinuiti',           status: 'online'  },
  { name: 'Reddit FBA',        status: 'warning' },
  { name: 'Reddit Seller',     status: 'warning' },
];

export const macroFeeds = [
  { name: 'Reuters',           status: 'online'  },
  { name: 'Bloomberg',         status: 'online'  },
  { name: 'Financial Times',   status: 'online'  },
  { name: 'Wall Street Jnl',   status: 'online'  },
  { name: 'TechCrunch',        status: 'online'  },
  { name: 'The Verge',         status: 'online'  },
  { name: 'Politico',          status: 'warning' },
];

export const feeds = amazonFeeds;

export function formatDate(iso: string): string {
  const d = new Date(iso);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const hh = String(d.getHours()).padStart(2, '0');
  const min = String(d.getMinutes()).padStart(2, '0');
  return `${yyyy}.${mm}.${dd} — ${hh}:${min}`;
}
