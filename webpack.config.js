/* eslint-env node */
const path = require("path");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");
const glob = require("glob").sync;

module.exports = {
  entry: {
    sprite: glob(path.resolve(__dirname, "src/img/svg/*.svg")),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[hash].js",
  },
  resolve: {
    extensions: [".js", ".scss", ".json", "svg"],
    alias: {
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
      {
        test: /src\/img\/svg\/.*\.svg$/,
        use: [
          {
            loader: "svg-sprite-loader",
            options: {
              extract: true,
              spriteFilename: "icons.[hash].svg",
              runtimeCompat: true,
              outputPath: "img/",
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
    new SpriteLoaderPlugin({
      plainSprite: true,
    }),
  ],
};
