"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  INTEREST_EDGES,
  INTEREST_NODES,
  InterestNode,
  InterestNodeKind,
} from "@/data/interests";

type LayerFilter = "all" | InterestNodeKind;

const KIND_STYLES: Record<
  InterestNodeKind,
  { label: string; stroke: string; fill: string; radius: number }
> = {
  topic: {
    label: "Research Topic",
    stroke: "#E9E7DF",
    fill: "#101114",
    radius: 16,
  },
  project: {
    label: "Project",
    stroke: "#B9E66A",
    fill: "#151914",
    radius: 13,
  },
  publication: {
    label: "Publication",
    stroke: "#858991",
    fill: "#14161B",
    radius: 10,
  },
};

export function InterestsNetwork() {
  const [selectedId, setSelectedId] = useState<string>("topic-egocentric");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [layer, setLayer] = useState<LayerFilter>("all");

  const activeId = hoveredId ?? selectedId;

  const nodeMap = useMemo(() => {
    const map = new Map<string, InterestNode>();
    INTEREST_NODES.forEach((n) => map.set(n.id, n));
    return map;
  }, []);

  // Compute 1-hop neighborhood of active node
  const neighborhood = useMemo(() => {
    const connectedIds = new Set<string>([activeId]);
    const connectedEdges: { other: InterestNode; relation: string }[] = [];

    INTEREST_EDGES.forEach((edge) => {
      if (edge.source === activeId) {
        connectedIds.add(edge.target);
        const other = nodeMap.get(edge.target);
        if (other) connectedEdges.push({ other, relation: edge.relation });
      } else if (edge.target === activeId) {
        connectedIds.add(edge.source);
        const other = nodeMap.get(edge.source);
        if (other) connectedEdges.push({ other, relation: edge.relation });
      }
    });

    return { connectedIds, connectedEdges };
  }, [activeId, nodeMap]);

  const activeNode = nodeMap.get(activeId) ?? INTEREST_NODES[0];

  const handleSelect = (id: string) => {
    setSelectedId(id);
  };

  return (
    <div className="space-y-8">
      {/* Layer Filter & Legend Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-alabaster/12 pb-5">
        <div
          role="tablist"
          aria-label="Filter interest network layers"
          className="flex flex-wrap items-center gap-5"
        >
          {(
            [
              { id: "all", label: "All Nodes (13)" },
              { id: "topic", label: "Topics (06)" },
              { id: "project", label: "Projects (05)" },
              { id: "publication", label: "Publications (02)" },
            ] as { id: LayerFilter; label: string }[]
          ).map((item) => {
            const active = layer === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setLayer(item.id)}
                className={`relative pb-1 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors ${
                  active
                    ? "text-alabaster"
                    : "text-slateMuted hover:text-alabaster/80"
                }`}
              >
                {item.label}
                {active && (
                  <span className="absolute inset-x-0 bottom-0 h-px bg-limeAccent" />
                )}
              </button>
            );
          })}
        </div>

        {/* Geometric Node Legend */}
        <div className="flex flex-wrap items-center gap-5 font-mono text-[10px] uppercase tracking-[0.12em] text-slateMuted">
          <span className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full border border-alabaster" />
            Topic
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rotate-45 border border-limeAccent" />
            Project
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-2 border border-slateMuted" />
            Publication
          </span>
        </div>
      </div>

      {/* Interactive Network Canvas + Node Inspector */}
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-12">
        {/* SVG Knowledge Graph */}
        <div className="border border-alabaster/12 bg-obsidian/80 p-3 backdrop-blur-[2px] md:p-5 xl:col-span-8">
          <svg
            viewBox="0 0 1000 620"
            className="h-auto w-full select-none"
            role="img"
            aria-label="Interactive graph connecting Alessia Micieli's research topics, projects, and publications"
          >
            {/* Subtle architectural coordinate hairlines */}
            <g stroke="rgba(233,231,223,0.045)" strokeWidth="1" fill="none">
              <circle cx="485" cy="310" r="140" strokeDasharray="3 6" />
              <circle cx="485" cy="310" r="270" strokeDasharray="3 6" />
              <line x1="485" y1="20" x2="485" y2="600" />
              <line x1="40" y1="310" x2="960" y2="310" />
            </g>

            {/* Relational Edges */}
            {INTEREST_EDGES.map((edge, idx) => {
              const src = nodeMap.get(edge.source);
              const tgt = nodeMap.get(edge.target);
              if (!src || !tgt) return null;

              const isIncident =
                edge.source === activeId || edge.target === activeId;
              const layerMatches =
                layer === "all" ||
                src.kind === layer ||
                tgt.kind === layer;

              const midX = (src.x + tgt.x) / 2;
              const midY = (src.y + tgt.y) / 2;

              return (
                <g key={idx}>
                  <line
                    x1={src.x}
                    y1={src.y}
                    x2={tgt.x}
                    y2={tgt.y}
                    stroke={
                      isIncident
                        ? "#B9E66A"
                        : "rgba(233, 231, 223, 0.2)"
                    }
                    strokeWidth={isIncident ? 1.5 : 0.85}
                    strokeOpacity={
                      !layerMatches ? 0.08 : isIncident ? 0.92 : 0.24
                    }
                    className="transition-all duration-300"
                  />
                  {isIncident && (
                    <g>
                      <rect
                        x={midX - 74}
                        y={midY - 10}
                        width="148"
                        height="18"
                        fill="#101114"
                        fillOpacity="0.92"
                      />
                      <text
                        x={midX}
                        y={midY + 2.5}
                        textAnchor="middle"
                        fill="#B9E66A"
                        fontSize="10"
                        fontFamily="var(--font-ibm-plex-mono)"
                      >
                        {edge.relation}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}

            {/* Interactive Nodes */}
            {INTEREST_NODES.map((node) => {
              const style = KIND_STYLES[node.kind];
              const isActive = node.id === activeId;
              const isNeighbor = neighborhood.connectedIds.has(node.id);
              const matchesLayer = layer === "all" || node.kind === layer;
              const dimmed =
                (!matchesLayer && !isActive) || (!isNeighbor && !isActive);

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  className="cursor-pointer outline-none"
                  tabIndex={0}
                  role="button"
                  aria-label={`${node.label} (${style.label})`}
                  onClick={() => handleSelect(node.id)}
                  onMouseEnter={() => setHoveredId(node.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onFocus={() => setHoveredId(node.id)}
                  onBlur={() => setHoveredId(null)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleSelect(node.id);
                    }
                  }}
                  opacity={dimmed ? 0.45 : 1}
                >
                  {/* Active halo ring */}
                  {isActive && (
                    <circle
                      r={style.radius + 9}
                      fill="none"
                      stroke="#B9E66A"
                      strokeWidth="1"
                      strokeDasharray="3 3"
                    />
                  )}

                  {/* Distinct geometric glyph per node kind */}
                  {node.kind === "topic" && (
                    <circle
                      r={style.radius}
                      fill={style.fill}
                      stroke={isActive ? "#B9E66A" : style.stroke}
                      strokeWidth={isActive ? 2 : 1.3}
                    />
                  )}
                  {node.kind === "project" && (
                    <rect
                      x={-style.radius * 0.78}
                      y={-style.radius * 0.78}
                      width={style.radius * 1.56}
                      height={style.radius * 1.56}
                      transform="rotate(45)"
                      fill={style.fill}
                      stroke={style.stroke}
                      strokeWidth={isActive ? 2.2 : 1.4}
                    />
                  )}
                  {node.kind === "publication" && (
                    <rect
                      x={-style.radius * 0.85}
                      y={-style.radius * 0.85}
                      width={style.radius * 1.7}
                      height={style.radius * 1.7}
                      fill={style.fill}
                      stroke={isActive ? "#B9E66A" : style.stroke}
                      strokeWidth={isActive ? 1.8 : 1.2}
                    />
                  )}

                  {/* Center pin */}
                  <circle
                    r="2.5"
                    fill={
                      isActive || node.kind === "project"
                        ? "#B9E66A"
                        : "#E9E7DF"
                    }
                  />

                  {/* Crisp Monospace Label */}
                  <text
                    y={style.radius + 18}
                    textAnchor="middle"
                    fill={isActive ? "#E9E7DF" : "#D4D5DA"}
                    fontSize={node.kind === "topic" ? "11.5" : "10.5"}
                    fontWeight={isActive ? "500" : "400"}
                    fontFamily="var(--font-ibm-plex-mono)"
                    letterSpacing="0.06em"
                  >
                    {node.shortLabel}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Editorial Node Inspector Panel */}
        <aside className="flex flex-col justify-between border border-alabaster/12 bg-obsidian/85 p-6 backdrop-blur-[2px] xl:col-span-4">
          <div>
            <div className="flex items-center justify-between border-b border-alabaster/10 pb-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-limeAccent">
                {activeNode.meta}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-slateMuted">
                {neighborhood.connectedEdges.length} LINKS
              </span>
            </div>

            <h2 className="mt-5 font-display text-2xl font-normal tracking-tight text-alabaster">
              {activeNode.label}
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-alabaster/80">
              {activeNode.summary}
            </p>

            {/* Connected Nodes List */}
            <div className="mt-7 border-t border-alabaster/10 pt-5">
              <h3 className="mono-label text-slateMuted">
                Connected Neighborhood
              </h3>
              <ul className="mt-3 divide-y divide-alabaster/10">
                {neighborhood.connectedEdges.map(({ other, relation }) => (
                  <li key={`${other.id}-${relation}`} className="py-2.5">
                    <button
                      type="button"
                      onClick={() => handleSelect(other.id)}
                      className="group flex w-full items-start justify-between gap-2 text-left"
                    >
                      <div>
                        <span className="block text-sm text-alabaster transition-colors group-hover:text-limeAccent">
                          {other.label}
                        </span>
                        <span className="font-mono text-[10px] text-slateMuted">
                          {relation}
                        </span>
                      </div>
                      <span className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-alabaster/45">
                        {other.kind}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t border-alabaster/12 pt-5">
            <Link
              href={activeNode.href}
              className="group inline-flex w-full items-center justify-between border border-alabaster/20 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-alabaster transition-colors hover:border-limeAccent hover:text-limeAccent"
            >
              <span>Inspect {activeNode.label}</span>
              <ArrowUpRight
                size={13}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
