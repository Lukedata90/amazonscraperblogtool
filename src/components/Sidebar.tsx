"use client";

import { amazonCategories, macroCategories, amazonFeeds, macroFeeds } from "@/lib/mock-data";

type Props = {
  activeTab: "amazon" | "macro";
  activeCategory: string;
  onCategoryChange: (id: string) => void;
  accentColor: string;
  onOpenMap: () => void;
};

export default function Sidebar({ activeTab, activeCategory, onCategoryChange, accentColor, onOpenMap }: Props) {
  const categories = activeTab === "amazon" ? amazonCategories : macroCategories;
  const feeds      = activeTab === "amazon" ? amazonFeeds      : macroFeeds;

  const dim    = `${accentColor}66`;
  const dimmer = `${accentColor}33`;

  return (
    <aside
      className="flex flex-col shrink-0 overflow-y-auto border-r"
      style={{ width: 220, borderColor: `${accentColor}40`, background: "rgba(8,8,8,0.98)" }}
    >
      {/* Logo block */}
      <div className="flex flex-col items-start px-5 py-5 border-b" style={{ borderColor: dimmer }}>
        <div className="flex items-center gap-2 mb-1">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <polygon points="9,1 16,5 16,13 9,17 2,13 2,5" stroke={accentColor} strokeWidth="1.5" fill="none" />
            <polygon points="9,5 13,7 13,11 9,13 5,11 5,7" fill={accentColor} opacity="0.3" />
          </svg>
          <span className="font-bold" style={{ color: accentColor, fontSize: 13, letterSpacing: "0.12em", textShadow: `0 0 8px ${accentColor}` }}>
            AMAZON
          </span>
        </div>
        <span className="font-bold" style={{ color: "#fff", fontSize: 18, letterSpacing: "0.2em", lineHeight: 1, textTransform: "uppercase" }}>
          BULLETIN
        </span>
        <span className="mt-2" style={{ color: dim, fontSize: 9, letterSpacing: "0.15em" }}>
          INTELLIGENCE FEED
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col px-2 pt-4 pb-2">
        <SectionLabel color={dim}>// Categoria</SectionLabel>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className="relative flex items-center justify-between px-3 py-2 text-left transition-all"
            style={{
              fontFamily:   "inherit",
              fontSize:     10,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color:         activeCategory === cat.id ? accentColor : "rgba(255,255,255,0.4)",
              textShadow:    activeCategory === cat.id ? `0 0 8px ${accentColor}80` : "none",
              background:    activeCategory === cat.id ? `${accentColor}0F` : "transparent",
              borderLeft:    activeCategory === cat.id ? `2px solid ${accentColor}` : "2px solid transparent",
              cursor:        "pointer",
            }}
          >
            <span>{cat.label}</span>
            <span style={{ fontSize: 9, color: activeCategory === cat.id ? accentColor : "rgba(255,255,255,0.2)" }}>
              {cat.count}
            </span>
          </button>
        ))}
      </nav>

      <div className="hud-divider mx-4 my-2" style={{ background: `linear-gradient(90deg, transparent, ${accentColor}66, transparent)` }} />

      {/* System stats */}
      <div className="px-4 py-3">
        <SectionLabel color={dim}>// Sistema</SectionLabel>
        <div className="flex flex-col gap-2 mt-2">
          <StatRow label="LAST SYNC"   value="04:30 fa" color={accentColor} />
          <StatRow label="ARTICOLI/GG" value={activeTab === "amazon" ? "12" : "6"} color={accentColor} />
          <StatRow label="IN CODA"     value="0" color={accentColor} />
        </div>
      </div>

      <div className="hud-divider mx-4 my-2" style={{ background: `linear-gradient(90deg, transparent, ${accentColor}66, transparent)` }} />

      {/* Feed list */}
      <div className="px-4 py-3 flex-1">
        <SectionLabel color={dim}>// Feed RSS</SectionLabel>
        <div className="flex flex-col gap-1 mt-2">
          {feeds.map((f) => (
            <div key={f.name} className="flex items-center justify-between py-1">
              <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 9, letterSpacing: "0.08em" }}>
                {f.name.toUpperCase()}
              </span>
              <div
                style={{
                  width: 5, height: 5, borderRadius: "50%",
                  background:  f.status === "online" ? "#00FF88" : "#FF8C00",
                  boxShadow:   f.status === "online" ? "0 0 4px #00FF88" : "0 0 4px #FF8C00",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="px-4 py-3 border-t flex flex-col gap-2" style={{ borderColor: dimmer }}>
        <button
          className="w-full hud-sm text-center py-2 transition-all"
          style={{ fontSize: 9, letterSpacing: "0.15em", color: accentColor, fontFamily: "inherit", textTransform: "uppercase", cursor: "pointer", background: "transparent" }}
        >
          ▶ RUN INGEST
        </button>
        <button
          onClick={onOpenMap}
          className="w-full text-center py-2 transition-all"
          style={{
            fontSize: 9, letterSpacing: "0.15em",
            color: "rgba(255,255,255,0.35)",
            fontFamily: "inherit", textTransform: "uppercase",
            cursor: "pointer", background: "transparent",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = accentColor; (e.currentTarget as HTMLButtonElement).style.borderColor = `${accentColor}50`; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.35)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
        >
          ⬡ MAPPA SISTEMA
        </button>
      </div>
    </aside>
  );
}

function SectionLabel({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <div className="mb-1" style={{ color, fontSize: 9, letterSpacing: "0.15em" }}>
      {children}
    </div>
  );
}

function StatRow({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="flex justify-between items-center">
      <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 9, letterSpacing: "0.1em" }}>{label}</span>
      <span style={{ color, fontSize: 9, fontWeight: 700 }}>{value}</span>
    </div>
  );
}
