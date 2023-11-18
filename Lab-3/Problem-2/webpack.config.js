const path = require('path');

module.exports = {
  entry: './Assets/Src/index.js', 
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'Assets/Dist'), 
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, '.'),
    },
    compress: true,
    port: 9000,
  },
};