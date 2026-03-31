import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const DARK_BG = "#0B0D14";
const AMBER = "#C9884A";

const navLinks = [
  { label: "Philosophy", id: "philosophy" },
  { label: "Focus", id: "focus" },
  { label: "Support", id: "support" },
  { label: "Pipeline", id: "pipeline" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const scrollToSection = (id: string) => {
    setMobileOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, mobileOpen ? 300 : 0);
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-white/96 backdrop-blur-md border-b border-gray-100 py-4 shadow-[0_1px_0_rgba(0,0,0,0.04)]"
            : "bg-transparent border-b border-transparent py-6"
        )}
      >
        <div className="container-width flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={cn(
              "text-[22px] font-bold tracking-tight transition-colors duration-500 font-display",
              scrolled ? "text-gray-900" : "text-white"
            )}
          >
            PraFounds
            <span style={{ color: AMBER }}>.</span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  "text-[13px] font-medium tracking-wide transition-all duration-300 hover:opacity-100",
                  scrolled
                    ? "text-gray-500 hover:text-gray-900"
                    : "text-white/55 hover:text-white"
                )}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection("pitch")}
              className={cn(
                "px-5 py-2.5 text-[13px] font-medium tracking-wide transition-all duration-300",
                scrolled
                  ? "bg-gray-900 text-white hover:bg-gray-700"
                  : "border border-white/25 text-white/80 hover:border-white/50 hover:text-white hover:bg-white/5"
              )}
            >
              Pitch PraFounds
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={cn(
              "md:hidden p-2 transition-colors duration-300",
              scrolled ? "text-gray-900" : "text-white"
            )}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col"
            style={{ backgroundColor: DARK_BG }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            {/* Ambient glow */}
            <div
              className="absolute bottom-0 left-0 w-96 h-96 pointer-events-none"
              style={{
                background: `radial-gradient(circle, ${AMBER}12 0%, transparent 70%)`,
                transform: "translate(-30%, 30%)",
              }}
            />

            <div className="flex-1 flex flex-col justify-center px-8 gap-2 relative z-10">
              {navLinks.map((item, i) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left py-4 text-[42px] font-bold font-display text-white/70 hover:text-white transition-colors border-b border-white/5"
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.07, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  {item.label}
                </motion.button>
              ))}

              <motion.button
                onClick={() => scrollToSection("pitch")}
                className="text-left py-4 text-[42px] font-bold font-display transition-colors"
                style={{ color: AMBER }}
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + navLinks.length * 0.07, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                Pitch Us
              </motion.button>
            </div>

            <div className="px-8 pb-12 relative z-10">
              <p className="text-white/25 text-xs tracking-[0.2em] uppercase">
                hello@prafounds.com
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
