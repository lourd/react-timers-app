process.env.NODE_ENV = 'production'

const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
const filesize = require('filesize')
const { sync: gzipSize} = require('gzip-size')
const { sync: rimrafSync } = require('rimraf')
const webpack = require('webpack')
const config = require('../config/webpack.config.prod')
const paths = require('../config/paths')

// Remove all content but keep the directory so that
// if you're in it, you don't end up in Trash
rimrafSync(paths.appBuild + '/*')

console.log('Creating an optimized production build...')
webpack(config).run(function(err, stats) {
  if (err) {
    console.error('Failed to create a production build. Reason:')
    console.error(err.message || err)
    process.exit(1)
  }

  console.log(chalk.green('Compiled successfully.'))
  console.log()

  console.log('File sizes after gzip:')
  console.log()
  const assets = stats.toJson().assets
    .filter(asset => /\.(js|css)$/.test(asset.name))
    .map(asset => {
      const fileContents = fs.readFileSync(paths.appBuild + '/' + asset.name)
      const size = gzipSize(fileContents)
      return {
        folder: path.join('build', path.dirname(asset.name)),
        name: path.basename(asset.name),
        size: size,
        sizeLabel: filesize(size)
      }
    })
  assets.sort((a, b) => b.size - a.size)

  const longestSizeLabelLength = Math.max.apply(null,
    assets.map(a => a.sizeLabel.length)
  )
  assets.forEach(asset => {
    let sizeLabel = asset.sizeLabel
    if (sizeLabel.length < longestSizeLabelLength) {
      const rightPadding = ' '.repeat(longestSizeLabelLength - sizeLabel.length)
      sizeLabel += rightPadding
    }
    console.log(
      '  ' + chalk.green(sizeLabel) +
      '  ' + chalk.dim(asset.folder + path.sep) + chalk.cyan(asset.name)
    )
  })
  console.log()

  const openCommand = process.platform === 'win32' ? 'start' : 'open'
  const homepagePath = require(paths.appPackageJson).homepage
  if (homepagePath) {
    console.log('You can now publish them at ' + homepagePath + '.')
    console.log('For example, if you use GitHub Pages:')
    console.log()
    console.log('  git commit -am "Save local changes"')
    console.log('  git checkout -B gh-pages')
    console.log('  git add -f build')
    console.log('  git commit -am "Rebuild website"')
    console.log('  git filter-branch -f --prune-empty --subdirectory-filter build')
    console.log('  git push -f origin gh-pages')
    console.log('  git checkout -')
    console.log()
  } else {
    console.log('You can now serve them with any static server.')
    console.log('For example:')
    console.log()
    console.log('  npm install -g pushstate-server')
    console.log('  pushstate-server build')
    console.log('  ' + openCommand + ' http://localhost:9000')
    console.log()
    console.log(chalk.dim('The project was built assuming it is hosted at the root.'))
    console.log(chalk.dim('Set the "homepage" field in package.json to override this.'))
    console.log(chalk.dim('For example, "homepage": "http://user.github.io/project".'))
  }
  console.log()
})
