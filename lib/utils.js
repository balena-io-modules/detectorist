'use strict';

const _        = require('lodash')
const Promise  = require('bluebird')
const { readFileAsync }
               = Promise.promisifyAll(require('fs'))
const YAML     = require('yamljs')
const { join } = require('path')

const readYAML = module.exports.readYAML = (path) => {
  return readFileAsync(path, 'utf8')
  .then((config) => {
    return YAML.parse(config)
  })
}

module.exports.readJSON = (path) => {
  return readFileAsync(path, 'utf8')
  .then((config) => {
    return JSON.parse(config)
  })
}

module.exports.fromRepoYML = (type) => {
  return path => {
    return readYAML(join(path, 'repo.yml'))
    .then(config => {
      if (config.type === type) return true
      return false
    })
    .catch(err => {
      if (err.code === 'ENOENT') return false
      console.error(err.message)
      throw err
    })
  }
}
