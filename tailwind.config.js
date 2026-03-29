/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        themeSubheading: '#915022ff',
        themeButton: '#6aaa5dff',
        themeText: '#28223eff',
        darkText: '#a6a5a5ff',
      },
    },
  },
  plugins: [],
}
