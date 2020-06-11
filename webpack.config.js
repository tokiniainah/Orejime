/**
 * Dependencies
 */
let webpack = require('webpack')
let path = require('path')
let fs = require('fs')
let chalk = require('chalk')
let del = require('del')
let { argv } = require('yargs')

let AutoPrefixer = require('autoprefixer')
let Sass = require('sass')
let CopyWebpackPlugin = require('copy-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
let StyleLintWebpackPlugin = require('stylelint-webpack-plugin')
let UglifyJsPlugin = require('uglifyjs-webpack-plugin')
let PostCssCustomSelectors = require('postcss-custom-selectors')
let PostCssCustomMedia = require('postcss-custom-media')
let PostCssSelectorMatches = require('postcss-selector-matches')
let PostCssCalc = require('postcss-calc')
let PostCssInlineSvg = require('postcss-inline-svg')
let PostCssReporter = require('postcss-reporter')
let PostCssReplace = require('postcss-replace')

/**
 * Constant
 */
const NAMESPACE = 'orejime'
const ENV = argv.env
const PRODUCTION = ENV !== 'development'
const FIX = !PRODUCTION
const PUBLIC_PATH = 'assets/'

/**
 * Paths
 * @type {Object}
 */
let paths = {
  assets: 'resources',
  dist: 'assets'
}

/**
 * Utils fn
 * @type {Object}
 */
let utils = {
  /**
   * Resole asset source path
   * @method assetsPath
   * @param {String} asset Asset name
   * @return {String} Asset full source path
   */
  assetsPath: asset => path.resolve(paths.assets, asset),

  /**
   * Resolve assets dist path
   * @method distPath
   * @param {String} asset Asset name
   * @return {String} Asset full dist path
   */
  distPath: asset => path.resolve(paths.dist, asset),

  /**
   * Cleanup dist folder
   * @method cleanup
   * @return {Void}
   */
  cleanup () {
    console.info(chalk.bold.red('Cleanup dist folder'))
    del.sync(path.resolve(paths.dist), { dryRun: true })
    console.log('\n')
  }
}

/**
 * Eslint loader options
 */
let eslintLoaderOptions = { fix: FIX }

/**
 * CSS loader options
 */
let cssLoaderOptions = {
  url: false,
  sourceMap: true,
  importLoaders: 0
}

/**
 * SASS loader options
 */
let sassLoaderOptions = {
  implementation: Sass,
  sourceMap: true
}

/**
 * Stylelint options
 */
let stylelintOptions = {
  configFile: '.stylelintrc',
  fix: FIX,
  quiet: false,
  files: [ `${paths.assets}/stylesheets/**/*.{css,scss}` ],
  syntax: 'scss'
}

/**
 * PostCSS loader options
 */
let postCssLoaderOptions = {
  ident: 'postcss',
  sourceMap: true,
  plugins: [
    AutoPrefixer,
    PostCssReplace(
      {
        pattern: /_([^\s]+?)_/,
        data: {
          display: PRODUCTION ? 'none' : 'block',
          assets: PUBLIC_PATH
        }
      }
    ),
    PostCssCustomSelectors,
    PostCssCustomMedia,
    PostCssInlineSvg({ paths: [ utils.assetsPath('svg') ] }),
    PostCssSelectorMatches,
    PostCssCalc({ precision: 2 }),
    PostCssReporter({ clearAllMessages: true })
  ]
}

/**
 * Assets definitions
 * @type {Object}
 */
let assets = {
  orejime: {
    inline: false,
    assets: [
      // Polyfill
      'core-js/stable',
      'regenerator-runtime/runtime',

      // Application script
      utils.assetsPath('javascript/orejime.js'),

      // Application stylesheet
      utils.assetsPath('stylesheets/orejime.scss')
    ]
  }
}

/**
 * Store inline ids in inline array
 * Then format assets object for webpack entry
 */
Object.entries(assets).forEach(
  ([key, value]) => {
    // Push inline elements to inline array
    if (value.inline) inline.push(key)

    // Remap assets object
    assets[key] = value.assets
  }
)

/**
 * Webpack configuration
 * @type {Object}
 */
let webpackConfiguration = {
  name: NAMESPACE,
  mode: PRODUCTION ? 'production' : 'development',
  cache: !PRODUCTION,
  profile: !PRODUCTION,
  parallelism: 10,
  performance: { hints: false },
  watch: false,

  entry: assets,

  devtool: 'source-map',

  output: {
    path: path.join(__dirname, paths.dist),
    publicPath: paths.public,
    filename: `[name].js`,
    chunkFilename: `[name].js`,
    pathinfo: false
  },

  resolve: {
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, paths.assets)
    ]
  },

  plugins: [
    new CopyWebpackPlugin(
      [
        {
          from: utils.assetsPath('svg'),
          to: 'svg'
        }
      ],
      { ignore: ['.*'] }
    ),

    // Stylelint
    new StyleLintWebpackPlugin(stylelintOptions),

    // Extract css
    new MiniCssExtractPlugin(
      {
        filename: `[name].css`,
        chunkFilename: `[name].css`
      }
    )
  ],

  module: {
    rules: [
      // Javascript
      {
        test: /\.js$/,
        include: utils.assetsPath('javascript'),
        exclude: [
          /node_modules/,
          /vendor/
        ],
        use: [
          { loader: 'babel-loader' },
          {
            loader: 'eslint-loader',
            options: eslintLoaderOptions
          }
        ]
      },

      // CSS stylesheet
      {
        test: /\.css$/,
        include: utils.assetsPath('stylesheets'),
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
            options: cssLoaderOptions
          },
          {
            loader: 'postcss-loader',
            options: postCssLoaderOptions
          }
        ]
      },

      // SCSS stylesheet
      {
        test: /\.scss$/,
        include: utils.assetsPath('stylesheets'),
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
            options: cssLoaderOptions
          },
          {
            loader: 'postcss-loader',
            options: postCssLoaderOptions
          },
          {
            loader: 'sass-loader',
            options: sassLoaderOptions
          }
        ]
      },
    ]
  }
}

if (PRODUCTION) {
  /**
   * Optimisation config
   * @type {Object}
   */
  webpackConfiguration.optimization = {
    mangleWasmImports: true,
    minimizer: [
      /**
       * Uglify javascripts
       */
      new UglifyJsPlugin(
        {
          include: /\/bootstrap\/js\/src/,
          sourceMap: true,
          extractComments: false,
          uglifyOptions: {
            warnings: false,
            compress: { drop_console: true },
            output: { comments: false }
          }
        }
      )
    ]
  }
}

/**
 * Processing
 */
console.log('\n')
console.info(chalk.green('Package: %s'), NAMESPACE.toUpperCase())
console.info(chalk.green('Build target: %s'), argv.env.toUpperCase())
console.log('\n')

utils.cleanup()

/**
 * Webpack configuration export
 */
module.exports = webpackConfiguration
