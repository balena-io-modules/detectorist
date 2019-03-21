'use strict';

const _                 = require('lodash')
const Promise           = require('bluebird')
const { readYAML }      = require('../lib/utils.js')
const { join }          = require('path')


module.exports = {
  name: 'rust-wasm',
  description: 'Check if a project is a rust project which also builds a wasm',
  test: path => {
    return readYAML(join(path, 'repo.yml'))
    .then(config => {
      if (config.type === 'rust-public-crate-wasm') return true
      return false
    })
    .catch(err => {
      if (err.code === 'ENOENT') return false
      console.error(err.message)
      throw err
    })
  }
}
