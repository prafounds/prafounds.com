import { Reveal } from "./reveal";

const COLS = [
  { t: "Fund", l: ["Thesis", "Portfolio", "How we partner", "Send a deck"] },
  { t: "Founders", l: ["Founders' guild", "Office hours", "Resources", "FAQ"] },
  { t: "Letters", l: ["Quarterly memos", "LP updates", "Press", "Open positions"] },
  { t: "Touch", l: ["London", "Dublin", "Berlin", "hello@prafounds.com"] },
];

export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t" style={{ borderColor: "var(--pf-line)", background: "var(--pf-bg)" }}>
      <div className="mx-auto max-w-[1320px] px-5 pt-16 sm:px-10">
        <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <div className="flex items-center gap-3">
              <img src="/logo-mark-reverse.png" alt="PraFounds Ventures logo" className="h-11 w-auto" />
              <span className="pf-display text-[19px] font-semibold tracking-[-0.02em]" style={{ color: "var(--pf-text)" }}>
                PraFounds
              </span>
            </div>
            <p className="mt-4 max-w-xs text-[13px] leading-relaxed" style={{ color: "var(--pf-muted)" }}>
              The first yes for technical founders. Pre-seed and seed in the UK,
              Ireland, and Europe.
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
                    <a href="#" className="text-[13px] transition-colors hover:text-[#d7fe55]" style={{ color: "var(--pf-muted)" }}>
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
            className="pf-display pf-outline-text whitespace-nowrap text-center font-bold leading-[0.8] tracking-[-0.04em]"
            style={{ fontSize: "clamp(64px, 13.5vw, 196px)" }}
          >
            PRAFOUNDS
          </div>
        </Reveal>
      </div>

      <div className="border-t" style={{ borderColor: "var(--pf-line)" }}>
        <div className="mx-auto max-w-[1320px] px-5 py-6 sm:px-10">
          <p className="text-[10.5px] leading-relaxed" style={{ color: "var(--pf-dim)" }}>
            Information on this site is provided for the purpose of describing PraFounds
            Ventures and is not an offer to sell, or a solicitation of an offer to buy, any
            security. Investments are illiquid and risk total loss. Past performance does
            not guarantee future results.
          </p>
          <div className="mt-4 flex flex-col items-start justify-between gap-2 text-[11.5px] sm:flex-row sm:items-center" style={{ color: "var(--pf-muted)" }}>
            <span>© {new Date().getFullYear()} PraFounds Ventures · authorised &amp; regulated by the FCA</span>
            <span className="pf-mono text-[10.5px]">v2026.07 · dark by default · built to last</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
