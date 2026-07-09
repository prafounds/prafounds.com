import { motion } from "framer-motion";
import { Eyebrow, Reveal, fadeUp, staggerParent } from "./reveal";

interface Pillar {
  n: string;
  name: string;
  lead: string;
  bullets: string[];
}

const PILLARS: Pillar[] = [
  {
    n: "I",
    name: "Developer tools",
    lead: "We back the small teams that hand engineers superpowers — IDE plugins, framework breakthroughs, runtime gains.",
    bullets: ["Bottoms-up adoption", "Open-source first", "Clear technical wedge"],
  },
  {
    n: "II",
    name: "Applied AI",
    lead: "AI that ships. We invest in workflows-with-LLMs over chat-toys; vertical depth over horizontal hype.",
    bullets: ["Real workflow wins", "Domain expertise", "BYO-model friendly"],
  },
  {
    n: "III",
    name: "Infrastructure",
    lead: "Databases, queues, edge runtimes, observability. The boring substrate that makes everything else fast.",
    bullets: ["Long arc, big TAM", "Migrations are moats", "Self-host options"],
  },
  {
    n: "IV",
    name: "Trust & data",
    lead: "Identity, compliance, audit, knowledge. Trust is the next layer of infrastructure — and the next big category.",
    bullets: ["Procurement-ready", "Audit-grade defaults", "Region-locked storage"],
  },
];

export default function Thesis() {
  return (
    <section id="thesis" className="relative border-b py-24 sm:py-32" style={{ borderColor: "var(--pf-line)" }}>
      <div className="mx-auto max-w-[1320px] px-5 sm:px-10">
        <Reveal>
          <Eyebrow index="01">The thesis</Eyebrow>
          <div className="mt-6 grid gap-6 md:grid-cols-[1.4fr_minmax(0,1fr)] md:items-end md:gap-12">
            <h2
              className="pf-display font-semibold leading-[1.02] tracking-[-0.025em]"
              style={{ fontSize: "clamp(36px, 5vw, 64px)", color: "var(--pf-text)" }}
            >
              Four shelves{" "}
              <em className="pf-serif font-normal" style={{ fontStyle: "italic", color: "var(--pf-acid)" }}>
                we want to fill.
              </em>
            </h2>
            <p className="max-w-md text-[15px] leading-relaxed" style={{ color: "var(--pf-muted)" }}>
              We invest narrowly so we can be useful broadly. Each portfolio company sits on
              one of four shelves, and gets the attention of every partner who's lived in
              that world before.
            </p>
          </div>
        </Reveal>

        <motion.div
          className="mt-16 border-t"
          style={{ borderColor: "var(--pf-line)" }}
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {PILLARS.map((p) => (
            <motion.article
              key={p.name}
              variants={fadeUp}
              className="group grid gap-5 border-b py-9 md:grid-cols-[80px_1.1fr_1.4fr_1fr] md:items-baseline md:gap-8"
              style={{ borderColor: "var(--pf-line)" }}
            >
              <span className="pf-serif text-[34px] leading-none" style={{ fontStyle: "italic", color: "var(--pf-acid)" }}>
                {p.n}
              </span>
              <h3
                className="pf-display text-[26px] font-semibold tracking-[-0.01em] transition-colors group-hover:text-[#d7fe55] sm:text-[30px]"
                style={{ color: "var(--pf-text)" }}
              >
                {p.name}
              </h3>
              <p className="text-[15px] leading-relaxed" style={{ color: "var(--pf-muted)" }}>
                {p.lead}
              </p>
              <ul className="flex flex-wrap gap-2 md:justify-end">
                {p.bullets.map((b) => (
                  <li
                    key={b}
                    className="pf-mono rounded-sm border px-2.5 py-1 text-[10px] uppercase tracking-[0.14em]"
                    style={{ borderColor: "var(--pf-line-2)", color: "var(--pf-muted)" }}
                  >
                    {b}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
