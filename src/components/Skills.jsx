import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FiCpu, FiCode, FiLayers } from "react-icons/fi";
import * as THREE from "three";
import { skills, techStack } from "../data/portfolioData";

import python from "../assets/images/python.png";
import java from "../assets/images/java.png";
import html from "../assets/images/html.png";
import css from "../assets/images/css.png";
import js from "../assets/images/javascript.png";
import react from "../assets/images/react.png";
import spring from "../assets/images/spring.png";
import git from "../assets/images/github.png";

import "../styles/skills_slider.css"; // Custom styles for skill bars and slider


function NeuralNet({ dm }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const W = el.clientWidth||400, H = el.clientHeight||400;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, W/H, 0.1, 200);
    camera.position.set(0,0,5);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(W, H); renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
    el.appendChild(renderer.domElement);

    const C1 = dm ? 0x00f5ff : 0x0066ff;
    const C2 = dm ? 0xbf00ff : 0x7700cc;
    const group = new THREE.Group();
    const nodes = [];

    // Neural nodes in brain shape
    for (let i = 0; i < 250; i++) {
      const theta = Math.random()*Math.PI*2, phi = Math.acos(2*Math.random()-1);
      const r = 1.6 + (Math.random()-0.5)*0.9;
      const x = r*1.3*Math.sin(phi)*Math.cos(theta), y = r*0.9*Math.sin(phi)*Math.sin(theta), z = r*Math.cos(phi);
      const g = new THREE.SphereGeometry(0.03,8,8);
      const col = Math.random()>0.5 ? C1 : C2;
      const m = new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.5+Math.random()*0.5 });
      const mesh = new THREE.Mesh(g, m);
      mesh.position.set(x,y,z); group.add(mesh); nodes.push(mesh);
    }

    // Connections
    const lmat = new THREE.LineBasicMaterial({ color: dm ? 0x00f5ff : 0x0066ff, transparent: true, opacity: 0.12 });
    for (let i=0;i<nodes.length;i++) for (let j=i+1;j<nodes.length;j++) {
      if (nodes[i].position.distanceTo(nodes[j].position)<0.8 && Math.random()>0.65) {
        const lg = new THREE.BufferGeometry().setFromPoints([nodes[i].position,nodes[j].position]);
        group.add(new THREE.Line(lg, lmat));
      }
    }

    // Floating particles
    const pGeo = new THREE.BufferGeometry();
    const pPos = [];
    for (let i=0;i<80;i++) pPos.push((Math.random()-0.5)*6,(Math.random()-0.5)*6,(Math.random()-0.5)*6);
    pGeo.setAttribute("position", new THREE.Float32BufferAttribute(pPos,3));
    group.add(new THREE.Points(pGeo, new THREE.PointsMaterial({ color: C1, size: 0.04, transparent: true, opacity: 0.3 })));

    scene.add(group);
    scene.add(new THREE.AmbientLight(0xffffff,1));

    let raf;
    const anim = () => {
      raf = requestAnimationFrame(anim);
      group.rotation.y += 0.004; group.rotation.x = Math.sin(Date.now()*0.0005)*0.1;
      renderer.render(scene, camera);
    };
    anim();

    const resize = () => { const w=el.clientWidth,h=el.clientHeight; camera.aspect=w/h; camera.updateProjectionMatrix(); renderer.setSize(w,h); };
    window.addEventListener("resize",resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize",resize); renderer.dispose(); if(el.contains(renderer.domElement))el.removeChild(renderer.domElement); };
  }, [dm]);
  return <div ref={ref} className="w-full h-full" />;
}

export default function Skills({ darkMode: dm }) {
  const c = { text: dm ? "text-white" : "text-gray-800", muted: dm ? "text-white/40" : "text-gray-500" };
  const panelBg = dm ? "bg-cyber-panel/70 border-cyber-border" : "bg-white/90 border-blue-100";

  return (
    <section id="skills" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: dm?"linear-gradient(90deg,transparent,rgba(0,255,136,0.3),transparent)":"linear-gradient(90deg,transparent,rgba(0,170,85,0.3),transparent)" }} />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7}} className="text-center mb-20">
          <div className="section-tag mb-3 flex items-center justify-center gap-2"><FiCpu size={12}/> SKILL_MODULE_04</div>
          <h2 className={`text-4xl md:text-6xl font-display font-bold ${c.text}`}>
            My{" "}
            <span style={{background:dm?"linear-gradient(135deg,#00ff88,#00f5ff)":"linear-gradient(135deg,#00aa55,#0066ff)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
              Skills
            </span>{" "}
            🧠
          </h2>
          <div className={`mt-4 font-mono text-xs ${dm?"text-white/20":"text-gray-400"}`}>
            // Technologies mastered in my engineering journey
          </div>
        </motion.div>

        {/* Main 3-col layout */}
        <div className="grid lg:grid-cols-3 gap-8 items-start mb-20">
          {/* Designer panel */}
          <motion.div initial={{opacity:0,x:-50}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.7}}
            className={`rounded-xl p-7 border corner-bracket ${panelBg} backdrop-blur-sm`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded flex items-center justify-center"
                style={{background:dm?"rgba(191,0,255,0.15)":"rgba(119,0,204,0.1)",border:`1px solid ${dm?"#bf00ff44":"#7700cc44"}`}}>
                <FiLayers size={14} style={{color:dm?"#bf00ff":"#7700cc"}}/>
              </div>
              <div>
                <div className="font-display font-bold text-sm" style={{color:dm?"#bf00ff":"#7700cc"}}>DESIGNER</div>
                <div className={`font-mono text-xs ${c.muted}`}>UI/UX</div>
              </div>
            </div>
            <p className={`font-body text-sm leading-relaxed mb-5 ${c.muted}`}>
              Crafting visually engaging layouts with Canva &amp; Figma — clean aesthetics, balanced composition, user-centred presentation.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Canva","Figma","UI/UX","Responsive"].map(s=>(
                <span key={s} className="font-mono text-xs px-2 py-1 rounded"
                  style={{background:dm?"rgba(191,0,255,0.12)":"rgba(119,0,204,0.08)",color:dm?"#bf00ff":"#7700cc",border:`1px solid ${dm?"#bf00ff22":"#7700cc22"}`}}>
                  {s}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Neural Brain */}
          <motion.div initial={{opacity:0,scale:0.8}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{duration:1}}
            className="relative h-[400px]">
            <div className="absolute inset-0 rounded-full blur-3xl opacity-10 pointer-events-none"
              style={{background:dm?"radial-gradient(circle,#00f5ff,#bf00ff)":"radial-gradient(circle,#0066ff,#7700cc)"}}/>
            <NeuralNet dm={dm}/>
          </motion.div>

          {/* Coder panel */}
          <motion.div initial={{opacity:0,x:50}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.7}}
            className={`rounded-xl p-7 border corner-bracket ${panelBg} backdrop-blur-sm`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded flex items-center justify-center"
                style={{background:dm?"rgba(0,245,255,0.15)":"rgba(0,102,255,0.1)",border:`1px solid ${dm?"#00f5ff44":"#0066ff44"}`}}>
                <FiCode size={14} style={{color:dm?"#00f5ff":"#0066ff"}}/>
              </div>
              <div>
                <div className="font-display font-bold text-sm" style={{color:dm?"#00f5ff":"#0066ff"}}>CODER</div>
                <div className={`font-mono text-xs ${c.muted}`}>Full Stack</div>
              </div>
            </div>
            <p className={`font-body text-sm leading-relaxed mb-5 ${c.muted}`}>
              Skilled in HTML, CSS, JavaScript, React, SpringBoot Database experience with MySQL. Always learning the cutting edge.
            </p>
            <div className="flex flex-wrap gap-2">
              {["React","Spring Boot","Java","MySQL","JS"].map(s=>(
                <span key={s} className="font-mono text-xs px-2 py-1 rounded"
                  style={{background:dm?"rgba(0,245,255,0.12)":"rgba(0,102,255,0.08)",color:dm?"#00f5ff":"#0066ff",border:`1px solid ${dm?"#00f5ff22":"#0066ff22"}`}}>
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

      
        {/* Skills slider */}
        <div className="slider"
          style={{
            "--width": "100px",
            "--height": "100px",
            "--quantity": 8
          }}>

        <div className="list">

        <div className="item" style={{"--position":1}}><img src={python} /></div>
        <div className="item" style={{"--position":2}}><img src={java} /></div>
        <div className="item" style={{"--position":3}}><img src={html} /></div>
        <div className="item" style={{"--position":4}}><img src={css} /></div>
        <div className="item" style={{"--position":5}}><img src={js} /></div>
        <div className="item" style={{"--position":6}}><img src={react} /></div>
        <div className="item" style={{"--position":7}}><img src={spring} /></div>
        <div className="item" style={{"--position":8}}><img src={git} /></div>


        </div>
        </div>
      




        {/* Skill bars */}
        <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7}}
          className={`rounded-xl p-8 border ${panelBg} backdrop-blur-sm mb-16`}>
          <div className={`font-mono text-xs mb-6 ${dm?"text-white/30":"text-gray-400"}`}>
            &gt; skill_proficiency --verbose
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {skills.map((sk, i) => (
              <div key={sk.name}>
                <div className="flex justify-between mb-1.5">
                  <span className={`font-mono text-xs ${c.text}`}>{sk.icon}{sk.name}</span>
                  <span className="font-mono text-xs" style={{color:sk.color}}>{sk.level}%</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{background:dm?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.08)"}}>
                  <motion.div
                    initial={{width:0}} whileInView={{width:`${sk.level}%`}}
                    viewport={{once:true}} transition={{duration:1.4, delay:i*0.06, ease:[0.22,1,0.36,1]}}
                    className="h-full rounded-full skill-bar-fill"
                    style={{background:`linear-gradient(90deg,${sk.color}99,${sk.color})`}}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Scrolling tech icons */}
        {/* <motion.div initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{duration:0.7}}
          className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{background:dm?"linear-gradient(90deg,#020817,transparent)":"linear-gradient(90deg,#eef2ff,transparent)"}}/>
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{background:dm?"linear-gradient(270deg,#020817,transparent)":"linear-gradient(270deg,#eef2ff,transparent)"}}/> */}

          {/* double the list for seamless loop */}
          {/* <div className="skills-track">
            {[...techStack,...techStack].map((tech,i)=>(
              <motion.div key={`${tech.name}-${i}`} whileHover={{scale:1.2,y:-6}}
                className="flex flex-col items-center gap-2 px-5 py-4 rounded-xl border transition-all cursor-pointer"
                style={{background:dm?`${tech.color}10`:`${tech.color}08`,border:`1px solid ${tech.color}30`,minWidth:90}}>
                <div className="w-8 h-8 rounded flex items-center justify-center text-lg font-bold" style={{background:`${tech.color}20`,color:tech.color}}>
                  {tech.name.slice(0,2)}
                </div>
                <span className={`font-mono text-xs whitespace-nowrap ${c.muted}`}>{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div> */}
      </div>
    </section>
  );
}
