# Alessia Micieli — Interactive Research Portfolio

Interactive personal research portfolio for **Alessia Micieli** (Computer Science, University of Catania — Computer Vision, Multimodal AI, Egocentric Vision & Human-Centered Understanding).

> **One object. Multiple perspectives. A connected research journey.**

## Project Folder Structure (Hosting-Ready)

```text
Sito_Mio/
├── .github/
│   └── workflows/
│       └── deploy-pages.yml      # Ready-to-use GitHub Pages CI/CD pipeline
├── public/                       # Static assets served from root /
│   ├── cv/                       # Drop your official PDF CV here
│   ├── papers/                   # Optional local publication PDFs
│   ├── images/projects/          # Optional dataset frames & visual figures
│   └── og-card.svg               # OpenGraph social preview card
├── scripts/
│   └── build-static.mjs          # Cross-platform static HTML export builder (out/)
├── src/
│   ├── app/                      # Next.js App Router pages & SEO routes
│   │   ├── layout.tsx            # Persistent shell + SEO/OpenGraph metadata
│   │   ├── globals.css           # Palette, typography & editorial hairlines
│   │   ├── page.tsx              # Interactive 3D homepage & perspective dial
│   │   ├── icon.svg              # Geometric interlocking rings favicon
│   │   ├── robots.ts             # Dynamic/static robots.txt generator
│   │   ├── sitemap.ts            # Dynamic/static sitemap.xml generator
│   │   ├── manifest.ts           # Web App Manifest
│   │   ├── not-found.tsx         # Editorial 404 route
│   │   ├── about/page.tsx
│   │   ├── research/page.tsx
│   │   ├── publications/page.tsx
│   │   ├── projects/
│   │   │   ├── page.tsx          # Projects index (SignIT + public GitHub repositories)
│   │   │   └── [slug]/page.tsx   # SSG project monographs (SignIT, EchoLens, Phoenix Vision, etc.)
│   │   ├── interests/page.tsx    # Interactive research network
│   │   └── contact/page.tsx      # Contact, platforms & printable CV
│   ├── components/
│   │   ├── editorial/            # SectionFrame, ProjectVisualPlate, InterestsNetwork
│   │   ├── layout/               # PersistentShell, SiteHeader
│   │   └── sculpture/            # InterlockingRings, SculptureScene, procedural PBR, SVG fallback
│   ├── data/                     # Single source of truth for editable academic content
│   │   ├── profile.ts
│   │   ├── research.ts
│   │   ├── publications.ts
│   │   ├── projects.ts
│   │   └── interests.ts
│   ├── lib/
│   │   ├── sculptureConfig.ts    # Per-section PBR materials, lights & spatial presets
│   │   ├── siteConfig.ts         # Canonical site URL helper
│   │   └── webgl.ts              # Graceful WebGL capability detection
│   └── store/
│       └── portfolioStore.ts     # Centralized Zustand synchronization store
├── .env.example                  # Domain & optional subpath environment variables
├── .nvmrc                        # Node.js 20 version pin
├── next.config.ts                # Supports standard hosting AND static export
├── vercel.json                   # Vercel security headers & framework config
└── package.json
```

## Updating Content

Edit the structured TypeScript modules in `src/data/` — zero UI code changes needed:

- `src/data/profile.ts` — Biography, timeline, pillars, contact email, social/academic links.
- `src/data/research.ts` — Six core research directions and scientific questions.
- `src/data/publications.ts` — Academic archive entries, abstracts, DOIs, PDFs, and BibTeX citations.
- `src/data/projects.ts` — Detailed project monographs (`SignIT`, `EchoLens`, `Project Phoenix Vision`, `EventHorizon Track 8`, `TAP_AM`, `SpokeLizard_TAP`, `Tutorial Social Media YT`).
- `src/data/interests.ts` — Interactive research topic / project / publication network topology.

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Hosting & Deployment

The repository supports **both** managed Next.js hosting and pure static HTML hosting out of the box:

### Option A — Vercel (Recommended, Zero-Config)
1. Push this folder to a GitHub repository.
2. Import the repository on [vercel.com](https://vercel.com).
3. Optionally set `NEXT_PUBLIC_SITE_URL` in Project Settings → Environment Variables to your final domain.
4. Vercel automatically runs `npm run build` and applies the security headers in `vercel.json`.

### Option B — GitHub Pages (Free Static Academic Hosting)
1. Push to GitHub (`main` branch).
2. In your repository settings: **Settings → Pages → Source → GitHub Actions**.
3. If deploying under a project subpath (`https://<user>.github.io/<repo>`), add repository variable `NEXT_PUBLIC_BASE_PATH=/<repo>` and `NEXT_PUBLIC_SITE_URL=https://<user>.github.io/<repo>`.
4. The workflow in `.github/workflows/deploy-pages.yml` automatically runs `npm run build:static` and publishes `./out`.

### Option C — Netlify / Cloudflare Pages / University Static Server
- **Standard Next.js adapter**: Build command `npm run build`.
- **Pure static output (`out/`)**: Build command `npm run build:static`, publish directory `out`.
