import { useEffect, useState } from "react";

/**
 * Tracks `prefers-reduced-motion`. Vestibular disorders are triggered by
 * exactly the kind of continuous parallax and camera motion this site uses,
 * so every animated system here is expected to consult this and fall back
 * to a static composition rather than simply animating more slowly.
 *
 * Listens for changes so a user toggling the OS setting does not have to
 * reload to be respected.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    if (!window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/**
 * Cheap one-shot WebGL capability probe. A machine without a working WebGL2
 * context (old hardware, blocklisted driver, hardware acceleration disabled)
 * must still get the full site — the 3D layer is decorative, so we detect
 * once and skip mounting the canvas entirely rather than letting R3F throw.
 */
let cachedWebGL: boolean | null = null;
export function hasWebGL(): boolean {
  if (cachedWebGL !== null) return cachedWebGL;
  if (typeof document === "undefined") return (cachedWebGL = false);
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    cachedWebGL = Boolean(gl);
    // Release the probe context immediately; browsers cap concurrent contexts.
    const lose = (gl as WebGLRenderingContext | null)?.getExtension("WEBGL_lose_context");
    lose?.loseContext();
  } catch {
    cachedWebGL = false;
  }
  return cachedWebGL;
}
