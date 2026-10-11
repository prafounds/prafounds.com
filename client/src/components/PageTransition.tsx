import { motion } from "framer-motion";
import { useEffect, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Wraps page content so navigation reads as movement through space rather
 * than a cut. The DOM transition is deliberately timed to the camera flight
 * in `CameraRig` (~1.1s settle) — the page lands slightly before the camera
 * does, which keeps the content feeling responsive while the scene catches up.
 *
 * `transform-style: preserve-3d` plus a perspective on the parent gives the
 * real depth rotation; a flat opacity fade would read as a slideshow.
 */
export default function PageTransition({
  children,
  routeKey,
}: {
  children: ReactNode;
  routeKey: string;
}) {
  const reduced = useReducedMotion();

  // Each route starts at the top. Without this, navigating from a scrolled
  // position lands mid-page.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  }, [routeKey, reduced]);

  if (reduced) {
    // Honour the preference with a plain cross-fade — no depth, no travel.
    return (
      <motion.div
        key={routeKey}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div style={{ perspective: "1600px", perspectiveOrigin: "50% 40%" }}>
      <motion.div
        key={routeKey}
        style={{ transformStyle: "preserve-3d" }}
        initial={{ opacity: 0, y: 46, rotateX: 7, scale: 0.975 }}
        animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
        exit={{ opacity: 0, y: -28, rotateX: -5, scale: 0.985 }}
        transition={{ duration: 0.78, ease: EASE }}
      >
        {children}
      </motion.div>
    </div>
  );
}
