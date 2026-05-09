const STEPS = [
  { n: "01", t: "Reply within 7 days", b: "Every email gets read by a partner. We say yes or no quickly, with a reason. Even no's get a useful note." },
  { n: "02", t: "Two diligence calls", b: "One on the technical wedge, one on the team. We don't run a circus of follow-ups, and we don't ghost you between meetings." },
  { n: "03", t: "Decisions on a cadence", b: "We meet on Tuesdays. If your deck arrives by Friday, you'll know on the next Tuesday. No partner-meeting roulette." },
  { n: "04", t: "After the cheque, the work", b: "First 100 hires, first 100 customers, first board, first crisis — we keep showing up. Quietly. For years, not photos." },
];

export default function HowWePartner() {
  return (
    <section id="partner" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <div className="mb-12 max-w-2xl">
          <span style={{ fontFamily: "var(--prf-mono)", color: "var(--prf-ink-muted)" }} className="text-[10.5px] uppercase tracking-[0.22em]">
            How we partner
          </span>
          <h2 style={{ fontFamily: "var(--prf-display)", color: "var(--prf-ink)" }} className="mt-3 text-[36px] font-semibold leading-[1.04] tracking-[-0.02em] sm:text-[52px]">
            Quietly.{" "}
            <span style={{ fontStyle: "italic", color: "var(--prf-indigo)" }}>For years.</span>
          </h2>
        </div>

        <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.n} className="prf-rise" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="grid grid-cols-[40px_1fr] gap-4 border-t pt-4" style={{ borderColor: "var(--prf-ink)" }}>
                <span style={{ fontFamily: "var(--prf-display)", color: "var(--prf-indigo)" }} className="text-[28px] font-semibold leading-none italic">{s.n}</span>
                <div>
                  <h3 style={{ fontFamily: "var(--prf-display)", color: "var(--prf-ink)" }} className="text-[20px] font-semibold leading-snug tracking-[-0.01em]">{s.t}</h3>
                  <p style={{ color: "var(--prf-ink-muted)" }} className="mt-3 text-[14px] leading-relaxed">{s.b}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
