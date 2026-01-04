import * as React from "react";
import { Navigation } from "@/components/Navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { Check, Mail, ArrowRight, Activity, Cpu, Globe, Target, Users, TrendingUp, Building2, Lightbulb, MessageSquare } from "lucide-react";

export default function Home() {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.95]);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-gray-200 overflow-x-hidden relative">
      <Navigation />

      {/* Hero Section */}
      <motion.section
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-white"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        <motion.div
          className="absolute inset-0 opacity-[0.015]"
          style={{ y: useTransform(scrollY, [0, 500], [0, 150]) }}
        >
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }} />
        </motion.div>

        <div className="relative z-10 container mx-auto px-6 lg:px-20 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="max-w-5xl"
          >
            <div className="inline-block mb-8 px-5 py-2 rounded-full bg-gray-900 text-white">
              <span className="text-sm font-medium uppercase tracking-wider">Early Stage Venture Capital</span>
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-10 leading-[1.1] text-gray-900">
              Backing founders<br />who build foundations,<br />not just features
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl leading-relaxed font-light">
              Early-stage venture capital for technical teams solving hard problems. Pre-seed and seed investments across the UK, Ireland, and Europe.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <motion.a
                href="#pitch"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group px-10 py-5 bg-gray-900 text-white rounded-full font-semibold text-lg flex items-center gap-3 hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Pitch PraFounds
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>

              <motion.a
                href="#focus"
                whileHover={{ scale: 1.02, y: -2 }}
                className="px-10 py-5 bg-white border-2 border-gray-900 text-gray-900 rounded-full font-semibold text-lg hover:bg-gray-50 transition-all duration-300"
              >
                Investment Focus
              </motion.a>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-gray-400 rounded-full" />
          </div>
        </motion.div>
      </motion.section>

      {/* What We Do */}
      <section className="relative py-32 bg-white border-y border-gray-200 overflow-hidden">
        <div className="container mx-auto px-6 lg:px-20 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="max-w-4xl">
              <motion.span
                className="text-sm font-medium uppercase tracking-wider text-gray-500 mb-4 block"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                What We Do
              </motion.span>
              <motion.h2
                className="text-5xl md:text-6xl font-bold mb-12 leading-tight text-gray-900"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                Early conviction.<br />Long-term thinking.
              </motion.h2>

              <div className="space-y-6">
                <motion.p
                  className="text-xl text-gray-600 leading-relaxed"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  PraFounds Ventures backs technical founders at the earliest and most critical phase of company building.
                </motion.p>
                <motion.p
                  className="text-xl text-gray-600 leading-relaxed"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  We invest in pre-seed and seed stages, focusing on teams building developer tools, infrastructure, applied AI platforms, and productivity software.
                </motion.p>
                <motion.p
                  className="text-xl text-gray-600 leading-relaxed"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  Our approach is hands-on when helpful, patient when not. We work with small, focused teams to help turn strong ideas into enduring businesses.
                </motion.p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Investment Focus */}
      <section id="focus" className="relative py-32 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-6 lg:px-20 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <motion.span
              className="text-sm font-medium uppercase tracking-wider text-gray-500 mb-4 block"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Investment Focus
            </motion.span>
            <motion.h2
              className="text-5xl md:text-6xl font-bold text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Where we invest
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FocusCard
              icon={<Activity className="w-8 h-8" />}
              title="Stage"
              items={["Pre-Seed", "Seed"]}
              delay={0}
            />
            <FocusCard
              icon={<Cpu className="w-8 h-8" />}
              title="Sectors"
              items={[
                "Developer tools & infrastructure",
                "Applied AI & platforms",
                "Productivity software",
                "Systems, reliability & trust"
              ]}
              delay={0.15}
            />
            <FocusCard
              icon={<Globe className="w-8 h-8" />}
              title="Geography"
              items={[
                "United Kingdom & Ireland",
                "Europe",
                "Global-first teams"
              ]}
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Our Philosophy */}
      <section className="relative py-32 bg-white border-y border-gray-200 overflow-hidden">
        <div className="container mx-auto px-6 lg:px-20 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <motion.span
              className="text-sm font-medium uppercase tracking-wider text-gray-500 mb-4 block"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Our Philosophy
            </motion.span>
            <motion.h2
              className="text-5xl md:text-6xl font-bold text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Foundations first
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Clear problem understanding", icon: <Target /> },
              { title: "Strong technical & product fundamentals", icon: <Lightbulb /> },
              { title: "Disciplined, thoughtful execution", icon: <Activity /> },
              { title: "Respect for users' trust, data & time", icon: <Users /> }
            ].map((principle, i) => (
              <PrincipleCard key={i} {...principle} delay={i * 0.15} />
            ))}
          </div>
        </div>
      </section>

      {/* How We Support Founders */}
      <section id="support" className="relative py-32 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-6 lg:px-20 max-w-7xl">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="mb-16"
            >
              <motion.span
                className="text-sm font-medium uppercase tracking-wider text-gray-500 mb-4 block"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                How We Support Founders
              </motion.span>
              <motion.h2
                className="text-5xl md:text-6xl font-bold mb-6 text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                More than capital
              </motion.h2>
              <motion.p
                className="text-xl text-gray-600 max-w-3xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                We're hands-on partners when it's helpful—and stay out of the way when it's not.
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                "Product clarity & early positioning",
                "Technical & architectural guidance",
                "Infrastructure reliability & scaling",
                "Hiring strategy for early teams",
                "Preparation for the next stage",
                "Network & introductions"
              ].map((item, i) => (
                <SupportCard key={i} text={item} delay={i * 0.1} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pipeline */}
      <section className="relative py-32 bg-white border-y border-gray-200">
        <div className="container mx-auto px-6 lg:px-20 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <span className="text-sm font-medium uppercase tracking-wider text-gray-500 mb-4 block">
              Current Pipeline
            </span>
            <h2 className="text-5xl md:text-6xl font-bold mb-12 text-gray-900">
              Active discussions
            </h2>

            <div className="p-10 border-2 border-gray-200 bg-gray-50">
              <div className="flex items-start gap-4 mb-4">
                <MessageSquare className="w-6 h-6 text-gray-900 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Estospaces</h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Investment discussions ongoing. No commitment has been made.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-500 mt-6">
              Pipeline companies are under evaluation. Inclusion does not indicate investment commitment or endorsement.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What We Look For */}
      <section className="relative py-32 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-20 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <span className="text-sm font-medium uppercase tracking-wider text-gray-500 mb-4 block">
              What We Look For
            </span>
            <h2 className="text-5xl md:text-6xl font-bold mb-12 text-gray-900">
              Investment criteria
            </h2>

            <div className="space-y-8">
              <CriteriaItem
                title="Technical founders"
                description="Deep expertise in the problem space. Track record of building systems or products that people use."
              />
              <CriteriaItem
                title="Real problems"
                description="Clear understanding of user pain. Not solutions looking for problems."
              />
              <CriteriaItem
                title="Early traction"
                description="Some signal of product-market fit. Could be users, revenue, usage growth, or strong partnerships."
              />
              <CriteriaItem
                title="Thoughtful execution"
                description="Disciplined approach to building. Clear roadmap. Smart prioritization."
              />
              <CriteriaItem
                title="Long-term thinking"
                description="Building for durability, not just growth. Focused on trust, reliability, and user respect."
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pitch PraFounds */}
      <section id="pitch" className="relative py-32 bg-gray-900 text-white">
        <div className="container mx-auto px-6 lg:px-20 max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-8">Ready to build something that lasts?</h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
              If you're building foundational technology at the earliest stages, we'd like to hear from you.
            </p>

            <motion.a
              href="mailto:hello@prafounds.com"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-4 px-10 py-6 bg-white text-gray-900 text-xl font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-2xl"
            >
              <Mail className="w-6 h-6" />
              hello@prafounds.com
              <ArrowRight className="w-6 h-6" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-white border-t border-gray-200">
        <div className="container mx-auto px-6 lg:px-20 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">PraFounds Ventures Ltd</h3>
              <p className="text-gray-600 max-w-md mb-4 font-light">
                Early-stage venture capital. Registered in the United Kingdom.
              </p>
              <p className="text-gray-500 text-sm">United Kingdom · Ireland · Europe</p>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-200 space-y-3">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} PraFounds Ventures Ltd. All rights reserved.
            </p>
            <p className="text-gray-400 text-xs max-w-3xl">
              This website does not constitute an offer to sell or a solicitation of an offer to purchase any securities. Past performance is not indicative of future results. Investment in early-stage companies involves significant risk, including loss of capital.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Components

function FocusCard({ icon, title, items, delay = 0 }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay }}
      className="p-10 bg-white border border-gray-200 hover:border-gray-900 hover:shadow-lg transition-all duration-300"
    >
      <div className="inline-flex p-4 bg-gray-900 text-white mb-8">
        {icon}
      </div>

      <h3 className="text-2xl font-bold mb-8 text-gray-900">
        {title}
      </h3>

      <ul className="space-y-4">
        {items.map((item: string, i: number) => (
          <motion.li
            key={i}
            className="flex items-start gap-3 text-gray-600"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: delay + (i * 0.1) }}
          >
            <div className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 shrink-0" />
            <span className="font-light">{item}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

function PrincipleCard({ title, icon, delay }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay, duration: 0.7 }}
      className="p-8 bg-white border border-gray-200 hover:border-gray-900 hover:shadow-lg transition-all duration-300"
    >
      <div className="mb-6 text-gray-900">
        {React.cloneElement(icon, { className: "w-10 h-10" })}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 leading-snug">
        {title}
      </h3>
    </motion.div>
  );
}

function SupportCard({ text, delay }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay, duration: 0.6 }}
      className="p-6 bg-white border border-gray-200 hover:border-gray-900 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-center gap-3">
        <Check className="w-5 h-5 text-gray-900 shrink-0" />
        <span className="text-gray-700 font-light">{text}</span>
      </div>
    </motion.div>
  );
}

function CriteriaItem({ title, description }: { title: string; description: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="border-l-4 border-gray-900 pl-6"
    >
      <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-lg text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
  );
}
