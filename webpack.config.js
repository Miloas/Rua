/*eslint-env node*/
const path = require('path')
const webpack = require('webpack')
const Copy = require('Copy-webpack-plugin')

const nodeEnv = process.env.NODE_ENV || 'development'
const isProd = nodeEnv === 'production'

module.exports = {
  devtool: isProd? 'hidden-source-map' : 'cheap-eval-source-map',
  entry: './lib/index.js',
  output: {
    path: path.join(__dirname, 'app', 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      // 'process.env': {
      //   // NODE_ENV: JSON.stringify(nodeEnv)
      // }
     'process.env.NODE_ENV': JSON.stringify(nodeEnv)
    }),
    new Copy([
      {
        from: './assets',
        to: './assets'
      }
    ])
  ],
  target: 'electron'
};
