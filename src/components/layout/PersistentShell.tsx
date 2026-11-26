"use client";

import React, { ReactNode, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpLeft } from "lucide-react";
import {
  pathnameToSection,
  SCULPTURE_PRESETS,
} from "@/lib/sculptureConfig";
import { usePortfolioStore } from "@/store/portfolioStore";
import { SculptureScene } from "@/components/sculpture/SculptureScene";
import { SiteHeader } from "./SiteHeader";

export function PersistentShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const activeSection = usePortfolioStore((s) => s.activeSection);
  const isDragging = usePortfolioStore((s) => s.isDragging);
  const setActiveSection = usePortfolioStore((s) => s.setActiveSection);
  const setReducedMotion = usePortfolioStore((s) => s.setReducedMotion);
  const reducedMotion = usePortfolioStore((s) => s.reducedMotion);

  // Synchronize URL route -> centralized sculpture store
  useEffect(() => {
    const next = pathnameToSection(pathname);
    setActiveSection(next);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, setActiveSection]);

  // Respect OS prefers-reduced-motion automatically
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [setReducedMotion]);

  const isHome = activeSection === "home";
  const preset = SCULPTURE_PRESETS[activeSection];

  return (
    <div className="relative min-h-screen bg-obsidian text-alabaster">
      {/* Persistent 3D Interlocking Sculpture — ALWAYS interactive & NEVER unmounts */}
      <SculptureScene />

      {/* Persistent accessible top navigation */}
      <SiteHeader />

      {/* Main editorial content layer: wrapper is pointer-events-none so the open sculpture margin stays directly draggable */}
      <main className="pointer-events-none relative z-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={
              reducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }
            }
            animate={{ opacity: 1, y: 0 }}
            exit={
              reducedMotion ? { opacity: 1 } : { opacity: 0, y: -8 }
            }
            transition={{
              duration: reducedMotion ? 0.01 : 0.36,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Interactive inner-page sculptural telemetry & return-to-origin control (Desktop) */}
      {!isHome && (
        <aside
          aria-label="Sculpture state and interaction guide"
          className="fixed bottom-6 right-8 z-30 hidden flex-col items-end gap-2 lg:flex"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-slateMuted">
            {isDragging ? (
              <span className="text-limeAccent">ROTATING SCULPTURE</span>
            ) : (
              <span>CLICK &amp; DRAG TO ROTATE</span>
            )}
          </p>

          <div className="flex items-center gap-3 border border-alabaster/12 bg-obsidian/85 px-3.5 py-2 backdrop-blur-[2px]">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-limeAccent/85" />
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-alabaster/85">
                {preset.geometryName}
              </span>
              <span className="text-alabaster/25">·</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-slateMuted">
                {preset.materialName}
              </span>
            </div>
            <span className="h-3 w-px bg-alabaster/15" aria-hidden="true" />
            <Link
              href="/"
              className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.14em] text-alabaster/80 transition-colors hover:text-limeAccent"
            >
              <ArrowUpLeft size={11} />
              Home
            </Link>
          </div>
        </aside>
      )}
    </div>
  );
}
