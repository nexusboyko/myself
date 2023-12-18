/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    colors: {
      'primary': '#6DBDA5',
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
