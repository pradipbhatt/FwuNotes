/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        "scroll-bg": "scrollBackground 120s linear infinite",
        "spin-fast": "spin 0.8s linear infinite", // Add a custom animation for the preloader
      },
      keyframes: {
        scrollBackground: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
        // Define the keyframes for preloader spin
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      filter: {
        "saturate-100": "saturate(100%)",
        "saturate-150": "saturate(150%)",
        "saturate-200": "saturate(200%)",
      },
      colors: {
        brinjal: "#a06c8c", // Custom color resembling brinjal
        "dark-blue": "#2C3E50",
        "soft-white": "#F8F9FA",
        "sky-blue": "#3498DB",
        "mint-green": "#1ABC9C",
        orange: "#E67E22",
        "light-gray": "#BDC3C7",
        white: "#FFFFFF",
        "light-beige": "#F4F1DE",
      },
      boxShadow: {
        "blue-glow":
          "0 0 6px rgba(0, 0, 255, 0.6), 0 0 12px rgba(0, 0, 255, 0.4), 0 0 18px rgba(0, 0, 255, 0.2)",
      },
      fontFamily: {
        cursive: ["Dancing Script", "cursive"],
      },
    },
  },
  plugins: [
    require("daisyui"),
    require("tailwindcss-filters"),
    function ({ addUtilities, addBase }) {
      addUtilities(
        {
          ".scrollbar-hidden": {
            overflow: "auto",
            "scrollbar-width": "none", /* Firefox */
            "-ms-overflow-style": "none", /* IE & Edge */
          },
          ".scrollbar-hidden::-webkit-scrollbar": {
            display: "none", /* Chrome, Safari */
          },
        },
        ["responsive", "hover"]
      );

      // Global Scrollbar Styling
      addBase({
        "::-webkit-scrollbar": {
          width: "8px",
          height: "8px",
        },
        "::-webkit-scrollbar-track": {
          background: "#2C3E50", // dark-blue
          borderRadius: "10px",
        },
        "::-webkit-scrollbar-thumb": {
          background: "#3498DB", // sky-blue
          borderRadius: "10px",
          border: "2px solid #2C3E50", // Border around thumb
        },
        "::-webkit-scrollbar-thumb:hover": {
          background: "#1ABC9C", // mint-green on hover
        },
        "::-webkit-scrollbar-corner": {
          background: "#2C3E50",
        },
      });
    },
  ],
};
