const path = require('path');
const webpack = require('webpack');
const glob = require('glob');
const _ = require('lodash');

module.exports = {
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json'],
  },
  entry: _.zipObject(
    glob.sync('./src/js/main-*.js*').map(f => path.basename(f, path.extname(f))),
    glob.sync('./src/js/main-*.js*').map(f => [
      'webpack-hot-middleware/client?reload=true',
      f,
    ]),
  ),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: {
                  browsers: 'last 2 versions',
                },
              }],
              '@babel/preset-react',
            ],
            plugins: [
              '@babel/proposal-class-properties',
            ],
          },
        },
      },
      {
        test: /\.s*css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ProvidePlugin({
      fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch',
    }),
  ],
  stats: 'minimal',
  devtool: 'cheap-module-eval-source-map',
  watch: true,
};
