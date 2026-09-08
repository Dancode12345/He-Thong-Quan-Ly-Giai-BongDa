/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        pitch: "#0B5D3A",
        turf: "#17A964",
        limeflash: "#C7F92F",
        navypro: "#0B1633",
        ember: "#FF5A3C",
        skyline: "#22D3EE",
        chalk: "#F8FAFC"
      },
      boxShadow: {
        glow: "0 18px 60px rgba(23, 169, 100, 0.22)"
      }
    }
  },
  plugins: []
};
