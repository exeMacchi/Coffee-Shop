/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "shrink-grow": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(0.3)" }
        }
      },
      animation: {
        "shrink-grow": "shrink-grow 1.5s ease-in-out infinite",
      }
    },
  },
  plugins: [],
}

