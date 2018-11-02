'use strict';

const Promise           = require('bluebird')
const { accessAsync } = require('../lib/utils')
const { join }          = require('path')

module.exports = {
  name: 'rust',
  test: path => {
    return accessAsync(join(path, 'cargo.toml'))
    .then(res => !!res)
  }
}

