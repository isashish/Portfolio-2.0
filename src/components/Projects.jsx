import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiExternalLink, FiTerminal, FiMonitor } from "react-icons/fi";
import { projects } from "../data/portfolioData";

import amazonVideo from "../assets/videos/amazonClone_Video.mp4";
import youtubeVideo from "../assets/videos/youtubeClone_Video.mp4";
import rockPaperScissorsVideo from "../assets/videos/rockPaperScissors_Video.mp4";

function CyberMockup({ project: p, dm }) {
  const chromeBg = dm ? "#0a1628" : "#1e293b";
  const panelBg  = dm ? "#020817" : "#f8fafc";

  return (
    <div className="rounded-xl overflow-hidden shadow-2xl"
      style={{ border: `1px solid ${p.color}33`, boxShadow: `0 0 40px ${p.color}15` }}>
      {/* Browser bar */}
      <div className="px-3 py-2 flex items-center gap-2" style={{ background: chromeBg }}>
        {["#ff5f57","#ffbd2e","#28c840"].map((c) => (
          <div key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />
        ))}
        <div className="flex-1 mx-3 rounded px-2 py-1 font-mono text-xs" style={{ background: dm ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.1)", color: dm ? "#ffffff44" : "#ffffff88" }}>
          localhost:3000/{p.mockupContent}
        </div>
        {/* Scan line */}
        <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#28c840" }} />
      </div>

      {/* Content */}
      <div className="p-4" style={{ background: panelBg, minHeight: 200 }}>
        {/* {p.mockupContent === "youtube" && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-16 h-5 rounded font-mono text-xs flex items-center justify-center font-bold" style={{ background: "#ff0000", color: "#fff", fontSize: "10px" }}>▶ YouTube</div>
              <div className="flex-1 h-5 rounded" style={{ background: dm ? "#ffffff10" : "#e2e8f0" }} />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded overflow-hidden">
                  <div className="aspect-video rounded-sm" style={{ background: dm ? `rgba(255,0,0,${0.1+i*0.05})` : `rgba(255,0,0,${0.05+i*0.03})` }} />
                  <div className="h-2 rounded mt-1" style={{ background: dm ? "#ffffff10" : "#e2e8f0" }} />
                  <div className="h-2 rounded mt-1 w-2/3" style={{ background: dm ? "#ffffff08" : "#f1f5f9" }} />
                </div>
              ))}
            </div>
          </div>
        )} */}
        {p.mockupContent === "youtube" && (
          <video
            src= {youtubeVideo}
            muted
            loop
            playsInline
            className="w-full h-full object-cover rounded"
            onMouseEnter={(e) => e.target.play()}
            onMouseLeave={(e) => {
              e.target.pause();
              e.target.currentTime = 0; // optional: reset video
            }}
          />
        )}
         {p.mockupContent === "amazon" && (
          <video
            src= {amazonVideo}
            muted
            loop
            playsInline
            className="w-full h-full object-cover rounded"
            onMouseEnter={(e) => e.target.play()}
            onMouseLeave={(e) => {
              e.target.pause();
              e.target.currentTime = 0; // optional: reset video
            }}
          />
        )}
         {p.mockupContent === "rps" && (
          <video
            src= {rockPaperScissorsVideo}
            muted
            loop
            playsInline
            className="w-full h-full object-cover rounded"
            onMouseEnter={(e) => e.target.play()}
            onMouseLeave={(e) => {
              e.target.pause();
              e.target.currentTime = 0; // optional: reset video
            }}    
          />
        )}
        {/* {p.mockupContent === "amazon" && (
          <div>
            <div className="flex items-center gap-2 mb-3 p-2 rounded" style={{ background: "#232f3e" }}>
              <span className="font-bold text-xs" style={{ color: "#ff9900" }}>amazon</span>
              <div className="flex-1 h-5 rounded" style={{ background: "rgba(255,255,255,0.2)" }} />
              <span className="text-xs text-white/60">🛒 Cart</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[["#e2e8f0","#fbbf24"],["#dbeafe","#f59e0b"],["#dcfce7","#fbbf24"],["#fce7f3","#f59e0b"]].map(([bg,star], i) => (
                <div key={i} className="rounded p-1">
                  <div className="aspect-square rounded-sm mb-1" style={{ background: dm ? "rgba(255,255,255,0.08)" : bg }} />
                  <div className="h-1.5 rounded" style={{ background: dm ? "#ffffff12" : "#e2e8f0" }} />
                  <div className="flex gap-0.5 mt-1">{[0,1,2,3,4].map(s=><div key={s} className="w-2 h-2 rounded-sm" style={{background:star}}/>)}</div>
                </div>
              ))}
            </div>
          </div>
        )} */}
        {/* {p.mockupContent === "rps" && (
          <div className="flex flex-col items-start gap-3 p-3">
            <div className="font-mono text-sm font-bold" style={{ color: dm ? "#00f5ff" : "#0066ff" }}>Game Result: Tie!</div>
            <div className="flex gap-4">
              <div className="text-center"><div className="text-2xl">✊</div><div className="font-mono text-xs" style={{ color: dm ? "#ffffff44" : "#64748b" }}>You</div></div>
              <div className="text-center self-center font-mono text-xs" style={{ color: dm ? "#00f5ff" : "#0066ff" }}>VS</div>
              <div className="text-center"><div className="text-2xl">✊</div><div className="font-mono text-xs" style={{ color: dm ? "#ffffff44" : "#64748b" }}>CPU</div></div>
            </div>
            <div className="font-mono text-xs" style={{ color: dm ? "#00ff8888" : "#16a34a" }}>Score: W:0 / L:0 / T:1</div>
            <div className="px-3 py-1.5 rounded font-mono text-xs" style={{ background: dm ? "rgba(0,245,255,0.1)" : "#dbeafe", color: dm ? "#00f5ff" : "#0066ff", border: `1px solid ${dm ? "#00f5ff33" : "#93c5fd"}` }}>
              Play Again
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}

export default function Projects({ darkMode: dm }) {
  const c = { text: dm ? "text-white" : "text-gray-800", muted: dm ? "text-white/40" : "text-gray-500" };

  return (
    <section id="projects" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: dm ? "linear-gradient(90deg,transparent,rgba(0,245,255,0.3),transparent)" : "linear-gradient(90deg,transparent,rgba(0,102,255,0.3),transparent)" }} />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-20">
          <div className="section-tag mb-3 flex items-center justify-center gap-2"><FiMonitor size={12} /> PROJ_MODULE_03</div>
          <h2 className={`text-4xl md:text-6xl font-display font-bold ${c.text}`}>
            My{" "}
            <span style={{ background: dm ? "linear-gradient(135deg,#00f5ff,#bf00ff)" : "linear-gradient(135deg,#0066ff,#7700cc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Projects
            </span>{" "}
            👨‍💻
          </h2>
          <div className={`mt-4 font-mono text-xs ${dm ? "text-white/20" : "text-gray-400"}`}>
            // Selected builds — crafted with precision and purpose
          </div>
        </motion.div>

        {/* Project rows */}
        <div className="flex flex-col gap-28">
          {projects.map((proj, i) => (
            <motion.div key={proj.id}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22,1,0.36,1] }}
              className={`grid md:grid-cols-2 gap-12 items-center ${i % 2 !== 0 ? "md:[&>*:first-child]:order-2" : ""}`}
            >
              {/* Mockup */}
              <motion.div whileHover={{ scale: 1.03, rotateY: i%2===0 ? -3 : 3 }}
                transition={{ type: "spring", stiffness: 200 }}
                style={{ perspective: 800 }}>
                <CyberMockup project={proj} dm={dm} />
              </motion.div>

              {/* Info */}
              <div className="relative">
                {/* Index */}
                <div className="font-mono text-xs mb-3" style={{ color: proj.color + "99" }}>
                  PROJ_{String(proj.id).padStart(3,"0")} // {proj.mockupContent.toUpperCase()}
                </div>

                <h3 className={`font-display text-2xl md:text-3xl font-bold mb-4 ${c.text}`}>
                  <span style={{ color: proj.color }}>{proj.highlight}</span>{" "}
                  <span>{proj.title.replace(proj.highlight, "").trim()}</span>
                </h3>

                <p className={`font-body text-sm leading-relaxed mb-6 ${c.muted}`}>{proj.desc}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {proj.tags.map((tag) => (
                    <motion.span key={tag} whileHover={{ scale: 1.1 }}
                      className="font-mono text-xs px-3 py-1 rounded"
                      style={{ background: `${proj.accent}15`, color: proj.accent, border: `1px solid ${proj.accent}30` }}>
                      {tag}
                    </motion.span>
                  ))}
                </div>

                {/* Neon line */}
                <div className="h-px mb-6" style={{ background: `linear-gradient(90deg, ${proj.color}60, transparent)` }} />

                <motion.a href={proj.link} target="_blank" rel="noreferrer"
                  whileHover={{ scale: 1.05, boxShadow: `0 0 20px ${proj.color}40` }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded font-body font-semibold text-sm transition-all"
                  style={{ background: dm ? `${proj.color}15` : `${proj.color}10`, color: proj.color, border: `1px solid ${proj.color}40` }}>
                  <FiExternalLink size={14} /> View Website
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
