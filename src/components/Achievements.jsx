import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiLink, FiAward } from "react-icons/fi";
import { achievements } from "../data/portfolioData";

export default function Achievements({ darkMode: dm }) {
  const [hovered, setHovered] = useState(null);
  const c = { text: dm ? "text-white" : "text-gray-800", muted: dm ? "text-white/40" : "text-gray-500" };

  return (
    <section id="achievements" className="relative py-32 px-6 overflow-hidden">
      {/* Section BG accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: dm ? "linear-gradient(90deg, transparent, rgba(0,245,255,0.3), transparent)" : "linear-gradient(90deg, transparent, rgba(0,102,255,0.3), transparent)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: dm ? "linear-gradient(90deg, transparent, rgba(191,0,255,0.3), transparent)" : "linear-gradient(90deg, transparent, rgba(119,0,204,0.3), transparent)" }} />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="text-center mb-20">
          <div className="section-tag mb-3 flex items-center justify-center gap-2">
            <FiAward size={12} /> ACH_MODULE_02
          </div>
          <h2 className={`text-4xl md:text-6xl font-display font-bold ${c.text}`}>
            My Top{" "}
            <span style={{ background: dm ? "linear-gradient(135deg,#00f5ff,#bf00ff)" : "linear-gradient(135deg,#0066ff,#7700cc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Achievements
            </span>{" "}
            🏆
          </h2>
          <div className={`mt-4 font-mono text-xs ${dm ? "text-white/20" : "text-gray-400"}`}>
            // Milestones recognized at city, state &amp; national level
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {achievements.map((ach, i) => (
            <motion.div
              key={ach.id}
              initial={{ opacity: 0, y: 60, rotateX: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              onHoverStart={() => setHovered(ach.id)}
              onHoverEnd={() => setHovered(null)}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative rounded-xl p-7 holo-card corner-bracket cursor-pointer overflow-hidden"
              style={{
                background: dm ? "rgba(4,15,36,0.85)" : "rgba(255,255,255,0.9)",
                border: `1px solid ${ach.color}33`,
                boxShadow: hovered === ach.id ? `0 0 30px ${ach.color}25, 0 0 60px ${ach.color}10` : "none",
                backdropFilter: "blur(12px)",
              }}
            >
              {/* Animated top bar */}
              <motion.div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, transparent, ${ach.color}, transparent)` }}
                initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15 }} />

              {/* Year badge */}
              <div className="absolute top-4 right-10 font-mono text-xs" style={{ color: ach.color + "80" }}>
                [{ach.year}]
              </div>

              {/* Link */}
              <a href={ach.link}  target="_blank"
  rel="noopener noreferrer" className="absolute top-4 right-4 transition-opacity opacity-30 hover:opacity-100"
                style={{ color: ach.color }}>
                <FiLink size={13} />
              </a>

              {/* Icon */}
              <motion.div
                animate={{ rotate: hovered === ach.id ? [0, -10, 10, 0] : 0 }}
                transition={{ duration: 0.5 }}
                className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-5"
                style={{ background: `${ach.color}15`, border: `1px solid ${ach.color}30` }}>
                {ach.icon}
              </motion.div>

              {/* ID label */}
              <div className="font-mono text-xs mb-2" style={{ color: ach.color + "99" }}>
                ACH_{String(ach.id).padStart(3,"0")}
              </div>

              <h3 className={`font-display font-bold text-base mb-3 ${c.text}`}>{ach.title}</h3>
              <p className={`font-body text-sm leading-relaxed ${c.muted}`}>{ach.description}</p>

              {/* Bottom shimmer on hover */}
              <motion.div className="absolute inset-0 rounded-xl pointer-events-none"
                animate={{ opacity: hovered === ach.id ? 1 : 0 }}
                style={{ background: `linear-gradient(135deg, ${ach.color}08, transparent, ${ach.color}05)` }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
