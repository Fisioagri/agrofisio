/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans:    ['Lato', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
        mono:    ['"IBM Plex Mono"', 'monospace'],
      },
      colors: {
        brand: {
          900: '#0C2B5E',   // navy profundo — cor principal
          700: '#1A4DA0',   // azul médio
          400: '#5B8FDB',   // azul accent
          100: '#D8E8FF',   // azul muito claro
          50:  '#EDF4FF',   // azul quase branco
        },
        amber: {
          600: '#D4870A',
          50:  '#FFF3DC',
        },
        danger: {
          600: '#C0392B',
          50:  '#FDECEA',
        },
        // ink: neutro/slate — texto sempre legível sobre qualquer fundo
        ink: {
          900: '#0F172A',   // quase preto com leve toque frio
          600: '#334155',   // cinza escuro neutro
          400: '#94A3B8',   // cinza claro neutro
        },
        surface: {
          bg:     '#F8FAFC',   // slate-50: branco com levíssimo toque frio
          card:   '#FFFFFF',
          border: '#E2E8F0',   // slate-200: borda sutil
          input:  '#F8FAFC',
          muted:  '#F1F5F9',   // slate-100: cabeçalhos de tabela
        },
      },
      borderRadius: {
        card: '14px',
        sm:   '9px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(12,43,94,0.07)',
      },
    },
  },
  plugins: [],
}
