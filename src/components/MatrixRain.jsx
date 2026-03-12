import { useEffect, useRef } from "react";

const CHARS = "アイウエオカキクケコサシスセソタチツテトナニヌネノABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*(){}[]<>/\\|";

export default function MatrixRain({ darkMode }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let W = canvas.width  = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    const fontSize = 14;
    let cols = Math.floor(W / fontSize);
    const drops = Array(cols).fill(1);

    const draw = () => {
      ctx.fillStyle = darkMode ? "rgba(2,8,23,0.05)" : "rgba(240,244,255,0.06)";
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = darkMode ? "#00f5ff" : "#0066ff";
      ctx.font = `${fontSize}px 'Share Tech Mono', monospace`;
      drops.forEach((y, i) => {
        const ch = CHARS[Math.floor(Math.random() * CHARS.length)];
        ctx.fillStyle = darkMode
          ? `rgba(0,${Math.floor(200 + Math.random()*55)},${Math.floor(220+Math.random()*35)}, ${0.4+Math.random()*0.4})`
          : `rgba(0,${Math.floor(80+Math.random()*80)},${Math.floor(220+Math.random()*35)}, ${0.3+Math.random()*0.3})`;
        ctx.fillText(ch, i * fontSize, y * fontSize);
        if (y * fontSize > H && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    };

    const raf = setInterval(draw, 55);
    const onResize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
      cols = Math.floor(W / fontSize);
      drops.length = cols;
      drops.fill(1);
    };
    window.addEventListener("resize", onResize);
    return () => { clearInterval(raf); window.removeEventListener("resize", onResize); };
  }, [darkMode]);

  return <canvas ref={ref} id="matrix-canvas" />;
}
