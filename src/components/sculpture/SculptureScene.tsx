"use client";

import React, { Component, ReactNode, useEffect, useState } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { useRouter } from "next/navigation";
import { isWebGLAvailable } from "@/lib/webgl";
import { usePortfolioStore } from "@/store/portfolioStore";
import { InterlockingRings } from "./InterlockingRings";
import { SculptureFallback } from "./SculptureFallback";

interface ErrorBoundaryState {
  hasError: boolean;
}

class CanvasErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

/**
 * Persistent full-viewport WebGL canvas mounted once at root layout level.
 * Never destroyed or remounted during route navigation — the 3D sculpture transitions
 * continuously from the homepage centerpiece into an integrated element of every page.
 */
export function SculptureScene() {
  const router = useRouter();
  const activeSection = usePortfolioStore((s) => s.activeSection);
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null);
  const [contextLost, setContextLost] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setWebglSupported(isWebGLAvailable());
    // Smooth non-blocking fade-in once hydrated
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  if (webglSupported === false || contextLost) {
    return <SculptureFallback />;
  }

  const isHome = activeSection === "home";

  return (
    <CanvasErrorBoundary fallback={<SculptureFallback />}>
      <div
        className={`pointer-events-auto fixed inset-0 z-10 transition-opacity duration-700 ${
          mounted ? "opacity-100" : "opacity-0"
        } ${isHome ? "touch-none" : "touch-pan-y"}`}
        aria-label="Interactive 3D interlocking rings sculpture"
      >
        {/* Subtle studio radial depth vignette — strictly architectural, no neon gradients */}
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              "radial-gradient(ellipse 68% 62% at 54% 48%, rgba(233, 231, 223, 0.038) 0%, rgba(16, 17, 20, 0) 68%)",
          }}
        />

        {webglSupported && (
          <Canvas
            dpr={[1, 1.5]}
            camera={{ position: [0, 0, 7.3], fov: 36, near: 0.1, far: 45 }}
            gl={{
              antialias: true,
              alpha: false,
              powerPreference: "high-performance",
              toneMapping: THREE.ACESFilmicToneMapping,
              toneMappingExposure: 1.08,
            }}
            onCreated={({ gl }) => {
              const canvas = gl.domElement;
              const onLost = (e: Event) => {
                e.preventDefault();
                setContextLost(true);
              };
              const onRestored = () => setContextLost(false);
              canvas.addEventListener("webglcontextlost", onLost);
              canvas.addEventListener("webglcontextrestored", onRestored);
            }}
          >
            <color attach="background" args={["#101114"]} />
            {/* Architectural Gallery Studio HDRI generated procedurally via Lightformers */}
            <Environment resolution={256} frames={1}>
              {/* Overhead architectural light slit */}
              <Lightformer
                form="rect"
                intensity={2.6}
                color="#F8F5EE"
                scale={[12, 2.2, 1]}
                position={[0, 7, 2]}
                rotation={[Math.PI / 2.2, 0, 0]}
              />
              {/* Warm lateral softbox (accentuates brushed titanium & satin silver chamfers) */}
              <Lightformer
                form="rect"
                intensity={2.1}
                color="#FFF0DC"
                scale={[4.5, 9, 1]}
                position={[8, 1.5, 3]}
                rotation={[0, -Math.PI / 2.3, 0]}
              />
              {/* Cool precision edge panel (creates high-contrast dark metal reflections) */}
              <Lightformer
                form="rect"
                intensity={1.9}
                color="#D4E4FA"
                scale={[3.5, 8, 1]}
                position={[-8, 2.5, -2]}
                rotation={[0, Math.PI / 2.1, 0]}
              />
              {/* Subtle rear architectural horizon bounce */}
              <Lightformer
                form="ring"
                intensity={1.4}
                color="#E5E9F0"
                scale={7}
                position={[0, -5.5, -5]}
                rotation={[-Math.PI / 3, 0, 0]}
              />
              {/* Crisp zenith highlight bar */}
              <Lightformer
                form="rect"
                intensity={3.2}
                color="#FFFFFF"
                scale={[1.4, 6, 1]}
                position={[-3, 6, -5]}
                rotation={[Math.PI / 3, 0.4, 0]}
              />
            </Environment>

            <InterlockingRings onNavigate={(href) => router.push(href)} />
          </Canvas>
        )}
      </div>
    </CanvasErrorBoundary>
  );
}
