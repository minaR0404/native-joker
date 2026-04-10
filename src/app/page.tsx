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

const EXAMPLES = [
  "I would like to express my sincere gratitude for your assistance with this matter.",
  "The meeting has been rescheduled to accommodate all participants' availability.",
  "I regret to inform you that the project deadline will not be met.",
  "Please be advised that your request has been processed accordingly.",
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

  function handleExample(example: string) {
    setText(example);
    setResult("");
    setCopied(false);
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <header className="border-b border-border px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🃏</span>
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

        {/* Examples */}
        <section className="space-y-3">
          <p className="text-xs text-muted uppercase tracking-wider font-medium">
            Try an example
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {EXAMPLES.map((ex) => (
              <button
                key={ex}
                onClick={() => handleExample(ex)}
                className="rounded-lg border border-border bg-card/50 p-3 text-left text-sm text-muted hover:text-foreground hover:border-accent/30 transition-colors line-clamp-2"
              >
                &ldquo;{ex}&rdquo;
              </button>
            ))}
          </div>
        </section>

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
