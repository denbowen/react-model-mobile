const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
const {DllReferencePlugin} = require('webpack')
const os = require('os')
const HappyPack = require('happypack')
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length}) //线程数量

const JS_LOADER_ID = 'js' // happyPack打包js的配置id


const files = fs.readdirSync(path.resolve(__dirname, '../dll'))
const plugins = files.map(file => {
  if (/.*\.dll.js/.test(file)) {
    return new AddAssetHtmlWebpackPlugin({
      filepath: path.resolve(__dirname, '../dll', file),
    })

  }
  if (/.*\.manifest.json/.test(file)) {
    return new DllReferencePlugin({
      manifest: path.resolve(__dirname, '../dll', file),
    })
  }
})

/**
 * 基本配置
 * @type {{output: {chunkFilename: string, path: string, filename: string}, entry: {app: string}, plugins: *[], module: {rules: *[]}}}
 */
module.exports = {
  entry: {
    app: './index.js',
  },
  output: {
    path: path.resolve(__dirname, '..', 'dist')
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: `happypack/loader`,
            options: {
              id: JS_LOADER_ID
            }
          },
        ],
      },
      {
        test: /\.(eot|woff2?|ttf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name]-[hash:5].min.[ext]',
              limit: 5000, // fonts file size <= 5KB, use 'base64'; else, output svg file
              publicPath: 'fonts/',
              outputPath: 'fonts/',
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name]-[hash:5].min.[ext]',
              limit: 10000, // size <= 10KB
              outputPath: 'images/',
            },
          },
          // 图片压缩
          {
            loader: 'image-webpack-loader',
            options: {
              // 压缩 jpg/jpeg 图片
              mozjpeg: {
                progressive: true,
                quality: 50, // 压缩率
              },
              // 压缩 png 图片
              pngquant: {
                quality: '65-90',
                speed: 4,
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack',
      filename: 'index.html',
      template: path.resolve(__dirname, '..', 'index.html'),
      minify: {
        collapseWhitespace: true
      }
    }),
    new CleanWebpackPlugin(),
    new HappyPack({
      // 用唯一的标识符 id 来代表当前的 HappyPack 是用来处理一类特定的文件
      id: JS_LOADER_ID,
      // 线程池
      threadPool: happyThreadPool,
      // 如何处理 .js 文件，用法和 Loader 配置中一样
      loaders: [
        {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          },
        }
      ],
    }),
    ...plugins
  ]
}
