import * as React from "react";
import type { MotionProps } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Mail, ArrowUpRight, Check } from "lucide-react";

/* ── Animation helpers ── */
const anim = (delay = 0): MotionProps => ({
  initial:     { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, margin: "-72px" },
  transition:  { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as number[] },
});

const fadeIn = (delay = 0): MotionProps => ({
  initial:     { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport:    { once: true, margin: "-72px" },
  transition:  { duration: 0.6, delay },
});

/* ── Section label ── */
function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[11px] font-mono font-medium text-white/30 uppercase tracking-[0.18em]">
      {children}
    </span>
  );
}

/* ── Divider ── */
function Divider() {
  return <div className="border-t border-white/[0.06]" />;
}

/* ── Marquee ticker ── */
const TICKER = [
  "Pre-Seed",
  "Seed",
  "Developer Tools",
  "Applied AI",
  "Infrastructure",
  "Platforms",
  "United Kingdom",
  "Ireland",
  "Europe",
  "Founder-First",
  "Long-Term Thinking",
  "Technical Founders",
];

function MarqueeBanner() {
  const doubled = [...TICKER, ...TICKER];
  return (
    <div
      className="overflow-hidden border-y border-white/[0.06] py-4 select-none"
      aria-hidden="true"
    >
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-6 px-6">
            <span className="text-[10px] font-mono font-medium tracking-[0.22em] uppercase text-white/28">
              {item}
            </span>
            <span className="w-[3px] h-[3px] rounded-full bg-indigo-500/50 shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const { scrollY } = useScroll();
  const heroY       = useTransform(scrollY, [0, 600], [0, -60]);
  const heroOpacity = useTransform(scrollY, [0, 380], [1, 0]);

  return (
    <div className="min-h-screen bg-[#09090E] text-white font-sans overflow-x-hidden">

      {/* Global grain overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[200] opacity-[0.022] bg-noise"
        style={{ backgroundSize: "200px 200px" }}
      />

      <Navigation />

      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Dot grid */}
        <div className="absolute inset-0 dot-grid opacity-[0.055]" />
        {/* Gradient fade bottom */}
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#09090E] to-transparent" />
        {/* Indigo ambient glow */}
        <div className="absolute top-1/4 left-[15%] w-[700px] h-[700px] rounded-full bg-indigo-600 opacity-[0.055] blur-[130px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-[10%] w-[400px] h-[400px] rounded-full bg-violet-600 opacity-[0.04] blur-[100px] pointer-events-none" />

        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 pt-28 pb-28 w-full"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          {/* Badge */}
          <motion.div {...anim(0)} className="mb-10">
            <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/[0.1] bg-white/[0.04] text-white/50 text-[11px] font-mono uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse shrink-0" />
              Early Stage Venture Capital
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            {...anim(0.08)}
            className="font-display font-bold leading-[0.93] tracking-[-0.04em] mb-10 text-[clamp(3.2rem,9vw,8rem)]"
          >
            We back the<br />
            <span className="text-white/25">builders of</span><br />
            tomorrow's<br />
            foundations.
          </motion.h1>

          {/* Sub */}
          <motion.p
            {...anim(0.16)}
            className="text-white/45 text-lg md:text-xl font-light max-w-[480px] leading-relaxed mb-14"
          >
            Pre-seed and seed investments in developer tools, infrastructure, and applied AI. Based in the UK, investing globally.
          </motion.p>

          {/* CTAs */}
          <motion.div {...anim(0.22)} className="flex flex-wrap gap-4">
            <a
              href="#pitch"
              onClick={(e) => { e.preventDefault(); document.getElementById("pitch")?.scrollIntoView({ behavior: "smooth" }); }}
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-white text-[#09090E] text-sm font-semibold rounded-full hover:bg-white/90 active:scale-[0.97] transition-all duration-200 shadow-[0_0_40px_rgba(255,255,255,0.08)]"
            >
              Pitch PraFounds
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
            </a>
            <a
              href="#focus"
              onClick={(e) => { e.preventDefault(); document.getElementById("focus")?.scrollIntoView({ behavior: "smooth" }); }}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 border border-white/[0.12] text-white/55 text-sm font-medium rounded-full hover:border-white/25 hover:text-white/80 active:scale-[0.97] transition-all duration-200"
            >
              Investment Focus
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut" }}
        >
          <div className="w-px h-14 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
        </motion.div>
      </section>

      <MarqueeBanner />

      {/* ════════════════════════════════════════
          WHAT WE DO
      ════════════════════════════════════════ */}
      <section className="relative py-28 md:py-36">
        <Divider />
        <div className="max-w-7xl mx-auto px-6 lg:px-16 pt-24">
          <div className="grid lg:grid-cols-[220px_1fr] gap-12 lg:gap-24 items-start">
            <motion.div {...fadeIn(0)}>
              <Label>What We Do</Label>
            </motion.div>
            <div>
              <motion.h2
                {...anim(0)}
                className="font-display font-bold text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.05] tracking-[-0.03em] mb-10"
              >
                Early conviction.<br />Long-term thinking.
              </motion.h2>
              <div className="space-y-5 text-white/48 text-[17px] leading-[1.75] font-light max-w-2xl">
                <motion.p {...anim(0.06)}>
                  PraFounds Ventures backs technical founders at the earliest and most critical phase of company building.
                </motion.p>
                <motion.p {...anim(0.12)}>
                  We invest at pre-seed and seed, focusing on teams building developer tools, infrastructure, applied AI platforms, and productivity software.
                </motion.p>
                <motion.p {...anim(0.18)}>
                  Our approach is hands-on when helpful, patient when not. We work with small, focused teams to turn strong ideas into enduring businesses.
                </motion.p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          INVESTMENT FOCUS
      ════════════════════════════════════════ */}
      <section id="focus" className="relative py-28 md:py-36">
        <Divider />
        <div className="max-w-7xl mx-auto px-6 lg:px-16 pt-24">
          {/* Header */}
          <div className="grid lg:grid-cols-[220px_1fr] gap-12 lg:gap-24 mb-16">
            <motion.div {...fadeIn(0)}>
              <Label>Investment Focus</Label>
            </motion.div>
            <motion.h2
              {...anim(0)}
              className="font-display font-bold text-4xl md:text-5xl tracking-[-0.03em]"
            >
              Where we invest.
            </motion.h2>
          </div>

          {/* Cards grid — separated by 1px "gap" via bg on the wrapper */}
          <div className="grid md:grid-cols-3 gap-px bg-white/[0.06] border border-white/[0.06]">
            {[
              {
                num: "01",
                title: "Stage",
                items: ["Pre-Seed", "Seed"],
              },
              {
                num: "02",
                title: "Sectors",
                items: [
                  "Developer tools & infrastructure",
                  "Applied AI & platforms",
                  "Productivity software",
                  "Systems, reliability & trust",
                ],
              },
              {
                num: "03",
                title: "Geography",
                items: [
                  "United Kingdom & Ireland",
                  "Europe",
                  "Global-first teams",
                ],
              },
            ].map((card, i) => (
              <motion.div
                key={card.num}
                {...anim(i * 0.1)}
                className="bg-[#09090E] p-9 md:p-11 group hover:bg-white/[0.018] transition-colors duration-400"
              >
                <span className="font-mono text-[11px] text-white/18 block mb-8 tracking-widest">
                  {card.num}
                </span>
                <h3 className="font-display font-bold text-2xl mb-8 tracking-tight">
                  {card.title}
                </h3>
                <ul className="space-y-3.5">
                  {card.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-white/45 text-[14px] leading-relaxed">
                      <span className="mt-[7px] w-1 h-1 rounded-full bg-indigo-400/50 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          PHILOSOPHY
      ════════════════════════════════════════ */}
      <section id="philosophy" className="relative py-28 md:py-36">
        <Divider />
        <div className="max-w-7xl mx-auto px-6 lg:px-16 pt-24">
          <div className="grid lg:grid-cols-[220px_1fr] gap-12 lg:gap-24">
            {/* Sticky label + heading */}
            <motion.div {...fadeIn(0)} className="lg:sticky lg:top-32 self-start">
              <Label>Philosophy</Label>
              <h2 className="font-display font-bold text-4xl md:text-5xl tracking-[-0.03em] leading-tight mt-5">
                Foundations<br />first.
              </h2>
            </motion.div>

            {/* Principles */}
            <div>
              {[
                {
                  n: "01",
                  title: "Clear problem understanding",
                  body: "We spend time with founders to understand the root problem before discussing solutions. The strongest companies are built on pain points that genuinely matter.",
                },
                {
                  n: "02",
                  title: "Strong technical fundamentals",
                  body: "Good architecture and thoughtful engineering pay dividends for years. We value founders who think deeply about how they build, not just what they build.",
                },
                {
                  n: "03",
                  title: "Disciplined, thoughtful execution",
                  body: "Early focus matters more than early scale. We back teams that can prioritise well, move deliberately, and resist the temptation to spread thin.",
                },
                {
                  n: "04",
                  title: "Respect for users' trust, data & time",
                  body: "The best products earn user trust through careful design decisions. We invest in teams that treat users as partners, not metrics.",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.n}
                  {...anim(i * 0.07)}
                  className="group py-9 border-t border-white/[0.06] first:border-t-0"
                >
                  <div className="flex gap-7 items-start">
                    <span className="font-mono text-[11px] text-white/18 shrink-0 mt-[3px] tracking-widest">
                      {item.n}
                    </span>
                    <div>
                      <h3 className="text-[17px] font-semibold mb-3 leading-snug group-hover:text-indigo-300 transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-white/40 text-[14px] leading-relaxed max-w-2xl">
                        {item.body}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          HOW WE SUPPORT
      ════════════════════════════════════════ */}
      <section id="support" className="relative py-28 md:py-36">
        <Divider />
        <div className="max-w-7xl mx-auto px-6 lg:px-16 pt-24">
          {/* Header */}
          <div className="grid lg:grid-cols-[220px_1fr] gap-12 lg:gap-24 mb-16 items-end">
            <motion.div {...fadeIn(0)}>
              <Label>How We Support</Label>
            </motion.div>
            <div>
              <motion.h2 {...anim(0)} className="font-display font-bold text-4xl md:text-5xl tracking-[-0.03em] mb-4">
                More than capital.
              </motion.h2>
              <motion.p {...anim(0.08)} className="text-white/40 text-[17px] font-light leading-relaxed max-w-lg">
                We're hands-on partners when it's helpful — and stay out of the way when it's not.
              </motion.p>
            </div>
          </div>

          {/* Support grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06] border border-white/[0.06]">
            {[
              {
                title: "Product clarity",
                desc: "Early positioning and narrative that resonates with the right audience.",
              },
              {
                title: "Technical guidance",
                desc: "Architecture, technology choices, and build-vs-buy decisions.",
              },
              {
                title: "Infrastructure & scaling",
                desc: "Building systems that won't collapse when growth arrives.",
              },
              {
                title: "Hiring strategy",
                desc: "Finding and retaining the right first employees and advisors.",
              },
              {
                title: "Next stage preparation",
                desc: "Getting investment-ready for Series A and beyond.",
              },
              {
                title: "Network & introductions",
                desc: "Access to customers, advisors, co-investors, and strategic partners.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                {...anim(i * 0.06)}
                className="bg-[#09090E] p-7 md:p-9 group hover:bg-white/[0.018] transition-colors duration-300"
              >
                <div className="flex items-start gap-3 mb-3">
                  <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-[2px]" strokeWidth={3} />
                  <h3 className="text-[14px] font-semibold text-white leading-snug">{item.title}</h3>
                </div>
                <p className="text-white/35 text-[13px] leading-relaxed pl-[26px]">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          PIPELINE
      ════════════════════════════════════════ */}
      <section id="pipeline" className="relative py-28 md:py-36">
        <Divider />
        <div className="max-w-7xl mx-auto px-6 lg:px-16 pt-24">
          <div className="grid lg:grid-cols-[220px_1fr] gap-12 lg:gap-24 items-start">
            <motion.div {...fadeIn(0)} className="lg:sticky lg:top-32 self-start">
              <Label>Current Pipeline</Label>
              <h2 className="font-display font-bold text-4xl tracking-[-0.03em] leading-tight mt-5">
                Active<br />discussions.
              </h2>
            </motion.div>

            <div>
              <motion.div
                {...anim(0.05)}
                className="group p-8 md:p-10 border border-white/[0.08] bg-white/[0.018] hover:border-white/[0.14] hover:bg-white/[0.03] transition-all duration-300 rounded-sm"
              >
                <div className="flex items-start justify-between gap-4 mb-5">
                  <h3 className="font-display font-bold text-2xl tracking-tight">Estospaces</h3>
                  <span className="shrink-0 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300/80 text-[11px] font-mono tracking-wide">
                    Active
                  </span>
                </div>
                <p className="text-white/40 text-[14px] leading-relaxed">
                  Investment discussions ongoing. No commitment has been made.
                </p>
              </motion.div>

              <motion.p {...fadeIn(0.15)} className="mt-5 text-white/20 text-[12px] font-mono leading-relaxed">
                Pipeline companies are under evaluation. Inclusion does not indicate investment commitment or endorsement.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          WHAT WE LOOK FOR
      ════════════════════════════════════════ */}
      <section className="relative py-28 md:py-36">
        <Divider />
        <div className="max-w-7xl mx-auto px-6 lg:px-16 pt-24">
          {/* Header */}
          <div className="grid lg:grid-cols-[220px_1fr] gap-12 lg:gap-24 mb-16 items-end">
            <motion.div {...fadeIn(0)}>
              <Label>What We Look For</Label>
            </motion.div>
            <motion.h2 {...anim(0)} className="font-display font-bold text-4xl md:text-5xl tracking-[-0.03em]">
              Investment criteria.
            </motion.h2>
          </div>

          {/* Criteria list */}
          <div className="max-w-5xl">
            {[
              {
                title: "Technical founders",
                desc: "Deep expertise in the problem space. A track record of building systems or products that people use.",
              },
              {
                title: "Real problems",
                desc: "Clear understanding of user pain. Not solutions looking for problems.",
              },
              {
                title: "Early traction",
                desc: "Some signal of product-market fit — users, revenue, usage growth, or strong early partnerships.",
              },
              {
                title: "Thoughtful execution",
                desc: "Disciplined approach to building. A clear roadmap and smart prioritisation under constraints.",
              },
              {
                title: "Long-term thinking",
                desc: "Building for durability, not just growth. Focused on trust, reliability, and respect for users.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                {...anim(i * 0.07)}
                className="grid md:grid-cols-[260px_1fr] gap-5 md:gap-14 py-8 border-t border-white/[0.06] group"
              >
                <h3 className="text-[15px] font-semibold text-white/80 group-hover:text-indigo-300 transition-colors duration-300 self-start mt-0.5">
                  {item.title}
                </h3>
                <p className="text-white/40 text-[14px] leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          CTA / PITCH
      ════════════════════════════════════════ */}
      <section id="pitch" className="relative py-36 md:py-48 overflow-hidden">
        <Divider />
        {/* Background glow */}
        <div className="absolute inset-0 opacity-[0.12] bg-gradient-to-b from-indigo-900/60 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-indigo-600 opacity-[0.06] blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-16 text-center pt-24">
          <motion.div {...fadeIn(0)} className="mb-10">
            <Label>Get in Touch</Label>
          </motion.div>

          <motion.h2
            {...anim(0.05)}
            className="font-display font-bold text-4xl md:text-6xl lg:text-[5rem] tracking-[-0.04em] leading-[0.95] mb-8 text-balance"
          >
            Ready to build<br />something that lasts?
          </motion.h2>

          <motion.p
            {...anim(0.12)}
            className="text-white/40 text-xl font-light leading-relaxed max-w-2xl mx-auto mb-14"
          >
            If you're building foundational technology at the earliest stages, we'd like to hear from you.
          </motion.p>

          <motion.div {...anim(0.18)}>
            <a
              href="mailto:hello@prafounds.com"
              className="group inline-flex items-center gap-4 px-9 py-5 bg-white text-[#09090E] text-[17px] font-semibold rounded-full hover:bg-white/92 active:scale-[0.97] transition-all duration-200 shadow-[0_0_80px_rgba(255,255,255,0.08)]"
            >
              <Mail className="w-[18px] h-[18px] shrink-0" />
              hello@prafounds.com
              <ArrowUpRight className="w-[18px] h-[18px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════ */}
      <footer className="py-14">
        <Divider />
        <div className="max-w-7xl mx-auto px-6 lg:px-16 pt-12">
          <div className="flex flex-col md:flex-row justify-between gap-8 mb-10">
            <div>
              <div className="font-display font-bold text-[18px] tracking-tight mb-2">
                PraFounds<span className="text-indigo-400">.</span>
              </div>
              <p className="text-white/28 text-[13px]">
                Early-stage venture capital. Registered in the United Kingdom.
              </p>
            </div>
            <div className="text-[13px] space-y-1">
              <p className="text-white/28">United Kingdom · Ireland · Europe</p>
              <a
                href="mailto:hello@prafounds.com"
                className="text-white/40 hover:text-white/70 transition-colors duration-200 block"
              >
                hello@prafounds.com
              </a>
            </div>
          </div>

          <div className="border-t border-white/[0.05] pt-8 space-y-3">
            <p className="text-white/25 text-[12px]">
              © {new Date().getFullYear()} PraFounds Ventures Ltd. All rights reserved.
            </p>
            <p className="text-white/14 text-[11px] max-w-3xl leading-relaxed">
              This website does not constitute an offer to sell or a solicitation of an offer to purchase any securities. Past performance is not indicative of future results. Investment in early-stage companies involves significant risk, including loss of capital.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
