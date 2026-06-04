module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: {
          50: '#f0f4ff',
          100: '#d4e4ff',
          600: '#3b82f6',
          700: '#1d4ed8',
          800: '#1e40af',
        },
        teal: {
          500: '#0d9488',
          600: '#0f766e',
        },
        cyan: {
          100: '#cffafe',
          500: '#06b6d4',
        },
        green: {
          100: '#dcfce7',
          500: '#22c55e',
          600: '#16a34a',
        }
      }
    },
  },
  plugins: [],
}