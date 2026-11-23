import React from "react";
import { Html, useProgress } from "@react-three/drei";

export default function CanvasLoader() {
  const { progress } = useProgress();

  return (
    <Html
      as="div"
      center
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        pointerEvents: "none",
      }}
    >
      <div className="relative w-16 h-16 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20 animate-ping" />
        <div className="w-12 h-12 rounded-full border-2 border-t-cyan-400 border-r-pink-500 border-b-transparent border-l-transparent animate-spin" />
      </div>
      <p
        style={{
          fontSize: 13,
          color: "#00f5ff",
          fontWeight: 700,
          marginTop: 18,
          fontFamily: "monospace",
          letterSpacing: "0.1em",
          textShadow: "0 0 10px rgba(0, 245, 255, 0.5)",
        }}
      >
        {progress ? `${progress.toFixed(1)}%` : "LOADING 3D..."}
      </p>
    </Html>
  );
}
