export interface TimelineEntry {
  period: string;
  role: string;
  institution: string;
  location: string;
  details: string;
}

export interface Pillar {
  index: string;
  title: string;
  description: string;
}

export const PROFILE = {
  name: "ALESSIA MICIELI",
  shortName: "A. MICIELI",
  role: "Computer Science Researcher — Computer Vision & Multimodal AI",
  affiliation: "Department of Mathematics and Computer Science (DMI) · University of Catania",
  lab: "LIVE @ IPLab — Image Processing Laboratory",
  location: "Catania, Italy",
  statement: "Understanding the world, one perspective at a time.",
  supportingStatement:
    "Exploring computer vision, multimodal intelligence and human-centered understanding.",
  philosophyTitle: "Perspective as Representation",
  bioParagraphs: [
    "I am a Computer Science MSc graduate from the University of Catania working at the intersection of Computer Vision, Multimodal AI, Egocentric Vision, and Human-Centered Understanding.",
    "My research investigates how intelligent systems perceive, structure, and reason about human activity from first-person and multimodal viewpoints — translating continuous visual streams, skeletal kinematics, and wearable Mixed Reality perception into accessible, real-world assistive intelligence.",
    "Conducted within the Image Processing Laboratory (IPLab) environment at the Department of Mathematics and Computer Science, my work spans multimodal Italian Sign Language recognition (SignIT), assistive Meta Quest 3 Mixed Reality vision (EchoLens), neural video restoration (Project Phoenix Vision), and structured scene/task understanding.",
  ],
  researchApproach: [
    "Viewpoint matters: first-person perception reveals attention, intent, and object manipulation that third-person observation often obscures.",
    "Structure enables reasoning: moving beyond frame-level labels toward scene graphs, task graphs, and temporally grounded multimodal representations.",
    "Human-centered evaluation: designing benchmarks and assistive models around genuine human needs — inclusive LIS communication, visual accessibility, and procedural guidance.",
  ],
  timeline: [
    {
      period: "2024 — PRESENT",
      role: "Research Collaborator in Computer Vision & Multimodal AI",
      institution: "University of Catania — DMI · IPLab",
      location: "Catania, Italy",
      details:
        "Research on Italian Sign Language multimodal recognition (SignIT, VISAPP 2026), egocentric & wearable assistive vision (EchoLens), video restoration architectures (Project Phoenix Vision), and multimodal procedural understanding.",
    },
    {
      period: "2022 — 2025",
      role: "MSc in Computer Science (LM-18)",
      institution: "University of Catania",
      location: "Catania, Italy",
      details:
        "Graduate specialization in Computer Vision, Deep Learning, Mixed Reality Systems, Distributed Stream Processing, and First-Person Vision.",
    },
    {
      period: "2019 — 2022",
      role: "BSc in Computer Science (L-31)",
      institution: "University of Catania",
      location: "Catania, Italy",
      details:
        "Foundations in algorithms, statistical learning, computer graphics, software engineering, and visual computing.",
    },
  ] as TimelineEntry[],
  pillars: [
    {
      index: "01",
      title: "Egocentric Perception",
      description:
        "Modeling first-person visual streams where camera motion, gaze, and hand-object contact encode human intent.",
    },
    {
      index: "02",
      title: "Multimodal Grounding",
      description:
        "Aligning RGB dynamics, 2D skeletal landmarks, spatial audio feedback, and natural language into unified representations.",
    },
    {
      index: "03",
      title: "Structured Reasoning",
      description:
        "Representing procedural environments through dynamic scene graphs and causal task graphs for interpretable assistance.",
    },
    {
      index: "04",
      title: "Human-Centered AI",
      description:
        "Prioritizing inclusive communication (LIS), Mixed Reality visual accessibility (EchoLens), and trustworthy assistive intelligence.",
    },
  ] as Pillar[],
  technicalFocus: {
    "Vision & Learning": [
      "PyTorch",
      "YOLOv8 / CNNs / VSR",
      "Multimodal Models",
      "Temporal Action Modeling",
      "Graph Neural Networks",
    ],
    "Modalities & XR": [
      "Egocentric Video",
      "MediaPipe 2D Keypoints",
      "Unity / Meta Quest 3",
      "Scene & Task Graphs",
      "Sensor Fusion",
    ],
    "Systems & Data": [
      "Python & C#",
      "Kafka & Spark ML",
      "Elasticsearch & Kibana",
      "Docker Compose",
      "Experiment Reproducibility",
    ],
  },
  contact: {
    email: "micieli.alessia@studium.unict.it",
    emailNote:
      "Academic & research inquiries — open to PhD opportunities, collaborations, and visiting research.",
    links: [
      {
        label: "GitHub",
        handle: "@AlessiaMicieli26",
        href: "https://github.com/AlessiaMicieli26",
        tag: "CODE & REPOS",
      },
      {
        label: "Google Scholar",
        handle: "Alessia Micieli",
        href: "https://scholar.google.com/scholar?q=%22Alessia+Micieli%22",
        tag: "INDEX",
      },
      {
        label: "ResearchGate",
        handle: "profile/Alessia-Micieli",
        href: "https://www.researchgate.net/profile/Alessia-Micieli",
        tag: "ACADEMIC",
      },
      {
        label: "SignIT Portal",
        handle: "fpv-iplab.github.io/SignIT",
        href: "https://fpv-iplab.github.io/SignIT/",
        tag: "DATASET",
      },
      {
        label: "LinkedIn",
        handle: "alessia-micieli",
        href: "https://www.linkedin.com/search/results/all/?keywords=Alessia%20Micieli%20Catania",
        tag: "NETWORK",
      },
    ],
    cvAvailable: true,
  },
};
