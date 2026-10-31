const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/app.js',
  devtool: false,
  output: { path: path.resolve(__dirname, 'dist'), filename: 'assets/app.[contenthash].js', clean: true },
  plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
  devServer: { historyApiFallback: true, port: 3000 }
};
