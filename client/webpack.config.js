const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  entry: './app/index.js',

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js',
    publicPath: '/'
  },

  mode: 'development',
  devtool: 'source-map',

  devServer: {
    static: path.join(__dirname, './dist'),
    port: 8080,
    host: '0.0.0.0',
    historyApiFallback: true,
    headers: {
      'Cache-Control': 'no-store',
    },
    proxy: {
       '/': {
            target: 'http://localhost:8080',
            router: () => 'http://localhost:8088',
            logLevel: 'debug'
       }
    }
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader', "postcss-loader"
        ]
      },
    ]
  },

  resolve: {
    extensions: [ '.js', '.jsx', '.json' ]
  },

  optimization: {
    minimize: true
  },

  plugins: [
    new webpack.DefinePlugin({
      // 'process.env.NODE_ENV': JSON.stringify('development'),
      // 'process.env.GOOGLE_CLIENT_ID': JSON.stringify(process.env.GOOGLE_CLIENT_ID),
      // 'process.env.GOOGLE_CLIENT_SECRET': JSON.stringify(process.env.GOOGLE_CLIENT_SECRET), 
      // 'process.env.NEXTAUTH_URL': JSON.stringify(process.env.NEXTAUTH_URL),
      // 'process.env.NEXTAUTH_SECRET': JSON.stringify(process.env.NEXTAUTH_SECRET),
      'process.env': JSON.stringify(process.env),
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './app/index.html',
      favicon: './favicon.ico',
    }),
    new MiniCssExtractPlugin({ 
      filename: 'index.css',
      chunkFilename: 'index.css'
    }),
  ]
}