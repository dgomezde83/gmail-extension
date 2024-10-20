// webpack.config.js
const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/contentScript.ts',
  output: {
    filename: 'contentScript.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin(
       {
         process: 'process/browser',
       }
    ),
]
};