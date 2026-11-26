"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CitationBoxProps {
  bibtex: string;
  plainText: string;
  doi?: string;
}

export function CitationBox({ bibtex, plainText, doi }: CitationBoxProps) {
  const [format, setFormat] = useState<"bibtex" | "plain">("bibtex");
  const [copied, setCopied] = useState(false);

  const activeText = format === "bibtex" ? bibtex : plainText;

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(activeText);
      } else {
        const ta = document.createElement("textarea");
        ta.value = activeText;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback gracefully if browser blocks clipboard
    }
  };

  return (
    <div className="border border-alabaster/15 bg-surface/85">
      {/* Header bar with format tabs & one-click copy button */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-alabaster/12 px-4 py-3">
        <div
          role="tablist"
          aria-label="Citation format"
          className="flex items-center gap-4"
        >
          <button
            type="button"
            role="tab"
            aria-selected={format === "bibtex"}
            onClick={() => {
              setFormat("bibtex");
              setCopied(false);
            }}
            className={`relative pb-0.5 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors ${
              format === "bibtex"
                ? "text-alabaster"
                : "text-slateMuted hover:text-alabaster/80"
            }`}
          >
            BibTeX
            {format === "bibtex" && (
              <span className="absolute inset-x-0 -bottom-0.5 h-px bg-limeAccent" />
            )}
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={format === "plain"}
            onClick={() => {
              setFormat("plain");
              setCopied(false);
            }}
            className={`relative pb-0.5 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors ${
              format === "plain"
                ? "text-alabaster"
                : "text-slateMuted hover:text-alabaster/80"
            }`}
          >
            Plain Text
            {format === "plain" && (
              <span className="absolute inset-x-0 -bottom-0.5 h-px bg-limeAccent" />
            )}
          </button>

          {doi && (
            <span className="hidden font-mono text-[10px] tracking-[0.08em] text-slateMuted sm:inline">
              · DOI: {doi}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-2 border border-alabaster/20 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-alabaster transition-colors hover:border-limeAccent hover:text-limeAccent"
        >
          {copied ? (
            <>
              <Check size={12} className="text-limeAccent" />
              <span className="text-limeAccent">Copied</span>
            </>
          ) : (
            <>
              <Copy size={12} />
              <span>{format === "bibtex" ? "Copy BibTeX" : "Copy Citation"}</span>
            </>
          )}
        </button>
      </div>

      {/* Selectable citation body */}
      {format === "bibtex" ? (
        <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-alabaster/85 select-all md:p-5">
          <code>{bibtex}</code>
        </pre>
      ) : (
        <p className="p-4 text-sm leading-relaxed text-alabaster/85 select-all md:p-5">
          {plainText}
        </p>
      )}
    </div>
  );
}
