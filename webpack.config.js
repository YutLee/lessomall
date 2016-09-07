var path = require('path');


module.exports = {
    entry: path.resolve(__dirname, 'app/routes/server.js'),
    output: {
        path: path.resolve(__dirname, 'app/public/javascripts'),
        filename: 'pack.js',
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
    }
};