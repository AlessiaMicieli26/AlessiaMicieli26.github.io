import type { MetadataRoute } from "next";
import { BASE_PATH } from "@/lib/siteConfig";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Alessia Micieli — Interactive Research Portfolio",
    short_name: "Alessia Micieli",
    description:
      "Research portfolio in Computer Vision, Multimodal AI, Egocentric Vision, and Human-Centered Understanding.",
    start_url: `${BASE_PATH}/`,
    display: "standalone",
    background_color: "#101114",
    theme_color: "#101114",
    icons: [
      {
        src: `${BASE_PATH}/icon.svg`,
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
