"use client";

import React, { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import {
  azimuthToNavSection,
  NAV_SECTIONS,
  NavSectionId,
  SCULPTURE_PRESETS,
} from "@/lib/sculptureConfig";
import { usePortfolioStore } from "@/store/portfolioStore";
import { createProceduralMetalTextures } from "./proceduralTextures";
import {
  buildGraduationMatrices,
  createMachinedRingGeometry,
  createRingInlayGeometry,
  RingProfileStyle,
} from "./ringGeometry";

export interface RingSpec {
  id: number;
  sectionId: NavSectionId;
  sectionHref: string;
  label: string;
  radius: number;
  bandWidth: number;
  thickness: number;
  style: RingProfileStyle;
  tickCount: number;
  toneBias: number;
  roughnessOffset: number;
}

export const RING_SPECS: RingSpec[] = [
  {
    id: 0,
    sectionId: "about",
    sectionHref: "/about",
    label: "RING 01 · ABOUT",
    radius: 2.08,
    bandWidth: 0.165,
    thickness: 0.088,
    style: "horizon",
    tickCount: 48,
    toneBias: 0.0,
    roughnessOffset: 0.0,
  },
  {
    id: 1,
    sectionId: "research",
    sectionHref: "/research",
    label: "RING 02 · RESEARCH",
    radius: 1.84,
    bandWidth: 0.19,
    thickness: 0.098,
    style: "meridian",
    tickCount: 42,
    toneBias: 0.45,
    roughnessOffset: -0.025,
  },
  {
    id: 2,
    sectionId: "publications",
    sectionHref: "/publications",
    label: "RING 03 · PUBLICATIONS",
    radius: 1.62,
    bandWidth: 0.155,
    thickness: 0.082,
    style: "oblique",
    tickCount: 36,
    toneBias: 0.2,
    roughnessOffset: 0.025,
  },
  {
    id: 3,
    sectionId: "projects",
    sectionHref: "/projects",
    label: "RING 04 · PROJECTS",
    radius: 1.48,
    bandWidth: 0.145,
    thickness: 0.078,
    style: "caliper",
    tickCount: 36,
    toneBias: 0.85,
    roughnessOffset: -0.015,
  },
];

// Geometric bridge edges linking the 4 rings in modular/constellation configurations
const CONNECTOR_PAIRS: [number, number][] = [
  [0, 1],
  [1, 3],
  [3, 2],
  [2, 0],
  [0, 3],
  [1, 2],
];

interface InterlockingRingsProps {
  onNavigate: (href: string) => void;
}

export function InterlockingRings({ onNavigate }: InterlockingRingsProps) {
  const { gl, size } = useThree();

  const rootGroupRef = useRef<THREE.Group>(null);
  const assemblyGroupRef = useRef<THREE.Group>(null);
  const centroidGroupRef = useRef<THREE.Group>(null);
  const ringPivotRefs = useRef<(THREE.Group | null)[]>([null, null, null, null]);
  const ringSpinRefs = useRef<(THREE.Group | null)[]>([null, null, null, null]);
  const tickMeshRefs = useRef<(THREE.InstancedMesh | null)[]>([
    null,
    null,
    null,
    null,
  ]);
  const connectorMeshRefs = useRef<(THREE.Mesh | null)[]>([]);
  const nodeMeshRefs = useRef<(THREE.Mesh | null)[]>([null, null, null, null]);
  const axisGroupRef = useRef<THREE.Group>(null);

  // Dynamic studio lights controlled smoothly in useFrame
  const keyLightRef = useRef<THREE.DirectionalLight>(null);
  const fillLightRef = useRef<THREE.DirectionalLight>(null);
  const rimLightRef = useRef<THREE.DirectionalLight>(null);
  const ambientLightRef = useRef<THREE.AmbientLight>(null);

  // Unified, continuous rotation & drag state (never jumps on hover, scroll, or route change)
  const kinetic = useRef({
    dragging: false,
    lastX: 0,
    lastY: 0,
    totalTravel: 0,
    yaw: -0.42,
    pitch: 0.34,
    velYaw: 0,
    velPitch: 0,
    lastReportedAzimuth: -1,
  });

  // Reusable scratch vectors/quaternions/colors (zero GC in useFrame)
  const scratch = useMemo(
    () => ({
      baseCol: new THREE.Color(),
      secCol: new THREE.Color(),
      ringTargetCol: new THREE.Color(),
      accentCol: new THREE.Color(),
      hoverLime: new THREE.Color("#B9E66A"),
      keyCol: new THREE.Color(),
      fillCol: new THREE.Color(),
      rimCol: new THREE.Color(),
      connCol: new THREE.Color(),
      tickBaseCol: new THREE.Color("#E9E7DF"),
      tickDarkCol: new THREE.Color("#8B919A"),
      upVec: new THREE.Vector3(0, 1, 0),
      vA: new THREE.Vector3(),
      vB: new THREE.Vector3(),
      vDir: new THREE.Vector3(),
      vMid: new THREE.Vector3(),
      qAlign: new THREE.Quaternion(),
    }),
    []
  );

  // Procedural brushed metal textures
  const textures = useMemo(() => createProceduralMetalTextures(2026), []);
  useEffect(() => {
    return () => {
      textures.dispose();
    };
  }, [textures]);

  // Optimized machined ring geometries (112 smooth radial segments for silky 60fps across all GPUs)
  const ringAssets = useMemo(() => {
    const tickBox = new THREE.BoxGeometry(1, 1, 1);
    const connectorCyl = new THREE.CylinderGeometry(
      0.0055,
      0.0055,
      1,
      6,
      1,
      false
    );
    const anchorNodeGeo = new THREE.OctahedronGeometry(0.036, 0);
    const axisCyl = new THREE.CylinderGeometry(0.0038, 0.0038, 4.9, 6, 1, false);
    const items = RING_SPECS.map((spec) => ({
      bodyGeo: createMachinedRingGeometry(
        spec.radius,
        spec.bandWidth,
        spec.thickness,
        spec.style,
        112
      ),
      inlayGeo: createRingInlayGeometry(
        spec.radius,
        spec.bandWidth,
        spec.thickness,
        112
      ),
      tickMatrices: buildGraduationMatrices(
        spec.radius,
        spec.thickness,
        spec.tickCount
      ),
    }));
    return { tickBox, connectorCyl, anchorNodeGeo, axisCyl, items };
  }, []);

  // Materials (bodies, inlays, graduation ticks, geometric connectors, calibration axes)
  const materials = useMemo(() => {
    const initial = SCULPTURE_PRESETS.home;
    const base = new THREE.Color(initial.baseColor);
    const secondary = new THREE.Color(initial.secondaryColor);

    const bodies = RING_SPECS.map((spec) => {
      const col = base.clone().lerp(secondary, spec.toneBias);
      return new THREE.MeshPhysicalMaterial({
        color: col,
        metalness: initial.metalness,
        roughness: THREE.MathUtils.clamp(
          initial.roughness + spec.roughnessOffset,
          0.08,
          0.95
        ),
        clearcoat: initial.clearcoat,
        clearcoatRoughness: initial.clearcoatRoughness,
        transmission: 0,
        iridescence: initial.iridescence,
        iridescenceIOR: 1.38,
        ior: initial.ior,
        thickness: initial.thickness,
        attenuationColor: new THREE.Color("#B8C8D4"),
        attenuationDistance: 1.8,
        bumpMap: textures.bumpMap,
        bumpScale: initial.bumpScale,
        roughnessMap: textures.roughnessMap,
        envMapIntensity: initial.envMapIntensity,
      });
    });

    const inlays = RING_SPECS.map(
      () =>
        new THREE.MeshStandardMaterial({
          color: new THREE.Color(initial.accentColor),
          emissive: new THREE.Color(initial.accentColor),
          emissiveIntensity: initial.accentEmissiveIntensity,
          metalness: 0.72,
          roughness: 0.25,
          envMapIntensity: 1.2,
        })
    );

    const ticks = RING_SPECS.map(
      () =>
        new THREE.MeshStandardMaterial({
          color: new THREE.Color("#D6D3CB"),
          metalness: 0.85,
          roughness: 0.35,
          envMapIntensity: 1.1,
        })
    );

    const connectorMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#B9E66A"),
      emissive: new THREE.Color("#B9E66A"),
      emissiveIntensity: 0.75,
      metalness: 0.4,
      roughness: 0.25,
      transparent: true,
      opacity: 0.0,
      depthWrite: false,
    });

    const nodeMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#E9E7DF"),
      emissive: new THREE.Color("#B9E66A"),
      emissiveIntensity: 0.65,
      metalness: 0.8,
      roughness: 0.2,
      transparent: true,
      opacity: 0.0,
      depthWrite: false,
    });

    const axisMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#DCE7F7"),
      emissive: new THREE.Color("#9BB8E0"),
      emissiveIntensity: 0.28,
      metalness: 0.6,
      roughness: 0.3,
      transparent: true,
      opacity: 0.0,
      depthWrite: false,
    });

    return { bodies, inlays, ticks, connectorMat, nodeMat, axisMat };
  }, [textures]);

  // Populate instanced graduation ticks once mounted
  useEffect(() => {
    ringAssets.items.forEach((asset, idx) => {
      const mesh = tickMeshRefs.current[idx];
      if (!mesh) return;
      asset.tickMatrices.forEach((m, i) => {
        mesh.setMatrixAt(i, m);
      });
      mesh.instanceMatrix.needsUpdate = true;
    });
  }, [ringAssets]);

  // Clean disposal on unmount
  useEffect(() => {
    return () => {
      ringAssets.tickBox.dispose();
      ringAssets.connectorCyl.dispose();
      ringAssets.anchorNodeGeo.dispose();
      ringAssets.axisCyl.dispose();
      ringAssets.items.forEach((it) => {
        it.bodyGeo.dispose();
        it.inlayGeo.dispose();
      });
      materials.bodies.forEach((m) => m.dispose());
      materials.inlays.forEach((m) => m.dispose());
      materials.ticks.forEach((m) => m.dispose());
      materials.connectorMat.dispose();
      materials.nodeMat.dispose();
      materials.axisMat.dispose();
    };
  }, [ringAssets, materials]);

  // Click-and-drag mouse/touch rotation (ONLY responds when actively pressed & dragged!)
  useEffect(() => {
    const dom = gl.domElement;

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0 && e.pointerType === "mouse") return;
      const state = usePortfolioStore.getState();
      kinetic.current.dragging = true;
      kinetic.current.lastX = e.clientX;
      kinetic.current.lastY = e.clientY;
      kinetic.current.totalTravel = 0;
      kinetic.current.velYaw = 0;
      kinetic.current.velPitch = 0;
      if (state.activeSection === "home") {
        state.requestAzimuth(null);
      }
      state.setIsDragging(true);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!kinetic.current.dragging) return;
      const dx = e.clientX - kinetic.current.lastX;
      const dy = e.clientY - kinetic.current.lastY;
      kinetic.current.lastX = e.clientX;
      kinetic.current.lastY = e.clientY;
      kinetic.current.totalTravel += Math.hypot(dx, dy);

      const sensitivity = 0.008;
      kinetic.current.yaw += dx * sensitivity;
      kinetic.current.pitch = THREE.MathUtils.clamp(
        kinetic.current.pitch + dy * sensitivity * 0.85,
        -1.25,
        1.25
      );
      kinetic.current.velYaw = dx * sensitivity * 0.55;
      kinetic.current.velPitch = dy * sensitivity * 0.35;
    };

    const onPointerUp = () => {
      if (!kinetic.current.dragging) return;
      kinetic.current.dragging = false;
      usePortfolioStore.getState().setIsDragging(false);
    };

    dom.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);

    return () => {
      dom.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    };
  }, [gl]);

  // Cursor feedback
  const hoveredRing = usePortfolioStore((s) => s.hoveredRing);
  const isDragging = usePortfolioStore((s) => s.isDragging);
  const activeSection = usePortfolioStore((s) => s.activeSection);
  useEffect(() => {
    const dom = gl.domElement;
    if (isDragging) {
      dom.style.cursor = "grabbing";
    } else if (activeSection === "home" && hoveredRing !== null) {
      dom.style.cursor = "pointer";
    } else {
      dom.style.cursor = "grab";
    }
  }, [gl, hoveredRing, isDragging, activeSection]);

  // Smooth 60fps loop: continuous self-rotation when idle, direct drag-follow when pressed
  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    const t = state.clock.elapsedTime;
    const store = usePortfolioStore.getState();

    const isHome = store.activeSection === "home";
    const isMobile = size.width < 768;
    const motionFactor = store.reducedMotion ? 0.12 : 1.0;

    // On Home, live-preview hovered/selected perspective; on inner pages, stay strictly on activeSection
    const visualSectionId =
      isHome && store.previewSection
        ? store.previewSection
        : store.activeSection;
    const preset = SCULPTURE_PRESETS[visualSectionId];
    const layoutPreset = SCULPTURE_PRESETS[store.activeSection];

    // 1. Spatial Position & Scale across sections (no scroll jitter)
    const root = rootGroupRef.current;
    if (root) {
      const targetPos = isMobile
        ? layoutPreset.mobilePosition
        : layoutPreset.desktopPosition;
      const targetScale = isMobile
        ? layoutPreset.mobileScale
        : layoutPreset.desktopScale;

      root.position.x = THREE.MathUtils.damp(
        root.position.x,
        targetPos[0],
        3.6,
        delta
      );
      root.position.y = THREE.MathUtils.damp(
        root.position.y,
        targetPos[1],
        3.6,
        delta
      );
      root.position.z = THREE.MathUtils.damp(
        root.position.z,
        targetPos[2],
        3.6,
        delta
      );

      const nextScale = THREE.MathUtils.damp(
        root.scale.x,
        targetScale,
        3.8,
        delta
      );
      root.scale.setScalar(nextScale);
    }

    // Smooth centroid offset for centered pivoting across all 7 geometric configurations
    if (centroidGroupRef.current) {
      centroidGroupRef.current.position.x = THREE.MathUtils.damp(
        centroidGroupRef.current.position.x,
        preset.centroidOffset[0],
        3.6,
        delta
      );
      centroidGroupRef.current.position.y = THREE.MathUtils.damp(
        centroidGroupRef.current.position.y,
        preset.centroidOffset[1],
        3.6,
        delta
      );
      centroidGroupRef.current.position.z = THREE.MathUtils.damp(
        centroidGroupRef.current.position.z,
        preset.centroidOffset[2],
        3.6,
        delta
      );
    }

    // 2. Collective Assembly Rotation — strictly click-drag controlled, otherwise steady self-rotation
    const assembly = assemblyGroupRef.current;
    if (assembly) {
      if (!kinetic.current.dragging) {
        if (isHome && store.requestedAzimuthDeg !== null) {
          const targetYaw = (store.requestedAzimuthDeg * Math.PI) / 180;
          let diff = targetYaw - kinetic.current.yaw;
          diff = Math.atan2(Math.sin(diff), Math.cos(diff));
          kinetic.current.yaw += diff * (1 - Math.exp(-5.0 * delta));
          kinetic.current.pitch = THREE.MathUtils.damp(
            kinetic.current.pitch,
            preset.assemblyRotation[0],
            4.0,
            delta
          );
          if (Math.abs(diff) < 0.008) {
            store.requestAzimuth(null);
          }
        } else {
          // Smooth inertia release + continuous steady self-rotation
          kinetic.current.yaw +=
            kinetic.current.velYaw +
            preset.assemblySpinSpeed * 1.45 * delta * motionFactor;
          kinetic.current.pitch = THREE.MathUtils.clamp(
            kinetic.current.pitch + kinetic.current.velPitch,
            -1.25,
            1.25
          );
          kinetic.current.velYaw *= Math.exp(-4.5 * delta);
          kinetic.current.velPitch *= Math.exp(-4.5 * delta);
        }
      }

      // Report homepage azimuth compass cleanly (only on Home)
      if (isHome) {
        const rawDeg = ((kinetic.current.yaw * 180) / Math.PI) % 360;
        const normDeg = (rawDeg + 360) % 360;
        if (Math.abs(normDeg - kinetic.current.lastReportedAzimuth) > 0.8) {
          kinetic.current.lastReportedAzimuth = normDeg;
          store.setAzimuthDeg(normDeg);
          if (
            kinetic.current.dragging ||
            Math.abs(kinetic.current.velYaw) > 0.004
          ) {
            const aligned = azimuthToNavSection(normDeg);
            if (store.previewSection !== aligned.id) {
              store.setPreviewSection(aligned.id);
            }
          }
        }
      }

      // Silky responsive damping when dragging, smooth continuous motion when rotating freely
      const followRate = kinetic.current.dragging ? 15.0 : 8.0;
      assembly.rotation.x = THREE.MathUtils.damp(
        assembly.rotation.x,
        kinetic.current.pitch,
        followRate,
        delta
      );
      assembly.rotation.y = THREE.MathUtils.damp(
        assembly.rotation.y,
        kinetic.current.yaw,
        followRate,
        delta
      );
      assembly.rotation.z = THREE.MathUtils.damp(
        assembly.rotation.z,
        preset.assemblyRotation[2],
        3.2,
        delta
      );
    }

    // 3. Per-Ring Geometric Morphing + Continuous Independent Spin + PBR Material Interpolation
    scratch.baseCol.set(preset.baseColor);
    scratch.secCol.set(preset.secondaryColor);
    scratch.accentCol.set(preset.accentColor);

    const activeNavMeta = NAV_SECTIONS.find((n) => n.id === visualSectionId);
    const primaryRingForSection = activeNavMeta ? activeNavMeta.ringIndex : -1;

    RING_SPECS.forEach((spec, idx) => {
      const pivot = ringPivotRefs.current[idx];
      const spin = ringSpinRefs.current[idx];
      const pose = preset.ringPoses[idx];
      const isHovered = isHome && store.hoveredRing === idx;
      const isSectionHighlighted = isHome && primaryRingForSection === idx;

      // Continuous steady spin around each ring's own normal axis
      if (spin) {
        spin.rotation.z += preset.ringSpinSpeeds[idx] * delta * motionFactor;
      }

      // Smooth geometric morphing between section configurations
      if (pivot) {
        const morphRate = 3.4;
        pivot.position.x = THREE.MathUtils.damp(
          pivot.position.x,
          pose.position[0],
          morphRate,
          delta
        );
        pivot.position.y = THREE.MathUtils.damp(
          pivot.position.y,
          pose.position[1],
          morphRate,
          delta
        );
        pivot.position.z = THREE.MathUtils.damp(
          pivot.position.z,
          pose.position[2],
          morphRate,
          delta
        );

        pivot.rotation.x = THREE.MathUtils.damp(
          pivot.rotation.x,
          pose.rotation[0],
          morphRate,
          delta
        );
        pivot.rotation.y = THREE.MathUtils.damp(
          pivot.rotation.y,
          pose.rotation[1],
          morphRate,
          delta
        );
        pivot.rotation.z = THREE.MathUtils.damp(
          pivot.rotation.z,
          pose.rotation[2],
          morphRate,
          delta
        );

        const nextRingScale = THREE.MathUtils.damp(
          pivot.scale.x,
          pose.scale * (isHovered ? 1.03 : 1.0),
          4.2,
          delta
        );
        pivot.scale.setScalar(nextRingScale);
      }

      // Smooth PBR material interpolation
      const bodyMat = materials.bodies[idx];
      scratch.ringTargetCol
        .copy(scratch.baseCol)
        .lerp(scratch.secCol, spec.toneBias);
      if (isHovered) {
        scratch.ringTargetCol.lerp(scratch.tickBaseCol, 0.14);
      }

      const matSpeed = 3.4;
      bodyMat.color.lerp(scratch.ringTargetCol, 1 - Math.exp(-matSpeed * delta));
      bodyMat.metalness = THREE.MathUtils.damp(
        bodyMat.metalness,
        preset.metalness,
        matSpeed,
        delta
      );
      bodyMat.roughness = THREE.MathUtils.damp(
        bodyMat.roughness,
        THREE.MathUtils.clamp(
          preset.roughness + spec.roughnessOffset,
          0.07,
          0.92
        ),
        matSpeed,
        delta
      );
      bodyMat.clearcoat = THREE.MathUtils.damp(
        bodyMat.clearcoat,
        preset.clearcoat,
        matSpeed,
        delta
      );
      bodyMat.clearcoatRoughness = THREE.MathUtils.damp(
        bodyMat.clearcoatRoughness,
        preset.clearcoatRoughness,
        matSpeed,
        delta
      );

      // Clamp near-zero transmission to exact 0 so GPU skips expensive refraction pass on metallic sections
      const dampedTrans = THREE.MathUtils.damp(
        bodyMat.transmission,
        preset.transmission,
        3.0,
        delta
      );
      bodyMat.transmission = dampedTrans < 0.01 ? 0 : dampedTrans;

      bodyMat.iridescence = THREE.MathUtils.damp(
        bodyMat.iridescence,
        preset.iridescence,
        3.0,
        delta
      );
      bodyMat.ior = THREE.MathUtils.damp(bodyMat.ior, preset.ior, 3.0, delta);
      bodyMat.thickness = THREE.MathUtils.damp(
        bodyMat.thickness,
        preset.thickness,
        3.0,
        delta
      );
      bodyMat.bumpScale = THREE.MathUtils.damp(
        bodyMat.bumpScale,
        preset.bumpScale,
        3.0,
        delta
      );
      bodyMat.envMapIntensity = THREE.MathUtils.damp(
        bodyMat.envMapIntensity,
        preset.envMapIntensity + (isHovered ? 0.25 : 0),
        3.4,
        delta
      );

      // Machined inlay groove material
      const inlayMat = materials.inlays[idx];
      const inlayTargetCol = isHovered ? scratch.hoverLime : scratch.accentCol;
      inlayMat.color.lerp(inlayTargetCol, 1 - Math.exp(-4.0 * delta));
      inlayMat.emissive.lerp(inlayTargetCol, 1 - Math.exp(-4.0 * delta));

      let targetEmissive = preset.accentEmissiveIntensity;
      if (isHovered) {
        targetEmissive = Math.max(targetEmissive, 1.15);
      } else if (visualSectionId === "projects" && (idx === 3 || idx === 1)) {
        targetEmissive = preset.accentEmissiveIntensity * 1.15;
      } else if (isSectionHighlighted) {
        targetEmissive = Math.max(targetEmissive, 0.26);
      }

      inlayMat.emissiveIntensity = THREE.MathUtils.damp(
        inlayMat.emissiveIntensity,
        targetEmissive,
        4.2,
        delta
      );

      const tickMat = materials.ticks[idx];
      const tickTarget =
        visualSectionId === "publications" || visualSectionId === "about"
          ? scratch.tickDarkCol
          : scratch.tickBaseCol;
      tickMat.color.lerp(tickTarget, 1 - Math.exp(-3.0 * delta));
    });

    // 4. Dynamic Geometric Connections (live-tracks separated rings in Projects & Interests)
    scratch.connCol.set(preset.connectionColor);
    materials.connectorMat.color.lerp(
      scratch.connCol,
      1 - Math.exp(-3.5 * delta)
    );
    materials.connectorMat.emissive.lerp(
      scratch.connCol,
      1 - Math.exp(-3.5 * delta)
    );
    materials.connectorMat.opacity = THREE.MathUtils.damp(
      materials.connectorMat.opacity,
      preset.connectionOpacity,
      3.0,
      delta
    );

    materials.nodeMat.emissive.lerp(
      scratch.connCol,
      1 - Math.exp(-3.5 * delta)
    );
    materials.nodeMat.opacity = THREE.MathUtils.damp(
      materials.nodeMat.opacity,
      preset.connectionOpacity > 0.05
        ? Math.min(preset.connectionOpacity + 0.15, 0.95)
        : 0,
      3.0,
      delta
    );

    const connectorsVisible = materials.connectorMat.opacity > 0.015;
    if (connectorsVisible) {
      for (let i = 0; i < 4; i++) {
        const pivot = ringPivotRefs.current[i];
        const nodeMesh = nodeMeshRefs.current[i];
        if (pivot && nodeMesh) {
          nodeMesh.visible = true;
          nodeMesh.position.copy(pivot.position);
          nodeMesh.rotation.y = t * 0.5 + i;
        }
      }

      CONNECTOR_PAIRS.forEach(([aIdx, bIdx], cIdx) => {
        const pA = ringPivotRefs.current[aIdx];
        const pB = ringPivotRefs.current[bIdx];
        const cyl = connectorMeshRefs.current[cIdx];
        if (!pA || !pB || !cyl) return;

        scratch.vA.copy(pA.position);
        scratch.vB.copy(pB.position);
        scratch.vDir.subVectors(scratch.vB, scratch.vA);
        const len = scratch.vDir.length();
        if (len < 0.08) {
          cyl.visible = false;
          return;
        }
        cyl.visible = true;
        scratch.vMid.addVectors(scratch.vA, scratch.vB).multiplyScalar(0.5);
        cyl.position.copy(scratch.vMid);
        scratch.vDir.normalize();
        scratch.qAlign.setFromUnitVectors(scratch.upVec, scratch.vDir);
        cyl.quaternion.copy(scratch.qAlign);
        cyl.scale.set(1, len, 1);
      });
    } else {
      for (let i = 0; i < 4; i++) {
        const nodeMesh = nodeMeshRefs.current[i];
        if (nodeMesh) nodeMesh.visible = false;
      }
      CONNECTOR_PAIRS.forEach((_, cIdx) => {
        const cyl = connectorMeshRefs.current[cIdx];
        if (cyl) cyl.visible = false;
      });
    }

    // 5. Precision Calibration Axes (Research orthogonal mode)
    materials.axisMat.opacity = THREE.MathUtils.damp(
      materials.axisMat.opacity,
      preset.axisOpacity,
      3.0,
      delta
    );
    if (axisGroupRef.current) {
      axisGroupRef.current.visible = materials.axisMat.opacity > 0.015;
    }

    // 6. Smooth Studio Lighting Interpolation
    const lightSpeed = 2.8;
    if (keyLightRef.current) {
      scratch.keyCol.set(preset.keyLightColor);
      keyLightRef.current.color.lerp(
        scratch.keyCol,
        1 - Math.exp(-lightSpeed * delta)
      );
      keyLightRef.current.intensity = THREE.MathUtils.damp(
        keyLightRef.current.intensity,
        preset.keyLightIntensity,
        lightSpeed,
        delta
      );
      keyLightRef.current.position.x = THREE.MathUtils.damp(
        keyLightRef.current.position.x,
        preset.keyLightPos[0],
        lightSpeed,
        delta
      );
      keyLightRef.current.position.y = THREE.MathUtils.damp(
        keyLightRef.current.position.y,
        preset.keyLightPos[1],
        lightSpeed,
        delta
      );
      keyLightRef.current.position.z = THREE.MathUtils.damp(
        keyLightRef.current.position.z,
        preset.keyLightPos[2],
        lightSpeed,
        delta
      );
    }

    if (fillLightRef.current) {
      scratch.fillCol.set(preset.fillLightColor);
      fillLightRef.current.color.lerp(
        scratch.fillCol,
        1 - Math.exp(-lightSpeed * delta)
      );
      fillLightRef.current.intensity = THREE.MathUtils.damp(
        fillLightRef.current.intensity,
        preset.fillLightIntensity,
        lightSpeed,
        delta
      );
      fillLightRef.current.position.x = THREE.MathUtils.damp(
        fillLightRef.current.position.x,
        preset.fillLightPos[0],
        lightSpeed,
        delta
      );
      fillLightRef.current.position.y = THREE.MathUtils.damp(
        fillLightRef.current.position.y,
        preset.fillLightPos[1],
        lightSpeed,
        delta
      );
      fillLightRef.current.position.z = THREE.MathUtils.damp(
        fillLightRef.current.position.z,
        preset.fillLightPos[2],
        lightSpeed,
        delta
      );
    }

    if (rimLightRef.current) {
      scratch.rimCol.set(preset.rimLightColor);
      rimLightRef.current.color.lerp(
        scratch.rimCol,
        1 - Math.exp(-lightSpeed * delta)
      );
      rimLightRef.current.intensity = THREE.MathUtils.damp(
        rimLightRef.current.intensity,
        preset.rimLightIntensity,
        lightSpeed,
        delta
      );
      rimLightRef.current.position.x = THREE.MathUtils.damp(
        rimLightRef.current.position.x,
        preset.rimLightPos[0],
        lightSpeed,
        delta
      );
      rimLightRef.current.position.y = THREE.MathUtils.damp(
        rimLightRef.current.position.y,
        preset.rimLightPos[1],
        lightSpeed,
        delta
      );
      rimLightRef.current.position.z = THREE.MathUtils.damp(
        rimLightRef.current.position.z,
        preset.rimLightPos[2],
        lightSpeed,
        delta
      );
    }

    if (ambientLightRef.current) {
      ambientLightRef.current.intensity = THREE.MathUtils.damp(
        ambientLightRef.current.intensity,
        preset.ambientIntensity,
        lightSpeed,
        delta
      );
    }
  });

  // Ring hover & click handlers (Home navigation only; inner pages stay purely smooth click-and-drag)
  const handleRingPointerOver = (
    e: ThreeEvent<PointerEvent>,
    spec: RingSpec
  ) => {
    const state = usePortfolioStore.getState();
    if (state.activeSection !== "home") return;
    e.stopPropagation();
    state.setHoveredRing(spec.id);
    if (!kinetic.current.dragging) {
      state.setPreviewSection(spec.sectionId);
    }
  };

  const handleRingPointerOut = (e: ThreeEvent<PointerEvent>, id: number) => {
    const state = usePortfolioStore.getState();
    if (state.activeSection !== "home") return;
    e.stopPropagation();
    if (state.hoveredRing === id) {
      state.setHoveredRing(null);
    }
  };

  const handleRingClick = (e: ThreeEvent<MouseEvent>, spec: RingSpec) => {
    const state = usePortfolioStore.getState();
    if (state.activeSection !== "home") return;
    e.stopPropagation();
    if (kinetic.current.totalTravel > 7) return;
    onNavigate(spec.sectionHref);
  };

  const initialPoses = SCULPTURE_PRESETS.home.ringPoses;

  return (
    <>
      <ambientLight ref={ambientLightRef} intensity={0.28} color="#DCE0E8" />
      <directionalLight
        ref={keyLightRef}
        position={[5.5, 6.0, 5.5]}
        intensity={2.3}
        color="#F5F1E8"
      />
      <directionalLight
        ref={fillLightRef}
        position={[-5.5, -2.5, 4.0]}
        intensity={0.85}
        color="#8EA4C8"
      />
      <directionalLight
        ref={rimLightRef}
        position={[-2.0, 4.5, -6.0]}
        intensity={1.4}
        color="#E8ECEF"
      />

      {/* Persistent spatial root smoothly transformed across sections */}
      <group ref={rootGroupRef} position={[0.42, 0.08, 0]} scale={0.74}>
        <group ref={assemblyGroupRef} rotation={[0.34, -0.42, 0.14]}>
          <group ref={centroidGroupRef} position={[-0.14, -0.11, 0.17]}>
            {/* Subtle Cartesian Calibration Axes (Research orthogonal configuration) */}
            <group ref={axisGroupRef} visible={false}>
              <mesh
                geometry={ringAssets.axisCyl}
                material={materials.axisMat}
              />
              <mesh
                geometry={ringAssets.axisCyl}
                material={materials.axisMat}
                rotation={[0, 0, Math.PI / 2]}
              />
              <mesh
                geometry={ringAssets.axisCyl}
                material={materials.axisMat}
                rotation={[Math.PI / 2, 0, 0]}
              />
            </group>

            {/* Dynamic Structural Connectors & Anchor Nodes (Projects & Interests) */}
            {CONNECTOR_PAIRS.map((pair, idx) => (
              <mesh
                key={`${pair[0]}-${pair[1]}`}
                ref={(el) => {
                  connectorMeshRefs.current[idx] = el;
                }}
                geometry={ringAssets.connectorCyl}
                material={materials.connectorMat}
                visible={false}
              />
            ))}
            {[0, 1, 2, 3].map((idx) => (
              <mesh
                key={`node-${idx}`}
                ref={(el) => {
                  nodeMeshRefs.current[idx] = el;
                }}
                geometry={ringAssets.anchorNodeGeo}
                material={materials.nodeMat}
                visible={false}
              />
            ))}

            {/* The 4 Morphing Interlocking Architectural Rings */}
            {RING_SPECS.map((spec, idx) => (
              <group
                key={spec.id}
                ref={(el) => {
                  ringPivotRefs.current[idx] = el;
                }}
                position={initialPoses[idx].position}
                rotation={initialPoses[idx].rotation}
                scale={initialPoses[idx].scale}
              >
                <group
                  ref={(el) => {
                    ringSpinRefs.current[idx] = el;
                  }}
                >
                  <mesh
                    geometry={ringAssets.items[idx].bodyGeo}
                    material={materials.bodies[idx]}
                    onPointerOver={(e) => handleRingPointerOver(e, spec)}
                    onPointerOut={(e) => handleRingPointerOut(e, spec.id)}
                    onClick={(e) => handleRingClick(e, spec)}
                  />

                  <mesh
                    geometry={ringAssets.items[idx].inlayGeo}
                    material={materials.inlays[idx]}
                  />

                  <instancedMesh
                    ref={(el) => {
                      tickMeshRefs.current[idx] = el;
                    }}
                    args={[
                      ringAssets.tickBox,
                      materials.ticks[idx],
                      spec.tickCount,
                    ]}
                  />
                </group>
              </group>
            ))}
          </group>
        </group>
      </group>
    </>
  );
}
