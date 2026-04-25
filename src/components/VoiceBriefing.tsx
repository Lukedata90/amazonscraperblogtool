"use client";

import { useState, useRef, useEffect } from "react";
import type { Article } from "@/lib/mock-data";

type Props = {
  articles: Article[];
  activeTab: "amazon" | "macro";
  accentColor: string;
};

export default function VoiceBriefing({ articles, activeTab, accentColor }: Props) {
  const [speaking, setSpeaking]   = useState(false);
  const [supported, setSupported] = useState(false);
  const [currentText, setCurrentText] = useState("");

  useEffect(() => {
    setSupported(typeof window !== "undefined" && "speechSynthesis" in window);
    return () => { window.speechSynthesis?.cancel(); };
  }, []);

  // Stop if tab changes
  useEffect(() => {
    if (speaking) stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  function buildBriefing(): string {
    const date = new Date().toLocaleDateString("it-IT", {
      weekday: "long", day: "numeric", month: "long", year: "numeric",
    });
    const label = activeTab === "amazon" ? "Mondo Amazon" : "Impatto su Amazon";

    const featured  = articles.find((a) => a.isFeatured);
    const rest      = articles.filter((a) => !a.isFeatured).slice(0, 3);
    const selection = featured ? [featured, ...rest] : rest.slice(0, 4);

    let text = `Buongiorno. Sono Amazon Bulletin. Briefing del ${date}, sezione ${label}. `;
    text += `Ecco le ${selection.length} notizie più rilevanti. `;

    selection.forEach((a, i) => {
      text += `Notizia ${i + 1}. ${a.title}. ${a.summary} `;
    });

    text += `Fine del briefing. Buon lavoro.`;
    return text;
  }

  function start() {
    if (!supported || speaking) return;
    window.speechSynthesis.cancel();

    const text = buildBriefing();
    setCurrentText(text);

    const utterance    = new SpeechSynthesisUtterance(text);
    utterance.lang     = "it-IT";
    utterance.rate     = 0.92;
    utterance.pitch    = 1;

    // Pick Italian voice if available
    const voices       = window.speechSynthesis.getVoices();
    const itVoice      = voices.find((v) => v.lang.startsWith("it"));
    if (itVoice) utterance.voice = itVoice;

    utterance.onstart  = () => setSpeaking(true);
    utterance.onend    = () => { setSpeaking(false); setCurrentText(""); };
    utterance.onerror  = () => { setSpeaking(false); setCurrentText(""); };

    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  }

  function stop() {
    window.speechSynthesis.cancel();
    setSpeaking(false);
    setCurrentText("");
  }

  if (!supported) return null;

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={speaking ? stop : start}
        title={speaking ? "Ferma il briefing" : "Ascolta il briefing vocale"}
        style={{
          display:       "flex",
          alignItems:    "center",
          gap:           6,
          padding:       "5px 14px",
          background:    speaking ? `${accentColor}20` : "transparent",
          border:        `1px solid ${speaking ? accentColor : accentColor + "50"}`,
          color:         speaking ? accentColor : `${accentColor}AA`,
          fontSize:      9,
          letterSpacing: "0.15em",
          fontFamily:    "inherit",
          cursor:        "pointer",
          transition:    "all 0.2s",
          whiteSpace:    "nowrap",
          boxShadow:     speaking ? `0 0 10px ${accentColor}30` : "none",
        }}
      >
        {speaking ? (
          <>
            <SoundWave color={accentColor} />
            ■ STOP BRIEFING
          </>
        ) : (
          <>
            <span style={{ fontSize: 10 }}>◉</span>
            BRIEFING VOCALE
          </>
        )}
      </button>

      {/* Floating indicator while speaking */}
      {speaking && (
        <div
          style={{
            position:      "fixed",
            bottom:        72,
            right:         24,
            zIndex:        7000,
            maxWidth:      320,
            background:    "#0A0A0A",
            border:        `1px solid ${accentColor}60`,
            boxShadow:     `0 0 24px ${accentColor}20`,
            padding:       "12px 16px",
            clipPath:      "polygon(0 8px, 8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px))",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <SoundWave color={accentColor} />
            <span style={{ color: accentColor, fontSize: 9, letterSpacing: "0.15em" }}>
              IN RIPRODUZIONE
            </span>
            <button
              onClick={stop}
              style={{
                marginLeft:  "auto",
                background:  "transparent",
                border:      "none",
                color:       "rgba(255,255,255,0.3)",
                fontSize:    11,
                cursor:      "pointer",
                fontFamily:  "inherit",
                lineHeight:  1,
              }}
            >
              ✕
            </button>
          </div>
          <p
            style={{
              color:         "rgba(255,255,255,0.35)",
              fontSize:      9,
              lineHeight:    1.6,
              letterSpacing: "0.04em",
              maxHeight:     60,
              overflow:      "hidden",
              display:       "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
            }}
          >
            {currentText}
          </p>
        </div>
      )}
    </>
  );
}

function SoundWave({ color }: { color: string }) {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" style={{ flexShrink: 0 }}>
      <style>{`
        @keyframes wave1 { 0%,100%{height:3px;y:4.5px} 50%{height:10px;y:1px} }
        @keyframes wave2 { 0%,100%{height:6px;y:3px} 50%{height:12px;y:0px} }
        @keyframes wave3 { 0%,100%{height:4px;y:4px} 50%{height:8px;y:2px} }
        @keyframes wave4 { 0%,100%{height:3px;y:4.5px} 50%{height:10px;y:1px} }
        .w1{animation:wave1 0.8s ease-in-out infinite}
        .w2{animation:wave2 0.8s ease-in-out infinite 0.15s}
        .w3{animation:wave3 0.8s ease-in-out infinite 0.3s}
        .w4{animation:wave4 0.8s ease-in-out infinite 0.45s}
      `}</style>
      <rect className="w1" x="0"  y="4.5" width="2.5" height="3"  rx="1" fill={color} />
      <rect className="w2" x="4"  y="3"   width="2.5" height="6"  rx="1" fill={color} />
      <rect className="w3" x="8"  y="4"   width="2.5" height="4"  rx="1" fill={color} />
      <rect className="w4" x="12" y="4.5" width="2.5" height="3"  rx="1" fill={color} />
    </svg>
  );
}
