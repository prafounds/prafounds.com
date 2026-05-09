const QUOTES = [
  { q: "PraFounds wired our first 12 customers in seven days. Kept showing up. Kept being right.", who: "Erik N.", role: "Founder · Lateral", year: "2022" },
  { q: "First fund I've worked with that says 'no' clearly and 'yes' quietly. The quiet 'yes' has been worth every percent.", who: "Yuki O.", role: "Founder · Cascadia", year: "2023" },
  { q: "The Tuesday cadence makes raising feel boring. In the best possible way. They show up; they don't perform.", who: "Tomas R.", role: "Founder · Polaris Health", year: "2023" },
];

export default function FounderVoices() {
  return (
    <section className="relative border-t py-20 sm:py-28" style={{ borderColor: "var(--prf-rule-strong)", background: "var(--prf-paper)" }}>
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-end md:gap-10">
          <h2 style={{ fontFamily: "var(--prf-display)", color: "var(--prf-ink)" }} className="text-[36px] font-semibold leading-[1.04] tracking-[-0.02em] sm:text-[52px]">
            Founder<br />
            <span style={{ fontStyle: "italic", color: "var(--prf-indigo)" }}>references.</span>
          </h2>
          <p style={{ color: "var(--prf-ink-muted)" }} className="max-w-sm text-[14px] leading-relaxed">
            We give every prospective company three founder references on request — not curated, not warned in advance.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {QUOTES.map((q) => (
            <figure key={q.who} className="rounded-md border bg-white p-7" style={{ borderColor: "var(--prf-rule)" }}>
              <span style={{ fontFamily: "var(--prf-display)", color: "var(--prf-indigo)" }} className="text-[36px] font-semibold leading-none italic">"</span>
              <blockquote style={{ fontFamily: "var(--prf-display)", color: "var(--prf-ink)" }} className="mt-2 text-[18px] leading-relaxed">
                {q.q}
              </blockquote>
              <figcaption className="mt-6 flex items-center justify-between gap-3 border-t pt-4 text-[12.5px]" style={{ borderColor: "var(--prf-rule)" }}>
                <div>
                  <div style={{ color: "var(--prf-ink)" }} className="font-semibold">{q.who}</div>
                  <div style={{ color: "var(--prf-ink-muted)" }}>{q.role}</div>
                </div>
                <span style={{ fontFamily: "var(--prf-mono)", color: "var(--prf-ink-muted)" }} className="text-[11px] uppercase tracking-[0.16em]">
                  invested {q.year}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
