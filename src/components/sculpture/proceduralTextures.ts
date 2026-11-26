import * as THREE from "three";

export interface ProceduralMetalTextures {
  bumpMap: THREE.CanvasTexture;
  roughnessMap: THREE.CanvasTexture;
  dispose: () => void;
}

/**
 * Deterministic PRNG (Mulberry32) so procedural metallic grain is identical across sessions.
 */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Generates high-resolution procedural brushed-metal bump and micro-roughness textures
 * using offscreen HTML5 canvases. Zero network latency, subtle lathe anisotropy and patina.
 */
export function createProceduralMetalTextures(
  seed = 1337
): ProceduralMetalTextures {
  const width = 1024;
  const height = 512;
  const rand = mulberry32(seed);

  // 1. Brushed Anisotropic Bump Map (circumferential lathe lines + micro imperfections)
  const bumpCanvas = document.createElement("canvas");
  bumpCanvas.width = width;
  bumpCanvas.height = height;
  const bCtx = bumpCanvas.getContext("2d");

  // 2. Micro-Roughness Map (subtle patina variations breaking uniform CGI sheen)
  const roughCanvas = document.createElement("canvas");
  roughCanvas.width = width;
  roughCanvas.height = height;
  const rCtx = roughCanvas.getContext("2d");

  if (bCtx && rCtx) {
    // Base neutral mid-gray for bump, high-gray for roughness multiplier
    bCtx.fillStyle = "rgb(128, 128, 128)";
    bCtx.fillRect(0, 0, width, height);

    rCtx.fillStyle = "rgb(225, 225, 225)";
    rCtx.fillRect(0, 0, width, height);

    // Fine directional circumferential brushed streaks (aligned along U = x axis)
    for (let i = 0; i < 1600; i++) {
      const y = rand() * height;
      const shade = Math.floor(96 + rand() * 68);
      const alpha = 0.06 + rand() * 0.14;
      const lineW = 0.4 + rand() * 1.4;
      bCtx.strokeStyle = `rgba(${shade}, ${shade}, ${shade}, ${alpha})`;
      bCtx.lineWidth = lineW;
      bCtx.beginPath();
      bCtx.moveTo(0, y);
      bCtx.lineTo(width, y);
      bCtx.stroke();

      // Correlated micro-roughness streaks
      const rShade = Math.floor(195 + rand() * 58);
      rCtx.strokeStyle = `rgba(${rShade}, ${rShade}, ${rShade}, ${alpha * 0.9})`;
      rCtx.lineWidth = lineW * 1.3;
      rCtx.beginPath();
      rCtx.moveTo(0, y);
      rCtx.lineTo(width, y);
      rCtx.stroke();
    }

    // Subtle localized patina / hand-finished sheen variations (soft radial blotches)
    for (let i = 0; i < 42; i++) {
      const cx = rand() * width;
      const cy = rand() * height;
      const rad = 28 + rand() * 95;
      const darker = rand() > 0.5;
      const grad = rCtx.createRadialGradient(cx, cy, 2, cx, cy, rad);
      if (darker) {
        grad.addColorStop(0, "rgba(175, 175, 175, 0.16)");
        grad.addColorStop(1, "rgba(225, 225, 225, 0)");
      } else {
        grad.addColorStop(0, "rgba(255, 255, 255, 0.16)");
        grad.addColorStop(1, "rgba(225, 225, 225, 0)");
      }
      rCtx.fillStyle = grad;
      rCtx.fillRect(cx - rad, cy - rad, rad * 2, rad * 2);
    }

    // Subtle precision micro-scratches (very restrained, realistic machined metal feel)
    for (let i = 0; i < 85; i++) {
      const x1 = rand() * width;
      const y1 = rand() * height;
      const len = 12 + rand() * 55;
      const angle = (rand() - 0.5) * 0.25;
      const x2 = x1 + Math.cos(angle) * len;
      const y2 = y1 + Math.sin(angle) * len;
      const bright = rand() > 0.5 ? 170 : 88;
      bCtx.strokeStyle = `rgba(${bright}, ${bright}, ${bright}, 0.16)`;
      bCtx.lineWidth = 0.65;
      bCtx.beginPath();
      bCtx.moveTo(x1, y1);
      bCtx.lineTo(x2, y2);
      bCtx.stroke();
    }
  }

  const bumpMap = new THREE.CanvasTexture(bumpCanvas);
  bumpMap.wrapS = THREE.RepeatWrapping;
  bumpMap.wrapT = THREE.RepeatWrapping;
  bumpMap.repeat.set(6, 2);
  bumpMap.anisotropy = 8;
  bumpMap.needsUpdate = true;

  const roughnessMap = new THREE.CanvasTexture(roughCanvas);
  roughnessMap.wrapS = THREE.RepeatWrapping;
  roughnessMap.wrapT = THREE.RepeatWrapping;
  roughnessMap.repeat.set(5, 2);
  roughnessMap.anisotropy = 8;
  roughnessMap.needsUpdate = true;

  return {
    bumpMap,
    roughnessMap,
    dispose: () => {
      bumpMap.dispose();
      roughnessMap.dispose();
    },
  };
}
