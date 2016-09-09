var path = require('path');
var webpack = require('webpack');


module.exports = {
    entry: path.resolve(__dirname, 'app/routes/server.js'),
    output: {
        path: path.resolve(__dirname, 'app/public/javascripts'),
        filename: 'pack.js',
        // libraryTarget: 'umd',
        // library: 'Awesomemular',
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
        }
      ]
    },
    plugins: [
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
      new webpack.DefinePlugin({
        'process.env':{
          'NODE_ENV': JSON.stringify('production')
        }
      }),
    ]
};