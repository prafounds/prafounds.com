const PARTNERS = [
  { name: "Rohit V.", role: "General partner", bg: "Eng leader · Riot, Stripe", base: "London", focus: "Dev tools · infra" },
  { name: "Aoife K.", role: "General partner", bg: "Founder, exited 2019", base: "Dublin", focus: "Applied AI · trust" },
  { name: "Tomas R.", role: "Operating partner", bg: "ex-CTO · 3 portfolio cos", base: "Berlin", focus: "Hiring · GTM" },
  { name: "Sara M.", role: "Platform", bg: "Communities lead", base: "London", focus: "Founders' guild" },
];

export default function Team() {
  return (
    <section id="team" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <div className="grid gap-3 md:grid-cols-[1fr_minmax(0,1fr)] md:items-end md:gap-12">
          <h2 style={{ fontFamily: "var(--prf-display)", color: "var(--prf-ink)" }} className="text-[36px] font-semibold leading-[1.04] tracking-[-0.02em] sm:text-[56px]">
            The desk.
          </h2>
          <p style={{ color: "var(--prf-ink-muted)" }} className="max-w-md text-[14.5px] leading-relaxed">
            Two GPs, an operating partner, and a platform lead. Not a hundred people; a desk. We answer your emails personally. Always.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PARTNERS.map((p) => (
            <article key={p.name} className="prf-rise rounded-md border p-6" style={{ borderColor: "var(--prf-rule)", background: "var(--prf-card)" }}>
              <div className="grid h-16 w-16 place-items-center rounded-full text-[24px] font-semibold text-white" style={{ background: "linear-gradient(135deg, #4f46e5, #d97706)", fontFamily: "var(--prf-display)" }}>
                {p.name.charAt(0)}
              </div>
              <h3 style={{ fontFamily: "var(--prf-display)", color: "var(--prf-ink)" }} className="mt-4 text-[22px] font-semibold leading-tight tracking-[-0.01em]">
                {p.name}
              </h3>
              <div style={{ color: "var(--prf-ink-muted)", fontFamily: "var(--prf-mono)" }} className="mt-1 text-[10.5px] uppercase tracking-[0.18em]">
                {p.role}
              </div>
              <p style={{ color: "var(--prf-ink-muted)" }} className="mt-3 text-[13px] leading-relaxed">
                {p.bg}
              </p>
              <div className="mt-4 flex items-center justify-between border-t pt-3 text-[12px]" style={{ borderColor: "var(--prf-rule)" }}>
                <span style={{ color: "var(--prf-ink)" }}>{p.base}</span>
                <span style={{ color: "var(--prf-indigo)", fontFamily: "var(--prf-mono)" }} className="text-[10.5px] uppercase tracking-[0.18em]">{p.focus}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
