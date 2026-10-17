import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { useApplyDialog } from "./ApplyDialog";

const LINKS = [
  { href: "/thesis", label: "Thesis" },
  { href: "/process", label: "Process" },
  { href: "/dispatches", label: "Dispatches" },
  { href: "/team", label: "Team" },
];

export default function SiteNav() {
  const { scrollYProgress } = useScroll();
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const { openApply } = useApplyDialog();

  // Close on navigate — otherwise the panel stays over the page you just
  // asked for.
  useEffect(() => setOpen(false), [location]);

  // Escape to dismiss, and lock body scroll while the overlay is up.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md"
      style={{ borderColor: "var(--pf-line)", background: "rgba(11, 11, 11, 0.62)" }}
    >
      <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between px-5 sm:px-10">
        <Link href="/" className="flex items-center" aria-label="PraFounds — home">
          {/* Name-only crop of the reverse wordmark — the stacked "VENTURES"
              sub-line is dropped. The reverse asset is a white-inked alpha
              mask, so it sits on the dark chrome without a plate. It already
              contains the company name — no text sibling. */}
          <img
            src="/logo-wordmark-reverse-nosub.png"
            alt="PraFounds"
            width={900}
            height={168}
            className="h-[23px] w-auto sm:h-[25px]"
          />
        </Link>

        <nav
          aria-label="Primary"
          className="pf-mono hidden items-center gap-8 text-[11.5px] uppercase tracking-[0.16em] md:flex"
        >
          {LINKS.map((l) => {
            const active = location === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className="relative transition-colors hover:text-[#f4f4f4]"
                style={{ color: active ? "var(--pf-acid)" : "var(--pf-muted)" }}
              >
                {l.label}
                {/* Shared-layout underline slides between items on navigate,
                    so the indicator travels rather than blinking out and in. */}
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    aria-hidden="true"
                    className="absolute -bottom-1.5 left-0 right-0 h-px"
                    style={{ background: "var(--pf-acid)" }}
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openApply}
            className="pf-mono inline-flex h-11 shrink-0 items-center gap-2 rounded-sm px-3.5 text-[11.5px] font-medium uppercase tracking-[0.14em] transition-opacity hover:opacity-85 sm:h-auto sm:px-4 sm:py-2"
            style={{ background: "var(--pf-acid)", color: "var(--pf-ink)" }}
          >
            Send a deck
            <span aria-hidden="true">↗</span>
          </button>

          {/* The primary links are hidden below md; without this the five
              section pages are unreachable on a phone. */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border md:hidden"
            style={{ borderColor: "var(--pf-line-2)", color: "var(--pf-text)" }}
          >
            {open ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-16 border-b md:hidden"
            // Fully opaque, not a veil: at 96% the bright hero type still
            // ghosted through between the links and read as a render bug.
            style={{ borderColor: "var(--pf-line)", background: "var(--pf-bg)" }}
          >
            <nav aria-label="Mobile" className="flex flex-col px-5 py-4">
              {LINKS.map((l) => {
                const active = location === l.href;
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    className="pf-display border-b py-4 text-[26px] font-semibold tracking-[-0.01em] last:border-b-0"
                    style={{
                      borderColor: "var(--pf-line)",
                      color: active ? "var(--pf-acid)" : "var(--pf-text)",
                    }}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* scroll progress hairline */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-[-1px] h-px origin-left"
        style={{ scaleX: scrollYProgress, background: "var(--pf-acid)" }}
      />
    </header>
  );
}
