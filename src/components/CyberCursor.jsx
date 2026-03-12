import { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CyberCursor() {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [pos, setPos] = useState({ x: -200, y: -200 });

  const springX = useSpring(-200, { stiffness: 600, damping: 35 });
  const springY = useSpring(-200, { stiffness: 600, damping: 35 });
  const ringX   = useSpring(-200, { stiffness: 120, damping: 20 });
  const ringY   = useSpring(-200, { stiffness: 120, damping: 20 });

  useEffect(() => {
    const onMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      springX.set(e.clientX); springY.set(e.clientY);
      ringX.set(e.clientX);   ringY.set(e.clientY);
    };
    const onOver = (e) => {
      const t = e.target;
      setHovered(["A","BUTTON","INPUT","TEXTAREA"].includes(t.tagName) || t.closest("[data-cursor]"));
    };
    const onDown = () => setClicked(true);
    const onUp   = () => setClicked(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup",   onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup",   onUp);
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <motion.div
        style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: clicked ? 0.4 : 1 }}
        className="fixed top-0 left-0 z-[9999] pointer-events-none w-2 h-2 rounded-full"
        style2={{ background: "var(--cyber-cyan)", boxShadow: "0 0 10px var(--cyber-cyan), 0 0 20px var(--cyber-cyan)" }}
      >
        <div className="w-2 h-2 rounded-full" style={{ background: "#00f5ff", boxShadow: "0 0 10px #00f5ff, 0 0 20px #00f5ff" }} />
      </motion.div>

      {/* Ring */}
      <motion.div
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: hovered ? 1.8 : clicked ? 0.7 : 1, opacity: hovered ? 1 : 0.55 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="fixed top-0 left-0 z-[9998] pointer-events-none w-9 h-9 rounded-full"
        style2={{ border: `1.5px solid ${hovered ? "#ff0080" : "#00f5ff"}` }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            border: `1.5px solid ${hovered ? "#ff0080" : "#00f5ff"}`,
            background: hovered ? "rgba(255,0,128,0.05)" : "transparent",
          }}
        />
      </motion.div>
    </>
  );
}
