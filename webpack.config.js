const path = require('path');
console.log(__dirname);

module.exports = {
  mode: 'development',
  entry: {
    index: './client/index.mjs',
    login: './client/login/login.mjs'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'client', 'dist'),
  },
};

