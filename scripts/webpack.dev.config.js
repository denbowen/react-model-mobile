const merge = require('webpack-merge')
const path = require('path')
const os = require('os')

const baseConfig = require('./webpack.base.config')

/**
 * 获取本机的ip地址
 * @returns {string}
 */
const getIPAddress = () => {
  let interfaces = os.networkInterfaces()
  for (let devName in interfaces) {
    let iface = interfaces[devName]
    for (let i = 0; i < iface.length; i++) {
      let alias = iface[i]
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address
      }
    }
  }
}
const myHost = getIPAddress()

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'source-map', // 调试源码
  output: {
    filename: '[name].[chunckhash].js',
    chunkFilename: '[name].[chunckhash].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.css/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.less/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[name]__[local]__[hash:base64:5]',
              },
            },
          },
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.less/,
        include: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, '../dist/'),
    historyApiFallback: true,
    open: true,
    hot: true,
    overlay: true,
    host: myHost,
    port: 8277,
    proxy: {
      '/cgi-bin': {
        target: 'https://api.weixin.qq.com',
        changeOrigin: true,
      },
      '/wxa': {
        target: 'https://api.weixin.qq.com',
        changeOrigin: true,
      }
    },
  }
})
