/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      sans: "Roboto",
    },
    colors: {
      transparent: "transparent",
      black: "#1b1c27",
      "black-500": "#2d2e3b",
      white: "#f6f6f6",
      red: "#a72726",
      "red-500": "#d36d6d",
    },
  },
  plugins: [],
};
