import * as React from "react";
import { Navigation } from "@/components/Navigation";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Mail } from "lucide-react";

/* ─── Design tokens ─── */
const DARK = "#0B0D14";
const WARM = "#F7F6F3";
const AMBER = "#C9884A";
const AMBER_DARK = "#B5763A";

/* ─── Motion helpers ─── */
const inView = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" as const },
};
const t = (dur = 0.7, delay = 0) => ({
  duration: dur,
  delay,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
});

/* ─── Section label ─── */
function SectionLabel({ number, label }: { number: string; label: string }) {
  return (
    <motion.div
      className="flex items-center gap-3"
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={t(0.55)}
    >
      <span className="text-[11px] font-semibold tracking-[0.22em]" style={{ color: AMBER }}>
        {number}
      </span>
      <span className="w-6 h-px bg-gray-300 block" />
      <span className="text-[11px] font-medium tracking-[0.16em] uppercase text-gray-400">
        {label}
      </span>
    </motion.div>
  );
}

/* ─── Focus card ─── */
function FocusCard({
  title,
  items,
  note,
  delay,
}: {
  title: string;
  items: string[];
  note: string;
  delay: number;
}) {
  return (
    <motion.div
      className="bg-white p-10 flex flex-col hover:bg-gray-50/80 transition-colors duration-300"
      {...inView}
      transition={t(0.65, delay)}
    >
      <h3 className="text-lg font-bold mb-7 font-display text-gray-900">{title}</h3>
      <ul className="space-y-3 mb-8 flex-1">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-[15px] text-gray-600 leading-snug">
            <span
              className="w-[5px] h-[5px] rounded-full mt-[7px] shrink-0"
              style={{ backgroundColor: AMBER }}
            />
            {item}
          </li>
        ))}
      </ul>
      <p className="text-[12px] text-gray-400 leading-relaxed border-t border-gray-100 pt-6">
        {note}
      </p>
    </motion.div>
  );
}

/* ─── Criteria row ─── */
function CriteriaRow({
  title,
  description,
  index,
}: {
  title: string;
  description: string;
  index: number;
}) {
  return (
    <motion.div
      className="py-7 grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-4 md:gap-12 group border-b border-gray-200 last:border-0"
      {...inView}
      transition={t(0.6, index * 0.08)}
    >
      <h3 className="text-[17px] font-semibold text-gray-900 font-display">{title}</h3>
      <p className="text-[15px] text-gray-500 leading-relaxed">{description}</p>
    </motion.div>
  );
}

/* ─── Main page ─── */
export default function Home() {
  const [amberHover1, setAmberHover1] = React.useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navigation />

      {/* ══════════════════════════════════════════
          HERO — dark
      ══════════════════════════════════════════ */}
      <section
        className="relative min-h-screen flex flex-col justify-end pb-16 md:pb-24 overflow-hidden"
        style={{ backgroundColor: DARK }}
      >
        {/* Ambient warm glow — bottom-left */}
        <div
          className="absolute bottom-0 left-0 w-[700px] h-[700px] pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${AMBER}0D 0%, transparent 65%)`,
            transform: "translate(-25%, 35%)",
          }}
        />
        {/* Ambient cool glow — top-right */}
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(100,130,200,0.05) 0%, transparent 65%)",
            transform: "translate(25%, -25%)",
          }}
        />

        {/* Very subtle grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)
            `,
            backgroundSize: "72px 72px",
          }}
        />

        <div className="container-width relative z-10 pt-36">
          {/* Overline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex items-center gap-3 mb-10"
          >
            <span className="w-5 h-px block" style={{ backgroundColor: AMBER }} />
            <span
              className="text-[11px] font-medium tracking-[0.22em] uppercase"
              style={{ color: AMBER }}
            >
              Early-Stage Venture Capital · UK & Europe
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="font-display font-bold leading-[1.04] text-white mb-8 max-w-[820px]"
            style={{ fontSize: "clamp(42px, 7vw, 86px)" }}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={t(0.9, 0.2)}
          >
            Backing founders who build foundations,{" "}
            <em className="not-italic font-normal text-white/45">not just features.</em>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            className="text-[17px] md:text-[18px] text-white/45 max-w-[580px] mb-12 leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={t(0.9, 0.35)}
          >
            PraFounds Ventures partners with technical founders at pre-seed and seed stage to build
            durable, category-defining companies. We invest with conviction and think long-term.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={t(0.9, 0.5)}
          >
            <a
              href="#pitch"
              className="inline-flex items-center gap-3 px-7 py-[14px] text-[13px] font-medium tracking-wide text-white transition-all duration-300"
              style={{ backgroundColor: amberHover1 ? AMBER_DARK : AMBER }}
              onMouseEnter={() => setAmberHover1(true)}
              onMouseLeave={() => setAmberHover1(false)}
            >
              Pitch PraFounds
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#focus"
              className="inline-flex items-center gap-3 px-7 py-[14px] text-[13px] font-medium tracking-wide text-white/55 border border-white/15 hover:border-white/35 hover:text-white/80 transition-all duration-300"
            >
              Investment Focus
            </a>
          </motion.div>
        </div>

        {/* Scroll hint — right side */}
        <motion.div
          className="absolute bottom-10 right-12 hidden lg:flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <span
            className="text-[10px] tracking-[0.28em] uppercase text-white/20"
            style={{ writingMode: "vertical-rl" }}
          >
            Scroll
          </span>
          <motion.div
            className="w-px h-14 origin-top"
            style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
            animate={{ scaleY: [1, 0.25, 1] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          WHAT WE DO — white
      ══════════════════════════════════════════ */}
      <section className="bg-white section-pad">
        <div className="container-width">
          <SectionLabel number="01" label="What We Do" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mt-14">
            <motion.div {...inView} transition={t()}>
              <h2
                className="font-display font-bold leading-[1.1] text-balance"
                style={{ fontSize: "clamp(30px, 4vw, 52px)" }}
              >
                Early conviction.<br />Long-term thinking.
              </h2>
            </motion.div>

            <motion.div
              className="space-y-5 text-[16px] md:text-[17px] text-gray-500 leading-relaxed"
              {...inView}
              transition={t(0.7, 0.15)}
            >
              <p>
                PraFounds Ventures focuses on the earliest and most critical phase of company
                building—when clarity, judgment, and execution matter more than scale.
              </p>
              <p>
                We work closely with small, focused teams to help turn strong ideas into enduring
                businesses, while staying disciplined about fundamentals and trust.
              </p>
              <p className="font-medium text-gray-800">
                Our approach is calm, selective, and founder-first.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          INVESTMENT FOCUS — warm
      ══════════════════════════════════════════ */}
      <section id="focus" style={{ backgroundColor: WARM }} className="section-pad">
        <div className="container-width">
          <SectionLabel number="02" label="Investment Focus" />

          <motion.h2
            className="font-display font-bold mt-8 mb-14"
            style={{ fontSize: "clamp(30px, 4vw, 50px)" }}
            {...inView}
            transition={t(0.7, 0.1)}
          >
            Where we invest.
          </motion.h2>

          {/* 1px grid lines between cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-200">
            <FocusCard
              title="Stage"
              items={["Pre-Seed", "Seed"]}
              note="We invest at the earliest, most critical phase of company building."
              delay={0}
            />
            <FocusCard
              title="Sectors"
              items={[
                "Developer tools & infrastructure",
                "Applied AI & platforms",
                "Productivity software",
                "Systems, reliability & trust",
              ]}
              note="We back foundational, high-leverage technology categories."
              delay={0.1}
            />
            <FocusCard
              title="Geography"
              items={["United Kingdom", "Ireland", "Europe", "Global-first teams"]}
              note="We partner with exceptional founders wherever they build."
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PHILOSOPHY — white
      ══════════════════════════════════════════ */}
      <section id="philosophy" className="bg-white section-pad">
        <div className="container-width">
          <SectionLabel number="03" label="Our Philosophy" />

          <motion.h2
            className="font-display font-bold mt-8 mb-14"
            style={{ fontSize: "clamp(30px, 4vw, 50px)" }}
            {...inView}
            transition={t(0.7, 0.1)}
          >
            Foundations first.
          </motion.h2>

          {/* 2×2 grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-100">
            {[
              {
                num: "01",
                title: "Clear problem understanding",
                desc: "We back founders who understand the problem deeply before pursuing scale. Clarity beats momentum every time.",
              },
              {
                num: "02",
                title: "Strong technical & product fundamentals",
                desc: "Execution quality matters more than roadmaps. We invest in teams who can build as well as they think.",
              },
              {
                num: "03",
                title: "Disciplined, thoughtful execution",
                desc: "Building carefully compounds over time. We value deliberate decision-making over reactive growth.",
              },
              {
                num: "04",
                title: "Respect for users' trust, data & time",
                desc: "Products built on genuine respect for users last longer. Trust is a durable competitive advantage.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="bg-white p-10 hover:bg-gray-50/70 transition-colors duration-300"
                {...inView}
                transition={t(0.6, i * 0.1)}
              >
                <span
                  className="text-[11px] font-semibold tracking-[0.22em] block mb-6"
                  style={{ color: AMBER }}
                >
                  {item.num}
                </span>
                <h3 className="text-[18px] font-bold font-display mb-4 text-gray-900">
                  {item.title}
                </h3>
                <p className="text-[15px] text-gray-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          HOW WE SUPPORT — warm
      ══════════════════════════════════════════ */}
      <section id="support" style={{ backgroundColor: WARM }} className="section-pad">
        <div className="container-width">
          <SectionLabel number="04" label="How We Support Founders" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mt-14">
            <motion.div {...inView} transition={t()}>
              <h2
                className="font-display font-bold leading-[1.1] mb-6"
                style={{ fontSize: "clamp(30px, 4vw, 50px)" }}
              >
                More than capital.
              </h2>
              <p className="text-[16px] text-gray-500 leading-relaxed">
                PraFounds is a hands-on partner when it's helpful—and stays out of the way when
                it's not. Our goal is simple: help founders make better decisions, earlier.
              </p>
            </motion.div>

            <motion.div
              className="divide-y divide-gray-200"
              {...inView}
              transition={t(0.7, 0.15)}
            >
              {[
                "Product clarity & early positioning",
                "Technical & architectural guidance",
                "Infrastructure, reliability & scaling",
                "Hiring strategy for early teams",
                "Preparation for the next stage of growth",
                "Network & introductions",
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center justify-between py-4 group cursor-default"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={t(0.5, 0.1 + i * 0.06)}
                >
                  <span className="text-[15px] text-gray-700 font-medium group-hover:text-gray-900 transition-colors">
                    {item}
                  </span>
                  <ArrowUpRight
                    className="w-4 h-4 text-gray-300 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0"
                    style={{ color: AMBER }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PIPELINE — white
      ══════════════════════════════════════════ */}
      <section id="pipeline" className="bg-white section-pad">
        <div className="container-width">
          <SectionLabel number="05" label="Current Pipeline" />

          <motion.h2
            className="font-display font-bold mt-8 mb-14"
            style={{ fontSize: "clamp(30px, 4vw, 50px)" }}
            {...inView}
            transition={t(0.7, 0.1)}
          >
            Active discussions.
          </motion.h2>

          <motion.div
            className="border border-gray-200 p-8 md:p-10 max-w-xl hover:border-gray-400 transition-colors duration-300 group"
            {...inView}
            transition={t(0.6, 0.15)}
          >
            <div className="flex items-center gap-2 mb-6">
              <span
                className="w-[7px] h-[7px] rounded-full animate-pulse-dot"
                style={{ backgroundColor: AMBER }}
              />
              <span
                className="text-[11px] font-semibold tracking-[0.18em] uppercase"
                style={{ color: AMBER }}
              >
                Investment discussions ongoing
              </span>
            </div>

            <h3 className="text-[22px] font-bold font-display text-gray-900 mb-4">Estospaces</h3>
            <p className="text-[15px] text-gray-500 leading-relaxed mb-6">
              Exploring next-generation spatial platforms and digital infrastructure. No commitment
              has been made.
            </p>
            <p className="text-[12px] text-gray-400 leading-relaxed">
              Pipeline companies are under active evaluation. Inclusion does not indicate
              investment commitment or endorsement.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          WHAT WE LOOK FOR — warm
      ══════════════════════════════════════════ */}
      <section id="criteria" style={{ backgroundColor: WARM }} className="section-pad">
        <div className="container-width">
          <SectionLabel number="06" label="What We Look For" />

          <motion.h2
            className="font-display font-bold mt-8 mb-14"
            style={{ fontSize: "clamp(30px, 4vw, 50px)" }}
            {...inView}
            transition={t(0.7, 0.1)}
          >
            Investment criteria.
          </motion.h2>

          <div className="max-w-3xl border-t border-gray-200">
            {[
              {
                title: "Technical founders",
                description:
                  "Deep expertise in the problem space. Track record of building systems or products that people actually use.",
              },
              {
                title: "Real problems",
                description:
                  "Clear understanding of user pain. Not solutions looking for problems—genuine insight into what's broken.",
              },
              {
                title: "Early traction",
                description:
                  "Some signal of product-market fit. Users, revenue, usage growth, or strong early partnerships.",
              },
              {
                title: "Thoughtful execution",
                description:
                  "Disciplined approach to building. Clear roadmap, smart prioritisation, willingness to say no.",
              },
              {
                title: "Long-term thinking",
                description:
                  "Building for durability, not just growth. Focused on trust, reliability, and genuine user respect.",
              },
            ].map((item, i) => (
              <CriteriaRow key={i} {...item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PITCH CTA — dark
      ══════════════════════════════════════════ */}
      <section id="pitch" className="relative section-pad overflow-hidden" style={{ backgroundColor: DARK }}>
        {/* Ambient glow — centre */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${AMBER}09 0%, transparent 65%)`,
          }}
        />

        <div className="container-width relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={t(0.8)}
          >
            {/* Overline */}
            <div className="flex items-center justify-center gap-3 mb-10">
              <span className="w-6 h-px block" style={{ backgroundColor: AMBER + "80" }} />
              <span
                className="text-[11px] font-medium tracking-[0.22em] uppercase"
                style={{ color: AMBER }}
              >
                Pitch PraFounds
              </span>
              <span className="w-6 h-px block" style={{ backgroundColor: AMBER + "80" }} />
            </div>

            <h2
              className="font-display font-bold text-white text-balance max-w-[640px] mx-auto mb-8"
              style={{ fontSize: "clamp(32px, 5vw, 60px)", lineHeight: 1.08 }}
            >
              Ready to build something that lasts?
            </h2>

            <p className="text-[16px] md:text-[17px] text-white/40 mb-12 max-w-[520px] mx-auto leading-relaxed font-light">
              If you're building foundational technology at the earliest stages, we'd like to hear
              from you. Tell us what you're building, the problem you're solving, your team, and any
              early traction.
            </p>

            <motion.a
              href="mailto:hello@prafounds.com"
              className="inline-flex items-center gap-4 px-8 py-[15px] text-[14px] font-medium tracking-wide transition-all duration-300"
              style={{ border: `1px solid ${AMBER}55`, color: "#fff" }}
              whileHover={{
                backgroundColor: AMBER,
                borderColor: AMBER,
              }}
            >
              <Mail className="w-[17px] h-[17px] shrink-0" />
              hello@prafounds.com
              <ArrowRight className="w-4 h-4 shrink-0" />
            </motion.a>

            {/* What to include */}
            <div className="mt-12 flex flex-col sm:flex-row flex-wrap justify-center gap-4">
              {[
                "What you're building & why now",
                "The problem you're solving",
                "Your team & background",
                "Early traction (if any)",
              ].map((item) => (
                <span
                  key={item}
                  className="text-[12px] text-white/25 border border-white/8 px-4 py-2"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FOOTER — white
      ══════════════════════════════════════════ */}
      <footer className="bg-white border-t border-gray-100 py-16">
        <div className="container-width">
          <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-10">
            {/* Brand */}
            <div>
              <div className="text-[22px] font-bold font-display text-gray-900 mb-3">
                PraFounds<span style={{ color: AMBER }}>.</span>
              </div>
              <p className="text-[14px] text-gray-400 leading-relaxed max-w-[240px]">
                Early-stage, founder-led investing.<br />
                Registered in the United Kingdom.
              </p>
            </div>

            {/* Nav links */}
            <div className="flex gap-10 md:gap-16 text-[13px]">
              <div className="space-y-3">
                {[
                  { label: "Philosophy", href: "#philosophy" },
                  { label: "Investment Focus", href: "#focus" },
                  { label: "Support", href: "#support" },
                ].map((l) => (
                  <div key={l.label}>
                    <a
                      href={l.href}
                      className="text-gray-400 hover:text-gray-800 transition-colors"
                    >
                      {l.label}
                    </a>
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                {[
                  { label: "Pipeline", href: "#pipeline" },
                  { label: "Criteria", href: "#criteria" },
                  { label: "Contact", href: "#pitch" },
                ].map((l) => (
                  <div key={l.label}>
                    <a
                      href={l.href}
                      className="text-gray-400 hover:text-gray-800 transition-colors"
                    >
                      {l.label}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-gray-100 pt-8 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <p className="text-[13px] text-gray-400">
                © {new Date().getFullYear()} PraFounds Ventures Ltd. All rights reserved.
              </p>
              <p className="text-[12px] text-gray-300">
                United Kingdom · Ireland · Europe
              </p>
            </div>
            <p className="text-[12px] text-gray-300 leading-relaxed max-w-3xl">
              PraFounds Ventures invests its own capital. This website does not constitute an offer
              to sell or a solicitation to purchase any securities. Past performance is not
              indicative of future results. Investment in early-stage companies involves significant
              risk, including potential loss of capital.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
