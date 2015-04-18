var webpack = require('webpack');

module.exports = {
  debug: 'eval',

  entry: ['./src/js/app.js'],

  output: {
    path: __dirname + '/dist',
    publicPath: 'http://localhost:8080/dist/',
    filename: 'app.js'
  },

  externals: {
    'SAILPLAY': 'SAILPLAY'
  },

  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ['react-hot', 'babel-loader']
    }]
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new webpack.NoErrorsPlugin()
  ],

  resolve: {
    extension: ['', '.js', '.jsx']
  }
};
