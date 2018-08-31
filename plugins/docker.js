'use strict';

const _                                         = require('lodash')
const Promise                                   = require('bluebird')
const { accessAsync, constants, readFileAsync } = Promise.promisifyAll(require('fs'))
const { join }                                  = require('path')
const YAML                                      = require('yamljs')

module.exports = {
  name: 'docker',
  test: path => {
    return accessAsync(join(path, 'Dockerfile'), constants.F_OK)
    .then(() => {
      // Dockerfile exists; this is definitely a docker repo
      return true
    })
    .catch(err => {
      if (err.code === 'ENOENT') return readFileAsync(join(path, '.resinci.yml'), 'utf8')
      console.error(err.message)
      throw err
    })
    .then(str => {
      const config = YAML.parse(str)
      if (_.get(config, 'docker.builds', []).length > 0) return true

      return false
    })
  }
}

