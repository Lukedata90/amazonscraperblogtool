"use client";

import { useState, useEffect } from "react";

const STEPS = [
  {
    id: "welcome",
    title: "Benvenuto in Amazon Bulletin",
    emoji: "⬡",
    body: "Il tuo centro di intelligence per il mondo Amazon. Monitora in tempo reale tutto ciò che conta — dal marketplace alle mosse geopolitiche che impattano l'ecosistema.",
    hint: null,
  },
  {
    id: "tabs",
    title: "Due livelli di intelligence",
    emoji: "◈",
    body: "Il tool è diviso in due tab con logiche diverse. Ogni tab ha le sue fonti RSS, le sue categorie e il suo colore — arancione per il mondo operativo, azzurro per i segnali macro.",
    hint: "→ I tab si trovano nella barra orizzontale sotto l'header",
  },
  {
    id: "amazon",
    title: "Tab — Mondo Amazon",
    emoji: "◆",
    body: "Raccoglie notizie operative per chi vende su Amazon: aumenti tariffe FBA, nuove policy, strumenti seller, advertising, aggiornamenti dal marketplace. Fonte primaria per le decisioni quotidiane.",
    hint: "→ Categorie: FBA & Logistica / Policy / Strumenti Seller / Advertising / Community",
    color: "#FF6600",
  },
  {
    id: "macro",
    title: "Tab — Impatto su Amazon",
    emoji: "◈",
    body: "Monitora eventi esterni che possono muovere Amazon come azienda: dazi USA-Cina, decisioni Fed sui tassi, indagini antitrust UE, mosse di OpenAI e competitor Big Tech, recessioni di mercato.",
    hint: "→ Categorie: Finanza & Mercati / Politica & Leggi / Big Tech / Macro Economia",
    color: "#00BFFF",
  },
  {
    id: "categories",
    title: "Filtra per categoria",
    emoji: "▦",
    body: "Nella sidebar sinistra trovi tutte le categorie del tab attivo. Clicca su una categoria per vedere solo quelle news. Il contatore a destra mostra quanti articoli ci sono per ogni sezione.",
    hint: "→ Clicca su 'Tutti' per tornare alla vista completa",
  },
  {
    id: "pipeline",
    title: "Pipeline automatica",
    emoji: "⟳",
    body: "Ogni 6 ore Apify legge tutti i feed RSS configurati. Claude AI riassume ogni articolo in italiano, lo categorizza e gli assegna il tab corretto. Il risultato finisce su Supabase e appare qui in automatico.",
    hint: "→ Clicca su '▶ RUN INGEST' nella sidebar per lanciare manualmente",
  },
  {
    id: "map",
    title: "Vuoi vedere l'architettura completa?",
    emoji: "⬡",
    body: "Nella sidebar trovi il pulsante MAPPA SISTEMA. Si apre un diagramma interattivo che mostra fonti RSS, pipeline AI, database e frontend — tutto collegato con le frecce del flusso dati.",
    hint: "→ Clicca su MAPPA SISTEMA nella sidebar in basso",
  },
];

const STORAGE_KEY = "bulletin_onboarding_done";

export default function OnboardingModal() {
  const [open, setOpen]   = useState(false);
  const [step, setStep]   = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!localStorage.getItem(STORAGE_KEY)) {
      setOpen(true);
    }
  }, []);

  function close() {
    localStorage.setItem(STORAGE_KEY, "1");
    setOpen(false);
  }

  function reset() {
    setStep(0);
    setOpen(true);
  }

  if (!mounted) return null;

  const current = STEPS[step];
  const isLast  = step === STEPS.length - 1;
  const accent  = current.color ?? "#FF6600";

  return (
    <>
      {/* Trigger button — always visible */}
      <button
        onClick={reset}
        title="Guida al tool"
        style={{
          position: "fixed", bottom: 24, right: 24, zIndex: 8000,
          width: 40, height: 40, borderRadius: "50%",
          background: "rgba(10,10,10,0.95)",
          border: "1px solid rgba(255,102,0,0.4)",
          color: "#FF6600", fontSize: 16, fontFamily: "inherit",
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 0 12px rgba(255,102,0,0.2)",
          transition: "all 0.2s",
        }}
      >
        ?
      </button>

      {/* Overlay */}
      {open && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 9000,
            background: "rgba(0,0,0,0.75)",
            display: "flex", alignItems: "center", justifyContent: "center",
            backdropFilter: "blur(4px)",
          }}
        >
          <div
            style={{
              width: 520, background: "#0A0A0A",
              border: `1px solid ${accent}60`,
              boxShadow: `0 0 40px ${accent}20`,
              position: "relative",
              clipPath: "polygon(0 16px, 16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px))",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "20px 28px 16px",
                borderBottom: `1px solid ${accent}25`,
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: accent, fontSize: 18 }}>{current.emoji}</span>
                <span style={{ color: `${accent}99`, fontSize: 9, letterSpacing: "0.2em" }}>
                  // GUIDA AL TOOL — STEP {step + 1}/{STEPS.length}
                </span>
              </div>
              <button
                onClick={close}
                style={{
                  background: "transparent", border: "none",
                  color: "rgba(255,255,255,0.3)", fontSize: 14,
                  cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.1em",
                }}
              >
                ✕
              </button>
            </div>

            {/* Progress bar */}
            <div style={{ height: 2, background: "rgba(255,255,255,0.05)" }}>
              <div
                style={{
                  height: "100%",
                  width: `${((step + 1) / STEPS.length) * 100}%`,
                  background: `linear-gradient(90deg, ${accent}, ${accent}AA)`,
                  boxShadow: `0 0 6px ${accent}`,
                  transition: "width 0.3s ease",
                }}
              />
            </div>

            {/* Body */}
            <div style={{ padding: "28px 28px 24px" }}>
              <h2
                style={{
                  color: "#fff", fontSize: 18, fontWeight: 700,
                  letterSpacing: "0.05em", marginBottom: 16, lineHeight: 1.3,
                }}
              >
                {current.title}
              </h2>
              <p
                style={{
                  color: "rgba(255,255,255,0.55)", fontSize: 12,
                  lineHeight: 1.8, letterSpacing: "0.02em", marginBottom: current.hint ? 20 : 0,
                }}
              >
                {current.body}
              </p>
              {current.hint && (
                <div
                  style={{
                    padding: "10px 14px",
                    background: `${accent}0D`,
                    border: `1px solid ${accent}30`,
                    color: `${accent}CC`,
                    fontSize: 10, letterSpacing: "0.1em",
                  }}
                >
                  {current.hint}
                </div>
              )}
            </div>

            {/* Step dots */}
            <div style={{ display: "flex", justifyContent: "center", gap: 6, paddingBottom: 4 }}>
              {STEPS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setStep(i)}
                  style={{
                    width: i === step ? 20 : 6, height: 6,
                    borderRadius: 3, border: "none",
                    background: i === step ? accent : `${accent}33`,
                    cursor: "pointer", transition: "all 0.2s",
                    boxShadow: i === step ? `0 0 6px ${accent}` : "none",
                  }}
                />
              ))}
            </div>

            {/* Footer */}
            <div
              style={{
                padding: "16px 28px 20px",
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}
            >
              <button
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                style={{
                  background: "transparent",
                  border: `1px solid rgba(255,255,255,0.1)`,
                  color: step === 0 ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.4)",
                  padding: "8px 20px", fontSize: 9,
                  letterSpacing: "0.15em", fontFamily: "inherit",
                  cursor: step === 0 ? "default" : "pointer",
                  transition: "all 0.2s",
                }}
              >
                ← INDIETRO
              </button>

              {isLast ? (
                <button
                  onClick={close}
                  style={{
                    background: `${accent}20`,
                    border: `1px solid ${accent}80`,
                    color: accent, padding: "8px 24px",
                    fontSize: 9, letterSpacing: "0.15em",
                    fontFamily: "inherit", cursor: "pointer",
                    boxShadow: `0 0 12px ${accent}20`,
                  }}
                >
                  ▶ INIZIA A USARE IL TOOL
                </button>
              ) : (
                <button
                  onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
                  style={{
                    background: `${accent}20`,
                    border: `1px solid ${accent}80`,
                    color: accent, padding: "8px 24px",
                    fontSize: 9, letterSpacing: "0.15em",
                    fontFamily: "inherit", cursor: "pointer",
                  }}
                >
                  AVANTI →
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
