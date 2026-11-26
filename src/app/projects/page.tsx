"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/data/projects";
import { SectionFrame } from "@/components/editorial/SectionFrame";

export default function ProjectsPage() {
  return (
    <SectionFrame
      sectionId="projects"
      index="04"
      eyebrow="Selected Research & Engineering"
      title="Projects & Benchmarks."
      lead="SignIT and all public repositories from github.com/AlessiaMicieli26 — spanning multimodal sign language recognition, Mixed Reality assistive vision, neural video restoration, deep learning, and real-time ML streaming."
    >
      <div className="divide-y divide-alabaster/12 border-t border-alabaster/15">
        {PROJECTS.map((project) => (
          <article
            key={project.slug}
            className="group py-10 transition-colors"
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
              {/* Left Index & Status */}
              <div className="md:col-span-3">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs text-limeAccent">
                    {project.index}
                  </span>
                  <span className="h-px w-4 bg-alabaster/25" />
                  <span className="font-mono text-[11px] text-slateMuted">
                    {project.year}
                  </span>
                </div>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-alabaster/70">
                  {project.status}
                </p>
              </div>

              {/* Right Details */}
              <div className="md:col-span-9">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-slateMuted">
                      {project.domain}
                    </p>
                    <h2 className="mt-1.5 font-display text-2xl font-normal tracking-tight text-alabaster transition-colors group-hover:text-limeAccent md:text-[2rem]">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="focus-visible:outline-limeAccent"
                      >
                        {project.title}
                      </Link>
                    </h2>
                  </div>

                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-2 border border-alabaster/20 px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-alabaster transition-colors group-hover:border-limeAccent group-hover:text-limeAccent"
                  >
                    <span>Inspect</span>
                    <ArrowUpRight
                      size={13}
                      className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </Link>
                </div>

                <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-alabaster/80">
                  {project.tagline}
                </p>

                {/* Tabular Key Metrics Strip */}
                <dl className="mt-6 grid grid-cols-1 gap-4 border-t border-alabaster/10 pt-5 sm:grid-cols-3">
                  {project.metrics.map((m) => (
                    <div key={m.label}>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-slateMuted">
                        {m.label}
                      </dt>
                      <dd className="mt-1 font-display text-base text-alabaster">
                        {m.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                {/* Subtle Technology Tags */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.technologies.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="border border-alabaster/10 px-2 py-0.5 font-mono text-[10px] text-slateMuted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </SectionFrame>
  );
}
