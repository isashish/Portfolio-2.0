import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSpring, animated } from "@react-spring/web";
//import { useSpring, animated } from "framer-motion";
import Navbar       from "./components/Navbar";
import Hero         from "./components/Hero";
import Achievements from "./components/Achievements";
import Projects     from "./components/Projects";
import Skills       from "./components/Skills";
import Contact      from "./components/Contact";
import Footer       from "./components/Footer";
import MatrixRain   from "./components/MatrixRain";
// CyberCursor is available at ./components/CyberCursor (optional replacement for built-in Cursor)

// ── Custom cursor (simplified, avoids spring import issues) ──────────────────
function Cursor({ darkMode }) {
  const [pos, setPos]     = useState({ x: -200, y: -200 });
  const [ring, setRing]   = useState({ x: -200, y: -200 });
  const [hov, setHov]     = useState(false);

  useEffect(() => {
    let rx = -200, ry = -200;
    const onMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      // Lerp ring
      const lerp = (a, b, t) => a + (b - a) * t;
      const anim = () => {
        rx = lerp(rx, e.clientX, 0.12);
        ry = lerp(ry, e.clientY, 0.12);
        setRing({ x: rx, y: ry });
      };
      requestAnimationFrame(anim);
    };
    const onOver = (e) => {
      const t = e.target;
      setHov(["A","BUTTON","INPUT","TEXTAREA"].includes(t.tagName));
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseover", onOver); };
  }, []);

  const cc = darkMode ? "#00f5ff" : "#0066ff";
  const cp = darkMode ? "#ff0080" : "#cc0066";

  return (
    <>
      <div className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{ transform: `translate(${pos.x - 4}px, ${pos.y - 4}px)`, width: 8, height: 8, borderRadius: "50%", background: cc, boxShadow: `0 0 8px ${cc}, 0 0 16px ${cc}` }} />
      <div className="fixed top-0 left-0 z-[9998] pointer-events-none transition-all duration-200"
        style={{ transform: `translate(${ring.x - 18}px, ${ring.y - 18}px)`, width: hov ? 50 : 36, height: hov ? 50 : 36, borderRadius: "50%", border: `1.5px solid ${hov ? cp : cc}`, opacity: hov ? 0.9 : 0.5, background: hov ? `${cp}08` : "transparent" }} />
    </>
  );
}

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [booted,   setBooted]   = useState(false);

  useEffect(() => { document.documentElement.classList.toggle("dark", darkMode); }, [darkMode]);

  return (
    <div className={`min-h-screen relative font-body ${darkMode ? "circuit-bg" : "light-mode circuit-bg"} scanlines`}>
      {/* Cursor */}
      <Cursor darkMode={darkMode} />

      {/* Matrix rain bg */}
      <MatrixRain darkMode={darkMode} />

      {/* Ambient glow blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div animate={{ x: [0,60,0], y: [0,40,0] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[700px] h-[700px] rounded-full -top-40 -left-20"
          style={{ background: darkMode ? "radial-gradient(circle,rgba(0,245,255,0.04),transparent 70%)" : "radial-gradient(circle,rgba(0,102,255,0.05),transparent 70%)" }} />
        <motion.div animate={{ x: [0,-50,0], y: [0,-60,0] }} transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[500px] h-[500px] rounded-full -bottom-20 -right-10"
          style={{ background: darkMode ? "radial-gradient(circle,rgba(191,0,255,0.04),transparent 70%)" : "radial-gradient(circle,rgba(119,0,204,0.04),transparent 70%)" }} />
        <motion.div animate={{ x: [0,30,-20,0], y: [0,-40,20,0] }} transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[400px] h-[400px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ background: darkMode ? "radial-gradient(circle,rgba(0,255,136,0.025),transparent 70%)" : "radial-gradient(circle,rgba(0,170,85,0.03),transparent 70%)" }} />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navbar darkMode={darkMode} toggleDark={() => setDarkMode(d => !d)} />
        <AnimatePresence mode="wait">
          <motion.div key={darkMode?"d":"l"} initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.4}}>
            <Hero        darkMode={darkMode} booted={booted} onBoot={() => setBooted(true)} />
            <Achievements darkMode={darkMode} />
            <Projects    darkMode={darkMode} />
            <Skills      darkMode={darkMode} />
            <Contact     darkMode={darkMode} />
          </motion.div>
        </AnimatePresence>
        <Footer darkMode={darkMode} />
      </div>
    </div>
  );
}
