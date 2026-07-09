import { motion } from "framer-motion";
import { Eyebrow, Reveal, fadeUp, staggerParent } from "./reveal";

const POSTS = [
  { tag: "Essay", title: "Why we don't lead in AI agents (yet).", excerpt: "Most agents shipping today look like demoware. Here's what would change our minds.", date: "May 2026", min: "9 min" },
  { tag: "Memo", title: "What 'patient capital' actually costs us.", excerpt: "We hold longer than the median fund. The math, the friction, the founders we lose.", date: "Apr 2026", min: "12 min" },
  { tag: "Note", title: "First-cheque criteria, made public.", excerpt: "We've put our diligence rubric on the website. Yes — really. No, it doesn't include 'vibes'.", date: "Mar 2026", min: "5 min" },
  { tag: "Data", title: "The new shape of European pre-seed.", excerpt: "Cheque sizes. Geography. Founder ages. We crunched 1,400 deals from 2024-2026.", date: "Feb 2026", min: "14 min" },
];

export default function Dispatches() {
  return (
    <section id="dispatches" className="relative border-b py-24 sm:py-32" style={{ borderColor: "var(--pf-line)" }}>
      <div className="mx-auto max-w-[1320px] px-5 sm:px-10">
        <Reveal>
          <Eyebrow index="05">Dispatches</Eyebrow>
          <div className="mt-6 grid gap-4 md:grid-cols-[1fr_minmax(0,1fr)] md:items-end md:gap-12">
            <h2
              className="pf-display font-semibold leading-[1.02] tracking-[-0.025em]"
              style={{ fontSize: "clamp(36px, 5vw, 64px)", color: "var(--pf-text)" }}
            >
              Working{" "}
              <em className="pf-serif font-normal" style={{ fontStyle: "italic", color: "var(--pf-acid)" }}>
                in public.
              </em>
            </h2>
            <p className="max-w-md text-[14.5px] leading-relaxed" style={{ color: "var(--pf-muted)" }}>
              Quarterly memos to portfolio + LPs. We make the back-issues public,
              because most of the work happens between the press releases.
            </p>
          </div>
        </Reveal>

        <motion.ul
          className="mt-14 border-t"
          style={{ borderColor: "var(--pf-line)" }}
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {POSTS.map((p) => (
            <motion.li key={p.title} variants={fadeUp} className="border-b" style={{ borderColor: "var(--pf-line)" }}>
              <a
                href="#"
                className="pf-invert-row group grid gap-3 px-2 py-7 sm:grid-cols-[90px_1fr_auto] sm:items-center sm:gap-8 sm:px-4"
              >
                <span className="pf-mono text-[10.5px] uppercase tracking-[0.2em]" style={{ color: "var(--pf-acid)" }}>
                  {p.tag}
                </span>
                <div>
                  <h3 className="pf-display text-[22px] font-semibold leading-snug tracking-[-0.01em] sm:text-[26px]" style={{ color: "var(--pf-text)" }}>
                    {p.title}
                  </h3>
                  <p className="mt-1.5 max-w-prose text-[14px] leading-relaxed" style={{ color: "var(--pf-muted)" }}>
                    {p.excerpt}
                  </p>
                </div>
                <div className="pf-mono flex items-center gap-4 text-[11px] uppercase tracking-[0.14em] sm:flex-col sm:items-end sm:gap-1.5" style={{ color: "var(--pf-dim)" }}>
                  <span>{p.date}</span>
                  <span>{p.min}</span>
                  <span aria-hidden="true" className="text-[16px] transition-transform group-hover:translate-x-1" style={{ color: "var(--pf-text)" }}>
                    →
                  </span>
                </div>
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
