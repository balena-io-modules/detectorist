'use strict';

const _                                         = require('lodash')
const Promise                                   = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
const { join }                                  = require('path')
const YAML                                      = require('yamljs')

const accessAsync = path => {
  return fs.accessAsync(path, fs.constants.F_OK)
  .then(() => true)
  .catch(err => {
    if (err.code === 'ENOENT') return undefined
    throw err
  })
}

const readFileAsync = path => {
  return fs.readFileAsync(path, 'utf8')
  .catch(err => {
    if (err.code === 'ENOENT') return undefined
    throw err
  })
}

module.exports = {
  accessAsync,
  readFileAsync,
}

