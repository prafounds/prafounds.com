import { motion } from "framer-motion";
import { Eyebrow, Reveal, fadeUp, staggerParent } from "./reveal";

const QUOTES = [
  { q: "PraFounds wired our first 12 customers in seven days. Kept showing up. Kept being right.", who: "Erik N.", role: "Founder · Lateral", year: "2022" },
  { q: "First fund I've worked with that says 'no' clearly and 'yes' quietly. The quiet 'yes' has been worth every percent.", who: "Yuki O.", role: "Founder · Cascadia", year: "2023" },
  { q: "The Tuesday cadence makes raising feel boring. In the best possible way. They show up; they don't perform.", who: "Tomas R.", role: "Founder · Polaris Health", year: "2023" },
];

export default function Voices() {
  return (
    <section className="relative border-b py-24 sm:py-32" style={{ borderColor: "var(--pf-line)", background: "var(--pf-bg-2)" }}>
      <div className="mx-auto max-w-[1320px] px-5 sm:px-10">
        <Reveal>
          <Eyebrow index="04">Founder references</Eyebrow>
          <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto] md:items-end md:gap-10">
            <h2
              className="pf-display font-semibold leading-[1.02] tracking-[-0.025em]"
              style={{ fontSize: "clamp(36px, 5vw, 64px)", color: "var(--pf-text)" }}
            >
              Don't take{" "}
              <em className="pf-serif font-normal" style={{ fontStyle: "italic", color: "var(--pf-acid)" }}>
                our word.
              </em>
            </h2>
            <p className="max-w-sm text-[14px] leading-relaxed" style={{ color: "var(--pf-muted)" }}>
              We give every prospective company three founder references on request —
              not curated, not warned in advance.
            </p>
          </div>
        </Reveal>

        <motion.div
          className="mt-14 grid gap-3 lg:grid-cols-3"
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {QUOTES.map((q) => (
            <motion.figure
              key={q.who}
              variants={fadeUp}
              className="flex flex-col justify-between rounded-sm border p-7"
              style={{ borderColor: "var(--pf-line)", background: "var(--pf-surface)" }}
            >
              <div>
                <span aria-hidden="true" className="pf-serif text-[44px] leading-none" style={{ fontStyle: "italic", color: "var(--pf-acid)" }}>
                  "
                </span>
                <blockquote className="pf-serif mt-1 text-[20px] leading-[1.45]" style={{ color: "var(--pf-text)" }}>
                  {q.q}
                </blockquote>
              </div>
              <figcaption className="mt-8 flex items-end justify-between gap-3 border-t pt-4" style={{ borderColor: "var(--pf-line)" }}>
                <div>
                  <div className="text-[13.5px] font-semibold" style={{ color: "var(--pf-text)" }}>{q.who}</div>
                  <div className="mt-0.5 text-[12px]" style={{ color: "var(--pf-muted)" }}>{q.role}</div>
                </div>
                <span className="pf-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: "var(--pf-dim)" }}>
                  invested {q.year}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
