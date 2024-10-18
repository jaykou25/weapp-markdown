const path = require('path')

const webpack = require('webpack')

const isDev = process.argv.indexOf('--develop') >= 0
const isWatch = process.argv.indexOf('--watch') >= 0
const demoSrc = path.resolve(__dirname, './demo')
const demoDist = path.resolve(__dirname, '../miniprogram_dev')
const src = path.resolve(__dirname, '../src')
const dev = path.join(demoDist, 'components')
const dist = path.resolve(__dirname, '../miniprogram_dist')

module.exports = {
  entry: ['index'],

  isDev,
  isWatch,
  srcPath: src, // 源目录
  distPath: isDev ? dev : dist, // 目标目录

  demoSrc, // demo 源目录
  demoDist, // demo 目标目录

  wxss: {
    less: false, // 使用 less 来编写 wxss
    sourcemap: false, // 生成 less sourcemap
  },

  js: {
    webpack: true, // 使用 webpack 来构建 js
  },

  webpack: {
    mode: 'production',
    output: {
      filename: '[name].js',
    },
    target: 'node',
    stats: 'normal',
    module: {
      rules: [
        {
          test: /\.js$/i,
          use: [
            {
              loader: './tools/prismjs-loader',
            },
          ],
        },
        {
          test: /\.js$/i,
          use: [
            {
              loader: 'babel-loader',
            },
          ],
        },
        {
          test: /\.ts$/,
          use: [
            {
              loader: 'babel-loader',
            },
            {
              loader: 'ts-loader',
              options: {
                appendTsSuffixTo: [/\.vue$/],
                happyPackMode: true,
              },
            },
            // {
            //   loader: 'eslint-loader',
            // },
          ],
        },
      ],
    },
    resolve: {
      // modules: [src, 'node_modules'],
      modules: ['node_modules'],
      extensions: ['.js', '.json'],
      // mainFields: ['browser', 'module', 'main', 'exports.development'],
    },
    plugins: [
      new webpack.DefinePlugin({}),
      new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
    ],
    optimization: {
      minimize: false,
    },
    performance: {
      hints: 'warning',
      assetFilter: (assetFilename) => assetFilename.endsWith('.js'),
    },
  },

  copy: [
    './assets',
    'material-palenight.wxss',
    'weui.wxss',
    './treeNode/util.wxs',
  ], // 将会复制到目标目录
}
