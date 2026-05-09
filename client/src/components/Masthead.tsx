export default function Masthead() {
  return (
    <section id="top" className="relative isolate overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 prf-paper-grain">
        <div className="prf-orb absolute -top-24 -left-16 h-[440px] w-[440px] rounded-full" style={{ background: "rgba(79,70,229,0.10)", filter: "blur(120px)" }} />
        <div className="prf-orb absolute -bottom-32 right-0 h-[420px] w-[420px] rounded-full" style={{ background: "rgba(217,119,6,0.08)", filter: "blur(120px)", animationDelay: "-6s" }} />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <div className="flex items-baseline justify-between border-y" style={{ borderColor: "var(--prf-rule-strong)", padding: "8px 0" }}>
          <span style={{ fontFamily: "var(--prf-mono)", color: "var(--prf-ink-muted)" }} className="text-[10.5px] uppercase tracking-[0.22em]">
            Vol. 04 · Issue 09
          </span>
          <span style={{ fontFamily: "var(--prf-mono)", color: "var(--prf-ink-muted)" }} className="hidden text-[10.5px] uppercase tracking-[0.22em] sm:block">
            Pre-seed · Seed · Founders' Fund · Est. 2022
          </span>
          <span style={{ fontFamily: "var(--prf-mono)", color: "var(--prf-ink-muted)" }} className="text-[10.5px] uppercase tracking-[0.22em]">
            UK · IE · EU
          </span>
        </div>

        <div className="grid gap-12 pt-12 lg:grid-cols-[1.5fr_minmax(0,1fr)] lg:gap-16 lg:pt-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-medium" style={{ borderColor: "var(--prf-rule-strong)", color: "var(--prf-indigo)", background: "rgba(79,70,229,0.06)" }}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--prf-indigo)" }} />
              Now writing first cheques · Q2 2026
            </span>
            <h1 style={{ fontFamily: "var(--prf-display)", color: "var(--prf-ink)" }} className="mt-7 text-[44px] font-semibold leading-[0.98] tracking-[-0.025em] text-balance sm:text-[68px] lg:text-[92px]">
              Patient capital
              <br />
              <span style={{ color: "var(--prf-indigo)" }}>for technical</span>
              <br />
              <span style={{ fontStyle: "italic", fontFamily: "var(--prf-display)" }}>founders.</span>
            </h1>
            <p style={{ fontFamily: "var(--prf-display)", fontStyle: "italic", color: "var(--prf-ink-muted)" }} className="mt-7 max-w-2xl text-[19px] leading-relaxed sm:text-[22px]">
              PraFounds backs pre-seed and seed teams building the developer tools, infrastructure, and applied AI that the next decade will run on.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#apply" className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-[14px] font-semibold text-white" style={{ background: "var(--prf-ink)" }}>
                Send your deck
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
              <a href="#thesis" className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-[14px] font-semibold" style={{ borderColor: "var(--prf-rule-strong)", color: "var(--prf-ink)" }}>
                Read the thesis
              </a>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6 border-t pt-7 max-w-xl" style={{ borderColor: "var(--prf-rule)" }}>
              {[
                { v: "£250K — £2M", k: "First-cheque range" },
                { v: "32", k: "Active portfolio" },
                { v: "100%", k: "Reply within 7 days" },
              ].map((s) => (
                <div key={s.k}>
                  <div style={{ fontFamily: "var(--prf-display)", color: "var(--prf-ink)" }} className="text-[20px] font-semibold leading-tight">
                    {s.v}
                  </div>
                  <div style={{ color: "var(--prf-ink-muted)", fontFamily: "var(--prf-mono)" }} className="mt-1 text-[10.5px] uppercase tracking-[0.16em]">
                    {s.k}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* editorial side note */}
          <aside className="lg:sticky lg:top-20 lg:self-start">
            <div className="relative rounded-md border bg-white p-7 shadow-[0_30px_60px_-30px_rgba(14,19,37,0.20)]" style={{ borderColor: "var(--prf-rule-strong)" }}>
              {/* spinning seal */}
              <span aria-hidden="true" className="absolute -right-7 -top-7 grid h-16 w-16 place-items-center">
                <span className="prf-spin-slow absolute inset-0">
                  <svg viewBox="0 0 60 60" className="h-full w-full">
                    <defs><path id="prf-cir" d="M 30 30 m -25 0 a 25 25 0 1 1 50 0 a 25 25 0 1 1 -50 0" /></defs>
                    <text fill="#0e1325" fontFamily="JetBrains Mono, monospace" fontSize="5" letterSpacing="2">
                      <textPath href="#prf-cir">PRAFOUNDS · EST 2022 · </textPath>
                    </text>
                  </svg>
                </span>
                <span className="grid h-7 w-7 place-items-center rounded-full" style={{ background: "var(--prf-indigo)", color: "white", fontFamily: "var(--prf-display)", fontStyle: "italic" }}>
                  <span className="text-[12px] font-semibold">P</span>
                </span>
              </span>

              <span style={{ fontFamily: "var(--prf-mono)", color: "var(--prf-ink-muted)" }} className="text-[10.5px] uppercase tracking-[0.22em]">
                Letter from the partners
              </span>
              <p style={{ fontFamily: "var(--prf-display)", color: "var(--prf-ink)" }} className="prf-dropcap mt-4 text-[15px] leading-relaxed" lang="en">
                We are not the fund that helps you raise the next round. We are the fund that helps you build a company you'd still want to be running in 2036. We work small. We answer fast. We sweat the schematics, not the slide deck.
              </p>
              <div className="mt-6 flex items-center gap-3 border-t pt-4" style={{ borderColor: "var(--prf-rule)" }}>
                <span className="grid h-8 w-8 place-items-center rounded-full text-white text-[12px] font-semibold" style={{ background: "linear-gradient(135deg, #4f46e5, #d97706)", fontFamily: "var(--prf-display)" }}>R</span>
                <div>
                  <div style={{ color: "var(--prf-ink)" }} className="text-[12.5px] font-semibold">Rohit & co-founders</div>
                  <div style={{ color: "var(--prf-ink-muted)" }} className="text-[11px]">London · Dublin · Berlin</div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
