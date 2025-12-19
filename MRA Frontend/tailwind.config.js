/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#1e3a8a',
          blue: '#3b82f6',
          light: '#60a5fa',
        },
        success: '#10b981',
        warning: '#f59e0b',
        premium: '#8b5cf6',
        dark: '#1f2937',
      },
    },
  },
  plugins: [],
}
