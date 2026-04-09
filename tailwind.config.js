/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0b0c10',
        surface: 'rgba(255,255,255,0.05)',
        border: 'rgba(255,255,255,0.2)',
        text: {
          main: '#e0e0e0',
          muted: '#888888'
        },
        rarity: {
          n: '#94a3b8',
          r: '#00ffff',
          sr: '#ff00ff',
          ur: '#ffcc00'
        },
        accent: {
          cyan: '#00ffff',
          indigo: '#ff00ff',
          yellow: '#ffcc00'
        }
      },
      fontFamily: {
        heading: ['ZCOOL QingKe HuangYou', 'Noto Sans SC', 'sans-serif'],
        body: ['Inter', 'Noto Sans SC', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
        pixel: ['DotGothic16', 'monospace'],
        orbitron: ['Orbitron', 'sans-serif']
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
      }
    },
  },
  plugins: [],
};