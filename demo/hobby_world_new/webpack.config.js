const webpack = require('webpack')
const path = require('path')

module.exports = {

  entry: {
    'sailplay.magic.min': './src/js/main.js',
  },

  // for production
  devtool: 'source-map',

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js'
  },

  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'jquery': 'jQuery',
      'vue$': 'vue/dist/vue.esm.js',
      'img': path.resolve(__dirname, 'src/img'),
    }
  },

  module: {
    rules: [

      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      },

      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            stylus: 'vue-style-loader?sourceMap=true!css-loader?sourceMap=true!stylus-loader?sourceMap=true'
          }
        }
      },

      {
        test: /\.(?:png|jpg|svg)$/,
        loader: 'url-loader',
        query: {
          // Inline images smaller than 10kb as data URIs
          // limit: 20000
        }
      }

    ]
  },

  plugins: [

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),

    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true
    }),

  ]

}