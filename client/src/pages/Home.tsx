import * as React from "react";
import type { MotionProps } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Mail, ArrowUpRight, Crosshair, Code2, Layers, Users, TrendingUp, Globe } from "lucide-react";
import { Logo } from "@/components/Logo";

/* ── Colour tokens ── */
const DARK_BG  = "#06101F";   // deep navy — hero & footer
const LIGHT_BG = "#F2F6FB";   // cool light blue-gray — content
const CARD_BG  = "#FFFFFF";   // pure white — content cards
const INK      = "#0D1627";   // deep navy-black — light text
const CREAM    = "#EBF2FF";   // cool cream — dark text
const INDIGO   = "#6366F1";   // accent

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
function Label({ dark = false, children }: { dark?: boolean; children: React.ReactNode }) {
  return (
    <span
      className="text-[11px] font-mono font-medium uppercase tracking-[0.18em]"
      style={{ color: dark ? `${CREAM}45` : `${INK}45` }}
    >
      {children}
    </span>
  );
}

/* ── Divider ── */
function LightDivider() {
  return <div style={{ borderTop: `1px solid rgba(13,22,39,0.09)` }} />;
}

/* ── Marquee ticker ── */
const TICKER = [
  "Pre-Seed", "Seed", "Developer Tools", "Applied AI",
  "Infrastructure", "Platforms", "United Kingdom",
  "Ireland", "Europe", "Founder-First", "Long-Term Thinking", "Technical Founders",
];

function MarqueeBanner() {
  const doubled = [...TICKER, ...TICKER];
  return (
    <div
      className="overflow-hidden py-4 select-none"
      style={{ background: DARK_BG, borderTop: "1px solid rgba(255,255,255,0.07)" }}
      aria-hidden="true"
    >
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-6 px-6">
            <span
              className="text-[10px] font-mono font-medium tracking-[0.22em] uppercase"
              style={{ color: `${CREAM}35` }}
            >
              {item}
            </span>
            <span className="w-[3px] h-[3px] rounded-full shrink-0" style={{ background: `${INDIGO}60` }} />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Hero floating particles ── */
const PARTICLES = [
  { x: 15, y: 22, r: 1.5, dur: 18, del: 0,   dy: [-14,14], dx: [-7,7]   },
  { x: 78, y: 38, r: 2,   dur: 22, del: 3.5, dy: [-18,18], dx: [-10,10] },
  { x: 34, y: 67, r: 1,   dur: 16, del: 1.2, dy: [-10,10], dx: [-6,6]   },
  { x: 88, y: 14, r: 2.5, dur: 25, del: 7,   dy: [-20,20], dx: [-12,12] },
  { x: 52, y: 82, r: 1.5, dur: 20, del: 4,   dy: [-12,12], dx: [-8,8]   },
  { x: 22, y: 52, r: 1,   dur: 17, del: 2,   dy: [-16,16], dx: [-9,9]   },
  { x: 68, y: 44, r: 2,   dur: 23, del: 8.5, dy: [-11,11], dx: [-7,7]   },
  { x: 92, y: 63, r: 1.5, dur: 19, del: 1,   dy: [-15,15], dx: [-10,10] },
  { x:  8, y: 76, r: 1,   dur: 21, del: 6,   dy: [-13,13], dx: [-6,6]   },
  { x: 46, y: 28, r: 2.5, dur: 15, del: 9.5, dy: [-17,17], dx: [-11,11] },
  { x: 62, y: 90, r: 1,   dur: 24, del: 0.5, dy: [-10,10], dx: [-5,5]   },
  { x: 30, y: 10, r: 2,   dur: 18, del: 5,   dy: [-18,18], dx: [-9,9]   },
];

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.r * 2, height: p.r * 2, background: INDIGO }}
          animate={{ y: [p.dy[0], p.dy[1], p.dy[0]], x: [p.dx[0], p.dx[1], p.dx[0]], opacity: [0.06, 0.28, 0.06] }}
          transition={{ duration: p.dur, delay: p.del, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ── Rolling word cycler ── */
const ROLLING_WORDS = ["builders", "founders", "pioneers", "architects", "engineers", "makers"];

function RollingWord() {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % ROLLING_WORDS.length), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <span
      style={{
        display: "inline-block",
        overflow: "hidden",
        height: "0.92em",
        verticalAlign: "bottom",
        position: "relative",
      }}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={index}
          initial={{ y: "105%", opacity: 0 }}
          animate={{ y: "0%",   opacity: 1 }}
          exit={{    y: "-105%", opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "block", color: `${CREAM}35`, whiteSpace: "nowrap" }}
        >
          {ROLLING_WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Home() {
  const { scrollY } = useScroll();
  const heroY       = useTransform(scrollY, [0, 700], [0, -70]);
  const heroOpacity = useTransform(scrollY, [0, 420], [1, 0]);

  return (
    <div className="min-h-screen font-sans overflow-x-hidden" style={{ background: LIGHT_BG }}>

      {/* Grain overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[200] opacity-[0.025] bg-noise"
        style={{ backgroundSize: "200px 200px" }}
      />

      <Navigation />

      {/* ════════════════════════════════════════
          HERO — deep navy dark section
      ════════════════════════════════════════ */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ background: DARK_BG }}
      >
        {/* Dot grid */}
        <div className="absolute inset-0 dot-grid-dark opacity-60" />
        {/* Floating particles */}
        <FloatingParticles />
        {/* Bottom fade */}
        <div
          className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
          style={{ background: `linear-gradient(to bottom, transparent, ${DARK_BG})` }}
        />
        {/* Animated indigo ambient blobs */}
        <motion.div
          className="absolute top-1/4 left-[10%] w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{ background: INDIGO, filter: "blur(140px)" }}
          animate={{ x: [0, 40, -20, 0], y: [0, -50, 30, 0], opacity: [0.07, 0.11, 0.06, 0.07], scale: [1, 1.14, 0.92, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-[5%] w-[420px] h-[420px] rounded-full pointer-events-none"
          style={{ background: "#818CF8", filter: "blur(110px)" }}
          animate={{ x: [0, -35, 22, 0], y: [0, 32, -22, 0], opacity: [0.05, 0.09, 0.04, 0.05], scale: [1, 1.2, 0.88, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", repeatType: "mirror", delay: 3 }}
        />
        {/* Third small orb — bottom-left */}
        <motion.div
          className="absolute bottom-[15%] left-[30%] w-[280px] h-[280px] rounded-full pointer-events-none"
          style={{ background: "#A5B4FC", filter: "blur(90px)" }}
          animate={{ x: [0, 20, -15, 0], y: [0, -25, 18, 0], opacity: [0.03, 0.07, 0.02, 0.03] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", repeatType: "mirror", delay: 6 }}
        />

        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 pt-28 pb-28 w-full"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          {/* Badge */}
          <motion.div {...anim(0)} className="mb-10">
            <span
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-[11px] font-mono uppercase tracking-widest"
              style={{
                border: `1px solid rgba(235,242,255,0.12)`,
                background: "rgba(235,242,255,0.05)",
                color: `${CREAM}60`,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0" style={{ background: INDIGO }} />
              Early Stage Venture Capital
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            {...anim(0.08)}
            className="font-display font-bold leading-[0.92] tracking-[-0.04em] mb-10 text-[clamp(3.2rem,9vw,8rem)]"
            style={{ color: CREAM }}
          >
            We back the<br />
            <RollingWord /><span style={{ color: `${CREAM}28` }}> of</span><br />
            tomorrow's<br />
            <span className="text-gradient-hero">foundations.</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            {...anim(0.16)}
            className="text-[17px] md:text-xl font-light max-w-[480px] leading-relaxed mb-14"
            style={{ color: `${CREAM}60` }}
          >
            Pre-seed and seed investments in developer tools, infrastructure, and applied AI. Based in the UK, investing globally.
          </motion.p>

          {/* CTAs */}
          <motion.div {...anim(0.22)} className="flex flex-wrap gap-4">
            <a
              href="#pitch"
              onClick={(e) => { e.preventDefault(); document.getElementById("pitch")?.scrollIntoView({ behavior: "smooth" }); }}
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 text-sm font-semibold rounded-full active:scale-[0.97] transition-all duration-200"
              style={{ background: CREAM, color: DARK_BG }}
            >
              Pitch PraFounds
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
            </a>
            <a
              href="#focus"
              onClick={(e) => { e.preventDefault(); document.getElementById("focus")?.scrollIntoView({ behavior: "smooth" }); }}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 text-sm font-medium rounded-full active:scale-[0.97] transition-all duration-200"
              style={{
                border: "1px solid rgba(235,242,255,0.18)",
                color: `${CREAM}65`,
              }}
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
          <div className="w-px h-14 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        </motion.div>
      </section>

      {/* Marquee — dark, sits between hero and content */}
      <MarqueeBanner />

      {/* ════════════════════════════════════════
          WHAT WE DO — pure white bg
      ════════════════════════════════════════ */}
      <section className="py-28 md:py-36" style={{ background: CARD_BG }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          {/* Two-column header */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-20">
            <div>
              <motion.div {...fadeIn(0)} className="mb-6"><Label>What We Do</Label></motion.div>
              <motion.h2
                {...anim(0.04)}
                className="font-display font-bold text-[2.8rem] md:text-5xl lg:text-[3.5rem] leading-[1.05] tracking-[-0.035em]"
                style={{ color: INK }}
              >
                Early conviction.<br />Long-term thinking.
              </motion.h2>
            </div>
            <div className="space-y-5 text-[17px] leading-[1.8] font-light lg:pt-16" style={{ color: `${INK}62` }}>
              <motion.p {...anim(0.1)}>PraFounds Ventures backs technical founders at the earliest and most critical phase of company building.</motion.p>
              <motion.p {...anim(0.16)}>We invest at pre-seed and seed, focusing on teams building developer tools, infrastructure, applied AI platforms, and productivity software.</motion.p>
              <motion.p {...anim(0.22)}>Our approach is hands-on when helpful, patient when not. We work with small, focused teams to turn strong ideas into enduring businesses.</motion.p>
            </div>
          </div>

          {/* Three conviction cards */}
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { stat: "Pre-Seed & Seed",      sub: "Stage focus" },
              { stat: "UK, IE & Europe",      sub: "Geography" },
              { stat: "Technical Founders",   sub: "Who we back" },
            ].map((item, i) => (
              <motion.div
                key={item.sub}
                {...anim(0.08 + i * 0.07)}
                className="p-7 rounded-2xl"
                style={{ background: LIGHT_BG, border: "1px solid rgba(13,22,39,0.06)" }}
              >
                <div className="font-display font-bold text-xl leading-snug tracking-tight mb-2" style={{ color: INK }}>
                  {item.stat}
                </div>
                <div className="text-[11px] font-mono uppercase tracking-[0.16em]" style={{ color: `${INK}38` }}>
                  {item.sub}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          INVESTMENT FOCUS — light bg + accent cards
      ════════════════════════════════════════ */}
      <section id="focus" className="py-28 md:py-36" style={{ background: LIGHT_BG }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-[220px_1fr] gap-12 lg:gap-24 mb-14">
            <motion.div {...fadeIn(0)}><Label>Investment Focus</Label></motion.div>
            <motion.h2 {...anim(0)} className="font-display font-bold text-4xl md:text-5xl tracking-[-0.03em]" style={{ color: INK }}>
              Where we invest.
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              { num: "01", title: "Stage",
                items: ["Pre-Seed", "Seed"] },
              { num: "02", title: "Sectors",
                items: ["Developer tools & infrastructure", "Applied AI & platforms", "Productivity software", "Systems, reliability & trust"] },
              { num: "03", title: "Geography",
                items: ["United Kingdom & Ireland", "Europe", "Global-first teams"] },
            ].map((card, i) => (
              <motion.div
                key={card.num}
                {...anim(i * 0.09)}
                whileHover={{ y: -6, transition: { type: "spring", stiffness: 340, damping: 28 } }}
                className="relative p-9 rounded-2xl shimmer-card card-interactive"
                style={{ background: CARD_BG }}
              >
                {/* Animated indigo top bar — draws in on viewport enter */}
                <motion.div
                  className="h-[3px] rounded-full mb-8"
                  style={{ background: INDIGO }}
                  initial={{ width: 0 }}
                  whileInView={{ width: "2.25rem" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.09 + 0.25, ease: [0.22, 1, 0.36, 1] }}
                />
                {/* Giant faded background number */}
                <div
                  className="absolute top-0 right-3 font-display font-bold leading-none select-none pointer-events-none"
                  style={{ fontSize: "7rem", color: "rgba(13,22,39,0.04)", lineHeight: 0.85 }}
                >
                  {card.num}
                </div>
                <h3 className="font-display font-bold text-2xl mb-7 tracking-tight" style={{ color: INK }}>{card.title}</h3>
                <ul className="space-y-3">
                  {card.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[14px] leading-relaxed" style={{ color: `${INK}62` }}>
                      <span className="mt-[7px] w-1 h-1 rounded-full shrink-0" style={{ background: `${INDIGO}65` }} />
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
          PHILOSOPHY — white bg, editorial numbers
      ════════════════════════════════════════ */}
      <section id="philosophy" className="py-28 md:py-36" style={{ background: CARD_BG }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-[280px_1fr] gap-12 lg:gap-24">
            {/* Sticky heading */}
            <motion.div {...fadeIn(0)} className="lg:sticky lg:top-32 self-start">
              <Label>Philosophy</Label>
              <h2
                className="font-display font-bold text-4xl md:text-5xl tracking-[-0.035em] leading-[1.05] mt-5"
                style={{ color: INK }}
              >
                Foundations<br />first.
              </h2>
            </motion.div>

            {/* Numbered items — editorial style */}
            <div>
              {[
                { n: "01", title: "Clear problem understanding",
                  body: "We spend time with founders to understand the root problem before discussing solutions. The strongest companies are built on pain points that genuinely matter." },
                { n: "02", title: "Strong technical fundamentals",
                  body: "Good architecture and thoughtful engineering pay dividends for years. We value founders who think deeply about how they build, not just what they build." },
                { n: "03", title: "Disciplined, thoughtful execution",
                  body: "Early focus matters more than early scale. We back teams that can prioritise well, move deliberately, and resist the temptation to spread thin." },
                { n: "04", title: "Respect for users' trust, data & time",
                  body: "The best products earn user trust through careful design decisions. We invest in teams that treat users as partners, not metrics." },
              ].map((item, i) => (
                <div key={item.n}>
                  {/* Animated border line */}
                  <motion.div
                    style={{ height: 1, background: "rgba(13,22,39,0.08)", transformOrigin: "left" }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  />
                <motion.div
                  {...anim(i * 0.08)}
                  className="grid sm:grid-cols-[72px_1fr] gap-6 py-11"
                >
                  {/* Large editorial number */}
                  <span
                    className="font-display font-bold leading-[0.85] tracking-[-0.04em] select-none"
                    style={{ fontSize: "clamp(2.4rem,4.5vw,3.2rem)", color: "rgba(13,22,39,0.08)" }}
                  >
                    {item.n}
                  </span>
                  <div>
                    <h3 className="text-[18px] font-semibold mb-3.5 leading-snug" style={{ color: INK }}>
                      {item.title}
                    </h3>
                    <p className="text-[15px] leading-[1.75]" style={{ color: `${INK}55` }}>{item.body}</p>
                  </div>
                </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SUPPORT — light bg, icon cards
      ════════════════════════════════════════ */}
      <section id="support" className="py-28 md:py-36" style={{ background: LIGHT_BG }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-[220px_1fr] gap-12 lg:gap-24 mb-14 items-end">
            <motion.div {...fadeIn(0)}><Label>How We Support</Label></motion.div>
            <div>
              <motion.h2 {...anim(0)} className="font-display font-bold text-4xl md:text-5xl tracking-[-0.03em] mb-3" style={{ color: INK }}>
                More than capital.
              </motion.h2>
              <motion.p {...anim(0.08)} className="text-[17px] font-light leading-relaxed max-w-lg" style={{ color: `${INK}55` }}>
                Hands-on partners when it's helpful — out of the way when it's not.
              </motion.p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {([
              { Icon: Crosshair, title: "Product clarity",         desc: "Early positioning and narrative that resonates with the right audience." },
              { Icon: Code2,     title: "Technical guidance",       desc: "Architecture, technology choices, and build-vs-buy decisions." },
              { Icon: Layers,    title: "Infrastructure & scaling", desc: "Building systems that won't collapse when growth arrives." },
              { Icon: Users,     title: "Hiring strategy",          desc: "Finding and retaining the right first employees and advisors." },
              { Icon: TrendingUp,title: "Next stage preparation",   desc: "Getting investment-ready for Series A and beyond." },
              { Icon: Globe,     title: "Network & introductions",  desc: "Access to customers, advisors, co-investors, and strategic partners." },
            ] as const).map((item, i) => (
              <motion.div
                key={item.title}
                {...anim(i * 0.06)}
                whileHover={{ y: -5, transition: { type: "spring", stiffness: 340, damping: 28 } }}
                className="p-8 rounded-2xl shimmer-card card-interactive"
                style={{ background: CARD_BG }}
              >
                <motion.div
                  className="w-9 h-9 rounded-xl flex items-center justify-center mb-6"
                  style={{ background: "rgba(99,102,241,0.09)" }}
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 + 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  <item.Icon className="w-[17px] h-[17px]" style={{ color: INDIGO }} strokeWidth={1.75} />
                </motion.div>
                <h3 className="text-[15px] font-semibold mb-2.5 leading-snug" style={{ color: INK }}>{item.title}</h3>
                <p className="text-[13px] leading-relaxed" style={{ color: `${INK}50` }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          PIPELINE — white bg
      ════════════════════════════════════════ */}
      <section id="pipeline" className="py-28 md:py-36" style={{ background: CARD_BG }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-[280px_1fr] gap-12 lg:gap-24 items-start">
            <motion.div {...fadeIn(0)} className="lg:sticky lg:top-32 self-start">
              <Label>Current Pipeline</Label>
              <h2
                className="font-display font-bold text-4xl tracking-[-0.035em] leading-[1.05] mt-5"
                style={{ color: INK }}
              >
                Active<br />discussions.
              </h2>
            </motion.div>

            <div>
              <motion.div
                {...anim(0.05)}
                whileHover={{ y: -4, transition: { type: "spring", stiffness: 340, damping: 28 } }}
                className="rounded-2xl shimmer-card card-interactive p-8 md:p-10"
                style={{ background: LIGHT_BG }}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3 className="font-display font-bold text-[1.35rem] tracking-tight" style={{ color: INK }}>
                    Estospaces
                  </h3>
                  <span
                    className="shrink-0 px-3 py-1 rounded-full text-[11px] font-mono tracking-wide"
                    style={{
                      border: `1px solid rgba(99,102,241,0.25)`,
                      background: "rgba(99,102,241,0.07)",
                      color: INDIGO,
                    }}
                  >
                    Active
                  </span>
                </div>
                <p className="text-[14px] leading-relaxed" style={{ color: `${INK}58` }}>
                  Investment discussions ongoing. No commitment has been made.
                </p>
              </motion.div>

              <motion.p
                {...fadeIn(0.18)}
                className="mt-5 text-[12px] font-mono leading-relaxed"
                style={{ color: `${INK}28` }}
              >
                Pipeline companies are under evaluation. Inclusion does not indicate investment commitment or endorsement.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          CRITERIA — light bg, 2-col cards
      ════════════════════════════════════════ */}
      <section className="py-28 md:py-36" style={{ background: LIGHT_BG }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-[220px_1fr] gap-12 lg:gap-24 mb-14 items-end">
            <motion.div {...fadeIn(0)}><Label>What We Look For</Label></motion.div>
            <motion.h2 {...anim(0)} className="font-display font-bold text-4xl md:text-5xl tracking-[-0.03em]" style={{ color: INK }}>
              Investment criteria.
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4 max-w-5xl">
            {[
              { title: "Technical founders",  desc: "Deep expertise in the problem space. A track record of building systems or products that people use." },
              { title: "Real problems",        desc: "Clear understanding of user pain. Not solutions looking for problems." },
              { title: "Early traction",       desc: "Some signal of product-market fit — users, revenue, usage growth, or strong early partnerships." },
              { title: "Thoughtful execution", desc: "Disciplined approach to building. A clear roadmap and smart prioritisation under constraints." },
              { title: "Long-term thinking",   desc: "Building for durability, not just growth. Focused on trust, reliability, and respect for users." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                {...anim(i * 0.07)}
                whileHover={{ y: -4, transition: { type: "spring", stiffness: 340, damping: 28 } }}
                className="p-7 rounded-2xl shimmer-card card-interactive"
                style={{ background: CARD_BG }}
              >
                <div className="w-1.5 h-1.5 rounded-full mb-5" style={{ background: INDIGO }} />
                <h3 className="text-[16px] font-semibold mb-2.5 leading-snug" style={{ color: INK }}>
                  {item.title}
                </h3>
                <p className="text-[13px] leading-relaxed" style={{ color: `${INK}52` }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          CTA — back to dark navy
      ════════════════════════════════════════ */}
      <section
        id="pitch"
        className="relative py-36 md:py-48 overflow-hidden"
        style={{ background: DARK_BG }}
      >
        <div className="absolute inset-0 dot-grid-dark opacity-50" />
        {/* Indigo glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-[150px] pointer-events-none"
          style={{ background: INDIGO, opacity: 0.07 }}
        />
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-16 text-center pt-24">
          <motion.div {...fadeIn(0)} className="mb-10">
            <Label dark>Get in Touch</Label>
          </motion.div>
          <motion.h2
            {...anim(0.05)}
            className="font-display font-bold text-4xl md:text-6xl lg:text-[5rem] tracking-[-0.04em] leading-[0.95] mb-8 text-balance"
            style={{ color: CREAM }}
          >
            Ready to build<br />something that lasts?
          </motion.h2>
          <motion.p
            {...anim(0.12)}
            className="text-xl font-light leading-relaxed max-w-2xl mx-auto mb-14"
            style={{ color: `${CREAM}58` }}
          >
            If you're building foundational technology at the earliest stages, we'd like to hear from you.
          </motion.p>
          <motion.div {...anim(0.18)}>
            <a
              href="mailto:hello@prafounds.com"
              className="group inline-flex items-center gap-4 px-9 py-5 text-[17px] font-semibold rounded-full active:scale-[0.97] transition-all duration-200"
              style={{
                background: CREAM,
                color: DARK_BG,
                boxShadow: "0 0 80px rgba(99,102,241,0.15)",
              }}
            >
              <Mail className="w-[18px] h-[18px] shrink-0" />
              hello@prafounds.com
              <ArrowUpRight className="w-[18px] h-[18px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          FOOTER — dark navy
      ════════════════════════════════════════ */}
      <footer style={{ background: DARK_BG, borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16 py-16">
          {/* Top row */}
          <div className="flex flex-col md:flex-row justify-between gap-10 mb-12">
            {/* Logo + tagline */}
            <div>
              <Logo textColor={CREAM} dotColor={INDIGO} size={28} />
              <p className="text-[13px] mt-3" style={{ color: `${CREAM}35` }}>
                Early-stage venture capital. Registered in the United Kingdom.
              </p>
            </div>

            {/* Nav columns */}
            <div className="flex gap-16 text-[13px]">
              <div className="space-y-3">
                <p className="font-mono uppercase tracking-widest text-[10px] mb-4" style={{ color: `${CREAM}28` }}>Company</p>
                {["philosophy", "focus", "support", "pipeline"].map((id) => (
                  <button
                    key={id}
                    onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
                    className="block capitalize transition-colors duration-200"
                    style={{ color: `${CREAM}45` }}
                    onMouseEnter={e => (e.currentTarget.style.color = CREAM)}
                    onMouseLeave={e => (e.currentTarget.style.color = `${CREAM}45`)}
                  >
                    {id === "focus" ? "Investment Focus" : id.charAt(0).toUpperCase() + id.slice(1)}
                  </button>
                ))}
              </div>
              <div className="space-y-3">
                <p className="font-mono uppercase tracking-widest text-[10px] mb-4" style={{ color: `${CREAM}28` }}>Contact</p>
                <p style={{ color: `${CREAM}38` }}>UK · Ireland · Europe</p>
                <a
                  href="mailto:hello@prafounds.com"
                  className="block transition-colors duration-200"
                  style={{ color: `${CREAM}45` }}
                  onMouseEnter={e => (e.currentTarget.style.color = CREAM)}
                  onMouseLeave={e => (e.currentTarget.style.color = `${CREAM}45`)}
                >
                  hello@prafounds.com
                </a>
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div className="pt-8 flex flex-col md:flex-row justify-between gap-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <p className="text-[12px]" style={{ color: `${CREAM}30` }}>
              © {new Date().getFullYear()} PraFounds Ventures Ltd. All rights reserved.
            </p>
            <p className="text-[11px] max-w-xl leading-relaxed text-right" style={{ color: `${CREAM}18` }}>
              This website does not constitute an offer to sell or a solicitation of an offer to purchase any securities. Investment in early-stage companies involves significant risk.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
