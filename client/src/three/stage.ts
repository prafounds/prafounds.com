/**
 * Shared state between the DOM and the WebGL layer.
 *
 * Deliberately a plain mutable module object rather than React state: the
 * camera rig reads these every frame inside `useFrame`, and routing scroll
 * position through `useState` would re-render the React tree at 60fps and
 * destroy frame budget. The DOM writes, the renderer reads, nothing
 * re-renders. This is the standard r3f pattern for scroll-linked scenes.
 */

export interface Station {
  /** Camera position in world space. */
  readonly pos: readonly [number, number, number];
  /** Point the camera looks at. */
  readonly target: readonly [number, number, number];
  /** Seed crystal scale multiplier at this station. */
  readonly seed: number;
}

/**
 * One camera "station" per route. Navigation flies the camera between
 * these instead of cutting, so moving around the site reads as one
 * continuous space rather than separate pages.
 */
export const STATIONS: Record<string, Station> = {
  "/":           { pos: [0,    0,    7.0], target: [0, 0, 0], seed: 1.0 },
  "/thesis":     { pos: [-3.1, 0.9,  5.0], target: [-0.5, 0.1, 0], seed: 0.85 },
  "/process":    { pos: [3.0,  0.8,  5.2], target: [0.4, 0.1, 0], seed: 0.9 },
  "/dispatches": { pos: [-1.7, -1.5, 5.6], target: [-0.2, -0.3, 0], seed: 0.75 },
  "/team":       { pos: [1.9,  1.5,  5.9], target: [0.3, 0.3, 0], seed: 0.8 },
};

export const DEFAULT_STATION = STATIONS["/"];

export function stationFor(path: string): Station {
  return STATIONS[path] ?? DEFAULT_STATION;
}

/** Live values read by the renderer each frame. */
export const stage = {
  /** 0..1 scroll progress of the current document. */
  scroll: 0,
  /** Pointer position in normalised device coords (-1..1), for parallax. */
  pointerX: 0,
  pointerY: 0,
  /** Station the camera is currently flying toward. */
  station: DEFAULT_STATION,
  /** True while a route transition is in flight — the rig eases harder. */
  travelling: false,
  /** Set when the user prefers reduced motion; freezes all drift. */
  reduced: false,
  /**
   * True on the long-scroll home page. Only there does scroll drive a
   * camera dolly; sub-pages are short and a scroll-linked camera would
   * feel twitchy.
   */
  scrollDriven: true,
};

export type Stage = typeof stage;
