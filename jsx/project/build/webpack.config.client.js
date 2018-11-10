const path = require('path');
const webpack = require('webpack');
const HTMLPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const config = {
  entry: {
    app: path.join(__dirname, '../client/app.js')
  },
  output: {
    filename: '[name].[hash].js',
    path: path.join(__dirname, "../dist"),
    publicPath: ""
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /.(js|jsx)$/,
        loader: 'eslint-loader',
        exclude: [
          path.resolve(__dirname, '../node_modules')
        ]
      },
      {
        test: /.jsx$/,
        exclude: [
          path.join(__dirname, '../node_modules')
        ],
        include: [path.join(__dirname, '../client')],
        use: {
          loader: "babel-loader",
          options: {
            presets: ['es2015', 'stage-1', 'react'],
            plugins: [
              "transform-decorators-legacy",
              "react-hot-loader/babel"
            ]
          }
        },
      },
      {
        test: /.js$/,
        exclude: [
          path.join(__dirname, '../node_modules')
        ],
        include: [path.join(__dirname, '../client')],
        use: {
          loader: "babel-loader",
          options: {
            presets: ['es2015', 'stage-1', 'react'],
            plugins: [
              "transform-decorators-legacy",
              "react-hot-loader/babel"
            ]
          }
        },
      }
    ]
  },
  plugins: [
    new HTMLPlugin({
      template: path.join(__dirname, '../client/template.html')
    })
  ]
};

if (isDev) {
  config.entry = {
    app: [
      'react-hot-loader/patch',
      path.join(__dirname, '../client/app.js')
    ]
  };
  config.devServer = {
    host: '0.0.0.0',
    port: '8888',
    contentBase: path.join(__dirname, '../dist'),
    hot: true,
    overlay: {
      errors: true
    },
    publicPath: '',
    // historyApiFallback: {
    //   index: '/public/index.html'
    // }
  };
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
} else {
  config.entry = {
    app: path.join(__dirname, '../client/app.js'),
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'react-router-dom',
      'mobx',
      'mobx-react',
      'axios',
      'dateformat',
      'antd'
    ]
  };
  config.output.filename = '[name].[chunkhash].js';
  config.plugins.push(
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.NamedChunksPlugin((chunk) => {
      if (chunk.name) {
        return chunk.name;
      }
      return chunk.mapModules(m => path.relative(m.context, m.request)).join('_')
    })
  );
  config.optimization = {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: false
        }
      })
    ],
    splitChunks: {
      cacheGroups: {
        commons: {
          name: "commons",
          chunks: "initial",
          minChunks: 2
        }
      }
    }
  };
}
module.exports = config;
