'use strict';

const _        = require('lodash')
const Promise  = require('bluebird')
const fs       = Promise.promisifyAll(require('fs'))
const YAML     = require('yamljs')
const { join } = require('path')

module.exports = path => {
  return Promise.props({
    node: isNode(path),
    npm: isNpm(path),
    docker: isDocker(path),
  })
}

const isDocker = path => {
  return fs.accessAsync(join(path, 'package.json'), fs.constants.F_OK)
  .catch(err => {
    if (err.code === 'ENOENT') return false
    console.error(err.message)
    throw err
  })
  .return(true)
}

const isNpm = path => {
  return fs.readFileAsync(join(path, 'package.json'))
  .catch(err => {
    if (err.code === 'ENOENT') return false
    console.error(err.message)
    throw err
  })
  .then(str => {
    if (JSON.parse(str).private) return false

    return true
  })
}

const isNode = path => {
  return fs.readFileAsync(join(path, 'package.json'))
  .catch(err => {
    if (err.code === 'ENOENT') return false
    console.error(err.message)
    throw err
  })
  .return(true)
}

