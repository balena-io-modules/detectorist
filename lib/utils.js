'use strict';

const _        = require('lodash')
const Promise  = require('bluebird')
const { readFileAsync }
               = Promise.promisifyAll(require('fs'))
const YAML     = require('yamljs')

module.exports.readYAML = (path) => {
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
