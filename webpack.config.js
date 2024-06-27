const path = require('path');
console.log(__dirname);

module.exports = {
  mode: 'development',
  entry: {
    // main: './public/main.mjs',
    // header: './public/header.mjs',
    index: './client/index.mjs',
    // cart: './public/cart.mjs',
    // checkout: './public/checkout.mjs',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'client', 'dist'),
  },
};

