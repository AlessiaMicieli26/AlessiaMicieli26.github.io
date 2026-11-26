import * as THREE from "three";

export type RingProfileStyle = "horizon" | "meridian" | "oblique" | "caliper";

interface ProfilePoint {
  dr: number; // radial offset from ring center radius
  dz: number; // axial offset from ring center plane
}

/**
 * Architectural chamfered cross-sections (in ring radial/axial coordinates).
 * Each pair of consecutive points defines a machined facet swept smoothly around 360°,
 * producing razor-sharp specular highlights along chamfer ridges without looking like a stock torus.
 */
function getCrossSectionProfile(
  bandWidth: number,
  thickness: number,
  style: RingProfileStyle
): ProfilePoint[] {
  const hw = bandWidth * 0.5;
  const ht = thickness * 0.5;

  if (style === "horizon") {
    // Sleek double-chamfered architectural band with recessed central outer groove
    return [
      { dr: -hw, dz: -ht * 0.58 },
      { dr: -hw * 0.68, dz: -ht },
      { dr: hw * 0.68, dz: -ht },
      { dr: hw, dz: -ht * 0.56 },
      { dr: hw, dz: -ht * 0.2 },
      { dr: hw * 0.86, dz: -ht * 0.14 },
      { dr: hw * 0.86, dz: ht * 0.14 },
      { dr: hw, dz: ht * 0.2 },
      { dr: hw, dz: ht * 0.56 },
      { dr: hw * 0.68, dz: ht },
      { dr: -hw * 0.68, dz: ht },
      { dr: -hw, dz: ht * 0.58 },
    ];
  }

  if (style === "meridian") {
    // Bold stepped octagonal optical bezel profile
    return [
      { dr: -hw, dz: -ht * 0.5 },
      { dr: -hw * 0.72, dz: -ht * 0.85 },
      { dr: -hw * 0.28, dz: -ht },
      { dr: hw * 0.55, dz: -ht },
      { dr: hw, dz: -ht * 0.55 },
      { dr: hw, dz: -ht * 0.18 },
      { dr: hw * 0.84, dz: -ht * 0.12 },
      { dr: hw * 0.84, dz: ht * 0.12 },
      { dr: hw, dz: ht * 0.18 },
      { dr: hw, dz: ht * 0.55 },
      { dr: hw * 0.55, dz: ht },
      { dr: -hw * 0.28, dz: ht },
      { dr: -hw * 0.72, dz: ht * 0.85 },
      { dr: -hw, dz: ht * 0.5 },
    ];
  }

  if (style === "oblique") {
    // Asymmetric knife-chamfered satin silhouette
    return [
      { dr: -hw, dz: -ht * 0.45 },
      { dr: -hw * 0.55, dz: -ht * 0.96 },
      { dr: hw * 0.45, dz: -ht },
      { dr: hw, dz: -ht * 0.48 },
      { dr: hw, dz: -ht * 0.16 },
      { dr: hw * 0.85, dz: -ht * 0.11 },
      { dr: hw * 0.85, dz: ht * 0.11 },
      { dr: hw, dz: ht * 0.16 },
      { dr: hw, dz: ht * 0.48 },
      { dr: hw * 0.45, dz: ht },
      { dr: -hw * 0.55, dz: ht * 0.96 },
      { dr: -hw, dz: ht * 0.45 },
    ];
  }

  // "caliper": crisp precision square-chamfered inner ring
  return [
    { dr: -hw, dz: -ht * 0.65 },
    { dr: -hw * 0.72, dz: -ht },
    { dr: hw * 0.72, dz: -ht },
    { dr: hw, dz: -ht * 0.65 },
    { dr: hw, dz: -ht * 0.22 },
    { dr: hw * 0.82, dz: -ht * 0.16 },
    { dr: hw * 0.82, dz: ht * 0.16 },
    { dr: hw, dz: ht * 0.22 },
    { dr: hw, dz: ht * 0.65 },
    { dr: hw * 0.72, dz: ht },
    { dr: -hw * 0.72, dz: ht },
    { dr: -hw, dz: ht * 0.65 },
  ];
}

/**
 * Sweeps an architectural faceted cross-section into a smooth circular ring lying in the local XY plane.
 * Facets are crisp along the cross-section (flat bevel normals) while silky-smooth around the 360° arc.
 */
export function createMachinedRingGeometry(
  radius: number,
  bandWidth: number,
  thickness: number,
  style: RingProfileStyle,
  radialSegments = 160
): THREE.BufferGeometry {
  const profile = getCrossSectionProfile(bandWidth, thickness, style);
  const segCount = profile.length;

  const positions: number[] = [];
  const normals: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  let vertexOffset = 0;

  // Compute cumulative perimeter for clean V coordinate mapping
  const perimeterLengths: number[] = [0];
  let totalPerimeter = 0;
  for (let p = 0; p < segCount; p++) {
    const a = profile[p];
    const b = profile[(p + 1) % segCount];
    totalPerimeter += Math.hypot(b.dr - a.dr, b.dz - a.dz);
    perimeterLengths.push(totalPerimeter);
  }

  for (let p = 0; p < segCount; p++) {
    const a = profile[p];
    const b = profile[(p + 1) % segCount];

    // Outward normal in 2D (dr, dz) plane (profile is ordered counter-clockwise in dr, dz)
    const ddr = b.dr - a.dr;
    const ddz = b.dz - a.dz;
    const len = Math.hypot(ddr, ddz) || 1;
    const nr = ddz / len;
    const nz = -ddr / len;

    const v0 = perimeterLengths[p] / totalPerimeter;
    const v1 = perimeterLengths[p + 1] / totalPerimeter;

    for (let i = 0; i <= radialSegments; i++) {
      const u = i / radialSegments;
      const theta = u * Math.PI * 2;
      const cosT = Math.cos(theta);
      const sinT = Math.sin(theta);

      const rA = radius + a.dr;
      const rB = radius + b.dr;

      // Vertex at profile point A
      positions.push(rA * cosT, rA * sinT, a.dz);
      normals.push(nr * cosT, nr * sinT, nz);
      uvs.push(u, v0);

      // Vertex at profile point B
      positions.push(rB * cosT, rB * sinT, b.dz);
      normals.push(nr * cosT, nr * sinT, nz);
      uvs.push(u, v1);
    }

    for (let i = 0; i < radialSegments; i++) {
      const row0 = vertexOffset + i * 2;
      const row1 = vertexOffset + (i + 1) * 2;
      indices.push(row0, row1, row0 + 1);
      indices.push(row1, row1 + 1, row0 + 1);
    }

    vertexOffset += (radialSegments + 1) * 2;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  );
  geometry.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeBoundingSphere();

  return geometry;
}

/**
 * Razor-thin machined inlay band nestled inside the outer recessed groove of each ring.
 * Carries subtle metallic highlight normally and calibrated electric lime accent on Projects / hover.
 */
export function createRingInlayGeometry(
  radius: number,
  bandWidth: number,
  thickness: number,
  radialSegments = 160
): THREE.BufferGeometry {
  const hw = bandWidth * 0.5;
  const ht = thickness * 0.5;
  const rInner = radius + hw * 0.855;
  const rOuter = radius + hw * 0.94;
  const zHalf = ht * 0.135;

  const profile: ProfilePoint[] = [
    { dr: rInner - radius, dz: -zHalf },
    { dr: rOuter - radius, dz: -zHalf * 0.78 },
    { dr: rOuter - radius, dz: zHalf * 0.78 },
    { dr: rInner - radius, dz: zHalf },
  ];

  const positions: number[] = [];
  const normals: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  let vertexOffset = 0;
  for (let p = 0; p < profile.length; p++) {
    const a = profile[p];
    const b = profile[(p + 1) % profile.length];
    const ddr = b.dr - a.dr;
    const ddz = b.dz - a.dz;
    const len = Math.hypot(ddr, ddz) || 1;
    const nr = ddz / len;
    const nz = -ddr / len;

    for (let i = 0; i <= radialSegments; i++) {
      const u = i / radialSegments;
      const theta = u * Math.PI * 2;
      const cosT = Math.cos(theta);
      const sinT = Math.sin(theta);

      const rA = radius + a.dr;
      const rB = radius + b.dr;
      positions.push(rA * cosT, rA * sinT, a.dz);
      normals.push(nr * cosT, nr * sinT, nz);
      uvs.push(u, 0);

      positions.push(rB * cosT, rB * sinT, b.dz);
      normals.push(nr * cosT, nr * sinT, nz);
      uvs.push(u, 1);
    }

    for (let i = 0; i < radialSegments; i++) {
      const row0 = vertexOffset + i * 2;
      const row1 = vertexOffset + (i + 1) * 2;
      indices.push(row0, row1, row0 + 1);
      indices.push(row1, row1 + 1, row0 + 1);
    }
    vertexOffset += (radialSegments + 1) * 2;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  );
  geometry.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeBoundingSphere();

  return geometry;
}

/**
 * Generates radial graduation marker matrices seated along a ring's front face,
 * giving subtle horological rotation cues as each ring orbits around its own axis.
 */
export function buildGraduationMatrices(
  radius: number,
  thickness: number,
  count: number
): THREE.Matrix4[] {
  const matrices: THREE.Matrix4[] = [];
  const dummy = new THREE.Object3D();
  const zOffset = thickness * 0.5 + 0.0025;

  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const isMajor = i % 6 === 0;
    const tickLen = isMajor ? 0.044 : 0.022;
    const tickWidth = isMajor ? 0.0075 : 0.0042;

    dummy.position.set(
      Math.cos(angle) * radius,
      Math.sin(angle) * radius,
      zOffset
    );
    dummy.rotation.set(0, 0, angle);
    dummy.scale.set(tickLen, tickWidth, 0.004);
    dummy.updateMatrix();
    matrices.push(dummy.matrix.clone());
  }

  return matrices;
}
