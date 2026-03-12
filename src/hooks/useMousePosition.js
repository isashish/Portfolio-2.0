import { useState, useEffect } from "react";
export default function useMousePosition() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  useEffect(() => {
    const h = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);
  return pos;
}
