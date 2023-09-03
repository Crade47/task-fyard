/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "offWhite": '#cecece'
      }
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
}

