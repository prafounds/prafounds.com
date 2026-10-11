import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { stage } from "./stage";

const pos = new THREE.Vector3();
const target = new THREE.Vector3();

/**
 * Drives the camera from two inputs at once:
 *
 *  1. the active route's station (navigation), and
 *  2. scroll progress on the long home page (a forward dolly).
 *
 * Both are applied as critically-damped interpolation rather than fixed
 * duration tweens, so an interruption — navigating mid-flight, or
 * scrolling during a transition — blends smoothly instead of fighting.
 */
export default function CameraRig() {
  const { camera } = useThree();
  const current = useRef(new THREE.Vector3(0, 0, 7));
  const lookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 1 / 30);
    const st = stage.station;

    pos.set(st.pos[0], st.pos[1], st.pos[2]);
    target.set(st.target[0], st.target[1], st.target[2]);

    if (stage.scrollDriven) {
      const s = stage.scroll;
      // Dolly in and descend as the page scrolls. Ranges are tuned so the
      // seed never clips the near plane at s = 1.
      pos.z -= s * 4.2;
      pos.y -= s * 1.5;
      pos.x += Math.sin(s * Math.PI * 1.25) * 1.15;
      target.y -= s * 0.75;
    }

    if (!stage.reduced) {
      // Pointer parallax on the camera itself, subtle enough not to fight
      // the object-level parallax in Seed.
      pos.x += stage.pointerX * 0.28;
      pos.y += -stage.pointerY * 0.2;
    }

    // Travelling between routes eases harder for a sense of distance.
    const rate = stage.travelling ? 1.9 : 3.0;
    const k = 1 - Math.exp(-rate * delta); // frame-rate independent damping
    current.current.lerp(pos, k);
    lookAt.current.lerp(target, k);

    camera.position.copy(current.current);
    camera.lookAt(lookAt.current);
  });

  return null;
}
