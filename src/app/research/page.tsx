"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Minus, Plus } from "lucide-react";
import { RESEARCH_DIRECTIONS } from "@/data/research";
import { PROJECTS } from "@/data/projects";
import { PUBLICATIONS } from "@/data/publications";
import { SectionFrame } from "@/components/editorial/SectionFrame";

export default function ResearchPage() {
  const [expandedId, setExpandedId] = useState<string>(
    RESEARCH_DIRECTIONS[0].id
  );

  const toggleDirection = (id: string) => {
    setExpandedId((prev) => (prev === id ? "" : id));
  };

  return (
    <SectionFrame
      sectionId="research"
      index="02"
      eyebrow="Scientific Inquiry & Directions"
      title="From raw visual streams to structured human understanding."
      lead="Six interconnected research axes examining how embodied vision, multimodal fusion, and causal graph representations allow AI systems to interpret and assist complex human activities."
    >
      {/* Quick jump index */}
      <nav
        aria-label="Research topics index"
        className="mb-12 flex flex-wrap gap-x-6 gap-y-2 border-b border-alabaster/12 pb-6"
      >
        {RESEARCH_DIRECTIONS.map((dir) => (
          <a
            key={dir.id}
            href={`#${dir.id}`}
            onClick={() => {
              setExpandedId(dir.id);
            }}
            className="font-mono text-[11px] uppercase tracking-[0.12em] text-slateMuted transition-colors hover:text-limeAccent"
          >
            <span className="mr-1.5 text-alabaster/35">{dir.index}</span>
            {dir.title}
          </a>
        ))}
      </nav>

      {/* Structured Research Directions */}
      <div className="divide-y divide-alabaster/12 border-t border-alabaster/15">
        {RESEARCH_DIRECTIONS.map((dir) => {
          const isOpen = expandedId === dir.id;
          const linkedProjects = PROJECTS.filter((p) =>
            dir.relatedProjects.includes(p.slug)
          );
          const linkedPubs = PUBLICATIONS.filter((pub) =>
            dir.relatedPublications.includes(pub.id)
          );

          return (
            <article
              key={dir.id}
              id={dir.id}
              className="scroll-mt-28 py-8 transition-colors"
            >
              <button
                type="button"
                onClick={() => toggleDirection(dir.id)}
                className="group flex w-full items-start justify-between gap-6 text-left"
                aria-expanded={isOpen}
              >
                <div className="grid flex-1 grid-cols-1 gap-3 md:grid-cols-12">
                  <span className="font-mono text-xs tracking-[0.14em] text-limeAccent md:col-span-2 md:pt-1">
                    DIR {dir.index}
                  </span>
                  <div className="md:col-span-10">
                    <h2 className="font-display text-2xl font-normal tracking-tight text-alabaster transition-colors group-hover:text-limeAccent md:text-[1.65rem]">
                      {dir.title}
                    </h2>
                    <p className="mt-1 font-mono text-xs text-slateMuted">
                      {dir.subtitle}
                    </p>
                  </div>
                </div>

                <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center border border-alabaster/15 text-slateMuted transition-colors group-hover:border-limeAccent/60 group-hover:text-limeAccent">
                  {isOpen ? <Minus size={13} /> : <Plus size={13} />}
                </span>
              </button>

              {/* Core Scientific Question (always visible for instant academic legibility) */}
              <div className="mt-5 grid grid-cols-1 md:grid-cols-12">
                <div className="md:col-span-10 md:col-start-3">
                  <blockquote className="border-l border-limeAccent/60 pl-4 font-display text-[15px] leading-relaxed text-alabaster/90">
                    <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.14em] text-slateMuted">
                      Core Scientific Question
                    </span>
                    {dir.scientificQuestion}
                  </blockquote>

                  {/* Expanded methodological & linked detail */}
                  {isOpen && (
                    <div className="mt-7 space-y-6 pt-2">
                      <p className="text-[15px] leading-[1.75] text-alabaster/80">
                        {dir.summary}
                      </p>

                      <div>
                        <h3 className="mono-label text-slateMuted">
                          Methodological Focus
                        </h3>
                        <ul className="mt-3 space-y-2.5">
                          {dir.methodology.map((step, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-3 text-sm leading-relaxed text-alabaster/80"
                            >
                              <span className="mt-2 h-1 w-1 shrink-0 bg-limeAccent" />
                              <span>{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Keywords */}
                      <div className="flex flex-wrap gap-2 pt-1">
                        {dir.keywords.map((kw) => (
                          <span
                            key={kw}
                            className="border border-alabaster/12 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-slateMuted"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>

                      {/* Linked Projects & Publications */}
                      {(linkedProjects.length > 0 || linkedPubs.length > 0) && (
                        <div className="grid grid-cols-1 gap-4 border-t border-alabaster/10 pt-5 sm:grid-cols-2">
                          {linkedProjects.length > 0 && (
                            <div>
                              <span className="mono-label text-slateMuted">
                                Related Projects
                              </span>
                              <div className="mt-2.5 flex flex-wrap gap-3">
                                {linkedProjects.map((proj) => (
                                  <Link
                                    key={proj.slug}
                                    href={`/projects/${proj.slug}`}
                                    className="inline-flex items-center gap-1 font-mono text-xs text-alabaster transition-colors hover:text-limeAccent"
                                  >
                                    <span>{proj.title}</span>
                                    <ArrowUpRight size={12} />
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}

                          {linkedPubs.length > 0 && (
                            <div>
                              <span className="mono-label text-slateMuted">
                                Related Publications
                              </span>
                              <div className="mt-2.5 flex flex-wrap gap-3">
                                {linkedPubs.map((pub) => (
                                  <Link
                                    key={pub.id}
                                    href={`/publications#${pub.id}`}
                                    className="inline-flex items-center gap-1 font-mono text-xs text-alabaster transition-colors hover:text-limeAccent"
                                  >
                                    <span>{pub.venueShort}</span>
                                    <ArrowUpRight size={12} />
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Cross-link to interactive network */}
      <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-alabaster/15 pt-8">
        <p className="text-sm text-slateMuted">
          Explore how these six directions connect across projects and papers.
        </p>
        <Link
          href="/interests"
          className="inline-flex items-center gap-2 border border-alabaster/20 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-alabaster transition-colors hover:border-limeAccent hover:text-limeAccent"
        >
          Open Interactive Interest Map
          <ArrowUpRight size={13} />
        </Link>
      </div>
    </SectionFrame>
  );
}
