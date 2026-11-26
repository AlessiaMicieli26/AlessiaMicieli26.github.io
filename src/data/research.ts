export interface ResearchDirection {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  scientificQuestion: string;
  summary: string;
  methodology: string[];
  keywords: string[];
  relatedProjects: string[]; // project slugs
  relatedPublications: string[]; // publication ids
}

export const RESEARCH_DIRECTIONS: ResearchDirection[] = [
  {
    id: "egocentric-vision",
    index: "01",
    title: "Egocentric Vision",
    subtitle: "First-person perception & embodied intent",
    scientificQuestion:
      "How can wearable visual agents interpret fine-grained hand-object interactions and environmental context directly from the user's viewpoint?",
    summary:
      "First-person video captures the world coupled to human attention, motor coordination, and immediate workspace context. Unlike fixed third-person cameras, egocentric vision introduces severe head motion, rapid occlusions, and tight manipulation horizons — while unlocking real-time assistive insight across wearable cameras and Mixed Reality headsets.",
    methodology: [
      "Low-latency first-person passthrough streaming and real-time object awareness on wearable headsets (EchoLens)",
      "Temporal modeling of ego-motion, hand-object contact states, and active workspace zones",
      "Expert-trainee egocentric benchmarks for interactive procedural visual question answering",
    ],
    keywords: [
      "First-Person Vision",
      "Wearable Assistants",
      "Mixed Reality Passthrough",
      "Procedural Video",
    ],
    relatedProjects: ["echolens", "project-phoenix-vision"],
    relatedPublications: ["egoextra-wacv"],
  },
  {
    id: "multimodal-learning",
    index: "02",
    title: "Multimodal Learning",
    subtitle: "Cross-modal alignment across vision, kinematics & language",
    scientificQuestion:
      "How should heterogeneous signals — RGB frames, skeletal keypoints, temporal dynamics, and spoken language — be fused so each modality resolves the others' ambiguities?",
    summary:
      "Human behavior is inherently multimodal. Visual appearance alone can be confounded by lighting, background clutter, or occlusion, whereas skeletal kinematics lack fine object texture and dialogue lacks spatial grounding. My work studies pose-visual fusion, video reconstruction, and multimodal architectures that leverage complementary strengths.",
    methodology: [
      "RGB + MediaPipe 2D skeletal keypoint fusion across hands, face, and upper-body topologies (SignIT)",
      "Controlled ablative evaluation contrasting pose baselines (K-NN, MLP), CNNs, and multimodal models",
      "Neural video restoration and temporal super-resolution for degraded visual streams (Project Phoenix Vision)",
    ],
    keywords: [
      "RGB-Skeleton Fusion",
      "Multimodal Models",
      "Video Restoration",
      "Cross-Modal Evaluation",
    ],
    relatedProjects: [
      "signit",
      "project-phoenix-vision",
      "eventhorizon-track8",
      "tutorial-social-media-yt",
    ],
    relatedPublications: ["signit-visapp-2026", "egoextra-wacv"],
  },
  {
    id: "scene-task-graphs",
    index: "03",
    title: "Scene Graphs & Task Graphs",
    subtitle: "Relational structure & causal procedural reasoning",
    scientificQuestion:
      "How can continuous raw observations be distilled into dynamic symbolic-neural graphs that track object states, spatial relations, and valid step dependencies?",
    summary:
      "Flat classification labels cannot explain why a procedural step is premature, why a tool is misaligned, or which prerequisite state was skipped. By combining dynamic spatial Scene Graphs (entities, tools, contact relations) with temporal Task Graphs (ordered sub-goals, preconditions, recovery paths), systems gain interpretable procedural awareness.",
    methodology: [
      "Dynamic object-state and spatial-relation extraction from first-person scenes",
      "Directed task graphs encoding preconditions, optional orderings, and error states",
      "Graph-conditioned reasoning for next-step prediction and assistive feedback",
    ],
    keywords: [
      "Dynamic Scene Graphs",
      "Task Graph Induction",
      "Causal Dependencies",
      "State Tracking",
    ],
    relatedProjects: ["echolens"],
    relatedPublications: ["egoextra-wacv"],
  },
  {
    id: "human-activity-understanding",
    index: "04",
    title: "Human Activity Understanding",
    subtitle: "Fine-grained motion, gestures & communicative intent",
    scientificQuestion:
      "How do we capture subtle articulatory, temporal, and contextual distinctions in human motion — from linguistic sign articulation to spatial gesture interaction?",
    summary:
      "Understanding human activity spans both goal-directed physical manipulation and expressive communicative behavior such as sign language. Both demand sensitivity to micro-temporal transitions, articulated hand geometry, non-manual cues (facial expression, head orientation), and signer-independent generalization.",
    methodology: [
      "Fine-grained Italian Sign Language (LIS) classification across 94 sign classes and 5 macro-categories (SignIT)",
      "Hand tracking and natural pinch gesture recognition for Mixed Reality interaction (EchoLens)",
      "Reproducible deep learning experimentation pipelines for temporal visual recognition (EventHorizon Track 8)",
    ],
    keywords: [
      "Sign Language Recognition",
      "Hand Tracking",
      "Pose Kinematics",
      "Fine-Grained Action",
    ],
    relatedProjects: ["signit", "echolens", "eventhorizon-track8"],
    relatedPublications: ["signit-visapp-2026"],
  },
  {
    id: "medical-procedure-understanding",
    index: "05",
    title: "Medical Procedure Understanding",
    subtitle: "Workflow phase recognition & safety-critical guidance",
    scientificQuestion:
      "How can structured procedural vision and task-graph reasoning transfer reliably to high-stakes clinical and medical workflows where precision and interpretability are mandatory?",
    summary:
      "Medical and clinical procedures share deep structural properties with assistive procedural domains: strict safety preconditions, specialized instrumentation, bimanual dexterity, and zero tolerance for silent omission errors. Applying egocentric perception and explicit task graphs opens pathways toward verifiable training assessment and clinical workflow support.",
    methodology: [
      "Hierarchical workflow segmentation into phases, steps, and instrument-interaction primitives",
      "Precondition verification and deviation detection via symbolic-neural task graphs",
      "Interpretable uncertainty signaling tailored for human-in-the-loop clinical oversight",
    ],
    keywords: [
      "Clinical Workflows",
      "Phase Recognition",
      "Instrument Tracking",
      "Interpretable Guidance",
    ],
    relatedProjects: ["signit", "echolens"],
    relatedPublications: [],
  },
  {
    id: "multimodal-sensor-fusion",
    index: "06",
    title: "Multimodal Sensor Fusion",
    subtitle: "Synchronizing visual, kinematic, acoustic & streaming telemetry",
    scientificQuestion:
      "How can heterogeneous visual, kinematic, and distributed data streams be synchronized and processed in real time without losing responsiveness or reliability?",
    summary:
      "Real-world perception systems combine multiple asynchronous sources: RGB frames, 2D pose landmarks, headset spatial anchors, audio narration, and real-time event telemetry. Designing clean streaming and fusion pipelines ensures graceful resilience under partial observability and low-latency deployment constraints.",
    methodology: [
      "Real-time visual + spatial + vocal pipeline synchronization on wearable Mixed Reality hardware (EchoLens)",
      "RGB-keypoint temporal alignment and cross-modal evaluation (SignIT)",
      "Distributed real-time event streaming and ML analytics via Kafka, Spark, and Elasticsearch (TAP_AM / SpokeLizard_TAP)",
    ],
    keywords: [
      "Wearable Sensing",
      "Real-Time Streaming",
      "Cross-Modal Alignment",
      "Low-Latency Systems",
    ],
    relatedProjects: ["signit", "echolens", "tap-am", "spokelizard-tap"],
    relatedPublications: ["signit-visapp-2026", "egoextra-wacv"],
  },
];
