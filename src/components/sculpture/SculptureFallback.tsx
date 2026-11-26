"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { NAV_SECTIONS, SCULPTURE_PRESETS } from "@/lib/sculptureConfig";
import { usePortfolioStore } from "@/store/portfolioStore";

/**
 * Refined architectural SVG fallback when WebGL is unavailable or context is lost.
 * Preserves section material tonality, spatial continuity, and interactive ring navigation.
 */
export function SculptureFallback() {
  const router = useRouter();
  const activeSection = usePortfolioStore((s) => s.activeSection);
  const previewSection = usePortfolioStore((s) => s.previewSection);
  const reducedMotion = usePortfolioStore((s) => s.reducedMotion);

  const visualSection =
    activeSection === "home" && previewSection ? previewSection : activeSection;
  const preset = SCULPTURE_PRESETS[visualSection];
  const isHome = activeSection === "home";

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden transition-all duration-700"
      aria-hidden={!isHome}
    >
      <div
        className={`absolute transition-all duration-700 ease-out ${
          isHome
            ? "left-1/2 top-1/2 h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 md:h-[580px] md:w-[580px]"
            : "right-[-60px] top-20 h-[280px] w-[280px] opacity-65 md:right-8 md:top-1/2 md:h-[420px] md:w-[420px] md:-translate-y-1/2"
        }`}
      >
        <svg
          viewBox="0 0 400 400"
          className={`h-full w-full ${
            isHome ? "pointer-events-auto" : "pointer-events-none"
          }`}
          role="img"
          aria-label="Interlocking geometric rings sculpture"
        >
          <defs>
            <linearGradient id="ringMetal" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={preset.baseColor} stopOpacity="0.95" />
              <stop offset="50%" stopColor={preset.secondaryColor} stopOpacity="0.6" />
              <stop offset="100%" stopColor={preset.accentColor} stopOpacity="0.9" />
            </linearGradient>
          </defs>

          <g
            transform="translate(200 200)"
            fill="none"
            stroke="url(#ringMetal)"
            className={reducedMotion ? "" : "origin-center animate-[spin_48s_linear_infinite]"}
          >
            {/* Ring 0: About */}
            <ellipse
              cx="0"
              cy="0"
              rx="148"
              ry="142"
              strokeWidth="5"
              className="cursor-pointer transition-opacity hover:opacity-100"
              opacity={visualSection === "about" ? 1 : 0.72}
              onClick={() => isHome && router.push(NAV_SECTIONS[0].href)}
            />
            {/* Ring 1: Research */}
            <ellipse
              cx="28"
              cy="0"
              rx="126"
              ry="56"
              transform="rotate(-24)"
              strokeWidth="5.5"
              className="cursor-pointer transition-opacity hover:opacity-100"
              opacity={visualSection === "research" ? 1 : 0.72}
              onClick={() => isHome && router.push(NAV_SECTIONS[1].href)}
            />
            {/* Ring 2: Publications */}
            <ellipse
              cx="10"
              cy="32"
              rx="58"
              ry="118"
              transform="rotate(18)"
              strokeWidth="4.5"
              className="cursor-pointer transition-opacity hover:opacity-100"
              opacity={visualSection === "publications" ? 1 : 0.72}
              onClick={() => isHome && router.push(NAV_SECTIONS[2].href)}
            />
            {/* Ring 3: Projects */}
            <ellipse
              cx="-18"
              cy="-14"
              rx="88"
              ry="42"
              transform="rotate(42)"
              strokeWidth="4"
              stroke={visualSection === "projects" ? "#B9E66A" : "url(#ringMetal)"}
              className="cursor-pointer transition-opacity hover:opacity-100"
              opacity={visualSection === "projects" ? 1 : 0.78}
              onClick={() => isHome && router.push(NAV_SECTIONS[3].href)}
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
