const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'development',
  target: 'node',
  entry: path.relative(__dirname, 'index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    clean: true
  },
  resolve: {
    alias: {
      app: path.resolve(__dirname, 'app'),
      'config.env': path.resolve(__dirname, 'config.env'),
      '@models': path.resolve(__dirname, 'models'),
      '@views': path.resolve(__dirname, 'views'),
      '@controllers': path.resolve(__dirname, 'controllers'),
      '@utils': path.resolve(__dirname, 'utils'),
      '@routes': path.resolve(__dirname, 'routes'),
      '@database': path.resolve(__dirname, 'database')
    },
    extensions: ['.js', '.ts'],
    modules: ['node_modules', path.join(__dirname, '.')]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  externals: [nodeExternals()]
};
