/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: { fontFamily: { poppins: ['Poppins', 'sans-serif'] } },
    animation: {
      'fade-in': 'fadeIn 0.5s ease-in-out',
    },
    keyframes: { fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 100 } } },
  },
  plugins: [],
};
