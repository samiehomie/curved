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
      point: {
        blue: '#00f',
        sky: '#0ff',
        gray: '#d0d0d0',
        black: '#212121',
        green: '#32CD32',
        red: '#FF0000',
      },
      base: {
        purple: '#a5a4ce',
        yellow: '#ffff00',
        blue: '#3465a4',
        gray: '#d0d0d0',
        green: '#008000',
        white: '#ffffff',
        orange: 'orange',
        brown: '#505070',
        silver: 'silver',
        black: 'black',
        gray500: '#616161',
      },
    },
    extend: {
      boxShadow: {
        base: '0 0 0 3px rgba(192,192,192,1), 9px 9px 2px 0 rgba(0,0,0,0.5)',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'spin-step': 'bingle 1s steps(4) infinite',
      },
      keyframes: {
        bingle: {
          to: { transform: 'translateY(-6rem)' },
        },
      },
      fontFamily: {
        sans: ['var(--font-D2Coding)', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
