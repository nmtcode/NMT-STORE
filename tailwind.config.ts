/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // يمكنك إضافة ألوان متوافقة مع براند NMT
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
