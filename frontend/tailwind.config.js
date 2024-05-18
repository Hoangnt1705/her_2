/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{svelte,js,ts}",
  ],

  theme: {
    extend: {
      animation: {
        BounceDelayOne: 'bounce 1s 0.2s infinite',
        BounceDelayTwo: 'bounce 1s 0.4s infinite',
        BounceDelayThree: 'bounce 1s 0.6s infinite',
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
  plugins: [],

}

