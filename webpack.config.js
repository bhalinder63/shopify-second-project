/*eslint-env node*/

const glob = require('glob');
const webpack = require('webpack');
const path = require('path'); //get absolute paths
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //extract css from js imports
const CopyPlugin = require('copy-webpack-plugin'); //copy assets p.s, webpack also watch for all the copied files
const WebpackShellPluginNext = require('webpack-shell-plugin-next'); //execute shell commands
const mode =
  process.env.NODE_ENV === 'development' ? 'development' : 'production';
const stats = mode === 'development' ? 'errors-only' : { children: false }; //hide or show warning
const { VueLoaderPlugin } = require('vue-loader');
require('dotenv').config();
const storeUrl = process.env.STORE_URL;
const themeId = process.env.THEME_ID;
console.log(storeUrl);
const templateEntryPoints = glob
  .sync('./src/js/templates/**/**.js')
  .reduce((acc, path) => {
    const entry = path.replace(/^.*[\\\/]/, '').replace('.js', '');
    acc[entry] = path;
    return acc;
  }, {});

const layoutEntryPoints = glob
  .sync('./src/js/layout/**.js')
  .reduce((acc, path) => {
    const entry = path.replace(/^.*[\\\/]/, '').replace('.js', '');
    acc[entry] = path;
    return acc;
  }, {});

module.exports = {
  mode,
  stats,
  entry: {
    ...templateEntryPoints,
    ...layoutEntryPoints,
  }, //webpack supports multiple entry as an object  {chunkname: entrypath}
  resolve: {
    alias: {
      Styles: path.resolve(__dirname, 'src/styles/'),
      vue: 'vue/dist/vue.cjs.js',
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(sc|sa|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false,
            },
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  output: {
    clean: true,
    filename: './assets/bundle.[name].js',
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: './assets/bundle.[name].js?[chunkhash]', //added chunkhash for dynamically created chunk, else browser wont know if file has been changed and will show cached version.
  },

  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: './assets/bundle.[name].css',
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify({
        STOREFRONT_ACCESS_TOKEN: process.env.STOREFRONT_ACCESS_TOKEN,
        API_ENDPOINT: process.env.API_ENDPOINT,
      }),
    }),
    new CopyPlugin({
      patterns: [
        //breaking change in webpack5 compability
        {
          from: 'src/shopify/templates/customers/**/*',
          to: 'templates/customers/[name][ext]',
        },
        {
          from: 'src/shopify/snippets/**/*',
          to: 'snippets/[name][ext]',
        },
        {
          from: 'src/shopify/sections/**/*',
          to: 'sections/[name][ext]',
        },
        {
          from: 'src/shopify/templates/**/*',
          to: 'templates/[name][ext]',
        },
        {
          from: 'src/shopify/layout/**/*',
          to: 'layout/[name][ext]',
        },
        {
          from: 'src/shopify/locales/*.json',
          to: 'locales/[name][ext]',
        },
        {
          from: 'src/shopify/config/*.json',
          to: 'config/[name][ext]',
        },
        {
          from: 'src/shopify/assets/**/*',
          to: 'assets/[name][ext]',
        },
        {
          from: '.shopifyignore',
          to: '[name][ext]',
        },
      ],
    }),
  ],
};

//treeshake and watch on development
if (mode === 'development') {
  module.exports.devtool = false;
  module.exports.plugins.push(
    new WebpackShellPluginNext({
      onBuildStart: {
        scripts: ['echo Webpack build in progress...🛠'],
      },
      onBuildEnd: {
        scripts: [
          'echo Build Complete 📦',
          `shopify theme dev -s ${storeUrl} -t ${themeId} --path dist`,
        ],
        parallel: true, //this is required to make webpack watch run in background.
      },
    })
  );
}

//minification,create chunks,treeshake on production
if (mode === 'production') {
  module.exports.optimization = {
    usedExports: true, //check for ununsed exports for treeshaking within file
    splitChunks: {
      usedExports: true, //check for ununsed exports for treeshaking within chunk
      cacheGroups: {
        default: false, //override default
        Vendors: {
          //create a seperate chunk for vendor
          test: /[\\/]node_modules[\\/]/, //required both / & \ to support cross platform between unix and windows
          name: 'vendors', //only create chunk for dependencies
          chunks: 'all', //create chunk for all sync , async and cjs modules
          type: /javascript/,
          enforce: true, // ignores minSize: 2000, minChunks: 1,priority: 0,
        },
        common: {
          //create a common chunk
          chunks: 'all', //create chunk for all sync , async and cjs modules
          minChunks: 2, //minimum import for creating chunk
          name: 'common',
          priority: -20, //-ve value denotes that it will be in lowest priority
          minSize: 1000, //minimum size that required for creating a chunk, we would not want just few lines of code getting chunked together, so minimum size set to 1kb
          type: /javascript/,
        },
      },
    },
  };
}
