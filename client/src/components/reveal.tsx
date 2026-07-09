import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Section eyebrow: `01 ─── The thesis` in mono caps */
export function Eyebrow({ index, children }: { index: string; children: ReactNode }) {
  return (
    <div className="pf-mono flex items-center gap-3 text-[11px] uppercase tracking-[0.24em]">
      <span style={{ color: "var(--pf-acid)" }}>{index}</span>
      <span aria-hidden="true" className="h-px w-8" style={{ background: "var(--pf-line-2)" }} />
      <span style={{ color: "var(--pf-muted)" }}>{children}</span>
    </div>
  );
}
