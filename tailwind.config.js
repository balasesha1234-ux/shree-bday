/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bday: {
          pink: '#FF4D8D',
          rose: '#FF6B9D',
          blush: '#FFB3C6',
          softPink: '#FFE5EC',
          bgCream: '#FFF5F5',
          darkBg: '#0A0A1A',
          neonPink: '#FF2D78',
          gold: '#FFD93D',
          devotionalGold: '#D4A84B',
          sky: '#6BC5F8',
          mint: '#7CEBC6',
          lavender: '#E0D4F0',
          darkText: '#2D2D2D',
          plum: '#3D2040'
        }
      },
      fontFamily: {
        fredoka: ['"Fredoka"', 'sans-serif'],
        quicksand: ['"Quicksand"', 'sans-serif'],
        playfair: ['"Playfair Display"', 'serif'],
        caveat: ['"Caveat"', 'cursive'],
        space: ['"Space Grotesk"', 'monospace']
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.8', filter: 'drop-shadow(0 0 15px rgba(255, 45, 120, 0.6))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 35px rgba(255, 45, 120, 0.9))' },
        }
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        float: 'float 3s ease-in-out infinite',
        pulseGlow: 'pulseGlow 2s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
