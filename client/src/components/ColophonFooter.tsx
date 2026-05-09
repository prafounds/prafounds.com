const COLS = [
  { t: "Fund", l: ["Thesis", "Portfolio", "How we partner", "Send a deck"] },
  { t: "Founders", l: ["Founders' guild", "Office hours", "Resources", "FAQ"] },
  { t: "Letters", l: ["Quarterly memos", "LP updates", "Press", "Open positions"] },
  { t: "Touch", l: ["London", "Dublin", "Berlin", "hello@prafounds.com"] },
];

export default function ColophonFooter() {
  return (
    <footer className="relative" style={{ background: "var(--prf-paper)" }}>
      <div className="mx-auto max-w-7xl px-5 pt-12 pb-10 sm:px-10">
        <div className="grid gap-10 md:grid-cols-[1.5fr_repeat(4,1fr)]">
          <div>
            <div className="flex items-center gap-2.5">
              <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-md" style={{ background: "var(--prf-ink)", color: "var(--prf-bone)" }}>
                <span style={{ fontFamily: "var(--prf-display)", fontStyle: "italic" }} className="text-[16px] font-semibold">P</span>
              </span>
              <span style={{ fontFamily: "var(--prf-display)", color: "var(--prf-ink)" }} className="text-[20px] font-semibold tracking-[-0.02em]">PraFounds</span>
            </div>
            <p style={{ color: "var(--prf-ink-muted)" }} className="mt-4 max-w-xs text-[13px] leading-relaxed">
              Patient capital for technical founders. Pre-seed and seed in the UK, Ireland, and Europe.
            </p>
            <p style={{ fontFamily: "var(--prf-display)", fontStyle: "italic", color: "var(--prf-indigo)" }} className="mt-5 text-[15px]">
              Est. 2022 · regulated by the FCA
            </p>
          </div>
          {COLS.map((c) => (
            <div key={c.t}>
              <div style={{ fontFamily: "var(--prf-mono)", color: "var(--prf-ink-muted)" }} className="text-[10.5px] font-semibold uppercase tracking-[0.18em]">
                {c.t}
              </div>
              <ul className="mt-3 space-y-2">
                {c.l.map((x) => (
                  <li key={x}>
                    <a href="#" className="text-[13px]" style={{ color: "var(--prf-ink)" }}>
                      {x}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t" style={{ borderColor: "var(--prf-rule)" }}>
        <div className="mx-auto max-w-7xl px-5 py-5 sm:px-10">
          <p style={{ color: "var(--prf-ink-muted)" }} className="text-[10.5px] leading-relaxed">
            Information on this site is provided for the purpose of describing PraFounds Ventures and is not an offer to sell, or a solicitation of an offer to buy, any security. Investments are illiquid and risk total loss. Past performance does not guarantee future results.
          </p>
          <div className="mt-3 flex flex-col items-start justify-between gap-2 text-[12px] sm:flex-row sm:items-center" style={{ color: "var(--prf-ink-muted)" }}>
            <span>© {new Date().getFullYear()} PraFounds Ventures · authorised &amp; regulated by the FCA</span>
            <span style={{ fontFamily: "var(--prf-mono)" }}>v2026.05 · printed on light · delivered on wireless</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
