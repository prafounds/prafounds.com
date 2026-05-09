interface Pillar { n: string; name: string; lead: string; bullets: string[]; tone: string }

const PILLARS: Pillar[] = [
  { n: "I", name: "Developer tools", lead: "We back the small teams that hand engineers superpowers — IDE plugins, framework breakthroughs, runtime gains.", bullets: ["Bottoms-up adoption", "Open-source first", "Clear technical wedge"], tone: "indigo" },
  { n: "II", name: "Applied AI", lead: "AI that ships. We invest in workflows-with-LLMs over chat-toys; vertical depth over horizontal hype.", bullets: ["Real workflow wins", "Domain expertise", "BYO-model friendly"], tone: "amber" },
  { n: "III", name: "Infrastructure", lead: "Databases, queues, edge runtimes, observability. The boring substrate that makes everything else fast.", bullets: ["Long arc, big TAM", "Migrations are moats", "Self-host options"], tone: "leaf" },
  { n: "IV", name: "Trust & data", lead: "Identity, compliance, audit, knowledge. Trust is the next layer of infrastructure — and the next big category.", bullets: ["Procurement-ready", "Audit-grade defaults", "Region-locked storage"], tone: "rose" },
];

const TONE: Record<string, { ink: string; bg: string }> = {
  indigo: { ink: "var(--prf-indigo)", bg: "rgba(79,70,229,0.05)" },
  amber:  { ink: "var(--prf-amber)",  bg: "rgba(217,119,6,0.06)" },
  leaf:   { ink: "var(--prf-leaf)",   bg: "rgba(22,101,52,0.05)" },
  rose:   { ink: "var(--prf-rose)",   bg: "rgba(190,18,60,0.05)" },
};

export default function Thesis() {
  return (
    <section id="thesis" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <div className="grid gap-3 md:grid-cols-[1.4fr_minmax(0,1fr)] md:items-end md:gap-12">
          <div>
            <span style={{ fontFamily: "var(--prf-mono)", color: "var(--prf-ink-muted)" }} className="text-[10.5px] uppercase tracking-[0.22em]">
              The thesis
            </span>
            <h2 style={{ fontFamily: "var(--prf-display)", color: "var(--prf-ink)" }} className="mt-3 text-[36px] font-semibold leading-[1.04] tracking-[-0.02em] sm:text-[56px]">
              Four shelves<br />
              <span style={{ fontStyle: "italic", color: "var(--prf-indigo)" }}>we want to fill.</span>
            </h2>
          </div>
          <p style={{ color: "var(--prf-ink-muted)" }} className="text-[15px] leading-relaxed">
            We invest narrowly so we can be useful broadly. Each portfolio company sits on one of four shelves, and gets the attention of every partner who's lived in that world before.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {PILLARS.map((p) => (
            <article
              key={p.name}
              className="prf-rise relative overflow-hidden rounded-md border bg-white p-7"
              style={{ borderColor: "var(--prf-rule)", background: TONE[p.tone].bg }}
            >
              <div className="flex items-baseline gap-3">
                <span style={{ fontFamily: "var(--prf-display)", color: TONE[p.tone].ink }} className="text-[44px] font-semibold leading-none italic">
                  {p.n}
                </span>
                <h3 style={{ fontFamily: "var(--prf-display)", color: "var(--prf-ink)" }} className="text-[24px] font-semibold tracking-tight">
                  {p.name}
                </h3>
              </div>
              <p style={{ fontFamily: "var(--prf-display)", color: "var(--prf-ink-muted)" }} className="mt-4 text-[16px] leading-relaxed">
                {p.lead}
              </p>
              <ul className="mt-5 space-y-1.5 text-[13px]" style={{ color: "var(--prf-ink)" }}>
                {p.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 flex-none rounded-full" style={{ background: TONE[p.tone].ink }} />
                    {b}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
