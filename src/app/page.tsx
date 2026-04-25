"use client";

import { useState } from "react";
import StatusBar from "@/components/StatusBar";
import Sidebar from "@/components/Sidebar";
import ArticleCard from "@/components/ArticleCard";
import { articles } from "@/lib/mock-data";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("all");

  const featured = articles.find((a) => a.isFeatured);
  const filtered = articles.filter((a) => {
    if (activeCategory === "all") return true;
    const map: Record<string, string> = {
      fba:     "FBA & Logistica",
      policy:  "Policy & Regolamenti",
      tools:   "Strumenti Seller",
      ads:     "Advertising",
      company: "News Aziendale",
      finance: "Finanza & Tasse",
      community: "Community",
    };
    return a.category === map[activeCategory];
  });
  const grid = filtered.filter((a) => !a.isFeatured || activeCategory !== "all");

  return (
    <div className="flex flex-col h-screen bg-black dot-grid">
      <StatusBar />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Main content */}
        <main className="flex-1 overflow-y-auto px-6 py-6">
          {/* Section header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="pulse-dot" />
              <span
                className="font-bold tracking-widest"
                style={{ color: "#FF6600", fontSize: 11, letterSpacing: "0.2em" }}
              >
                // LATEST INTEL
              </span>
            </div>
            <div className="flex-1 hud-divider" />
            <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 9, letterSpacing: "0.1em" }}>
              {filtered.length} RISULTATI
            </span>
          </div>

          {/* Featured article */}
          {featured && activeCategory === "all" && (
            <div className="mb-6">
              <ArticleCard article={featured} featured />
            </div>
          )}

          {/* Grid */}
          {grid.length > 0 ? (
            <div
              className="grid gap-4"
              style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}
            >
              {grid.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div
              className="flex flex-col items-center justify-center py-24"
              style={{ color: "rgba(255,102,0,0.3)", fontSize: 11, letterSpacing: "0.15em" }}
            >
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="mb-4 opacity-30">
                <polygon
                  points="20,2 36,10 36,30 20,38 4,30 4,10"
                  stroke="#FF6600"
                  strokeWidth="1.5"
                  fill="none"
                />
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

        {/* Right panel — stats */}
        <aside
          className="flex flex-col shrink-0 border-l overflow-y-auto"
          style={{
            width: 200,
            borderColor: "rgba(255,102,0,0.2)",
            background: "rgba(8,8,8,0.98)",
          }}
        >
          <div
            className="px-4 py-4 border-b"
            style={{ borderColor: "rgba(255,102,0,0.15)" }}
          >
            <div
              className="mb-3"
              style={{ color: "rgba(255,102,0,0.4)", fontSize: 9, letterSpacing: "0.15em" }}
            >
              // STATISTICHE
            </div>
            <div className="flex flex-col gap-5">
              <BigStat label="ARTICOLI OGGI" value="12" />
              <BigStat label="FEED ATTIVI" value="9" />
              <BigStat label="CATEGORIE" value="7" />
              <BigStat label="FONTI" value="13" />
            </div>
          </div>

          {/* Category breakdown */}
          <div className="px-4 py-4">
            <div
              className="mb-3"
              style={{ color: "rgba(255,102,0,0.4)", fontSize: 9, letterSpacing: "0.15em" }}
            >
              // DISTRIBUZIONE
            </div>
            <div className="flex flex-col gap-2">
              {[
                { label: "FBA",     pct: 26 },
                { label: "TOOLS",   pct: 23 },
                { label: "POLICY",  pct: 17 },
                { label: "ADS",     pct: 15 },
                { label: "COMPANY", pct: 13 },
                { label: "FINANCE", pct: 6  },
              ].map((c) => (
                <div key={c.label}>
                  <div className="flex justify-between mb-1">
                    <span style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>
                      {c.label}
                    </span>
                    <span style={{ fontSize: 9, color: "#FF6600" }}>{c.pct}%</span>
                  </div>
                  <div className="h-px" style={{ background: "rgba(255,255,255,0.08)" }}>
                    <div
                      className="h-full"
                      style={{
                        width: `${c.pct}%`,
                        background: "linear-gradient(90deg, #FF6600, #FF8C00)",
                        boxShadow: "0 0 4px #FF6600",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System log */}
          <div
            className="px-4 py-4 border-t mt-auto"
            style={{ borderColor: "rgba(255,102,0,0.15)" }}
          >
            <div
              className="mb-3"
              style={{ color: "rgba(255,102,0,0.4)", fontSize: 9, letterSpacing: "0.15em" }}
            >
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
                  <span style={{ color: "rgba(255,102,0,0.4)", fontSize: 8, whiteSpace: "nowrap" }}>
                    {log.t}
                  </span>
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

function BigStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="stat-number">{value}</div>
      <div style={{ color: "rgba(255,255,255,0.25)", fontSize: 8, letterSpacing: "0.15em", marginTop: 2 }}>
        {label}
      </div>
    </div>
  );
}
