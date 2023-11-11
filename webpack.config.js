const path = require('path');

module.exports = {
    entry: "./Lab-3/Problem-2/index.mjs",
    devServer: {
      static: {
        directory: path.join(__dirname, './Lab-3/Problem-2'),
      },
      compress: true,
      port: 9000,
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
      },
      mode: "development",
  };