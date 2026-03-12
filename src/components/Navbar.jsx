import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSun, FiMoon, FiMenu, FiX, FiTerminal } from "react-icons/fi";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { SiLeetcode, SiGooglecloud } from "react-icons/si";

const NAV = ["About", "Achievements", "Projects", "Skills", "Contact"];

export default function Navbar({ darkMode, toggleDark }) {
  const [active, setActive] = useState("About");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("en", { hour12: false }));
    tick(); const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      for (let i = NAV.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV[i].toLowerCase());
        if (el && window.scrollY >= el.offsetTop - 130) { setActive(NAV[i]); break; }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setActive(id); setMobileOpen(false);
  };

  const dm = darkMode;
  const borderC = dm ? "border-cyber-border" : "border-blue-200";
  const bg = scrolled
    ? dm ? "bg-cyber-bg/90 backdrop-blur-2xl" : "bg-white/90 backdrop-blur-2xl shadow-lg shadow-blue-100"
    : "bg-transparent";

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${borderC} ${bg}`}
    >
      {/* Top scan line */}
      {dm && (
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, #00f5ff, transparent)" }} />
      )}

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <motion.button whileHover={{ scale: 1.05 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-3 group"
        >
          <div className="relative w-9 h-9 flex items-center justify-center">
            <div className="absolute inset-0 rounded border"
              style={{ borderColor: dm ? "#00f5ff44" : "#0066ff44",
                       background: dm ? "rgba(0,245,255,0.05)" : "rgba(0,102,255,0.05)" }} />
            <FiTerminal size={16} style={{ color: dm ? "#00f5ff" : "#0066ff" }} />
          </div>
          <div className="hidden sm:block">
            <div className="font-display text-sm font-bold leading-none"
              style={{ color: dm ? "#00f5ff" : "#0066ff" }}>
              ASHISH
            </div>
            <div className={`font-mono text-xs leading-none mt-0.5 ${dm ? "text-white/30" : "text-gray-400"}`}>
              v2.0.25
            </div>
          </div>
        </motion.button>

        {/* Live clock */}
        <div className={`hidden lg:flex items-center gap-2 font-mono text-xs ${dm ? "text-white/20" : "text-gray-400"}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          {time}
        </div>

        {/* Nav links */}
        <div className={`hidden md:flex items-center gap-1 px-4 py-1.5 rounded-lg border ${
          dm ? "border-cyber-border bg-cyber-panel/60" : "border-blue-200 bg-white/60"
        }`}>
          {NAV.map((link) => (
            <button key={link} onClick={() => scrollTo(link)}
              className={`relative px-4 py-1.5 rounded font-mono text-xs tracking-wider uppercase transition-all duration-200 ${
                active === link
                  ? dm ? "text-cyber-bg" : "text-white"
                  : dm ? "text-white/40 hover:text-white/80" : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {active === link && (
                <motion.div layoutId="nav-bg"
                  className="absolute inset-0 rounded"
                  style={{ background: dm ? "linear-gradient(135deg,#00f5ff,#0066ff)" : "linear-gradient(135deg,#0066ff,#7700cc)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
              <span className="relative z-10">{link}</span>
            </button>
          ))}
        </div>

        {/* Right icons */}
        <div className="flex items-center gap-1.5">
          {[
            { href: "https://leetcode.com/u/Ashish_Suryavanshi/", Icon: SiLeetcode },
            { href: "https://github.com/isashish", Icon: FaGithub },
            { href: "https://www.linkedin.com/in/ashish-suryavanshi/", Icon: FaLinkedinIn },
            { href: "https://www.cloudskillsboost.google/public_profiles/ca679c58-f888-48e5-86c1-e1d1ec8ed5c0?qlcampaign=EDUCR-GCAF24Facilitators-IN%3A%3A87og7JLHG_Q8U_mFSfS2Gw+", Icon: SiGooglecloud },
          ].map(({ href, Icon }, i) => (
            <motion.a key={i} href={href} target="_blank" rel="noreferrer"
              whileHover={{ scale: 1.15, y: -2 }} whileTap={{ scale: 0.9 }}
              className={`w-8 h-8 hidden md:flex items-center justify-center rounded border transition-all ${
                dm ? "border-cyber-border text-white/40 hover:text-cyber-cyan hover:border-cyber-cyan/40 hover:bg-cyber-cyan/5"
                   : "border-blue-200 text-gray-500 hover:text-blue-600 hover:border-blue-400"
              }`}
            >
              <Icon size={13} />
            </motion.a>
          ))}

          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            onClick={toggleDark}
            className={`w-8 h-8 flex items-center justify-center rounded border transition-all ${
              dm ? "border-cyber-border text-yellow-400 hover:border-yellow-400/40 hover:bg-yellow-400/5"
                 : "border-blue-200 text-blue-600 hover:border-blue-400"
            }`}
          >
            {dm ? <FiSun size={14} /> : <FiMoon size={14} />}
          </motion.button>

          <button className={`md:hidden w-8 h-8 flex items-center justify-center ${dm ? "text-white/70" : "text-gray-600"}`}
            onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden border-t ${dm ? "bg-cyber-panel border-cyber-border" : "bg-white border-blue-200"}`}
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {NAV.map((link) => (
                <button key={link} onClick={() => scrollTo(link)}
                  className={`text-left px-4 py-2.5 rounded font-mono text-xs tracking-wider uppercase transition-colors ${
                    active === link
                      ? dm ? "bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/20" : "bg-blue-50 text-blue-600 border border-blue-200"
                      : dm ? "text-white/40 hover:text-white/80" : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  {active === link ? "▶ " : "  "}{link}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
