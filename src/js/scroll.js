/* ============================================================
   scroll.js — Smooth scroll & active section tracking utility
   ============================================================ */

/**
 * Smoothly scrolls to a section by its id.
 * @param {string} id - element id (without #)
 */
export function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

/**
 * Observes sections and calls `onActive(id)` when one enters viewport.
 * Returns a disconnect function.
 *
 * @param {string[]} sectionIds
 * @param {(id: string) => void} onActive
 * @returns {{ disconnect: () => void }}
 */
export function trackActiveSections(sectionIds, onActive) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) onActive(entry.target.id);
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sectionIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });

  return { disconnect: () => observer.disconnect() };
}
