/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./app/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    colors: {
      ...colors,
      myself: '#6DBDA5',
    },
    extend: {
      fontFamily: {
        inter: 'Inter',
        segoe: 'Segoe UI',
        mono: 'JetBrainsMono'  
      },
    },
  },
  plugins: [require('daisyui'), require('autoprefixer')],
  daisyui: {
    themes: ['light', 'dark']
  }
};
