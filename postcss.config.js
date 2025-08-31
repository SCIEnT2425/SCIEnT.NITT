// module.exports = {
//     plugins: [
//         require('postcss-safe-parser'),
//         require('cssnano')({
//             preset: ['default', {
//                 discardComments: {
//                     removeAll: true,
//                 },
//                 normalizeWhitespace: false,
//             }],
//         }),
//     ],
// };
module.exports = {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    }
  }