import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { FiDownload, FiArrowDown, FiCode, FiCpu, FiZap } from "react-icons/fi";
import ThreeGlobe from "./ThreeGlobe";
import { personal } from "../data/portfolioData";

const BOOT_LINES = [
  "> Initializing portfolio_v2.0.26...",
  "> Loading neural interface............. OK",
  "> Calibrating design matrix............ OK",
  "> Mounting React components............ OK",
  "> Connecting to Three.js engine........ OK",
  "> System ready. Welcome.",
];

function BootSequence({ onDone }) {
  const [lines, setLines] = useState([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      if (i < BOOT_LINES.length) { setLines((l) => [...l, BOOT_LINES[i]]); i++; }
      else { clearInterval(t); setTimeout(() => { setDone(true); setTimeout(onDone, 400); }, 500); }
    }, 260);
    return () => clearInterval(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div exit={{ opacity: 0, scale: 1.02 }} transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{ background: "#020817" }}
        >
          <div className="w-fit max-w-full overflow-hidden">
            <div className="font-mono text-[10px] sm:text-xs mb-6 whitespace-pre" style={{ color: "#00f5ff" }}>
              {"╔══════════════════════════════════════════╗\n"}
              {"║   ASHISH_OS v2.0.26 — PORTFOLIO BOOT     ║\n"}
              {"╚══════════════════════════════════════════╝"}
            </div>
            {lines.map((l, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                className="font-mono text-[10px] sm:text-xs mb-1 whitespace-nowrap" style={{ color: i === lines.length - 1 ? "#00ff88" : "#00f5ffaa" }}>
                {l}
              </motion.div>
            ))}
            {lines.length < BOOT_LINES.length && (
              <div className="font-mono text-[10px] sm:text-xs mt-1 terminal-cursor" style={{ color: "#00f5ff" }} />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function GlitchHeading({ text, dm }) {
  return (
    <div className="relative inline-block glitch-text" data-text={text}>
      <span style={{
        fontFamily: "'Orbitron', monospace",
        background: dm
          ? "linear-gradient(135deg, #00f5ff 0%, #ffffff 50%, #bf00ff 100%)"
          : "linear-gradient(135deg, #0066ff 0%, #1a1a3e 50%, #7700cc 100%)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
      }}>
        {text}
      </span>
    </div>
  );
}

export default function Hero({ darkMode: dm, booted, onBoot }) {
  const [roleIdx, setRoleIdx] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cardRotateX = useTransform(mouseY, [-300, 300], [8, -8]);
  const cardRotateY = useTransform(mouseX, [-300, 300], [-8, 8]);

  useEffect(() => {
    const t = setInterval(() => setRoleIdx((i) => (i + 1) % personal.roles.length), 2800);
    return () => clearInterval(t);
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const c = { text: dm ? "text-white" : "text-gray-900", muted: dm ? "text-white/40" : "text-gray-500" };

  const stats = [
    { icon: <FiCode size={14}/>, label: "Projects",   val: "6+" },
    { icon: <FiCpu size={14}/>,  label: "Technologies", val: "9+" },
    { icon: <FiZap size={14}/>,  label: "Achievements", val: "18+"  },
  ];

  return (
    <>
      {!booted && <BootSequence onDone={onBoot} />}

      <section id="about" className="relative min-h-screen flex items-center pt-24 px-6 overflow-hidden">
        {/* Radial glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{ background: dm ? "radial-gradient(circle, rgba(0,245,255,0.06) 0%, transparent 70%)" : "radial-gradient(circle, rgba(0,102,255,0.08) 0%, transparent 70%)" }} />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
            style={{ background: dm ? "radial-gradient(circle, rgba(191,0,255,0.06) 0%, transparent 70%)" : "radial-gradient(circle, rgba(119,0,204,0.05) 0%, transparent 70%)" }} />
        </div>

        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
          {/* ── LEFT ── */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: booted ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}>

            {/* Status badge */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 font-mono text-xs ${
                dm ? "border-cyber-border bg-cyber-panel/60 text-white/50" : "border-blue-200 bg-blue-50 text-blue-600"
              }`}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              SYSTEM_STATUS: ONLINE
              <span className="ml-2" style={{ color: dm ? "#00f5ff" : "#0066ff" }}>■ READY</span>
            </motion.div>

            {/* Name */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.22,1,0.36,1] }}
              className="mb-3">
              <div className={`font-mono text-sm mb-2 ${dm ? "text-white/30" : "text-gray-400"}`}>
                &lt;developer name=
              </div>
              <div className="text-5xl md:text-7xl font-black leading-none">
                <GlitchHeading text={personal.firstName} dm={dm} />
                <br />
                <GlitchHeading text={personal.lastName} dm={dm} />
              </div>
              <div className={`font-mono text-sm mt-2 ${dm ? "text-white/30" : "text-gray-400"}`}>
                /&gt;
              </div>
            </motion.div>

            {/* Animated role */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
              className="flex items-center gap-3 mb-6 h-10 overflow-hidden">
              <span className="font-mono text-sm" style={{ color: dm ? "#00f5ff44" : "#0066ff44" }}>
                [ROLE]:
              </span>
              <AnimatePresence mode="wait">
                <motion.span key={roleIdx}
                  initial={{ y: 30, opacity: 0, filter: "blur(4px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -30, opacity: 0, filter: "blur(4px)" }}
                  transition={{ duration: 0.5, ease: [0.22,1,0.36,1] }}
                  className="font-body font-semibold text-lg"
                  style={{ color: dm ? "#00f5ff" : "#0066ff" }}
                >
                  {personal.roles[roleIdx]}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            {/* Bio */}
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className={`font-body text-base leading-relaxed max-w-lg mb-10 ${c.muted}`}>
              {personal.bio}
            </motion.p>

            {/* CTAs */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }} className="flex flex-wrap gap-4 mb-10">
              <motion.a href={personal.resume}
                whileHover={{ scale: 1.04, boxShadow: dm ? "0 0 30px rgba(0,245,255,0.4)" : "0 0 25px rgba(0,102,255,0.3)" }}
                whileTap={{ scale: 0.97 }} target="_blank" rel="noreferrer"
                className="flex items-center gap-2 px-7 py-3.5 rounded font-body font-semibold text-sm text-cyber-bg transition-all"
                style={{ background: dm ? "linear-gradient(135deg,#00f5ff,#0066ff)" : "linear-gradient(135deg,#0066ff,#7700cc)" }}>
                <FiDownload size={15} /> Download CV
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className={`flex items-center gap-2 px-7 py-3.5 rounded font-body font-semibold text-sm border transition-all ${
                  dm ? "border-cyber-cyan/30 text-cyber-cyan hover:bg-cyber-cyan/5" : "border-blue-300 text-blue-600 hover:bg-blue-50"
                }`}>
                Initialize Contact
              </motion.button>
            </motion.div>

            {/* Stats row */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
              className={`flex gap-6 pt-6 border-t ${dm ? "border-cyber-border" : "border-blue-100"}`}>
              {stats.map(({ icon, label, val }) => (
                <div key={label} className="flex items-center gap-2">
                  <div className="p-1.5 rounded" style={{ background: dm ? "rgba(0,245,255,0.1)" : "rgba(0,102,255,0.08)", color: dm ? "#00f5ff" : "#0066ff" }}>
                    {icon}
                  </div>
                  <div>
                    <div className="font-display text-lg font-bold leading-none" style={{ color: dm ? "#00f5ff" : "#0066ff" }}>{val}</div>
                    <div className={`font-mono text-xs ${c.muted}`}>{label}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT — Globe ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: booted ? 1 : 0, scale: booted ? 1 : 0.7 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.22,1,0.36,1] }}
            onMouseMove={handleMouseMove}
            style={{ rotateX: cardRotateX, rotateY: cardRotateY, perspective: 1000 }}
            className="relative w-full h-[320px] sm:h-[380px] md:h-[450px] lg:h-[560px]"
          >
            {/* Glow halo */}
            <div className="absolute inset-0 rounded-full blur-3xl opacity-15 pointer-events-none"
              style={{ background: dm ? "radial-gradient(circle, #00f5ff 0%, #bf00ff 100%)" : "radial-gradient(circle, #0066ff 0%, #7700cc 100%)" }} />


            {/* Corner brackets */}
            <div
              className="absolute top-2 left-2 sm:top-4 sm:left-4 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-l-2 pointer-events-none"
              style={{ borderColor: dm ? "#00f5ff" : "#0066ff" }}
            />

            <div
              className="absolute top-2 right-2 sm:top-4 sm:right-4 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-r-2 pointer-events-none"
              style={{ borderColor: dm ? "#00f5ff" : "#0066ff" }}
            />

            <div
              className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-l-2 pointer-events-none"
              style={{ borderColor: dm ? "#00f5ff" : "#0066ff" }}
            />

            <div
              className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-r-2 pointer-events-none"
              style={{ borderColor: dm ? "#00f5ff" : "#0066ff" }}
            />


            {/* Data labels */}
            {[
              { top: "12%", right: "4%", label: "ORBIT_01", val: "1.3 AU" },
              { bottom: "20%", left: "4%", label: "SIGNAL",  val: "99.9%" },
              { top: "55%", right: "3%", label: "UPTIME",   val: "100%" },
            ].map(({ label, val, ...pos }) => (
              <div key={label} style={{ position: "absolute", ...pos }}
                className={`font-mono text-xs text-right pointer-events-none ${dm ? "text-cyber-cyan/40" : "text-blue-400/60"}`}>
                <div>{label}</div>
                <div className="font-bold" style={{ color: dm ? "#00f5ff" : "#0066ff" }}>{val}</div>
              </div>
            ))}

            <ThreeGlobe darkMode={dm} />
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 ${c.muted} opacity-40`}>
          <span className="font-mono text-xs tracking-widest">SCROLL_DOWN</span>
          <FiArrowDown size={14} />
        </motion.div>
      </section>
    </>
  );
}
