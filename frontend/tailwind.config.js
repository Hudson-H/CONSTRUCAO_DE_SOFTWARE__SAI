/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'display': ['Lexend', 'serif']
      }
    },
    backgroundImage: {
      'pattern': "url('../public/background-pattern.png')",
    }
  },
  plugins: [],
}

