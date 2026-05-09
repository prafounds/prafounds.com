interface Co { name: string; sector: string; year: string; round: string; lead: string; tone: "indigo" | "amber" | "leaf" | "rose" | "violet" | "ink" }

const COMPANIES: Co[] = [
  { name: "Lateral", sector: "Dev tools · code search", year: "2022", round: "Pre-seed lead", lead: "Helps engineers navigate giant codebases by intent, not files.", tone: "indigo" },
  { name: "Cascadia", sector: "Applied AI · legal", year: "2023", round: "Seed follow", lead: "Model-agnostic AI agents for in-house legal teams. Now used at 800+ firms.", tone: "amber" },
  { name: "Polaris Health", sector: "Health · ops", year: "2023", round: "Pre-seed lead", lead: "Operations layer for clinics — care plans, schedules, recoveries.", tone: "leaf" },
  { name: "Vega Labs", sector: "Infrastructure · edge", year: "2023", round: "Pre-seed", lead: "Edge runtime for stateful, multi-tenant workloads. EU-resident by default.", tone: "violet" },
  { name: "Northwing", sector: "Trust · KYB", year: "2024", round: "Pre-seed lead", lead: "Business-identity verification for marketplaces. 200+ doc types.", tone: "rose" },
  { name: "Aquila", sector: "Dev tools · CI", year: "2024", round: "Seed follow", lead: "Continuous integration that sleeps when you do — caches everything that doesn't change.", tone: "indigo" },
  { name: "Lumin Co", sector: "Applied AI · ops", year: "2025", round: "Pre-seed lead", lead: "Workflow runtime for B2B teams. Replaces six glue scripts with one.", tone: "amber" },
  { name: "Atlas Hub", sector: "Knowledge · graphs", year: "2025", round: "Pre-seed", lead: "Personal knowledge graph for analysts and operators. Notion meets neo4j.", tone: "leaf" },
  { name: "Brightside", sector: "Education · tools", year: "2025", round: "Pre-seed", lead: "Hands-on coding labs for European secondary schools. Not edu-tech, just tech.", tone: "violet" },
];

const TONE: Record<Co["tone"], string> = {
  indigo: "var(--prf-indigo)",
  amber:  "var(--prf-amber)",
  leaf:   "var(--prf-leaf)",
  rose:   "var(--prf-rose)",
  violet: "var(--prf-violet)",
  ink:    "var(--prf-ink)",
};

export default function Portfolio() {
  return (
    <section id="portfolio" className="relative py-20 sm:py-28" style={{ background: "var(--prf-paper-2)" }}>
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-end md:gap-10">
          <div>
            <span style={{ fontFamily: "var(--prf-mono)", color: "var(--prf-ink-muted)" }} className="text-[10.5px] uppercase tracking-[0.22em]">
              The portfolio
            </span>
            <h2 style={{ fontFamily: "var(--prf-display)", color: "var(--prf-ink)" }} className="mt-3 text-[36px] font-semibold leading-[1.04] tracking-[-0.02em] sm:text-[56px]">
              32 companies.<br />
              <span style={{ fontStyle: "italic", color: "var(--prf-indigo)" }}>One conviction each.</span>
            </h2>
          </div>
          <a href="#" className="hidden text-[13px] font-semibold underline underline-offset-4 md:inline" style={{ color: "var(--prf-ink)" }}>
            See the full roster →
          </a>
        </div>

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {COMPANIES.map((c, i) => (
            <article key={c.name} className="prf-rise group relative overflow-hidden rounded-md border bg-white p-6 transition-all hover:-translate-y-1" style={{ borderColor: "var(--prf-rule)", animationDelay: `${i * 60}ms` }}>
              <div className="flex items-center justify-between">
                <span style={{ fontFamily: "var(--prf-mono)", color: "var(--prf-ink-muted)" }} className="text-[10.5px] uppercase tracking-[0.18em]">{c.sector}</span>
                <span style={{ fontFamily: "var(--prf-mono)", color: TONE[c.tone] }} className="rounded-sm border px-1.5 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.16em]" >
                  {c.round}
                </span>
              </div>
              <h3 style={{ fontFamily: "var(--prf-display)", color: "var(--prf-ink)" }} className="mt-4 text-[28px] font-semibold leading-tight tracking-[-0.01em]">
                {c.name}
              </h3>
              <p style={{ color: "var(--prf-ink-muted)", fontFamily: "var(--prf-display)", fontStyle: "italic" }} className="mt-2 text-[14.5px] leading-relaxed">
                {c.lead}
              </p>
              <div className="mt-5 flex items-center justify-between border-t pt-3 text-[12px]" style={{ borderColor: "var(--prf-rule)" }}>
                <span style={{ color: "var(--prf-ink-muted)", fontFamily: "var(--prf-mono)" }}>Year {c.year}</span>
                <span className="opacity-0 transition-opacity group-hover:opacity-100" style={{ color: TONE[c.tone] }}>Visit →</span>
              </div>
              <span aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" style={{ background: TONE[c.tone] }} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
