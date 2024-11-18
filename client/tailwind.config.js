 /** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '320px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px'
    },
    extend: {
      colors: {
        txtColor: '#e2e8f0',
        // secTxtColor: '#d8d4d5',
        secTxtColor: '#627c85',
        bgColor: '#0F172A',
        secBgColor: '#e9fff9',
        primColor: '#92c2dc',
        secColor: '#a2e8dd',
        accColor: '#627c85',
      },
      screens: {
        '2lg': '1440px',
      },
    },
  },
  plugins: [],
}

