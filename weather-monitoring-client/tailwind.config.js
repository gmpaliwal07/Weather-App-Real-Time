/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        primary : '#071952',
        secondary : '#C4DDFF',
        text : '#FFF8F3',
      }
    },
  },
  plugins: [],
}