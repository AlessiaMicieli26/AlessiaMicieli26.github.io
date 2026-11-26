"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { NAV_SECTIONS } from "@/lib/sculptureConfig";
import { usePortfolioStore } from "@/store/portfolioStore";

export function SiteHeader() {
  const activeSection = usePortfolioStore((s) => s.activeSection);
  const reducedMotion = usePortfolioStore((s) => s.reducedMotion);
  const setReducedMotion = usePortfolioStore((s) => s.setReducedMotion);
  const setPreviewSection = usePortfolioStore((s) => s.setPreviewSection);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isHome = activeSection === "home";
  const currentMeta = NAV_SECTIONS.find((s) => s.id === activeSection);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${
        isHome
          ? "bg-transparent"
          : "border-b border-alabaster/10 bg-obsidian/80 backdrop-blur-[2px]"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:h-20 md:px-10">
        {/* Left: Wordmark & active section index */}
        <div className="flex items-center gap-5">
          <Link
            href="/"
            onClick={() => {
              setPreviewSection(null);
              setMobileMenuOpen(false);
            }}
            className="group flex items-center gap-3 focus-visible:outline-limeAccent"
            aria-label="Alessia Micieli — Return to homepage sculpture"
          >
            <span className="inline-block h-2 w-2 rounded-full border border-alabaster/50 transition-colors duration-300 group-hover:border-limeAccent group-hover:bg-limeAccent" />
            <span className="font-display text-xs font-medium tracking-[0.2em] text-alabaster md:text-[13px]">
              ALESSIA MICIELI
            </span>
          </Link>

          {currentMeta && (
            <span className="hidden items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-slateMuted sm:inline-flex">
              <span className="text-alabaster/25">/</span>
              <span className="text-limeAccent">{currentMeta.index}</span>
              <span className="text-alabaster/80">{currentMeta.label}</span>
            </span>
          )}
        </div>

        {/* Right: Accessible conventional navigation + motion control */}
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-7 lg:flex"
        >
          {NAV_SECTIONS.map((item) => {
            const active = activeSection === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                onMouseEnter={() => {
                  if (isHome) setPreviewSection(item.id);
                }}
                onMouseLeave={() => {
                  if (isHome) setPreviewSection(null);
                }}
                className={`group relative py-1 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-200 ${
                  active
                    ? "text-alabaster"
                    : "text-slateMuted hover:text-alabaster"
                }`}
                aria-current={active ? "page" : undefined}
              >
                <span className="mr-1.5 text-[10px] text-alabaster/35 transition-colors group-hover:text-limeAccent/80">
                  {item.index}
                </span>
                {item.label}
                <span
                  className={`absolute inset-x-0 -bottom-0.5 h-px transition-all duration-300 ${
                    active
                      ? "bg-limeAccent opacity-100"
                      : "bg-alabaster/40 opacity-0 group-hover:opacity-60"
                  }`}
                />
              </Link>
            );
          })}

          <div className="h-3.5 w-px bg-alabaster/15" aria-hidden="true" />

          <button
            type="button"
            onClick={() => setReducedMotion(!reducedMotion)}
            className="font-mono text-[10px] uppercase tracking-[0.14em] text-slateMuted transition-colors hover:text-alabaster"
            title="Toggle reduced motion"
            aria-pressed={reducedMotion}
          >
            {reducedMotion ? "MOTION: REDUCED" : "MOTION: LIVE"}
          </button>
        </nav>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            type="button"
            onClick={() => setReducedMotion(!reducedMotion)}
            className="font-mono text-[10px] uppercase tracking-[0.14em] text-slateMuted"
            aria-pressed={reducedMotion}
          >
            {reducedMotion ? "STILL" : "LIVE"}
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center border border-alabaster/15 text-alabaster transition-colors hover:border-alabaster/40"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile full-width navigation drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-alabaster/10 bg-obsidian px-5 py-6 lg:hidden">
          <nav aria-label="Mobile navigation" className="flex flex-col">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between border-b border-alabaster/10 py-3.5 font-mono text-xs uppercase tracking-[0.16em] ${
                isHome ? "text-limeAccent" : "text-alabaster/80"
              }`}
            >
              <span>00 / Origin — Sculpture</span>
              <span className="text-[10px] text-slateMuted">HOME</span>
            </Link>
            {NAV_SECTIONS.map((item) => {
              const active = activeSection === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between border-b border-alabaster/10 py-3.5 ${
                    active ? "text-limeAccent" : "text-alabaster"
                  }`}
                >
                  <span className="font-display text-lg tracking-tight">
                    <span className="mr-3 font-mono text-xs text-slateMuted">
                      {item.index}
                    </span>
                    {item.label}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-slateMuted">
                    {item.materialLabel.split(" ")[0]}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
