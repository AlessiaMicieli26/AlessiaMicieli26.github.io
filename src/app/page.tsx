"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUpRight, MoveHorizontal } from "lucide-react";
import { PROFILE } from "@/data/profile";
import {
  azimuthToNavSection,
  NAV_SECTIONS,
  SCULPTURE_PRESETS,
} from "@/lib/sculptureConfig";
import { usePortfolioStore } from "@/store/portfolioStore";

const RING_LABELS = [
  { ring: 0, label: "RING 01 · ABOUT", href: "/about" },
  { ring: 1, label: "RING 02 · RESEARCH", href: "/research" },
  { ring: 2, label: "RING 03 · PUBLICATIONS", href: "/publications" },
  { ring: 3, label: "RING 04 · PROJECTS", href: "/projects" },
];

export default function HomePage() {
  const router = useRouter();
  const azimuthDeg = usePortfolioStore((s) => s.azimuthDeg);
  const previewSection = usePortfolioStore((s) => s.previewSection);
  const hoveredRing = usePortfolioStore((s) => s.hoveredRing);
  const isDragging = usePortfolioStore((s) => s.isDragging);
  const setPreviewSection = usePortfolioStore((s) => s.setPreviewSection);
  const requestAzimuth = usePortfolioStore((s) => s.requestAzimuth);

  // Determine the currently aligned perspective (either hovered/selected or compass-aligned)
  const alignedMeta = previewSection
    ? NAV_SECTIONS.find((s) => s.id === previewSection) ?? NAV_SECTIONS[0]
    : azimuthToNavSection(azimuthDeg);

  const visualPreset = SCULPTURE_PRESETS[previewSection ?? "home"];
  const hoveredRingInfo =
    hoveredRing !== null
      ? RING_LABELS.find((r) => r.ring === hoveredRing)
      : null;

  // Keyboard navigation on the homepage: Left/Right rotates perspectives, Enter opens aligned section
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }
      const currentIdx = NAV_SECTIONS.findIndex((s) => s.id === alignedMeta.id);
      if (e.key === "ArrowRight") {
        e.preventDefault();
        const next = NAV_SECTIONS[(currentIdx + 1) % NAV_SECTIONS.length];
        setPreviewSection(next.id);
        requestAzimuth(next.azimuthCenter);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        const prev =
          NAV_SECTIONS[
            (currentIdx - 1 + NAV_SECTIONS.length) % NAV_SECTIONS.length
          ];
        setPreviewSection(prev.id);
        requestAzimuth(prev.azimuthCenter);
      } else if (e.key === "Enter" && previewSection) {
        e.preventDefault();
        router.push(alignedMeta.href);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [alignedMeta, previewSection, requestAzimuth, router, setPreviewSection]);

  const formattedAzimuth = String(Math.round(azimuthDeg)).padStart(3, "0");

  return (
    <section className="relative flex min-h-[100dvh] w-full flex-col justify-between px-5 pb-7 pt-24 md:px-10 md:pb-10 md:pt-28">
      {/* Top / Mid editorial identity block — restrained, generous negative space */}
      <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-between md:flex-row md:items-start">
        {/* Left Identity Column */}
        <div className="max-w-sm md:pt-8 lg:max-w-md">
          <p className="mono-label mb-5 flex items-center gap-2.5 text-slateMuted">
            <span className="inline-block h-px w-5 bg-alabaster/30" />
            <span>RESEARCH PORTFOLIO · CATANIA, IT</span>
          </p>

          <h1 className="font-display text-3xl font-normal tracking-editorial text-alabaster sm:text-4xl lg:text-[2.75rem] lg:leading-[1.08]">
            {PROFILE.name}
          </h1>

          <p className="mt-5 font-display text-lg font-light leading-snug text-alabaster/90 md:text-[1.3rem]">
            &ldquo;{PROFILE.statement}&rdquo;
          </p>

          <p className="mt-3 max-w-xs text-sm leading-relaxed text-slateMuted">
            {PROFILE.supportingStatement}
          </p>
        </div>

        {/* Right Technical Readout — subtle sculpture telemetry & active configuration */}
        <div className="mt-6 hidden flex-col items-end text-right md:flex md:pt-8">
          <p className="mono-label text-slateMuted">OPTICAL INSTRUMENT · 04 RINGS</p>
          <p className="mt-2 font-mono text-xs tracking-[0.08em] text-alabaster/95">
            {visualPreset.geometryName}
          </p>
          <p className="mt-0.5 font-mono text-[11px] tracking-[0.06em] text-slateMuted">
            {visualPreset.materialName}
          </p>

          <div className="mt-5 flex items-center gap-3 border-t border-alabaster/10 pt-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-slateMuted">
              AZIMUTH
            </span>
            <span className="font-mono text-xs tabular-nums text-alabaster">
              {formattedAzimuth}°
            </span>
          </div>

          <div className="mt-3 min-h-[22px]">
            {hoveredRingInfo ? (
              <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-limeAccent">
                <span className="h-1.5 w-1.5 rounded-full bg-limeAccent" />
                {hoveredRingInfo.label} · CLICK TO ENTER
              </span>
            ) : isDragging ? (
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-limeAccent">
                ALIGNED · {alignedMeta.index} {alignedMeta.label}
              </span>
            ) : (
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-slateMuted/80">
                HOVER RING OR DRAG TO TRANSFORM
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Interactive Perspective Navigation & Rotational Hint */}
      <div className="mx-auto w-full max-w-[1440px]">
        {/* Interactive hint & live aligned CTA */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <MoveHorizontal
              size={14}
              className="text-limeAccent/90"
              aria-hidden="true"
            />
            <span className="mono-label text-alabaster/75">
              Rotate to explore
            </span>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.12em] text-slateMuted sm:inline">
              — Drag sculpture, click a ring, or select a perspective
            </span>
          </div>

          <Link
            href={alignedMeta.href}
            className="pointer-events-auto group inline-flex items-center gap-2.5 border border-alabaster/20 bg-obsidian/70 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-alabaster transition-colors hover:border-limeAccent hover:text-limeAccent"
          >
            <span>
              Enter {alignedMeta.index} / {alignedMeta.label}
            </span>
            <ArrowUpRight
              size={13}
              className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        {/* Hairline 6-perspective azimuth dial synced bidirectionally with the 3D sculpture */}
        <div
          role="region"
          aria-label="Interactive section alignment dial"
          onMouseLeave={() => setPreviewSection(null)}
          className="pointer-events-auto grid grid-cols-2 border-t border-alabaster/15 sm:grid-cols-3 lg:grid-cols-6"
        >
          {NAV_SECTIONS.map((sec) => {
            const isAligned = alignedMeta.id === sec.id;
            return (
              <div
                key={sec.id}
                onMouseEnter={() => {
                  setPreviewSection(sec.id);
                  requestAzimuth(sec.azimuthCenter);
                }}
                className={`group relative flex flex-col justify-between border-b border-r border-alabaster/10 px-3.5 py-3 transition-colors last:border-r-0 lg:border-b-0 ${
                  isAligned
                    ? "bg-alabaster/[0.04]"
                    : "hover:bg-alabaster/[0.025]"
                }`}
              >
                {/* Top active precision indicator bar */}
                <span
                  className={`absolute inset-x-0 top-0 h-[1.5px] transition-opacity duration-300 ${
                    isAligned
                      ? "bg-limeAccent opacity-100"
                      : "bg-alabaster/30 opacity-0 group-hover:opacity-60"
                  }`}
                />

                <div className="flex items-center justify-between">
                  <span
                    className={`font-mono text-[10px] tracking-[0.14em] ${
                      isAligned ? "text-limeAccent" : "text-slateMuted"
                    }`}
                  >
                    {sec.index} · {String(sec.azimuthCenter).padStart(3, "0")}°
                  </span>
                  <Link
                    href={sec.href}
                    className="font-mono text-[10px] uppercase tracking-[0.12em] text-slateMuted transition-colors group-hover:text-alabaster"
                    aria-label={`Open ${sec.label} section`}
                  >
                    <ArrowUpRight size={12} />
                  </Link>
                </div>

                <Link
                  href={sec.href}
                  className="mt-2 block focus-visible:outline-limeAccent"
                >
                  <span
                    className={`block font-display text-sm tracking-tight transition-colors ${
                      isAligned
                        ? "text-alabaster"
                        : "text-alabaster/75 group-hover:text-alabaster"
                    }`}
                  >
                    {sec.label}
                  </span>
                  <span className="mt-0.5 block truncate font-mono text-[10px] text-slateMuted">
                    {sec.geometryLabel}
                  </span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
