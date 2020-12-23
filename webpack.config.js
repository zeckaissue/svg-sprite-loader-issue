/* eslint-env node */
const path = require("path");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");
const glob = require("glob").sync;

// const webpackMode = argv.production ? "production" : "development";
module.exports = {
  devtool: "source-map",
  entry: {
    sprite: glob(path.resolve(__dirname, "src/img/svg/*.svg")),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[fullhash].js",
  },
  resolve: {
    extensions: [".js", ".scss", ".json", "svg"],
    alias: {
      // !!! dont forget to add alias to jsconfig.json for intelisens
      "@": path.resolve(__dirname, "src/"),
    },
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      {
        test: /\.scss$/,
        use: [
          // Extract and save the final CSS.
          MiniCssExtractPlugin.loader,
          // Load the CSS, set url = false to prevent following urls to fonts and images.
          {
            loader: "css-loader",
            options: { url: false, importLoaders: 1, sourceMap: true },
          },
          // Add browser prefixes and minify CSS.
          {
            loader: "postcss-loader",
          },
          // Load the SCSS/SASS
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /src\/img\/svg\/.*\.svg$/, // your icons directory
        use: [
          {
            loader: "svg-sprite-loader",
            options: {
              extract: true,
              spriteFilename: "icons.svg",
              runtimeCompat: true,
              outputPath: "img/sprites/",
            },
          },
          "svg-transform-loader",
          "svgo-loader",
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new WebpackManifestPlugin({
      publicPath: "",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[fullhash].css",
    }),
    new SpriteLoaderPlugin({
      plainSprite: true,
    }),
  ],
};
