export type InterestNodeKind = "topic" | "project" | "publication";

export interface InterestNode {
  id: string;
  label: string;
  shortLabel: string;
  kind: InterestNodeKind;
  x: number; // normalized SVG coordinates in 1000 x 620 viewBox
  y: number;
  summary: string;
  href: string;
  meta: string;
}

export interface InterestEdge {
  source: string;
  target: string;
  relation: string;
}

export const INTEREST_NODES: InterestNode[] = [
  // Core Research Topics
  {
    id: "topic-egocentric",
    label: "Egocentric Vision",
    shortLabel: "EGOCENTRIC",
    kind: "topic",
    x: 265,
    y: 165,
    summary:
      "First-person perception of hand-object interaction, wearable headsets, and embodied assistive guidance.",
    href: "/research#egocentric-vision",
    meta: "RESEARCH DIRECTION · 01",
  },
  {
    id: "topic-multimodal",
    label: "Multimodal Learning",
    shortLabel: "MULTIMODAL",
    kind: "topic",
    x: 535,
    y: 135,
    summary:
      "Cross-modal alignment across RGB video, 2D skeletal kinematics, video restoration, and spoken language.",
    href: "/research#multimodal-learning",
    meta: "RESEARCH DIRECTION · 02",
  },
  {
    id: "topic-graphs",
    label: "Scene & Task Graphs",
    shortLabel: "SCENE / TASK GRAPHS",
    kind: "topic",
    x: 205,
    y: 365,
    summary:
      "Structured relational modeling of object states, spatial contacts, and causal step preconditions.",
    href: "/research#scene-task-graphs",
    meta: "RESEARCH DIRECTION · 03",
  },
  {
    id: "topic-activity",
    label: "Human Activity Understanding",
    shortLabel: "HUMAN ACTIVITY",
    kind: "topic",
    x: 715,
    y: 265,
    summary:
      "Fine-grained sign language articulation, hand tracking, and goal-directed behavioral modeling.",
    href: "/research#human-activity-understanding",
    meta: "RESEARCH DIRECTION · 04",
  },
  {
    id: "topic-medical",
    label: "Medical Procedure Understanding",
    shortLabel: "MEDICAL PROCEDURES",
    kind: "topic",
    x: 315,
    y: 525,
    summary:
      "Interpretable phase recognition, safety preconditions, and assistive workflow verification in clinical settings.",
    href: "/research#medical-procedure-understanding",
    meta: "RESEARCH DIRECTION · 05",
  },
  {
    id: "topic-fusion",
    label: "Multimodal Sensor Fusion",
    shortLabel: "SENSOR FUSION",
    kind: "topic",
    x: 615,
    y: 495,
    summary:
      "Synchronizing wearable visual streams, kinematics, audio feedback, and real-time distributed telemetry.",
    href: "/research#multimodal-sensor-fusion",
    meta: "RESEARCH DIRECTION · 06",
  },

  // Public Projects (SignIT + GitHub Repos)
  {
    id: "proj-signit",
    label: "SignIT",
    shortLabel: "SIGNIT",
    kind: "project",
    x: 805,
    y: 140,
    summary:
      "644-video Italian Sign Language (LIS) multimodal dataset pairing RGB video with MediaPipe 2D keypoints across 94 classes.",
    href: "/projects/signit",
    meta: "PROJECT · 01",
  },
  {
    id: "proj-echolens",
    label: "EchoLens",
    shortLabel: "ECHOLENS",
    kind: "project",
    x: 395,
    y: 285,
    summary:
      "Meta Quest 3 Mixed Reality app streaming passthrough video to a YOLOv8 Python server with real-time TTS feedback.",
    href: "/projects/echolens",
    meta: "PROJECT · 02",
  },
  {
    id: "proj-phoenix",
    label: "Project Phoenix Vision",
    shortLabel: "PHOENIX VISION",
    kind: "project",
    x: 410,
    y: 78,
    summary:
      "Degraded video restoration benchmark comparing temporal interpolation, Fourier denoising, VDSR, and BasicVSR++ Lite.",
    href: "/projects/project-phoenix-vision",
    meta: "PROJECT · 03",
  },
  {
    id: "proj-eventhorizon",
    label: "EventHorizon Track 8",
    shortLabel: "EVENTHORIZON",
    kind: "project",
    x: 675,
    y: 385,
    summary:
      "Reproducible PyTorch / CUDA deep learning experimentation scaffold with YAML configs and TensorBoard evaluation.",
    href: "/projects/eventhorizon-track8",
    meta: "PROJECT · 04",
  },
  {
    id: "proj-tap",
    label: "TAP_AM & SpokeLizard",
    shortLabel: "SPOKELIZARD TAP",
    kind: "project",
    x: 845,
    y: 485,
    summary:
      "Real-time distributed ML streaming pipeline built with Logstash, Apache Kafka, Spark, Elasticsearch, and Kibana.",
    href: "/projects/tap-am",
    meta: "PROJECT · 05–06",
  },

  // Publications
  {
    id: "pub-signit",
    label: "SignIT (VISAPP 2026)",
    shortLabel: "VISAPP '26 · SIGNIT",
    kind: "publication",
    x: 890,
    y: 285,
    summary:
      "Micieli, Farinella, Ragusa — Comprehensive dataset and multimodal analysis for LIS recognition (arXiv:2512.14489).",
    href: "/publications#signit-visapp-2026",
    meta: "PUBLICATION · 2026",
  },
  {
    id: "pub-egoextra",
    label: "Ego-EXTRA (WACV / arXiv)",
    shortLabel: "WACV · EGO-EXTRA",
    kind: "publication",
    x: 130,
    y: 225,
    summary:
      "IPLab UNICT benchmark paper introducing Ego-EXTRA for expert-trainee egocentric assistance (arXiv:2512.13238).",
    href: "/publications#egoextra-wacv",
    meta: "LAB ECOSYSTEM · 2026",
  },
];

export const INTEREST_EDGES: InterestEdge[] = [
  // Topic <-> Topic
  { source: "topic-egocentric", target: "topic-multimodal", relation: "visual-linguistic grounding" },
  { source: "topic-egocentric", target: "topic-graphs", relation: "spatial workspace states" },
  { source: "topic-graphs", target: "topic-medical", relation: "clinical workflow verification" },
  { source: "topic-multimodal", target: "topic-activity", relation: "articulated motion semantics" },
  { source: "topic-multimodal", target: "topic-fusion", relation: "cross-stream synchronization" },
  { source: "topic-medical", target: "topic-fusion", relation: "resilient wearable monitoring" },

  // Projects <-> Topics
  { source: "proj-signit", target: "topic-multimodal", relation: "RGB + keypoint fusion" },
  { source: "proj-signit", target: "topic-activity", relation: "94-class LIS recognition" },
  { source: "proj-signit", target: "topic-fusion", relation: "pose-visual alignment" },

  { source: "proj-echolens", target: "topic-egocentric", relation: "Quest 3 passthrough FOV" },
  { source: "proj-echolens", target: "topic-graphs", relation: "spatial anchors & scene" },
  { source: "proj-echolens", target: "topic-fusion", relation: "YOLOv8 + TTS audio loop" },
  { source: "proj-echolens", target: "topic-activity", relation: "pinch hand tracking" },

  { source: "proj-phoenix", target: "topic-multimodal", relation: "neural video super-res" },
  { source: "proj-phoenix", target: "topic-egocentric", relation: "degraded stream recovery" },

  { source: "proj-eventhorizon", target: "topic-multimodal", relation: "PyTorch DL ablations" },
  { source: "proj-eventhorizon", target: "topic-activity", relation: "reproducible training" },

  { source: "proj-tap", target: "topic-fusion", relation: "Kafka–Spark real-time ML" },

  // Publications <-> Projects & Topics
  { source: "pub-signit", target: "proj-signit", relation: "primary benchmark paper" },
  { source: "pub-signit", target: "topic-activity", relation: "VISAPP 2026 evaluation" },
  { source: "pub-egoextra", target: "topic-egocentric", relation: "IPLab egocentric context" },
  { source: "pub-egoextra", target: "topic-graphs", relation: "procedural assistance" },
];
