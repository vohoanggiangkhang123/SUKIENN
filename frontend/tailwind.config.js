/** @type {import('tailwindcss').Config} */
export default {
  prefix: 'adm-',
  content: ['./index.html', './src/admin/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        surface: '#fdf3ff',
        'on-surface': '#38274c',
        primary: '#6a1cf6',
        'primary-container': '#ac8eff',
        'on-primary': '#f7f0ff',
        'on-primary-container': '#2a0070',
        'surface-container-low': '#f9edff',
        'surface-container': '#f3e2ff',
        'surface-container-high': '#efdbff',
        'surface-container-lowest': '#ffffff',
        'surface-variant': '#ebd4ff',
        outline: '#836e99',
        'outline-variant': '#bba4d2',
        'on-surface-variant': '#67537c',
        secondary: '#0253cd',
        'secondary-container': '#c2d0ff',
        'on-secondary-container': '#0040a3',
        error: '#b41340',
        'on-error': '#ffefef',
        background: '#fdf3ff',
        tertiary: '#9d365d',
      },
      fontFamily: {
        headline: ['Manrope', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        xl: '0.75rem',
      },
    },
  },
  plugins: [],
};
