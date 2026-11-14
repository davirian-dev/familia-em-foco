/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          900: '#312e81',
        },
        family: {
          davi: '#3B82F6',     // Azul
          marina: '#10B981',   // Esmeralda
          benjamin: '#F59E0B', // Âmbar Dourado
          iris: '#EC4899',     // Rosa
          theo: '#06B6D4',     // Turquesa / Ciano
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
