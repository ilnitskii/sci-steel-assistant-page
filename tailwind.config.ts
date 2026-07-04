import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'SFMono-Regular', 'ui-monospace', 'monospace'],
      },
      colors: {
        ink: '#071018',
        panel: '#0e1722',
        line: '#223044',
        cyanx: '#38d5ff',
        violetx: '#8d7cff',
        mintx: '#51e1b8',
        amberx: '#f5b85a',
        rosex: '#ff7a95',
      },
      boxShadow: {
        glow: '0 0 34px rgba(56, 213, 255, 0.24)',
      },
    },
  },
  plugins: [],
} satisfies Config;
