const HtmlWebPath    = require('html-webpack-plugin')
const MiniCssExtract = require("mini-css-extract-plugin");
const Copy           = require("copy-webpack-plugin"); 
const CssMinimizer   = require('css-minimizer-webpack-plugin');
const Terser         = require('terser-webpack-plugin'); 


module.exports = {

  mode:'production', 

  output:{
    clean: true,
    filename: 'main.[contenthash].js'
  }, 

  module:{
  rules:[
    {
      test: /\.m?js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }, 
  
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          sources: false
        }
      }, 
      {
        test: /\.css$/,
        exclude: /styles.css$/ ,
        use: [ 'style-loader','css-loader']
      }, 
      {
        test: /styles.css$/, 
        use: [ MiniCssExtract.loader , 'css-loader' ]
      }, 
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: 'file-loader'
      }
    ]
  }, 

    optimization: {
      minimize: true, 
      minimizer: [
        new CssMinimizer(),
        new Terser(), 
      ]
    }, 
    plugins: [

      new HtmlWebPath({
        title: ' Mi webpack App',
        template:'src/index.html',         
      }),

      new MiniCssExtract({
        filename: '[name].[fullhash].css', 
        ignoreOrder: false
      }),
      
      new Copy({
        patterns: [
          {from: 'src/assets/', to:'assets/'}
        ]
      })
    ]


  }