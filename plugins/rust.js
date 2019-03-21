'use strict';

const _                 = require('lodash')
const Promise           = require('bluebird')
const { readYAML }      = require('../lib/utils.js')
const { join }          = require('path')

module.exports = {
  name: 'rust',
  description: 'Check if a project is a rust project',
  test: path => {
    return readYAML(join(path, 'repo.yml'))
    .then(config => {
      if (config.type === 'rust-public-crate') return true
      if (config.type) return false
      return readFileAsync(join(path, 'Cargo.toml'))
      .then(() => {
        return true
      })
    })
    .catch(err => {
      if (err.code === 'ENOENT') return false
      console.error(err.message)
      throw err
    })
  }
}
