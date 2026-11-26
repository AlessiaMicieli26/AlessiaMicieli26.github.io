"use client";

import { create } from "zustand";
import { NavSectionId, SectionId } from "@/lib/sculptureConfig";

interface PortfolioState {
  // Active route section
  activeSection: SectionId;
  // Homepage interactive preview section (changes material & HUD live while rotating/hovering)
  previewSection: NavSectionId | null;
  // Currently hovered physical ring index (0..3) or null
  hoveredRing: number | null;
  // Live user drag azimuth on homepage in degrees [0, 360)
  azimuthDeg: number;
  // Triggered target azimuth when user clicks a compass label or ring on home
  requestedAzimuthDeg: number | null;
  // Normalized vertical scroll progress [0, 1] on inner pages
  scrollProgress: number;
  // Subtle impulse from hovering projects or interest graph nodes
  interactionPulse: number;
  // User or OS reduced-motion preference
  reducedMotion: boolean;
  // Whether user is actively dragging the 3D sculpture
  isDragging: boolean;

  setActiveSection: (section: SectionId) => void;
  setPreviewSection: (section: NavSectionId | null) => void;
  setHoveredRing: (ring: number | null) => void;
  setAzimuthDeg: (deg: number) => void;
  requestAzimuth: (deg: number | null) => void;
  setScrollProgress: (progress: number) => void;
  triggerPulse: (amount?: number) => void;
  setReducedMotion: (reduced: boolean) => void;
  setIsDragging: (dragging: boolean) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  activeSection: "home",
  previewSection: null,
  hoveredRing: null,
  azimuthDeg: 0,
  requestedAzimuthDeg: null,
  scrollProgress: 0,
  interactionPulse: 0,
  reducedMotion: false,
  isDragging: false,

  setActiveSection: (section) =>
    set((state) => ({
      activeSection: section,
      previewSection: section === "home" ? state.previewSection : null,
      scrollProgress: 0,
    })),
  setPreviewSection: (section) => set({ previewSection: section }),
  setHoveredRing: (ring) => set({ hoveredRing: ring }),
  setAzimuthDeg: (deg) => set({ azimuthDeg: ((deg % 360) + 360) % 360 }),
  requestAzimuth: (deg) => set({ requestedAzimuthDeg: deg }),
  setScrollProgress: (progress) =>
    set({ scrollProgress: Math.max(0, Math.min(1, progress)) }),
  triggerPulse: (amount = 1) =>
    set((state) => ({ interactionPulse: state.interactionPulse + amount })),
  setReducedMotion: (reduced) => set({ reducedMotion: reduced }),
  setIsDragging: (dragging) => set({ isDragging: dragging }),
}));
