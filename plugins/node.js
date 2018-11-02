'use strict';

const Promise           = require('bluebird')
const { accessAsync } = require('../lib/utils')
const { join }          = require('path')

module.exports = {
  name: 'node',
  test: path => {
    return accessAsync(join(path, 'package.json'))
    .then(res => !!res)
  }
}

