/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3490dc",
          dark: "#2779bd",
        },
        secondary: {
          DEFAULT: "#ffed4a",
          dark: "#f2d024",
        },
      },
    },
  },
  plugins: [],
};
