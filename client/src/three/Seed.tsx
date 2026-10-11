import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { stage } from "./stage";

const ACID = new THREE.Color("#d7fe55");
const INK = new THREE.Color("#0d1014");

/**
 * The signature object: a faceted "seed" — a solid dark icosahedron with an
 * acid edge wireframe and a slowly counter-rotating outer shell.
 *
 * Reads scroll/station values straight off the `stage` module inside
 * `useFrame`; it never subscribes to React state, so scrolling costs no
 * renders. All motion is delta-timed so behaviour is identical on 60Hz
 * and 120Hz displays.
 */
export default function Seed() {
  const group = useRef<THREE.Group>(null);
  const shell = useRef<THREE.Group>(null);
  const scale = useRef(1);

  useFrame((_, rawDelta) => {
    // Clamp delta so a backgrounded tab returning doesn't jump the scene.
    const delta = Math.min(rawDelta, 1 / 30);
    const g = group.current;
    const s = shell.current;
    if (!g || !s) return;

    if (!stage.reduced) {
      // Continuous slow tumble, plus scroll adding spin so the object reads
      // as responding to the user rather than idling on a timer.
      const spin = stage.scrollDriven ? stage.scroll * Math.PI * 1.6 : 0;
      g.rotation.y += delta * 0.18;
      g.rotation.x = Math.sin(g.rotation.y * 0.5) * 0.16 + spin * 0.12;
      s.rotation.y -= delta * 0.26;
      s.rotation.z += delta * 0.07;

      // Pointer parallax: a small lean toward the cursor.
      g.position.x += (stage.pointerX * 0.22 - g.position.x) * Math.min(1, delta * 2.2);
      g.position.y += (-stage.pointerY * 0.16 - g.position.y) * Math.min(1, delta * 2.2);
    }

    // Scale toward the active station, damped rather than snapped.
    const want = stage.station.seed * (stage.scrollDriven ? 1 - stage.scroll * 0.35 : 1);
    scale.current += (want - scale.current) * Math.min(1, delta * 3);
    g.scale.setScalar(scale.current);

  });

  // Edge wireframe built directly from three rather than drei's <Edges>:
  // `Edges` was the only thing pulling @react-three/drei into the bundle,
  // and the whole library costs far more than these four lines.
  const edges = useMemo(() => new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1, 1), 18), []);

  return (
    <group ref={group}>
      {/* Solid faceted core */}
      <mesh castShadow={false} receiveShadow={false}>
        <icosahedronGeometry args={[1, 1]} />
        {/* Near-black and physically dark on purpose. An emissive core
            turned the object into a flat green mass that fought the hero
            headline; here the facets read only through specular highlights,
            so the type stays dominant and the crystal stays a backdrop. */}
        <meshStandardMaterial
          color={INK}
          emissive={ACID}
          emissiveIntensity={0.02}
          metalness={0.12}
          roughness={0.58}
          flatShading
        />
      </mesh>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color={ACID} transparent opacity={0.72} depthWrite={false} />
      </lineSegments>

      {/* Counter-rotating wireframe shell */}
      <group ref={shell}>
        <mesh>
          <icosahedronGeometry args={[1.62, 1]} />
          <meshBasicMaterial
            color={ACID}
            wireframe
            transparent
            opacity={0.10}
            depthWrite={false}
          />
        </mesh>
      </group>
    </group>
  );
}
