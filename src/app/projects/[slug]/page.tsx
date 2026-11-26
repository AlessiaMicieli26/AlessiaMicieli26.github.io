import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { getProjectBySlug, PROJECTS } from "@/data/projects";
import { PUBLICATIONS } from "@/data/publications";
import { RESEARCH_DIRECTIONS } from "@/data/research";
import { ProjectVisualPlate } from "@/components/editorial/ProjectVisualPlate";
import { CitationBox } from "@/components/editorial/CitationBox";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: project.title,
    description: project.tagline,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const currentIdx = PROJECTS.findIndex((p) => p.slug === project.slug);
  const prevProject =
    PROJECTS[(currentIdx - 1 + PROJECTS.length) % PROJECTS.length];
  const nextProject = PROJECTS[(currentIdx + 1) % PROJECTS.length];

  const linkedPubs = PUBLICATIONS.filter((pub) =>
    project.relatedPublications.includes(pub.id)
  );
  const linkedTopics = RESEARCH_DIRECTIONS.filter((dir) =>
    project.relatedTopics.includes(dir.id)
  );

  return (
    <div className="pointer-events-none mx-auto w-full max-w-[1440px] px-5 pb-24 pt-28 md:px-10 md:pb-32 md:pt-36">
      <div className="pointer-events-auto w-full lg:w-[64%] xl:w-[62%]">
        {/* Back link */}
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-slateMuted transition-colors hover:text-limeAccent"
        >
          <ArrowLeft
            size={13}
            className="transition-transform group-hover:-translate-x-0.5"
          />
          <span>All Projects</span>
        </Link>

        {/* Project Header */}
        <header className="mt-7 border-b border-alabaster/15 pb-8">
          <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-slateMuted">
            <span className="text-limeAccent">PROJECT {project.index}</span>
            <span className="text-alabaster/25">/</span>
            <span>{project.domain}</span>
          </div>

          <h1 className="mt-4 font-display text-3xl font-normal tracking-editorial text-alabaster sm:text-5xl">
            {project.title}
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-alabaster/80 md:text-lg">
            {project.tagline}
          </p>

          {/* Metadata & External Links */}
          <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-alabaster/10 pt-5">
            <div className="flex flex-wrap gap-6 font-mono text-xs">
              <div>
                <span className="block text-[10px] uppercase tracking-[0.14em] text-slateMuted">
                  Period
                </span>
                <span className="mt-0.5 block text-alabaster">
                  {project.year}
                </span>
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-[0.14em] text-slateMuted">
                  Status
                </span>
                <span className="mt-0.5 block text-limeAccent">
                  {project.status}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {linkedPubs.length > 0 && (
                <a
                  href="#citation"
                  className="inline-flex items-center gap-1.5 border border-limeAccent/50 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-limeAccent transition-colors hover:border-limeAccent hover:bg-limeAccent/10"
                >
                  <span>Cite · BibTeX</span>
                </a>
              )}
              {project.links.map((l) => {
                const external = l.href.startsWith("http");
                return external ? (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 border border-alabaster/20 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-alabaster transition-colors hover:border-limeAccent hover:text-limeAccent"
                  >
                    <span>{l.label}</span>
                    <ArrowUpRight size={12} />
                  </a>
                ) : (
                  <Link
                    key={l.label}
                    href={l.href}
                    className="inline-flex items-center gap-1.5 border border-alabaster/20 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-alabaster transition-colors hover:border-limeAccent hover:text-limeAccent"
                  >
                    <span>{l.label}</span>
                    <ArrowUpRight size={12} />
                  </Link>
                );
              })}
            </div>
          </div>
        </header>

        {/* Key Quantitative / Structural Metrics */}
        <dl className="grid grid-cols-1 border-b border-alabaster/12 sm:grid-cols-3">
          {project.metrics.map((metric, idx) => (
            <div
              key={metric.label}
              className={`py-6 ${
                idx < 2 ? "sm:border-r sm:border-alabaster/12 sm:pr-6" : ""
              } ${idx > 0 ? "border-t border-alabaster/12 sm:border-t-0 sm:pl-6" : ""}`}
            >
              <dt className="mono-label text-slateMuted">{metric.label}</dt>
              <dd className="mt-2 font-display text-2xl text-alabaster">
                {metric.value}
              </dd>
              <dd className="mt-1 text-xs leading-relaxed text-slateMuted">
                {metric.detail}
              </dd>
            </div>
          ))}
        </dl>

        {/* Detailed Research Sections */}
        <div className="space-y-14 pt-12">
          {/* 01 Overview */}
          <section className="grid grid-cols-1 gap-4 md:grid-cols-12">
            <h2 className="mono-label text-slateMuted md:col-span-3 md:pt-1">
              01 / Overview
            </h2>
            <p className="text-[15px] leading-[1.8] text-alabaster/85 md:col-span-9">
              {project.overview}
            </p>
          </section>

          {/* 02 Research Problem */}
          <section className="grid grid-cols-1 gap-4 border-t border-alabaster/10 pt-10 md:grid-cols-12">
            <h2 className="mono-label text-slateMuted md:col-span-3 md:pt-1">
              02 / Research Problem
            </h2>
            <div className="border-l border-limeAccent/55 pl-5 md:col-span-9">
              <p className="text-[15px] leading-[1.8] text-alabaster/90">
                {project.researchProblem}
              </p>
            </div>
          </section>

          {/* 03 Methodology */}
          <section className="grid grid-cols-1 gap-4 border-t border-alabaster/10 pt-10 md:grid-cols-12">
            <h2 className="mono-label text-slateMuted md:col-span-3 md:pt-1">
              03 / Methodology
            </h2>
            <ol className="space-y-4 md:col-span-9">
              {project.methodology.map((item, i) => (
                <li key={i} className="flex items-start gap-3.5 text-[15px] leading-relaxed text-alabaster/85">
                  <span className="mt-0.5 font-mono text-xs text-limeAccent">
                    0{i + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </section>

          {/* 04 Visual Material — Bespoke Interactive Technical Diagram Plate */}
          <section className="border-t border-alabaster/10 pt-10">
            <h2 className="mono-label mb-5 text-slateMuted">
              04 / Visual Material & Architecture
            </h2>
            <ProjectVisualPlate plate={project.visualPlate} />
          </section>

          {/* 05 Personal Contribution */}
          <section className="grid grid-cols-1 gap-4 border-t border-alabaster/10 pt-10 md:grid-cols-12">
            <h2 className="mono-label text-slateMuted md:col-span-3 md:pt-1">
              05 / Personal Contribution
            </h2>
            <ul className="space-y-3.5 md:col-span-9">
              {project.personalContribution.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-[15px] leading-relaxed text-alabaster/85"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-limeAccent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 06 Technologies */}
          <section className="grid grid-cols-1 gap-4 border-t border-alabaster/10 pt-10 md:grid-cols-12">
            <h2 className="mono-label text-slateMuted md:col-span-3 md:pt-1">
              06 / Technologies
            </h2>
            <div className="flex flex-wrap gap-2.5 md:col-span-9">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="border border-alabaster/15 px-3 py-1.5 font-mono text-xs text-alabaster/85"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* 07 Results */}
          <section className="grid grid-cols-1 gap-4 border-t border-alabaster/10 pt-10 md:grid-cols-12">
            <h2 className="mono-label text-slateMuted md:col-span-3 md:pt-1">
              07 / Results & Insights
            </h2>
            <p className="text-[15px] leading-[1.8] text-alabaster/85 md:col-span-9">
              {project.resultsSummary}
            </p>
          </section>

          {/* Citation & BibTeX (when linked publications exist, e.g. SignIT) */}
          {linkedPubs.length > 0 && (
            <section
              id="citation"
              className="scroll-mt-28 grid grid-cols-1 gap-4 border-t border-alabaster/10 pt-10 md:grid-cols-12"
            >
              <div className="md:col-span-3 md:pt-1">
                <h2 className="mono-label text-limeAccent">
                  08 / Citation
                </h2>
                <p className="mt-2 text-xs leading-relaxed text-slateMuted">
                  If you use {project.title} in your research, please cite the
                  official paper.
                </p>
              </div>
              <div className="space-y-4 md:col-span-9">
                {linkedPubs.map((pub) => (
                  <CitationBox
                    key={pub.id}
                    bibtex={pub.bibtex}
                    plainText={pub.plainCitation}
                    doi={pub.doi}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Associated Publications & Directions */}
          <section className="grid grid-cols-1 gap-6 border-t border-alabaster/10 pt-10 md:grid-cols-12">
            <h2 className="mono-label text-slateMuted md:col-span-3 md:pt-1">
              {linkedPubs.length > 0 ? "09 / Connections" : "08 / Connections"}
            </h2>
            <div className="space-y-6 md:col-span-9">
              {linkedPubs.length > 0 && (
                <div>
                  <h3 className="font-mono text-[10px] uppercase tracking-[0.14em] text-slateMuted">
                    Associated Publications
                  </h3>
                  <div className="mt-3 divide-y divide-alabaster/10 border-t border-alabaster/10">
                    {linkedPubs.map((pub) => (
                      <Link
                        key={pub.id}
                        href={`/publications#${pub.id}`}
                        className="group flex items-start justify-between gap-4 py-3.5"
                      >
                        <div>
                          <span className="font-mono text-[10px] text-limeAccent">
                            {pub.venueShort} · {pub.year}
                          </span>
                          <p className="mt-1 text-sm text-alabaster transition-colors group-hover:text-limeAccent">
                            {pub.title}
                          </p>
                        </div>
                        <ArrowUpRight
                          size={14}
                          className="mt-1 shrink-0 text-slateMuted group-hover:text-limeAccent"
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 className="font-mono text-[10px] uppercase tracking-[0.14em] text-slateMuted">
                  Research Directions
                </h3>
                <div className="mt-3 flex flex-wrap gap-3">
                  {linkedTopics.map((topic) => (
                    <Link
                      key={topic.id}
                      href={`/research#${topic.id}`}
                      className="inline-flex items-center gap-1.5 border border-alabaster/15 px-3 py-1.5 font-mono text-[11px] text-alabaster/80 transition-colors hover:border-limeAccent hover:text-limeAccent"
                    >
                      <span>{topic.title}</span>
                      <ArrowUpRight size={11} />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Next / Previous Project Navigation */}
        <footer className="mt-20 border-t border-alabaster/15 pt-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href={`/projects/${prevProject.slug}`}
              className="group inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.12em] text-slateMuted transition-colors hover:text-alabaster"
            >
              <ArrowLeft
                size={13}
                className="transition-transform group-hover:-translate-x-0.5"
              />
              <span>
                {prevProject.index} / {prevProject.shortTitle}
              </span>
            </Link>

            <Link
              href={`/projects/${nextProject.slug}`}
              className="group inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.12em] text-alabaster transition-colors hover:text-limeAccent"
            >
              <span>
                {nextProject.index} / {nextProject.shortTitle}
              </span>
              <ArrowRight
                size={13}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
