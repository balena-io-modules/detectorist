'use strict';

const _                                         = require('lodash')
const Promise                                   = require('bluebird')
const { join }                                  = require('path')
const YAML                                      = require('yamljs')
const { accessAsync, readFileAsync } = require('../lib/utils')

module.exports = {
  name: 'single-container',
  priority: 20,
  test: path => {
    return accessAsync(join(path, 'Dockerfile'))
    .then(res => {
      // Dockerfile exists; this is definitely a docker repo
      if (res) return true

      return readFileAsync(join(path, '.resinci.yml'), 'utf8')
      .then(str => {
        if (!str) return false

        if (_.get(YAML.parse(str), 'docker.builds', []).length === 1) return true

        return false
      })
    })
  }
}

