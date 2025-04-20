/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            pre: {
              'white-space': 'pre-wrap',
              'word-break': 'keep-all',
            },
            code: {
              'white-space': 'pre',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
