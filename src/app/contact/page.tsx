"use client";

import React, { useEffect, useState } from "react";
import { ArrowUpRight, Check, Copy, Download, Eye, EyeOff } from "lucide-react";
import { PROFILE } from "@/data/profile";
import { BASE_PATH } from "@/lib/siteConfig";
import { SectionFrame } from "@/components/editorial/SectionFrame";

export default function ContactPage() {
  const [copied, setCopied] = useState(false);
  const [cvOpen, setCvOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#cv") {
      setCvOpen(true);
    }
  }, []);

  const cvUrl = `${BASE_PATH}${PROFILE.contact.cvPath}`;

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
          <span className="mono-label text-slateMuted">Location &amp; Lab</span>
          <p className="mt-2.5 font-display text-base text-alabaster">
            {PROFILE.location}
          </p>
          <p className="mt-1 text-sm text-slateMuted">{PROFILE.lab}</p>
        </div>
      </section>

      {/* Platforms Index */}
      <section className="py-10">
        <span className="mono-label text-slateMuted">
          Academic &amp; Code Platforms
        </span>
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

      {/* Curriculum Vitae — Official PDF Viewer & Direct Download */}
      <section id="cv" className="scroll-mt-28 border-t border-alabaster/12 pt-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="mono-label text-slateMuted">Curriculum Vitae</span>
            <p className="mt-2 font-display text-lg text-alabaster">
              Official Academic CV (English · PDF)
            </p>
            <p className="mt-1 font-mono text-[11px] text-slateMuted">
              {PROFILE.contact.cvFileName}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setCvOpen((v) => !v)}
              className="inline-flex items-center gap-2 border border-limeAccent/50 bg-limeAccent/[0.06] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-limeAccent transition-colors hover:border-limeAccent hover:bg-limeAccent/15"
              aria-expanded={cvOpen}
            >
              {cvOpen ? <EyeOff size={13} /> : <Eye size={13} />}
              <span>{cvOpen ? "Hide CV Preview" : "View CV"}</span>
            </button>

            <a
              href={cvUrl}
              download={PROFILE.contact.cvFileName}
              className="inline-flex items-center gap-2 border border-alabaster/20 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-alabaster transition-colors hover:border-limeAccent hover:text-limeAccent"
            >
              <Download size={13} />
              <span>Download PDF</span>
            </a>

            <a
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 border border-alabaster/15 px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-slateMuted transition-colors hover:border-alabaster/40 hover:text-alabaster"
            >
              <span>Open Tab</span>
              <ArrowUpRight size={12} />
            </a>
          </div>
        </div>

        {/* Inline PDF Viewer */}
        {cvOpen && (
          <div className="mt-7 border border-alabaster/15 bg-surface/90">
            <div className="flex items-center justify-between border-b border-alabaster/12 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-slateMuted">
              <span>PDF PREVIEW · {PROFILE.contact.cvFileName}</span>
              <a
                href={cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-alabaster/80 transition-colors hover:text-limeAccent"
              >
                <span>Fullscreen</span>
                <ArrowUpRight size={11} />
              </a>
            </div>

            <div className="relative h-[72vh] min-h-[540px] w-full bg-[#181A20]">
              <iframe
                src={`${cvUrl}#view=FitH`}
                title="Alessia Micieli — Curriculum Vitae (PDF)"
                className="h-full w-full border-0"
              />
            </div>

            <div className="border-t border-alabaster/10 px-4 py-2.5 text-xs text-slateMuted">
              If your browser does not render embedded PDFs,{" "}
              <a
                href={cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-alabaster underline decoration-alabaster/35 underline-offset-4 hover:text-limeAccent"
              >
                open the CV in a new tab
              </a>{" "}
              or{" "}
              <a
                href={cvUrl}
                download={PROFILE.contact.cvFileName}
                className="text-alabaster underline decoration-alabaster/35 underline-offset-4 hover:text-limeAccent"
              >
                download the PDF directly
              </a>
              .
            </div>
          </div>
        )}
      </section>
    </SectionFrame>
  );
}
