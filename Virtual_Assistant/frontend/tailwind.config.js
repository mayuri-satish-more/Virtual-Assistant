// // /** @type {import('tailwindcss').Config} */
// // export default {
// //   content: [],
// //   theme: {
// //     extend: {},
// //   },
// //   plugins: [],
// // }



// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }



/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        125: '500px', // now you can use max-w-125
      },
      height: {
        150: '600px', // optional: now you can use h-150 instead of h-[600px]
      },
    },
  },
  plugins: [],
}