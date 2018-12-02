module.exports = {
  entry: __dirname + '/src/tencent-ai.min.ts',
  output: {
    path: __dirname + '/dist',
    filename: 'tencent-ai.min.js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  node: {
    fs: 'empty',
  },
};
