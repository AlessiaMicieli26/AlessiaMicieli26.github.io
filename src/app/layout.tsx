import type { Metadata } from "next";
import "./globals.css";
import { PersistentShell } from "@/components/layout/PersistentShell";
import { BASE_PATH, SITE_URL } from "@/lib/siteConfig";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Alessia Micieli — Research Portfolio",
    template: "%s · Alessia Micieli",
  },
  description:
    "Interactive research portfolio of Alessia Micieli — Computer Science researcher working in Computer Vision, Multimodal AI, Egocentric Vision, and Human-Centered Understanding at the University of Catania.",
  keywords: [
    "Alessia Micieli",
    "Computer Vision",
    "Egocentric Vision",
    "Multimodal AI",
    "SignIT",
    "EGOEXTRA",
    "University of Catania",
    "IPLab",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Alessia Micieli — Research Portfolio",
    title: "Alessia Micieli — Interactive Research Portfolio",
    description:
      "Understanding the world, one perspective at a time. Exploring computer vision, multimodal intelligence and human-centered understanding.",
    images: [
      {
        url: `${BASE_PATH}/og-card.svg`,
        width: 1200,
        height: 630,
        alt: "Alessia Micieli — Interactive Research Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alessia Micieli — Interactive Research Portfolio",
    description:
      "Exploring computer vision, multimodal intelligence and human-centered understanding.",
    images: [`${BASE_PATH}/og-card.svg`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
        />
      </head>
      <body className="bg-obsidian text-alabaster antialiased">
        <PersistentShell>{children}</PersistentShell>
      </body>
    </html>
  );
}
