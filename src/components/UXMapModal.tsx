"use client";

import { useState } from "react";

type NodeId = "rss-amazon" | "rss-macro" | "apify" | "claude-ai" | "supabase" | "frontend" | "tab-amazon" | "tab-macro";

const NODE_INFO: Record<NodeId, { title: string; color: string; detail: string[] }> = {
  "rss-amazon": {
    title: "RSS — Mondo Amazon",
    color: "#FF6600",
    detail: [
      "Jungle Scout Blog",
      "Seller Central Announcements",
      "Amazon Seller Blog",
      "FBA Mastery",
      "Helium 10 Blog",
      "eCommerceBytes",
      "Feedvisor Blog",
      "Marketplace Pulse",
      "The Seller's Edge",
    ],
  },
  "rss-macro": {
    title: "RSS — Macro & Geopolitica",
    color: "#00BFFF",
    detail: [
      "Reuters Business",
      "Bloomberg Markets",
      "Financial Times",
      "Wall Street Journal",
      "TechCrunch",
      "The Verge",
      "Politico",
    ],
  },
  apify: {
    title: "Apify Scraper",
    color: "#FF8C00",
    detail: [
      "Scheduler: ogni 6 ore",
      "Legge tutti i feed RSS",
      "Estrae titolo + contenuto",
      "Filtra duplicati",
      "Passa dati a Claude AI",
    ],
  },
  "claude-ai": {
    title: "Claude AI (Anthropic)",
    color: "#A855F7",
    detail: [
      "Riassume in italiano",
      "Assegna tab: amazon / macro",
      "Categorizza l'articolo",
      "Genera tags rilevanti",
      "Output JSON strutturato",
    ],
  },
  supabase: {
    title: "Supabase (PostgreSQL)",
    color: "#3ECF8E",
    detail: [
      "Tabella: articles",
      "Tabella: sources",
      "Campo: tab (amazon|macro)",
      "Indice su tab + published_at",
      "API REST auto-generata",
    ],
  },
  frontend: {
    title: "Next.js Frontend",
    color: "#FFFFFF",
    detail: [
      "Static export → GitHub Pages",
      "Sidebar con categorie dinamiche",
      "StatusBar con ticker live",
      "Onboarding guidato",
      "Mappa sistema (questa!)",
    ],
  },
  "tab-amazon": {
    title: "Tab — Mondo Amazon",
    color: "#FF6600",
    detail: [
      "FBA & Logistica",
      "Policy & Regolamenti",
      "Strumenti Seller",
      "Advertising",
      "Community",
    ],
  },
  "tab-macro": {
    title: "Tab — Impatto su Amazon",
    color: "#00BFFF",
    detail: [
      "Finanza & Mercati",
      "Politica & Leggi",
      "Big Tech",
      "Macro Economia",
    ],
  },
};

export default function UXMapModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [hovered, setHovered] = useState<NodeId | null>(null);

  if (!open) return null;

  const active = hovered ? NODE_INFO[hovered] : null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9500,
        background: "rgba(0,0,0,0.92)",
        backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px",
      }}
    >
      {/* Modal container */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%", maxWidth: 1000,
          background: "#080808",
          border: "1px solid rgba(255,102,0,0.35)",
          boxShadow: "0 0 60px rgba(255,102,0,0.12)",
          clipPath: "polygon(0 20px, 20px 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0 calc(100% - 20px))",
          display: "flex", flexDirection: "column",
        }}
      >
        {/* Header */}
        <div style={{
          padding: "18px 28px 16px",
          borderBottom: "1px solid rgba(255,102,0,0.2)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <polygon points="8,1 14,4 14,12 8,15 2,12 2,4" stroke="#FF6600" strokeWidth="1.2" fill="none" />
              <polygon points="8,5 11,7 11,10 8,12 5,10 5,7" fill="#FF6600" opacity="0.4" />
            </svg>
            <span style={{ color: "rgba(255,102,0,0.7)", fontSize: 9, letterSpacing: "0.2em" }}>
              // ARCHITETTURA SISTEMA — AMAZON BULLETIN
            </span>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "transparent", border: "none",
              color: "rgba(255,255,255,0.3)", fontSize: 14,
              cursor: "pointer", fontFamily: "inherit",
            }}
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
          {/* Diagram area */}
          <div style={{ flex: 1, padding: "28px 24px", position: "relative", overflow: "auto" }}>
            {/* SVG arrows */}
            <svg
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", overflow: "visible" }}
              viewBox="0 0 720 380"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <marker id="arr-orange" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L8,3 z" fill="#FF6600" opacity="0.6" />
                </marker>
                <marker id="arr-blue" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L8,3 z" fill="#00BFFF" opacity="0.6" />
                </marker>
                <marker id="arr-purple" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L8,3 z" fill="#A855F7" opacity="0.6" />
                </marker>
                <marker id="arr-green" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L8,3 z" fill="#3ECF8E" opacity="0.6" />
                </marker>
                <marker id="arr-white" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L8,3 z" fill="rgba(255,255,255,0.4)" />
                </marker>
              </defs>

              {/* RSS Amazon → Apify */}
              <path d="M 148,100 L 240,150" stroke="#FF6600" strokeWidth="1" strokeDasharray="4,3" opacity="0.5" markerEnd="url(#arr-orange)" />
              {/* RSS Macro → Apify */}
              <path d="M 148,220 L 240,170" stroke="#00BFFF" strokeWidth="1" strokeDasharray="4,3" opacity="0.5" markerEnd="url(#arr-blue)" />
              {/* Apify → Claude */}
              <path d="M 330,160 L 380,160" stroke="#FF8C00" strokeWidth="1.2" strokeDasharray="5,3" opacity="0.6" markerEnd="url(#arr-orange)" />
              {/* Claude → Supabase */}
              <path d="M 470,160 L 520,160" stroke="#A855F7" strokeWidth="1.2" strokeDasharray="5,3" opacity="0.6" markerEnd="url(#arr-purple)" />
              {/* Supabase → Frontend */}
              <path d="M 610,160 L 630,160" stroke="#3ECF8E" strokeWidth="1.2" strokeDasharray="5,3" opacity="0.6" markerEnd="url(#arr-green)" />
              {/* Frontend → Tab Amazon */}
              <path d="M 660,140 Q 660,95 630,95" stroke="#FF6600" strokeWidth="1" opacity="0.5" markerEnd="url(#arr-orange)" />
              {/* Frontend → Tab Macro */}
              <path d="M 660,180 Q 660,225 630,225" stroke="#00BFFF" strokeWidth="1" opacity="0.5" markerEnd="url(#arr-blue)" />

              {/* Flow labels */}
              <text x="186" y="118" fill="#FF6600" fontSize="7" opacity="0.6" letterSpacing="0.1em">RSS feed</text>
              <text x="186" y="198" fill="#00BFFF" fontSize="7" opacity="0.6" letterSpacing="0.1em">RSS feed</text>
              <text x="340" y="153" fill="#FF8C00" fontSize="7" opacity="0.6" letterSpacing="0.1em">JSON</text>
              <text x="480" y="153" fill="#A855F7" fontSize="7" opacity="0.6" letterSpacing="0.1em">AI out</text>
              <text x="614" y="153" fill="#3ECF8E" fontSize="7" opacity="0.6" letterSpacing="0.1em">API</text>
            </svg>

            {/* Diagram nodes — positioned absolutely inside a 720×380 viewbox equivalent */}
            <div style={{ position: "relative", width: 720, height: 380, margin: "0 auto" }}>
              <MapNode id="rss-amazon" x={10}  y={60}  label="RSS AMAZON" sub="9 feed" color="#FF6600" hovered={hovered} onHover={setHovered} />
              <MapNode id="rss-macro"  x={10}  y={180} label="RSS MACRO"  sub="7 feed" color="#00BFFF" hovered={hovered} onHover={setHovered} />
              <MapNode id="apify"      x={238} y={120} label="APIFY"       sub="ogni 6h" color="#FF8C00" hovered={hovered} onHover={setHovered} />
              <MapNode id="claude-ai"  x={378} y={120} label="CLAUDE AI"  sub="classify" color="#A855F7" hovered={hovered} onHover={setHovered} />
              <MapNode id="supabase"   x={518} y={120} label="SUPABASE"   sub="postgres" color="#3ECF8E" hovered={hovered} onHover={setHovered} />
              <MapNode id="frontend"   x={628} y={120} label="NEXT.JS"    sub="frontend" color="#FFFFFF" hovered={hovered} onHover={setHovered} wide />
              <MapNode id="tab-amazon" x={578} y={42}  label="TAB AMAZON" sub="orange" color="#FF6600" hovered={hovered} onHover={setHovered} small />
              <MapNode id="tab-macro"  x={578} y={188} label="TAB MACRO"  sub="blue"   color="#00BFFF" hovered={hovered} onHover={setHovered} small />

              {/* Step labels below nodes */}
              <StepLabel x={10}  y={165} text="① FONTI" color="rgba(255,255,255,0.2)" />
              <StepLabel x={238} y={205} text="② SCRAPER" color="rgba(255,255,255,0.2)" />
              <StepLabel x={378} y={205} text="③ AI" color="rgba(255,255,255,0.2)" />
              <StepLabel x={518} y={205} text="④ DATABASE" color="rgba(255,255,255,0.2)" />
              <StepLabel x={628} y={205} text="⑤ UI" color="rgba(255,255,255,0.2)" />
            </div>

            {/* Legend */}
            <div style={{ display: "flex", gap: 24, marginTop: 12, paddingTop: 12, borderTop: "1px solid rgba(255,102,0,0.12)" }}>
              <LegendItem color="#FF6600" label="Mondo Amazon" />
              <LegendItem color="#00BFFF" label="Impatto su Amazon" />
              <LegendItem color="#A855F7" label="AI Processing" />
              <LegendItem color="#3ECF8E" label="Storage" />
              <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 9, letterSpacing: "0.1em" }}>HOVER SUI BLOCCHI PER I DETTAGLI</span>
              </div>
            </div>
          </div>

          {/* Detail panel */}
          <div
            style={{
              width: 220, borderLeft: "1px solid rgba(255,102,0,0.15)",
              padding: "24px 20px", display: "flex", flexDirection: "column", gap: 12,
              background: "rgba(255,102,0,0.02)",
            }}
          >
            {active ? (
              <>
                <div style={{ color: active.color, fontSize: 10, letterSpacing: "0.15em", fontWeight: 700 }}>
                  {active.title}
                </div>
                <div style={{ height: 1, background: `linear-gradient(90deg, ${active.color}40, transparent)` }} />
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {active.detail.map((d, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                      <span style={{ color: active.color, fontSize: 9, marginTop: 1, flexShrink: 0 }}>▸</span>
                      <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 9, letterSpacing: "0.06em", lineHeight: 1.5 }}>
                        {d}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div style={{ color: "rgba(255,255,255,0.15)", fontSize: 9, letterSpacing: "0.12em", lineHeight: 1.8 }}>
                // Seleziona un blocco per vedere i dettagli del componente
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function MapNode({
  id, x, y, label, sub, color, hovered, onHover, wide, small,
}: {
  id: NodeId; x: number; y: number; label: string; sub: string; color: string;
  hovered: NodeId | null; onHover: (id: NodeId | null) => void;
  wide?: boolean; small?: boolean;
}) {
  const isHovered = hovered === id;
  const w = small ? 88 : wide ? 86 : 86;
  const h = small ? 36 : 52;

  return (
    <div
      onMouseEnter={() => onHover(id)}
      onMouseLeave={() => onHover(null)}
      style={{
        position: "absolute",
        left: x, top: y,
        width: w, height: h,
        border: `1px solid ${isHovered ? color : color + "55"}`,
        background: isHovered ? `${color}18` : `${color}08`,
        boxShadow: isHovered ? `0 0 16px ${color}40, inset 0 0 12px ${color}10` : "none",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        cursor: "pointer",
        transition: "all 0.18s ease",
        clipPath: "polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)",
        userSelect: "none",
      }}
    >
      <span style={{
        color: isHovered ? color : `${color}CC`,
        fontSize: small ? 8 : 9, fontWeight: 700,
        letterSpacing: "0.12em",
        textShadow: isHovered ? `0 0 8px ${color}` : "none",
        transition: "all 0.18s ease",
      }}>
        {label}
      </span>
      {!small && (
        <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 8, letterSpacing: "0.1em", marginTop: 3 }}>
          {sub}
        </span>
      )}
    </div>
  );
}

function StepLabel({ x, y, text, color }: { x: number; y: number; text: string; color: string }) {
  return (
    <div
      style={{
        position: "absolute", left: x, top: y,
        fontSize: 8, letterSpacing: "0.12em", color,
        width: 86, textAlign: "center",
      }}
    >
      {text}
    </div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <div style={{ width: 8, height: 8, background: color, opacity: 0.7 }} />
      <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 9, letterSpacing: "0.08em" }}>{label}</span>
    </div>
  );
}
