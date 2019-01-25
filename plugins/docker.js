'use strict';

const _                                         = require('lodash')
const Promise                                   = require('bluebird')
const { accessAsync, constants, readFileAsync } = Promise.promisifyAll(require('fs'))
const { join }                                  = require('path')
const YAML                                      = require('yamljs')

let result = false

module.exports = {
  name: 'docker',
  test: path => {
    return accessAsync(join(path, 'Dockerfile'), constants.F_OK)
    .then(() => {
      // Dockerfile exists; set result to true
      result = true
    })
    .catch(err => {
      if (err.code !== 'ENOENT') {
        console.error(err.message)
        throw err
      }

      return readFileAsync(join(path, '.resinci.yml'), 'utf8')
      .then(str => {
        const config = YAML.parse(str)
        // IF docker is explicitly set to false then its not a docker repo
        if (config.docker === false) return false
        // If builds are defined then it is definitely a docker repo
        if (_.get(config, 'docker.builds', []).length > 0) return true

        // Otherwise, its a docker repo only if it has a dockerfile
        return result || false
      })
      .catch(err => {
        // Otherwise, its a docker repo only if it has a dockerfile
        if (err.code === 'ENOENT') return result || false

        console.error(err.message)
        throw err
      })
    })
  }
}
