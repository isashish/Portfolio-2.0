import React, { Suspense, useEffect, useRef, useState, Component, ErrorInfo, ReactNode } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../layout/Loader";

// Compute deployment-safe asset URL (handles custom domains, Vercel, Netlify, GitHub Pages subpaths)
const getAssetPath = (path: string) => {
  const base = import.meta.env.BASE_URL || "/";
  const cleanBase = base.endsWith("/") ? base : `${base}/`;
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${cleanBase}${cleanPath}`;
};

const MODEL_PATH = getAssetPath("planet/scene.gltf");

// Procedural Fallback Earth: renders instantly with 0 external network requests
export const ProceduralEarth = () => {
  return (
    <group scale={2.4}>
      {/* Core sphere */}
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color="#061834"
          roughness={0.65}
          metalness={0.2}
          emissive="#020b18"
        />
      </mesh>

      {/* Cyber topographic grid */}
      <mesh>
        <sphereGeometry args={[1.008, 36, 36]} />
        <meshStandardMaterial
          color="#00f5ff"
          wireframe
          transparent
          opacity={0.22}
          emissive="#00f5ff"
          emissiveIntensity={0.25}
        />
      </mesh>

      {/* Outer atmospheric aura */}
      <mesh>
        <sphereGeometry args={[1.09, 32, 32]} />
        <meshBasicMaterial
          color="#00f5ff"
          transparent
          opacity={0.08}
          side={2}
        />
      </mesh>

      {/* Lighting */}
      <ambientLight intensity={0.9} />
      <directionalLight position={[5, 3, 5]} intensity={2.8} color="#00f5ff" />
      <directionalLight position={[-5, -3, -5]} intensity={1.4} color="#bf00ff" />
    </group>
  );
};

// GLTF Earth Model Component
export const Earth = () => {
  const earth = useGLTF(MODEL_PATH);

  return (
    <primitive
      object={earth.scene}
      scale={2.5}
      position-y={0}
      rotation-y={0}
    />
  );
};

// Error Boundary to prevent network errors from breaking the Canvas
interface ErrorBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ModelErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn("3D Earth asset network error, using procedural fallback:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

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
          <ModelErrorBoundary fallback={<ProceduralEarth />}>
            <Earth />
          </ModelErrorBoundary>
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
};

// Preload the planet model with error catch so uncaught rejections never crash the app
try {
  useGLTF.preload(MODEL_PATH);
} catch (e) {
  console.warn("Preload warning for 3D model:", e);
}

export default EarthCanvas;
