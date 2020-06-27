const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const mode = process.env.NODE_ENV || "development";
const isProd = mode === "production";

const copyPluginConfigs = [
  { from: "static", to: "." },
  { from: __dirname + "/node_modules/bulma/css/bulma.css", to: "css/" },
];

module.exports = {
  mode: mode,
  entry: {
    main: "./src/app.tsx",
  },
  output: {
    path: __dirname + "/dist",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  plugins: [new CopyPlugin({ patterns: copyPluginConfigs })],
  devtool: isProd ? false : "cheap-module-inline-source-map",
  devServer: {
    contentBase: "./dist",
    historyApiFallback: true,
  },
  performance: {
    maxEntrypointSize: 1000000,
    maxAssetSize: 3000000,
  },
  optimization: {
    minimize: isProd,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            pure_funcs: ["console.info", "console.warn", "console.time", "console.timeEnd"],
          },
        },
      }),
    ],
  },
};
