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
        // ── Pure neutral grays (override default) ──────────────────
        gray: {
          50:  '#FAFAFA',
          100: '#F5F5F5',
          200: '#E8E8E8',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#3D3D3D',
          800: '#262626',
          900: '#141414',
          950: '#0A0A0A',
        },
        // ── Soft — CSS-variable-driven neutral system ──────────────
        // Values flip in dark mode via :root / html.dark in index.css
        // bg-soft-50 = canvas  |  soft-900 = primary text
        soft: {
          50:  'rgb(var(--s-50)  / <alpha-value>)',
          100: 'rgb(var(--s-100) / <alpha-value>)',
          200: 'rgb(var(--s-200) / <alpha-value>)',
          300: 'rgb(var(--s-300) / <alpha-value>)',
          400: 'rgb(var(--s-400) / <alpha-value>)',
          500: 'rgb(var(--s-500) / <alpha-value>)',
          600: 'rgb(var(--s-600) / <alpha-value>)',
          700: 'rgb(var(--s-700) / <alpha-value>)',
          800: 'rgb(var(--s-800) / <alpha-value>)',
          900: 'rgb(var(--s-900) / <alpha-value>)',
        },
        // ── Ocean — anthracite/ink (primary interactive) ───────────
        // Replaces the old sky-blue; looks great on white as dark ink
        ocean: {
          50:  '#F4F4F6',
          100: '#EAEAED',
          200: '#D4D4DA',
          300: '#ADADB8',
          400: '#808090',
          500: '#5A5A6E',
          600: '#3F3F50',
          700: '#2B2B3A',
          800: '#1A1A26',
          900: '#0D0D18',
        },
        // ── Beni — bold Japanese red (single accent color) ─────────
        beni: {
          50:  '#FFF5F4',
          100: '#FFE8E6',
          200: '#FFCAC6',
          300: '#FFA099',
          400: '#FF6B60',
          500: '#E03D30',
          600: '#C03025',
          700: '#9A1E19',
          800: '#721612',
          900: '#4D0C0A',
        },
        // ── Matcha — muted green (tertiary, data use) ─────────────
        matcha: {
          50:  '#F2F7F0',
          100: '#E3EDDC',
          200: '#C4D9B8',
          300: '#9DBF8E',
          400: '#76A264',
          500: '#578748',
          600: '#416A34',
          700: '#2F5024',
          800: '#1E3618',
          900: '#112010',
        },
        // ── Sakura — soft pink (kept for data use) ─────────────────
        sakura: {
          50:  '#FFF7F9',
          100: '#FFEDF0',
          200: '#FFD4DC',
          300: '#FFB0BE',
          400: '#F08095',
          500: '#D0607A',
          600: '#A8485C',
          700: '#7E3042',
          800: '#561E2C',
          900: '#380F1A',
        },
        // ── Japanese named colors ──────────────────────────────────
        japanese: {
          red:     '#C03025',
          gold:    '#B8943A',
          indigo:  '#2B2B3A',
          emerald: '#416A34',
          ink:     '#0D0D18',
        },
      },
      fontFamily: {
        // Headings: Noto Sans JP — modern, clean, Japanese-native
        'heading':         ['Noto Sans JP', 'Inter', 'sans-serif'],
        'display':         ['Noto Sans JP', 'Inter', 'sans-serif'],
        // Body: Inter — crisp, readable
        'sans':            ['Inter', 'Noto Sans JP', 'sans-serif'],
        // Japanese text: ensure correct glyph rendering
        'japanese':        ['Noto Sans JP', 'sans-serif'],
        'japanese-serif':  ['Noto Serif JP', 'serif'],
        // Code / numbers / metadata
        'mono':            ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // Tight display scale for editorial feel
        'display-xl': ['4.5rem',  { lineHeight: '1.0', letterSpacing: '-0.035em' }],
        'display-lg': ['3.5rem',  { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display-md': ['2.5rem',  { lineHeight: '1.1',  letterSpacing: '-0.025em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
      },
      animation: {
        'fade-in':    'fadeIn 0.6s ease-out',
        'slide-up':   'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'float':      'gentleFloat 7s ease-in-out infinite',
        'ocean-wave': 'oceanWave 8s ease-in-out infinite',
        'breathe':    'breathe 5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)',     opacity: '1' },
        },
        slideDown: {
          '0%':   { transform: 'translateY(-16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)',      opacity: '1' },
        },
        oceanWave: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        gentleFloat: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-6px)' },
        },
        breathe: {
          '0%, 100%': { opacity: '0.65', transform: 'scale(1)' },
          '50%':      { opacity: '1',    transform: 'scale(1.015)' },
        },
      },
      backgroundImage: {
        // Ink-dark gradient for hero overlays
        'ocean-gradient':    'linear-gradient(135deg, #1A1A26 0%, #2B2B3A 100%)',
        'kon-gradient':      'linear-gradient(180deg, rgba(13,13,24,0) 0%, rgba(13,13,24,0.85) 100%)',
        // Bold red accent gradient
        'beni-gradient':     'linear-gradient(135deg, #C03025 0%, #9A1E19 100%)',
        // Clean page tint
        'surface-gradient':  'linear-gradient(180deg, #FAFAFA 0%, #F2F2F2 100%)',
      },
      boxShadow: {
        // Barely-there shadows for smart/flat look
        'card':    '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'card-md': '0 4px 12px rgba(0,0,0,0.08)',
        'card-lg': '0 8px 32px rgba(0,0,0,0.12)',
        // Crisp drop shadow for modals
        'modal':   '0 20px 60px rgba(0,0,0,0.20)',
      },
    },
  },
  plugins: [],
}
