"use client";

import React, { useState } from "react";
import { ProjectVisualPlate as VisualPlateData } from "@/data/projects";

export function ProjectVisualPlate({ plate }: { plate: VisualPlateData }) {
  return (
    <figure className="border border-alabaster/15 bg-surface/80 p-5 md:p-7">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-alabaster/10 pb-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-limeAccent">
          {plate.code}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-slateMuted">
          {plate.title}
        </span>
      </div>

      <div className="w-full overflow-x-auto">
        {plate.diagramType === "signit-skeleton" && <SignItSkeletonDiagram />}
        {plate.diagramType === "echolens-ar" && <EchoLensDiagram />}
        {plate.diagramType === "phoenix-restoration" && <PhoenixDiagram />}
        {plate.diagramType === "eventhorizon-dl" && <EventHorizonDiagram />}
        {plate.diagramType === "spokelizard-stream" && <SpokeLizardDiagram />}
        {plate.diagramType === "youtube-api" && <YouTubeApiDiagram />}
      </div>

      <figcaption className="mt-4 border-t border-alabaster/10 pt-3 text-xs leading-relaxed text-slateMuted">
        {plate.caption}
      </figcaption>
    </figure>
  );
}

function SignItSkeletonDiagram() {
  return (
    <svg
      viewBox="0 0 720 220"
      className="h-auto w-full min-w-[520px]"
      role="img"
      aria-label="SignIT dual-stream RGB and 2D skeletal keypoint fusion schematic"
    >
      <text
        x="20"
        y="24"
        fill="#858991"
        fontSize="9"
        fontFamily="var(--font-ibm-plex-mono)"
      >
        STREAM A · TEMPORAL RGB (644 CLIPS)
      </text>
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${20 + i * 24}, ${36 + i * 10})`}>
          <rect
            width="135"
            height="112"
            fill="#101114"
            stroke={
              i === 2 ? "rgba(233,231,223,0.4)" : "rgba(233,231,223,0.16)"
            }
          />
          <text
            x="8"
            y="16"
            fill="#858991"
            fontSize="8"
            fontFamily="var(--font-ibm-plex-mono)"
          >
            F_t+{i}
          </text>
        </g>
      ))}

      <text
        x="245"
        y="24"
        fill="#B9E66A"
        fontSize="9"
        fontFamily="var(--font-ibm-plex-mono)"
      >
        STREAM B · MEDIAPIPE 2D KEYPOINTS
      </text>
      <rect
        x="245"
        y="36"
        width="205"
        height="152"
        fill="#101114"
        stroke="rgba(185,230,106,0.35)"
      />
      <g stroke="rgba(233,231,223,0.45)" strokeWidth="1.2" fill="none">
        <ellipse cx="348" cy="76" rx="16" ry="20" strokeDasharray="2 2" />
        <line x1="348" y1="96" x2="348" y2="108" />
        <line x1="306" y1="112" x2="390" y2="112" />
        <line x1="306" y1="112" x2="314" y2="176" />
        <line x1="390" y1="112" x2="382" y2="176" />
        <polyline points="306,112 284,142 308,130" stroke="#B9E66A" />
        <polyline points="390,112 412,138 386,118" stroke="#B9E66A" />
      </g>
      {[
        [342, 72],
        [354, 72],
        [348, 82],
        [306, 112],
        [390, 112],
        [284, 142],
        [412, 138],
        [308, 130],
        [314, 122],
        [320, 126],
        [386, 118],
        [380, 110],
        [374, 115],
      ].map(([cx, cy], idx) => (
        <circle
          key={idx}
          cx={cx}
          cy={cy}
          r={idx >= 7 ? 2.6 : 2.1}
          fill={idx >= 7 ? "#B9E66A" : "#E9E7DF"}
        />
      ))}

      <line
        x1="450"
        y1="112"
        x2="495"
        y2="112"
        stroke="rgba(233,231,223,0.35)"
      />
      <polygon points="495,108 503,112 495,116" fill="#B9E66A" />

      <rect
        x="508"
        y="46"
        width="192"
        height="132"
        fill="#101114"
        stroke="rgba(233,231,223,0.22)"
      />
      <text
        x="522"
        y="68"
        fill="#E9E7DF"
        fontSize="10"
        fontFamily="var(--font-ibm-plex-mono)"
      >
        BENCHMARK SUITE
      </text>
      <text
        x="522"
        y="92"
        fill="#858991"
        fontSize="9"
        fontFamily="var(--font-inter)"
      >
        • K-NN &amp; MLP (Pose Features)
      </text>
      <text
        x="522"
        y="112"
        fill="#858991"
        fontSize="9"
        fontFamily="var(--font-inter)"
      >
        • ResNet18 / CNN (RGB Frames)
      </text>
      <text
        x="522"
        y="132"
        fill="#B9E66A"
        fontSize="9"
        fontFamily="var(--font-inter)"
      >
        • Spatial-Temporal Multimodal
      </text>
      <line
        x1="522"
        y1="146"
        x2="684"
        y2="146"
        stroke="rgba(233,231,223,0.12)"
      />
      <text
        x="522"
        y="164"
        fill="#E9E7DF"
        fontSize="9.5"
        fontFamily="var(--font-ibm-plex-mono)"
      >
        94 LIS CLASSES · 5 GROUPS
      </text>
    </svg>
  );
}

function EchoLensDiagram() {
  const [stage, setStage] = useState(1);
  const stages = [
    {
      title: "META QUEST 3 CLIENT (UNITY / C#)",
      detail: "Passthrough FOV · Pinch Spatial Anchors · HoloFrustum",
    },
    {
      title: "UDP DISCOVERY + WEBSOCKET STREAM",
      detail: "Zero-config LAN handshake & low-latency frame transport",
    },
    {
      title: "PYTHON AI SERVER (YOLOv8 + SCENE)",
      detail: "Real-time object detection · brightness, contrast & clarity",
    },
    {
      title: "ASYNCHRONOUS TTS VOICE FEEDBACK",
      detail: "Immediate spoken spatial descriptions via VoiceManager.cs",
    },
  ];

  return (
    <div className="space-y-3">
      <svg
        viewBox="0 0 720 205"
        className="h-auto w-full min-w-[520px]"
        role="img"
        aria-label="EchoLens Meta Quest 3 to Python YOLOv8 and TTS architecture"
      >
        {[
          { x: 18, w: 158, code: "01 · QUEST 3", sub: "Passthrough + Hands" },
          { x: 196, w: 152, code: "02 · NETWORK", sub: "UDP + WebSocket" },
          { x: 368, w: 162, code: "03 · AI SERVER", sub: "YOLOv8 + Clarity" },
          { x: 550, w: 152, code: "04 · AUDIO TTS", sub: "Spoken Guidance" },
        ].map((box, idx) => {
          const active = idx === stage;
          return (
            <g
              key={box.code}
              className="cursor-pointer"
              onClick={() => setStage(idx)}
            >
              <rect
                x={box.x}
                y="42"
                width={box.w}
                height="96"
                fill={active ? "rgba(185,230,106,0.08)" : "#101114"}
                stroke={active ? "#B9E66A" : "rgba(233,231,223,0.2)"}
                strokeWidth={active ? 1.5 : 1}
              />
              <text
                x={box.x + 12}
                y="76"
                fill={active ? "#B9E66A" : "#E9E7DF"}
                fontSize="9.5"
                fontFamily="var(--font-ibm-plex-mono)"
              >
                {box.code}
              </text>
              <text
                x={box.x + 12}
                y="102"
                fill="#858991"
                fontSize="9.5"
                fontFamily="var(--font-inter)"
              >
                {box.sub}
              </text>
              {idx < 3 && (
                <>
                  <line
                    x1={box.x + box.w}
                    y1="90"
                    x2={box.x + box.w + 16}
                    y2="90"
                    stroke="rgba(233,231,223,0.35)"
                  />
                  <polygon
                    points={`${box.x + box.w + 15},86 ${box.x + box.w + 21},90 ${box.x + box.w + 15},94`}
                    fill="#B9E66A"
                  />
                </>
              )}
            </g>
          );
        })}

        {/* Return audio feedback arc */}
        <path
          d="M 626 138 L 626 172 L 96 172 L 96 142"
          fill="none"
          stroke="rgba(185,230,106,0.45)"
          strokeDasharray="4 4"
        />
        <polygon points="92,145 96,138 100,145" fill="#B9E66A" />
        <text
          x="360"
          y="165"
          textAnchor="middle"
          fill="#858991"
          fontSize="8.5"
          fontFamily="var(--font-ibm-plex-mono)"
        >
          CLOSED-LOOP REAL-TIME SPATIAL AUDIO FEEDBACK
        </text>
      </svg>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-alabaster/10 pt-3 font-mono text-[11px]">
        <span className="text-limeAccent">{stages[stage].title}</span>
        <span className="text-alabaster/80">{stages[stage].detail}</span>
      </div>
    </div>
  );
}

function PhoenixDiagram() {
  const [selected, setSelected] = useState(2);
  const methods = [
    { name: "Bicubic", psnr: "22.80 dB", ssim: "0.669" },
    { name: "VDSR", psnr: "22.80 dB", ssim: "0.669" },
    { name: "BasicVSR++ Lite", psnr: "22.72 dB", ssim: "0.669" },
    { name: "BasicVSR Lite", psnr: "22.71 dB", ssim: "0.668" },
  ];

  return (
    <div className="space-y-3">
      <svg
        viewBox="0 0 720 200"
        className="h-auto w-full min-w-[520px]"
        role="img"
        aria-label="Project Phoenix Vision video restoration and super-resolution pipeline"
      >
        {[
          { x: 16, label: "SOURCE", sub: "Ground Truth" },
          { x: 152, label: "DEGRADE", sub: "Bicubic / Real" },
          { x: 288, label: "INTERPOLATE", sub: "Temporal Frames" },
          { x: 424, label: "DENOISE + VSR", sub: "Fourier / BasicVSR++" },
          { x: 560, label: "EVALUATE", sub: "PSNR & SSIM" },
        ].map((step, i) => (
          <g key={step.label}>
            <rect
              x={step.x}
              y="26"
              width="120"
              height="68"
              fill="#101114"
              stroke={i === 3 ? "#B9E66A" : "rgba(233,231,223,0.2)"}
            />
            <text
              x={step.x + 10}
              y="52"
              fill={i === 3 ? "#B9E66A" : "#E9E7DF"}
              fontSize="9"
              fontFamily="var(--font-ibm-plex-mono)"
            >
              {step.label}
            </text>
            <text
              x={step.x + 10}
              y="74"
              fill="#858991"
              fontSize="9"
              fontFamily="var(--font-inter)"
            >
              {step.sub}
            </text>
            {i < 4 && (
              <line
                x1={step.x + 120}
                y1="60"
                x2={step.x + 136}
                y2="60"
                stroke="rgba(233,231,223,0.35)"
              />
            )}
          </g>
        ))}

        {/* Interactive benchmark comparison chips */}
        {methods.map((m, idx) => {
          const x = 16 + idx * 172;
          const active = idx === selected;
          return (
            <g
              key={m.name}
              className="cursor-pointer"
              onClick={() => setSelected(idx)}
            >
              <rect
                x={x}
                y="124"
                width="156"
                height="54"
                fill={active ? "rgba(185,230,106,0.08)" : "#101114"}
                stroke={active ? "#B9E66A" : "rgba(233,231,223,0.14)"}
              />
              <text
                x={x + 10}
                y="144"
                fill={active ? "#B9E66A" : "#E9E7DF"}
                fontSize="9.5"
                fontFamily="var(--font-ibm-plex-mono)"
              >
                {m.name}
              </text>
              <text
                x={x + 10}
                y="164"
                fill="#858991"
                fontSize="9"
                fontFamily="var(--font-ibm-plex-mono)"
              >
                {m.psnr} · SSIM {m.ssim}
              </text>
            </g>
          );
        })}
      </svg>
      <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-slateMuted">
        Logged from benchmark_results.csv — click any model block to highlight metrics.
      </p>
    </div>
  );
}

function EventHorizonDiagram() {
  const modules = [
    { x: 24, y: 40, name: "src/datasets", desc: "Data loaders & splits" },
    { x: 204, y: 40, name: "src/models", desc: "Baseline & improved nets" },
    { x: 384, y: 40, name: "src/training", desc: "CUDA 11.8 · YAML configs" },
    { x: 564, y: 40, name: "src/evaluation", desc: "Metrics & TensorBoard" },
  ];

  return (
    <svg
      viewBox="0 0 720 175"
      className="h-auto w-full min-w-[520px]"
      role="img"
      aria-label="EventHorizon Track 8 reproducible PyTorch deep learning workflow"
    >
      {modules.map((m, idx) => (
        <g key={m.name}>
          <rect
            x={m.x}
            y={m.y}
            width="154"
            height="84"
            fill="#101114"
            stroke={idx === 2 ? "#B9E66A" : "rgba(233,231,223,0.2)"}
          />
          <text
            x={m.x + 12}
            y={m.y + 32}
            fill={idx === 2 ? "#B9E66A" : "#E9E7DF"}
            fontSize="9.5"
            fontFamily="var(--font-ibm-plex-mono)"
          >
            {m.name}
          </text>
          <text
            x={m.x + 12}
            y={m.y + 56}
            fill="#858991"
            fontSize="9"
            fontFamily="var(--font-inter)"
          >
            {m.desc}
          </text>
          {idx < 3 && (
            <line
              x1={m.x + 154}
              y1={m.y + 42}
              x2={m.x + 180}
              y2={m.y + 42}
              stroke="rgba(233,231,223,0.32)"
            />
          )}
        </g>
      ))}
      <text
        x="24"
        y="156"
        fill="#858991"
        fontSize="9"
        fontFamily="var(--font-ibm-plex-mono)"
      >
        ENVIRONMENT: CONDA PYTHON 3.10 · PYTORCH · TORCHVISION · TORCHAUDIO · REPRODUCIBLE REPORT.MD
      </text>
    </svg>
  );
}

function SpokeLizardDiagram() {
  const nodes = [
    { x: 16, label: "SPOKELIZARD", sub: "Game API" },
    { x: 132, label: "LOGSTASH", sub: "Transform" },
    { x: 248, label: "KAFKA", sub: "Event Stream" },
    { x: 364, label: "SPARK ML", sub: "Analytics" },
    { x: 480, label: "ELASTIC", sub: "Indexing" },
    { x: 596, label: "KIBANA", sub: "Dashboards" },
  ];

  return (
    <svg
      viewBox="0 0 720 165"
      className="h-auto w-full min-w-[520px]"
      role="img"
      aria-label="SpokeLizard TAP real-time streaming pipeline with Kafka, Spark, and Elastic Stack"
    >
      {nodes.map((n, i) => (
        <g key={n.label}>
          <rect
            x={n.x}
            y="42"
            width="102"
            height="68"
            fill="#101114"
            stroke={i === 2 || i === 3 ? "#B9E66A" : "rgba(233,231,223,0.2)"}
          />
          <text
            x={n.x + 10}
            y="68"
            fill={i === 2 || i === 3 ? "#B9E66A" : "#E9E7DF"}
            fontSize="8.5"
            fontFamily="var(--font-ibm-plex-mono)"
          >
            {n.label}
          </text>
          <text
            x={n.x + 10}
            y="88"
            fill="#858991"
            fontSize="8.5"
            fontFamily="var(--font-inter)"
          >
            {n.sub}
          </text>
          {i < nodes.length - 1 && (
            <line
              x1={n.x + 102}
              y1="76"
              x2={n.x + 116}
              y2="76"
              stroke="rgba(233,231,223,0.35)"
            />
          )}
        </g>
      ))}
      <text
        x="16"
        y="142"
        fill="#858991"
        fontSize="9"
        fontFamily="var(--font-ibm-plex-mono)"
      >
        ORCHESTRATION: DOCKER COMPOSE · REAL-TIME MULTIPLAYER GAME TELEMETRY &amp; ML PREDICTIONS
      </text>
    </svg>
  );
}

function YouTubeApiDiagram() {
  return (
    <svg
      viewBox="0 0 720 165"
      className="h-auto w-full min-w-[520px]"
      role="img"
      aria-label="YouTube Data API and yt-dlp data acquisition pipeline"
    >
      <rect
        x="20"
        y="36"
        width="195"
        height="88"
        fill="#101114"
        stroke="rgba(233,231,223,0.2)"
      />
      <text
        x="34"
        y="62"
        fill="#E9E7DF"
        fontSize="9.5"
        fontFamily="var(--font-ibm-plex-mono)"
      >
        YOUTUBE DATA API v3
      </text>
      <text
        x="34"
        y="84"
        fill="#858991"
        fontSize="9"
        fontFamily="var(--font-inter)"
      >
        Videos · Channels · Comments
      </text>
      <text
        x="34"
        y="102"
        fill="#858991"
        fontSize="9"
        fontFamily="var(--font-inter)"
      >
        Search · Statistics · Playlists
      </text>

      <line
        x1="215"
        y1="80"
        x2="262"
        y2="80"
        stroke="rgba(233,231,223,0.35)"
      />

      <rect
        x="262"
        y="36"
        width="195"
        height="88"
        fill="#101114"
        stroke="#B9E66A"
      />
      <text
        x="276"
        y="62"
        fill="#B9E66A"
        fontSize="9.5"
        fontFamily="var(--font-ibm-plex-mono)"
      >
        JUPYTER + YT-DLP
      </text>
      <text
        x="276"
        y="84"
        fill="#858991"
        fontSize="9"
        fontFamily="var(--font-inter)"
      >
        Programmatic media acquisition
      </text>
      <text
        x="276"
        y="102"
        fill="#858991"
        fontSize="9"
        fontFamily="var(--font-inter)"
      >
        JSON parsing &amp; dataset prep
      </text>

      <line
        x1="457"
        y1="80"
        x2="504"
        y2="80"
        stroke="rgba(233,231,223,0.35)"
      />

      <rect
        x="504"
        y="36"
        width="195"
        height="88"
        fill="#101114"
        stroke="rgba(233,231,223,0.2)"
      />
      <text
        x="518"
        y="62"
        fill="#E9E7DF"
        fontSize="9.5"
        fontFamily="var(--font-ibm-plex-mono)"
      >
        STRUCTURED OUTPUT
      </text>
      <text
        x="518"
        y="84"
        fill="#858991"
        fontSize="9"
        fontFamily="var(--font-inter)"
      >
        HTML Guides &amp; Analytics
      </text>
      <text
        x="518"
        y="102"
        fill="#858991"
        fontSize="9"
        fontFamily="var(--font-inter)"
      >
        Curated video metadata tables
      </text>
    </svg>
  );
}
