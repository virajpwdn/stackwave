/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1D4ED8",
        secondary: "#1E40AF",
        accent: "#2563EB",
        stackwaveGray: "#F9FAFB",
        stackwaveDarkGray: "#1F2937",
      },
      fontFamily: {
        gilroy: ["gilroy-regular", "Roboto", "system-ui"],
        gilroyMedium: ["gilroy-medium", "Roboto", "system-ui"],
      },
    },
  },
  plugins: [],
};
