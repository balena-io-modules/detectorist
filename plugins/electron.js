'use strict';

const _                 = require('lodash')
const Promise           = require('bluebird')
const { readFileAsync } = Promise.promisifyAll(require('fs'))
const { join }          = require('path')

module.exports = {
  name: 'electron',
  priority: 30,
  description: 'Checks for the presence of electron in the package.json dependencies',
  test: path => {
    return readFileAsync(join(path, 'package.json'))
    .then(str => {
      if (_.get(JSON.parse(str), 'dependencies.electron', false)) return true

      return false
    })
    .catch(err => {
      if (err.code === 'ENOENT') return false
      console.error(err.message)
      throw err
    })
  }
}

