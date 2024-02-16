import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import path from "path";

const config = {};

const jsx = {
  test: /\.(js|jsx)$/,
  exclude: /(node_modules|bower_components)/,
  use: {
    loader: "babel-loader",
  },
};

// Entry
config.entry = ["es6-promise/auto", "./src/index.jsx"];

// Output
config.output = {
  chunkFilename: "[name]_[hash].bundle.js",
  filename: "main_[hash].js",
  path: path.resolve(__dirname, "../dist"),
};

// Rules
config.module = { rules: [] };
config.module.rules.push(jsx);

config.resolve = {
  extensions: [".js", ".jsx", ".scss"],
};

config.plugins = [
  new HtmlWebpackPlugin({
    template: "src/index.html",
  }),
  new CopyPlugin([{ from: "src/index.css", to: "index.css" }]),
];

config.devtool = "inline-source-map";
config.mode = "development";

config.devServer = {
  compress: true,
  contentBase: path.resolve(__dirname, "../dist"),
  historyApiFallback: true,
  host: "0.0.0.0",
  hot: true,
  port: 6001,
};

export default config;
