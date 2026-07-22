/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
      },
      colors: {
        bravo: {
          green: '#006A43',
          greenHover: '#004227',
          mint: '#C0FFA5',
          mintLight: '#E8FEDF',
          mintBg: '#C0FFA5',
          dark: '#004227',
          body: '#1B1B1B',
          muted: '#6B6C72',
        },
      },
    },
  },
  plugins: [],
}
