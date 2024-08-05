// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
      extend: {
          animation: {
              'scroll-bg': 'scrollBackground 120s linear infinite',
          },
          keyframes: {
              scrollBackground: {
                  '0%': { transform: 'translateX(0)' },
                  '100%': { transform: 'translateX(-100%)' },
              },
          },
          filter: {
              'saturate-100': 'saturate(100%)',
              'saturate-150': 'saturate(150%)',
              'saturate-200': 'saturate(200%)',
          },
      },
  },
  plugins: [require("daisyui"), require('tailwindcss-filters')],
};
