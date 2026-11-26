"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Copy, FileText } from "lucide-react";
import { Publication, PUBLICATIONS } from "@/data/publications";
import { SectionFrame } from "@/components/editorial/SectionFrame";

type FilterKind = "all" | Publication["type"];

const FILTERS: { id: FilterKind; label: string }[] = [
  { id: "all", label: "All Works" },
  { id: "conference", label: "Conference" },
  { id: "benchmark", label: "Lab Ecosystem" },
];

export default function PublicationsPage() {
  const [filter, setFilter] = useState<FilterKind>("all");
  const [openAbstractId, setOpenAbstractId] = useState<string | null>(
    PUBLICATIONS[0].id
  );
  const [openBibtexId, setOpenBibtexId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const visible =
    filter === "all"
      ? PUBLICATIONS
      : PUBLICATIONS.filter((p) => p.type === filter);

  const copyBibtex = async (pub: Publication) => {
    try {
      await navigator.clipboard.writeText(pub.bibtex);
      setCopiedId(pub.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      setOpenBibtexId(pub.id);
    }
  };

  return (
    <SectionFrame
      sectionId="publications"
      index="03"
      eyebrow="Academic Archive"
      title="Publications & Research Outputs."
      lead="Peer-reviewed publications, foundational multimodal benchmarks, and active manuscripts bridging Italian Sign Language analysis and egocentric procedural understanding."
    >
      {/* Editorial Filter Bar */}
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-alabaster/12 pb-5">
        <div
          role="tablist"
          aria-label="Filter publications by category"
          className="flex flex-wrap items-center gap-5"
        >
          {FILTERS.map((f) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(f.id)}
                className={`relative pb-1 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors ${
                  active
                    ? "text-alabaster"
                    : "text-slateMuted hover:text-alabaster/80"
                }`}
              >
                {f.label}
                {active && (
                  <span className="absolute inset-x-0 bottom-0 h-px bg-limeAccent" />
                )}
              </button>
            );
          })}
        </div>

        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-slateMuted">
          {String(visible.length).padStart(2, "0")} ENTRIES
        </span>
      </div>

      {/* Archival Publication Rows (Pure editorial typography, zero generic cards) */}
      <div className="divide-y divide-alabaster/12 border-t border-alabaster/15">
        {visible.map((pub) => {
          const showAbstract = openAbstractId === pub.id;
          const showBibtex = openBibtexId === pub.id;

          return (
            <article
              key={pub.id}
              id={pub.id}
              className="scroll-mt-28 grid grid-cols-1 gap-6 py-9 md:grid-cols-12"
            >
              {/* Left Margin Column: Year & Venue Index */}
              <div className="md:col-span-3">
                <div className="flex items-center gap-3 md:flex-col md:items-start md:gap-1.5">
                  <span className="font-mono text-sm tabular-nums text-alabaster">
                    {pub.year}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-limeAccent">
                    {pub.venueShort}
                  </span>
                </div>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-slateMuted">
                  {pub.status}
                </p>
              </div>

              {/* Right Column: Title, Authors, Venue, Abstract & Actions */}
              <div className="md:col-span-9">
                <h2 className="font-display text-xl font-normal leading-snug tracking-tight text-alabaster md:text-[1.4rem]">
                  {pub.title}
                </h2>

                {/* Authors list with clean personal emphasis */}
                <p className="mt-3 text-sm leading-relaxed text-slateMuted">
                  {pub.authors.map((author, idx) => {
                    const isSelf = author === "Alessia Micieli";
                    return (
                      <React.Fragment key={author}>
                        <span
                          className={
                            isSelf
                              ? "border-b border-limeAccent/50 font-medium text-alabaster"
                              : "text-alabaster/70"
                          }
                        >
                          {author}
                        </span>
                        {idx < pub.authors.length - 1 && ", "}
                      </React.Fragment>
                    );
                  })}
                </p>

                <p className="mt-2 font-mono text-xs text-slateMuted">
                  {pub.venue}
                  {pub.doi ? ` · DOI: ${pub.doi}` : ""}
                </p>

                {/* Editorial Action Bar */}
                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2.5 border-t border-alabaster/10 pt-4">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenAbstractId(showAbstract ? null : pub.id)
                    }
                    className={`font-mono text-[11px] uppercase tracking-[0.12em] transition-colors ${
                      showAbstract
                        ? "text-limeAccent"
                        : "text-alabaster/80 hover:text-alabaster"
                    }`}
                  >
                    {showAbstract ? "Abstract [−]" : "Abstract [+]"}
                  </button>

                  {pub.externalUrl && (
                    <a
                      href={pub.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.12em] text-alabaster/80 transition-colors hover:text-limeAccent"
                    >
                      <span>arXiv / Link</span>
                      <ArrowUpRight size={12} />
                    </a>
                  )}

                  {pub.pdfUrl && (
                    <a
                      href={pub.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.12em] text-alabaster/80 transition-colors hover:text-limeAccent"
                    >
                      <FileText size={11} />
                      <span>PDF</span>
                    </a>
                  )}

                  {pub.projectSlug && pub.projectName && (
                    <Link
                      href={`/projects/${pub.projectSlug}`}
                      className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.12em] text-alabaster/80 transition-colors hover:text-limeAccent"
                    >
                      <span>Project: {pub.projectName}</span>
                      <ArrowUpRight size={12} />
                    </Link>
                  )}

                  <button
                    type="button"
                    onClick={() => setOpenBibtexId(showBibtex ? null : pub.id)}
                    className="font-mono text-[11px] uppercase tracking-[0.12em] text-slateMuted transition-colors hover:text-alabaster"
                  >
                    BibTeX
                  </button>

                  <button
                    type="button"
                    onClick={() => copyBibtex(pub)}
                    className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-slateMuted transition-colors hover:text-limeAccent"
                  >
                    {copiedId === pub.id ? (
                      <>
                        <Check size={11} className="text-limeAccent" />
                        <span className="text-limeAccent">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy size={11} />
                        <span>Copy Cite</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Inline Abstract Disclosure */}
                {showAbstract && (
                  <div className="mt-5 border-l border-alabaster/20 pl-4">
                    <span className="mono-label text-slateMuted">Abstract</span>
                    <p className="mt-2 text-sm leading-[1.78] text-alabaster/80">
                      {pub.abstract}
                    </p>
                  </div>
                )}

                {/* Inline BibTeX Code Block */}
                {showBibtex && (
                  <pre className="mt-5 overflow-x-auto border border-alabaster/12 bg-surface p-4 font-mono text-xs leading-relaxed text-alabaster/80">
                    <code>{pub.bibtex}</code>
                  </pre>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </SectionFrame>
  );
}
