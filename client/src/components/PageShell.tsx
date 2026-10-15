import type { ReactNode } from "react";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { Reveal } from "@/components/reveal";
import { Link } from "wouter";

/**
 * Chrome for the standalone section pages. The background is left
 * transparent so the persistent WebGL layer behind the router shows
 * through — each route parks the camera at its own station, so the
 * backdrop differs page to page without any per-page assets.
 */
export default function PageShell({
  index,
  title,
  lede,
  children,
}: {
  index: string;
  title: ReactNode;
  lede?: string;
  children: ReactNode;
}) {
  return (
    <div className="relative min-h-screen" style={{ color: "var(--pf-text)" }}>
      <SiteNav />
      <main className="pt-16">
        {/* Page header. Short by design — the section below carries the
            real content, and repeating its heading here would be noise. */}
        <header className="relative mx-auto max-w-[1320px] px-5 pb-6 pt-16 sm:px-10 sm:pt-24">
          <Reveal>
            <div className="pf-mono flex items-center gap-3 text-[11px] uppercase tracking-[0.24em]">
              <Link
                href="/"
                className="-my-2 inline-block py-2 transition-colors hover:text-[#f4f4f4]"
                style={{ color: "var(--pf-dim)" }}
              >
                Index
              </Link>
              <span aria-hidden="true" style={{ color: "var(--pf-dim)" }}>
                /
              </span>
              <span style={{ color: "var(--pf-acid)" }}>{index}</span>
            </div>
            <h1
              className="pf-display mt-5 font-semibold leading-[1.02] tracking-[-0.03em]"
              style={{ fontSize: "clamp(42px, 7vw, 92px)", color: "var(--pf-text)" }}
            >
              {title}
            </h1>
            {lede && (
              <p
                className="mt-5 max-w-2xl text-[15px] leading-relaxed sm:text-base"
                style={{ color: "var(--pf-muted)" }}
              >
                {lede}
              </p>
            )}
          </Reveal>
        </header>
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
