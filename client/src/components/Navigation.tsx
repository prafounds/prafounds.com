import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/Logo";

const NAV_LINKS = [
  { label: "Philosophy", id: "philosophy" },
  { label: "Focus",      id: "focus"      },
  { label: "Support",    id: "support"    },
  { label: "Pipeline",   id: "pipeline"   },
];

/* Dark section colours (hero / footer) */
const D = {
  logo:    "#EBF2FF",
  dot:     "#818CF8",
  link:    "rgba(235,242,255,0.45)",
  linkHov: "#EBF2FF",
  ctaBg:   "#EBF2FF",
  ctaTxt:  "#06101F",
  toggle:  "rgba(235,242,255,0.5)",
  navBg:   "rgba(6,16,31,0.85)",
  border:  "rgba(255,255,255,0.07)",
  drawerBg: "rgba(6,16,31,0.97)",
  mLink:   "rgba(235,242,255,0.5)",
  mCtaBg:  "#EBF2FF",
  mCtaTxt: "#06101F",
};

/* Light section colours (content) */
const L = {
  logo:    "#0D1627",
  dot:     "#6366F1",
  link:    "rgba(13,22,39,0.45)",
  linkHov: "#0D1627",
  ctaBg:   "#0D1627",
  ctaTxt:  "#FFFFFF",
  toggle:  "rgba(13,22,39,0.45)",
  navBg:   "rgba(242,246,251,0.92)",
  border:  "rgba(13,22,39,0.08)",
  drawerBg: "rgba(242,246,251,0.97)",
  mLink:   "rgba(13,22,39,0.5)",
  mCtaBg:  "#0D1627",
  mCtaTxt: "#FFFFFF",
};

export function Navigation() {
  const [scrolled,   setScrolled]   = useState(false);
  const [pastHero,   setPastHero]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 48);
      setPastHero(y > window.innerHeight * 0.75);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const C = pastHero ? L : D; // active colour set

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={scrolled ? {
          background: C.navBg,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: `1px solid ${C.border}`,
        } : undefined}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-16 flex items-center justify-between h-16 md:h-[72px]">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="PraFounds — go to top"
          >
            <Logo textColor={C.logo} dotColor={C.dot} />
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-[13px] font-medium tracking-wide transition-colors duration-300 hover:opacity-90"
                style={{ color: C.link }}
                onMouseEnter={e => (e.currentTarget.style.color = C.linkHov)}
                onMouseLeave={e => (e.currentTarget.style.color = C.link)}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <button
              onClick={() => scrollTo("pitch")}
              className="px-5 py-[9px] text-[13px] font-semibold rounded-full active:scale-95 transition-all duration-300"
              style={{ background: C.ctaBg, color: C.ctaTxt }}
            >
              Get in Touch
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 transition-colors"
            style={{ color: C.toggle }}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-16 left-0 right-0 z-40 px-6 py-8"
            style={{
              background: C.drawerBg,
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderBottom: `1px solid ${C.border}`,
            }}
          >
            <div className="flex flex-col gap-6">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-left text-lg font-medium transition-colors"
                  style={{ color: C.mLink }}
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-2">
                <button
                  onClick={() => scrollTo("pitch")}
                  className="w-full py-4 text-base font-semibold rounded-full transition-all duration-200"
                  style={{ background: C.mCtaBg, color: C.mCtaTxt }}
                >
                  Get in Touch
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
