/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/html/utils/withMT";

export default withMT({
  content: [
    './index.html',
    './src/**/*.{html,js,svelte,ts}',
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
        'rose-400': '#FB7185',
        'rose-500': '#F43F5E',
        'emerald-300': '#6EE7B7'

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
});


// normal tailwind config

// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     './index.html',
//     './src/**/*.{svelte,js,ts}',
//     'node_modules/preline/dist/*.js',
//   ],

//   theme: {
//     extend: {
//       animation: {
//         BounceDelayOne: 'bounce 1s 0.2s infinite',
//         BounceDelayTwo: 'bounce 1s 0.4s infinite',
//         BounceDelayThree: 'bounce 1s 0.6s infinite',
//         },
//         colors: {
//           'navy-700': '#1b254b',
//         },
//     },
//   },
//   variants: {
//     opacity: ({ after }) => after(['disabled'])
//   },
//   safelist: [
//     {
//       pattern: /bg-(amber|emerald|red)-700/,
//     }
//   ],
//   plugins: [
//     // require('@tailwindcss/forms'),
//       require('preline/plugin'),
//   ],
// }

