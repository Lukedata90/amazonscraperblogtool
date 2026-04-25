"use client";

import { articles } from "@/lib/mock-data";

const tickerItems = articles.map((a) => `◆  ${a.title.toUpperCase()}`).join("     ");

export default function StatusBar() {
  const now = new Date();
  const ts = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, "0")}.${String(now.getDate()).padStart(2, "0")}`;

  return (
    <header
      className="flex items-center border-b gap-4 px-4 shrink-0"
      style={{
        height: 44,
        borderColor: "rgba(255,102,0,0.35)",
        background: "rgba(0,0,0,0.95)",
      }}
    >
      {/* Logo / system id */}
      <div className="flex items-center gap-2 shrink-0">
        <div className="pulse-dot" />
        <span
          className="text-xs font-bold tracking-widest glow"
          style={{ color: "#FF6600", fontSize: 11 }}
        >
          AMAZON BULLETIN
        </span>
        <span
          className="text-xs"
          style={{ color: "rgba(255,255,255,0.2)", fontSize: 10 }}
        >
          v1.0
        </span>
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
        <div
          className="ticker-track"
          style={{ color: "rgba(255,255,255,0.4)", fontSize: 10, letterSpacing: "0.08em" }}
        >
          <span>{tickerItems}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span>{tickerItems}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </div>
      </div>

      {/* Divider */}
      <div className="h-4 w-px shrink-0" style={{ background: "rgba(255,102,0,0.3)" }} />

      {/* System stats */}
      <div className="flex items-center gap-4 shrink-0">
        <Stat label="FEEDS" value="9" />
        <Stat label="ARTICOLI" value={String(articles.length)} />
        <Stat label="DATA" value={ts} />
        <div className="flex items-center gap-1">
          <div className="pulse-dot-green" />
          <span style={{ color: "#00FF88", fontSize: 9, letterSpacing: "0.1em" }}>
            ONLINE
          </span>
        </div>
      </div>
    </header>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-1">
      <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 9, letterSpacing: "0.1em" }}>
        {label}:
      </span>
      <span style={{ color: "#FF6600", fontSize: 9, fontWeight: 700, letterSpacing: "0.05em" }}>
        {value}
      </span>
    </div>
  );
}
