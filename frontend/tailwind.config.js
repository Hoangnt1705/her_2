/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{svelte,js,ts}',
    'node_modules/preline/dist/*.js',
  ],

  theme: {
    extend: {
      animation: {
        BounceDelayOne: 'bounce 1s 0.2s infinite',
        BounceDelayTwo: 'bounce 1s 0.4s infinite',
        BounceDelayThree: 'bounce 1s 0.6s infinite',
        },
        colors: {
          'navy-700': '#1b254b',
        },
    },
  },
  variants: {
    opacity: ({ after }) => after(['disabled'])
  },
  safelist: [
    {
      pattern: /bg-(amber|emerald|red)-700/,
    }
  ],
  plugins: [
    // require('@tailwindcss/forms'),
      require('preline/plugin'),
  ],
}

