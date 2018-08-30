'use strict';

const Promise           = require('bluebird')
const { readFileAsync } = Promise.promisifyAll(require('fs'))
const { join }          = require('path')

module.exports = {
  name: 'node',
  test: path => {
    return readFileAsync(join(path, 'package.json'))
    .then(() => true)
    .catch(err => {
      if (err.code === 'ENOENT') return false
      console.error(err.message)
      throw err
    })
  }
}

