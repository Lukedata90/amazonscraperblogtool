"use client";

import { useState } from "react";
import StatusBar from "@/components/StatusBar";
import Sidebar from "@/components/Sidebar";
import ArticleCard from "@/components/ArticleCard";
import OnboardingModal from "@/components/OnboardingModal";
import UXMapModal from "@/components/UXMapModal";
import { articles } from "@/lib/mock-data";

type Tab = "amazon" | "macro";

const TAB_CONFIG: Record<Tab, { label: string; sub: string; color: string }> = {
  amazon: {
    label: "MONDO AMAZON",
    sub: "Seller, FBA, Policy, Tools",
    color: "#FF6600",
  },
  macro: {
    label: "IMPATTO SU AMAZON",
    sub: "Finanza, Politica, Big Tech, Macro",
    color: "#00BFFF",
  },
};

const CATEGORY_MAP: Record<Tab, Record<string, string>> = {
  amazon: {
    fba:     "FBA & Logistica",
    policy:  "Policy & Regolamenti",
    tools:   "Strumenti Seller",
    ads:     "Advertising",
    company: "News Aziendale",
    finance: "Finanza & Tasse",
    community: "Community",
  },
  macro: {
    markets:  "Finanza & Mercati",
    politics: "Politica & Leggi",
    bigtech:  "Big Tech",
    macro:    "Macro Economia",
  },
};

export default function Home() {
  const [activeTab, setActiveTab]           = useState<Tab>("amazon");
  const [activeCategory, setActiveCategory] = useState("all");
  const [uxMapOpen, setUxMapOpen]           = useState(false);

  const tabArticles = articles.filter((a) => a.tab === activeTab);
  const featured    = tabArticles.find((a) => a.isFeatured);

  const filtered = tabArticles.filter((a) => {
    if (activeCategory === "all") return true;
    const map = CATEGORY_MAP[activeTab];
    return a.category === map[activeCategory];
  });

  const grid = filtered.filter((a) => !a.isFeatured || activeCategory !== "all");

  const accentColor = TAB_CONFIG[activeTab].color;

  function handleTabChange(tab: Tab) {
    setActiveTab(tab);
    setActiveCategory("all");
  }

  return (
    <div className="flex flex-col h-screen bg-black dot-grid">
      <OnboardingModal />
      <UXMapModal open={uxMapOpen} onClose={() => setUxMapOpen(false)} />
      <StatusBar activeTab={activeTab} />

      {/* Tab switcher */}
      <div
        className="flex shrink-0 border-b"
        style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(0,0,0,0.95)" }}
      >
        {(["amazon", "macro"] as Tab[]).map((tab) => {
          const cfg     = TAB_CONFIG[tab];
          const isActive = tab === activeTab;
          return (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className="relative flex flex-col items-start px-8 py-3 transition-all"
              style={{
                fontFamily:  "inherit",
                cursor:      "pointer",
                background:  isActive ? `rgba(${tab === "amazon" ? "255,102,0" : "0,191,255"},0.06)` : "transparent",
                borderBottom: isActive ? `2px solid ${cfg.color}` : "2px solid transparent",
                marginBottom: -1,
              }}
            >
              <span
                style={{
                  fontSize:      10,
                  fontWeight:    700,
                  letterSpacing: "0.18em",
                  color:         isActive ? cfg.color : "rgba(255,255,255,0.3)",
                  textShadow:    isActive ? `0 0 10px ${cfg.color}60` : "none",
                  transition:    "all 0.2s",
                }}
              >
                {cfg.label}
              </span>
              <span style={{ fontSize: 9, color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em", marginTop: 1 }}>
                {cfg.sub}
              </span>
            </button>
          );
        })}

        {/* right-side count */}
        <div className="ml-auto flex items-center pr-6">
          <span style={{ color: "rgba(255,255,255,0.15)", fontSize: 9, letterSpacing: "0.1em" }}>
            {filtered.length} RISULTATI
          </span>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          activeTab={activeTab}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          accentColor={accentColor}
          onOpenMap={() => setUxMapOpen(true)}
        />

        {/* Main content */}
        <main className="flex-1 overflow-y-auto px-6 py-6">
          {/* Section header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="pulse-dot" style={{ background: accentColor, boxShadow: `0 0 6px ${accentColor}` }} />
              <span
                className="font-bold tracking-widest"
                style={{ color: accentColor, fontSize: 11, letterSpacing: "0.2em" }}
              >
                {activeTab === "amazon" ? "// AMAZON INTEL" : "// MACRO SIGNAL"}
              </span>
            </div>
            <div className="flex-1 hud-divider" />
          </div>

          {/* Featured article */}
          {featured && activeCategory === "all" && (
            <div className="mb-6">
              <ArticleCard article={featured} featured accentColor={accentColor} />
            </div>
          )}

          {/* Grid */}
          {grid.length > 0 ? (
            <div
              className="grid gap-4"
              style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}
            >
              {grid.map((article) => (
                <ArticleCard key={article.id} article={article} accentColor={accentColor} />
              ))}
            </div>
          ) : (
            <div
              className="flex flex-col items-center justify-center py-24"
              style={{ color: `${accentColor}50`, fontSize: 11, letterSpacing: "0.15em" }}
            >
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="mb-4 opacity-30">
                <polygon points="20,2 36,10 36,30 20,38 4,30 4,10" stroke={accentColor} strokeWidth="1.5" fill="none" />
              </svg>
              NO DATA AVAILABLE
            </div>
          )}

          {/* Bottom system info */}
          <div
            className="mt-10 flex items-center gap-4 pb-4"
            style={{ color: "rgba(255,255,255,0.1)", fontSize: 9, letterSpacing: "0.1em" }}
          >
            <span>AMAZON BULLETIN v1.0</span>
            <div className="flex-1 hud-divider" />
            <span>POWERED BY CLAUDE AI + APIFY + SUPABASE</span>
          </div>
        </main>

        {/* Right panel */}
        <aside
          className="flex flex-col shrink-0 border-l overflow-y-auto"
          style={{ width: 200, borderColor: `${accentColor}33`, background: "rgba(8,8,8,0.98)" }}
        >
          <div className="px-4 py-4 border-b" style={{ borderColor: `${accentColor}25` }}>
            <div className="mb-3" style={{ color: `${accentColor}66`, fontSize: 9, letterSpacing: "0.15em" }}>
              // STATISTICHE
            </div>
            <div className="flex flex-col gap-5">
              <BigStat label="ARTICOLI OGGI" value={String(tabArticles.length)} color={accentColor} />
              <BigStat label="FEED ATTIVI"   value={activeTab === "amazon" ? "9" : "7"} color={accentColor} />
              <BigStat label="CATEGORIE"     value={activeTab === "amazon" ? "7" : "4"} color={accentColor} />
              <BigStat label="FONTI"         value={activeTab === "amazon" ? "13" : "7"} color={accentColor} />
            </div>
          </div>

          {/* Category breakdown */}
          <div className="px-4 py-4">
            <div className="mb-3" style={{ color: `${accentColor}66`, fontSize: 9, letterSpacing: "0.15em" }}>
              // DISTRIBUZIONE
            </div>
            <div className="flex flex-col gap-2">
              {(activeTab === "amazon"
                ? [
                    { label: "FBA",     pct: 26 },
                    { label: "TOOLS",   pct: 23 },
                    { label: "POLICY",  pct: 17 },
                    { label: "ADS",     pct: 15 },
                    { label: "COMPANY", pct: 13 },
                    { label: "FINANCE", pct: 6  },
                  ]
                : [
                    { label: "FINANZA",  pct: 33 },
                    { label: "POLITICA", pct: 28 },
                    { label: "BIGTECH",  pct: 22 },
                    { label: "MACRO",    pct: 17 },
                  ]
              ).map((c) => (
                <div key={c.label}>
                  <div className="flex justify-between mb-1">
                    <span style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>{c.label}</span>
                    <span style={{ fontSize: 9, color: accentColor }}>{c.pct}%</span>
                  </div>
                  <div className="h-px" style={{ background: "rgba(255,255,255,0.08)" }}>
                    <div
                      className="h-full"
                      style={{
                        width: `${c.pct}%`,
                        background: `linear-gradient(90deg, ${accentColor}, ${accentColor}CC)`,
                        boxShadow: `0 0 4px ${accentColor}`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System log */}
          <div className="px-4 py-4 border-t mt-auto" style={{ borderColor: `${accentColor}25` }}>
            <div className="mb-3" style={{ color: `${accentColor}66`, fontSize: 9, letterSpacing: "0.15em" }}>
              // SYSTEM LOG
            </div>
            <div className="flex flex-col gap-2">
              {[
                { t: "04:30", msg: "Ingest OK — 12 art." },
                { t: "22:30", msg: "Ingest OK — 8 art."  },
                { t: "16:30", msg: "Ingest OK — 15 art." },
                { t: "10:30", msg: "Reddit timeout"       },
              ].map((log, i) => (
                <div key={i} className="flex gap-2">
                  <span style={{ color: `${accentColor}66`, fontSize: 8, whiteSpace: "nowrap" }}>{log.t}</span>
                  <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 8 }}>{log.msg}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function BigStat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div>
      <div style={{ fontSize: 28, fontWeight: 700, color, textShadow: `0 0 12px ${color}80`, lineHeight: 1 }}>
        {value}
      </div>
      <div style={{ color: "rgba(255,255,255,0.25)", fontSize: 8, letterSpacing: "0.15em", marginTop: 2 }}>
        {label}
      </div>
    </div>
  );
}
