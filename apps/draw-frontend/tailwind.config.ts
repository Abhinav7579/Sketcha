import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',                      // app’s own components
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',      // shared UI package
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

export default config
