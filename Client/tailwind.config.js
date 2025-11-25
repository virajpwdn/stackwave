/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // ✅ REQUIRED for this logic to work
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

