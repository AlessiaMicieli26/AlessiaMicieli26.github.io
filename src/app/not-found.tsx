import Link from "next/link";
import { ArrowUpLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="pointer-events-none mx-auto flex min-h-[100dvh] max-w-[1440px] flex-col justify-center px-5 md:px-10">
      <div className="pointer-events-auto max-w-lg">
        <p className="mono-label text-limeAccent">404 / Perspective Not Found</p>
        <h1 className="mt-4 font-display text-3xl font-normal tracking-editorial text-alabaster md:text-4xl">
          This coordinate lies outside the archive.
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-slateMuted">
          Return to the central interlocking sculpture to navigate across
          research directions, publications, and projects.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 border border-alabaster/20 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-alabaster transition-colors hover:border-limeAccent hover:text-limeAccent"
        >
          <ArrowUpLeft size={13} />
          <span>Return to Origin</span>
        </Link>
      </div>
    </section>
  );
}
