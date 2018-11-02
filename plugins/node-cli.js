'use strict';

const Promise           = require('bluebird')
const { readFileAsync } = require('../lib/utils')
const { join }          = require('path')

module.exports = {
  name: 'nodeCli',
  priority: 40,
  test: path => {
    return readFileAsync(join(path, 'package.json'))
    .then(str => {
      if (!str) return false

      if (JSON.parse(str).bin) return true

      return false
    })
  }
}

