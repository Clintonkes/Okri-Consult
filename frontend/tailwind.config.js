module.exports = {
  content: [
    "./index.html",
    "./*.{js,jsx,ts,tsx}",
    "./Pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./services/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          50: '#f7efe7',
          100: '#ead9c8',
          600: '#8b5e34',
          700: '#6f4526',
          800: '#52311a',
        },
        teal: {
          500: '#214d3f',
          600: '#17382d',
        },
        cyan: {
          100: '#f1e1cd',
          500: '#d7b08a',
        },
        green: {
          100: '#d6e0d6',
          500: '#5b745d',
          600: '#435845',
        },
        gray: {
          50: '#f8f4ee',
          100: '#efe7dc',
          200: '#e1d6c6',
          300: '#c9b8a3',
          400: '#a89176',
          500: '#84725e',
          600: '#625446',
          700: '#4b3f35',
          800: '#332b25',
          900: '#201b17',
        }
      }
    },
  },
  plugins: [],
}
