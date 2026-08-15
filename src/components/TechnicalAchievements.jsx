import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiLink, FiCode, FiArrowUpRight } from "react-icons/fi";
import { technicalAchievements } from "../data/portfolioData";

export default function TechnicalAchievements({ darkMode: dm }) {
  const [hovered, setHovered] = useState(null);
  const c = { text: dm ? "text-white" : "text-gray-800", muted: dm ? "text-white/50" : "text-gray-500" };

  return (
    <section id="tech-achievements" className="relative py-32 px-6 overflow-hidden">
      {/* Background glow elements */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#00f5ff] rounded-full mix-blend-multiply filter blur-[128px] opacity-10 pointer-events-none animate-blob" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-[#bf00ff] rounded-full mix-blend-multiply filter blur-[128px] opacity-10 pointer-events-none animate-blob animation-delay-2000" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="text-center mb-24 relative">

          <div className="section-tag mb-4 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-gray-500/30" style={{ background: dm ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)" }}>
            <FiCode size={14} className={dm ? "text-[#00f5ff]" : "text-[#0066ff]"} />
            <span className="font-mono text-xs uppercase tracking-widest text-current">Tech_Timeline</span>
          </div>

          <h2 className={`text-4xl md:text-6xl font-display font-bold ${c.text}`}>
            Technical{" "}
            <span style={{ background: dm ? "linear-gradient(135deg,#00f5ff,#bf00ff)" : "linear-gradient(135deg,#0066ff,#7700cc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Milestones
            </span>
          </h2>
          <div className={`mt-6 font-mono text-sm ${dm ? "text-white/30" : "text-gray-400"}`}>
            {"{"} "status": "continuous_growth", "focus": "problem_solving" {"}"}
          </div>
        </motion.div>

        {/* Timeline Walkthrough */}
        <div className="relative">
          {/* Central Line */}
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-[2px] md:-translate-x-1/2 bg-gradient-to-b from-transparent via-gray-500/20 to-transparent z-0" />

          {/* Animated glowing progress line (Optional enhancement) */}
          <motion.div
            className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-[2px] md:-translate-x-1/2 z-0 origin-top"
            style={{ background: dm ? "linear-gradient(180deg, #00f5ff, #bf00ff)" : "linear-gradient(180deg, #0066ff, #7700cc)" }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: "circOut" }}
          />

          <div className="space-y-8 md:space-y-12">
            {technicalAchievements.map((ach, i) => {
              const isLeft = i % 2 !== 0; // Odd index renders on left side in desktop
              return (
                <motion.div
                  key={ach.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: i * 0.15 }}
                  onHoverStart={() => setHovered(ach.id)}
                  onHoverEnd={() => setHovered(null)}
                  className={`relative flex flex-col md:flex-row items-center w-full group ${isLeft ? 'md:flex-row-reverse' : ''}`}
                >

                  {/* Timeline Node */}
                  <div className="absolute left-[28px] md:left-1/2 -translate-x-1/2 flex items-center justify-center z-20">
                    <motion.div
                      className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-2xl md:text-3xl relative backdrop-blur-md"
                      style={{
                        background: dm ? "rgba(10,15,30,0.9)" : "rgba(255,255,255,0.9)",
                        border: `2px solid ${ach.color}`,
                        boxShadow: hovered === ach.id ? `0 0 30px ${ach.color}60, inset 0 0 15px ${ach.color}30` : `0 0 15px ${ach.color}30`,
                        zIndex: 2
                      }}
                      animate={{ scale: hovered === ach.id ? 1.15 : 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      {ach.icon}
                    </motion.div>

                    {/* Pulsing ring behind node */}
                    <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ background: ach.color, animationDuration: '3s' }} />
                  </div>

                  {/* Spacer for desktop grid */}
                  <div className="hidden md:block w-1/2" />

                  {/* Content Card */}
                  <div className={`w-full md:w-1/2 pl-[70px] md:pl-0 ${isLeft ? 'md:pr-16 text-left' : 'md:pl-16 text-left'}`}>
                    <motion.div
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="relative p-6 md:p-8 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300"
                      style={{
                        background: dm ? "rgba(12, 16, 28, 0.7)" : "rgba(255, 255, 255, 0.8)",
                        border: `1px solid ${hovered === ach.id ? ach.color : dm ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
                        backdropFilter: "blur(16px)",
                        boxShadow: hovered === ach.id ? `0 20px 40px -10px ${ach.color}25` : "none"
                      }}
                    >
                      {/* Cyber Corners */}
                      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 opacity-50 transition-opacity duration-300 group-hover:opacity-100" style={{ borderColor: ach.color }} />
                      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 opacity-50 transition-opacity duration-300 group-hover:opacity-100" style={{ borderColor: ach.color }} />
                      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 opacity-50 transition-opacity duration-300 group-hover:opacity-100" style={{ borderColor: ach.color }} />
                      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 opacity-50 transition-opacity duration-300 group-hover:opacity-100" style={{ borderColor: ach.color }} />

                      {/* Card Content */}
                      <div className="flex flex-col md:items-start">
                        <div className="flex items-center gap-3 mb-4">
                          <h3 className={`font-display font-bold text-xl md:text-2xl ${c.text}`}>
                            {ach.title}
                          </h3>
                          {ach.link && (
                            <a href={ach.link} target="_blank" rel="noopener noreferrer"
                              className="p-2 rounded-full transition-all duration-300 hover:scale-110"
                              style={{ background: `${ach.color}15`, color: ach.color }}>
                              <FiArrowUpRight size={18} />
                            </a>
                          )}
                        </div>

                        <p className={`font-body text-sm md:text-base leading-relaxed ${c.muted} text-left`}>
                          {ach.description}
                        </p>
                      </div>

                      {/* Internal ID Watermark */}
                      <div className="absolute bottom-4 right-6 font-mono text-[10px] uppercase tracking-[0.2em] opacity-30 select-none" style={{ color: ach.color }}>
                        {"//"} MK_{String(ach.id).padStart(2, '0')}
                      </div>

                      {/* Ambient Gradient on Hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                        style={{ background: `radial-gradient(circle at ${isLeft ? '100%' : '0%'} 50%, ${ach.color}, transparent 70%)` }} />
                    </motion.div>
                  </div>

                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
