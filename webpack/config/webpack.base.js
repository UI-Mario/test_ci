/* eslint-disable indent */
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 显示一个打包进度条
const WebpackBar = require('webpackbar');
// TODO: figure out why this happen(
// ==>should be listed in the project's dependencies,
// ==>not devDependencies.eslint import/no-extraneous-dependencies
// NEW：fix it， add a line in .eslintrc.js(
// ==>"import/no-extraneous-dependencies": ["error", {"devDependencies": true}])

// 把src/下的资源copy到public/
const CopyPlugin = require('copy-webpack-plugin');
// 做了缓存，提高以后的编译速度
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
// 打包ts时提供错误提示
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

// FIXME:启用这个会报错，暂时不明，留着以后学
// const CompressionWebpackPlugin = require('compression-webpack-plugin');
const { isDev, PROJECT_PATH } = require('../constant');
// 提供gzip压缩

// TODO:这个importLoaders到底起了啥作用？
const getCssLoaders = (importLoaders) => [
  'style-loader',
  {
    loader: 'css-loader',
    options: {
      modules: false,
      sourceMap: isDev,
      importLoaders,
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      plugins: [
        // 修复一些和 flex 布局相关的 bug
        //   require('postcss-flexbugs-fixes'),
        //   require('postcss-preset-env')({
        //     autoprefixer: {
        //       grid: true,
        //       flexbox: 'no-2009',
        //     },
        //     stage: 3,
        //   }),
        //   // eslint-disable-next-line global-require
        //   require('postcss-normalize'),
      ],
      sourceMap: isDev,
    },
  },
];

module.exports = {
  entry: {
    app: resolve(PROJECT_PATH, './src/index.tsx'),
  },
  output: {
    filename: `js/[name]${isDev ? '' : '.[hash:8]'}.js`,
    path: resolve(PROJECT_PATH, './dist'),
  },
  resolve: {
    // 新增了 resolve属性，在 extensions 中定义好文件后缀名后，在 import 某个文件的时候，
    // 就可以不加文件后缀名了。webpack 会按照定义的后缀名的顺序依次处理文件，比如上文配置 ['.tsx', '.ts', '.js', '.json']，
    // webpack 会先尝试加上 .tsx后缀，看找得到文件不，如果找不到就依次尝试进行查找，所以我们在配置时尽量把最常用到的后缀放到最前面，可以缩短查找时间。
    extensions: ['.tsx', '.ts', '.js', '.json'],
    // 路径别名，在tsconfig.json里也有设置
    // 这里设置只是让编辑器不标红，有提示等
    alias: {
      Src: resolve(PROJECT_PATH, './src'),
      Components: resolve(PROJECT_PATH, './src/components'),
      Utils: resolve(PROJECT_PATH, './src/utils'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(PROJECT_PATH, './public/index.html'),
      filename: 'index.html',
      cache: false, // TODO
      minify: isDev // TODO
        ? false
        : {
            // 去注释
            removeAttributeQuotes: true,
            collapseWhitespace: true,
            removeComments: true,
            collapseBooleanAttributes: true,
            collapseInlineTagWhitespace: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            minifyCSS: true,
            minifyJS: true,
            minifyURLs: true,
            useShortDoctype: true,
          },
    }),
    new CopyPlugin({
      patterns: [
        {
          context: resolve(PROJECT_PATH, './public'),
          from: '*',
          to: resolve(PROJECT_PATH, './dist'),
          toType: 'dir',
        },
      ],
    }),
    new WebpackBar({
      name: isDev ? '正在启动' : '正在打包',
      color: '#fa8c16',
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: resolve(PROJECT_PATH, './tsconfig.json'),
      },
    }),
    new HardSourceWebpackPlugin(),
    // new CompressionWebpackPlugin({
    //   asset: '[path].gz[query]',
    //   algorithm: 'gzip',
    //   test: new RegExp('\\.(js|css)$'),
    //   // 只处理大于xx字节 的文件，默认：0
    //   threshold: 10240,
    //   // 示例：一个1024b大小的文件，压缩后大小为768b，minRatio : 0.75
    //   minRatio: 0.8, // 默认: 0.8
    //   // 是否删除源文件，默认: false
    //   deleteOriginalAssets: false,
    // }),
  ],
  module: {
    rules: [
      {
        test: /\.(tsx?|js)$/,
        loader: 'babel-loader',
        options: { cacheDirectory: true },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: getCssLoaders(1),
      },
      {
        test: /\.less$/,
        use: [
          ...getCssLoaders(2),
          {
            loader: 'less-loader',
            options: {
              sourceMap: isDev,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          ...getCssLoaders(2),
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDev,
            },
          },
        ],
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10 * 1024,
              name: '[name].[contenthash:8].[ext]',
              outputPath: 'assets/images',
            },
          },
        ],
      },
      {
        test: /\.(ttf|woff|woff2|eot|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[contenthash:8].[ext]',
              outputPath: 'assets/fonts',
            },
          },
        ],
      },
    ],
  },
};
