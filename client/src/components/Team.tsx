import { motion } from "framer-motion";
import { Eyebrow, Reveal, fadeUp, staggerParent } from "./reveal";

const PARTNERS = [
  { name: "Rohit V.", role: "General partner", bg: "Eng leader · Riot, Stripe", base: "London", focus: "Dev tools · infra" },
  { name: "Aoife K.", role: "General partner", bg: "Founder, exited 2019", base: "Dublin", focus: "Applied AI · trust" },
  { name: "Tomas R.", role: "Operating partner", bg: "ex-CTO · 3 portfolio cos", base: "Berlin", focus: "Hiring · GTM" },
  { name: "Sara M.", role: "Platform", bg: "Communities lead", base: "London", focus: "Founders' guild" },
];

export default function Team() {
  return (
    <section id="team" className="relative py-24 sm:py-32" style={{ background: "var(--pf-bg-2)" }}>
      <div className="mx-auto max-w-[1320px] px-5 sm:px-10">
        <Reveal>
          <Eyebrow index="06">The team</Eyebrow>
          <div className="mt-6 grid gap-4 md:grid-cols-[1fr_minmax(0,1fr)] md:items-end md:gap-12">
            <h2
              className="pf-display font-semibold leading-[1.02] tracking-[-0.025em]"
              style={{ fontSize: "clamp(36px, 5vw, 64px)", color: "var(--pf-text)" }}
            >
              Not a firm.{" "}
              <em className="pf-serif font-normal" style={{ fontStyle: "italic", color: "var(--pf-acid)" }}>
                A desk.
              </em>
            </h2>
            <p className="max-w-md text-[14.5px] leading-relaxed" style={{ color: "var(--pf-muted)" }}>
              Two GPs, an operating partner, and a platform lead. Not a hundred people;
              a desk. We answer your emails personally. Always.
            </p>
          </div>
        </Reveal>

        <motion.div
          className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {PARTNERS.map((p) => (
            <motion.article key={p.name} variants={fadeUp} className="pf-card group rounded-sm p-6">
              <div
                className="pf-serif grid h-14 w-14 place-items-center rounded-full border text-[24px] transition-colors group-hover:border-[#d7fe55]"
                style={{ fontStyle: "italic", borderColor: "var(--pf-line-2)", color: "var(--pf-acid)" }}
              >
                {p.name.charAt(0)}
              </div>
              <h3 className="pf-display mt-5 text-[21px] font-semibold leading-tight tracking-[-0.01em]" style={{ color: "var(--pf-text)" }}>
                {p.name}
              </h3>
              <div className="pf-mono mt-1.5 text-[10px] uppercase tracking-[0.18em]" style={{ color: "var(--pf-acid)" }}>
                {p.role}
              </div>
              <p className="mt-3 text-[13px] leading-relaxed" style={{ color: "var(--pf-muted)" }}>
                {p.bg}
              </p>
              <div className="mt-5 flex items-center justify-between border-t pt-3.5 text-[11px]" style={{ borderColor: "var(--pf-line)" }}>
                <span style={{ color: "var(--pf-text)" }}>{p.base}</span>
                <span className="pf-mono uppercase tracking-[0.12em]" style={{ color: "var(--pf-dim)" }}>
                  {p.focus}
                </span>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
