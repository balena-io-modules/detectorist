'use strict';

const _        = require('lodash')
const Promise  = require('bluebird')
const fs       = Promise.promisifyAll(require('fs'))
const YAML     = require('yamljs')
const { join } = require('path')

module.exports = path => {
  if (!path) {
    console.log('Usage')
    console.log('detectorist <path>\n')
    console.log('Available checks:\n')

    return fs.readdirAsync(join(__dirname, '../plugins'))
    .map(file => {
      const plugin = require(join(__dirname, '../plugins', file))
      console.log(`${plugin.name}\t\t${plugin.description || ''}`)
      return
    })
    .then(() => process.exit(1))
  }

  return fs.readdirAsync(join(__dirname, '../plugins'))
  .map(file => {
    const plugin = require(join(__dirname, '../plugins', file))

    return Promise.props({
      [plugin.name]: plugin.test(path)
    })
  })
  .reduce((out, result) => {
    return _.merge(out, result)
  }, {})
}

