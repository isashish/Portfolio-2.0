/* ============================================================
   cursor.js — Vanilla cursor tracking utility
   Used by App.jsx Cursor component as a reference
   ============================================================ */

/**
 * Initialises a lerp-tracked cursor overlay on the document.
 * Call `destroy()` on the returned object to remove listeners.
 *
 * @param {object} opts
 * @param {string} opts.dotColor   - CSS colour for the dot
 * @param {string} opts.ringColor  - CSS colour for the ring
 * @returns {{ destroy: () => void }}
 */
export function initCursor({ dotColor = '#00f5ff', ringColor = '#00f5ff' } = {}) {
  let rx = -200, ry = -200;

  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');

  const INTERACTIVE = ['A', 'BUTTON', 'INPUT', 'TEXTAREA'];

  function onMove(e) {
    if (dot) {
      dot.style.left = `${e.clientX}px`;
      dot.style.top  = `${e.clientY}px`;
    }
    // lerp ring
    const lerp = (a, b, t) => a + (b - a) * t;
    const step = () => {
      rx = lerp(rx, e.clientX, 0.12);
      ry = lerp(ry, e.clientY, 0.12);
      if (ring) {
        ring.style.left = `${rx}px`;
        ring.style.top  = `${ry}px`;
      }
    };
    requestAnimationFrame(step);
  }

  function onOver(e) {
    if (!ring) return;
    if (INTERACTIVE.includes(e.target.tagName)) {
      ring.classList.add('hovered');
    } else {
      ring.classList.remove('hovered');
    }
  }

  window.addEventListener('mousemove', onMove);
  window.addEventListener('mouseover', onOver);

  return {
    destroy() {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
    }
  };
}
