import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeGlobe({ darkMode: dm }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const W = el.clientWidth || 500, H = el.clientHeight || 500;
    const scene    = new THREE.Scene();
    const camera   = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
    camera.position.set(0, 0, 3.5);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);

    const C   = dm ? 0x00f5ff : 0x0066ff;
    const C2  = dm ? 0xbf00ff : 0x7700cc;
    const C3  = dm ? 0x00ff88 : 0x00aa55;

    // ── Core sphere ────────────────────────────────────────────────────────
    const coreGeo = new THREE.SphereGeometry(1, 64, 64);
    const coreMat = new THREE.MeshPhongMaterial({
      color: dm ? 0x020817 : 0xdbeafe,
      emissive: dm ? 0x001830 : 0x93c5fd,
      emissiveIntensity: 0.5,
      transparent: true, opacity: 0.9,
      shininess: 80,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    scene.add(core);

    // ── Wireframe shell ────────────────────────────────────────────────────
    const wireGeo = new THREE.SphereGeometry(1.01, 24, 24);
    const wireMat = new THREE.MeshBasicMaterial({ color: C, wireframe: true, transparent: true, opacity: dm ? 0.12 : 0.2 });
    scene.add(new THREE.Mesh(wireGeo, wireMat));

    // ── Glowing dot cloud ──────────────────────────────────────────────────
    const dotPositions = [];
    for (let i = 0; i < 500; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      dotPositions.push(
        1.02 * Math.sin(phi) * Math.cos(theta),
        1.02 * Math.sin(phi) * Math.sin(theta),
        1.02 * Math.cos(phi)
      );
    }
    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute("position", new THREE.Float32BufferAttribute(dotPositions, 3));
    const dotMat = new THREE.PointsMaterial({ color: C, size: 0.018, transparent: true, opacity: 0.8 });
    const dots = new THREE.Points(dotGeo, dotMat);
    scene.add(dots);

    // ── Orbit rings ────────────────────────────────────────────────────────
    const mkRing = (r, col, rx, ry, thick = 0.005) => {
      const g = new THREE.TorusGeometry(r, thick, 8, 120);
      const m = new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.5 });
      const mesh = new THREE.Mesh(g, m);
      mesh.rotation.x = rx; mesh.rotation.y = ry;
      scene.add(mesh); return mesh;
    };
    const ring1 = mkRing(1.3, C,  1.1, 0.3);
    const ring2 = mkRing(1.6, C2, 0.4, 1.0, 0.004);
    const ring3 = mkRing(1.9, C3, 0.9, 0.6, 0.003);

    // ── Floating satellite dot ─────────────────────────────────────────────
    const satGeo = new THREE.SphereGeometry(0.04, 8, 8);
    const satMat = new THREE.MeshBasicMaterial({ color: C });
    const sat = new THREE.Mesh(satGeo, satMat);
    scene.add(sat);

    // ── Lights ─────────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const dir1 = new THREE.DirectionalLight(C,  1.5); dir1.position.set(5,3,5);   scene.add(dir1);
    const dir2 = new THREE.DirectionalLight(C2, 0.8); dir2.position.set(-5,-3,-5); scene.add(dir2);

    // ── Outer atmosphere glow ──────────────────────────────────────────────
    const atmoGeo = new THREE.SphereGeometry(1.15, 32, 32);
    const atmoMat = new THREE.MeshBasicMaterial({
      color: C, transparent: true, opacity: 0.06, side: THREE.BackSide,
    });
    scene.add(new THREE.Mesh(atmoGeo, atmoMat));

    let t = 0;
    let raf;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      t += 0.01;
      core.rotation.y += 0.003;
      dots.rotation.y += 0.003;
      ring1.rotation.z += 0.006;
      ring2.rotation.z -= 0.004;
      ring3.rotation.x += 0.003;
      // Satellite orbiting ring1
      sat.position.x = Math.cos(t * 0.8) * 1.3;
      sat.position.y = Math.sin(t * 0.8) * 0.6;
      sat.position.z = Math.sin(t * 0.8) * 1.1;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const w = el.clientWidth, h = el.clientHeight;
      camera.aspect = w / h; camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); renderer.dispose(); if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement); };
  }, [dm]);

  return <div ref={ref} className="w-full h-full" />;
}
