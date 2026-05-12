/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      colors: {
        brand: {
          900: '#1B4D2E',
          700: '#2D7A4F',
          400: '#4CAF82',
          100: '#E8F5EE',
          50:  '#F0FAF4',
        },
        amber: {
          600: '#D4870A',
          50:  '#FFF3DC',
        },
        danger: {
          600: '#C0392B',
          50:  '#FDECEA',
        },
        ink: {
          900: '#1A2E1A',
          600: '#4A6B4A',
          400: '#8FAF8F',
        },
        surface: {
          bg:     '#F5F7F5',
          card:   '#FFFFFF',
          border: '#DCE8DC',
          input:  '#FAFCFA',
        },
      },
      borderRadius: {
        card: '14px',
        sm:   '9px',
      },
      boxShadow: {
        card: '0 2px 16px rgba(27,77,46,0.08)',
      },
    },
  },
  plugins: [],
}
