var path = require('path')
var fs =   require('fs')
var common = require('./config.common')
var syncMDFilePlugin = require('./syncPlugin/syncMDFilesPlugin')

module.exports = function (webpackConfig, redSkull, webpackPlugins) {

  webpackConfig = common(webpackConfig, redSkull, webpackPlugins)

  webpackConfig.devtool = 'source-map'

  const src = redSkull.src
  const dirs = fs.readdirSync(src)
  dirs.forEach(function(dirname){
    webpackConfig.resolve.alias[dirname] = path.join(src,dirname)
  });

  webpackConfig.plugins.push(new syncMDFilePlugin())

  return webpackConfig
}