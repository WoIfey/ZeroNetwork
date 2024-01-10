/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        custom: ["-webkit-linear-gradient(#4e87d1, #A5C5DF)"],
      },
    },
  },
  plugins: [],
};

