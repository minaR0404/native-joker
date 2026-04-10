"use client";

import { useState } from "react";

const STYLES = [
  { id: "casual", label: "Casual", emoji: "😎" },
  { id: "genz", label: "Gen Z", emoji: "💀" },
  { id: "bro", label: "Bro", emoji: "🤙" },
  { id: "street", label: "Street", emoji: "🔥" },
  { id: "british", label: "British", emoji: "🇬🇧" },
  { id: "southern", label: "Southern", emoji: "🤠" },
];

export default function Home() {
  const [text, setText] = useState("");
  const [style, setStyle] = useState("casual");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleTranslate() {
    if (!text.trim() || loading) return;
    setLoading(true);
    setResult("");
    setCopied(false);

    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, style }),
      });
      const data = await res.json();
      if (data.error) {
        setResult(`Error: ${data.error}`);
      } else {
        setResult(data.result);
      }
    } catch {
      setResult("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }


  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <header className="border-b border-border px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg width="28" height="28" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="8" fill="#0f0f0f"/>
              <rect x="4" y="5" width="24" height="17" rx="4" fill="#f59e0b"/>
              <polygon points="8,22 14,22 9,28" fill="#f59e0b"/>
              <text x="16" y="17" fontFamily="Arial Black, Arial" fontWeight="900" fontSize="10" fill="#0f0f0f" textAnchor="middle" letterSpacing="-0.5">yo!</text>
            </svg>
            <span className="font-bold text-lg tracking-tight">
              NativeJoker
            </span>
          </div>
          <p className="text-sm text-muted hidden sm:block">
            Formal English → Native Slang
          </p>
        </div>
      </header>

      <main className="flex-1 w-full max-w-3xl mx-auto px-6 py-8 space-y-8">
        {/* Hero */}
        <section className="text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Make your English sound{" "}
            <span className="text-accent">actually native</span>
          </h1>
          <p className="text-muted text-sm sm:text-base max-w-lg mx-auto">
            Paste your formal, boring text and we&apos;ll turn it into
            something a real human would actually say.
          </p>
        </section>

        {/* Style Selector */}
        <div className="flex flex-wrap justify-center gap-2">
          {STYLES.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                setStyle(s.id);
                if (result) setResult("");
              }}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                style === s.id
                  ? "bg-accent text-black"
                  : "bg-card border border-border text-foreground hover:border-accent/50"
              }`}
            >
              {s.emoji} {s.label}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="space-y-3">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your formal English here..."
            rows={4}
            maxLength={1000}
            className="w-full rounded-lg bg-card border border-border p-4 text-foreground placeholder:text-muted resize-none"
          />
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted">{text.length}/1000</span>
            <button
              onClick={handleTranslate}
              disabled={!text.trim() || loading}
              className="rounded-lg bg-accent px-6 py-2.5 text-sm font-bold text-black hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? "Translating..." : "Translate 🃏"}
            </button>
          </div>
        </div>

        {/* Result */}
        {result && (
          <div className="rounded-lg bg-card border border-accent/30 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-accent uppercase tracking-wider">
                {STYLES.find((s) => s.id === style)?.emoji}{" "}
                {STYLES.find((s) => s.id === style)?.label} version
              </span>
              <button
                onClick={handleCopy}
                className="text-xs text-muted hover:text-foreground transition-colors"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <p className="text-foreground leading-relaxed">{result}</p>
          </div>
        )}


        {/* Ad placeholder */}
        <div className="border border-dashed border-border rounded-lg p-8 text-center text-xs text-muted">
          Ad Space
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between text-xs text-muted">
          <span>NativeJoker &copy; {new Date().getFullYear()}</span>
          <span>Free slang translator</span>
        </div>
      </footer>
    </div>
  );
}
