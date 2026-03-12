/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"Share Tech Mono"', 'monospace'],
        display: ['"Orbitron"', 'monospace'],
        body: ['"Rajdhani"', 'sans-serif'],
      },
      colors: {
        cyber: {
          bg:     '#020817',
          panel:  '#040f24',
          border: '#0a2040',
          cyan:   '#00f5ff',
          blue:   '#0066ff',
          green:  '#00ff88',
          purple: '#bf00ff',
          pink:   '#ff0080',
          orange: '#ff6600',
          yellow: '#ffcc00',
        }
      },
      animation: {
        'scan':        'scan 3s linear infinite',
        'pulse-glow':  'pulseGlow 2s ease-in-out infinite',
        'glitch':      'glitch 0.3s steps(2) infinite',
        'float':       'float 6s ease-in-out infinite',
        'matrix-fall': 'matrixFall 8s linear infinite',
        'border-spin': 'borderSpin 4s linear infinite',
        'flicker':     'flicker 4s linear infinite',
        'type':        'typing 2.5s steps(30) forwards',
      },
      keyframes: {
        scan: {
          '0%':   { backgroundPosition: '0% -100%' },
          '100%': { backgroundPosition: '0% 200%' },
        },
        pulseGlow: {
          '0%,100%': { boxShadow: '0 0 10px #00f5ff44, 0 0 30px #00f5ff22' },
          '50%':     { boxShadow: '0 0 20px #00f5ff88, 0 0 60px #00f5ff44, 0 0 100px #00f5ff22' },
        },
        glitch: {
          '0%':   { clipPath: 'inset(0 0 95% 0)', transform: 'translate(-3px)' },
          '25%':  { clipPath: 'inset(40% 0 50% 0)', transform: 'translate(3px)' },
          '50%':  { clipPath: 'inset(80% 0 10% 0)', transform: 'translate(-2px)' },
          '75%':  { clipPath: 'inset(20% 0 75% 0)', transform: 'translate(2px)' },
          '100%': { clipPath: 'inset(95% 0 0 0)',   transform: 'translate(0)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%':     { transform: 'translateY(-15px) rotate(1deg)' },
          '66%':     { transform: 'translateY(-8px) rotate(-1deg)' },
        },
        matrixFall: {
          '0%':   { transform: 'translateY(-100%)', opacity: 1 },
          '100%': { transform: 'translateY(100vh)', opacity: 0 },
        },
        borderSpin: {
          '0%':   { '--border-angle': '0deg' },
          '100%': { '--border-angle': '360deg' },
        },
        flicker: {
          '0%,95%,100%': { opacity: 1 },
          '96%':          { opacity: 0.4 },
          '97%':          { opacity: 1 },
          '98%':          { opacity: 0.2 },
          '99%':          { opacity: 1 },
        },
        typing: {
          from: { width: '0' },
          to:   { width: '100%' },
        }
      }
    },
  },
  plugins: [],
};
