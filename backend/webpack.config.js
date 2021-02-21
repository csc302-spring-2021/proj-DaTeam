const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: "./src/Server.ts",
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  target: "node",
  externals: [nodeExternals({ allowlist: ["@dateam/shared"] })],
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "Server.js",
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ["ts-loader"],
      },
    ],
  },
};
