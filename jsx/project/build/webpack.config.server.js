const path = require('path');

module.exports = {
  target: "node",
  entry: {
    app: path.resolve(__dirname, '../client/server-entry.js')
  },
  output: {
    filename: 'server-entry.js',
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/public",
    libraryTarget: "commonjs2"
  },
  module: {
    rules: [
      {test: /.jsx$/, loader: 'babel-loader'},
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: [
          path.resolve(__dirname, '../node_modules')
        ],
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
};