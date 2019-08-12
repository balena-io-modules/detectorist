'use strict';

const Promise           = require('bluebird')
const { readFileAsync } = Promise.promisifyAll(require('fs'))
const { readYAML }      = require('../lib/utils.js')
const { join }          = require('path')

module.exports = {
  name: 'nodeCli',
  test: path => {
    return readYAML(join(path, 'repo.yml'))
    .then(config => {
      if (config.type === 'node-cli') return true
      return false
    })
    .catch(err => {
      if (err.code === 'ENOENT') return false
      console.error(err.message)
      throw err
    })
  }
}
