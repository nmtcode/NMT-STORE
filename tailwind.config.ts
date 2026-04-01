/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // <--- هذا السطر هو "المفتاح" الذي ينقصك!
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        nmtBlue: "#3b82f6",
        nmtDark: "#0a0a0a",
      },
      animation: {
        "bounce-short": "bounce-short 1s ease-in-out 1",
      },
      keyframes: {
        "bounce-short": {
          "0%, 100%": { transform: "translateY(-10%)" },
          "50%": { transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
