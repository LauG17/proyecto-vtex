const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    app: './src/app.js',
    registro: './src/registro.js',
    firebase: './src/firebaseco.js',
    proyeccion: './src/proyeccion.js'

  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html',
      chunks: ['app'],
      //inject: 'body' 
    }),
    new HtmlWebpackPlugin({
      template: 'registro.html',
      filename: 'registro.html',
      chunks: ['registro'],
      //inject: 'body' 
    }),
    new HtmlWebpackPlugin({
      template: 'proyeccion.html',
      filename: 'proyeccion.html',
      chunks: ['proyeccion'],
      //inject: 'body' 
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: false,
    port: 9000,
    hot: true,
    historyApiFallback: true
  }
};
