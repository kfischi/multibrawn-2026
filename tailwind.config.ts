import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          fuchsia: '#FF0090',
          purple: '#9333EA',
          cream: '#FFF8F0',
          gold: '#D4AF37',
          dark: '#2A1A3E',
        },
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
}

export default config
