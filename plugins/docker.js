'use strict';

const Promise  = require('bluebird')
const { accessAsync, constants } = Promise.promisifyAll(require('fs'))
const { join } = require('path')

module.exports = {
  name: 'docker',
  test: path => {
    return accessAsync(join(path, 'package.json'), constants.F_OK)
    .catch(err => {
      if (err.code === 'ENOENT') return false
      console.error(err.message)
      throw err
    })
    .return(true)
  }
}

