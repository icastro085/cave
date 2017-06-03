const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: ['./src/js/index.js'],
  watch: false,
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist', 'js'),
  },
  externals: {
    'quintus': 'Quintus',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }],
  },
  plugins: [
    new UglifyJSPlugin(),
  ],
};
