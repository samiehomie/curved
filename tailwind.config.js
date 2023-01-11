const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontSize: {
      sm: '0.87rem',
      base: '1rem',
      xl: '1.3rem',
      '2xl': '1.6rem',
      '3xl': '2rem',
    },
    colors: {
      base: {
        purple: '#a5a4ce',
        yellow: '#ffff00',
        blue: '#3465a4',
        gray: '#c0c0c0',
        green: '#008000',
        white: '#ffffff'
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-D2Coding)', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
