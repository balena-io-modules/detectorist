'use strict';

const Promise  = require('bluebird')
const { accessAsync, constants } = Promise.promisifyAll(require('fs'))
const { join } = require('path')

module.exports = {
  name: 'docker',
  test: path => {
    return accessAsync(join(path, 'Dockerfile'), constants.F_OK)
    .then(() => true)
    .catch(err => {
      if (err.code === 'ENOENT') return false
      console.error(err.message)
      throw err
    })
  }
}

