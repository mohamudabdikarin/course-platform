/* @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Based on the Figma design's color palette
        'primary': '#4F46E5', // A vibrant purple/blue
        'primary-dark': '#4338CA',
        'secondary': '#EC4899', // A vibrant pink
        'light': {
          'bg': '#F8F9FA',      // Main background
          'card': '#FFFFFF',     // Card background
          'text': '#1F2937',     // Main text
          'subtext': '#6B7280', // Lighter text
        },
        'dark': {
          'bg': '#111827',      // Main background
          'card': '#1F2937',     // Card background
          'text': '#F9FAFB',     // Main text
          'subtext': '#9CA3AF', // Lighter text
        },
        'success': '#10B981',
        'warning': '#F59E0B',
        'danger': '#EF4444',
      },
      fontFamily: {
        // Use a clean, modern sans-serif font like Inter
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      }
    },
  },
  plugins: [],
}