// const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
// const webpack = require("webpack");

// module.exports = function override(config, env) {
//   config.plugins = (config.plugins || []).concat([
//     new NodePolyfillPlugin(),
//     new webpack.ProvidePlugin({
//       process: "process/browser", // Polyfill for process
//       Buffer: ["buffer", "Buffer"], // Polyfill for Buffer
//     }),
//   ]);

//   config.resolve.fallback = {
//     crypto: require.resolve("crypto-browserify"),
//     os: require.resolve("os-browserify/browser"),
//     process: require.resolve("process/browser"),
//   };

//   return config;
// };
