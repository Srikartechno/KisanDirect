/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        agri: {
          50: '#f2fbf4',
          100: '#e1f7e6',
          200: '#c4eed0',
          300: '#96deaa',
          400: '#60c67e',
          500: '#38a95c',
          600: '#298947',
          700: '#226d3a',
          800: '#1e5731',
          900: '#1a472a',
          950: '#0a2714',
        },
        earth: {
          50: '#faf6f0',
          100: '#f3ece0',
          200: '#e7d8bf',
          300: '#d7bc96',
          400: '#c59d6e',
          500: '#b2814f',
          600: '#9a6942',
          700: '#7b5137',
          800: '#654231',
          900: '#53372b',
        },
        harvest: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        }
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
        'truck-move': 'truckMove 10s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
