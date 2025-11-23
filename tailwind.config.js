/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        asphalt: {
          DEFAULT: '#0C0C0C',
          card: '#111213',
        },
        driveon: {
          green: '#34D07C',
          amber: '#FFB64D',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#B9B9B9',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        heading: ['Poppins', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      boxShadow: {
        'card': '0 4px 6px rgba(0, 0, 0, 0.45)',
      },
    },
  },
  plugins: [],
}