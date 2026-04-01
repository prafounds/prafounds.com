import * as React from "react";
import type { MotionProps } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Mail, ArrowUpRight, Check } from "lucide-react";

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
        {/* Bottom fade into light content */}
        <div
          className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
          style={{ background: `linear-gradient(to bottom, transparent, ${DARK_BG})` }}
        />
        {/* Indigo ambient */}
        <div className="absolute top-1/4 left-[10%] w-[700px] h-[700px] rounded-full opacity-[0.07] blur-[140px] pointer-events-none"
             style={{ background: INDIGO }} />
        <div className="absolute bottom-1/4 right-[5%] w-[400px] h-[400px] rounded-full opacity-[0.05] blur-[100px] pointer-events-none"
             style={{ background: "#818CF8" }} />

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
            foundations.
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
          WHAT WE DO — light
      ════════════════════════════════════════ */}
      <section className="relative py-28 md:py-36" style={{ background: LIGHT_BG }}>
        <LightDivider />
        <div className="max-w-7xl mx-auto px-6 lg:px-16 pt-24">
          <div className="grid lg:grid-cols-[220px_1fr] gap-12 lg:gap-24 items-start">
            <motion.div {...fadeIn(0)}><Label>What We Do</Label></motion.div>
            <div>
              <motion.h2
                {...anim(0)}
                className="font-display font-bold text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.05] tracking-[-0.03em] mb-10"
                style={{ color: INK }}
              >
                Early conviction.<br />Long-term thinking.
              </motion.h2>
              <div className="space-y-5 text-[17px] leading-[1.75] font-light max-w-2xl" style={{ color: `${INK}68` }}>
                <motion.p {...anim(0.06)}>PraFounds Ventures backs technical founders at the earliest and most critical phase of company building.</motion.p>
                <motion.p {...anim(0.12)}>We invest at pre-seed and seed, focusing on teams building developer tools, infrastructure, applied AI platforms, and productivity software.</motion.p>
                <motion.p {...anim(0.18)}>Our approach is hands-on when helpful, patient when not. We work with small, focused teams to turn strong ideas into enduring businesses.</motion.p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          INVESTMENT FOCUS — white cards on light bg
      ════════════════════════════════════════ */}
      <section id="focus" className="relative py-28 md:py-36" style={{ background: LIGHT_BG }}>
        <LightDivider />
        <div className="max-w-7xl mx-auto px-6 lg:px-16 pt-24">
          <div className="grid lg:grid-cols-[220px_1fr] gap-12 lg:gap-24 mb-16">
            <motion.div {...fadeIn(0)}><Label>Investment Focus</Label></motion.div>
            <motion.h2 {...anim(0)} className="font-display font-bold text-4xl md:text-5xl tracking-[-0.03em]" style={{ color: INK }}>
              Where we invest.
            </motion.h2>
          </div>

          <div
            className="grid md:grid-cols-3 gap-px"
            style={{ background: "rgba(13,22,39,0.09)", border: "1px solid rgba(13,22,39,0.09)" }}
          >
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
                {...anim(i * 0.1)}
                className="p-9 md:p-11 group transition-colors duration-300"
                style={{ background: CARD_BG }}
                onMouseEnter={e => (e.currentTarget.style.background = "#F8FAFE")}
                onMouseLeave={e => (e.currentTarget.style.background = CARD_BG)}
              >
                <span className="font-mono text-[11px] block mb-8 tracking-widest" style={{ color: `${INK}25` }}>{card.num}</span>
                <h3 className="font-display font-bold text-2xl mb-8 tracking-tight" style={{ color: INK }}>{card.title}</h3>
                <ul className="space-y-3.5">
                  {card.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[14px] leading-relaxed" style={{ color: `${INK}60` }}>
                      <span className="mt-[7px] w-1 h-1 rounded-full shrink-0" style={{ background: `${INDIGO}60` }} />
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
      <section id="philosophy" className="relative py-28 md:py-36" style={{ background: LIGHT_BG }}>
        <LightDivider />
        <div className="max-w-7xl mx-auto px-6 lg:px-16 pt-24">
          <div className="grid lg:grid-cols-[220px_1fr] gap-12 lg:gap-24">
            <motion.div {...fadeIn(0)} className="lg:sticky lg:top-32 self-start">
              <Label>Philosophy</Label>
              <h2 className="font-display font-bold text-4xl md:text-5xl tracking-[-0.03em] leading-tight mt-5" style={{ color: INK }}>
                Foundations<br />first.
              </h2>
            </motion.div>
            <div>
              {[
                { n: "01", title: "Clear problem understanding",           body: "We spend time with founders to understand the root problem before discussing solutions. The strongest companies are built on pain points that genuinely matter." },
                { n: "02", title: "Strong technical fundamentals",         body: "Good architecture and thoughtful engineering pay dividends for years. We value founders who think deeply about how they build, not just what they build." },
                { n: "03", title: "Disciplined, thoughtful execution",     body: "Early focus matters more than early scale. We back teams that can prioritise well, move deliberately, and resist the temptation to spread thin." },
                { n: "04", title: "Respect for users' trust, data & time", body: "The best products earn user trust through careful design decisions. We invest in teams that treat users as partners, not metrics." },
              ].map((item, i) => (
                <motion.div
                  key={item.n}
                  {...anim(i * 0.07)}
                  className="group py-9 first:border-t-0"
                  style={{ borderTop: "1px solid rgba(13,22,39,0.09)" }}
                >
                  <div className="flex gap-7 items-start">
                    <span className="font-mono text-[11px] shrink-0 mt-[3px] tracking-widest" style={{ color: `${INK}25` }}>{item.n}</span>
                    <div>
                      <h3
                        className="text-[17px] font-semibold mb-3 leading-snug transition-colors duration-300"
                        style={{ color: INK }}
                        onMouseEnter={e => (e.currentTarget.style.color = INDIGO)}
                        onMouseLeave={e => (e.currentTarget.style.color = INK)}
                      >
                        {item.title}
                      </h3>
                      <p className="text-[14px] leading-relaxed max-w-2xl" style={{ color: `${INK}55` }}>{item.body}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SUPPORT
      ════════════════════════════════════════ */}
      <section id="support" className="relative py-28 md:py-36" style={{ background: LIGHT_BG }}>
        <LightDivider />
        <div className="max-w-7xl mx-auto px-6 lg:px-16 pt-24">
          <div className="grid lg:grid-cols-[220px_1fr] gap-12 lg:gap-24 mb-16 items-end">
            <motion.div {...fadeIn(0)}><Label>How We Support</Label></motion.div>
            <div>
              <motion.h2 {...anim(0)} className="font-display font-bold text-4xl md:text-5xl tracking-[-0.03em] mb-4" style={{ color: INK }}>
                More than capital.
              </motion.h2>
              <motion.p {...anim(0.08)} className="text-[17px] font-light leading-relaxed max-w-lg" style={{ color: `${INK}58` }}>
                We're hands-on partners when it's helpful — and stay out of the way when it's not.
              </motion.p>
            </div>
          </div>

          <div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-px"
            style={{ background: "rgba(13,22,39,0.09)", border: "1px solid rgba(13,22,39,0.09)" }}
          >
            {[
              { title: "Product clarity",         desc: "Early positioning and narrative that resonates with the right audience." },
              { title: "Technical guidance",       desc: "Architecture, technology choices, and build-vs-buy decisions." },
              { title: "Infrastructure & scaling", desc: "Building systems that won't collapse when growth arrives." },
              { title: "Hiring strategy",          desc: "Finding and retaining the right first employees and advisors." },
              { title: "Next stage preparation",   desc: "Getting investment-ready for Series A and beyond." },
              { title: "Network & introductions",  desc: "Access to customers, advisors, co-investors, and strategic partners." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                {...anim(i * 0.06)}
                className="p-7 md:p-9 transition-colors duration-300"
                style={{ background: CARD_BG }}
                onMouseEnter={e => (e.currentTarget.style.background = "#F8FAFE")}
                onMouseLeave={e => (e.currentTarget.style.background = CARD_BG)}
              >
                <div className="flex items-start gap-3 mb-3">
                  <Check className="w-3.5 h-3.5 shrink-0 mt-[2px]" strokeWidth={3} style={{ color: INDIGO }} />
                  <h3 className="text-[14px] font-semibold leading-snug" style={{ color: INK }}>{item.title}</h3>
                </div>
                <p className="text-[13px] leading-relaxed pl-[26px]" style={{ color: `${INK}48` }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          PIPELINE
      ════════════════════════════════════════ */}
      <section id="pipeline" className="relative py-28 md:py-36" style={{ background: LIGHT_BG }}>
        <LightDivider />
        <div className="max-w-7xl mx-auto px-6 lg:px-16 pt-24">
          <div className="grid lg:grid-cols-[220px_1fr] gap-12 lg:gap-24 items-start">
            <motion.div {...fadeIn(0)} className="lg:sticky lg:top-32 self-start">
              <Label>Current Pipeline</Label>
              <h2 className="font-display font-bold text-4xl tracking-[-0.03em] leading-tight mt-5" style={{ color: INK }}>
                Active<br />discussions.
              </h2>
            </motion.div>
            <div>
              <motion.div
                {...anim(0.05)}
                className="p-8 md:p-10 rounded-sm transition-all duration-300"
                style={{
                  background: CARD_BG,
                  border: "1px solid rgba(13,22,39,0.1)",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(13,22,39,0.18)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(13,22,39,0.1)"; }}
              >
                <div className="flex items-start justify-between gap-4 mb-5">
                  <h3 className="font-display font-bold text-2xl tracking-tight" style={{ color: INK }}>Estospaces</h3>
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
              <motion.p {...fadeIn(0.15)} className="mt-5 text-[12px] font-mono leading-relaxed" style={{ color: `${INK}30` }}>
                Pipeline companies are under evaluation. Inclusion does not indicate investment commitment or endorsement.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          CRITERIA
      ════════════════════════════════════════ */}
      <section className="relative py-28 md:py-36" style={{ background: LIGHT_BG }}>
        <LightDivider />
        <div className="max-w-7xl mx-auto px-6 lg:px-16 pt-24">
          <div className="grid lg:grid-cols-[220px_1fr] gap-12 lg:gap-24 mb-16 items-end">
            <motion.div {...fadeIn(0)}><Label>What We Look For</Label></motion.div>
            <motion.h2 {...anim(0)} className="font-display font-bold text-4xl md:text-5xl tracking-[-0.03em]" style={{ color: INK }}>
              Investment criteria.
            </motion.h2>
          </div>
          <div className="max-w-5xl">
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
                className="grid md:grid-cols-[260px_1fr] gap-5 md:gap-14 py-8 group"
                style={{ borderTop: "1px solid rgba(13,22,39,0.09)" }}
              >
                <h3
                  className="text-[15px] font-semibold self-start mt-0.5 transition-colors duration-300"
                  style={{ color: `${INK}75` }}
                  onMouseEnter={e => (e.currentTarget.style.color = INDIGO)}
                  onMouseLeave={e => (e.currentTarget.style.color = `${INK}75`)}
                >
                  {item.title}
                </h3>
                <p className="text-[14px] leading-relaxed" style={{ color: `${INK}55` }}>{item.desc}</p>
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
      <footer className="py-14" style={{ background: DARK_BG, borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16 pt-4">
          <div className="flex flex-col md:flex-row justify-between gap-8 mb-10">
            <div>
              <div className="font-display font-bold text-[18px] tracking-tight mb-2" style={{ color: CREAM }}>
                PraFounds<span style={{ color: INDIGO }}>.</span>
              </div>
              <p className="text-[13px]" style={{ color: `${CREAM}38` }}>
                Early-stage venture capital. Registered in the United Kingdom.
              </p>
            </div>
            <div className="text-[13px] space-y-1">
              <p style={{ color: `${CREAM}38` }}>United Kingdom · Ireland · Europe</p>
              <a
                href="mailto:hello@prafounds.com"
                className="transition-colors duration-200 block"
                style={{ color: `${CREAM}50` }}
                onMouseEnter={e => (e.currentTarget.style.color = CREAM)}
                onMouseLeave={e => (e.currentTarget.style.color = `${CREAM}50`)}
              >
                hello@prafounds.com
              </a>
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }} className="pt-8 space-y-3">
            <p className="text-[12px]" style={{ color: `${CREAM}32` }}>
              © {new Date().getFullYear()} PraFounds Ventures Ltd. All rights reserved.
            </p>
            <p className="text-[11px] max-w-3xl leading-relaxed" style={{ color: `${CREAM}20` }}>
              This website does not constitute an offer to sell or a solicitation of an offer to purchase any securities. Past performance is not indicative of future results. Investment in early-stage companies involves significant risk, including loss of capital.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
