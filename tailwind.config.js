/** @type {import('tailwindcss').Config} */
export default {
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
          'ink': '#1a1a1a',
          'paper': '#fafafa',
          'muted': '#6b6b6b',
        }
      },
    },
    plugins: [],
  }