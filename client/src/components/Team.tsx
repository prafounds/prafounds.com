import { motion } from "framer-motion";
import { Eyebrow, Reveal, fadeUp, staggerParent } from "./reveal";

interface Partner {
  name: string;
  role: string;
  /** Two-letter monogram; derived names collide (two Annamudus), so set it explicitly. */
  initials: string;
}

/**
 * Real people. Deliberately name + role only — the previous placeholder
 * entries carried invented backgrounds and locations, and attaching
 * fabricated biography to a named individual is not something to guess at.
 * Add `bg`/`base`/`focus` back once the real details are supplied.
 */
const PARTNERS: Partner[] = [
  { name: "Prabhakaran Annamudu", role: "Founder & CEO", initials: "PA" },
  { name: "Nazeer Ahmed", role: "Co-founder & COO", initials: "NA" },
  { name: "Prajol Annamudu", role: "Managing Partner & Director", initials: "PA" },
];

export default function Team() {
  return (
    <section id="team" className="relative py-24 sm:py-32" style={{ background: "var(--pf-veil)" }}>
      <div className="mx-auto max-w-[1320px] px-5 sm:px-10">
        <Reveal>
          <Eyebrow index="04">The team</Eyebrow>
          <div className="mt-6 grid gap-4 md:grid-cols-[1fr_minmax(0,1fr)] md:items-end md:gap-12">
            <h2
              className="pf-display font-medium leading-[1.06] tracking-[-0.012em]"
              style={{ fontSize: "clamp(36px, 5vw, 64px)", color: "var(--pf-text)" }}
            >
              Not a firm.{" "}
              <em className="pf-serif font-normal" style={{ fontStyle: "italic", color: "var(--pf-acid)" }}>
                A desk.
              </em>
            </h2>
            <p className="max-w-md text-[14.5px] leading-relaxed" style={{ color: "var(--pf-muted)" }}>
              Three people, one desk. You deal with the founders directly — no associate
              screen, no committee. We answer your emails personally. Always.
            </p>
          </div>
        </Reveal>

        <motion.div
          className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {PARTNERS.map((p, i) => (
            <motion.article key={p.name} variants={fadeUp} className="pf-card group rounded-sm p-7">
              <div className="flex items-start justify-between">
                <div
                  className="pf-serif grid h-16 w-16 place-items-center rounded-full border text-[22px] transition-colors group-hover:border-[#f4f4f4]"
                  style={{ fontStyle: "italic", borderColor: "var(--pf-line-2)", color: "var(--pf-acid)" }}
                >
                  {p.initials}
                </div>
                <span
                  className="pf-mono text-[10px] uppercase tracking-[0.2em]"
                  style={{ color: "var(--pf-dim)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3
                className="pf-display mt-6 text-[22px] font-semibold leading-tight tracking-[-0.008em]"
                style={{ color: "var(--pf-text)" }}
              >
                {p.name}
              </h3>
              <div
                className="pf-mono mt-2 border-t pt-3 text-[10px] uppercase tracking-[0.18em]"
                style={{ borderColor: "var(--pf-line)", color: "var(--pf-acid)" }}
              >
                {p.role}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
