"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PROFILE } from "@/data/profile";
import { SectionFrame } from "@/components/editorial/SectionFrame";

export default function AboutPage() {
  return (
    <SectionFrame
      sectionId="about"
      index="01"
      eyebrow="Biography & Academic Profile"
      title="Understanding perception through a human-centered lens."
      lead="MSc in Computer Science at the University of Catania — researching Computer Vision, Multimodal AI, Egocentric Vision, and structured procedural intelligence."
    >
      {/* Institutional Metadata Strip */}
      <dl className="grid grid-cols-1 gap-6 border-b border-alabaster/12 pb-10 sm:grid-cols-3">
        <div>
          <dt className="mono-label text-slateMuted">Degree</dt>
          <dd className="mt-2 font-display text-sm text-alabaster">
            MSc in Computer Science
          </dd>
          <dd className="mt-0.5 text-xs text-slateMuted">
            University of Catania (DMI)
          </dd>
        </div>
        <div>
          <dt className="mono-label text-slateMuted">Research Environment</dt>
          <dd className="mt-2 font-display text-sm text-alabaster">
            LIVE @ IPLab
          </dd>
          <dd className="mt-0.5 text-xs text-slateMuted">
            Image Processing Laboratory
          </dd>
        </div>
        <div>
          <dt className="mono-label text-slateMuted">Core Intersection</dt>
          <dd className="mt-2 font-display text-sm text-alabaster">
            Vision · Multimodal · Ego
          </dd>
          <dd className="mt-0.5 text-xs text-slateMuted">
            Human-Centered Understanding
          </dd>
        </div>
      </dl>

      {/* Narrative Biography */}
      <section className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-12">
        <div className="md:col-span-4">
          <h2 className="mono-label text-slateMuted">01.1 / Profile</h2>
          <p className="mt-3 font-display text-lg text-alabaster">
            {PROFILE.philosophyTitle}
          </p>
        </div>
        <div className="space-y-5 text-[15px] leading-[1.75] text-alabaster/85 md:col-span-8">
          {PROFILE.bioParagraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </section>

      {/* Research Principles */}
      <section className="mt-16 border-t border-alabaster/12 pt-12">
        <h2 className="mono-label text-slateMuted">01.2 / Research Approach</h2>
        <div className="mt-6 space-y-6">
          {PROFILE.researchApproach.map((item, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 gap-2 border-l border-alabaster/20 pl-5 md:grid-cols-12"
            >
              <span className="font-mono text-xs text-limeAccent md:col-span-1">
                0{idx + 1}
              </span>
              <p className="text-[15px] leading-relaxed text-alabaster/85 md:col-span-11">
                {item}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Four Conceptual Pillars (Editorial hairline grid, zero floating cards) */}
      <section className="mt-16 border-t border-alabaster/12 pt-12">
        <div className="flex items-baseline justify-between">
          <h2 className="mono-label text-slateMuted">01.3 / Pillars</h2>
          <Link
            href="/research"
            className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-alabaster/75 transition-colors hover:text-limeAccent"
          >
            Full Research Agenda
            <ArrowUpRight size={12} />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 border-t border-alabaster/12 sm:grid-cols-2">
          {PROFILE.pillars.map((pillar, i) => (
            <div
              key={pillar.index}
              className={`border-b border-alabaster/12 py-7 ${
                i % 2 === 0 ? "sm:border-r sm:pr-8" : "sm:pl-8"
              }`}
            >
              <span className="font-mono text-[11px] text-limeAccent">
                {pillar.index}
              </span>
              <h3 className="mt-2 font-display text-lg font-normal text-alabaster">
                {pillar.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slateMuted">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Academic & Research Timeline */}
      <section className="mt-16 border-t border-alabaster/12 pt-12">
        <h2 className="mono-label text-slateMuted">01.4 / Trajectory</h2>
        <div className="mt-8 divide-y divide-alabaster/10 border-t border-alabaster/12">
          {PROFILE.timeline.map((entry) => (
            <div
              key={entry.period}
              className="grid grid-cols-1 gap-4 py-7 md:grid-cols-12"
            >
              <div className="md:col-span-4">
                <p className="font-mono text-xs tracking-[0.1em] text-limeAccent/90">
                  {entry.period}
                </p>
                <p className="mt-1 font-mono text-[11px] text-slateMuted">
                  {entry.location}
                </p>
              </div>
              <div className="md:col-span-8">
                <h3 className="font-display text-lg text-alabaster">
                  {entry.role}
                </h3>
                <p className="mt-1 font-mono text-xs text-alabaster/70">
                  {entry.institution}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slateMuted">
                  {entry.details}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Methods & Technical Stack Index */}
      <section className="mt-16 border-t border-alabaster/12 pt-12">
        <h2 className="mono-label text-slateMuted">
          01.5 / Technical & Experimental Index
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {Object.entries(PROFILE.technicalFocus).map(([category, items]) => (
            <div key={category} className="border-t border-alabaster/15 pt-4">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-alabaster">
                {category}
              </h3>
              <ul className="mt-4 space-y-2">
                {items.map((tech) => (
                  <li
                    key={tech}
                    className="flex items-center gap-2 text-sm text-slateMuted"
                  >
                    <span className="h-1 w-1 bg-alabaster/30" />
                    <span>{tech}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </SectionFrame>
  );
}
