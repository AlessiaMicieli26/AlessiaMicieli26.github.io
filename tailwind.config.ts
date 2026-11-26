import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#101114",
        surface: "#15171C",
        elevated: "#1A1D24",
        alabaster: "#E9E7DF",
        slateMuted: "#858991",
        limeAccent: "#B9E66A",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-ibm-plex-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        editorial: "-0.03em",
        technical: "0.14em",
      },
    },
  },
  plugins: [],
};

export default config;
