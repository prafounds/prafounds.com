import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useLocation } from "wouter";
import { useReducedMotion, hasWebGL } from "@/hooks/use-reduced-motion";
import { stage, stationFor } from "./stage";
import CameraRig from "./CameraRig";
import Seed from "./Seed";
import Particles from "./Particles";

/**
 * The persistent WebGL layer.
 *
 * Mounted once at the app root — above the router, never inside it — so the
 * GPU context and all geometry survive navigation. That is what lets the
 * camera *fly* between pages instead of the scene tearing down and
 * rebuilding on every route change.
 *
 * It is purely decorative: `aria-hidden`, not focusable, and
 * `pointer-events: none` so it never intercepts a click. If WebGL is
 * unavailable or the user prefers reduced motion, the site is unaffected.
 */
export default function SceneRoot() {
  const [location] = useLocation();
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const webgl = useMemo(() => hasWebGL(), []);
  const mobile = useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches,
    [],
  );
  const travelTimer = useRef<number>();

  /* Route → camera station. */
  useEffect(() => {
    stage.station = stationFor(location);
    // Only the home page is long enough for a scroll-linked dolly.
    stage.scrollDriven = location === "/";
    stage.scroll = 0;
    stage.travelling = true;
    window.clearTimeout(travelTimer.current);
    travelTimer.current = window.setTimeout(() => {
      stage.travelling = false;
    }, 1100);
    return () => window.clearTimeout(travelTimer.current);
  }, [location]);

  useEffect(() => {
    stage.reduced = reduced;
  }, [reduced]);

  /* Scroll + pointer → stage. Passive listeners, and we write to a plain
     object rather than React state so none of this triggers a render. */
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      stage.scroll = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    };
    const onPointer = (e: PointerEvent) => {
      stage.pointerX = (e.clientX / window.innerWidth) * 2 - 1;
      stage.pointerY = (e.clientY / window.innerHeight) * 2 - 1;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  /* Stop rendering entirely while the tab is hidden — a backgrounded WebGL
     loop is pure battery drain. */
  useEffect(() => {
    const onVis = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  if (!webgl) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{ contain: "strict" }}
    >
      <Canvas
        // Reduced motion still renders the scene, but only on demand — the
        // composition stays, the perpetual movement does not.
        frameloop={reduced ? "demand" : visible ? "always" : "never"}
        // Cap device pixel ratio: a 3x phone would otherwise shade 9x the
        // fragments for no perceptible gain.
        dpr={[1, mobile ? 1.5 : 1.75]}
        gl={{
          antialias: !mobile,
          alpha: true,
          powerPreference: "high-performance",
          // The page behind is already near-black; skipping the depth
          // buffer clear colour keeps the canvas composited cheaply.
          stencil: false,
        }}
        camera={{ position: [0, 0, 7], fov: 42, near: 0.1, far: 60 }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.28} />
          <directionalLight position={[5, 5, 4]} intensity={1.0} color="#ffffff" />
          <pointLight position={[-5, -2, 3]} intensity={3} distance={14} color="#d7fe55" />
          <pointLight position={[3, 3, -4]} intensity={5} distance={15} color="#7aa2ff" />

          <CameraRig />
          {/* Offset right: centred, the crystal sat behind the hero
              headline and cost legibility. Pulled in and pushed back on
              narrow viewports, where the full offset hangs it off-screen. */}
          <group
            position={mobile ? [1.0, -1.15, -2.2] : [2.25, -0.1, -0.8]}
            scale={mobile ? 0.82 : 1}
          >
            <Seed />
          </group>
          <Particles mobile={mobile} />

          <fog attach="fog" args={["#0a0b0e", 9, 26]} />
        </Suspense>
      </Canvas>
    </div>
  );
}
