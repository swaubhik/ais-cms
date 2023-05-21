/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#F6D65D',
        light: '#FDF7DF',
        dark: '#0B2435',
        'dark-light': '#20435C',
        'dark-lighter': '#355C76',
        error: '#FF0000'
      },
      backgroundImage: {
        'hero-pattern': "url('/src/assets/images/bg-pattern.png')"
      },
      maxWidth: {
        '8xl': '90rem'
      },
      minHeight: {
        '80vh': '80vh'
      },
      width: {
        '1/7': '50%'
      }
    }
  },
  daisyui: {
    styled: true,
    themes: [
      {
        mytheme: {
          primary: '#F6D65D',
          secondary: '#FDF7DF',
          accent: '#FDF7DF',
          neutral: '#0B2435',
          'neutral-focus': '#20435C',
          'neutral-content': '#FDF7DF',
          'base-100': '#FDF7DF',
          info: '#3ABFF8',
          success: '#36D399',
          warning: '#FBBD23',
          error: '#F87272'
        }
      }
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false
  },
  plugins: [require('daisyui')]
}
