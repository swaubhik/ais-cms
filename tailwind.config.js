/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      primary: '#F6D65D',
      light: '#FDF7DF',
      dark: '#0B2435'
    },
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/src/assets/images/bg-pattern.png')"
      },
      maxWidth: {
        '8xl': '90rem'
      }
    }
  },
  plugins: []
}
