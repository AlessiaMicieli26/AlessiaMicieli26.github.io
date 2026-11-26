export interface ProjectMetric {
  label: string;
  value: string;
  detail: string;
}

export interface ProjectVisualPlate {
  id: string;
  code: string;
  title: string;
  caption: string;
  diagramType:
    | "signit-skeleton"
    | "echolens-ar"
    | "phoenix-restoration"
    | "eventhorizon-dl"
    | "spokelizard-stream"
    | "youtube-api";
}

export interface Project {
  slug: string;
  index: string;
  title: string;
  shortTitle: string;
  year: string;
  status: string;
  domain: string;
  tagline: string;
  overview: string;
  researchProblem: string;
  methodology: string[];
  personalContribution: string[];
  technologies: string[];
  metrics: ProjectMetric[];
  resultsSummary: string;
  visualPlate: ProjectVisualPlate;
  relatedPublications: string[]; // publication ids
  relatedTopics: string[]; // research direction ids
  links: {
    label: string;
    href: string;
  }[];
}

export const PROJECTS: Project[] = [
  {
    slug: "signit",
    index: "01",
    title: "SignIT",
    shortTitle: "SignIT",
    year: "2024 — 2026",
    status: "Published · VISAPP 2026",
    domain: "Multimodal Learning · Italian Sign Language (LIS)",
    tagline:
      "A comprehensive multimodal dataset and skeletal-visual benchmark for Italian Sign Language (LIS) recognition.",
    overview:
      "SignIT addresses the scarcity of structured, high-quality multimodal benchmarks for Italian Sign Language (LIS). Co-authored at the University of Catania (LIVE@IPLab) and presented at VISAPP 2026, SignIT pairs 644 manually segmented videos (~3.33 hours) across 94 distinct sign classes and five macro-categories (Animals, Food, Colors, Emotions, Family) with frame-level 2D MediaPipe skeletal keypoints covering hands, face, and body — together with its public documentation portal (SignIT_Site).",
    researchProblem:
      "Sign languages convey meaning simultaneously through manual articulation (handshape, orientation, trajectory) and non-manual cues (facial expressions, head posture). Low-resource languages like LIS lack standardized multimodal datasets enabling controlled evaluation across pose-only baselines, appearance-based CNNs, and modern multimodal vision-language architectures.",
    methodology: [
      "Curated 644 manually segmented sign-instance clips across 94 LIS classes organized into five macro-categories with standardized train, validation, and test splits.",
      "Dual-modality data release pairing RGB video frames and CSV annotations with MediaPipe 2D skeletal keypoints extracted for hands, face, and upper body.",
      "Controlled benchmarking suite spanning K-Nearest Neighbors (K-NN) and MLP on normalized keypoints, convolutional encoders (e.g. ResNet18) on RGB frames, temporal models, and multimodal architectures.",
      "Public web release and dataset portal (SignIT_Site / fpv-iplab.github.io/SignIT) documenting splits, metrics (accuracy, precision, recall, F1-score), and reproducibility resources.",
    ],
    personalContribution: [
      "First author of the VISAPP 2026 paper and lead contributor on dataset curation, manual temporal segmentation, and multimodal experimental evaluation.",
      "Engineered the MediaPipe 2D keypoint extraction, normalization, and multimodal RGB-pose benchmarking workflow.",
      "Maintained the public project webpage (SignIT_Site) and dataset documentation for the research community.",
    ],
    technologies: [
      "Python",
      "PyTorch",
      "MediaPipe 2D Keypoints",
      "ResNet18 / CNNs",
      "Multimodal Fusion",
      "HTML / GitHub Pages",
    ],
    metrics: [
      {
        label: "Annotated Corpus",
        value: "644 Videos",
        detail: "3.33 hours across 94 LIS classes & 5 macro-categories",
      },
      {
        label: "Modalities",
        value: "RGB + 2D Pose",
        detail: "Aligned frames with MediaPipe hand, face & body keypoints",
      },
      {
        label: "Publication",
        value: "VISAPP '26",
        detail: "arXiv:2512.14489 · Public dataset & project site",
      },
    ],
    resultsSummary:
      "Comparative evaluations across keypoint-based, appearance-based, and multimodal models highlight how fusing articulated hand/body geometry with visual facial and contextual cues delivers stronger recognition reliability across LIS categories.",
    visualPlate: {
      id: "plate-signit",
      code: "FIG 01 · MULTIMODAL TOPOLOGY",
      title: "SignIT Dual-Stream RGB & Skeletal Landmark Alignment",
      caption:
        "Articulated 2D hand, facial, and torso MediaPipe keypoints synchronized temporally with RGB visual encoders across 94 LIS sign classes.",
      diagramType: "signit-skeleton",
    },
    relatedPublications: ["signit-visapp-2026"],
    relatedTopics: [
      "multimodal-learning",
      "human-activity-understanding",
      "multimodal-sensor-fusion",
    ],
    links: [
      { label: "Project Page", href: "https://fpv-iplab.github.io/SignIT/" },
      { label: "GitHub (SignIT_Site)", href: "https://github.com/AlessiaMicieli26/SignIT_Site" },
      { label: "arXiv:2512.14489", href: "https://arxiv.org/abs/2512.14489" },
      { label: "PDF Paper", href: "https://arxiv.org/pdf/2512.14489" },
    ],
  },
  {
    slug: "echolens",
    index: "02",
    title: "EchoLens",
    shortTitle: "EchoLens",
    year: "2025 — 2026",
    status: "Public Repository · MSc UNICT",
    domain: "Mixed Reality · Egocentric Assistive Vision",
    tagline:
      "Augmented reality that gives voice to space — an Oculus Meta Quest 3 application supporting visually impaired users.",
    overview:
      "Developed during the MSc in Computer Science at the University of Catania, EchoLens is a Mixed Reality wearable system for Oculus Meta Quest 3 that transforms first-person passthrough video streams into real-time spoken scene descriptions. Combining computer vision, spatial hand-tracking interaction, and asynchronous Text-to-Speech, EchoLens helps visually impaired users perceive surrounding objects and spatial landmarks.",
    researchProblem:
      "Wearable assistive tools for visually impaired individuals must deliver low-latency, intelligible environmental awareness directly from an unconstrained first-person viewpoint — handling rapid head movement, variable lighting, hands-free interaction, and seamless network communication between lightweight headset hardware and GPU inference backends.",
    methodology: [
      "Unity (C#) Mixed Reality client on Meta Quest 3 capturing live passthrough frames, managing holographic frustum overlays (HoloFrustum), hand tracking, and pinch-based Spatial Anchors.",
      "Zero-config automatic server discovery over local network via UDP broadcast (ServerDiscovery.cs) paired with low-latency WebSocket video streaming (Streaming.cs).",
      "Asynchronous Python inference backend running real-time YOLOv8 object detection alongside scene quality analysis (brightness, contrast, and clarity).",
      "Immediate vocal feedback pipeline (VoiceManager.cs) synthesizing structured environmental descriptions via Text-to-Speech without blocking visual capture.",
    ],
    personalContribution: [
      "Designed and implemented the end-to-end Meta Quest 3 Unity client architecture, hand-gesture spatial anchoring, UDP discovery, and WebSocket streaming modules.",
      "Built the Python YOLOv8 vision server, scene clarity analysis notebooks, and asynchronous audio feedback workflow.",
      "Authored the technical report documenting architectural decisions, latency behavior, and accessibility evaluation.",
    ],
    technologies: [
      "Unity / C#",
      "Meta Quest 3 Passthrough",
      "Python",
      "YOLOv8",
      "WebSockets & UDP",
      "Hand Tracking & TTS",
    ],
    metrics: [
      {
        label: "Target Device",
        value: "Quest 3",
        detail: "Wearable Mixed Reality passthrough & hand tracking",
      },
      {
        label: "Vision Engine",
        value: "YOLOv8",
        detail: "Real-time object detection + brightness/clarity analysis",
      },
      {
        label: "Interaction",
        value: "Pinch + TTS",
        detail: "Spatial Anchors & low-latency spoken feedback",
      },
    ],
    resultsSummary:
      "Demonstrated responsive end-to-end passthrough streaming and spoken environmental narration on Meta Quest 3, combining automatic LAN server discovery, pinch-anchored spatial memory, and asynchronous scene analysis.",
    visualPlate: {
      id: "plate-echolens",
      code: "FIG 02 · WEARABLE ARCHITECTURE",
      title: "EchoLens Quest 3 Passthrough to Spoken Scene Pipeline",
      caption:
        "Bidirectional low-latency architecture linking Meta Quest 3 passthrough capture, UDP/WebSocket streaming, YOLOv8 analysis, and TTS audio guidance.",
      diagramType: "echolens-ar",
    },
    relatedPublications: [],
    relatedTopics: [
      "egocentric-vision",
      "multimodal-sensor-fusion",
      "human-activity-understanding",
    ],
    links: [
      { label: "GitHub Repository", href: "https://github.com/AlessiaMicieli26/EchoLens" },
      {
        label: "Technical Report (PDF)",
        href: "https://github.com/AlessiaMicieli26/EchoLens/blob/main/Relazione_Micieli_Alessia_EchoLens.pdf",
      },
    ],
  },
  {
    slug: "project-phoenix-vision",
    index: "03",
    title: "Project Phoenix Vision",
    shortTitle: "Phoenix Vision",
    year: "2026",
    status: "Public Repository",
    domain: "Computer Vision · Video Restoration & Super-Resolution",
    tagline:
      "End-to-end restoration of degraded videos via temporal frame interpolation, Fourier denoising, and neural super-resolution.",
    overview:
      "Project Phoenix Vision is a modular Python computer vision benchmark for reconstructing degraded video sequences. The system simulates clean bicubic and realistic degradations on source footage, then compares classical interpolation, convolutional super-resolution (VDSR), recurrent video super-resolution variants (BasicVSR Lite & BasicVSR++ Lite), and Fourier-domain denoising under unified PSNR and SSIM evaluation.",
    researchProblem:
      "Real-world video streams often suffer from spatial downsampling, compression artifacts, noise, and dropped temporal detail. Evaluating restoration architectures fairly requires controlled degradation pipelines that isolate how temporal propagation, frequency-domain denoising, and neural upscaling impact perceptual and pixel-level fidelity.",
    methodology: [
      "Configurable video degradation generator (1_degradation.py, 1_degradation_v2.py) modeling bicubic downsampling and compound realistic artifacts.",
      "Temporal frame interpolation module (2_interpolation.py) recovering intermediate motion continuity prior to spatial upscaling.",
      "Comparative restoration models: VDSR (3_VDSR.py), BasicVSR Lite (4.2_BasicVSR_Lite.py), BasicVSR++ Lite (5_BasicVSR++_Lite.py), and Fourier-domain denoising (6_Fourier_denoising_basicVSR.py, 7_Denoise.py).",
      "Automated quantitative evaluation harness (8_evaluate.py) logging mean PSNR and SSIM across baselines and neural reconstructions to CSV.",
    ],
    personalContribution: [
      "Architected and implemented the full modular Python pipeline from synthetic degradation through temporal interpolation, neural VSR, and evaluation.",
      "Implemented lightweight BasicVSR / BasicVSR++ and Fourier denoising variants and compiled comparative PSNR/SSIM benchmark tables.",
    ],
    technologies: [
      "Python",
      "PyTorch",
      "VDSR",
      "BasicVSR / BasicVSR++",
      "Fourier Denoising",
      "PSNR / SSIM",
    ],
    metrics: [
      {
        label: "Peak PSNR",
        value: "22.80 dB",
        detail: "VDSR / Bicubic reference vs. Lite BasicVSR++ (22.72 dB)",
      },
      {
        label: "Peak SSIM",
        value: "0.669",
        detail: "Structural similarity benchmarked across 7 methods",
      },
      {
        label: "Pipeline Stages",
        value: "06 Steps",
        detail: "Degradation → Interpolation → Denoise → VSR → Eval",
      },
    ],
    resultsSummary:
      "Quantitative benchmarking (benchmark_results.csv) across 7 classical and neural configurations contrasts baseline Bicubic/Lanczos upsampling against VDSR (22.80 dB PSNR / 0.669 SSIM), BasicVSR Lite (22.71 dB / 0.668 SSIM), and BasicVSR++ Lite (22.72 dB / 0.669 SSIM), highlighting the sensitivity of lightweight recurrent VSR training to degradation regimes.",
    visualPlate: {
      id: "plate-phoenix",
      code: "FIG 03 · RESTORATION PIPELINE",
      title: "Degraded Video Reconstruction & VSR Benchmark Flow",
      caption:
        "Six-stage experimental workflow comparing temporal interpolation, Fourier denoising, VDSR, and lightweight BasicVSR++ against ground-truth frames.",
      diagramType: "phoenix-restoration",
    },
    relatedPublications: [],
    relatedTopics: ["multimodal-learning", "egocentric-vision"],
    links: [
      {
        label: "GitHub Repository",
        href: "https://github.com/AlessiaMicieli26/Project_Phoenix_Vision",
      },
    ],
  },
  {
    slug: "eventhorizon-track8",
    index: "04",
    title: "EventHorizon Track 8",
    shortTitle: "EventHorizon",
    year: "2026",
    status: "Public Repository · Active",
    domain: "Deep Learning · Reproducible Experimentation",
    tagline:
      "Structured PyTorch deep learning research framework and track workspace for systematic baseline-to-model experimentation.",
    overview:
      "EventHorizon_Track8 is a collaborative Deep Learning research workspace built around strict experimental reproducibility. Organized into decoupled dataset loaders, modular neural architectures, configurable training loops, and quantitative evaluation suites, it provides a clean foundation for iterative baseline comparison and technical reporting.",
    researchProblem:
      "Deep learning research projects rapidly accumulate brittle scripts when dataset preprocessing, model ablations, hyperparameter configs, and evaluation logs are tightly coupled. Establishing a clean, reproducible software architecture ensures fair comparisons between baseline and improved architectures.",
    methodology: [
      "Modular Python package layout separating src/datasets, src/models, src/training, src/evaluation, and shared utilities.",
      "Declarative Conda GPU environment (environment.yml) pinned on Python 3.10, PyTorch, TorchVision, TorchAudio, CUDA 11.8, scikit-learn, and TensorBoard.",
      "YAML-driven experiment configuration enabling controlled baseline vs. improved training runs and reproducible figure generation.",
      "Dedicated formal technical reporting structure (docs/REPORT.md) pairing quantitative ablation tables with qualitative failure analysis.",
    ],
    personalContribution: [
      "Contributed to the Track 8 deep learning codebase organization, environment reproducibility setup, and experimental workflow.",
    ],
    technologies: [
      "Python 3.10",
      "PyTorch",
      "TorchVision / TorchAudio",
      "CUDA 11.8",
      "TensorBoard",
      "scikit-learn",
    ],
    metrics: [
      {
        label: "Core Stack",
        value: "PyTorch",
        detail: "CUDA 11.8 accelerated training & evaluation",
      },
      {
        label: "Structure",
        value: "5 Modules",
        detail: "datasets · models · training · evaluation · utils",
      },
      {
        label: "Tracking",
        value: "TensorBoard",
        detail: "Config-driven reproducible ablation workflow",
      },
    ],
    resultsSummary:
      "Establishes a clean, reproducible multi-module PyTorch training and evaluation scaffold designed for transparent baseline comparisons and collaborative deep learning experimentation.",
    visualPlate: {
      id: "plate-eventhorizon",
      code: "FIG 04 · ML ARCHITECTURE",
      title: "EventHorizon Track 8 Reproducible Deep Learning Loop",
      caption:
        "Decoupled dataset ingestion, modular PyTorch model registry, YAML-configured CUDA training, and TensorBoard evaluation.",
      diagramType: "eventhorizon-dl",
    },
    relatedPublications: [],
    relatedTopics: ["multimodal-learning", "human-activity-understanding"],
    links: [
      {
        label: "GitHub Repository",
        href: "https://github.com/AlessiaMicieli26/EventHorizon_Track8",
      },
    ],
  },
  {
    slug: "tap-am",
    index: "05",
    title: "TAP_AM — SpokeLizard Analytics",
    shortTitle: "TAP_AM",
    year: "2024",
    status: "Public Repository · UNICT",
    domain: "Distributed Systems · Real-Time ML Streaming",
    tagline:
      "Complete real-time big data and ML streaming pipeline analyzing live multiplayer gameplay via Kafka, Spark, and Elastic Stack.",
    overview:
      "TAP_AM delivers the full end-to-end distributed data engineering pipeline and compiled HTML/Jupyter technical documentation for SpokeLizard — an ML-enhanced multiplayer Rock-Paper-Scissors-Lizard-Spock web application. The system ingests live gameplay APIs through Logstash and Apache Kafka, executes real-time Spark ML analytics, indexes events into Elasticsearch, and visualizes trends in Kibana.",
    researchProblem:
      "Capturing, transforming, and running predictive machine learning inference over continuous user interaction streams requires decoupled fault-tolerant ingestion, scalable stream processing, and low-latency indexing for live analytical dashboards.",
    methodology: [
      "Real-time event extraction from custom SpokeLizard web application APIs into structured JSON payloads via Logstash.",
      "Distributed event buffering and topic-based stream decoupling powered by Apache Kafka.",
      "Real-time streaming analytics and gameplay pattern modeling with Apache Spark ML pipelines.",
      "Full-text indexing and live dashboarding through Elasticsearch and exported Kibana visualization suites (exportKibana/), orchestrated via Docker Compose.",
    ],
    personalContribution: [
      "Designed and configured the full containerized multi-service architecture (docker-compose.yaml) connecting Python producers, Logstash, Kafka, Spark, Elasticsearch, and Kibana.",
      "Authored complete interactive documentation (DOCUMENTATION.ipynb & DOCUMENTATION.html) and Kibana visual analytics dashboards.",
    ],
    technologies: [
      "Apache Kafka",
      "Apache Spark",
      "Elasticsearch & Kibana",
      "Logstash",
      "Docker Compose",
      "Python / Shell",
    ],
    metrics: [
      {
        label: "Pipeline Stack",
        value: "6 Services",
        detail: "API → Logstash → Kafka → Spark → Elastic → Kibana",
      },
      {
        label: "Orchestration",
        value: "Docker",
        detail: "Reproducible multi-container local deployment",
      },
      {
        label: "Artifacts",
        value: "Full Docs",
        detail: "Includes Spark configs, Kibana exports & HTML report",
      },
    ],
    resultsSummary:
      "Successfully demonstrated real-time ingestion, distributed ML inference, and live Kibana dashboarding over streaming multiplayer game events inside a reproducible Docker Compose topology.",
    visualPlate: {
      id: "plate-tap-am",
      code: "FIG 05 · STREAMING PIPELINE",
      title: "SpokeLizard Real-Time Kafka–Spark–Elastic Architecture",
      caption:
        "End-to-end telemetry ingestion from SpokeLizard APIs through Logstash, Kafka brokers, Spark ML processing, Elasticsearch, and Kibana.",
      diagramType: "spokelizard-stream",
    },
    relatedPublications: [],
    relatedTopics: ["multimodal-sensor-fusion"],
    links: [
      {
        label: "GitHub Repository",
        href: "https://github.com/AlessiaMicieli26/TAP_AM",
      },
    ],
  },
  {
    slug: "spokelizard-tap",
    index: "06",
    title: "SpokeLizard_TAP",
    shortTitle: "SpokeLizard_TAP",
    year: "2024",
    status: "Public Repository · UNICT",
    domain: "Stream Engineering · Containerized ELK & Kafka",
    tagline:
      "Containerized stream-ingestion core and automation scripts for the SpokeLizard real-time analytics environment.",
    overview:
      "Companion public repository housing the core containerized deployment configuration, Shell/Batch automation scripts, Python ingestion connectors, and Jupyter notebooks (SPOKELIZARD.ipynb & DOCUMENTATION.ipynb) for launching the SpokeLizard Logstash–Kafka–Elasticsearch–Kibana telemetry environment.",
    researchProblem:
      "Coordinating heterogeneous big-data daemons across development machines (Linux Shell and Windows Batch environments) requires deterministic bootstrapping scripts, clean container definitions, and modular pipeline configs.",
    methodology: [
      "Cross-platform Shell and Batch automation scripts orchestrating container startup, topic creation, and pipeline initialization.",
      "Dedicated service directories for Logstash filters, Kafka broker configuration, Elasticsearch indices, and Kibana dashboards.",
      "Python client connectors and interactive notebooks verifying stream throughput and live query latency.",
    ],
    personalContribution: [
      "Built the Dockerized infrastructure templates, cross-platform launch scripts, and Python/Notebook verification suite.",
    ],
    technologies: [
      "Shell / Batch",
      "Docker",
      "Apache Kafka",
      "Logstash",
      "Elasticsearch & Kibana",
      "Python / Jupyter",
    ],
    metrics: [
      {
        label: "Automation",
        value: "Shell + Bat",
        detail: "Cross-platform container & broker bootstrapping",
      },
      {
        label: "Core Engine",
        value: "ELK + Kafka",
        detail: "Real-time event ingestion & search indexing",
      },
      {
        label: "Notebooks",
        value: "2 Suites",
        detail: "SPOKELIZARD.ipynb & DOCUMENTATION.ipynb",
      },
    ],
    resultsSummary:
      "Provides a lightweight, reproducible deployment bundle for spinning up the SpokeLizard streaming analytics stack across both Unix and Windows workstations.",
    visualPlate: {
      id: "plate-spokelizard",
      code: "FIG 06 · INFRASTRUCTURE",
      title: "Containerized Logstash–Kafka–Elasticsearch Stack",
      caption:
        "Automated multi-container topology supporting real-time ingestion, structured transformation, and live index visualization.",
      diagramType: "spokelizard-stream",
    },
    relatedPublications: [],
    relatedTopics: ["multimodal-sensor-fusion"],
    links: [
      {
        label: "GitHub Repository",
        href: "https://github.com/AlessiaMicieli26/SpokeLizard_TAP",
      },
    ],
  },
  {
    slug: "tutorial-social-media-yt",
    index: "07",
    title: "Tutorial Social Media YT",
    shortTitle: "YouTube API Guide",
    year: "2023",
    status: "Public Repository",
    domain: "Data Acquisition · Social Media & Video Analytics",
    tagline:
      "Hands-on technical guide and Jupyter notebooks for YouTube Data API extraction, video metadata analytics, and yt-dlp workflows.",
    overview:
      "Tutorial_social_media_YT is an educational and practical repository documenting programmatic interaction with the YouTube Data API alongside video acquisition using yt-dlp. Structured through executable Jupyter Notebooks and rendered HTML guides, it covers metadata retrieval, channel statistics, comment mining, keyword search, playlist management, and dataset collection practices.",
    researchProblem:
      "Building large-scale video and social-media research corpora requires clean, reproducible workflows for querying API endpoints, parsing engagement statistics, harvesting comment threads, and managing programmatic video downloads responsibly.",
    methodology: [
      "Structured walkthrough of YouTube Data API v3 capabilities: videos, channels, comment threads, search filters, statistics, playlists, and live stream metadata.",
      "Executable Jupyter Notebooks illustrating authentication, JSON response parsing, and tabular analytics export.",
      "Practical integration examples using yt-dlp for automated audiovisual media retrieval alongside rendered HTML reference documentation.",
    ],
    personalContribution: [
      "Authored the tutorial notebooks, API feature documentation, and exported HTML reference materials for social media data collection.",
    ],
    technologies: [
      "Python",
      "Jupyter Notebook",
      "YouTube Data API",
      "yt-dlp",
      "HTML Documentation",
    ],
    metrics: [
      {
        label: "API Coverage",
        value: "7 Modules",
        detail: "Videos, Channels, Comments, Search, Stats, Playlists, Live",
      },
      {
        label: "Format",
        value: "Notebook + HTML",
        detail: "Interactive executable guides & static docs",
      },
      {
        label: "Media Tooling",
        value: "yt-dlp",
        detail: "Programmatic video acquisition & metadata parsing",
      },
    ],
    resultsSummary:
      "Serves as a self-contained technical reference for extracting structured social-media metadata and audiovisual streams from YouTube for downstream computer vision and data science tasks.",
    visualPlate: {
      id: "plate-yt",
      code: "FIG 07 · DATA ACQUISITION",
      title: "YouTube API Metadata & yt-dlp Video Collection Flow",
      caption:
        "Programmatic query pipeline combining YouTube Data API v3 metadata/comment endpoints with yt-dlp audiovisual extraction.",
      diagramType: "youtube-api",
    },
    relatedPublications: [],
    relatedTopics: ["multimodal-learning"],
    links: [
      {
        label: "GitHub Repository",
        href: "https://github.com/AlessiaMicieli26/Tutorial_social_media_YT",
      },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
