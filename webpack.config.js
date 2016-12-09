var path = require('path');
var webpack = require('webpack');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var ExtractTextPlugin  = require('extract-text-webpack-plugin');


module.exports = {
    entry: {
      'index': path.resolve(__dirname, './src/client/index.js')
    },
    output: {
        path: path.resolve(__dirname, './server/public/javascripts'),
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
        {
          test: /\.css$/, // Only .css files
          loader: 'style!css' // Run both loaders
        },
        {
          test: /\.scss$/,
          loader: 'style!css!scss'
        },
      ],
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
      new ExtractTextPlugin("./server/public/stylesheets/[name].css?[hash]-[chunkhash]-[contenthash]-[name]", {
          disable: false,
          allChunks: true
      })
    ]
};
