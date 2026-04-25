"use client";

import { articles } from "@/lib/mock-data";

type Props = { activeTab: "amazon" | "macro" };

export default function StatusBar({ activeTab }: Props) {
  const tabArticles = articles.filter((a) => a.tab === activeTab);
  const tickerItems = tabArticles.map((a) => `◆  ${a.title.toUpperCase()}`).join("     ");
  const accentColor = activeTab === "amazon" ? "#FF6600" : "#00BFFF";
  const now = new Date();
  const ts = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, "0")}.${String(now.getDate()).padStart(2, "0")}`;

  return (
    <header
      className="flex items-center border-b gap-4 px-4 shrink-0"
      style={{ height: 44, borderColor: `${accentColor}59`, background: "rgba(0,0,0,0.95)" }}
    >
      {/* Logo / system id */}
      <div className="flex items-center gap-2 shrink-0">
        <div className="pulse-dot" style={{ background: accentColor, boxShadow: `0 0 6px ${accentColor}` }} />
        <span className="text-xs font-bold tracking-widest" style={{ color: accentColor, fontSize: 11, textShadow: `0 0 8px ${accentColor}` }}>
          AMAZON BULLETIN
        </span>
        <span className="text-xs" style={{ color: "rgba(255,255,255,0.2)", fontSize: 10 }}>v1.0</span>
      </div>

      {/* Divider */}
      <div className="h-4 w-px shrink-0" style={{ background: "rgba(255,102,0,0.3)" }} />

      {/* Scrolling ticker */}
      <div className="flex-1 overflow-hidden relative">
        {/* fade masks */}
        <div
          className="absolute left-0 top-0 bottom-0 w-8 z-10"
          style={{ background: "linear-gradient(90deg, black, transparent)" }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-8 z-10"
          style={{ background: "linear-gradient(270deg, black, transparent)" }}
        />
        <div className="ticker-track" style={{ color: "rgba(255,255,255,0.4)", fontSize: 10, letterSpacing: "0.08em" }}>
          <span>{tickerItems}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span>{tickerItems}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </div>
      </div>

      {/* Divider */}
      <div className="h-4 w-px shrink-0" style={{ background: "rgba(255,102,0,0.3)" }} />

      {/* System stats */}
      <div className="flex items-center gap-4 shrink-0">
        <Stat label="FEEDS"    value={activeTab === "amazon" ? "9" : "7"} color={accentColor} />
        <Stat label="ARTICOLI" value={String(tabArticles.length)} color={accentColor} />
        <Stat label="DATA"     value={ts} color={accentColor} />
        <div className="flex items-center gap-1">
          <div className="pulse-dot-green" />
          <span style={{ color: "#00FF88", fontSize: 9, letterSpacing: "0.1em" }}>
            ONLINE
          </span>
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={() => (window as Window & { bulletinLogout?: () => void }).bulletinLogout?.()}
        title="Esci"
        style={{
          background: "transparent", border: "none",
          color: "rgba(255,255,255,0.2)", fontSize: 9,
          letterSpacing: "0.1em", cursor: "pointer",
          fontFamily: "inherit", padding: "2px 6px",
          transition: "color 0.2s",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.color = "#FF6600"; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.2)"; }}
      >
        ⏻
      </button>
    </header>
  );
}

function Stat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="flex items-center gap-1">
      <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 9, letterSpacing: "0.1em" }}>{label}:</span>
      <span style={{ color, fontSize: 9, fontWeight: 700, letterSpacing: "0.05em" }}>{value}</span>
    </div>
  );
}
