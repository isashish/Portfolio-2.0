/* ============================================================
   matrixRain.js — Canvas-based Matrix Rain utility
   ============================================================ */

const CHARS =
  'アイウエオカキクケコサシスセソタチツテトナニヌネノABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*(){}[]<>/\\|';

/**
 * Starts the matrix rain animation on a given <canvas> element.
 *
 * @param {HTMLCanvasElement} canvas
 * @param {boolean} darkMode
 * @returns {{ stop: () => void, setDarkMode: (v: boolean) => void }}
 */
export function startMatrixRain(canvas, darkMode = true) {
  const ctx = canvas.getContext('2d');
  let dm = darkMode;
  let raf;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const cols = Math.floor(window.innerWidth / 20);
  const drops = Array(cols).fill(1);

  function draw() {
    ctx.fillStyle = dm ? 'rgba(2,8,23,0.05)' : 'rgba(240,244,255,0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = dm ? '#00f5ff' : '#0066ff';
    ctx.font = '14px monospace';

    drops.forEach((y, i) => {
      const ch = CHARS[Math.floor(Math.random() * CHARS.length)];
      ctx.fillText(ch, i * 20, y * 20);
      if (y * 20 > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    });

    raf = requestAnimationFrame(draw);
  }

  draw();

  return {
    stop()             { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); },
    setDarkMode(v)     { dm = v; }
  };
}
