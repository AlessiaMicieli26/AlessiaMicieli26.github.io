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
import { RING_SPECS } from "@/components/sculpture/InterlockingRings";
import { SiteHeader } from "./SiteHeader";

export function PersistentShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const activeSection = usePortfolioStore((s) => s.activeSection);
  const hoveredRing = usePortfolioStore((s) => s.hoveredRing);
  const isDragging = usePortfolioStore((s) => s.isDragging);
  const setActiveSection = usePortfolioStore((s) => s.setActiveSection);
  const setScrollProgress = usePortfolioStore((s) => s.setScrollProgress);
  const setReducedMotion = usePortfolioStore((s) => s.setReducedMotion);
  const reducedMotion = usePortfolioStore((s) => s.reducedMotion);
  const triggerPulse = usePortfolioStore((s) => s.triggerPulse);

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

  // Track vertical scroll progress smoothly so the persistent 3D sculpture responds to reading
  useEffect(() => {
    let rafId = 0;
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        const maxScroll =
          document.documentElement.scrollHeight - window.innerHeight;
        const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
        setScrollProgress(progress);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [pathname, setScrollProgress]);

  const isHome = activeSection === "home";
  const preset = SCULPTURE_PRESETS[activeSection];
  const hoveredSpec =
    hoveredRing !== null ? RING_SPECS[hoveredRing] ?? null : null;

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
              duration: reducedMotion ? 0.01 : 0.42,
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
            {hoveredSpec ? (
              <span className="text-limeAccent">
                {hoveredSpec.label} · CLICK TO SPIN · DBL-CLICK TO OPEN
              </span>
            ) : isDragging ? (
              <span className="text-alabaster">ORBITING SCULPTURE</span>
            ) : (
              <span>DRAG RINGS TO ORBIT · CLICK TO SPIN</span>
            )}
          </p>

          <div className="flex items-center gap-3 border border-alabaster/12 bg-obsidian/85 px-3.5 py-2 backdrop-blur-[2px]">
            <button
              type="button"
              onClick={() => triggerPulse(1.2)}
              className="group flex items-center gap-2 text-left"
              title="Pulse kinetic sculpture"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-limeAccent/85 transition-transform group-hover:scale-125" />
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-alabaster/85 transition-colors group-hover:text-alabaster">
                {preset.geometryName}
              </span>
              <span className="text-alabaster/25">·</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-slateMuted transition-colors group-hover:text-alabaster">
                {preset.materialName}
              </span>
            </button>
            <span className="h-3 w-px bg-alabaster/15" aria-hidden="true" />
            <Link
              href="/"
              className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.14em] text-alabaster/80 transition-colors hover:text-limeAccent"
            >
              <ArrowUpLeft size={11} />
              Origin
            </Link>
          </div>
        </aside>
      )}
    </div>
  );
}
