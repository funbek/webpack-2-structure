const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractStyles = new ExtractTextPlugin('app.css');

const config = {
  context: path.resolve(__dirname, './src'),
  entry: {
      app: './js/app.js',
      admin: './js/admin.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name].bundle.js',
    publicPath: path.resolve(__dirname, '.'), //for local server
    library: 'myClassName' // Use function global
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      filename: 'commons.js', // Common part in commons.js
      minChunks: 2,
    }),
    new webpack.ProvidePlugin({ // Load jQuery all the time if it find $ symbol or jQuery
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery'
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, './src'),
  },
  module: {
    rules: [
      {
        test: /\.js$/, // pass through babel-loader
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015']
        }
      },
      {
        test: /(\.woff2?|\.woff|\.ttf|\.eot|\.svg)(\?v=\d+\.\d+\.\d+)?$/, //load fonts
        loader: 'file?name=[name]-[hash:6].[ext]',
      },
      {
        test: /\.(png|jpe?g|gif|ico)$/, // load image
        loader: 'file?name=[name].[ext]',
      },
      {
        test: /\.(sass|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: "css-loader",
              options: {
                sourceMap: true
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true
              }
            }
          ]
        })
      }
    ]
  },
  resolve: { // help webpack search on src then node_modules
    modules: [path.resolve(__dirname, './src'), 'node_modules']
  },
  plugins: [
    new ExtractTextPlugin({ // compile scss files to one file
      filename: 'css/[name].bundle.css', // Split output files css
      allChunks: true,
    }),
  ]
};


module.exports = config;