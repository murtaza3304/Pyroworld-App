// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        light: {
          sheet: '#FFFFFF',
          textt: '#0A1224',
          bluee: '#5D3EB3',
          lightBlue: '#38B6FF',
          red: '#D70E0E',
          lightGreen: '#21BF73',
          green: '#3B9B32',
          itembg: '#f5f5f5',
          grayy: '#c7c5c5',
          chip: '#F61C7A',
        },
        dark: {
          sheet: '#0A1224',
          textt: '#FFFFFF',
          bluee: '#5D3EB3',
          red: '#D70E0E',
          green: '#3B9B32',
          itembg: '#202832',
          grayy: '#474747',
          chip: '#F61C7A',
        },
      },
    },
  },
  plugins: [],
};
