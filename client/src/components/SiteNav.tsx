import { motion, useScroll } from "framer-motion";

const LINKS = [
  { href: "#thesis", label: "Thesis" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#process", label: "Process" },
  { href: "#dispatches", label: "Dispatches" },
  { href: "#team", label: "Team" },
];

export default function SiteNav() {
  const { scrollYProgress } = useScroll();

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md"
      style={{ borderColor: "var(--pf-line)", background: "rgba(10, 11, 14, 0.72)" }}
    >
      <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between px-5 sm:px-10">
        <a href="#top" className="flex items-center gap-2.5">
          <img src="/logo-mark-reverse.png" alt="PraFounds Ventures logo" className="h-9 w-auto" />
          <span className="pf-display text-[17px] font-semibold tracking-[-0.02em]" style={{ color: "var(--pf-text)" }}>
            PraFounds
          </span>
        </a>

        <nav className="pf-mono hidden items-center gap-8 text-[11.5px] uppercase tracking-[0.16em] md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="transition-colors hover:text-[#d7fe55]"
              style={{ color: "var(--pf-muted)" }}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#apply"
          className="pf-mono inline-flex items-center gap-2 rounded-sm px-4 py-2 text-[11.5px] font-medium uppercase tracking-[0.14em] transition-opacity hover:opacity-85"
          style={{ background: "var(--pf-acid)", color: "var(--pf-ink)" }}
        >
          Send a deck
          <span aria-hidden="true">↗</span>
        </a>
      </div>

      {/* scroll progress hairline */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-[-1px] h-px origin-left"
        style={{ scaleX: scrollYProgress, background: "var(--pf-acid)" }}
      />
    </header>
  );
}
