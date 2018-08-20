'use strict';

const Promise           = require('bluebird')
const { readFileAsync } = Promise.promisifyAll(require('fs'))
const { join }          = require('path')

module.exports = {
  name: 'npm',
  test: path => {
    return readFileAsync(join(path, 'package.json'))
    .catch(err => {
      if (err.code === 'ENOENT') return false
      console.error(err.message)
      throw err
    })
    .then(str => {
      if (JSON.parse(str).private) return false

      return true
    })
  }
}

