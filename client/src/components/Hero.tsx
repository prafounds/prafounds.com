import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { EASE } from "./reveal";

const STATS = [
  { v: "£250K–£2M", k: "First-cheque range" },
  { v: "32", k: "Active portfolio" },
  { v: "7 days", k: "Reply, guaranteed" },
  { v: "2022", k: "Fund founded" },
];

function HeadlineLine({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative isolate flex min-h-screen flex-col overflow-hidden pt-16">
      {/* background: blueprint grid + acid glow + grain */}
      <motion.div aria-hidden="true" className="pf-grid-bg pointer-events-none absolute inset-0 -z-20" style={{ y: gridY }} />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -z-10 h-[560px] w-[820px] rounded-full"
        style={{
          top: "-180px",
          right: "-160px",
          background: "radial-gradient(ellipse, rgba(215,254,85,0.09), transparent 65%)",
          filter: "blur(60px)",
          opacity: glowOpacity,
        }}
      />
      <div aria-hidden="true" className="pf-noise pointer-events-none absolute inset-0 -z-10 opacity-[0.04]" />

      <div className="mx-auto flex w-full max-w-[1320px] flex-1 flex-col justify-center px-5 py-20 sm:px-10">
        {/* kicker */}
        <motion.div
          className="pf-mono flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] uppercase tracking-[0.24em]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{ color: "var(--pf-muted)" }}
        >
          <span className="inline-flex items-center gap-2" style={{ color: "var(--pf-acid)" }}>
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--pf-acid)" }} />
            Writing first cheques · Q3 2026
          </span>
          <span aria-hidden="true" style={{ color: "var(--pf-dim)" }}>/</span>
          <span>Pre-seed · Seed</span>
          <span aria-hidden="true" style={{ color: "var(--pf-dim)" }}>/</span>
          <span>UK · IE · EU</span>
        </motion.div>

        {/* headline */}
        <h1
          className="pf-display mt-8 font-semibold leading-[0.96] tracking-[-0.03em]"
          style={{ fontSize: "clamp(52px, 9.2vw, 138px)", color: "var(--pf-text)" }}
        >
          <HeadlineLine delay={0.15}>
            The first{" "}
            <em className="pf-serif font-normal not-italic" style={{ fontStyle: "italic", color: "var(--pf-acid)" }}>
              yes
            </em>
          </HeadlineLine>
          <HeadlineLine delay={0.27}>for technical</HeadlineLine>
          <HeadlineLine delay={0.39}>
            founders.<span className="pf-blink" aria-hidden="true" style={{ color: "var(--pf-acid)" }}>_</span>
          </HeadlineLine>
        </h1>

        {/* sub + ctas */}
        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <motion.p
            className="max-w-xl text-[17px] leading-relaxed sm:text-[19px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.55 }}
            style={{ color: "var(--pf-muted)" }}
          >
            PraFounds backs pre-seed and seed teams building the developer tools,
            infrastructure, and applied AI that the next decade will run on.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.65 }}
          >
            <a
              href="#apply"
              className="pf-mono inline-flex items-center gap-2 rounded-sm px-6 py-3.5 text-[12.5px] font-medium uppercase tracking-[0.14em] transition-opacity hover:opacity-85"
              style={{ background: "var(--pf-acid)", color: "var(--pf-ink)" }}
            >
              Send your deck <span aria-hidden="true">↗</span>
            </a>
            <a
              href="#thesis"
              className="pf-mono inline-flex items-center gap-2 rounded-sm border px-6 py-3.5 text-[12.5px] font-medium uppercase tracking-[0.14em] transition-colors hover:border-[#d7fe55]"
              style={{ borderColor: "var(--pf-line-2)", color: "var(--pf-text)" }}
            >
              Read the thesis
            </a>
          </motion.div>
        </div>
      </div>

      {/* stat rail */}
      <motion.div
        className="border-t"
        style={{ borderColor: "var(--pf-line)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <div className="mx-auto grid max-w-[1320px] grid-cols-2 px-5 sm:px-10 md:grid-cols-4">
          {STATS.map((s, i) => (
            <div
              key={s.k}
              className="border-l py-6 pl-5 first:border-l-0 first:pl-0 sm:py-7"
              style={{ borderColor: i === 0 ? "transparent" : "var(--pf-line)" }}
            >
              <div className="pf-display text-[22px] font-semibold leading-tight sm:text-[26px]" style={{ color: "var(--pf-text)" }}>
                {s.v}
              </div>
              <div className="pf-mono mt-1.5 text-[10px] uppercase tracking-[0.2em]" style={{ color: "var(--pf-dim)" }}>
                {s.k}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
