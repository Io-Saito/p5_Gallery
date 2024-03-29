const path = require('path');

module.exports = {
  // production の場合、最適化された状態で出力される
  // development の場合、ソースマップが有効でJSファイルが出力される
  mode: 'development',

  // エントリーポイント
  entry: './src/main.ts',
  module: {
    rules: [
      {
        // 拡張子 .ts の場合
        test: /\.ts$/,
        // TypeScript をコンパイルする
        use: "ts-loader",
        type: "javascript/auto"
      }
    ]
  },
  // import 文で .ts ファイルを解決する
  resolve: {
    modules: [
      "node_modules"
    ],
    extensions: [".ts", ".js"]
  }
};