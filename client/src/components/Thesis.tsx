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

/**
 * Static grid. This section previously pinned and scrolled the four cards
 * horizontally; that mechanic was removed on request. The cards now simply
 * lay out and fade in with the same reveal every other section uses.
 */
export default function Thesis() {
  return (
    <section id="thesis" className="relative border-b py-24 sm:py-32" style={{ borderColor: "var(--pf-line)" }}>
      <div className="mx-auto max-w-[1320px] px-5 sm:px-10">
        <Reveal>
          <Eyebrow index="01">The thesis</Eyebrow>
          <div className="mt-6 grid gap-6 md:grid-cols-[1.4fr_minmax(0,1fr)] md:items-end md:gap-12">
            <h2
              className="pf-display font-medium leading-[1.06] tracking-[-0.012em]"
              style={{ fontSize: "clamp(34px, 4.6vw, 60px)", color: "var(--pf-text)" }}
            >
              Where we{" "}
              <em className="pf-serif font-normal" style={{ fontStyle: "italic", color: "var(--pf-acid)" }}>
                invest.
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
          className="mt-14 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {PILLARS.map((p, i) => (
            <motion.article
              key={p.name}
              variants={fadeUp}
              className="group relative flex flex-col justify-between rounded-lg border p-7 transition-colors"
              style={{ borderColor: "var(--pf-line)", background: "var(--pf-card)" }}
            >
              {/* Acid rule that fills on hover — a small reward for engaging
                  with a card rather than decoration on everything. */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                style={{ background: "var(--pf-acid)" }}
              />
              <div>
                <div className="flex items-baseline justify-between">
                  <span
                    className="pf-serif text-[36px] leading-none"
                    style={{ fontStyle: "italic", color: "var(--pf-acid)" }}
                  >
                    {p.n}
                  </span>
                  <span
                    className="pf-mono text-[10.5px] uppercase tracking-[0.2em]"
                    style={{ color: "var(--pf-dim)" }}
                  >
                    {String(i + 1).padStart(2, "0")} / {String(PILLARS.length).padStart(2, "0")}
                  </span>
                </div>
                <h3
                  className="pf-display mt-6 text-[25px] font-semibold leading-[1.1] tracking-[-0.008em] transition-colors group-hover:text-[#f4f4f4]"
                  style={{ color: "var(--pf-text)" }}
                >
                  {p.name}
                </h3>
                <p className="mt-4 text-[14.5px] leading-relaxed" style={{ color: "var(--pf-muted)" }}>
                  {p.lead}
                </p>
              </div>
              <ul className="mt-8 flex flex-wrap gap-2">
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
