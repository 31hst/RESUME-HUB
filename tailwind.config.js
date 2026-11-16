/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        brand: {
          black: "#000000",
          deep: "#830000",
          primary: "#BC0202",
          accent: "#FF0000",
        },
        surface: {
          base: "#000000",
          card: "rgba(18, 5, 5, 0.65)",
          elevated: "rgba(35, 8, 8, 0.75)",
          subtle: "rgba(131, 0, 0, 0.15)",
        },
        crimson: {
          950: "#120101",
          900: "#240000",
          850: "#380000",
          800: "#550000",
          700: "#830000",
          600: "#A30202",
          500: "#BC0202",
          400: "#E30202",
          300: "#FF0000",
          200: "#FF4545",
          100: "#FFA8A8",
        }
      },
      fontFamily: {
        sans: ["Inter", "Plus Jakarta Sans", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Sora", "system-ui", "sans-serif"],
      },
      boxShadow: {
        'red-glow': '0 0 25px -5px rgba(255, 0, 0, 0.35)',
        'red-glow-lg': '0 0 50px -10px rgba(188, 2, 2, 0.45)',
        'red-border': '0 0 0 1px rgba(131, 0, 0, 0.4)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { opacity: '0.4', filter: 'drop-shadow(0 0 15px rgba(255, 0, 0, 0.3))' },
          '100%': { opacity: '0.8', filter: 'drop-shadow(0 0 30px rgba(255, 0, 0, 0.6))' },
        }
      }
    },
  },
  plugins: [],
}
