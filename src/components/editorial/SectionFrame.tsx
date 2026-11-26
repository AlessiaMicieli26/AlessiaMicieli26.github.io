"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { NAV_SECTIONS, NavSectionId } from "@/lib/sculptureConfig";

interface SectionFrameProps {
  sectionId: NavSectionId;
  index: string;
  eyebrow: string;
  title: string;
  lead?: string;
  wide?: boolean;
  children: ReactNode;
}

export function SectionFrame({
  sectionId,
  index,
  eyebrow,
  title,
  lead,
  wide = false,
  children,
}: SectionFrameProps) {
  const currentIdx = NAV_SECTIONS.findIndex((s) => s.id === sectionId);
  const prev =
    currentIdx > 0 ? NAV_SECTIONS[currentIdx - 1] : null;
  const next =
    currentIdx >= 0 && currentIdx < NAV_SECTIONS.length - 1
      ? NAV_SECTIONS[currentIdx + 1]
      : null;

  return (
    <div className="pointer-events-none mx-auto w-full max-w-[1440px] px-5 pb-24 pt-28 md:px-10 md:pb-32 md:pt-36">
      <div
        className={`pointer-events-auto ${
          wide
            ? "w-full lg:w-[77%] xl:w-[75%]"
            : "w-full lg:w-[64%] xl:w-[61%]"
        }`}
      >
        {/* Editorial Section Header */}
        <header className="border-b border-alabaster/15 pb-8 md:pb-10">
          <div className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-slateMuted">
            <span className="text-limeAccent">{index}</span>
            <span className="text-alabaster/25">/</span>
            <span>{eyebrow}</span>
          </div>

          <h1 className="font-display text-3xl font-normal tracking-editorial text-alabaster sm:text-4xl md:text-[3.1rem] md:leading-[1.06]">
            {title}
          </h1>

          {lead && (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-alabaster/75 md:text-lg">
              {lead}
            </p>
          )}
        </header>

        {/* Main Section Body */}
        <div className="pt-10 md:pt-12">{children}</div>

        {/* Sequential Editorial Footer Navigation */}
        <footer className="mt-20 border-t border-alabaster/12 pt-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {prev ? (
              <Link
                href={prev.href}
                className="group inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.12em] text-slateMuted transition-colors hover:text-alabaster"
              >
                <ArrowLeft
                  size={13}
                  className="transition-transform group-hover:-translate-x-0.5"
                />
                <span>
                  {prev.index} / {prev.label}
                </span>
              </Link>
            ) : (
              <Link
                href="/"
                className="group inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.12em] text-slateMuted transition-colors hover:text-alabaster"
              >
                <ArrowLeft
                  size={13}
                  className="transition-transform group-hover:-translate-x-0.5"
                />
                <span>00 / Origin Sculpture</span>
              </Link>
            )}

            {next ? (
              <Link
                href={next.href}
                className="group inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.12em] text-alabaster transition-colors hover:text-limeAccent"
              >
                <span>
                  {next.index} / {next.label}
                </span>
                <ArrowRight
                  size={13}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            ) : (
              <Link
                href="/"
                className="group inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.12em] text-alabaster transition-colors hover:text-limeAccent"
              >
                <span>Return to Origin</span>
                <ArrowRight
                  size={13}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            )}
          </div>
        </footer>
      </div>
    </div>
  );
}
