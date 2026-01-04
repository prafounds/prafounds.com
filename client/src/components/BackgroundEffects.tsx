import { useEffect, useRef } from "react";

export function BackgroundEffects() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create subtle floating orbs with gray tones
    const createFloatingOrb = (index: number) => {
      const orb = document.createElement("div");
      const size = Math.random() * 400 + 300;
      const duration = Math.random() * 40 + 30;
      const delay = Math.random() * 5;

      // DARK gradients visible on WHITE background
      const gradients = [
        'radial-gradient(circle at 30% 30%, rgba(0, 0, 0, 0.08), transparent 70%)',
        'radial-gradient(circle at 70% 70%, rgba(30, 30, 30, 0.06), transparent 70%)',
        'radial-gradient(circle at 50% 50%, rgba(50, 50, 50, 0.07), transparent 70%)',
      ];
      const gradient = gradients[index % gradients.length];

      orb.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        background: ${gradient};
        filter: blur(50px);
        opacity: 1;
        animation: orbFloat ${duration}s ease-in-out ${delay}s infinite;
        pointer-events: none;
        will-change: transform, opacity;
      `;

      containerRef.current?.appendChild(orb);
    };

    // Create subtle particles
    const createParticle = () => {
      const particle = document.createElement("div");
      const size = Math.random() * 3 + 1;
      const duration = Math.random() * 30 + 20;
      const delay = Math.random() * 10;

      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        background: radial-gradient(circle, rgba(0, 0, 0, 0.4), transparent);
        border-radius: 50%;
        animation: particleFloat ${duration}s ease-in-out ${delay}s infinite;
        pointer-events: none;
      `;

      containerRef.current?.appendChild(particle);
    };

    // Create 3D geometric shapes with subtle colors
    const createGeometricShape = (type: 'cube' | 'sphere') => {
      const shape = document.createElement("div");
      const size = Math.random() * 150 + 100;
      const duration = Math.random() * 35 + 25;
      const delay = Math.random() * 5;

      shape.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        background: rgba(0, 0, 0, 0.04);
        border: 2px solid rgba(0, 0, 0, 0.15);
        backdrop-filter: blur(5px);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        animation: float3D ${duration}s ease-in-out ${delay}s infinite;
        transform-style: preserve-3d;
        pointer-events: none;
      `;

      if (type === 'sphere') {
        shape.style.borderRadius = '50%';
      } else {
        shape.style.borderRadius = '20%';
      }

      containerRef.current?.appendChild(shape);
    };

    // Create subtle wireframe grid
    const createWireframeGrid = () => {
      const grid = document.createElement("div");
      grid.style.cssText = `
        position: absolute;
        inset: 0;
        background-image:
          linear-gradient(rgba(0, 0, 0, 0.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 0, 0, 0.06) 1px, transparent 1px);
        background-size: 60px 60px;
        pointer-events: none;
        animation: gridPulse 10s ease-in-out infinite;
        transform-style: preserve-3d;
      `;
      containerRef.current?.appendChild(grid);
    };

    // Create visible background elements
    createWireframeGrid();

    // Floating orbs (MORE visible)
    for (let i = 0; i < 8; i++) {
      createFloatingOrb(i);
    }

    // Geometric shapes (MORE visible)
    for (let i = 0; i < 10; i++) {
      createGeometricShape(i % 2 === 0 ? 'sphere' : 'cube');
    }

    // Particles (MORE visible)
    for (let i = 0; i < 50; i++) {
      createParticle();
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{
        background: 'transparent',
        perspective: '1000px',
        zIndex: 1,
      }}
    />
  );
}
