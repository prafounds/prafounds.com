import { motion } from "framer-motion";
import { Eyebrow, Reveal, fadeUp, staggerParent } from "./reveal";

interface Co {
  name: string;
  sector: string;
  year: string;
  round: string;
  lead: string;
}

const COMPANIES: Co[] = [
  { name: "Lateral", sector: "Dev tools · code search", year: "2022", round: "Pre-seed lead", lead: "Helps engineers navigate giant codebases by intent, not files." },
  { name: "Cascadia", sector: "Applied AI · legal", year: "2023", round: "Seed follow", lead: "Model-agnostic AI agents for in-house legal teams. Now used at 800+ firms." },
  { name: "Polaris Health", sector: "Health · ops", year: "2023", round: "Pre-seed lead", lead: "Operations layer for clinics — care plans, schedules, recoveries." },
  { name: "Vega Labs", sector: "Infrastructure · edge", year: "2023", round: "Pre-seed", lead: "Edge runtime for stateful, multi-tenant workloads. EU-resident by default." },
  { name: "Northwing", sector: "Trust · KYB", year: "2024", round: "Pre-seed lead", lead: "Business-identity verification for marketplaces. 200+ doc types." },
  { name: "Aquila", sector: "Dev tools · CI", year: "2024", round: "Seed follow", lead: "Continuous integration that sleeps when you do — caches everything that doesn't change." },
  { name: "Lumin Co", sector: "Applied AI · ops", year: "2025", round: "Pre-seed lead", lead: "Workflow runtime for B2B teams. Replaces six glue scripts with one." },
  { name: "Atlas Hub", sector: "Knowledge · graphs", year: "2025", round: "Pre-seed", lead: "Personal knowledge graph for analysts and operators. Notion meets neo4j." },
  { name: "Brightside", sector: "Education · tools", year: "2025", round: "Pre-seed", lead: "Hands-on coding labs for European secondary schools. Not edu-tech, just tech." },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="relative border-b py-24 sm:py-32" style={{ borderColor: "var(--pf-line)", background: "var(--pf-bg-2)" }}>
      <div className="mx-auto max-w-[1320px] px-5 sm:px-10">
        <Reveal>
          <Eyebrow index="02">The portfolio</Eyebrow>
          <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto] md:items-end md:gap-10">
            <h2
              className="pf-display font-semibold leading-[1.02] tracking-[-0.025em]"
              style={{ fontSize: "clamp(36px, 5vw, 64px)", color: "var(--pf-text)" }}
            >
              32 companies.{" "}
              <em className="pf-serif block font-normal" style={{ fontStyle: "italic", color: "var(--pf-acid)" }}>
                One conviction each.
              </em>
            </h2>
            <a
              href="#"
              className="pf-mono hidden text-[11.5px] uppercase tracking-[0.16em] underline underline-offset-8 transition-colors hover:text-[#d7fe55] md:inline"
              style={{ color: "var(--pf-muted)" }}
            >
              Full roster ↗
            </a>
          </div>
        </Reveal>

        <motion.div
          className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {COMPANIES.map((c) => (
            <motion.article key={c.name} variants={fadeUp} className="pf-card group relative rounded-sm p-6">
              <div className="flex items-center justify-between gap-3">
                <span className="pf-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: "var(--pf-dim)" }}>
                  {c.sector}
                </span>
                <span
                  className="pf-mono rounded-sm px-2 py-0.5 text-[9.5px] font-medium uppercase tracking-[0.12em]"
                  style={
                    c.round.includes("lead")
                      ? { background: "var(--pf-acid-soft)", color: "var(--pf-acid)" }
                      : { border: "1px solid var(--pf-line-2)", color: "var(--pf-muted)" }
                  }
                >
                  {c.round}
                </span>
              </div>
              <h3 className="pf-display mt-5 text-[26px] font-semibold leading-tight tracking-[-0.01em]" style={{ color: "var(--pf-text)" }}>
                {c.name}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed" style={{ color: "var(--pf-muted)" }}>
                {c.lead}
              </p>
              <div className="mt-6 flex items-center justify-between border-t pt-3.5" style={{ borderColor: "var(--pf-line)" }}>
                <span className="pf-mono text-[10.5px] uppercase tracking-[0.16em]" style={{ color: "var(--pf-dim)" }}>
                  Est. {c.year}
                </span>
                <span
                  className="pf-mono text-[10.5px] uppercase tracking-[0.16em] opacity-0 transition-opacity group-hover:opacity-100"
                  style={{ color: "var(--pf-acid)" }}
                >
                  Visit ↗
                </span>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
