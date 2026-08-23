/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#1c1d20',
        foreground: '#ffffff',
        accent: '#455ce9',
        border: 'rgba(255,255,255,.12)',
        muted: '#999d9e',
        'obsidian-canvas': '#1c1d20',
        'bone-white': '#ffffff',
        fog: '#999d9e',
        graphite: '#494a4d',
        'electric-iris': '#455ce9',
        'deep-iris': '#334bd3',
      },
      borderRadius: {
        cards: '10px',
        pill: '36.72px',
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['"Geist Mono"', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
