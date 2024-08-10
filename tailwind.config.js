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
          colors: {
            brinjal: '#a06c8c', // Custom color resembling brinjal
          },
          boxShadow: {
            'blue-glow': '0 0 6px rgba(0, 0, 255, 0.6), 0 0 12px rgba(0, 0, 255, 0.4), 0 0 18px rgba(0, 0, 255, 0.2)',
          },
          fontFamily: {
            cursive: ['Dancing Script', 'cursive'],
          },
          
      },
  },
  plugins: [require("daisyui"), require('tailwindcss-filters'),
    function({ addUtilities }) {
      addUtilities(
        {
          '.scrollbar-hidden': {
            'overflow': 'auto',
            'scrollbar-width': 'none', /* For Firefox */
            '-ms-overflow-style': 'none', /* For Internet Explorer and Edge */
          },
          '.scrollbar-hidden::-webkit-scrollbar': {
            'display': 'none', /* For WebKit browsers (Chrome, Safari) */
          },
        },
        ['responsive', 'hover']
      );
    },
  ],
};
