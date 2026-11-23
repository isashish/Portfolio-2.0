import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../layout/Loader";

export const Earth = () => {
  const earth = useGLTF("/planet/scene.gltf");

  return (
    <primitive
      object={earth.scene}
      scale={2.5}
      position-y={0}
      rotation-y={0}
    />
  );
};

// Pause rendering loop when canvas is off-screen to save GPU & battery
function VisibilityController() {
  const { gl, invalidate } = useThree();

  useEffect(() => {
    const container = gl.domElement.parentElement;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          invalidate();
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [gl, invalidate]);

  return null;
}

export interface EarthCanvasProps {
  className?: string;
  style?: React.CSSProperties;
}

export const EarthCanvas: React.FC<EarthCanvasProps> = ({
  className = "w-full h-[360px] sm:h-[420px] md:h-[480px]",
  style,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  // High efficiency: stops animation loop completely when scrolled out of view
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.02 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative mx-auto select-none ${className}`}
      style={style}
    >
      <Canvas
        shadows
        frameloop={isVisible ? "always" : "never"}
        dpr={[1, 1.5]}
        gl={{
          preserveDrawingBuffer: true,
          powerPreference: "low-power",
          antialias: true,
          alpha: true,
        }}
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [-4, 3, 6],
        }}
        style={{ width: "100%", height: "100%", cursor: "grab" }}
      >
        <VisibilityController />
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls
            autoRotate
            autoRotateSpeed={3}
            enablePan={false}
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
          <Earth />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
};

// Preload the planet model so there is no delay on mount
useGLTF.preload("/planet/scene.gltf");

export default EarthCanvas;
