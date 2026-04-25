"use client";

import { useState, useEffect, useCallback } from "react";
import { findUser, type AuthUser } from "@/lib/auth-users";

const STORAGE_KEY = "bulletin_auth";

type Props = { children: React.ReactNode };

export default function LoginGate({ children }: Props) {
  const [mounted, setMounted]   = useState(false);
  const [user, setUser]         = useState<AuthUser | null>(null);
  const [code, setCode]         = useState("");
  const [error, setError]       = useState(false);
  const [shaking, setShaking]   = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const found = findUser(saved);
      if (found) setUser(found);
    }
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
    setCode("");
    setError(false);
  }, []);

  // Expose logout globally so other components can call it
  useEffect(() => {
    (window as Window & { bulletinLogout?: () => void }).bulletinLogout = handleLogout;
  }, [handleLogout]);

  function attempt() {
    const found = findUser(code);
    if (found) {
      localStorage.setItem(STORAGE_KEY, code.trim().toLowerCase());
      setUser(found);
      setError(false);
    } else {
      setError(true);
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
    }
  }

  if (!mounted) return null;
  if (user) return <>{children}</>;

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 99999,
        background: "#000",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        fontFamily: "var(--font-space-mono), monospace",
      }}
    >
      {/* Scanlines */}
      <div
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px)",
        }}
      />

      {/* Dot grid */}
      <div
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(circle, rgba(255,102,0,0.10) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Card */}
      <div
        style={{
          width: 420, position: "relative", zIndex: 1,
          background: "#080808",
          border: "1px solid rgba(255,102,0,0.4)",
          boxShadow: "0 0 60px rgba(255,102,0,0.12), 0 0 120px rgba(255,102,0,0.05)",
          clipPath: "polygon(0 20px, 20px 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0 calc(100% - 20px))",
          animation: shaking ? "shake 0.4s ease" : "none",
        }}
      >
        <style>{`
          @keyframes shake {
            0%,100%{transform:translateX(0)}
            20%{transform:translateX(-8px)}
            40%{transform:translateX(8px)}
            60%{transform:translateX(-5px)}
            80%{transform:translateX(5px)}
          }
          @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        `}</style>

        {/* Header */}
        <div style={{ padding: "24px 28px 20px", borderBottom: "1px solid rgba(255,102,0,0.15)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <polygon points="10,1 18,5.5 18,14.5 10,19 2,14.5 2,5.5" stroke="#FF6600" strokeWidth="1.5" fill="none" />
              <polygon points="10,6 14,8.5 14,12.5 10,15 6,12.5 6,8.5" fill="#FF6600" opacity="0.35" />
            </svg>
            <div>
              <div style={{ color: "#FF6600", fontSize: 13, fontWeight: 700, letterSpacing: "0.2em" }}>AMAZON</div>
              <div style={{ color: "#fff", fontSize: 18, fontWeight: 700, letterSpacing: "0.2em", lineHeight: 1 }}>BULLETIN</div>
            </div>
          </div>
          <div style={{ color: "rgba(255,102,0,0.6)", fontSize: 9, letterSpacing: "0.2em" }}>
            // ACCESSO RISERVATO — INSERISCI IL TUO CODICE
          </div>
        </div>

        {/* Form */}
        <div style={{ padding: "28px 28px 24px" }}>
          <label style={{ color: "rgba(255,255,255,0.3)", fontSize: 9, letterSpacing: "0.15em", display: "block", marginBottom: 8 }}>
            CODICE DI ACCESSO
          </label>
          <div style={{ position: "relative" }}>
            <input
              type="text"
              value={code}
              onChange={(e) => { setCode(e.target.value); setError(false); }}
              onKeyDown={(e) => e.key === "Enter" && attempt()}
              autoFocus
              placeholder="es. marco-seller"
              style={{
                width: "100%",
                background: "rgba(255,102,0,0.04)",
                border: `1px solid ${error ? "#FF4444" : "rgba(255,102,0,0.3)"}`,
                color: "#fff",
                padding: "12px 44px 12px 14px",
                fontSize: 12,
                fontFamily: "inherit",
                letterSpacing: "0.08em",
                outline: "none",
                transition: "border-color 0.2s",
                boxSizing: "border-box",
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = error ? "#FF4444" : "#FF6600"; }}
              onBlur={(e)  => { e.currentTarget.style.borderColor = error ? "#FF4444" : "rgba(255,102,0,0.3)"; }}
            />
            {/* Blinking cursor indicator */}
            <span
              style={{
                position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
                color: "#FF6600", fontSize: 14,
                animation: "blink 1.2s step-end infinite",
              }}
            >
              █
            </span>
          </div>

          {error && (
            <div style={{ marginTop: 8, color: "#FF4444", fontSize: 9, letterSpacing: "0.12em" }}>
              ✕ CODICE NON RICONOSCIUTO — CONTATTA L'AMMINISTRATORE
            </div>
          )}

          <button
            onClick={attempt}
            style={{
              width: "100%", marginTop: 16,
              background: "rgba(255,102,0,0.12)",
              border: "1px solid rgba(255,102,0,0.6)",
              color: "#FF6600", padding: "12px",
              fontSize: 10, letterSpacing: "0.2em",
              fontFamily: "inherit", cursor: "pointer",
              transition: "all 0.2s",
              boxShadow: "0 0 12px rgba(255,102,0,0.1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,102,0,0.2)";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(255,102,0,0.25)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,102,0,0.12)";
              e.currentTarget.style.boxShadow = "0 0 12px rgba(255,102,0,0.1)";
            }}
          >
            ▶ ACCEDI
          </button>
        </div>

        {/* Footer */}
        <div style={{ padding: "12px 28px 16px", borderTop: "1px solid rgba(255,102,0,0.1)" }}>
          <span style={{ color: "rgba(255,255,255,0.12)", fontSize: 8, letterSpacing: "0.1em" }}>
            AMAZON BULLETIN v1.0 — ACCESSO RISERVATO AI MEMBRI AUTORIZZATI
          </span>
        </div>
      </div>
    </div>
  );
}
