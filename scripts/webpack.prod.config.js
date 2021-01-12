const merge = require('webpack-merge');
const os = require('os')
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const {loader: CssLoader} = MiniCssExtractPlugin;

// 线程数
const THREAD_COUNT = os.cpus().length;

const baseConfig = require('./webpack.base.config')

module.exports = merge(baseConfig, {
  mode: 'production',
  output: {
    filename: '[name].[chunckhash].js',
    chunkFilename: '[name].[chunckhash].js',
    publicPath: './'
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true, // 开启缓存
        parallel: THREAD_COUNT, // 多线程
      })
    ],
    splitChunks: {
      chunks: 'all',
    }
  },
  module: {
    rules: [
      {
        test: /\.css/,
        use: [
          CssLoader,
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.less/,
        use: [
          CssLoader,
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].[contenthash:8].css'
    }),
  ]
})
