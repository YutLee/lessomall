var path = require('path');
var webpack = require('webpack');

var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var ExtractTextPlugin  = require('extract-text-webpack-plugin');

// let postcssSprites = require('postcss-sprites');
// let sprites = postcssSprites.default;
let precss = require('precss');
// let assets = require('postcss-assets');
let autoprefixer = require('autoprefixer');


module.exports = {
    entry: {
      post: path.resolve(__dirname, './src/client/post/style.js'),
      index: path.resolve(__dirname, './src/client/index.js')
    },
    output: {
        path: path.resolve(__dirname, './build/server/public/javascripts'),
        filename: '[name].js',
        // libraryTarget: 'umd',
        // library: 'Awesomemular',
        // publicPath: '/scripts/',
        // chunkFilename: '[name]-[chunkhash].js'
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel', // 'babel-loader' is also a legal name to reference
          query: {
            presets: ['react', 'es2015']
          }
        },
        {
          test: /\.(png|jpg|gif)$/,
          loader: 'url-loader?limit=8192' //  <= 8kb的图片base64内联
        },
        // {
        //   test: /\.css$/, // Only .css files
        //   loaders: [ // Run both loaders
        //     'style-loader',
        //     'css-loader?importLoaders=1',
        //     'postcss-loader'
        //   ]
        // },
        // {
        //   test: /\.scss$/,
        //   loader: 'style!css!scss'
        // },
        {
            test: /\.css$/,
            loader:  ExtractTextPlugin.extract("style-loader","css-loader!postcss-loader")
        },
        //     {
        //     test:  /\.scss$/,
        //      loader:  "style!css!sass"
        // },
        //     {
        //     test:  /\.less$/,
        //      loader:  "style!css!less"
        // },
      ],
    },
    postcss: function() {
      return [autoprefixer, precss]
    },
    plugins: [
      new CommonsChunkPlugin({
        name : 'common',
        filename: 'common.js',
        minChunks: 3
      }),
      new webpack.optimize.UglifyJsPlugin({
        output: {
          comments: false  // remove all comments
        },
        compress: {
          warnings: false
        },
        sourceMap: false,
        mangle: false
      }),
      // production
      new webpack.DefinePlugin({
        'process.env':{
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new ExtractTextPlugin('../stylesheets/[name].css', { //?[hash]-[chunkhash]-[contenthash]-[name]', {
        disable: false,
        allChunks: true
      })
    ]
};


// //雪碧图相关代码
// let spritesConfig = sprites({
//   retina: true,//支持retina，可以实现合并不同比例图片
//   verbose: true,
//   spritePath: './public/images/',//雪碧图合并后存放地址
//   stylesheetPath: './public',
//   basePath: './',
//   filterBy: function (image) {
//     //过滤一些不需要合并的图片，返回值是一个promise，默认有一个exist的filter
//     //
//     if (image.url.indexOf('/images/sprites/') === -1) {
//         return Promise.reject();
//     }
//     return Promise.resolve();
//   },
//   groupBy: function (image) {
//     //将图片分组，可以实现按照文件夹生成雪碧图
//     return spritesGroupBy(image);
//   },
//   hooks: {
//     onUpdateRule: function (rule, comment, image) {
//       //更新生成后的规则，这里主要是改变了生成后的url访问路径
//       return spritesOnUpdateRule(true, rule, comment, image);
//     },
//     onSaveSpritesheet: function(opts, groups) {
//       return spritesOnSaveSpritesheet(true, opts, groups);
//     }
//   }
// });

// export function spritesGroupBy(image) {
//   let groups = /\/images\/sprites\/(.*?)\/.*/gi.exec(image.url);
//   let groupName = groups ? groups[1] : group;
//   image.retina = true;
//   image.ratio = 1;
//   if (groupName) {
//       let ratio = /@(\d+)x$/gi.exec(groupName);
//       if (ratio) {
//           ratio = ratio[1];
//           while (ratio > 10) {
//               ratio = ratio / 10;
//           }
//           image.ratio = ratio;
//       }
//   }
//   return Promise.resolve(groupName);
// }

// export function spritesOnUpdateRule(isDev, rule, comment, image){
//   var spriteUrl = image.spriteUrl;
//   image.spriteUrl = '/public/' + spriteUrl;
//   postcssSprites.updateRule(rule, comment, image);
// }

// export function spritesOnSaveSpritesheet(isDev, opts, groups) {
//   let file = postcssSprites.makeSpritesheetPath(opts, groups);
//   return file;
// }