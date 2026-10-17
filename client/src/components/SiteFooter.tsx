import { Reveal } from "./reveal";

const COLS = [
  { t: "Fund", l: ["Thesis", "How we partner", "Send a deck"] },
  { t: "Touch", l: ["London", "Dublin", "Berlin", "hello@prafounds.com"] },
];

export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t" style={{ borderColor: "var(--pf-line)", background: "var(--pf-bg)" }}>
      <div className="mx-auto max-w-[1320px] px-5 pt-16 sm:px-10">
        <div className="grid gap-12 md:grid-cols-[1.6fr_repeat(2,1fr)]">
          <div>
            <div className="flex items-center">
              {/* Name-only crop of the reverse wordmark — the stacked
                  "VENTURES" sub-line is dropped here. */}
              <img
                src="/logo-wordmark-reverse-nosub.png"
                alt="PraFounds"
                width={900}
                height={168}
                className="h-[30px] w-auto"
              />
            </div>
            <p className="mt-4 max-w-xs text-[13px] leading-relaxed" style={{ color: "var(--pf-muted)" }}>
              The first yes for technical founders. Pre-seed and seed in the UK,
              Ireland, Europe, and India.
            </p>
            <p className="pf-mono mt-5 text-[10.5px] uppercase tracking-[0.16em]" style={{ color: "var(--pf-dim)" }}>
              Est. 2022 · regulated by the FCA
            </p>
          </div>
          {COLS.map((c) => (
            <div key={c.t}>
              <div className="pf-mono text-[10px] font-medium uppercase tracking-[0.2em]" style={{ color: "var(--pf-acid)" }}>
                {c.t}
              </div>
              <ul className="mt-4 space-y-2.5">
                {c.l.map((x) => (
                  <li key={x}>
                    <a href="#" className="inline-block py-1.5 text-[13px] transition-colors hover:text-[#f4f4f4] sm:py-0" style={{ color: "var(--pf-muted)" }}>
                      {x}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* giant outline wordmark */}
        <Reveal className="mt-16 select-none">
          <div
            aria-hidden="true"
            className="pf-display pf-outline-text whitespace-nowrap text-center font-semibold leading-[0.86] tracking-[-0.02em]"
            style={{ fontSize: "clamp(64px, 13.5vw, 196px)" }}
          >
            PRAFOUNDS
          </div>
        </Reveal>
      </div>

      <div className="border-t" style={{ borderColor: "var(--pf-line)" }}>
        <div className="mx-auto max-w-[1320px] px-5 py-6 sm:px-10">
          <div className="flex flex-col items-start justify-between gap-2 text-[11.5px] sm:flex-row sm:items-center" style={{ color: "var(--pf-muted)" }}>
            <span>© {new Date().getFullYear()} PraFounds Ventures · authorised &amp; regulated by the FCA</span>
            <span className="pf-mono text-[10.5px]">v2026.07 · dark by default · built to last</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
