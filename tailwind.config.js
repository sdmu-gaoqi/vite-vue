/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  corePlugins: {
    preflight: false
  },
  theme: {
    extend: {
      colors: {
        ...colors,
        primary: '#2d96e9',
        fontPrimary: '#6a6d82'
      }
    }
  },
  plugins: []
}
