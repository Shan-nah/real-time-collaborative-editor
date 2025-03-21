const path = require('path');

module.exports = {
  resolve: {
    fallback: {
      process: require.resolve('process/browser')
    }
  },
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
};
