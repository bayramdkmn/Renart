import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'avenir': ['Avenir', 'sans-serif'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      boxShadow: {
        'lux': '0 8px 32px 0 rgba(34, 34, 34, 0.10)',
        'lux-lg': '0 16px 48px 0 rgba(34, 34, 34, 0.13)',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
    },
  },
  plugins: [],
};
export default config; 