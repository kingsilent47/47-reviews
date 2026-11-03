/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif'],
      },
      colors: {
        'ink': '#202020',      /* Almost-black (Main text) */
        'paper': '#FAF9F6',    /* Warm off-white (Background) */
        'muted': '#777777',    /* Muted grey (Secondary text) */
      }
    },
  },
  plugins: [],
}
