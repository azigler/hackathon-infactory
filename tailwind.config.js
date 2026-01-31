/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // The Atlantic brand palette
        atlantic: {
          charcoal: '#1a1a1a',
          slate: '#2d3436',
          stone: '#636e72',
          silver: '#b2bec3',
          pearl: '#dfe6e9',
          cream: '#fafafa',
          white: '#ffffff',
          gold: '#c9a227',
          'gold-light': '#e8d490',
          burgundy: '#6c2438',
        },
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Libre Franklin', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0,0,0,0.04)',
        'card-hover': '0 4px 16px rgba(0,0,0,0.08)',
      },
      borderRadius: {
        'card': '8px',
      },
    },
  },
  plugins: [],
}
