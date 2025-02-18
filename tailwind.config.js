/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xsm': '381px',
        'sm': '391px',
      },
      fontFamily: {
        saph: ["saph", "sans-serif"]
      },
    },
  },
  plugins: [],
}