import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#FAFAFA]">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 0 L100 0 L100 100 Z" fill="currentColor" />
        </svg>
      </div>

      <div className="container-width relative z-10 pt-20">
        <div className="max-w-4xl mx-auto text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block mb-6 px-3 py-1 bg-secondary text-secondary-foreground text-xs font-semibold tracking-wider uppercase rounded-full">
              PraFounds Ventures Ltd
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-primary leading-[1.1] mb-8 text-balance">
              Backing founders who build foundations, <span className="text-muted-foreground font-light italic">not just features.</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 text-balance"
          >
            PraFounds Ventures is an early-stage investment firm partnering with founders 
            at the pre-seed and seed stage to build durable, category-defining companies. 
            We invest with conviction, think long-term, and support teams building 
            foundational technology.
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
          >
            <button
              onClick={() => scrollTo("pitch")}
              className="px-8 py-4 bg-primary text-primary-foreground font-medium rounded-sm shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              Pitch PraFounds
            </button>
            <button
              onClick={() => scrollTo("philosophy")}
              className="px-8 py-4 bg-white border border-border text-foreground font-medium rounded-sm hover:bg-gray-50 transition-all duration-300"
            >
              Our Philosophy
            </button>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-muted-foreground/50 hidden md:block"
      >
        <ArrowDown size={24} />
      </motion.div>
    </section>
  );
}
