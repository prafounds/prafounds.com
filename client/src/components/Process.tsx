import { motion } from "framer-motion";
import { Eyebrow, Reveal, fadeUp, staggerParent } from "./reveal";

const STEPS = [
  { n: "01", t: "Reply within 7 days", b: "Every email gets read by a partner. We say yes or no quickly, with a reason. Even no's get a useful note." },
  { n: "02", t: "Two diligence calls", b: "One on the technical wedge, one on the team. We don't run a circus of follow-ups, and we don't ghost you between meetings." },
  { n: "03", t: "Decisions on a cadence", b: "We meet on Tuesdays. If your deck arrives by Friday, you'll know on the next Tuesday. No partner-meeting roulette." },
  { n: "04", t: "After the cheque, the work", b: "First 100 hires, first 100 customers, first board, first crisis — we keep showing up. Quietly. For years, not photos." },
];

export default function Process() {
  return (
    <section id="process" className="relative border-b py-24 sm:py-32" style={{ borderColor: "var(--pf-line)" }}>
      <div className="mx-auto max-w-[1320px] px-5 sm:px-10">
        <Reveal>
          <Eyebrow index="03">How we partner</Eyebrow>
          <h2
            className="pf-display mt-6 max-w-2xl font-semibold leading-[1.02] tracking-[-0.025em]"
            style={{ fontSize: "clamp(36px, 5vw, 64px)", color: "var(--pf-text)" }}
          >
            Quietly.{" "}
            <em className="pf-serif font-normal" style={{ fontStyle: "italic", color: "var(--pf-acid)" }}>
              For years.
            </em>
          </h2>
        </Reveal>

        <motion.ol
          className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-6"
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {STEPS.map((s) => (
            <motion.li key={s.n} variants={fadeUp} className="relative">
              {/* animated top rule */}
              <motion.span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px origin-left"
                style={{ background: "var(--pf-acid)" }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              />
              <div className="pt-6">
                <span className="pf-mono text-[11px] tracking-[0.2em]" style={{ color: "var(--pf-acid)" }}>
                  {s.n}
                </span>
                <h3 className="pf-display mt-3 text-[21px] font-semibold leading-snug tracking-[-0.01em]" style={{ color: "var(--pf-text)" }}>
                  {s.t}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed" style={{ color: "var(--pf-muted)" }}>
                  {s.b}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
