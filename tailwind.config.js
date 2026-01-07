/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-blue': '#0f172a',
        'brand-blue-light': '#1e293b',
      }
    },
  },
  plugins: [],
}
