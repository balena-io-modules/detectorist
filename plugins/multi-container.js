'use strict';

const _                                         = require('lodash')
const Promise                                   = require('bluebird')
const { join }                                  = require('path')
const YAML                                      = require('yamljs')
const { accessAsync, readFileAsync } = require('../lib/utils')

module.exports = {
  name: 'multi-container',
  priority: 10,
  test: path => {
    return accessAsync(join(path, 'docker-compose.yml'))
    .then(res => {
      // docker-compose.yml exists; this is definitely a multi-container repo
      if (res) return true

      return readFileAsync(join(path, '.resinci.yml'), 'utf8')
    })
    .then(str => {
      if (!str) return false

      if (_.get(YAML.parse(str), 'docker.builds', []).length > 1) return true

      return false
    })
  }
}

