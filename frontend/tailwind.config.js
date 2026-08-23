/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#6C63FF',
        secondary: '#2D2B55',
        accent: '#FF6584',
        dark: '#1a1a2e',
      },
    },
  },
  plugins: [],
};
