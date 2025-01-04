/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'xs': '320px',
        'sm': '481px',
        'md': '769px',
        'lg': '1025px',
        'xl': '1201px',
      },
    },
  },
  plugins: [],
} 