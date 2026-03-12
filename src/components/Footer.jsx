import React from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FiTerminal } from "react-icons/fi";
import { personal } from "../data/portfolioData";

export default function Footer({ darkMode: dm }) {
  return (
    <footer className="relative border-t px-6 py-8"
      style={{ borderColor: dm?"#0a2040":"#e2e8f0", background: dm?"#020817":"#f8fafc" }}>
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{background:dm?"linear-gradient(90deg,transparent,#00f5ff44,transparent)":"linear-gradient(90deg,transparent,#0066ff44,transparent)"}}/>

      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <FiTerminal size={14} style={{ color: dm?"#00f5ff":"#0066ff" }}/>
          <span className={`font-mono text-xs ${dm?"text-white/30":"text-gray-400"}`}>
            2026 — Made with <span className="text-red-400">❤</span> by{" "}
            <span style={{ color: dm?"#00f5ff":"#0066ff" }}>{personal.name}</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          {[
            { href: "https://instagram.com/ashish_suryavanshi59", Icon: FaInstagram },
            { href: "https://github.com/isashish", Icon: FaGithub },
            { href: "https://www.linkedin.com/in/ashish-suryavanshi/", Icon: FaLinkedinIn },
            ].map(({ href, Icon }, i) => (
            <motion.a key={i} href={href} target="_blank" rel="noreferrer"
              whileHover={{ scale: 1.2, y: -3 }}
              className="w-8 h-8 rounded flex items-center justify-center border transition-all"
              style={{ borderColor: dm?"#0a2040":"#e2e8f0", color: dm?"rgba(255,255,255,0.3)":"#94a3b8" }}>
              <Icon size={12}/>
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
}
