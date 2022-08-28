/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          base: '#8334eb',
          hover: '#9e54ff',
        },
      },
      width: {},
      inset: {
        30: '7.5rem',
      },
      padding: {
        0.8: '0.2rem',
      },
      minHeight: {
        '20vh': '20vh',
        '70vh': '70vh',
        '80vh': '80vh',
        '90vh': '90vh',
      },
      scale: {
        101: '1.01',
        102: '1.02',
      },
      boxShadow: {
        ds1: '10px 4px 20px rgba(0, 0, 0, 0.25)',
        ds2: '0px 0px 20px rgba(155, 155, 155, 0.2)',
      },
      brightness: {
        85: '.85',
      },
    },
  },
  variants: {
    extend: {
      margin: ['group-hover'],
      width: ['group-hover'],
      padding: ['group-hover'],
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#2462c3',
          secondary: '#F000B8',
          accent: '#37CDBE',
          neutral: '#3D4451',
          'base-100': '#FFFFFF',
          info: '#3ABFF8',
          success: '#36D399',
          warning: '#FBBD23',
          error: '#F87272',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
}
