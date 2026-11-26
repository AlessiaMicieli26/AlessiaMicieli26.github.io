export type SectionId =
  | "home"
  | "about"
  | "research"
  | "publications"
  | "projects"
  | "interests"
  | "contact";

export type NavSectionId = Exclude<SectionId, "home">;

export interface SectionRouteMeta {
  id: NavSectionId;
  index: string;
  label: string;
  href: string;
  ringIndex: number; // primary physical ring linked to this section (0..3)
  azimuthCenter: number; // degrees in [0, 360) for homepage rotational alignment
  materialLabel: string;
  geometryLabel: string;
  shortHint: string;
}

export const NAV_SECTIONS: SectionRouteMeta[] = [
  {
    id: "about",
    index: "01",
    label: "About",
    href: "/about",
    ringIndex: 0,
    azimuthCenter: 0,
    materialLabel: "Warm Brushed Titanium",
    geometryLabel: "Concentric Armillary",
    shortHint: "Biography & academic foundations",
  },
  {
    id: "research",
    index: "02",
    label: "Research",
    href: "/research",
    ringIndex: 1,
    azimuthCenter: 60,
    materialLabel: "Dark Polished Metal",
    geometryLabel: "Orthogonal Axes",
    shortHint: "Core directions & scientific questions",
  },
  {
    id: "publications",
    index: "03",
    label: "Publications",
    href: "/publications",
    ringIndex: 2,
    azimuthCenter: 120,
    materialLabel: "Satin Silver",
    geometryLabel: "Parallel Archival Planes",
    shortHint: "Academic archive & manuscripts",
  },
  {
    id: "projects",
    index: "04",
    label: "Projects",
    href: "/projects",
    ringIndex: 3,
    azimuthCenter: 180,
    materialLabel: "Dark Metal · Electric Lime",
    geometryLabel: "Connected Constellation",
    shortHint: "SignIT, EchoLens, Phoenix Vision & GitHub",
  },
  {
    id: "interests",
    index: "05",
    label: "Interests",
    href: "/interests",
    ringIndex: 2,
    azimuthCenter: 240,
    materialLabel: "Translucent Optical Alloy",
    geometryLabel: "Orbital Lattice",
    shortHint: "Interactive research network",
  },
  {
    id: "contact",
    index: "06",
    label: "Contact",
    href: "/contact",
    ringIndex: 0,
    azimuthCenter: 300,
    materialLabel: "Brushed Graphite",
    geometryLabel: "Balanced Aperture",
    shortHint: "Correspondence & profiles",
  },
];

export interface RingPose {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
}

export interface SculpturePreset {
  id: SectionId;
  label: string;
  materialName: string;
  geometryName: string;
  // Geometric configuration of the 4 individual rings (all verified collision-free)
  ringPoses: [RingPose, RingPose, RingPose, RingPose];
  centroidOffset: [number, number, number];
  // Structural geometric connectors & calibration axes visibility
  connectionOpacity: number;
  connectionColor: string;
  axisOpacity: number;
  // Physical PBR parameters (smoothly interpolated in useFrame)
  baseColor: string;
  secondaryColor: string;
  accentColor: string;
  accentEmissiveIntensity: number;
  metalness: number;
  roughness: number;
  clearcoat: number;
  clearcoatRoughness: number;
  transmission: number;
  iridescence: number;
  ior: number;
  thickness: number;
  bumpScale: number;
  envMapIntensity: number;
  // Lighting rig
  keyLightColor: string;
  keyLightIntensity: number;
  keyLightPos: [number, number, number];
  fillLightColor: string;
  fillLightIntensity: number;
  fillLightPos: [number, number, number];
  rimLightColor: string;
  rimLightIntensity: number;
  rimLightPos: [number, number, number];
  ambientIntensity: number;
  // Spatial layout (desktop & mobile)
  desktopPosition: [number, number, number];
  desktopScale: number;
  mobilePosition: [number, number, number];
  mobileScale: number;
  // Canonical sculptural orientation
  assemblyRotation: [number, number, number];
  // Kinetic behavior
  assemblySpinSpeed: number;
  ringSpinSpeeds: [number, number, number, number];
  organicAmplitude: number;
  precessionSpeed: number;
}

export const SCULPTURE_PRESETS: Record<SectionId, SculpturePreset> = {
  home: {
    id: "home",
    label: "Origin",
    materialName: "Calibrated Raw Titanium",
    geometryName: "Interlocked Chain",
    // Topologically closed 4-ring interlock (R0-R1-R3-R2-R0)
    ringPoses: [
      { position: [0.0, 0.0, 0.0], rotation: [0, 0, 0], scale: 1.0 },
      { position: [0.68, 0.0, 0.0], rotation: [Math.PI / 2, 0, 0], scale: 1.0 },
      { position: [0.18, 0.88, 0.0], rotation: [0, Math.PI / 2, 0], scale: 1.0 },
      { position: [-0.4, -0.4, -0.7], rotation: [0.55, -0.5, 0], scale: 1.0 },
    ],
    centroidOffset: [-0.14, -0.11, 0.17],
    connectionOpacity: 0.0,
    connectionColor: "#B9E66A",
    axisOpacity: 0.0,
    baseColor: "#B8B4AC",
    secondaryColor: "#8E939C",
    accentColor: "#B9E66A",
    accentEmissiveIntensity: 0.1,
    metalness: 0.9,
    roughness: 0.27,
    clearcoat: 0.22,
    clearcoatRoughness: 0.24,
    transmission: 0.0,
    iridescence: 0.04,
    ior: 1.5,
    thickness: 0.3,
    bumpScale: 0.011,
    envMapIntensity: 1.35,
    keyLightColor: "#F5F1E8",
    keyLightIntensity: 2.3,
    keyLightPos: [5.5, 6.0, 5.5],
    fillLightColor: "#8EA4C8",
    fillLightIntensity: 0.85,
    fillLightPos: [-5.5, -2.5, 4.0],
    rimLightColor: "#E8ECEF",
    rimLightIntensity: 1.4,
    rimLightPos: [-2.0, 4.5, -6.0],
    ambientIntensity: 0.28,
    desktopPosition: [0.42, 0.08, 0],
    desktopScale: 0.74,
    mobilePosition: [0, 0.04, 0],
    mobileScale: 0.56,
    assemblyRotation: [0.34, -0.42, 0.14],
    assemblySpinSpeed: 0.055,
    ringSpinSpeeds: [0.11, -0.15, 0.19, -0.24],
    organicAmplitude: 0.032,
    precessionSpeed: 0.55,
  },

  about: {
    id: "about",
    label: "About",
    materialName: "Warm Brushed Titanium",
    geometryName: "Concentric Armillary",
    // Concentric nested armillary sphere with organic oblique tilts
    ringPoses: [
      { position: [0, 0, 0], rotation: [0.18, 0.08, 0], scale: 1.04 },
      { position: [0, 0, 0], rotation: [1.18, 0.42, 0.25], scale: 0.9 },
      { position: [0, 0, 0], rotation: [0.65, -0.92, -0.2], scale: 0.76 },
      { position: [0, 0, 0], rotation: [-0.95, 0.58, 0.4], scale: 0.56 },
    ],
    centroidOffset: [0, 0, 0],
    connectionOpacity: 0.0,
    connectionColor: "#E7DAC6",
    axisOpacity: 0.0,
    baseColor: "#CBBFAD",
    secondaryColor: "#B5A592",
    accentColor: "#E7DAC6",
    accentEmissiveIntensity: 0.04,
    metalness: 0.87,
    roughness: 0.34,
    clearcoat: 0.14,
    clearcoatRoughness: 0.38,
    transmission: 0.0,
    iridescence: 0.03,
    ior: 1.48,
    thickness: 0.3,
    bumpScale: 0.015,
    envMapIntensity: 1.28,
    keyLightColor: "#FFF2DF",
    keyLightIntensity: 2.25,
    keyLightPos: [6.0, 4.5, 5.5],
    fillLightColor: "#D6C5B2",
    fillLightIntensity: 1.05,
    fillLightPos: [-5.0, -1.5, 4.5],
    rimLightColor: "#F7EFE4",
    rimLightIntensity: 1.15,
    rimLightPos: [1.5, 5.5, -5.5],
    ambientIntensity: 0.34,
    desktopPosition: [2.42, 0.08, -0.75],
    desktopScale: 0.68,
    mobilePosition: [1.18, 1.55, -1.6],
    mobileScale: 0.42,
    assemblyRotation: [0.46, 0.25, -0.14],
    assemblySpinSpeed: 0.045,
    ringSpinSpeeds: [0.09, -0.11, 0.13, -0.16],
    organicAmplitude: 0.055,
    precessionSpeed: 0.48,
  },

  research: {
    id: "research",
    label: "Research",
    materialName: "Dark Polished Metal",
    geometryName: "Orthogonal Axes",
    // Distinct precision Cartesian orientation: XY, XZ, YZ, and [1,1,1] diagonal core
    ringPoses: [
      { position: [0, 0, 0], rotation: [0, 0, 0], scale: 1.06 },
      { position: [0, 0, 0], rotation: [Math.PI / 2, 0, 0], scale: 0.94 },
      { position: [0, 0, 0], rotation: [0, Math.PI / 2, 0], scale: 0.8 },
      {
        position: [0, 0, 0],
        rotation: [Math.PI / 4, Math.PI / 4, 0],
        scale: 0.58,
      },
    ],
    centroidOffset: [0, 0, 0],
    connectionOpacity: 0.0,
    connectionColor: "#DCE7F7",
    axisOpacity: 0.38,
    baseColor: "#2C323D",
    secondaryColor: "#1E232B",
    accentColor: "#DCE7F7",
    accentEmissiveIntensity: 0.08,
    metalness: 0.96,
    roughness: 0.12,
    clearcoat: 0.82,
    clearcoatRoughness: 0.09,
    transmission: 0.0,
    iridescence: 0.06,
    ior: 1.55,
    thickness: 0.25,
    bumpScale: 0.004,
    envMapIntensity: 1.78,
    keyLightColor: "#ECF4FF",
    keyLightIntensity: 3.1,
    keyLightPos: [4.0, 7.5, 4.8],
    fillLightColor: "#5C7394",
    fillLightIntensity: 0.6,
    fillLightPos: [-6.0, -3.5, 2.5],
    rimLightColor: "#D8E8FF",
    rimLightIntensity: 2.2,
    rimLightPos: [-3.5, 4.0, -5.5],
    ambientIntensity: 0.18,
    desktopPosition: [2.48, 0.12, -0.85],
    desktopScale: 0.66,
    mobilePosition: [1.22, 1.55, -1.7],
    mobileScale: 0.4,
    assemblyRotation: [0.35, 0.72, 0.18],
    assemblySpinSpeed: 0.072,
    ringSpinSpeeds: [0.16, -0.22, 0.16, -0.28],
    organicAmplitude: 0.012,
    precessionSpeed: 0.35,
  },

  publications: {
    id: "publications",
    label: "Publications",
    materialName: "Satin Silver",
    geometryName: "Parallel Archival Planes",
    // Calm parallel layered optical planes stacked along an editorial depth axis
    ringPoses: [
      { position: [0, 0.22, -0.78], rotation: [0.35, -0.25, 0], scale: 0.96 },
      { position: [0, 0.06, -0.24], rotation: [0.35, -0.25, 0.1], scale: 0.96 },
      { position: [0, -0.1, 0.3], rotation: [0.35, -0.25, -0.1], scale: 0.94 },
      { position: [0, -0.24, 0.82], rotation: [0.35, -0.25, 0.2], scale: 0.88 },
    ],
    centroidOffset: [0, 0, 0],
    connectionOpacity: 0.0,
    connectionColor: "#EEF0F4",
    axisOpacity: 0.14,
    baseColor: "#D5D8DE",
    secondaryColor: "#B7BCC6",
    accentColor: "#EEF0F4",
    accentEmissiveIntensity: 0.03,
    metalness: 0.86,
    roughness: 0.4,
    clearcoat: 0.08,
    clearcoatRoughness: 0.46,
    transmission: 0.0,
    iridescence: 0.02,
    ior: 1.46,
    thickness: 0.3,
    bumpScale: 0.017,
    envMapIntensity: 1.22,
    keyLightColor: "#F6F7FA",
    keyLightIntensity: 2.0,
    keyLightPos: [3.5, 6.0, 6.0],
    fillLightColor: "#B9C0CC",
    fillLightIntensity: 1.0,
    fillLightPos: [-5.5, 0.5, 4.0],
    rimLightColor: "#FFFFFF",
    rimLightIntensity: 1.05,
    rimLightPos: [0.5, 4.5, -5.0],
    ambientIntensity: 0.35,
    desktopPosition: [2.56, -0.02, -0.95],
    desktopScale: 0.62,
    mobilePosition: [1.2, 1.55, -1.75],
    mobileScale: 0.38,
    assemblyRotation: [0.22, -0.68, -0.08],
    assemblySpinSpeed: 0.024,
    ringSpinSpeeds: [0.05, -0.06, 0.07, -0.09],
    organicAmplitude: 0.014,
    precessionSpeed: 0.26,
  },

  projects: {
    id: "projects",
    label: "Projects",
    materialName: "Dark Metallic · Electric Lime",
    geometryName: "Connected Constellation",
    // Separated modular spatial constellation linked by precision lime geometric filaments
    ringPoses: [
      { position: [-1.18, 0.88, -0.35], rotation: [0.22, 0.52, 0.15], scale: 0.62 },
      { position: [1.18, 0.72, 0.35], rotation: [1.18, -0.35, 0.2], scale: 0.6 },
      { position: [-0.95, -0.96, 0.52], rotation: [-0.48, 0.78, -0.2], scale: 0.62 },
      { position: [0.98, -0.88, -0.52], rotation: [0.82, -0.62, 0.35], scale: 0.6 },
    ],
    centroidOffset: [0, 0.05, 0],
    connectionOpacity: 0.78,
    connectionColor: "#B9E66A",
    axisOpacity: 0.0,
    baseColor: "#23272D",
    secondaryColor: "#1A1E24",
    accentColor: "#B9E66A",
    accentEmissiveIntensity: 1.45,
    metalness: 0.93,
    roughness: 0.21,
    clearcoat: 0.52,
    clearcoatRoughness: 0.16,
    transmission: 0.0,
    iridescence: 0.08,
    ior: 1.52,
    thickness: 0.3,
    bumpScale: 0.01,
    envMapIntensity: 1.62,
    keyLightColor: "#F3F6EE",
    keyLightIntensity: 2.7,
    keyLightPos: [5.0, 5.5, 5.0],
    fillLightColor: "#506448",
    fillLightIntensity: 0.72,
    fillLightPos: [-5.0, -3.0, 3.0],
    rimLightColor: "#B9E66A",
    rimLightIntensity: 2.25,
    rimLightPos: [-3.5, 3.0, -5.0],
    ambientIntensity: 0.22,
    desktopPosition: [2.48, 0.08, -0.9],
    desktopScale: 0.64,
    mobilePosition: [1.2, 1.52, -1.65],
    mobileScale: 0.4,
    assemblyRotation: [0.18, -0.35, 0.12],
    assemblySpinSpeed: 0.085,
    ringSpinSpeeds: [0.2, -0.26, 0.24, -0.34],
    organicAmplitude: 0.04,
    precessionSpeed: 0.74,
  },

  interests: {
    id: "interests",
    label: "Interests",
    materialName: "Translucent Optical Alloy",
    geometryName: "Orbital Lattice",
    // Experimental layered orbital arrangement with translucent optical links
    ringPoses: [
      { position: [-1.06, 0.65, -0.85], rotation: [0.52, 0.38, 0.12], scale: 0.68 },
      { position: [1.24, -0.15, 0.68], rotation: [1.22, -0.42, 0.25], scale: 0.62 },
      { position: [-0.82, -1.12, 0.42], rotation: [0.25, 1.18, -0.3], scale: 0.6 },
      { position: [0.76, 1.15, 0.08], rotation: [-0.82, -0.45, 0.55], scale: 0.5 },
    ],
    centroidOffset: [0, 0, 0],
    connectionOpacity: 0.52,
    connectionColor: "#CFE4EC",
    axisOpacity: 0.0,
    baseColor: "#C9D6DE",
    secondaryColor: "#9AB0BE",
    accentColor: "#D6F59C",
    accentEmissiveIntensity: 0.28,
    metalness: 0.24,
    roughness: 0.14,
    clearcoat: 0.95,
    clearcoatRoughness: 0.07,
    transmission: 0.64,
    iridescence: 0.72,
    ior: 1.52,
    thickness: 0.85,
    bumpScale: 0.003,
    envMapIntensity: 1.85,
    keyLightColor: "#EBF5FF",
    keyLightIntensity: 2.45,
    keyLightPos: [4.5, 6.0, 5.5],
    fillLightColor: "#B9E66A",
    fillLightIntensity: 0.62,
    fillLightPos: [-5.5, -2.0, 3.8],
    rimLightColor: "#D2E4FF",
    rimLightIntensity: 2.1,
    rimLightPos: [2.5, -3.5, -5.5],
    ambientIntensity: 0.36,
    desktopPosition: [3.02, -0.05, -1.25],
    desktopScale: 0.52,
    mobilePosition: [1.2, 1.55, -1.8],
    mobileScale: 0.36,
    assemblyRotation: [0.34, 0.58, -0.22],
    assemblySpinSpeed: 0.064,
    ringSpinSpeeds: [0.14, 0.18, -0.22, 0.28],
    organicAmplitude: 0.058,
    precessionSpeed: 0.88,
  },

  contact: {
    id: "contact",
    label: "Contact",
    materialName: "Brushed Obsidian Graphite",
    geometryName: "Balanced Aperture",
    // Open framing aperture inviting correspondence
    ringPoses: [
      { position: [0, 0, -0.28], rotation: [0.08, 0.12, 0], scale: 1.04 },
      { position: [0.18, 0.06, 0.18], rotation: [0.22, -0.28, 0.06], scale: 0.84 },
      { position: [-0.14, -0.05, 0.62], rotation: [-0.18, 0.3, -0.06], scale: 0.64 },
      { position: [0, 0, -0.08], rotation: [1.18, 0.16, 0.32], scale: 0.36 },
    ],
    centroidOffset: [0, 0, 0],
    connectionOpacity: 0.0,
    connectionColor: "#E9E7DF",
    axisOpacity: 0.0,
    baseColor: "#505259",
    secondaryColor: "#3A3C42",
    accentColor: "#E9E7DF",
    accentEmissiveIntensity: 0.07,
    metalness: 0.88,
    roughness: 0.32,
    clearcoat: 0.22,
    clearcoatRoughness: 0.28,
    transmission: 0.0,
    iridescence: 0.04,
    ior: 1.5,
    thickness: 0.3,
    bumpScale: 0.012,
    envMapIntensity: 1.38,
    keyLightColor: "#F6EBD8",
    keyLightIntensity: 2.3,
    keyLightPos: [5.5, 4.0, 5.0],
    fillLightColor: "#7F8999",
    fillLightIntensity: 0.85,
    fillLightPos: [-5.0, -2.0, 4.0],
    rimLightColor: "#E9E7DF",
    rimLightIntensity: 1.45,
    rimLightPos: [-2.0, 4.5, -5.5],
    ambientIntensity: 0.26,
    desktopPosition: [2.18, 0.02, -0.55],
    desktopScale: 0.7,
    mobilePosition: [1.12, 1.52, -1.6],
    mobileScale: 0.42,
    assemblyRotation: [0.24, -0.45, 0.06],
    assemblySpinSpeed: 0.036,
    ringSpinSpeeds: [0.08, -0.09, 0.11, -0.13],
    organicAmplitude: 0.025,
    precessionSpeed: 0.42,
  },
};

export function pathnameToSection(pathname: string): SectionId {
  if (!pathname || pathname === "/") return "home";
  const first = pathname.split("/").filter(Boolean)[0]?.toLowerCase();
  if (
    first === "about" ||
    first === "research" ||
    first === "publications" ||
    first === "projects" ||
    first === "interests" ||
    first === "contact"
  ) {
    return first;
  }
  return "home";
}

export function azimuthToNavSection(azimuthDeg: number): SectionRouteMeta {
  const norm = ((azimuthDeg % 360) + 360) % 360;
  let closest = NAV_SECTIONS[0];
  let bestDiff = 360;
  for (const sec of NAV_SECTIONS) {
    const raw = Math.abs(norm - sec.azimuthCenter);
    const diff = Math.min(raw, 360 - raw);
    if (diff < bestDiff) {
      bestDiff = diff;
      closest = sec;
    }
  }
  return closest;
}
