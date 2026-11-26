"use client";

import React, { useState } from "react";
import { ArrowUpRight, Check, Copy, FileText, Printer } from "lucide-react";
import { PROFILE } from "@/data/profile";
import { PUBLICATIONS } from "@/data/publications";
import { SectionFrame } from "@/components/editorial/SectionFrame";

export default function ContactPage() {
  const [copied, setCopied] = useState(false);
  const [cvOpen, setCvOpen] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback ignored gracefully
    }
  };

  return (
    <SectionFrame
      sectionId="contact"
      index="06"
      eyebrow="Correspondence & Profiles"
      title="Contact & Academic Links."
      lead="Open to research collaborations, doctoral opportunities, visiting positions, and discussions around egocentric vision, multimodal AI, and human-centered systems."
    >
      {/* Direct Email Block */}
      <section className="border-b border-alabaster/12 pb-10">
        <span className="mono-label text-slateMuted">Direct Email</span>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <a
            href={`mailto:${PROFILE.contact.email}`}
            className="font-display text-2xl font-normal tracking-tight text-alabaster transition-colors hover:text-limeAccent sm:text-3xl"
          >
            {PROFILE.contact.email}
          </a>

          <button
            type="button"
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-2 border border-alabaster/20 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-alabaster transition-colors hover:border-limeAccent hover:text-limeAccent"
          >
            {copied ? (
              <>
                <Check size={12} className="text-limeAccent" />
                <span className="text-limeAccent">Address Copied</span>
              </>
            ) : (
              <>
                <Copy size={12} />
                <span>Copy Email</span>
              </>
            )}
          </button>
        </div>
        <p className="mt-3 max-w-xl text-sm text-slateMuted">
          {PROFILE.contact.emailNote}
        </p>
      </section>

      {/* Institutional Affiliation */}
      <section className="grid grid-cols-1 gap-6 border-b border-alabaster/12 py-10 sm:grid-cols-2">
        <div>
          <span className="mono-label text-slateMuted">Institution</span>
          <p className="mt-2.5 font-display text-base text-alabaster">
            University of Catania
          </p>
          <p className="mt-1 text-sm text-slateMuted">
            Department of Mathematics and Computer Science (DMI)
          </p>
        </div>
        <div>
          <span className="mono-label text-slateMuted">Location & Lab</span>
          <p className="mt-2.5 font-display text-base text-alabaster">
            {PROFILE.location}
          </p>
          <p className="mt-1 text-sm text-slateMuted">{PROFILE.lab}</p>
        </div>
      </section>

      {/* Platforms Index */}
      <section className="py-10">
        <span className="mono-label text-slateMuted">Academic & Code Platforms</span>
        <div className="mt-6 divide-y divide-alabaster/10 border-t border-alabaster/12">
          {PROFILE.contact.links.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 py-5 transition-colors"
            >
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-6">
                <span className="w-24 font-mono text-[10px] uppercase tracking-[0.14em] text-slateMuted">
                  {item.tag}
                </span>
                <span className="font-display text-lg text-alabaster transition-colors group-hover:text-limeAccent">
                  {item.label}
                </span>
                <span className="font-mono text-xs text-slateMuted">
                  {item.handle}
                </span>
              </div>
              <ArrowUpRight
                size={15}
                className="shrink-0 text-slateMuted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-limeAccent"
              />
            </a>
          ))}
        </div>
      </section>

      {/* Curriculum Vitae — Inline Editorial Summary + Printable Export */}
      <section className="border-t border-alabaster/12 pt-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="mono-label text-slateMuted">
              Curriculum Vitae
            </span>
            <p className="mt-2 font-display text-lg text-alabaster">
              Academic Summary & Printable CV
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setCvOpen((v) => !v)}
              className="inline-flex items-center gap-2 border border-alabaster/20 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-alabaster transition-colors hover:border-limeAccent hover:text-limeAccent"
            >
              <FileText size={13} />
              <span>{cvOpen ? "Hide CV Summary" : "Inspect CV"}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setCvOpen(true);
                setTimeout(() => window.print(), 120);
              }}
              className="inline-flex items-center gap-2 border border-alabaster/15 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-slateMuted transition-colors hover:border-alabaster/40 hover:text-alabaster"
            >
              <Printer size={13} />
              <span>Print / Save PDF</span>
            </button>
          </div>
        </div>

        {cvOpen && (
          <div className="mt-8 border border-alabaster/15 bg-surface/80 p-6 md:p-8">
            <div className="border-b border-alabaster/12 pb-5">
              <h2 className="font-display text-xl text-alabaster">
                {PROFILE.name}
              </h2>
              <p className="mt-1 font-mono text-xs text-slateMuted">
                {PROFILE.role} · {PROFILE.affiliation}
              </p>
            </div>

            <div className="mt-6 space-y-6 text-sm">
              <div>
                <h3 className="mono-label text-limeAccent">Education & Experience</h3>
                <ul className="mt-3 space-y-3">
                  {PROFILE.timeline.map((item) => (
                    <li
                      key={item.period}
                      className="flex flex-col justify-between gap-1 sm:flex-row"
                    >
                      <div>
                        <span className="font-medium text-alabaster">
                          {item.role}
                        </span>
                        <span className="block text-xs text-slateMuted">
                          {item.institution}
                        </span>
                      </div>
                      <span className="font-mono text-xs text-slateMuted">
                        {item.period}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-alabaster/10 pt-5">
                <h3 className="mono-label text-limeAccent">
                  Selected Publications
                </h3>
                <ul className="mt-3 space-y-3">
                  {PUBLICATIONS.map((pub) => (
                    <li key={pub.id} className="text-alabaster/85">
                      <span className="font-mono text-[11px] text-slateMuted">
                        [{pub.venueShort}]{" "}
                      </span>
                      {pub.title}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </section>
    </SectionFrame>
  );
}
