/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        px: {
          primary: '#68139A', // Brand Purple
          deep: '#35065C',    // Deep Purple
          violet: '#A44BC0',  // Violet
          lavender: '#F2E8F8',// Lavender
          white: '#FFFFFF',   // White
          dark: '#21152A',    // Dark Text
          bg: '#FAF7FC',      // Background
          accent: '#D8B9E8',  // Accent
          surface: '#FFFFFF',
          border: '#E8DCF3',
          muted: '#5B4E66',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        'glow-purple': '0 0 35px -5px rgba(104, 19, 154, 0.35)',
        'soft-purple': '0 10px 30px -10px rgba(104, 19, 154, 0.12)',
        'card-hover': '0 20px 40px -15px rgba(53, 6, 92, 0.18)',
        'swoosh': '0 0 50px -10px rgba(164, 75, 192, 0.25)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
        'swoosh-rotate': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        }
      }
    },
  },
  plugins: [],
}
