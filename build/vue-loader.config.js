const utils = require('./utils')
const config = require('./config')
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  preserveWhitespace: false,
  extractCSS: isProd,
  loaders: utils.cssLoaders({
    sourceMap: isProd ?
      config.build.productionSourceMap :
      config.dev.cssSourceMap,
    extract: isProd
  }),
  postcss: [
    require('postcss-import')({
      addDependencyTo: require('webpack')
    }),
    require('postcss-cssnext')({
      browsers: ['last 2 versions', 'Android >= 4.0']
    })
  ]
}
