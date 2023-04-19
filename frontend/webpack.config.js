import path from "path";
import { fileURLToPath } from 'url';
import HTMLWebpackPlugin from 'html-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: {
    bundle: path.resolve(__dirname, './src/index.jsx'),
  },
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, "public"),
    filename: '[name][contenthash].js',
    clean: true,
    assetModuleFilename: '[name][ext]',
  },
  resolve: {
    extensions: ['.js','.jsx','.json'] 
  },
  module:{
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use:  {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      { 
        test: /\.css$/, 
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: () => [
                  require('autoprefixer')
                ]
              }
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ]
  },
  devServer: {
    historyApiFallback: true,
    port: 3000,
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: 'moonbloggers',
      filename: 'index.html',
      template: './template.html',
    }),
  ]
}