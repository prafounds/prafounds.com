import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { stage } from "./stage";

const COUNT_DESKTOP = 1400;
const COUNT_MOBILE = 520;

/**
 * Drifting point constellation that gives the scene depth and makes the
 * camera dolly legible — without parallax reference points, moving the
 * camera through empty space reads as nothing happening.
 *
 * One BufferGeometry with a single draw call. Positions are generated once
 * and animated on the GPU-side attribute only when the user allows motion.
 */
export default function Particles({ mobile = false }: { mobile?: boolean }) {
  const points = useRef<THREE.Points>(null);
  const count = mobile ? COUNT_MOBILE : COUNT_DESKTOP;

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    // Deterministic PRNG so the layout is stable across reloads — a
    // constellation that reshuffles every refresh looks like a glitch.
    let seed = 20220601;
    const rnd = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };
    for (let i = 0; i < count; i++) {
      // Spherical shell with bias toward the edges, so the middle stays
      // readable behind the hero type.
      const r = 4.5 + Math.pow(rnd(), 0.6) * 9;
      const theta = rnd() * Math.PI * 2;
      const phi = Math.acos(2 * rnd() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.cos(phi) * 0.55;
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
      speeds[i] = 0.3 + rnd() * 0.8;
    }
    return { positions, speeds };
  }, [count]);

  useFrame((_, rawDelta) => {
    const p = points.current;
    if (!p || stage.reduced) return;
    const delta = Math.min(rawDelta, 1 / 30);

    p.rotation.y += delta * 0.012;
    // Scroll tilts the whole field, reinforcing the sense of descent.
    const tilt = stage.scrollDriven ? stage.scroll * 0.35 : 0;
    p.rotation.x += (tilt - p.rotation.x) * Math.min(1, delta * 1.6);

    const attr = p.geometry.getAttribute("position") as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    // Gentle vertical drift. Touching only Y keeps this cheap enough to run
    // every frame for 1400 points.
    for (let i = 0; i < count; i++) {
      const yi = i * 3 + 1;
      arr[yi] += speeds[i] * delta * 0.06;
      if (arr[yi] > 5.4) arr[yi] = -5.4;
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={points} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        sizeAttenuation
        color="#f4f4ef"
        transparent
        opacity={0.42}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
