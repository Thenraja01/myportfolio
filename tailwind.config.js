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
        themeSubheading: '#F59E0B',
        themeButton: '#6366F1',
        themeText: '#1E293B',
        darkText: '#F1F5F9',
      },
    },
  },
  plugins: [],
}
