// craco.config.js
module.exports = {
    style: {
      postcss: {
        plugins: [
          require('tailwindcss'),
          require('autoprefixer'),
        ],
      },
    },
    webpack: {
      configure: {
        optimization: {
          minimize: false
        }
      },
      plugins: {
        remove: ["TerserPlugin"]
      }
    }
  }