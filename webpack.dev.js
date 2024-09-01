const webpack = require("webpack"),
  htmlWebpackPlugin = require("html-webpack-plugin"),
  { CleanWebpackPlugin } = require("clean-webpack-plugin"),
  WorkboxWebpackPlugin = require("workbox-webpack-plugin"),
  path = require("path");

module.exports = {
  mode: "development",
  entry: ["./src/client/index.js"],
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "var",
    library: "Client",
    clean: true,
  },
  optimization: {
    minimize: true,
  },
  plugins: [
    new htmlWebpackPlugin({
      template: "./src/client/views/index.html",
      filename: "./index.html",
    }),
    new CleanWebpackPlugin({
      dry: true,
      verbose: false,
      cleanStaleWebpackAssets: true,
      protectWebpackAssets: false,
    }),
    new WorkboxWebpackPlugin.GenerateSW({
      // Add this plugin
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
};
