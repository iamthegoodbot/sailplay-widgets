var webpack = require('webpack');

module.exports = {
  debug: 'eval',

  entry: ['webpack/hot/dev-server', './src/js/app.js'],

  output: {
    path: __dirname + '/build',
    publicPath: 'http://localhost:8080/build/',
    filename: 'app.js'
  },

  devServer: {
    contentBase: './build',
    hot: true,
    info: false,
    inline: true
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
    new webpack.HotModuleReplacementPlugin()
  ],

  resolve: {
    extension: ['', '.js', '.jsx']
  }
};
