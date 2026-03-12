import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { FiPhone, FiSend, FiCheck, FiAlertCircle, FiMessageSquare } from "react-icons/fi";
import { FaTelegramPlane, FaLinkedinIn, FaInstagram, FaTwitter, FaFacebookF } from "react-icons/fa";
import { personal } from "../data/portfolioData";

const EMAILJS_SERVICE_ID  = "service_apemrdq";
const EMAILJS_TEMPLATE_ID = "template_ninctgn";
const EMAILJS_PUBLIC_KEY  = "bSIG9cMhUm_yZrdPT";

export default function Contact({ darkMode: dm }) {
  const formRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [focusedField, setFocusedField] = useState(null);

  const c = { text: dm ? "text-white" : "text-gray-800", muted: dm ? "text-white/40" : "text-gray-500" };
  const inputBase = `w-full px-4 py-3 rounded font-mono text-sm outline-none transition-all duration-300 ${
    dm ? "bg-cyber-panel text-white placeholder-white/20" : "bg-gray-50 text-gray-800 placeholder-gray-400"
  }`;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, EMAILJS_PUBLIC_KEY);
      setStatus("sent"); setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch { setStatus("error"); setTimeout(() => setStatus("idle"), 4000); }
  };

  const contacts = [
    { Icon: FiPhone,       label: personal.phone, href: `tel:${personal.phone}`, color: dm?"#00f5ff":"#0066ff" },
    { Icon: FaTelegramPlane, label: personal.email, href: `mailto:${personal.email}`, color: dm?"#00ff88":"#00aa55" },
    { Icon: FaLinkedinIn,  label: personal.linkedin, href: `https://linkedin.com/in/${personal.linkedin}`, color: dm?"#bf00ff":"#7700cc" },
  ];
  const socials = [
    { Icon: FaInstagram, href: "#", label: "Instagram", color: dm?"#ff0080":"#cc0066" },
    { Icon: FaTwitter,   href: "#", label: "Twitter",   color: dm?"#00f5ff":"#0066ff" },
    { Icon: FaFacebookF, href: "#", label: "Facebook",  color: dm?"#bf00ff":"#7700cc" },
  ];

  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px" style={{background:dm?"linear-gradient(90deg,transparent,rgba(255,0,128,0.3),transparent)":"linear-gradient(90deg,transparent,rgba(204,0,102,0.3),transparent)"}}/>
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{background:dm?"linear-gradient(90deg,transparent,rgba(0,245,255,0.2),transparent)":"linear-gradient(90deg,transparent,rgba(0,102,255,0.2),transparent)"}}/>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7}} className="text-center mb-20">
          <div className="section-tag mb-3 flex items-center justify-center gap-2"><FiMessageSquare size={12}/> COMM_MODULE_05</div>
          <h2 className={`text-4xl md:text-6xl font-display font-bold ${c.text}`}>
            Let's{" "}
            <span style={{background:dm?"linear-gradient(135deg,#ff0080,#bf00ff)":"linear-gradient(135deg,#cc0066,#7700cc)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
              Connect
            </span>{" "}
            🧑
          </h2>
          <div className={`mt-4 font-mono text-xs ${dm?"text-white/20":"text-gray-400"}`}>
            // Open to opportunities, collaborations &amp; projects
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Contact info */}
          <motion.div initial={{opacity:0,x:-50}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.7}}>
            {/* Terminal prompt */}
            <div className={`rounded-xl p-6 border mb-8 font-mono text-xs ${dm?"border-cyber-border bg-cyber-panel/60":"border-blue-200 bg-gray-50"}`}>
              <div className={dm?"text-white/30":"text-gray-400"}>$ contact --info</div>
              <div className="mt-3 space-y-2">
                {contacts.map(({ Icon, label, href, color }) => (
                  <motion.a key={label} href={href} whileHover={{ x: 8 }}
                    className="flex items-center gap-3 group"
                    style={{ color: dm ? "#ffffff60" : "#64748b" }}>
                    <Icon size={13} style={{ color }} />
                    <span className="group-hover:text-current transition-colors" style={{ color }}>{label}</span>
                  </motion.a>
                ))}
              </div>
              <div className={`mt-4 pt-4 border-t ${dm?"border-white/5":"border-gray-200"}`}>
                <div className={dm?"text-white/30":"text-gray-400"}>$ social --links</div>
                <div className="flex gap-3 mt-3">
                  {socials.map(({ Icon, href, label, color }) => (
                    <motion.a key={label} href={href} target="_blank" rel="noreferrer"
                      whileHover={{ scale: 1.15, y: -3 }}
                      className="w-9 h-9 rounded flex items-center justify-center border transition-all"
                      style={{ borderColor: color+"44", background: color+"10", color }}>
                      <Icon size={14}/>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            {/* Map-like location card */}
            <div className={`rounded-xl p-5 border ${dm?"border-cyber-border bg-cyber-panel/40":"border-blue-100 bg-white"}`}>
              <div className={`font-mono text-xs mb-2 ${c.muted}`}>LOCATION</div>
              <div className={`font-display text-lg font-bold ${c.text}`}>{personal.location}</div>
              <div className="mt-2 h-px" style={{background:dm?"linear-gradient(90deg,#00f5ff33,transparent)":"linear-gradient(90deg,#0066ff33,transparent)"}}/>
              <div className={`mt-2 font-mono text-xs ${c.muted}`}>UTC+5:30 · India Standard Time</div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{opacity:0,x:50}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.7}}>
            <AnimatePresence mode="wait">
              {status === "sent" ? (
                <motion.div key="done" initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} exit={{opacity:0}}
                  className={`rounded-xl p-12 flex flex-col items-center text-center border ${dm?"border-green-500/20 bg-green-900/10":"border-green-200 bg-green-50"}`}>
                  <motion.div animate={{scale:[1,1.2,1]}} transition={{duration:0.5}}
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                    style={{background:dm?"rgba(0,255,136,0.15)":"rgba(0,170,85,0.1)",border:"1px solid rgba(0,255,136,0.3)"}}>
                    <FiCheck size={28} style={{color:dm?"#00ff88":"#00aa55"}}/>
                  </motion.div>
                  <div className={`font-display text-xl font-bold mb-2 ${c.text}`}>MESSAGE TRANSMITTED SUCCESSFULLY 🚀</div>
                  <div className={`font-mono text-xs ${c.muted}`}>Thanks for reaching out! I'll get back to you within 24 hours.</div>
                </motion.div>
              ) : (
                <motion.form key="form" ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                  {[
                    { name:"name", label:"FULL_NAME", placeholder:"Your Full name", type:"text" },
                    { name:"email", label:"EMAIL_ADDR", placeholder:"Your Email", type:"email" },
                  ].map(({ name, label, placeholder, type }) => (
                    <div key={name}>
                      <div className={`font-mono text-xs mb-1.5 ${focusedField===name ? (dm?"text-cyber-cyan":"text-blue-500") : c.muted}`}>
                        &gt; {label}
                      </div>
                      <motion.input type={type} name={name} value={form[name]} onChange={handleChange}
                        placeholder={placeholder} onFocus={()=>setFocusedField(name)} onBlur={()=>setFocusedField(null)}
                        animate={{ borderColor: focusedField===name ? (dm?"#00f5ff":"#0066ff") : (dm?"#0a2040":"#e2e8f0") }}
                        className={`${inputBase} border`}
                        style={{ borderColor: dm?"#0a2040":"#e2e8f0" }}
                      />
                    </div>
                  ))}
                  <div>
                    <div className={`font-mono text-xs mb-1.5 ${focusedField==="message" ? (dm?"text-cyber-cyan":"text-blue-500") : c.muted}`}>
                      &gt; MESSAGE
                    </div>
                    <motion.textarea name="message" value={form.message} onChange={handleChange}
                      placeholder="share your thoughts..." rows={4}
                      onFocus={()=>setFocusedField("message")} onBlur={()=>setFocusedField(null)}
                      animate={{ borderColor: focusedField==="message" ? (dm?"#00f5ff":"#0066ff") : (dm?"#0a2040":"#e2e8f0") }}
                      className={`${inputBase} border resize-none`}
                      style={{ borderColor: dm?"#0a2040":"#e2e8f0" }}
                    />
                  </div>

                  {status==="error" && (
                    <div className="flex items-center gap-2 text-red-400 font-mono text-xs">
                      <FiAlertCircle size={12}/> TRANSMISSION_ERROR: Please retry.
                    </div>
                  )}

                  <motion.button type="submit" disabled={status==="sending"}
                    whileHover={{ scale: 1.03, boxShadow: dm?"0 0 30px rgba(255,0,128,0.4)":"0 0 25px rgba(204,0,102,0.3)" }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 px-8 py-3.5 rounded font-body font-semibold text-sm text-white disabled:opacity-60 transition-all"
                    style={{ background: dm?"linear-gradient(135deg,#ff0080,#bf00ff)":"linear-gradient(135deg,#cc0066,#7700cc)" }}>
                    {status==="sending" ? (
                      <><motion.span animate={{rotate:360}} transition={{duration:1,repeat:Infinity,ease:"linear"}}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full inline-block"/>
                        TRANSMITTING...</>
                    ) : (
                      <><FiSend size={14}/> Send Message</>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
