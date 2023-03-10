const colors = require('tailwindcss/colors');

const baseSizes = {
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  7: '1.75rem',
  8: '2rem',
  9: '2.25rem',
  10: '2.5rem',
  11: '2.75rem',
  12: '3rem',
  13: '3.25rem',
  14: '3.5rem',
  15: '3.75rem',
  16: '4rem',
  18: '4.5rem',
  20: '5rem',
  24: '6rem',
  28: '7rem',
  32: '8rem',
  36: '9rem',
  40: '10rem',
  44: '11rem',
  48: '12rem',
  52: '13rem',
  56: '14rem',
  60: '15rem',
  64: '16rem',
  72: '18rem',
  80: '20rem',
  96: '24rem',
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/components/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyan: colors.cyan,
        gray: {
          ...colors.neutral,
          450: '#D7D7D7',
          500: '#D6D6D6',
          550: '#CCCCCC',
          600: '#797979',
          700: '#707070',
          750: '#606060',
          800: '#333333',
          850: '#2f2f2f',
          900: '#1B1D1F',
        },
        primary: {
          ...colors.emerald,
          300: '#21CC97',
          400: '#489C9C',
          425: '#5AE4E4',
          450: '#4AB9B9',
          500: '#489C9C',
          515: '#414F51',
          525: '#367273',
          550: '#34494D',
          600: '#326B6C',
          700: '#30494D',
          800: '#30494D',
          900: '#203033',
        },
        _blue: {
          ...colors.blue,
          300: '#EDF6F9',
          400: '#66CCCC',
        },
        _sky: {
          ...colors.sky,
          400: '#069CD2',
          500: '#0491C4',
        },
        _yellow: {
          ...colors.yellow,
          300: '#FFFBE6',
          400: '#F5C910',
          500: '#FACA00',
        },
        _red: {
          ...colors.red,
          300: '#FFF2F1',
          400: '#FF8A8A',
          500: '#FF0000',
        },
        _pink: {
          ...colors.pink,
          400: '#D23B5F',
        },
        _orange: {
          ...colors.orange,
          400: '#F97316',
          450: '#F27219',
          500: '#ED7019',
        },
        _lime: {
          400: '#45d45e',
          450: '#22C55E',
          500: '#3bb950',
          700: '#175622',
        },
      },
      minWidth: { inherit: 'inherit', ...baseSizes },
      minHeight: { inherit: 'inherit', ...baseSizes },
      maxWidth: { inherit: 'inherit', ...baseSizes },
      maxHeight: { inherit: 'inherit', ...baseSizes },
      zIndex: {
        2: 2,
        '-1': -1,
        sider: 100,
        dialog: 50,
        spinner: 99,
        overlay: 50,
        tooltip: 100,
        menu: 50,
        options: 20,
        sticky: 2,
        stickyY: 3,
        watermark: 9999,
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
