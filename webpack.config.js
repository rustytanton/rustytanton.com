var CopyPlugin = require("copy-webpack-plugin");
var CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
var ESLintPlugin = require('eslint-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var path = require('path');
var StylelintPlugin = require('stylelint-webpack-plugin');
var TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  devServer: {
    static: {
      directory: path.join(__dirname, 'src'),
    },
    compress: true,
    port: 9000,
  },
  devtool: 'inline-source-map',
  entry: './src/scripts/index.ts',
  mode: 'development',  
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /.*\.html$/,
        loader: 'raw-loader',
      },
      {
        test: /.*\.html$/,
        loader: 'string-replace-loader',
        options: {
          multiple: [
            {search: '{{DATE_TODAY}}', flags: 'g', replace: function() {
              var months = [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
              ]
              var d = new Date()
              return months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear()
            }},
            {search: '{{VERSION}}', flags: 'g', replace: function() {
              return new Date().getTime()
            }},
          ]
        }
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      }
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin()
    ]
  },
  output: {
    filename: 'scripts.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new ESLintPlugin({
      files: 'src/scripts'
    }),
    new StylelintPlugin({
      files: 'src/styles/**/*'
    }),
    new HtmlWebpackPlugin({
      hash: true,
      template: './src/index.html',
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: "styles.css"
    }),
    new CopyPlugin({
      patterns: [
        { from: "./src/assets", to: "assets" },
        {
          from: "./src/sitemap.xml",
          to: "sitemap.xml",
          transform: function(content) {
            var d = new Date()
            var month = (d.getMonth() > 9) ? d.getMonth() : '0' + d.getMonth()
            var day = (d.getDate() > 9) ? d.getDate() : '0' + d.getDate()
            return content
              .toString()
              .replace('{{LASTMOD}}', d.getFullYear() + '-' + month + '-' + day)
          }
        },
      ],
    })
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};